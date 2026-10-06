import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../../data/portfolioData';
import { playHoverSound, playWarpSound } from '../../../utils/audioSynth';

export default function ChapterGenesis({ onExplore, openResume }) {
  return (
    <div className="chapter-overlay chapter-genesis">
      <div className="genesis-header-tag">
        <span>SECTOR 01 // ORIGIN & MISSION</span>
      </div>

      <div className="genesis-title-block">
        <span className="genesis-pretitle">PORTFOLIO // VOL. 2026</span>
        <h1 className="genesis-monumental-name">
          <span className="block-word">VARUN</span>
          <span className="block-word outline-word">CHATURVEDI</span>
        </h1>
        <p className="genesis-role-callout">
          SOFTWARE ENGINEER & MULTI-DISCIPLINARY ARCHITECT
        </p>
      </div>

      <p className="genesis-statement">
        {PERSONAL_INFO.bio}
      </p>

      {/* Production Impact Metrics Banner */}
      <div className="genesis-metrics-bar">
        <div className="genesis-m-item" onMouseEnter={playHoverSound}>
          <span className="m-val">120+</span>
          <span className="m-label">WEBSITES SCRAPED & CLEANED</span>
        </div>
        <div className="genesis-m-item" onMouseEnter={playHoverSound}>
          <span className="m-val">-65%</span>
          <span className="m-label">SQL API LATENCY REDUCTION</span>
        </div>
        <div className="genesis-m-item" onMouseEnter={playHoverSound}>
          <span className="m-val">10K+</span>
          <span className="m-label">CONCURRENT WEBSOCKETS</span>
        </div>
        <div className="genesis-m-item" onMouseEnter={playHoverSound}>
          <span className="m-val">0.8s</span>
          <span className="m-label">CORE WEB VITALS LCP</span>
        </div>
      </div>

      <div className="genesis-actions">
        <button
          className="shin-cta-btn primary"
          onClick={onExplore}
          onMouseEnter={playHoverSound}
        >
          <span>INITIATE 3D FLIGHT</span>
          <ArrowDown size={14} />
        </button>

        <button
          className="shin-cta-btn secondary"
          onClick={() => {
            playHoverSound();
            openResume();
          }}
          onMouseEnter={playHoverSound}
        >
          <span>VIEW CURRICULUM VITAE</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}
