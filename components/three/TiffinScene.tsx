"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TiffinModel } from "./TiffinModel";
import { SteamParticles } from "./SteamParticles";

interface TiffinSceneProps {
  progress: number;
}

function SceneContent({ progress }: { progress: number }) {
  return (
    <>
      {/* Soft illustration lighting — no harsh shadows */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 8, 4]} intensity={0.8} />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#E8E0D4" />

      {/* The tiffin box */}
      <TiffinModel progress={progress} />

      {/* Steam */}
      <SteamParticles visible={progress > 0.3} baseY={1.5 + progress * 3} />

      {/* Controls — subtle, just for feel */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  );
}

export function TiffinScene({ progress }: TiffinSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <SceneContent progress={progress} />
      </Suspense>
    </Canvas>
  );
}
