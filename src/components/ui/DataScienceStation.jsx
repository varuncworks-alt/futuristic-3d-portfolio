import React, { useState } from 'react';
import { 
  Cpu, 
  Sliders, 
  ExternalLink, 
  CheckCircle2, 
  Activity, 
  BarChart3, 
  Database,
  BrainCircuit
} from 'lucide-react';
import { DATA_SCIENCE_PROJECTS, SKILL_CATEGORIES } from '../../data/portfolioData';
import { playHoverSound, playTerminalKey } from '../../utils/audioSynth';

export default function DataScienceStation() {
  // Interactive ML Simulator Parameters
  const [volatility, setVolatility] = useState(65);
  const [clusters, setClusters] = useState(4);
  const [pcaComponents, setPcaComponents] = useState(3);

  // Compute live simulated metrics based on sliders
  const explainedVariance = (88 + (pcaComponents * 2.8) - (volatility * 0.05)).toFixed(1);
  const silhouetteScore = (0.72 - (volatility * 0.002) + (clusters === 4 ? 0.08 : 0.02)).toFixed(3);
  const clusterLabel = clusters === 4 ? 'Optimal Centroid Balance (K=4)' : `High Dispersion (K=${clusters})`;

  return (
    <div className="station-container">
      <div className="station-header">
        <div className="station-title-wrap">
          <Cpu className="station-title-icon cyan" size={24} />
          <h2 className="station-title">Data Science & AI Laboratory</h2>
        </div>
        <p className="station-subtitle">
          Unsupervised Machine Learning, High-Throughput Web Intelligence across 120+ Sites, Computer Vision OCR, and Autonomous AI Agent Pipelines.
        </p>
      </div>

      {/* Interactive ML Simulator Widget */}
      <div className="interactive-card holo-border">
        <div className="card-top-bar">
          <div className="top-bar-left">
            <Sliders size={16} className="cyan" />
            <span className="widget-title">Live Interactive ML Playground: K-Means & PCA Analyzer</span>
          </div>
          <span className="widget-badge">LIVE SIMULATOR</span>
        </div>

        <div className="simulator-body">
          <div className="slider-controls">
            <div className="slider-item">
              <div className="slider-meta">
                <span className="slider-label">Market Volatility Index</span>
                <span className="slider-val cyan">{volatility}%</span>
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
                className="cyber-slider"
              />
            </div>

            <div className="slider-item">
              <div className="slider-meta">
                <span className="slider-label">K-Means Centroids (Clusters)</span>
                <span className="slider-val purple">{clusters}</span>
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
                className="cyber-slider"
              />
            </div>

            <div className="slider-item">
              <div className="slider-meta">
                <span className="slider-label">PCA Dimension Components</span>
                <span className="slider-val emerald">{pcaComponents}</span>
              </div>
              <input
                type="range"
                min="2"
                max="5"
                value={pcaComponents}
                onChange={(e) => {
                  playTerminalKey();
                  setPcaComponents(Number(e.target.value));
                }}
                className="cyber-slider"
              />
            </div>
          </div>

          <div className="simulator-results">
            <div className="res-stat-card">
              <div className="res-stat-label">PCA Explained Variance</div>
              <div className="res-stat-val cyan">{explainedVariance}%</div>
              <div className="res-stat-bar">
                <div className="res-stat-fill cyan-bg" style={{ width: `${Math.min(100, explainedVariance)}%` }} />
              </div>
            </div>

            <div className="res-stat-card">
              <div className="res-stat-label">Silhouette Coefficient</div>
              <div className="res-stat-val purple">{silhouetteScore}</div>
              <div className="res-stat-bar">
                <div className="res-stat-fill purple-bg" style={{ width: `${Math.min(100, silhouetteScore * 120)}%` }} />
              </div>
            </div>

            <div className="res-stat-card">
              <div className="res-stat-label">Convergence Status</div>
              <div className="res-stat-val emerald">{clusterLabel}</div>
              <div className="res-stat-sub">Scikit-Learn Standardized Inertia</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Grid */}
      <div className="projects-grid">
        {DATA_SCIENCE_PROJECTS.map((proj) => (
          <div key={proj.id} className="project-card" onMouseEnter={playHoverSound}>
            <div className="project-top">
              <span className="proj-badge">{proj.badge}</span>
              <a
                href={proj.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="proj-link"
                title="View Code on GitHub"
              >
                <ExternalLink size={15} />
              </a>
            </div>

            <h3 className="proj-title">{proj.title}</h3>
            <p className="proj-summary">{proj.summary}</p>

            {/* Metrics Chips */}
            <div className="proj-metrics-bar">
              {Object.entries(proj.metrics).map(([k, val]) => (
                <div key={k} className="metric-chip">
                  <span className="metric-chip-label">{k}:</span>
                  <span className="metric-chip-val">{val}</span>
                </div>
              ))}
            </div>

            {/* Bullet Highlights */}
            <ul className="proj-bullets">
              {proj.highlights.map((h, i) => (
                <li key={i}>
                  <CheckCircle2 size={12} className="bullet-icon cyan" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Tech Tags */}
            <div className="tech-tags">
              {proj.tech.map((t, idx) => (
                <span key={idx} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
