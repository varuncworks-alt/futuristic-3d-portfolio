import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function PhoneHologram({ activeScreenIndex = 0 }) {
  const phoneGroup = useRef();
  const screenRef = useRef();

  useFrame((state, delta) => {
    if (phoneGroup.current) {
      phoneGroup.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.35;
      phoneGroup.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  const screenColors = ['#00f0ff', '#10b981', '#a855f7'];
  const activeColor = screenColors[activeScreenIndex % screenColors.length];

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={phoneGroup} position={[0, 0, 0]}>
        {/* Phone Outer Chassis (Glass & Cyber Titanium) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.7, 3.4, 0.14]} />
          <meshStandardMaterial
            color="#090d1a"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        {/* Glowing Neon Edge Frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.74, 3.44, 0.12]} />
          <meshBasicMaterial
            color="#00f0ff"
            wireframe
            transparent
            opacity={0.6}
          />
        </mesh>

        {/* Screen Display Panel */}
        <mesh ref={screenRef} position={[0, 0, 0.08]}>
          <planeGeometry args={[1.56, 3.2]} />
          <meshStandardMaterial
            color="#050a17"
            emissive={activeColor}
            emissiveIntensity={0.35}
            roughness={0.3}
          />
        </mesh>

        {/* Camera Dynamic Island */}
        <mesh position={[0, 1.45, 0.085]}>
          <capsuleGeometry args={[0.045, 0.18, 8, 16]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Floating Holo UI Elements above screen */}
        <mesh position={[0, 0.5, 0.22]}>
          <planeGeometry args={[1.3, 0.65]} />
          <meshBasicMaterial
            color={activeColor}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>

        <mesh position={[0, -0.4, 0.22]}>
          <planeGeometry args={[1.3, 0.7]} />
          <meshBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.4}
            wireframe
          />
        </mesh>

        {/* Floating Orbit Indicator Halo */}
        <mesh position={[0, -1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.35, 32]} />
          <meshBasicMaterial
            color="#10b981"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  );
}
