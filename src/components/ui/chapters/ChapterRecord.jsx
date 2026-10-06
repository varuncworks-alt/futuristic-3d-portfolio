import React from 'react';
import { WORK_EXPERIENCE, PERSONAL_INFO } from '../../../data/portfolioData';
import { ArrowUpRight, FileText } from 'lucide-react';
import { playHoverSound } from '../../../utils/audioSynth';

export default function ChapterRecord({ openResume }) {
  return (
    <div className="chapter-overlay chapter-record">
      <div className="chapter-badge-line">
        <span className="chapter-num-tag">SECTOR 05 // CHRONOLOGICAL FLIGHT LOG</span>
        <span className="chapter-sub-tag">PRODUCTION ROLES & SCALE DELIVERED</span>
      </div>

      <div className="record-log-stream">
        {WORK_EXPERIENCE.map((item, idx) => (
          <div key={idx} className="record-log-row" onMouseEnter={playHoverSound}>
            <div className="log-period">
              <span>{item.period}</span>
            </div>
            <div className="log-body">
              <div className="log-title-line">
                <h3 className="log-company">{item.company}</h3>
                <span className="log-role">{item.role}</span>
              </div>
              <span className="log-sub">{item.location} // {item.domain}</span>
              <ul className="log-bullets">
                {item.bullets.slice(0, 3).map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Verified Resume CTA */}
      <div className="record-resume-banner">
        <div className="banner-left">
          <span className="banner-badge">OFFICIAL VERIFICATION</span>
          <h4>CURRICULUM VITAE // VARUN CHATURVEDI</h4>
          <p>Download the verified printable resume with complete academic qualifications and skill matrices.</p>
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
          <span>VIEW CURRICULUM VITAE</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
