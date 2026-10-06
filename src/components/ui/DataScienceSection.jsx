import React, { useState, useEffect, useRef } from 'react';
import { Sliders, RefreshCw, BarChart2, Cpu, Database, Network, Sparkles, ExternalLink } from 'lucide-react';
import { Github } from './BrandIcons';

export default function DataScienceSection() {
  // Interactive Simulator State
  const [clustersCount, setClustersCount] = useState(3);
  const [dispersion, setDispersion] = useState(60);
  const [sampleCount, setSampleCount] = useState(120);
  const [stats, setStats] = useState({ variance: 94.2, silhouette: 0.74, iterations: 5 });

  const canvasRef = useRef(null);

  // Generate and draw clusters whenever parameters change
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Subtle grid background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Centroid colors: Indigo, Cyan, Emerald, Amber, Violet
    const colors = [
      { fill: '#6366f1', glow: 'rgba(99, 102, 241, 0.4)' },
      { fill: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)' },
      { fill: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
      { fill: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
      { fill: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' }
    ];

    // Calculate cluster centers arranged in circle
    const centroids = [];
    const centerRadius = Math.min(width, height) * 0.28;
    for (let i = 0; i < clustersCount; i++) {
      const angle = (i / clustersCount) * Math.PI * 2 - Math.PI / 2;
      centroids.push({
        x: width / 2 + Math.cos(angle) * centerRadius,
        y: height / 2 + Math.sin(angle) * centerRadius,
        color: colors[i % colors.length]
      });
    }

    // Draw clustered points
    const pointsPerCluster = Math.floor(sampleCount / clustersCount);
    const spread = (dispersion / 100) * 45 + 15;

    centroids.forEach((c) => {
      // Draw points around centroid
      for (let j = 0; j < pointsPerCluster; j++) {
        // Gaussian approximation
        const r = (Math.random() + Math.random()) * spread;
        const theta = Math.random() * Math.PI * 2;
        const px = c.x + Math.cos(theta) * r;
        const py = c.y + Math.sin(theta) * r;

        ctx.fillStyle = c.color.fill;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw centroid crosshair
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = c.color.glow;
      ctx.beginPath();
      ctx.arc(c.x, c.y, 14, 0, Math.PI * 2);
      ctx.fill();
    });

    // Update calculated stats
    setStats({
      variance: (98 - dispersion * 0.12).toFixed(1),
      silhouette: (0.86 - (dispersion / 200)).toFixed(3),
      iterations: Math.floor(4 + (dispersion / 25))
    });
  }, [clustersCount, dispersion, sampleCount]);

  return (
    <section id="lab" className="section-container lab-section">
      <div className="section-header">
        <div className="section-eyebrow">
          <span className="section-eyebrow-dot"></span>
          <span>MACHINE LEARNING & INTELLIGENT DATA PIPELINES</span>
        </div>
        <h2 className="section-heading">Translating Data Into Actionable Intelligence.</h2>
        <p className="section-subtitle">
          From unsupervised clustering algorithms to distributed web extraction and autonomous agentic workflows, engineering high-throughput intelligence architectures.
        </p>
      </div>

      <div className="lab-grid">
        {/* Interactive Simulator (Left Side) */}
        <div className="lab-simulator-card glass-card">
          <div className="simulator-header">
            <div>
              <span className="badge-pill badge-indigo">INTERACTIVE SIMULATOR</span>
              <h3 className="sim-title">K-Means & PCA Clustering Engine</h3>
            </div>
            <button
              onClick={() => setDispersion(Math.floor(Math.random() * 50 + 30))}
              className="icon-action-btn"
              title="Re-seed data distribution"
            >
              <RefreshCw size={14} />
            </button>
          </div>

          <div className="sim-canvas-wrap">
            <canvas
              ref={canvasRef}
              width={460}
              height={260}
              className="sim-canvas"
            />
          </div>

          {/* Interactive Sliders */}
          <div className="sim-controls">
            <div className="sim-control-group">
              <div className="slider-header">
                <span className="slider-name">Centroid Clusters (k):</span>
                <span className="slider-val text-cyan">{clustersCount}</span>
              </div>
              <input
                type="range"
                min="2"
                max="5"
                value={clustersCount}
                onChange={(e) => setClustersCount(parseInt(e.target.value))}
                className="slider-input"
              />
            </div>

            <div className="sim-control-group">
              <div className="slider-header">
                <span className="slider-name">Data Dispersion / Variance:</span>
                <span className="slider-val text-indigo">{dispersion}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                value={dispersion}
                onChange={(e) => setDispersion(parseInt(e.target.value))}
                className="slider-input"
              />
            </div>
          </div>

          {/* Live Metrics Readout */}
          <div className="sim-stats-grid">
            <div className="sim-stat-box">
              <span className="stat-label">PCA Variance Explained</span>
              <span className="stat-val text-emerald">{stats.variance}%</span>
            </div>
            <div className="sim-stat-box">
              <span className="stat-label">Silhouette Coefficient</span>
              <span className="stat-val text-cyan">{stats.silhouette}</span>
            </div>
            <div className="sim-stat-box">
              <span className="stat-label">Convergence Iterations</span>
              <span className="stat-val text-indigo">{stats.iterations} epochs</span>
            </div>
          </div>
        </div>

        {/* Real Data Projects (Right Side) */}
        <div className="lab-projects-column">
          {/* Card 1: Crypto Clustering */}
          <div className="lab-card glass-card">
            <div className="lab-card-header">
              <span className="badge-pill badge-cyan">UNSUPERVISED ML</span>
              <a
                href="https://github.com/varun01234"
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                <Github size={15} />
              </a>
            </div>
            <h4 className="lab-card-title">Crypto Market Volatility Clustering</h4>
            <p className="lab-card-desc">
              Unsupervised clustering pipeline using scikit-learn, K-Means, and PCA to identify non-linear risk groupings across cryptocurrency token pairs, producing structured risk segmentations.
            </p>
            <div className="lab-card-tags">
              <span className="mini-tag">Python</span>
              <span className="mini-tag">scikit-learn</span>
              <span className="mini-tag">PCA</span>
              <span className="mini-tag">K-Means</span>
              <span className="mini-tag">Pandas</span>
            </div>
          </div>

          {/* Card 2: Autonomous AI Lab OS */}
          <div className="lab-card glass-card">
            <div className="lab-card-header">
              <span className="badge-pill badge-indigo">AGENTIC AI</span>
              <a
                href="https://github.com/varun01234"
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                <Github size={15} />
              </a>
            </div>
            <h4 className="lab-card-title">Autonomous AI Lab Director OS</h4>
            <p className="lab-card-desc">
              Agentic workflow orchestrator coordinating multimodal LLMs for automated user-generated content generation, multi-channel distribution, and automated prompt validation.
            </p>
            <div className="lab-card-tags">
              <span className="mini-tag">OpenAI API</span>
              <span className="mini-tag">FastAPI</span>
              <span className="mini-tag">Autonomous Agents</span>
              <span className="mini-tag">LangChain</span>
            </div>
          </div>

          {/* Card 3: 120+ Site Distributed Scraper */}
          <div className="lab-card glass-card">
            <div className="lab-card-header">
              <span className="badge-pill badge-emerald">BIG DATA EXTRACTION</span>
              <a
                href="https://github.com/varun01234"
                target="_blank"
                rel="noopener noreferrer"
                className="card-link"
              >
                <Github size={15} />
              </a>
            </div>
            <h4 className="lab-card-title">Industrial 120+ Site Extraction & Deduplication</h4>
            <p className="lab-card-desc">
              Distributed web scraping suite gathering records across 120+ e-commerce portals, forums, and public databases with anti-bot bypass, automated schema normalization, and deduplication.
            </p>
            <div className="lab-card-tags">
              <span className="mini-tag">Python</span>
              <span className="mini-tag">BeautifulSoup</span>
              <span className="mini-tag">Scrapy</span>
              <span className="mini-tag">Regex</span>
              <span className="mini-tag">PostgreSQL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
