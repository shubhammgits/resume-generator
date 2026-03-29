"use client";

import React, { memo, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, drifts } = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    const drift = new Float32Array(count * 2);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 34;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 24;
      drift[i * 2] = (Math.random() - 0.5) * 0.003;
      drift[i * 2 + 1] = 0.002 + Math.random() * 0.004;
    }

    return { positions: pos, drifts: drift };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) {
      return;
    }
    const geometry = pointsRef.current.geometry;
    const attr = geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < attr.count; i += 1) {
      const i3 = i * 3;
      const xDrift = drifts[i * 2];
      const yDrift = drifts[i * 2 + 1];
      let x = attr.array[i3] as number;
      let y = attr.array[i3 + 1] as number;
      x += xDrift;
      y += yDrift;

      if (x > 17) x = -17;
      if (x < -17) x = 17;
      if (y > 12) y = -12;

      attr.array[i3] = x;
      attr.array[i3 + 1] = y;
    }

    attr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#a78bfa" transparent opacity={0.38} sizeAttenuation />
    </points>
  );
}

function FloatingRings() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseTarget = useRef(new THREE.Vector2(0, 0));

  useFrame(({ pointer, clock }) => {
    if (!groupRef.current) {
      return;
    }
    mouseTarget.current.lerp(new THREE.Vector2(pointer.x, pointer.y), 0.05);
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      mouseTarget.current.x * 0.5,
      0.035
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      mouseTarget.current.y * 0.25,
      0.035
    );
    groupRef.current.rotation.y = clock.elapsedTime * 0.08;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.18;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-3.2, 1.8, -4]} rotation={[0.9, 0.3, 0.2]}>
        <torusGeometry args={[3.8, 0.11, 20, 150]} />
        <meshBasicMaterial color="#6c63ff" transparent opacity={0.24} />
      </mesh>
      <mesh position={[3.4, -1.5, -5.4]} rotation={[0.3, 1.1, 0.9]}>
        <torusGeometry args={[2.8, 0.09, 16, 120]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.22} />
      </mesh>
      <mesh position={[0.8, 3.1, -6.2]} rotation={[1.1, 0.4, 0.6]}>
        <torusGeometry args={[4.2, 0.13, 22, 160]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.17} />
      </mesh>
    </group>
  );
}

const ThreeBackground = memo(function ThreeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 1.4]}>
        <ambientLight intensity={0.35} />
        <pointLight position={[3, 3, 4]} color="#6c63ff" intensity={1} />
        <ParticleField />
        <FloatingRings />
        <Stars radius={60} depth={26} count={900} factor={3} saturation={0.7} fade speed={0.8} />
      </Canvas>
    </div>
  );
});

export default ThreeBackground;
