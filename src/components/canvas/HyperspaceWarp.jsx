import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function HyperspaceWarp({ velocity = 0, count = 2200 }) {
  const pointsRef = useRef();

  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const init = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 45;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 60;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      init[i * 3] = x;
      init[i * 3 + 1] = y;
      init[i * 3 + 2] = z;
    }

    return [pos, init];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geom = pointsRef.current.geometry;
    const posAttr = geom.attributes.position;
    const array = posAttr.array;

    // Warp speed multiplier based on scroll velocity
    const speed = 0.5 + velocity * 45;

    for (let i = 0; i < count; i++) {
      array[i * 3 + 2] += delta * speed;
      // Loop particles back when they pass the camera
      if (array[i * 3 + 2] > 20) {
        array[i * 3 + 2] = -40;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={velocity > 0.05 ? 0.09 : 0.05}
        color="#ffffff"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
