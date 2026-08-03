import ccaModel from "../../Assets/models/vera_textured.glb";
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const modelRef = useRef(null);
  const wrapperRef = useRef(null);

  // 1. Force Alpha-Blend to Opaque for crisp model rendering
  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;

    const handleLoad = () => {
      const materials = model.model?.materials;
      if (materials) {
        materials.forEach((material) => {
          material.setAlphaMode("OPAQUE");
        });
      }
    };

    model.addEventListener('load', handleLoad);
    return () => model.removeEventListener('load', handleLoad);
  }, []);

  // 2. Enhanced Mouse-Follow 3D Rotation Logic across window
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const model = modelRef.current;
    if (!model) return;

    let targetTheta = 0;
    let targetPhi = 75;
    let currentTheta = 0;
    let currentPhi = 75;
    let frameId;

    const onMouseMove = (e) => {
      // Calculate mouse position relative to window center (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;

      // Dynamic 3D rotation: 50° horizontal rotation span & 30° vertical tilt
      targetTheta = x * 50;
      targetPhi = 75 - (y * 30);
    };

    const animate = () => {
      // Smooth lerp spring physics for fluid movement
      currentTheta += (targetTheta - currentTheta) * 0.08;
      currentPhi += (targetPhi - currentPhi) * 0.08;

      if (model) {
        model.cameraOrbit = `${currentTheta}deg ${currentPhi}deg auto`;
      }
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      id="hero-section"
      className="relative pt-16 lg:pt-20 pb-12 flex items-center justify-center min-h-[90vh] lg:min-h-screen overflow-hidden"
    >
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(165,205,5,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mt-4 sm:mt-6 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full relative z-10">

        {/* LEFT CONTENT */}
        <div className="left1 flex flex-col justify-center items-center lg:items-start lg:text-left order-1 z-10">
          <div className="flex flex-col space-y-8 sm:space-y-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-8xl font-bold leading-[0.95] tracking-tighter text-[#303030]">
              CENTRE <br /> FOR
              <br />
              COGNITIVE
              <br />
              <span className="text-[#a5cd05]">ACTIVITIES</span>
            </h1>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md font-light">
              CCA, Centre for Cognitive Activities, the largest and oldest technical club of NIT Durgapur, is the focal point where the convergence of all technical and scientific endeavors of the students materializes. Founded in 2003, this club aims to enhance the technical and managerial skills of the students from the beginning.
            </p>

            <div>
              <Link
                to="/our-team"
                className="inline-block px-8 py-3.5 bg-black text-white rounded-full font-semibold hover:bg-[#a5cd05] hover:text-black transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Our Team
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT 3D MODEL SHOWCASE */}
        <div
          ref={wrapperRef}
          className="right1 order-2 w-full flex items-center justify-center relative cursor-grab active:cursor-grabbing"
        >
          <model-viewer
            ref={modelRef}
            src={ccaModel}
            alt="CCA 3D Model"
            disable-zoom
            shadow-intensity="1.6"
            exposure="1.1"
            camera-orbit="0deg 75deg auto"
            touch-action="pan-y"
            field-of-view="30deg"
            style={{
              width: "100%",
              maxWidth: "520px",
              zIndex: "5",
              height: "550px",
            }}
          >
            <div className="progress-bar hide" slot="progress-bar">
              <div className="update-bar"></div>
            </div>
          </model-viewer>
        </div>

      </div>
    </section>
  );
}