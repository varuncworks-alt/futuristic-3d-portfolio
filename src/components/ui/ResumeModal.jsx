import React from 'react';
import { X, Download, ExternalLink, FileText, CheckCircle2, Briefcase, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCE, SKILL_CATEGORIES } from '../../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-modal-backdrop" onClick={onClose}>
      <div className="resume-modal-dialog glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="resume-modal-header">
          <div className="modal-header-left">
            <FileText size={18} className="text-cyan" />
            <div>
              <h3 className="modal-title">Verified Resume // {PERSONAL_INFO.name}</h3>
              <p className="modal-subtitle">{PERSONAL_INFO.role} • {PERSONAL_INFO.location}</p>
            </div>
          </div>
          <div className="modal-header-actions">
            <button onClick={handlePrint} className="btn-primary btn-sm">
              <Download size={14} />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={onClose} className="modal-close-btn">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="resume-modal-body">
          {/* Summary */}
          <div className="resume-section">
            <h4 className="resume-sec-title">Professional Summary</h4>
            <p className="resume-sec-text">{PERSONAL_INFO.bio}</p>
          </div>

          {/* Work Experience */}
          <div className="resume-section">
            <h4 className="resume-sec-title">Production Experience</h4>
            <div className="resume-exp-list">
              {WORK_EXPERIENCE.map((exp) => (
                <div key={exp.id} className="resume-exp-item">
                  <div className="exp-item-header">
                    <span className="exp-role">{exp.role}</span>
                    <span className="exp-company text-indigo">@ {exp.company}</span>
                    <span className="exp-period">{exp.period}</span>
                  </div>
                  <ul className="exp-ach-list">
                    {(exp.bullets || exp.achievements || []).map((ach, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={13} className="text-emerald inline-icon" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="resume-section">
            <h4 className="resume-sec-title">Technical Competencies</h4>
            <div className="resume-skills-grid">
              {SKILL_CATEGORIES.map((cat, i) => (
                <div key={i} className="resume-skill-group">
                  <span className="skill-group-title text-cyan">{cat.name}</span>
                  <div className="skill-tags-row">
                    {cat.skills.map((s, j) => (
                      <span key={j} className="mini-tag">{s.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
