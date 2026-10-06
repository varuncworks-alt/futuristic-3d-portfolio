import React from 'react';
import { Volume2, VolumeX, FileText, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';

export default function HeaderNav({
  activeSection = 'hero',
  audioEnabled = false,
  onToggleAudio = () => {},
  onOpenResume = () => {}
}) {
  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'work', label: 'Systems & Work' },
    { id: 'lab', label: 'AI & Data Lab' },
    { id: 'mobile', label: 'Mobile & Realtime' },
    { id: 'experience', label: 'Career Track' },
    { id: 'contact', label: 'Contact' }
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed-top-nav">
      <div className="nav-container">
        {/* Brand identity & live status */}
        <div className="nav-brand" onClick={() => scrollTo('hero')}>
          <span className="brand-name">{PERSONAL_INFO.name.toUpperCase()}</span>
          <div className="status-pill">
            <span className="pulsing-dot"></span>
            <span className="status-text">AVAILABLE FOR ROLES</span>
          </div>
        </div>

        {/* Center navigation links */}
        <nav className="nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
              >
                {item.label}
                {isActive && <span className="active-indicator" />}
              </button>
            );
          })}
        </nav>

        {/* Actions: Audio, Resume, Socials */}
        <div className="nav-actions">
          <button
            onClick={onToggleAudio}
            className="icon-action-btn"
            title={audioEnabled ? "Mute audio soundscape" : "Enable atmospheric soundscape"}
          >
            {audioEnabled ? <Volume2 size={16} className="text-cyan" /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={onOpenResume}
            className="resume-pill-btn"
            title="View verified PDF resume"
          >
            <FileText size={14} />
            <span>RESUME (PDF)</span>
            <ArrowUpRight size={13} />
          </button>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link"
            title="GitHub Profile"
          >
            <Github size={16} />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-link"
            title="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </header>
  );
}
