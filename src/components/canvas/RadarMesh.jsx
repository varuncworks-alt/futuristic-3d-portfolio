import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function RadarMesh() {
  const sweepRef = useRef();
  const domeRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (sweepRef.current) {
      sweepRef.current.rotation.y += delta * 2.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.4;
    }
    if (domeRef.current) {
      domeRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={[0, 0, 0]}>
        {/* Wireframe Hemisphere / Radar Dome */}
        <mesh ref={domeRef} position={[0, 0, 0]}>
          <sphereGeometry args={[1.8, 24, 18, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color="#10b981"
            wireframe
            emissive="#10b981"
            emissiveIntensity={0.6}
          />
        </mesh>

        {/* Radar Concentric Base Rings */}
        <group position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <ringGeometry args={[0.5, 0.53, 64]} />
            <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} />
          </mesh>
          <mesh>
            <ringGeometry args={[1.1, 1.13, 64]} />
            <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} />
          </mesh>
          <mesh ref={ringRef}>
            <ringGeometry args={[1.7, 1.75, 64]} />
            <meshBasicMaterial color="#10b981" side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Radar Sweeper Needle / Sector */}
        <group ref={sweepRef} position={[0, 0, 0]}>
          <mesh position={[0.7, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.4, 0.04]} />
            <meshBasicMaterial color="#00f0ff" side={THREE.DoubleSide} />
          </mesh>
          {/* Glowing Ping Blip */}
          <mesh position={[1.2, 0.35, 0.2]}>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshBasicMaterial color="#f59e0b" />
          </mesh>
          <mesh position={[0.7, 0.8, -0.4]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>
      </group>
    </Float>
  );
}
