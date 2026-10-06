import React from 'react';
import { 
  Globe, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Server, 
  ShieldAlert, 
  Zap,
  Terminal as TerminalIcon 
} from 'lucide-react';
import { WEB_PROJECTS } from '../../data/portfolioData';
import InteractiveTerminal from './InteractiveTerminal';
import { playHoverSound } from '../../utils/audioSynth';

export default function WebStation() {
  return (
    <div className="station-container">
      <div className="station-header">
        <div className="station-title-wrap">
          <Globe className="station-title-icon purple" size={24} />
          <h2 className="station-title">Full-Stack Web & Enterprise Backend Systems</h2>
        </div>
        <p className="station-subtitle">
          Mission-critical Python architectures (Django REST Framework, FastAPI, Flask), AWS cloud deployment, high-concurrency caching, and real-time interactive portals.
        </p>
      </div>

      {/* Featured Web Systems */}
      <div className="projects-grid">
        {WEB_PROJECTS.map((proj) => (
          <div key={proj.id} className="project-card" onMouseEnter={playHoverSound}>
            <div className="project-top">
              <span className="proj-badge purple-badge">{proj.badge}</span>
              {proj.repo && (
                <a
                  href={proj.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-link"
                  title="View Repository"
                >
                  <ExternalLink size={15} />
                </a>
              )}
            </div>

            <h3 className="proj-title">{proj.title}</h3>
            <p className="proj-summary">{proj.summary}</p>

            {/* System Stats Chips */}
            {proj.stats && (
              <div className="proj-metrics-bar">
                {Object.entries(proj.stats).map(([k, val]) => (
                  <div key={k} className="metric-chip">
                    <span className="metric-chip-label">{k}:</span>
                    <span className="metric-chip-val">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Highlights */}
            <ul className="proj-bullets">
              {proj.highlights.map((h, i) => (
                <li key={i}>
                  <CheckCircle2 size={12} className="bullet-icon purple" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {/* Tech Stack */}
            <div className="tech-tags">
              {proj.tech.map((t, idx) => (
                <span key={idx} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Cyberdeck Terminal */}
      <div className="terminal-section-wrap">
        <div className="terminal-section-title">
          <TerminalIcon size={18} className="cyan" />
          <span>Interactive Cyberdeck Terminal</span>
        </div>
        <p className="terminal-section-desc">
          Query Varun's experience, architecture competencies, and open-source systems via command line interface.
        </p>
        <InteractiveTerminal />
      </div>
    </div>
  );
}
