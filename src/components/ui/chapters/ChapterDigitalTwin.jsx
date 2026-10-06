import React from 'react';
import { Box, Layers, Cpu, Eye } from 'lucide-react';
import { playHoverSound } from '../../../utils/audioSynth';

export default function ChapterDigitalTwin() {
  const twinTopics = [
    {
      num: '01',
      title: '3D GEOMETRY COORDINATE SYSTEMS',
      desc: 'Mathematical matrix transformations, Cartesian & spherical coordinate mapping, quaternion rotations, and spatial boundary representations for real-time 3D environments.'
    },
    {
      num: '02',
      title: 'DIGITAL TWIN CONCEPTS & REAL-TIME SYNC',
      desc: 'Designing bidirectional real-time communication bridges via WebSockets and telemetry streams connecting physical IoT / robotic sensors to virtual representations.'
    },
    {
      num: '03',
      title: 'SIMULATION WORKFLOWS & DATA FLOWS',
      desc: 'Synthetic data generation, procedural environment assembly, and automated test simulation loops for algorithmic model validation.'
    },
    {
      num: '04',
      title: 'OPENUSD & NVIDIA OMNIVERSE ECOSYSTEM',
      desc: 'Active exploration and development with Universal Scene Description (OpenUSD) interchangeable schemas, NVIDIA Omniverse USD-based microservices, and RTX rendering pipelines.'
    }
  ];

  return (
    <div className="chapter-overlay chapter-twin">
      <div className="chapter-badge-line">
        <span className="chapter-num-tag">SECTOR 04 // SPATIAL COMPUTING & DIGITAL TWIN</span>
        <span className="chapter-sub-tag">SIMULATION, COORDINATE GRIDS & OMNIVERSE</span>
      </div>

      <div className="twin-editorial-grid">
        {twinTopics.map((item) => (
          <div key={item.num} className="twin-editorial-card" onMouseEnter={playHoverSound}>
            <span className="t-num">{item.num}</span>
            <h3 className="t-title">{item.title}</h3>
            <p className="t-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
