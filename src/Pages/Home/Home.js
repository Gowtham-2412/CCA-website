import { useRef, useEffect } from 'react';
import FluidHero from "../../Utility/FluidHero";
import CardsSection from "../../Utility/CardsSection";

export default function Home() {
  const modelRef = useRef(null);

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
  <>
    <section
      id="hero-section"
      className="sticky top-4 z-0 w-full flex items-center justify-center overflow-hidden rounded-b-[40px]"
    >
      <div className="absolute top-0 left-0 w-full bg-[radial-gradient(circle_at_50%_0%,rgba(165,205,5,0.06),transparent_70%)] pointer-events-none" />
      <FluidHero />
    </section>

    <div className="relative z-10 -mt-px">
      <CardsSection />
    </div>
  </>
);
}
