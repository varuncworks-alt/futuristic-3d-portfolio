import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Smartphone, 
  Globe, 
  ArrowRight, 
  FileText, 
  Layers,
  Rotate3d,
  Sparkles
} from 'lucide-react';
import { PERSONAL_INFO, METRICS } from '../../data/portfolioData';
import { playHoverSound, playWarpSound } from '../../utils/audioSynth';

export default function HeroHUD({ setStation, openResume }) {
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentSub = PERSONAL_INFO.subtitles[subtitleIdx];
    const speed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentSub) {
        setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setSubtitleIdx((prev) => (prev + 1) % PERSONAL_INFO.subtitles.length);
      } else {
        setDisplayedText(
          currentSub.substring(0, isDeleting ? displayedText.length - 1 : displayedText.length + 1)
        );
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, subtitleIdx]);

  return (
    <section className="hero-hud">
      <div className="hero-content-col">
        {/* Top Telemetry Chip */}
        <div className="telemetry-badge" onMouseEnter={playHoverSound}>
          <span className="live-radar-ping" />
          <span className="telemetry-code">SYS-TELEMETRY: {PERSONAL_INFO.status}</span>
        </div>

        {/* Main Identity Heading */}
        <h1 className="hero-name">
          <span className="glitch-text" data-text={PERSONAL_INFO.name}>
            {PERSONAL_INFO.name}
          </span>
        </h1>

        {/* Dynamic Typewriter Subtitle */}
        <div className="typewriter-container">
          <span className="prompt-sym">&gt; </span>
          <span className="typewriter-text">{displayedText}</span>
          <span className="cursor-blink">|</span>
        </div>

        {/* Bio Description */}
        <p className="hero-bio">{PERSONAL_INFO.bio}</p>

        {/* Quick Mission Launchers */}
        <div className="hero-actions">
          <button
            className="cyber-btn primary"
            onClick={() => {
              playWarpSound();
              setStation('datascience');
            }}
            onMouseEnter={playHoverSound}
          >
            <Cpu size={16} />
            <span>Launch AI Lab</span>
            <ArrowRight size={14} />
          </button>

          <button
            className="cyber-btn secondary"
            onClick={() => {
              playWarpSound();
              setStation('mobile');
            }}
            onMouseEnter={playHoverSound}
          >
            <Smartphone size={16} />
            <span>Mobile Apps 3D</span>
          </button>

          <button
            className="cyber-btn secondary"
            onClick={() => {
              playWarpSound();
              setStation('web');
            }}
            onMouseEnter={playHoverSound}
          >
            <Globe size={16} />
            <span>Web & ERP</span>
          </button>

          <button
            className="cyber-btn ghost"
            onClick={() => {
              playHoverSound();
              openResume();
            }}
            onMouseEnter={playHoverSound}
          >
            <FileText size={16} />
            <span>Resume</span>
          </button>
        </div>

        {/* Key Architectural Metrics Bar */}
        <div className="metrics-grid">
          {METRICS.map((m, i) => (
            <div key={i} className="metric-card" onMouseEnter={playHoverSound}>
              <div className="metric-header">
                <span className="metric-highlight">{m.highlight}</span>
                <Layers size={12} className="metric-icon" />
              </div>
              <div className="metric-value">{m.value}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: 3D Holographic Interaction Prompt */}
      <div className="hero-holo-prompt">
        <div className="holo-prompt-pill">
          <Rotate3d size={15} className="cyan" />
          <span>Interactive 3D Core // Drag to Inspect</span>
        </div>
      </div>
    </section>
  );
}
