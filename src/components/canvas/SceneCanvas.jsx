import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import DigitalGlobe from './DigitalGlobe';
import SpaceParticles from './SpaceParticles';

function CameraDolly({ currentSection }) {
  const targetPos = useRef(new THREE.Vector3(0, 0, 6.2));

  useFrame((state, delta) => {
    // Reposition camera based on active section
    switch (currentSection) {
      case 'hero':
        targetPos.current.set(0, 0, 6.2);
        break;
      case 'work':
        targetPos.current.set(1.4, 0.2, 5.8);
        break;
      case 'lab':
        targetPos.current.set(-1.2, 0.4, 5.5);
        break;
      case 'record':
        targetPos.current.set(1.6, -0.3, 6.0);
        break;
      case 'twin':
        targetPos.current.set(0, 0.3, 5.2);
        break;
      case 'contact':
        targetPos.current.set(0, -0.8, 6.4);
        break;
      default:
        targetPos.current.set(0, 0, 6.2);
    }

    state.camera.position.lerp(targetPos.current, delta * 2.5);
  });

  return null;
}

export default function SceneCanvas({ currentSection = 'hero' }) {
  return (
    <div className="fixed-webgl-canvas">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <CameraDolly currentSection={currentSection} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 8]} intensity={1.2} color="#ffffff" />
        <pointLight position={[-10, -8, -5]} intensity={1.0} color="#00f0ff" />
        <pointLight position={[6, -6, 4]} intensity={0.8} color="#a855f7" />

        <SpaceParticles count={1400} />
        <DigitalGlobe currentSection={currentSection} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 2.6}
        />
      </Canvas>
    </div>
  );
}
