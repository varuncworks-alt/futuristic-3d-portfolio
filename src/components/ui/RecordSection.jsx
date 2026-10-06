import React from 'react';
import { WORK_EXPERIENCE, PERSONAL_INFO } from '../../data/portfolioData';
import { ArrowUpRight, FileText } from 'lucide-react';
import { playHoverSound } from '../../utils/audioSynth';

export default function RecordSection({ openResume }) {
  return (
    <section className="shin-section" id="record">
      <div className="section-header-row">
        <span className="section-index">[ 03 ]</span>
        <h2 className="section-title">CHRONOLOGICAL RECORD</h2>
        <span className="section-meta">PRODUCTION TRACK RECORD & ROLES</span>
      </div>

      <div className="record-list">
        {WORK_EXPERIENCE.map((item, idx) => (
          <div key={idx} className="record-row" onMouseEnter={playHoverSound}>
            <div className="record-period">
              <span>{item.period}</span>
            </div>

            <div className="record-main">
              <div className="record-title-line">
                <h3 className="record-company">{item.company}</h3>
                <span className="record-role">{item.role}</span>
              </div>
              <span className="record-location">{item.location} // {item.domain}</span>

              <ul className="record-bullets">
                {item.bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Resume CTA banner */}
      <div className="resume-download-banner">
        <div className="banner-text">
          <h4>COMPLETE VERIFIED RESUME</h4>
          <p>Download the official comprehensive PDF curriculum vitae with educational qualifications, verified project metrics, and technical skill matrices.</p>
        </div>
        <button
          className="shin-cta-btn primary"
          onClick={() => {
            playHoverSound();
            openResume();
          }}
          onMouseEnter={playHoverSound}
        >
          <FileText size={15} />
          <span>VIEW / PRINT RESUME (PDF)</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </section>
  );
}
