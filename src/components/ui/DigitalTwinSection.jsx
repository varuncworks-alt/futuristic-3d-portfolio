import React from 'react';
import { Box, Layers, Cpu, Eye } from 'lucide-react';
import { playHoverSound } from '../../utils/audioSynth';

export default function DigitalTwinSection() {
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
    <section className="shin-section" id="twin">
      <div className="section-header-row">
        <span className="section-index">[ 04 ]</span>
        <h2 className="section-title">3D GEOMETRY & DIGITAL TWIN ARCHITECTURE</h2>
        <span className="section-meta">SIMULATION, SPATIAL COMPUTING & OMNIVERSE</span>
      </div>

      <div className="twin-grid">
        {twinTopics.map((item) => (
          <div key={item.num} className="twin-card" onMouseEnter={playHoverSound}>
            <span className="twin-num">{item.num}</span>
            <h3 className="twin-title">{item.title}</h3>
            <p className="twin-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
