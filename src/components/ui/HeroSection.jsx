import React from 'react';
import { ArrowDown, Sparkles, Terminal, Code2, Layers, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export default function HeroSection() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="section-container hero-section">
      <div className="hero-content-grid">
        {/* Left Column: Bold, refined typography and credentials */}
        <div className="hero-text-block">
          <div className="section-eyebrow">
            <span className="section-eyebrow-dot"></span>
            <span>SOFTWARE ENGINEER // SYSTEMS ARCHITECT</span>
          </div>

          <h1 className="display-title">
            Architecting <span className="display-title-gradient">High-Scale</span> Systems & Intelligent Data Solutions.
          </h1>

          <p className="hero-description">
            Hi, I'm <strong className="text-white">{PERSONAL_INFO.name}</strong>. I develop production-grade enterprise backend services, distributed data extraction pipelines, predictive machine learning models, and fluid cross-platform mobile apps with zero-latency performance.
          </p>

          {/* Action buttons */}
          <div className="hero-actions-row">
            <button onClick={() => scrollTo('work')} className="btn-primary">
              <Layers size={16} />
              <span>Explore Featured Systems</span>
            </button>

            <button onClick={() => scrollTo('lab')} className="btn-secondary">
              <Cpu size={16} />
              <span>Interactive AI Lab</span>
            </button>

            <button onClick={() => scrollTo('contact')} className="btn-secondary">
              <Terminal size={16} />
              <span>Get in Touch</span>
            </button>
          </div>

          {/* Core Metric Highlights - High Visibility Glass Cards */}
          <div className="hero-metrics-grid">
            <div className="metric-card glass-card">
              <span className="metric-number text-indigo">65+</span>
              <span className="metric-label">REST Endpoints</span>
              <span className="metric-detail">Django & FastAPI SLA</span>
            </div>

            <div className="metric-card glass-card">
              <span className="metric-number text-cyan">120+</span>
              <span className="metric-label">Extraction Engines</span>
              <span className="metric-detail">Distributed web scraping</span>
            </div>

            <div className="metric-card glass-card">
              <span className="metric-number text-emerald">-70%</span>
              <span className="metric-label">Query Latency</span>
              <span className="metric-detail">SQL & Cache optimization</span>
            </div>

            <div className="metric-card glass-card">
              <span className="metric-number text-amber">50k+</span>
              <span className="metric-label">Records / Batch</span>
              <span className="metric-detail">Automated data pipelines</span>
            </div>
          </div>
        </div>

        {/* Right Area is kept open for the 3D Holographic Artifact */}
        <div className="hero-3d-spacer" aria-hidden="true">
          {/* Subtle floating tech card badge */}
          <div className="tech-stack-floating-pill glass-card">
            <Code2 size={16} className="text-cyan" />
            <span>Python // AWS // React // Flutter // ML</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator prompt */}
      <div className="hero-scroll-hint" onClick={() => scrollTo('work')}>
        <span className="scroll-hint-text">SCROLL TO EXPLORE ARCHITECTURE</span>
        <ArrowDown size={14} className="bounce-arrow" />
      </div>
    </section>
  );
}
