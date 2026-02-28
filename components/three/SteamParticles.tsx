"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SteamParticlesProps {
  visible: boolean;
  baseY: number;
}

export function SteamParticles({ visible, baseY }: SteamParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 60;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 1.2; // x spread
      arr[i * 3 + 1] = Math.random() * 2; // y height
      arr[i * 3 + 2] = (Math.random() - 0.5) * 1.2; // z spread
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current || !visible) return;
    const pos = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      // Rise up
      pos.array[i * 3 + 1] += delta * 0.5;
      // Slight horizontal drift
      pos.array[i * 3] += Math.sin(Date.now() * 0.001 + i) * delta * 0.05;
      // Reset when too high
      if (pos.array[i * 3 + 1] > 3) {
        pos.array[i * 3 + 1] = 0;
        pos.array[i * 3] = (Math.random() - 0.5) * 1.2;
        pos.array[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
      }
    }
    pos.needsUpdate = true;
  });

  if (!visible) return null;

  return (
    <points ref={pointsRef} position={[0, baseY, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#E8E0D4"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
