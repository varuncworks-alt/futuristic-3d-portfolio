import React, { useState } from 'react';
import { Sliders, ArrowUpRight, Cpu, Sparkles } from 'lucide-react';
import { DATA_SCIENCE_PROJECTS } from '../../../data/portfolioData';
import { playHoverSound, playTerminalKey } from '../../../utils/audioSynth';

export default function ChapterNeuralLab() {
  const [volatility, setVolatility] = useState(65);
  const [clusters, setClusters] = useState(4);
  const [pcaDim, setPcaDim] = useState(3);

  const variance = (88.4 + pcaDim * 2.5 - volatility * 0.04).toFixed(1);
  const silhouette = (0.715 - volatility * 0.0015 + (clusters === 4 ? 0.08 : 0.02)).toFixed(3);

  return (
    <div className="chapter-overlay chapter-neural">
      <div className="chapter-badge-line">
        <span className="chapter-num-tag">SECTOR 03 // AI & DATA INTELLIGENCE</span>
        <span className="chapter-sub-tag">MACHINE LEARNING, AGENTS & 120+ SITE EXTRACTION</span>
      </div>

      <div className="neural-content-grid">
        {/* Left: Interactive ML Simulator */}
        <div className="neural-sim-box">
          <div className="sim-header">
            <span className="sim-badge">LIVE LAB SIMULATOR</span>
            <h3 className="sim-title">K-Means & PCA Clustering Simulator</h3>
          </div>

          <div className="sim-sliders">
            <div className="sim-slider-row">
              <div className="slider-label-line">
                <span>VOLATILITY DISPERSION</span>
                <span className="val-accent">{volatility}%</span>
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

            <div className="sim-slider-row">
              <div className="slider-label-line">
                <span>CENTROIDS (CLUSTERS)</span>
                <span className="val-accent">{clusters}</span>
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

            <div className="sim-slider-row">
              <div className="slider-label-line">
                <span>PCA DIMENSIONS</span>
                <span className="val-accent">{pcaDim}</span>
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

          <div className="sim-readouts">
            <div className="readout-card">
              <span className="r-label">PCA EXPLAINED VARIANCE</span>
              <span className="r-val">{variance}%</span>
            </div>
            <div className="readout-card">
              <span className="r-label">SILHOUETTE COEFFICIENT</span>
              <span className="r-val">{silhouette}</span>
            </div>
            <div className="readout-card">
              <span className="r-label">CENTROID EQUILIBRIUM</span>
              <span className="r-val-sm">{clusters === 4 ? 'OPTIMAL (K=4)' : `DISPERSED (${clusters})`}</span>
            </div>
          </div>
        </div>

        {/* Right: Key Intelligence Highlights */}
        <div className="neural-cards-stream">
          {DATA_SCIENCE_PROJECTS.slice(0, 3).map((proj) => (
            <div key={proj.id} className="neural-item-card" onMouseEnter={playHoverSound}>
              <div className="item-head">
                <span className="item-badge">{proj.badge}</span>
                <a
                  href={proj.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="item-link"
                >
                  <ArrowUpRight size={14} />
                </a>
              </div>
              <h4 className="item-title">{proj.title}</h4>
              <p className="item-summary">{proj.summary}</p>
              <div className="item-tech-line">
                {proj.tech.slice(0, 4).map((t, idx) => (
                  <span key={idx} className="mini-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
