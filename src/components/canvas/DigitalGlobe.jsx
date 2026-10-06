import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function DigitalGlobe({ currentSection = 'hero' }) {
  const globeRef = useRef();
  const wireSphereRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const cloudRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  // Listen to mouse for smooth 3D tilt
  React.useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Generate continental particle points distributed around sphere
  const [particlePositions, particleColors] = useMemo(() => {
    const count = 3600;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    const cyan = new THREE.Color('#00f0ff');
    const white = new THREE.Color('#ffffff');
    const violet = new THREE.Color('#a855f7');
    const radius = 2.15;

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = 2.399963229728653 * i; // golden angle in radians

      // Cluster density into natural continental patches
      const continentNoise = Math.sin(theta * 3) * Math.cos(y * 4) + Math.sin(theta * 7) * 0.3;
      const r = radius + (continentNoise > 0 ? 0.04 : -0.02);

      const x = Math.cos(theta) * radiusAtY * r;
      const z = Math.sin(theta) * radiusAtY * r;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y * r;
      pos[i * 3 + 2] = z;

      const chosenColor = continentNoise > 0.2 ? cyan : (Math.random() > 0.4 ? white : violet);
      cols[i * 3] = chosenColor.r;
      cols[i * 3 + 1] = chosenColor.g;
      cols[i * 3 + 2] = chosenColor.b;
    }

    return [pos, cols];
  }, []);

  // Data connection arcs / nodes
  const nodes = useMemo(() => {
    return [
      { pos: [1.3, 0.9, 1.4], label: "LUCKNOW // 26.8°N" },
      { pos: [-1.4, 0.8, 1.3], label: "NOIDA // 28.5°N" },
      { pos: [0.2, -1.2, 1.7], label: "AWS EC2 // CLOUD" },
      { pos: [-1.8, -0.4, 0.9], label: "HIGH CONCURRENCY" },
      { pos: [1.7, -0.7, -1.1], label: "120+ SITES" }
    ];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (globeRef.current) {
      // Continuous celestial rotation + gentle mouse follow
      globeRef.current.rotation.y += delta * 0.18;
      globeRef.current.rotation.x = THREE.MathUtils.lerp(
        globeRef.current.rotation.x,
        mouseRef.current.y * 0.3 + 0.1,
        delta * 2.0
      );
      globeRef.current.rotation.z = THREE.MathUtils.lerp(
        globeRef.current.rotation.z,
        -mouseRef.current.x * 0.25,
        delta * 2.0
      );
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z = t * 0.15;
      ringRef1.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.2) * 0.1;
    }

    if (ringRef2.current) {
      ringRef2.current.rotation.z = -t * 0.12;
      ringRef2.current.rotation.y = Math.PI / 4 + Math.cos(t * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={globeRef}>
        {/* Core Inner Sphere with Dark Celestial Void */}
        <mesh>
          <sphereGeometry args={[2.08, 64, 64]} />
          <meshStandardMaterial
            color="#02050f"
            roughness={0.4}
            metalness={0.8}
          />
        </mesh>

        {/* Wireframe Coordinate Grid */}
        <mesh ref={wireSphereRef}>
          <sphereGeometry args={[2.14, 32, 24]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.07}
          />
        </mesh>

        {/* Ethereal Atmospheric Glow Layer */}
        <mesh>
          <sphereGeometry args={[2.18, 48, 48]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Continental Particle Field */}
        <points ref={cloudRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particlePositions.length / 3}
              array={particlePositions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={particleColors.length / 3}
              array={particleColors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            vertexColors
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* Celestial Orbital Coordinate Rings */}
        <group ref={ringRef1}>
          <mesh>
            <torusGeometry args={[2.7, 0.012, 16, 120]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} />
          </mesh>
        </group>

        <group ref={ringRef2}>
          <mesh>
            <torusGeometry args={[3.0, 0.01, 16, 120]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
          </mesh>
        </group>

        {/* Glowing Global Data Nodes */}
        {nodes.map((node, i) => (
          <mesh key={i} position={node.pos}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}
