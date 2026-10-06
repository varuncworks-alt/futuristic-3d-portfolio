import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  FileText, 
  Download,
  Filter
} from 'lucide-react';
import { WORK_EXPERIENCE, PERSONAL_INFO } from '../../data/portfolioData';
import { playHoverSound, playTerminalKey } from '../../utils/audioSynth';

export default function ExperienceTimeline({ openResume }) {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Enterprise', 'Microservices', 'Real-Time', 'Freelance'];

  const filteredExp = WORK_EXPERIENCE.filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Enterprise') return item.company.includes('SAS One');
    if (filter === 'Microservices') return item.company.includes('Collance');
    if (filter === 'Real-Time') return item.company.includes('Nerve');
    if (filter === 'Freelance') return item.company.includes('Fiverr');
    return true;
  });

  return (
    <div className="station-container">
      <div className="station-header">
        <div className="station-title-wrap">
          <Briefcase className="station-title-icon cyan" size={24} />
          <h2 className="station-title">Mission Log & Engineering Track Record</h2>
        </div>
        <p className="station-subtitle">
          Chronological journey delivering production systems, high-concurrency microservices, data scraping pipelines, and enterprise automation.
        </p>
      </div>

      {/* Filter and Resume Action Bar */}
      <div className="timeline-actions-bar">
        <div className="filter-group">
          <Filter size={14} className="cyan" />
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => {
                playTerminalKey();
                setFilter(cat);
              }}
              onMouseEnter={playHoverSound}
            >
              {cat}
            </button>
          ))}
        </div>

        <button
          className="cyber-btn primary resume-action-btn"
          onClick={() => {
            playHoverSound();
            openResume();
          }}
          onMouseEnter={playHoverSound}
        >
          <FileText size={15} />
          <span>View Verified Resume</span>
        </button>
      </div>

      {/* Timeline Tree */}
      <div className="timeline-tree">
        {filteredExp.map((exp, idx) => (
          <div key={idx} className="timeline-node" onMouseEnter={playHoverSound}>
            <div className="node-marker-wrap">
              <div className="node-dot" style={{ borderColor: exp.color, boxShadow: `0 0 12px ${exp.color}` }} />
              <div className="node-line" />
            </div>

            <div className="node-card holo-border">
              <div className="node-header">
                <div className="node-role-wrap">
                  <h3 className="node-role">{exp.role}</h3>
                  <span className="node-company" style={{ color: exp.color }}>
                    {exp.company}
                  </span>
                </div>

                <div className="node-meta">
                  <span className="meta-item">
                    <Calendar size={13} />
                    {exp.period}
                  </span>
                  <span className="meta-item">
                    <MapPin size={13} />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="node-domain-badge">{exp.domain}</div>

              <ul className="node-bullets">
                {exp.bullets.map((b, bIdx) => (
                  <li key={bIdx}>
                    <CheckCircle2 size={13} style={{ color: exp.color }} className="bullet-icon" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
