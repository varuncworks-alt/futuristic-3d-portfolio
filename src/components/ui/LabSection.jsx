import React, { useState } from 'react';
import { Sliders, ArrowUpRight, Cpu, Sparkles } from 'lucide-react';
import { DATA_SCIENCE_PROJECTS } from '../../data/portfolioData';
import { playHoverSound, playTerminalKey } from '../../utils/audioSynth';

export default function LabSection() {
  const [volatility, setVolatility] = useState(60);
  const [clusters, setClusters] = useState(4);
  const [pcaDim, setPcaDim] = useState(3);

  const variance = (88.4 + pcaDim * 2.5 - volatility * 0.04).toFixed(1);
  const silhouette = (0.715 - volatility * 0.0015 + (clusters === 4 ? 0.08 : 0.02)).toFixed(3);

  return (
    <section className="shin-section" id="lab">
      <div className="section-header-row">
        <span className="section-index">[ 02 ]</span>
        <h2 className="section-title">AI & DATA INTELLIGENCE LAB</h2>
        <span className="section-meta">MACHINE LEARNING, AGENTS & 120+ SITE EXTRACTION</span>
      </div>

      {/* Interactive K-Means / PCA Simulator */}
      <div className="lab-interactive-console">
        <div className="console-top">
          <div className="console-title-wrap">
            <span className="console-badge">EXPERIMENT</span>
            <h3 className="console-title">K-Means Centroid & PCA Dimensionality Simulator</h3>
          </div>
          <span className="console-status">SCIKIT-LEARN // LIVE CONVERGENCE</span>
        </div>

        <div className="console-grid">
          <div className="sliders-column">
            <div className="slider-group">
              <div className="slider-label-row">
                <span>MARKET VOLATILITY INDEX</span>
                <span className="slider-val">{volatility}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={volatility}
                onChange={(e) => {
                  playTerminalKey();
                  setVolatility(Number(e.target.value));
                }}
                className="shin-range"
              />
            </div>

            <div className="slider-group">
              <div className="slider-label-row">
                <span>CENTROIDS (K-CLUSTERS)</span>
                <span className="slider-val">{clusters}</span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                value={clusters}
                onChange={(e) => {
                  playTerminalKey();
                  setClusters(Number(e.target.value));
                }}
                className="shin-range"
              />
            </div>

            <div className="slider-group">
              <div className="slider-label-row">
                <span>PCA DIMENSIONS</span>
                <span className="slider-val">{pcaDim}</span>
              </div>
              <input
                type="range"
                min="2"
                max="5"
                value={pcaDim}
                onChange={(e) => {
                  playTerminalKey();
                  setPcaDim(Number(e.target.value));
                }}
                className="shin-range"
              />
            </div>
          </div>

          <div className="metrics-column">
            <div className="metric-display-box">
              <span className="box-label">PCA EXPLAINED VARIANCE</span>
              <span className="box-val">{variance}%</span>
              <div className="box-bar">
                <div className="box-bar-fill" style={{ width: `${Math.min(100, variance)}%` }} />
              </div>
            </div>

            <div className="metric-display-box">
              <span className="box-label">SILHOUETTE COEFFICIENT</span>
              <span className="box-val">{silhouette}</span>
              <div className="box-bar">
                <div className="box-bar-fill" style={{ width: `${Math.min(100, silhouette * 125)}%` }} />
              </div>
            </div>

            <div className="metric-display-box">
              <span className="box-label">CLUSTER CONVERGENCE</span>
              <span className="box-val-sm">{clusters === 4 ? 'OPTIMAL CENTROIDS (K=4)' : `DISPERSED (K=${clusters})`}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Research Projects */}
      <div className="lab-projects-grid">
        {DATA_SCIENCE_PROJECTS.map((proj) => (
          <div key={proj.id} className="lab-card" onMouseEnter={playHoverSound}>
            <div className="lab-card-header">
              <span className="lab-badge">{proj.badge}</span>
              <a
                href={proj.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="lab-external"
              >
                <ArrowUpRight size={16} />
              </a>
            </div>

            <h4 className="lab-card-title">{proj.title}</h4>
            <p className="lab-card-desc">{proj.summary}</p>

            <div className="lab-highlights">
              {proj.highlights.map((h, i) => (
                <div key={i} className="lab-highlight-item">
                  <span className="dot" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="work-tech-tags">
              {proj.tech.map((t, idx) => (
                <span key={idx} className="tech-spec">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
