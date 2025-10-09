'use client'
// Import patch before React Three Fiber
import '@/lib/react-three-fiber-patch';
import { Suspense, useEffect, useState } from "react";
// Optimized imports with tree shaking
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Stars } from "@react-three/drei/core/Stars";
import { Sparkles } from "@react-three/drei/core/Sparkles";
import { Canvas } from "@react-three/fiber";
import HeroSectionThreed from "@/components/feature/threed-section/hero-section-threed";

export default function ThreeDCanvas() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const handler = () => setReducedMotion(media.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  return (
    <Canvas 
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, -10], fov: 60 }}
      gl={{ 
        alpha: false,
        antialias: true,
        powerPreference: "high-performance"
      }}
      style={{ background: 'transparent', zIndex: 2 }}
    >
      <OrbitControls
        enableZoom={true}
        autoRotate={!reducedMotion}
        autoRotateSpeed={-0.1}
        enablePan={true}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        zoomSpeed={0.15}
        dampingFactor={0.05}
      />

      <Suspense fallback={null}>
        <Stars
         radius={100}
         depth={100}
         count={4000}
         factor={4}
         saturation={0}
         fade
         speed={0.2}
        />
        <Sparkles
           count={300}
           size={3}
           speed={0.02}
           opacity={1}
           scale={10}
           color="#fff3b0"
        />
        <HeroSectionThreed />
      </Suspense>
      <ambientLight intensity={0.4} color={"#8b5cf6"} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color={"#a855f7"} />
      <pointLight position={[0, 5, 5]} intensity={1} color={"#c084fc"} distance={20} />
    </Canvas>
  );
}
