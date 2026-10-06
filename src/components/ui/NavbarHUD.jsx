import React from 'react';
import { 
  Terminal, 
  Cpu, 
  Smartphone, 
  Globe, 
  TrendingUp, 
  Briefcase, 
  Send, 
  Volume2, 
  VolumeX, 
  FileText 
} from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playHoverSound, playWarpSound } from '../../utils/audioSynth';

export default function NavbarHUD({
  currentStation,
  setStation,
  isMuted,
  toggleMute,
  openResume
}) {
  const stations = [
    { id: 'core', label: 'Core', icon: Terminal },
    { id: 'datascience', label: 'Data Science', icon: Cpu },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'web', label: 'Web & ERP', icon: Globe },
    { id: 'seo', label: 'SEO', icon: TrendingUp },
    { id: 'timeline', label: 'Experience', icon: Briefcase },
    { id: 'github', label: 'GitHub', icon: Github },
    { id: 'contact', label: 'Contact', icon: Send }
  ];

  const handleStationClick = (id) => {
    playWarpSound();
    setStation(id);
  };

  return (
    <header className="hud-navbar">
      <div className="hud-brand" onClick={() => handleStationClick('core')} onMouseEnter={playHoverSound}>
        <div className="brand-pulse-dot" />
        <span className="brand-title">VARUN.OS</span>
        <span className="brand-tag">SYS-v2.4</span>
      </div>

      {/* Center Nav Station Links */}
      <nav className="hud-stations" aria-label="Portfolio Stations">
        {stations.map((s) => {
          const Icon = s.icon;
          const isActive = currentStation === s.id;
          return (
            <button
              key={s.id}
              className={`station-pill ${isActive ? 'active' : ''}`}
              onClick={() => handleStationClick(s.id)}
              onMouseEnter={playHoverSound}
              title={s.label}
            >
              <Icon size={14} className="station-icon" />
              <span className="station-label">{s.label}</span>
              {isActive && <div className="active-indicator" />}
            </button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="hud-controls">
        <button
          className="hud-btn sound-btn"
          onClick={toggleMute}
          onMouseEnter={playHoverSound}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="audio-active" />}
        </button>

        <button
          className="hud-btn resume-btn"
          onClick={() => {
            playHoverSound();
            openResume();
          }}
          onMouseEnter={playHoverSound}
        >
          <FileText size={13} />
          <span>Resume</span>
        </button>

        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hud-social-link"
          onMouseEnter={playHoverSound}
          title="GitHub Profile"
        >
          <Github size={15} />
        </a>

        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hud-social-link"
          onMouseEnter={playHoverSound}
          title="LinkedIn Profile"
        >
          <Linkedin size={15} />
        </a>
      </div>
    </header>
  );
}
