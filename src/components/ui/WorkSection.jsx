import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, Layers } from 'lucide-react';
import { Github } from './BrandIcons';
import { FEATURED_PROJECTS } from '../../data/portfolioData';

export default function WorkSection({ onSelectProject = () => {} }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onSelectProject(index);
  };

  const project = FEATURED_PROJECTS[selectedIndex] || FEATURED_PROJECTS[0];
  const statsObj = project.stats || project.metrics || { 'Scale': 'Enterprise', 'Status': 'Production', 'Tier': 'High-Throughput' };
  const projectRepo = project.repo || project.githubUrl || 'https://github.com/varun01234';
  const projectCategory = project.badge || project.category || 'Enterprise Platform';
  const projectSummary = project.summary || project.fullDesc || '';

  return (
    <section id="work" className="section-container work-section">
      <div className="section-header">
        <div className="section-eyebrow">
          <span className="section-eyebrow-dot"></span>
          <span>ENTERPRISE SYSTEMS & PRODUCTION PLATFORMS</span>
        </div>
        <h2 className="section-heading">Architected For Scale & Reliability.</h2>
        <p className="section-subtitle">
          Mission-critical backend architectures, distributed cloud deployments, and high-concurrency systems engineered with robust database design and clean code standards.
        </p>
      </div>

      <div className="work-display-grid">
        {/* Project Selector List (Left Column) */}
        <div className="work-selector-column">
          {FEATURED_PROJECTS.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={item.id || idx}
                onClick={() => handleSelect(idx)}
                className={`project-select-card glass-card ${isSelected ? 'active' : ''}`}
              >
                <div className="project-select-header">
                  <span className="project-index">0{idx + 1}</span>
                  <span className="project-category-badge">{item.badge || item.category || 'Architecture'}</span>
                </div>
                <h3 className="project-select-title">{item.title}</h3>
                <p className="project-select-short">{item.summary || item.shortDesc || ''}</p>
                <div className="project-tech-mini-row">
                  {(item.tech || []).slice(0, 3).map((t, i) => (
                    <span key={i} className="mini-tag">{t}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Project Inspector (Right Column - High Visibility Glass Card) */}
        <div className="work-details-column">
          <div className="project-detail-panel glass-card">
            {/* Top Bar with Category & Live GitHub Link */}
            <div className="project-panel-header">
              <div>
                <span className="badge-pill badge-indigo">{projectCategory}</span>
              </div>
              <a
                href={projectRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary btn-sm"
              >
                <Github size={14} />
                <span>View Repository</span>
                <ExternalLink size={13} />
              </a>
            </div>

            <h3 className="project-panel-title">{project.title}</h3>
            <p className="project-panel-lead">{projectSummary}</p>

            {/* Key Metrics Row */}
            <div className="project-panel-metrics">
              {Object.entries(statsObj).map(([key, val], i) => (
                <div key={i} className="panel-metric-box">
                  <span className="metric-box-val">{val}</span>
                  <span className="metric-box-key">{key}</span>
                </div>
              ))}
            </div>

            {/* Architecture Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="project-panel-highlights">
                <h4 className="highlights-title">Engineering Highlights & Architectural Impact</h4>
                <ul className="highlights-list">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="highlight-item">
                      <CheckCircle2 size={16} className="text-emerald shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div className="project-panel-stack">
              <span className="stack-label">Technologies Deployed:</span>
              <div className="stack-pills-wrap">
                {(project.tech || []).map((t, i) => (
                  <span key={i} className="badge-pill badge-neutral">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
