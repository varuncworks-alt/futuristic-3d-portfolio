import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function DigitalTwinCage() {
  const boxRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (boxRef.current) {
      boxRef.current.rotation.y += delta * 0.25;
      boxRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.6}>
      <group>
        {/* Wireframe Bounding Cube */}
        <mesh ref={boxRef}>
          <boxGeometry args={[2.4, 2.4, 2.4]} />
          <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.4} />
        </mesh>

        {/* Spatial Coordinate Frame Axes */}
        <primitive object={new THREE.AxesHelper(1.8)} />

        {/* Gyroscopic Rotation Ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[2.0, 2.05, 64]} />
          <meshBasicMaterial color="#a855f7" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}
