import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function SynapseGalaxy() {
  const groupRef = useRef();

  const { points, lines } = useMemo(() => {
    const nodeCount = 48;
    const nodes = [];
    const lineCoords = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 1.2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const x = radius * Math.cos(theta) * Math.cos(phi);
      const y = radius * Math.sin(phi);
      const z = radius * Math.sin(theta) * Math.cos(phi);

      nodes.push([x, y, z]);
    }

    // Connect close neighbors
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 1.4) {
          lineCoords.push(...nodes[i], ...nodes[j]);
        }
      }
    }

    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(lineCoords, 3));

    return { points: nodes, lines: lineGeom };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        <lineSegments geometry={lines}>
          <lineBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {points.map((p, i) => (
          <mesh key={i} position={p}>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color={i % 3 === 0 ? "#a855f7" : "#00f0ff"} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
