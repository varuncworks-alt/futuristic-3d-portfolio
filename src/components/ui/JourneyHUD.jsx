import React from 'react';
import { Volume2, VolumeX, FileText, Compass, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playHoverSound, playWarpSound } from '../../utils/audioSynth';

export default function JourneyHUD({
  progress = 0,
  currentChapter = 0,
  velocity = 0,
  jumpToChapter,
  isMuted,
  toggleMute,
  openResume
}) {
  const chapters = [
    { idx: 0, tag: '01', title: 'ORIGIN' },
    { idx: 1, tag: '02', title: 'SYSTEMS' },
    { idx: 2, tag: '03', title: 'NEURAL LAB' },
    { idx: 3, tag: '04', title: '3D TWIN' },
    { idx: 4, tag: '05', title: 'RECORD' },
    { idx: 5, tag: '06', title: 'TRANSMIT' }
  ];

  const handleNext = () => {
    playWarpSound();
    jumpToChapter(Math.min(chapters.length - 1, currentChapter + 1));
  };

  const handlePrev = () => {
    playWarpSound();
    jumpToChapter(Math.max(0, currentChapter - 1));
  };

  return (
    <>
      {/* Top Floating Editorial HUD Bar */}
      <header className="journey-top-hud">
        <div
          className="hud-identity"
          onClick={() => {
            playWarpSound();
            jumpToChapter(0);
          }}
          onMouseEnter={playHoverSound}
        >
          <span className="hud-beacon-dot" />
          <span className="hud-name">VARUN CHATURVEDI</span>
          <span className="hud-role-pill">SAS ONE // SOFTWARE ENGINEER</span>
        </div>

        <div className="hud-coordinates">
          <Compass size={13} className="hud-coord-icon" />
          <span>[ 26.8467° N, 80.9462° E ] — LUCKNOW // NOIDA</span>
        </div>

        <div className="hud-actions">
          <button
            className="hud-icon-btn"
            onClick={toggleMute}
            onMouseEnter={playHoverSound}
            title={isMuted ? "Enable Ambient Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="audio-live" />}
          </button>

          <button
            className="hud-resume-btn"
            onClick={() => {
              playHoverSound();
              openResume();
            }}
            onMouseEnter={playHoverSound}
          >
            <span>RESUME (PDF)</span>
            <ArrowUpRight size={13} />
          </button>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-social-circle"
            onMouseEnter={playHoverSound}
            title="GitHub"
          >
            <Github size={14} />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hud-social-circle"
            onMouseEnter={playHoverSound}
            title="LinkedIn"
          >
            <Linkedin size={14} />
          </a>
        </div>
      </header>

      {/* Right Journey Scrubber (Interactive Flight Path Scrubber) */}
      <aside className="journey-scrubber-track">
        <div className="scrubber-header">
          <span className="scrubber-title">TRAJECTORY</span>
          <span className="scrubber-percent">{(progress * 100).toFixed(0)}%</span>
        </div>

        <div className="scrubber-nodes">
          {chapters.map((ch) => {
            const isActive = currentChapter === ch.idx;
            return (
              <button
                key={ch.idx}
                className={`scrubber-node-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  playWarpSound();
                  jumpToChapter(ch.idx);
                }}
                onMouseEnter={playHoverSound}
                title={ch.title}
              >
                <span className="node-marker" />
                <span className="node-tag">{ch.tag}</span>
                <span className="node-title">{ch.title}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Bottom Flight Controller Deck */}
      <footer className="journey-bottom-deck">
        <div className="deck-left">
          <span className="deck-label">CURRENT SECTOR:</span>
          <span className="deck-val">{chapters[currentChapter]?.title || 'ORIGIN'}</span>
        </div>

        <div className="deck-center">
          <button
            className="deck-arrow-btn"
            onClick={handlePrev}
            disabled={currentChapter === 0}
            onMouseEnter={playHoverSound}
            title="Previous Sector (Arrow Up)"
          >
            <ChevronUp size={16} />
          </button>
          <span className="deck-scroll-hint">SCROLL / DRAG / KEYS [↑ ↓] TO FLY</span>
          <button
            className="deck-arrow-btn"
            onClick={handleNext}
            disabled={currentChapter === chapters.length - 1}
            onMouseEnter={playHoverSound}
            title="Next Sector (Arrow Down)"
          >
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="deck-right">
          <span className="deck-label">VELOCITY:</span>
          <span className="deck-val">{(velocity * 10).toFixed(2)} MACH</span>
        </div>
      </footer>
    </>
  );
}
