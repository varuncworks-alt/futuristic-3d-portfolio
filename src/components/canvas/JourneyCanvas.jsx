import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Ambient Starfield with subtle colored star particles
function SubtleStarfield({ count = 1200 }) {
  const pointsRef = useRef();

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color('#818cf8'), // Soft Indigo
      new THREE.Color('#22d3ee'), // Soft Cyan
      new THREE.Color('#c084fc'), // Soft Violet
      new THREE.Color('#f8fafc'), // Pearl White
      new THREE.Color('#fcd34d')  // Soft Amber
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60 - 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 45;

      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x += delta * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Hero 3D Interactive Crystalline Core & Orbital Rings
function HeroHoloArtifact({ mouse }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Gentle floating and mouse parallax
    const targetX = 2.8 + mouse.current.x * 0.5;
    const targetY = 0.2 + mouse.current.y * 0.4;
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);

    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.3;
      innerRef.current.rotation.y += delta * 0.4;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.25;
      ring1Ref.current.rotation.x += delta * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.35;
      ring2Ref.current.rotation.z -= delta * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x += delta * 0.2;
      ring3Ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[2.8, 0.2, 0]}>
      {/* Central Icosahedron Crystal with wireframe glow */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#4f46e5"
          emissive="#6366f1"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Internal glowing energy core */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#22d3ee"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbital Ring 1 - Cyan */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#06b6d4"
          emissiveIntensity={0.9}
        />
      </mesh>

      {/* Orbital Ring 2 - Violet */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.6, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Orbital Ring 3 - Emerald */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[3.0, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#34d399"
          emissive="#10b981"
          emissiveIntensity={0.7}
        />
      </mesh>
    </group>
  );
}

// Systems 3D Architectural Grid & Floating Monoliths
function SystemsArtifact({ activeProject = 0 }) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const monolithColors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'];

  return (
    <group ref={groupRef} position={[2.5, -4.5, -1]}>
      {monolithColors.map((color, index) => {
        const angle = (index / monolithColors.length) * Math.PI * 2;
        const radius = 2.4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const isSelected = activeProject === index;

        return (
          <mesh
            key={index}
            position={[x, 0, z]}
            scale={isSelected ? [1.15, 1.25, 1.15] : [0.9, 0.9, 0.9]}
          >
            <boxGeometry args={[0.7, 2.4, 0.7]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={isSelected ? 1.0 : 0.3}
              wireframe={!isSelected}
              transparent
              opacity={isSelected ? 0.9 : 0.5}
            />
          </mesh>
        );
      })}

      {/* Base grid platform */}
      <gridHelper
        args={[8, 16, '#6366f1', '#1e293b']}
        position={[0, -1.3, 0]}
      />
    </group>
  );
}

// AI Lab Neural Galaxy & Point Cloud
function NeuralGalaxyArtifact() {
  const galaxyRef = useRef();
  const nodeCount = 180;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3);
    const col = new Float32Array(nodeCount * 3);

    const clusterColors = [
      new THREE.Color('#818cf8'),
      new THREE.Color('#22d3ee'),
      new THREE.Color('#34d399')
    ];

    for (let i = 0; i < nodeCount; i++) {
      const cluster = i % 3;
      const centerOffsetX = (cluster - 1) * 2.2;
      const centerOffsetY = Math.sin(cluster * 1.5) * 1.2;

      pos[i * 3] = centerOffsetX + (Math.random() - 0.5) * 2.0;
      pos[i * 3 + 1] = centerOffsetY + (Math.random() - 0.5) * 2.0;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.0;

      const c = clusterColors[cluster];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += delta * 0.12;
      galaxyRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group ref={galaxyRef} position={[-2.2, -9.0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Subtle outer force field sphere */}
      <mesh>
        <sphereGeometry args={[2.8, 24, 24]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

// Mobile & Real-time Hologram Frame
function MobileHoloFrame({ mouse }) {
  const phoneRef = useRef();

  useFrame((_, delta) => {
    if (!phoneRef.current) return;
    const targetRotY = mouse.current.x * 0.4 + 0.2;
    const targetRotX = -mouse.current.y * 0.3;
    phoneRef.current.rotation.y = THREE.MathUtils.lerp(phoneRef.current.rotation.y, targetRotY, 0.05);
    phoneRef.current.rotation.x = THREE.MathUtils.lerp(phoneRef.current.rotation.x, targetRotX, 0.05);
    phoneRef.current.position.y = -13.5 + Math.sin(Date.now() * 0.0015) * 0.12;
  });

  return (
    <group ref={phoneRef} position={[2.4, -13.5, 0]}>
      {/* Phone chassis */}
      <mesh>
        <boxGeometry args={[1.5, 2.9, 0.12]} />
        <meshStandardMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Screen area */}
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[1.36, 2.7]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0284c7"
          emissiveIntensity={0.4}
          roughness={0.2}
        />
      </mesh>

      {/* Wireframe outer aura */}
      <mesh>
        <boxGeometry args={[1.65, 3.05, 0.2]} />
        <meshStandardMaterial
          color="#38bdf8"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

// Camera Flight Path Controller that smoothly tracks scroll progress
function CameraFlightController({ scrollProgress }) {
  useFrame(({ camera }) => {
    // Map scrollProgress (0 to 1) into smooth 3D camera trajectory
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Target camera Y drops as user scrolls through sections
    const targetY = -p * 14.0;
    
    // Target camera X smoothly moves left/right for balance
    const targetX = Math.sin(p * Math.PI * 2) * 0.8;
    const targetZ = 6.8 + Math.cos(p * Math.PI) * 0.8;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06);

    camera.lookAt(0, targetY, 0);
  });

  return null;
}

export default function JourneyCanvas({ scrollProgress = 0, activeProject = 0 }) {
  const mouseRef = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    mouseRef.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1
    };
  };

  return (
    <div
      className="fixed-canvas-container"
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft Ambient & Directional Lighting */}
        <ambientLight intensity={0.65} />
        <directionalLight position={[10, 10, 8]} intensity={1.2} color="#818cf8" />
        <directionalLight position={[-10, -10, -8]} intensity={0.8} color="#22d3ee" />
        <pointLight position={[0, 0, 4]} intensity={1.5} color="#6366f1" distance={15} />

        {/* Dynamic Starfield */}
        <SubtleStarfield count={1000} />

        {/* Section 3D Assets positioned along the flight path */}
        <HeroHoloArtifact mouse={mouseRef} />
        <SystemsArtifact activeProject={activeProject} />
        <NeuralGalaxyArtifact />
        <MobileHoloFrame mouse={mouseRef} />

        {/* Smooth Scroll Camera Controller */}
        <CameraFlightController scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
