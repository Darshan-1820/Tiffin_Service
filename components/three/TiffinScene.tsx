"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { TiffinModel } from "./TiffinModel";
import { SteamParticles } from "./SteamParticles";

interface TiffinSceneProps {
  progress: number;
}

function SceneContent({ progress }: { progress: number }) {
  return (
    <>
      {/* Environment map for metal reflections */}
      <Environment preset="city" />

      {/* Key light — warm from upper right */}
      <directionalLight
        position={[5, 8, 4]}
        intensity={1.5}
        color="#FFF5E6"
      />
      {/* Fill light — cooler from left */}
      <directionalLight
        position={[-4, 4, -2]}
        intensity={0.4}
        color="#E0E8F0"
      />
      {/* Rim light — from behind for edge highlights */}
      <directionalLight
        position={[0, 3, -5]}
        intensity={0.6}
        color="#FFFFFF"
      />
      {/* Ambient base */}
      <ambientLight intensity={0.3} />

      {/* The tiffin box */}
      <TiffinModel progress={progress} />

      {/* Steam — warmer color for metal context */}
      <SteamParticles visible={progress > 0.3} baseY={1.5 + progress * 3} />
    </>
  );
}

export function TiffinScene({ progress }: TiffinSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, toneMapping: 3 }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <SceneContent progress={progress} />
      </Suspense>
    </Canvas>
  );
}
