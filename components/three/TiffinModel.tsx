"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import * as THREE from "three";

interface TiffinModelProps {
  progress: number;
}

// Sketch palette
const INK = "#3D3229";
const BODY = "#E8E0D4";
const BODY_RIM = "#D6CEC2";
const LID_COLOR = "#DDD5C8";

const EDGE_T = 15;

function SketchTier({
  baseY,
  separationY,
  children,
}: {
  baseY: number;
  separationY: number;
  children?: React.ReactNode;
}) {
  return (
    <group position={[0, baseY + separationY, 0]}>
      <mesh>
        <cylinderGeometry args={[0.72, 0.72, 0.48, 48]} />
        <meshToonMaterial color={BODY} />
        <Edges threshold={EDGE_T} color={INK} />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.76, 0.76, 0.04, 48]} />
        <meshToonMaterial color={BODY_RIM} />
        <Edges threshold={EDGE_T} color={INK} />
      </mesh>
      <mesh position={[0, -0.24, 0]}>
        <cylinderGeometry args={[0.76, 0.76, 0.04, 48]} />
        <meshToonMaterial color={BODY_RIM} />
        <Edges threshold={EDGE_T} color={INK} />
      </mesh>
      {children}
    </group>
  );
}

function SketchLid({
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
      <mesh>
        <cylinderGeometry args={[0.76, 0.76, 0.06, 48]} />
        <meshToonMaterial color={LID_COLOR} />
        <Edges threshold={EDGE_T} color={INK} />
      </mesh>
      <mesh position={[0, -0.03, 0]}>
        <cylinderGeometry args={[0.78, 0.78, 0.03, 48]} />
        <meshToonMaterial color={BODY_RIM} />
        <Edges threshold={EDGE_T} color={INK} />
      </mesh>
      {/* Knob */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.08, 24]} />
        <meshToonMaterial color={BODY_RIM} />
        <Edges threshold={EDGE_T} color={INK} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry
          args={[0.08, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshToonMaterial color={BODY} />
        <Edges threshold={EDGE_T} color={INK} />
      </mesh>
    </group>
  );
}

export function TiffinModel({ progress }: TiffinModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
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
        <SketchTier key={i} baseY={y} separationY={0} />
      ))}

      <SketchLid
        openProgress={progress}
        baseY={tierPositions[3] + tierHeight / 2 + 0.05}
      />
    </group>
  );
}
