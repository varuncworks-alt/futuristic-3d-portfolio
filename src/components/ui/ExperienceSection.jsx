import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { WORK_EXPERIENCE } from '../../data/portfolioData';

export default function ExperienceSection() {
  const experiences = WORK_EXPERIENCE || [];

  return (
    <section id="experience" className="section-container experience-section">
      <div className="section-header">
        <div className="section-eyebrow">
          <span className="section-eyebrow-dot"></span>
          <span>CHRONOLOGICAL TRACK RECORD</span>
        </div>
        <h2 className="section-heading">Proven Impact In High-Growth Environments.</h2>
        <p className="section-subtitle">
          Demonstrated history of delivering resilient cloud architectures, scalable REST APIs, and automated data pipelines across enterprise and startup teams.
        </p>
      </div>

      <div className="experience-timeline">
        {experiences.map((item, idx) => {
          const bullets = item.bullets || item.achievements || [];
          const skills = item.skills || item.tech || [];

          return (
            <div key={item.id || idx} className="timeline-node">
              {/* Timeline connector dot */}
              <div className="timeline-marker">
                <span className="marker-dot"></span>
                {idx !== experiences.length - 1 && <span className="marker-line"></span>}
              </div>

              {/* Experience Card */}
              <div className="timeline-content glass-card">
                <div className="timeline-card-header">
                  <div>
                    <h3 className="company-title">{item.company}</h3>
                    <div className="role-meta-row">
                      <span className="role-text text-indigo">{item.role}</span>
                      <span className="meta-separator">•</span>
                      <span className="meta-item"><Calendar size={13} /> {item.period}</span>
                      <span className="meta-separator">•</span>
                      <span className="meta-item"><MapPin size={13} /> {item.location}</span>
                    </div>
                  </div>
                  <span className="badge-pill badge-neutral">{item.domain || item.type || 'Engineering'}</span>
                </div>

                <ul className="experience-points-list">
                  {bullets.map((b, i) => (
                    <li key={i} className="ach-item">
                      <CheckCircle size={15} className="text-cyan shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {skills.length > 0 && (
                  <div className="timeline-tech-stack">
                    {skills.map((s, i) => (
                      <span key={i} className="mini-tag">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
