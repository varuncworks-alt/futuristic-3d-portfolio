import React, { useState } from 'react';
import { 
  Smartphone, 
  MessageSquare, 
  PhoneCall, 
  Layers, 
  CheckCircle2, 
  WifiOff, 
  Bell, 
  ShieldCheck,
  Zap
} from 'lucide-react';
import { MOBILE_PROJECTS } from '../../data/portfolioData';
import { playHoverSound, playTerminalKey } from '../../utils/audioSynth';

export default function MobileStation({ activeScreenIndex, setActiveScreenIndex }) {
  const activeProject = MOBILE_PROJECTS[activeScreenIndex] || MOBILE_PROJECTS[0];

  return (
    <div className="station-container">
      <div className="station-header">
        <div className="station-title-wrap">
          <Smartphone className="station-title-icon emerald" size={24} />
          <h2 className="station-title">Mobile Engineering & Conversational Hangar</h2>
        </div>
        <p className="station-subtitle">
          Cross-platform Flutter / React Native enterprise apps, WhatsApp conversational bots, and VOIP/IVR telephony integrations.
        </p>
      </div>

      {/* Interactive Mobile Selector Bar */}
      <div className="mobile-tabs-bar">
        {MOBILE_PROJECTS.map((p, idx) => {
          const isSelected = activeScreenIndex === idx;
          return (
            <button
              key={p.id}
              className={`mobile-tab-btn ${isSelected ? 'active' : ''}`}
              onClick={() => {
                playTerminalKey();
                setActiveScreenIndex(idx);
              }}
              onMouseEnter={playHoverSound}
            >
              <span className="tab-idx">0{idx + 1}</span>
              <span className="tab-title">{p.title}</span>
              <span className="tab-badge">{p.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Dual Column Layout: Interactive Phone Mockup & Architectural Breakdown */}
      <div className="mobile-showcase-grid">
        {/* Left Column: Interactive Phone Screen Mockup */}
        <div className="phone-preview-card holo-border">
          <div className="phone-bezel">
            <div className="phone-island">
              <div className="island-lens" />
            </div>

            <div className="phone-screen-content">
              <div className="screen-header">
                <span className="screen-app-name">{activeProject.title}</span>
                <span className="screen-status-pill">{activeProject.platform}</span>
              </div>

              <div className="screen-carousel">
                {activeProject.screens.map((screen, sIdx) => (
                  <div key={sIdx} className="screen-card-box">
                    <div className="screen-card-top">
                      <Zap size={14} className="emerald" />
                      <span className="screen-card-title">{screen.title}</span>
                    </div>
                    <p className="screen-card-desc">{screen.desc}</p>
                  </div>
                ))}
              </div>

              <div className="phone-bottom-nav">
                <div className="phone-nav-pill active" />
                <div className="phone-nav-pill" />
                <div className="phone-nav-pill" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Deep Architectural Specifications */}
        <div className="mobile-details-card">
          <div className="details-header">
            <span className="platform-tag">{activeProject.platform}</span>
            <h3 className="details-title">{activeProject.title}</h3>
          </div>

          <p className="details-summary">{activeProject.summary}</p>

          <div className="spec-section">
            <h4 className="spec-heading">Engineering Highlights</h4>
            <ul className="spec-list">
              {activeProject.highlights.map((h, i) => (
                <li key={i} className="spec-item">
                  <CheckCircle2 size={15} className="emerald" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="spec-section">
            <h4 className="spec-heading">Technology & Integration Stack</h4>
            <div className="tech-tags">
              {activeProject.tech.map((t, idx) => (
                <span key={idx} className="tech-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
