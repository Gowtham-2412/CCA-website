import React, { useEffect, useRef } from 'react';

/* =====================================================================
   Constants & Shaders
   ===================================================================== */
const CFG = {
  SIM_RESOLUTION: 256,
  DYE_RESOLUTION: 256,
  DENSITY_DISSIPATION: 1.8,
  VELOCITY_DISSIPATION: 0.25,
  PRESSURE: 0,
  PRESSURE_ITERATIONS: 0,
  CURL: 12,
  SPLAT_RADIUS: 0.15,
  SPLAT_FORCE: 120,
};
const DPR_CAP = 5;
const DYE_BASE_COLOR = { r: 0.15, g: 0.03, b: 0.07 };

const VERT = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const CLEAR_FS = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;
  void main () { gl_FragColor = value * texture2D(uTexture, vUv); }
`;

const SPLAT_FS = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    float gaussian = exp(-dot(p, p) / radius);
    vec3 splat = gaussian * color;
    vec3 base = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

const ADVECTION_FS = `
  precision highp float;
  precision highp sampler2D;

  varying vec2 vUv;

  uniform sampler2D uVelocity;
  uniform sampler2D uSource;

  uniform vec2 texelSize;
  uniform vec2 dyeTexelSize;

  uniform float dt;
  uniform float dissipation;

  void main () {

    vec2 velocity = texture2D(uVelocity, vUv).xy;

    // Backtrace through the velocity field.
    vec2 coord = vUv - velocity * dt * texelSize;

    // Do NOT allow the backtrace to collapse onto an artificial
    // internal boundary. Only protect the actual texture edges.
    coord = clamp(
      coord,
      vec2(0.0),
      vec2(1.0)
    );

    vec4 result = texture2D(uSource, coord);

    // Dissipation is intentionally preserved.
    float decay = exp(-dissipation * dt);

    gl_FragColor = result * decay;
  }
`;

const DIVERGENCE_FS = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    vec2 C = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

const CURL_FS = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

const VORTICITY_FS = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * dt;
    velocity = min(max(velocity, -1000.0), 1000.0);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

const PRESSURE_FS = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

const GRADIENT_SUBTRACT_FS = `
  precision mediump float;
  precision mediump sampler2D;

  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;

  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;

  void main () {

    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;

    float C = texture2D(uPressure, vUv).x;

    if (vL.x < 0.0) L = C;
    if (vR.x > 1.0) R = C;
    if (vT.y > 1.0) T = C;
    if (vB.y < 0.0) B = C;

    vec2 velocity =
      texture2D(uVelocity, vUv).xy;

    velocity.xy -=
      vec2(R - L, T - B);

    gl_FragColor =
      vec4(velocity, 1.0);
  }
`;

const DISPLAY_FS = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform sampler2D uTextMask;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_fluidAmount;
  uniform float u_hasTextMask;
  uniform float u_light;
  uniform float u_dark;
  uniform float u_pixelRatio;

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p.yx + 19.19);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p, float time) {
    float value = 0.0;
    float amplitude = 0.5;
    float phase = time * 0.015;
    for (int i = 0; i < 2; i++) {
      value += amplitude * noise(p);
      float fi = phase + float(i) * 0.5;
      p = p * 1.5 + vec2(12.7 + cos(fi) * 0.5, 4.3 + sin(fi) * 0.5);
      amplitude *= 0.5;
    }
    return value;
  }
  float shapeNoise(vec2 p, float time) {
    vec2 offset = vec2(fbm(p + vec2(7.1, -3.9), time) - 0.5) * 3.0;
    return fbm(p + offset, time);
  }
  float bayer4(vec2 pixelPos) {
    vec2 p  = mod(pixelPos, 4.0);
    vec2 p2 = mod(p, 2.0);
    vec2 p4 = floor(p * 0.5);
    float inner = 2.0 * (p2.x + p2.y - 2.0 * p2.x * p2.y) + p2.y;
    float outer = 2.0 * (p4.x + p4.y - 2.0 * p4.x * p4.y) + p4.y;
    return (4.0 * inner + outer) / 16.0;
  }

  void main () {
    float blockSize = 2.5 * u_pixelRatio;
    vec2 blockCoord = floor(gl_FragCoord.xy / blockSize);
    vec2 blockCenter = (blockCoord + 0.5) * blockSize;
    vec2 blockUv = blockCenter / u_resolution.xy;
    vec2 centeredUv = blockUv - 0.5;
    centeredUv.x *= u_resolution.x / max(u_resolution.y, 1.0);

    float t = u_time * 0.03;
    vec2 flow = vec2(t, -t * 0.65);
    vec2 noiseUv = vec2(centeredUv.x * 1.5, centeredUv.y * 1.5 * 0.45) + flow;
    float base = shapeNoise(noiseUv, u_time);
    base = (base - 0.5) * 6.0 + 0.5;
    base *= 1.5;
    base = clamp(base, 0.0, 1.0);

    vec3 dye = texture2D(uTexture, vUv).rgb;
    float fluidLum = max(dye.r, max(dye.g, dye.b));
    float fluidStrength = clamp(fluidLum / 0.15, 0.0, 1.0) * u_fluidAmount;

    float caAmount = fluidStrength * mix(17.0, 10.0, u_dark) / u_resolution.x;
    vec2 caDir = normalize(vec2(1.0, 0.4));
    vec2 caDirPerp = vec2(caDir.y, caDir.x);

    vec2 uvC = vec2(vUv.x, vUv.y);

    vec2 uvR = vec2(
      vUv.x + caDir.x * caAmount,
      vUv.y + caDir.y * caAmount
    );

    vec2 uvG = vec2(
      vUv.x + caDirPerp.x * caAmount * 0.5,
      vUv.y + caDirPerp.y * caAmount * 0.5
    );

vec3 maskC = texture2D(uTextMask, uvC).rgb * u_hasTextMask;
vec3 maskR = texture2D(uTextMask, uvR).rgb * u_hasTextMask;
vec3 maskG = texture2D(uTextMask, uvG).rgb * u_hasTextMask;
    float textMask  = max(maskC.r, max(maskC.g, maskC.b));
    float textMaskR = max(maskR.r, max(maskR.g, maskR.b));
    float textMaskG = max(maskG.r, max(maskG.g, maskG.b));

    float modifiedBase = clamp(base - fluidStrength * (1.0 - textMask), 0.0, 1.0);

    float threshold = (bayer4(blockCoord) - 0.5) * 2.0;
    float dithered = step(0.5, clamp(modifiedBase + threshold, 0.0, 1.0));

    vec3 darkColor  = mix(vec3(0.818, 0.818, 0.818), vec3(0.89, 0.89, 0.89), u_light);
    vec3 lightColor = mix(vec3(0.918, 0.918, 0.918), vec3(0.96, 0.96, 0.96), u_light);
    vec3 textColor  = vec3(0.169, 0.169, 0.169);
    vec3 pinkColor  = vec3(0.988, 0.278, 0.471);

    darkColor  = mix(darkColor,  vec3(0.126, 0.126, 0.126), u_dark);
    lightColor = mix(lightColor, vec3(0.188, 0.188, 0.188), u_dark);
    textColor  = mix(textColor,  vec3(0.918, 0.918, 0.918), u_dark);

    float splatFade = fluidStrength * fluidStrength;
    vec3 tintedLight = mix(lightColor, pinkColor, splatFade * 0.9);
    vec3 bgColor = mix(darkColor, tintedLight, dithered);

    vec3 textEffect = mix(textColor, mix(pinkColor, textColor, u_dark), fluidStrength * 0.9);

    float r = mix(bgColor.r, textEffect.r, textMaskR);
    float g = mix(bgColor.g, textEffect.g, textMaskG);
    float b = mix(bgColor.b, textEffect.b, textMaskG);

    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

export default function FluidHero() {
  const canvasRef = useRef(null);
  const cursorDotRef = useRef(null);
  const heroTitleRef = useRef(null);
  const fluidWrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursorDot = cursorDotRef.current;
    const heroTitle = heroTitleRef.current;
    const fluidWrap = fluidWrapRef.current;

    if (!canvas || !heroTitle || !fluidWrap) return;

    /* WebGL Setup */
    function getWebGLContext(c) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };
      let gl = c.getContext('webgl2', params);
      const isWebGL2 = !!gl;
      if (!isWebGL2)
        gl =
          c.getContext('webgl', params) ||
          c.getContext('experimental-webgl', params);
      if (!gl) return { gl: null };

      let halfFloatExt, halfFloatLinear;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        halfFloatLinear = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloatExt = gl.getExtension('OES_texture_half_float');
        halfFloatLinear = gl.getExtension('OES_texture_half_float_linear');
      }
      gl.clearColor(0, 0, 0, 0);
      const halfFloatTexType = isWebGL2
        ? gl.HALF_FLOAT
        : halfFloatExt && halfFloatExt.HALF_FLOAT_OES;

      function supportRenderTextureFormat(internalFormat, format, type) {
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          internalFormat,
          4,
          4,
          0,
          format,
          type,
          null,
        );
        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          tex,
          0,
        );
        return (
          gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE
        );
      }

      function getSupportedFormat(internalFormat, format, type) {
        if (!supportRenderTextureFormat(internalFormat, format, type)) {
          if (isWebGL2) {
            switch (internalFormat) {
              case gl.R16F:
                return getSupportedFormat(gl.RG16F, gl.RG, type);
              case gl.RG16F:
                return getSupportedFormat(gl.RGBA16F, gl.RGBA, type);
              default:
                return null;
            }
          }
          return null;
        }
        return { internalFormat, format };
      }

      let formatRGBA, formatRG, formatR;
      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = { internalFormat: gl.RGBA, format: gl.RGBA };
        formatRG = { internalFormat: gl.RGBA, format: gl.RGBA };
        formatR = { internalFormat: gl.RGBA, format: gl.RGBA };
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering: halfFloatLinear,
        },
      };
    }

    const { gl, ext } = getWebGLContext(canvas);
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    function compileShader(type, source, keywords) {
      let src = source;
      if (keywords) src = keywords.map((k) => `#define ${k}\n`).join('') + src;
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        console.error(gl.getShaderInfoLog(shader));
      return shader;
    }

    function createProgram(vs, fs) {
      const p = gl.createProgram();
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS))
        console.error(gl.getProgramInfoLog(p));
      return p;
    }

    function getUniforms(program) {
      const uniforms = {};
      const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < count; i++) {
        const name = gl.getActiveUniform(program, i).name;
        uniforms[name] = gl.getUniformLocation(program, name);
      }
      return uniforms;
    }

    class Program {
      constructor(vs, fsSrc) {
        this.program = createProgram(
          vs,
          compileShader(gl.FRAGMENT_SHADER, fsSrc),
        );
        this.uniforms = getUniforms(this.program);
      }
      bind() {
        gl.useProgram(this.program);
      }
    }

    const baseVertexShader = compileShader(gl.VERTEX_SHADER, VERT);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
      gl.STATIC_DRAW,
    );
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array([0, 1, 2, 0, 2, 3]),
      gl.STATIC_DRAW,
    );
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    function blit(target, clear) {
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (clear) {
        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    const clearProgram = new Program(baseVertexShader, CLEAR_FS);
    const splatProgram = new Program(baseVertexShader, SPLAT_FS);
    const advectionProgram = new Program(baseVertexShader, ADVECTION_FS);
    const divergenceProgram = new Program(baseVertexShader, DIVERGENCE_FS);
    const curlProgram = new Program(baseVertexShader, CURL_FS);
    const vorticityProgram = new Program(baseVertexShader, VORTICITY_FS);
    const pressureProgram = new Program(baseVertexShader, PRESSURE_FS);
    const gradientSubtractProgram = new Program(
      baseVertexShader,
      GRADIENT_SUBTRACT_FS,
    );
    const displayProgram = new Program(baseVertexShader, DISPLAY_FS);

    function createFBO(w, h, internalFormat, format, type, param) {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        internalFormat,
        w,
        h,
        0,
        format,
        type,
        null,
      );
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0,
      );
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX: 1 / w,
        texelSizeY: 1 / h,
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w, h, internalFormat, format, type, param) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1;
        },
        set read(v) {
          fbo1 = v;
        },
        get write() {
          return fbo2;
        },
        set write(v) {
          fbo2 = v;
        },
        swap() {
          const tmp = fbo1;
          fbo1 = fbo2;
          fbo2 = tmp;
        },
      };
    }

    function getResolution(resolution) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1 / aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspectRatio);
      return gl.drawingBufferWidth > gl.drawingBufferHeight
        ? { width: max, height: min }
        : { width: min, height: max };
    }

    function scaleByPixelRatio(input) {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      return Math.floor(input * pixelRatio);
    }

    function resizeCanvas() {
      const rect = fluidWrap.getBoundingClientRect();
      const w = scaleByPixelRatio(rect.width);
      const h = scaleByPixelRatio(rect.height);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        return true;
      }
      return false;
    }

    let dye, velocity, curlT, divergenceT, pressureT;
    function initFramebuffers() {
      const simRes = getResolution(CFG.SIM_RESOLUTION);
      const dyeRes = getResolution(CFG.DYE_RESOLUTION);
      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA,
        rg = ext.formatRG,
        r = ext.formatR;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      gl.disable(gl.BLEND);
      dye = createDoubleFBO(
        dyeRes.width,
        dyeRes.height,
        rgba.internalFormat,
        rgba.format,
        texType,
        filtering,
      );
      velocity = createDoubleFBO(
        simRes.width,
        simRes.height,
        rg.internalFormat,
        rg.format,
        texType,
        filtering,
      );
      curlT = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST,
      );
      divergenceT = createFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST,
      );
      pressureT = createDoubleFBO(
        simRes.width,
        simRes.height,
        r.internalFormat,
        r.format,
        texType,
        gl.NEAREST,
      );
    }

    resizeCanvas();
    initFramebuffers();

    /* Text Mask Rasterization */
    const textCanvas = document.createElement('canvas');
    const tctx = textCanvas.getContext('2d');
    let textTex = null;

    function layoutTextMask() {
      const rect = fluidWrap.getBoundingClientRect();
      const dpr = canvas.width / rect.width;
      textCanvas.width = canvas.width;
      textCanvas.height = canvas.height;
      tctx.clearRect(0, 0, textCanvas.width, textCanvas.height);

      const cs = getComputedStyle(heroTitle);

      const fontPx = parseFloat(cs.fontSize) * dpr;

      tctx.font = `${cs.fontWeight} ${fontPx}px ${cs.fontFamily}`;
      tctx.fillStyle = '#ffffff';
      tctx.textAlign = 'center';
      tctx.textBaseline = 'alphabetic';

      const titleRect = heroTitle.getBoundingClientRect();

      const x =
        (titleRect.left - rect.left + titleRect.width / 2) * dpr;

      const startY =
        (titleRect.top - rect.top) * dpr + fontPx * 0.85;

      const lineHeight = fontPx * 0.94;

      const lines = [
        'WDCT Presents, Center for',
        'Cognitive Activities.',
      ];

      lines.forEach((line, i) => {
        tctx.fillText(
          line,
          x,
          startY + i * lineHeight
        );
      });

      if (!textTex) textTex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, textTex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        textCanvas,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    }

    if (document.fonts && document.fonts.ready)
      document.fonts.ready.then(layoutTextMask);
    else layoutTextMask();
    layoutTextMask();

    /* Pointer Tracking */
    const pointer = {
      rawX: -1,
      rawY: -1,

      // Position relative to fluidWrap
      x: 0,
      y: 0,

      // Smoothed position
      sx: 0,
      sy: 0,

      // Normalized WebGL coordinates
      texX: 0.5,
      texY: 0.5,

      deltaX: 0,
      deltaY: 0,

      moved: false,
      initialized: false,

      color: { ...DYE_BASE_COLOR },

      inCanvas: false,
    };

    function updatePointerFromViewport(clientX, clientY) {
      const rect = fluidWrap.getBoundingClientRect();

      pointer.rawX = clientX;
      pointer.rawY = clientY;

      pointer.inCanvas =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      // Convert viewport coordinates to fluid-local coordinates
      pointer.x = Math.max(0, Math.min(rect.width, clientX - rect.left));

      pointer.y = Math.max(0, Math.min(rect.height, clientY - rect.top));

      // Keep visible cursor locked to actual mouse position
      if (cursorDot) {
        cursorDot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }
    }

    const handleResize = () => {
      resizeCanvas();
      initFramebuffers();
      layoutTextMask();
    };

    const handleMouseMove = (e) => {
      updatePointerFromViewport(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];

      if (!touch) return;

      updatePointerFromViewport(touch.clientX, touch.clientY);
    };

    window.addEventListener('resize', handleResize);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    function correctDeltaX(delta) {
      const ar = canvas.width / canvas.height;

      return ar > 1 ? delta * ar : delta;
    }

    function correctDeltaY(delta) {
      const ar = canvas.width / canvas.height;

      return ar < 1 ? delta / ar : delta;
    }

    /* Main Render & Physics Loop */
    let lastUpdateTime = performance.now();
    let animId = null;

    function calcDeltaTime() {
      const now = performance.now();

      const dt = Math.min((now - lastUpdateTime) / 1000, 0.033);

      lastUpdateTime = now;

      return dt;
    }

    function step(dt) {
      gl.disable(gl.BLEND);

      curlProgram.bind();
      gl.uniform2f(
        curlProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY,
      );
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curlT);

      vorticityProgram.bind();
      gl.uniform2f(
        vorticityProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY,
      );
      gl.uniform1i(
        vorticityProgram.uniforms.uVelocity,
        velocity.read.attach(0),
      );
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curlT.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, CFG.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(
        divergenceProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY,
      );
      gl.uniform1i(
        divergenceProgram.uniforms.uVelocity,
        velocity.read.attach(0),
      );
      blit(divergenceT);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressureT.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, CFG.PRESSURE);
      blit(pressureT.write);
      pressureT.swap();

      pressureProgram.bind();
      gl.uniform2f(
        pressureProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY,
      );
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergenceT.attach(0));

      for (let i = 0; i < CFG.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(
          pressureProgram.uniforms.uPressure,
          pressureT.read.attach(1),
        );

        blit(pressureT.write);
        pressureT.swap();
      }

      gradientSubtractProgram.bind();
      gl.uniform2f(
        gradientSubtractProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY,
      );
      gl.uniform1i(
        gradientSubtractProgram.uniforms.uPressure,
        pressureT.read.attach(0),
      );
      gl.uniform1i(
        gradientSubtractProgram.uniforms.uVelocity,
        velocity.read.attach(1),
      );
      blit(velocity.write);
      velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(
        advectionProgram.uniforms.texelSize,
        velocity.texelSizeX,
        velocity.texelSizeY,
      );

      if (!ext.supportLinearFiltering) {
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          velocity.texelSizeX,
          velocity.texelSizeY,
        );
      }

      const velId = velocity.read.attach(0);

      gl.uniform1i(advectionProgram.uniforms.uVelocity, velId);

      gl.uniform1i(advectionProgram.uniforms.uSource, velId);

      gl.uniform1f(advectionProgram.uniforms.dt, dt);

      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        CFG.VELOCITY_DISSIPATION,
      );

      blit(velocity.write);
      velocity.swap();

      if (!ext.supportLinearFiltering) {
        gl.uniform2f(
          advectionProgram.uniforms.dyeTexelSize,
          dye.texelSizeX,
          dye.texelSizeY,
        );
      }

      gl.uniform1i(
        advectionProgram.uniforms.uVelocity,
        velocity.read.attach(0),
      );

      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));

      gl.uniform1f(
        advectionProgram.uniforms.dissipation,
        CFG.DENSITY_DISSIPATION,
      );

      blit(dye.write);
      dye.swap();
    }

    function correctRadius(radius) {
      const ar = canvas.width / canvas.height;

      if (ar > 1) {
        radius *= ar;
      }

      return radius;
    }

    function splat(x, y, dx, dy, color, radius = CFG.SPLAT_RADIUS / 100) {
      splatProgram.bind();

      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));

      gl.uniform1f(
        splatProgram.uniforms.aspectRatio,
        canvas.width / canvas.height,
      );

      gl.uniform2f(splatProgram.uniforms.point, x, y);

      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0);

      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(radius));

      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));

      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);

      blit(dye.write);
      dye.swap();
    }

function splatFromPointer(p) {
  const speed = Math.hypot(p.deltaX, p.deltaY);

  if (speed < 0.00001) return;

  // Prevent a large mouse jump from creating an extreme velocity.
  const maxDelta = 0.025;

  const dx = Math.max(
    -maxDelta,
    Math.min(maxDelta, p.deltaX)
  );

  const dy = Math.max(
    -maxDelta,
    Math.min(maxDelta, p.deltaY)
  );

  const normalizedSpeed = Math.min(
    Math.hypot(dx, dy) / 0.02,
    1
  );

  const color = {
    r: p.color.r * normalizedSpeed,
    g: p.color.g * normalizedSpeed,
    b: p.color.b * normalizedSpeed,
  };

  const minRadius = CFG.SPLAT_RADIUS / 100;
  const maxRadius = CFG.SPLAT_RADIUS / 50;

  const radius =
    minRadius +
    normalizedSpeed * (maxRadius - minRadius);

  const forceX =
    correctDeltaX(dx) * CFG.SPLAT_FORCE;

  const forceY =
    correctDeltaY(dy) * CFG.SPLAT_FORCE;

  splat(
    p.texX,
    p.texY,
    forceX,
    forceY,
    color,
    radius
  );
}
    function updatePointerMove() {
  if (
    pointer.rawX < 0 ||
    pointer.rawY < 0 ||
    canvas.width === 0 ||
    canvas.height === 0
  ) {
    pointer.moved = false;
    return;
  }

  if (!pointer.initialized) {
    pointer.sx = pointer.x;
    pointer.sy = pointer.y;

    const px = scaleByPixelRatio(pointer.sx);
    const py = scaleByPixelRatio(pointer.sy);

    pointer.texX = Math.max(
      0,
      Math.min(1, px / canvas.width)
    );

    pointer.texY = Math.max(
      0,
      Math.min(1, 1 - py / canvas.height)
    );

    pointer.deltaX = 0;
    pointer.deltaY = 0;
    pointer.moved = false;

    pointer.initialized = true;

    return;
  }

  pointer.sx +=
    (pointer.x - pointer.sx) * 0.12;

  pointer.sy +=
    (pointer.y - pointer.sy) * 0.12;

  const px = scaleByPixelRatio(pointer.sx);
  const py = scaleByPixelRatio(pointer.sy);

  const previousX = pointer.texX;
  const previousY = pointer.texY;

  pointer.texX = Math.max(
    0,
    Math.min(1, px / canvas.width)
  );

  pointer.texY = Math.max(
    0,
    Math.min(1, 1 - py / canvas.height)
  );

  pointer.deltaX =
    pointer.texX - previousX;

  pointer.deltaY =
    pointer.texY - previousY;

  pointer.moved =
    Math.abs(pointer.deltaX) > 0.00001 ||
    Math.abs(pointer.deltaY) > 0.00001;
}

    function render(time) {
      const dt = calcDeltaTime();

      if (resizeCanvas()) {
        initFramebuffers();
        layoutTextMask();
      }

      updatePointerMove();

      if (pointer.inCanvas && pointer.moved) {
        splatFromPointer(pointer);
      }

      step(dt);

      displayProgram.bind();

      gl.uniform1f(displayProgram.uniforms.u_time, time * 0.001);

      gl.uniform2f(
        displayProgram.uniforms.u_resolution,
        canvas.width,
        canvas.height,
      );

      gl.uniform1f(displayProgram.uniforms.u_fluidAmount, 1.0);

      gl.uniform1f(displayProgram.uniforms.u_hasTextMask, textTex ? 1.0 : 0.0);

      gl.uniform1f(displayProgram.uniforms.u_light, 0.0);

      gl.uniform1f(displayProgram.uniforms.u_dark, 0.0);

      gl.uniform1f(
        displayProgram.uniforms.u_pixelRatio,
        Math.min(window.devicePixelRatio || 1, DPR_CAP),
      );

      gl.uniform1i(displayProgram.uniforms.uTexture, dye.read.attach(0));

      if (textTex) {
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, textTex);

        gl.uniform1i(displayProgram.uniforms.uTextMask, 1);
      }

      blit(null);

      animId = requestAnimationFrame(render);
    }

    animId = requestAnimationFrame(render);

    /* Cleanup on Component Unmount */
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div
      id="fluid-hero-root"
      style={styles.root}
      className="mx-[30px] rounded-2xl"
    >
      <section style={styles.hero} id="hero">
        <div style={styles.sFluid} ref={fluidWrapRef}>
          <canvas
            id="fluid-canvas"
            ref={canvasRef}
            style={styles.fluidCanvas}
          />
        </div>
        <div style={styles.bCursor} ref={cursorDotRef} />

        <div style={styles.uContainer}>
          <h1 style={styles.sTitle} id="heroTitle" ref={heroTitleRef}>
            WDCT Presents, Center for Cognitive Activities.
          </h1>
          <p style={styles.subtitle}>
            CCA, Centre for Cognitive Activities, the largest and oldest technical club of NIT Durgapur, is the focal point where the convergence of all technical and scientific endeavors of the students materializes. Founded in 2003, this club aims to enhance the technical and managerial skills of the students from the beginning.
          </p>
          <div style={styles.logoRow}>
            <img src="/logos/core.png" alt="core" style={styles.logoImg} />
            <img src="/logos/wdct.png" alt="wdct" style={styles.logoImg} />
            <img src="/logos/rnd.png" alt="rnd" style={styles.logoImg} />
            <img src="/logos/robo.png" alt="robo" style={styles.logoImg} />
            <img src="/logos/ecell.png" alt="ecell" style={styles.logoImg} />
          </div>
        </div>
      </section>

      {/* Embedded Style Block to handle CSS Media Queries and Keyframes */}
      <style>{`
        :root {
          --ink: #2b2b2b;
          --pink: #fc4778;
          --bg: #F1F1F1;
        }
        body {
          margin: 0;
          background: var(--bg);
        }
        @media (max-width: 1024px) {
          #fluid-hero-root {
            height: 750px;
          }
          #heroTitle {
            font-size: 80px !important;
          }
        }

        @media (max-width: 768px) {
          #fluid-hero-root {
            height: 700px;
          }
          #heroTitle {
            font-size: 60px !important;
          }
        }

        @media (max-width: 480px) {
          #fluid-hero-root {
            height: 650px;
          }
          #heroTitle {
            font-size: 42px !important;
          }
        }

        @media (hover: none) {
          #heroTitle {
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}

/* Inline Style Objects */
const styles = {
  root: {
    height: '1200px',
    width: '100%',
    position: 'relative',
    backgroundColor: '#F1F1F1',
    overflow: 'hidden',
    cursor: 'default',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '28px 40px',
  },
  logo: {
    width: 32,
    height: 32,
    borderRadius: 6,
    background: '#2b2b2b',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
    fontWeight: 700,
    fontSize: 16,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    fontSize: 14,
    color: '#2b2b2b',
  },
  navLink: {
    color: 'inherit',
    textDecoration: 'none',
    opacity: 0.75,
  },
  cta: {
    background: '#2b2b2b',
    color: '#fff',
    padding: '10px 18px',
    borderRadius: 999,
    fontSize: 14,
    textDecoration: 'none',
  },
  hero: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '100px 6vw',
  },
  sFluid: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    pointerEvents: 'none',
  },
  fluidCanvas: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    display: 'block',
  },
  bCursor: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 6,
    width: 8,
    height: 8,
    margin: '-4px 0 0 -4px',
    background: '#fc4778',
    borderRadius: '50%',
    pointerEvents: 'none',
    willChange: 'transform',
  },
  uContainer: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  badges: {
    fontSize: 12.5,
    letterSpacing: '0.02em',
    color: '#333',
    marginBottom: 28,
  },
  sep: {
    color: '#fc4778',
    margin: '0 10px',
  },
  sTitle: {
    margin: 0,
    width: '100%',
    maxWidth: '1000px',
    fontWeight: 600,
    fontSize: '100px',
    lineHeight: 0.94,
    letterSpacing: '-0.03em',
    color: '#2b2b2b',
    opacity: 0,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 12,
    maxWidth: 700,
    fontSize: 16,
    lineHeight: 1.6,
    color: '#4a4a4a',
  },
  logoRow: {
    marginTop: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    flexWrap: 'wrap',
  },
  logoImg: {
    height: 80,
    width: 'auto',
    objectFit: 'contain',
    opacity: 0.7,
  },
};
