import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingMonoliths({ activeIndex = 0 }) {
  const groupRef = useRef();

  const monoliths = [
    { pos: [-2.2, 0.4, 0], rot: [0, 0.35, 0], color: "#00f0ff", label: "STOCKONE ERP" },
    { pos: [-0.7, -0.2, 0.8], rot: [0, 0.1, 0], color: "#10b981", label: "AOLM MOBILE" },
    { pos: [0.9, 0.3, 0.2], rot: [0, -0.25, 0], color: "#a855f7", label: "RASHTRA DHARAM" },
    { pos: [2.3, -0.3, -0.5], rot: [0, -0.4, 0], color: "#f59e0b", label: "SOUNDX AUDIO" }
  ];

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {monoliths.map((m, idx) => {
        const isHighlight = activeIndex === idx;
        return (
          <Float key={idx} speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <group position={m.pos} rotation={m.rot}>
              {/* Glass Monolith Body */}
              <mesh>
                <boxGeometry args={[1.2, 2.2, 0.1]} />
                <meshPhysicalMaterial
                  color="#050a18"
                  transmission={0.8}
                  roughness={0.15}
                  metalness={0.8}
                  transparent
                  opacity={0.85}
                  reflectivity={0.9}
                />
              </mesh>

              {/* Glowing Wireframe Border */}
              <mesh>
                <boxGeometry args={[1.22, 2.22, 0.11]} />
                <meshBasicMaterial
                  color={isHighlight ? m.color : "#ffffff"}
                  wireframe
                  transparent
                  opacity={isHighlight ? 0.8 : 0.2}
                />
              </mesh>

              {/* Holographic Projection Core */}
              <mesh position={[0, 0, 0.08]}>
                <planeGeometry args={[1.05, 2.0]} />
                <meshBasicMaterial
                  color={m.color}
                  transparent
                  opacity={isHighlight ? 0.35 : 0.12}
                />
              </mesh>
            </group>
          </Float>
        );
      })}
    </group>
  );
}
