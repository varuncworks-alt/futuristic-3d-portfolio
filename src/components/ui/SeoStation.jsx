import React from 'react';
import { 
  TrendingUp, 
  Gauge, 
  Search, 
  Share2, 
  Database, 
  ExternalLink, 
  Zap, 
  CheckCircle2 
} from 'lucide-react';
import { SEO_GROWTH_DATA } from '../../data/portfolioData';
import { playHoverSound } from '../../utils/audioSynth';

export default function SeoStation() {
  return (
    <div className="station-container">
      <div className="station-header">
        <div className="station-title-wrap">
          <TrendingUp className="station-title-icon emerald" size={24} />
          <h2 className="station-title">SEO & Technical Performance Telemetry</h2>
        </div>
        <p className="station-subtitle">
          Core Web Vitals sub-second optimization, automated Google search footprint intelligence, structured data schemas, and high-concurrency backend latency reduction.
        </p>
      </div>

      {/* Core Web Vitals Radar HUD */}
      <div className="interactive-card holo-border">
        <div className="card-top-bar">
          <div className="top-bar-left">
            <Gauge size={16} className="emerald" />
            <span className="widget-title">Core Web Vitals Benchmark Telemetry</span>
          </div>
          <span className="widget-badge emerald-badge">98/100 LIGHTHOUSE</span>
        </div>

        <div className="vitals-grid">
          {SEO_GROWTH_DATA.metrics.map((m, i) => (
            <div key={i} className="vital-card" onMouseEnter={playHoverSound}>
              <div className="vital-name">{m.name}</div>
              <div className="vital-score emerald">{m.score}</div>
              <div className="vital-status">{m.status}</div>
              <div className="vital-bar">
                <div className="vital-fill emerald-bg" style={{ width: `${m.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Strategies Breakdown */}
      <div className="seo-strategies-grid">
        {SEO_GROWTH_DATA.strategies.map((strat, idx) => (
          <div key={idx} className="strategy-card" onMouseEnter={playHoverSound}>
            <div className="strat-top">
              <span className="strat-tech-pill">{strat.tech}</span>
              {strat.repo && (
                <a
                  href={strat.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-link"
                  title="View Tool Repository"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>

            <h3 className="strat-title">{strat.title}</h3>
            <p className="strat-desc">{strat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
