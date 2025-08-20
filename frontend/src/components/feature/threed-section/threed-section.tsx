'use client'
import { Suspense } from "react";
import {
  OrbitControls,
  Stars,
  Sparkles,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import HeroSectionThreed from "./hero-section-threed";

export default function ThreeDSection() {
  return (
    <div className="scene w-full h-full min-h-[800px]">
      <Canvas 
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
          autoRotate={true}
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
    </div>
  );
}