import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function HoloCore({ active = true, onCoreClick }) {
  const outerRingRef = useRef();
  const midRingRef = useRef();
  const innerRingRef = useRef();
  const coreMeshRef = useRef();
  const glowSphereRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.4;
      outerRingRef.current.rotation.y = t * 0.6;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y = -t * 0.5;
      midRingRef.current.rotation.z = t * 0.3;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.x = -t * 0.7;
      innerRingRef.current.rotation.z = -t * 0.5;
    }
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y = t * 0.8;
      coreMeshRef.current.rotation.x = t * 0.4;
    }
    if (glowSphereRef.current) {
      const scale = 1 + Math.sin(t * 3) * 0.08;
      glowSphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={[0, 0.2, 0]} onClick={onCoreClick}>
        {/* Glowing Central Icosahedron */}
        <mesh ref={coreMeshRef}>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00b4d8"
            emissiveIntensity={1.2}
            wireframe
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Solid Pulsing Core */}
        <mesh ref={glowSphereRef}>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner Gyro Ring */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[1.5, 0.025, 16, 100]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Mid Gyro Ring */}
        <mesh ref={midRingRef}>
          <torusGeometry args={[1.9, 0.03, 16, 100]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.9}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Outer Tech Ring */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[2.3, 0.035, 16, 100]} />
          <meshStandardMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Orbiting Satellite Data Bits */}
        <OrbitingBits radius={2.6} count={8} color="#00f0ff" speed={1.2} />
        <OrbitingBits radius={3.1} count={6} color="#a855f7" speed={-0.9} />
      </group>
    </Float>
  );
}

function OrbitingBits({ radius, count, color, speed }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  const angles = Array.from({ length: count }, (_, i) => (i * 2 * Math.PI) / count);

  return (
    <group ref={groupRef}>
      {angles.map((angle, idx) => (
        <mesh
          key={idx}
          position={[
            Math.cos(angle) * radius,
            (idx % 2 === 0 ? 0.3 : -0.3),
            Math.sin(angle) * radius
          ]}
        >
          <octahedronGeometry args={[0.08]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}
