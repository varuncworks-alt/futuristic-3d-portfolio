import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function NeuralMesh() {
  const groupRef = useRef();
  const pulsesRef = useRef([]);

  // Generate multi-layer neural network geometry
  const { nodes, connections } = useMemo(() => {
    const layers = [4, 6, 7, 5, 3]; // layer node counts
    const layerSpacing = 1.3;
    const heightSpacing = 0.7;

    const allNodes = [];
    const allConnections = [];

    layers.forEach((count, layerIdx) => {
      const x = (layerIdx - (layers.length - 1) / 2) * layerSpacing;
      const startY = -((count - 1) * heightSpacing) / 2;

      for (let i = 0; i < count; i++) {
        const y = startY + i * heightSpacing;
        const z = (Math.sin(i * 1.5 + layerIdx) * 0.4);
        const node = { id: `${layerIdx}-${i}`, pos: [x, y, z], layer: layerIdx };
        allNodes.push(node);

        // Connect to next layer
        if (layerIdx < layers.length - 1) {
          const nextCount = layers[layerIdx + 1];
          const nextX = (layerIdx + 1 - (layers.length - 1) / 2) * layerSpacing;
          const nextStartY = -((nextCount - 1) * heightSpacing) / 2;

          for (let j = 0; j < nextCount; j++) {
            // Keep clean sparse synaptic density
            if (Math.random() > 0.35) {
              const nextY = nextStartY + j * heightSpacing;
              const nextZ = (Math.sin(j * 1.5 + layerIdx + 1) * 0.4);
              allConnections.push({
                start: [x, y, z],
                end: [nextX, nextY, nextZ]
              });
            }
          }
        }
      }
    });

    return { nodes: allNodes, connections: allConnections };
  }, []);

  // Build line segments for synapses
  const lineGeometry = useMemo(() => {
    const positions = [];
    connections.forEach(conn => {
      positions.push(...conn.start, ...conn.end);
    });
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geom;
  }, [connections]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.25;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Synaptic Lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.22}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>

        {/* Neural Nodes */}
        {nodes.map((node, i) => (
          <NodePoint
            key={node.id}
            position={node.pos}
            layer={node.layer}
            index={i}
          />
        ))}
      </group>
    </Float>
  );
}

function NodePoint({ position, layer, index }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 4 + index * 0.5) * 0.25;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  const colors = ["#00f0ff", "#38bdf8", "#a855f7", "#c084fc", "#10b981"];
  const color = colors[layer % colors.length];

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        roughness={0.2}
      />
    </mesh>
  );
}
