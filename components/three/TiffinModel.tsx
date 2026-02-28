"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TiffinModelProps {
  progress: number;
}

// Stainless steel palette
const STEEL = "#B8B8B8";
const RIM = "#D0D0D0";
const LID_TOP = "#C4C4C4";
const HANDLE = "#A0A0A0";

function SteelTier({
  baseY,
  separationY,
}: {
  baseY: number;
  separationY: number;
}) {
  return (
    <group position={[0, baseY + separationY, 0]}>
      {/* Main body — slight taper like real stainless steel tiffins */}
      <mesh>
        <cylinderGeometry args={[0.72, 0.7, 0.48, 64]} />
        <meshStandardMaterial
          color={STEEL}
          metalness={0.85}
          roughness={0.25}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* Top rim */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.77, 0.77, 0.04, 64]} />
        <meshStandardMaterial
          color={RIM}
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.4}
        />
      </mesh>
      {/* Bottom rim */}
      <mesh position={[0, -0.24, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.04, 64]} />
        <meshStandardMaterial
          color={RIM}
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.4}
        />
      </mesh>
    </group>
  );
}

function SteelLid({
  openProgress,
  baseY,
}: {
  openProgress: number;
  baseY: number;
}) {
  const lidY = baseY + openProgress * 2.8;
  const lidRotation = openProgress * Math.PI * 0.35;

  return (
    <group position={[0, lidY, 0]} rotation={[lidRotation, 0, 0]}>
      {/* Lid disc */}
      <mesh>
        <cylinderGeometry args={[0.77, 0.77, 0.05, 64]} />
        <meshStandardMaterial
          color={LID_TOP}
          metalness={0.9}
          roughness={0.2}
          envMapIntensity={1.3}
        />
      </mesh>
      {/* Lid lip */}
      <mesh position={[0, -0.025, 0]}>
        <cylinderGeometry args={[0.79, 0.79, 0.025, 64]} />
        <meshStandardMaterial
          color={RIM}
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.4}
        />
      </mesh>
      {/* Handle base */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.07, 32]} />
        <meshStandardMaterial
          color={HANDLE}
          metalness={0.85}
          roughness={0.3}
          envMapIntensity={1.0}
        />
      </mesh>
      {/* Handle knob — smooth dome */}
      <mesh position={[0, 0.14, 0]}>
        <sphereGeometry args={[0.1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={RIM}
          metalness={0.92}
          roughness={0.12}
          envMapIntensity={1.5}
        />
      </mesh>
    </group>
  );
}

export function TiffinModel({ progress }: TiffinModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const tierHeight = 0.52;
  const maxSeparation = 0.9;
  const separation = progress * maxSeparation;

  const tierPositions = [0, 1, 2, 3].map(
    (i) => i * tierHeight + i * separation
  );
  const totalStackHeight = tierPositions[3] + tierHeight;

  return (
    <group ref={groupRef} position={[0, -totalStackHeight / 2, 0]}>
      {tierPositions.map((y, i) => (
        <SteelTier key={i} baseY={y} separationY={0} />
      ))}

      <SteelLid
        openProgress={progress}
        baseY={tierPositions[3] + tierHeight / 2 + 0.05}
      />
    </group>
  );
}
