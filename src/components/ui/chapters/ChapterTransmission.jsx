import React, { useState, useEffect } from 'react';
import { Send, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../../../data/portfolioData';
import { Github, Linkedin } from '../BrandIcons';
import { fetchGitHubUserData } from '../../../utils/githubApi';
import { playHoverSound, playTransmitSound, playTerminalKey } from '../../../utils/audioSynth';

export default function ChapterTransmission() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [ghData, setGhData] = useState(null);

  useEffect(() => {
    fetchGitHubUserData('varun01234').then(setGhData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setSubmitted(true);
    playTransmitSound();

    try {
      confetti({
        particleCount: 75,
        spread: 65,
        origin: { y: 0.7 },
        colors: ['#ffffff', '#00f0ff', '#a855f7']
      });
    } catch (e) {}

    const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent('Transmission from ' + form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto, '_blank');
  };

  return (
    <div className="chapter-overlay chapter-transmit">
      <div className="chapter-badge-line">
        <span className="chapter-num-tag">SECTOR 06 // DEEP SPACE TRANSMISSION</span>
        <span className="chapter-sub-tag">DIRECT INQUIRIES & ADVISORY ROLES</span>
      </div>

      <div className="transmit-hero-block">
        <h2 className="transmit-monumental-title">
          LET'S ARCHITECT THE IMPOSSIBLE.
        </h2>
        <p className="transmit-lead">
          Available for high-impact software engineering roles, enterprise backend systems, and data intelligence architectures.
        </p>
      </div>

      <div className="transmit-dual-grid">
        {/* Direct Coordinates */}
        <div className="transmit-left">
          <div className="channel-box-list">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="channel-box-item"
              onMouseEnter={playHoverSound}
            >
              <div className="c-meta">
                <span className="c-tag">PRIMARY TRANSMISSION</span>
                <span className="c-val">{PERSONAL_INFO.email}</span>
              </div>
              <ArrowUpRight size={16} />
            </a>

            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="channel-box-item"
              onMouseEnter={playHoverSound}
            >
              <div className="c-meta">
                <span className="c-tag">DIRECT VOICE / WHATSAPP</span>
                <span className="c-val">{PERSONAL_INFO.phone}</span>
              </div>
              <ArrowUpRight size={16} />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-box-item"
              onMouseEnter={playHoverSound}
            >
              <div className="c-meta">
                <span className="c-tag">LINKEDIN NETWORK</span>
                <span className="c-val">linkedin.com/in/varun-chaturvedi-b300a8243</span>
              </div>
              <ArrowUpRight size={16} />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-box-item"
              onMouseEnter={playHoverSound}
            >
              <div className="c-meta">
                <span className="c-tag">GITHUB REPOSITORIES</span>
                <span className="c-val">github.com/varun01234</span>
              </div>
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* GitHub Live Radar Telemetry */}
          {ghData && (
            <div className="github-flight-radar">
              <div className="radar-header">
                <span className="beacon-ping" />
                <span className="radar-title">GITHUB LIVE TELEMETRY: @{ghData.user.login}</span>
              </div>
              <div className="radar-stat-strip">
                <div className="radar-item">
                  <span className="ri-label">PUBLIC REPOSITORIES</span>
                  <span className="ri-val">{ghData.user.publicRepos}</span>
                </div>
                <div className="radar-item">
                  <span className="ri-label">PRIMARY LANGUAGE</span>
                  <span className="ri-val">Python</span>
                </div>
                <div className="radar-item">
                  <span className="ri-label">TOTAL STARS</span>
                  <span className="ri-val">{ghData.stats.totalStars}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Dispatch Console */}
        <div className="transmit-right">
          {submitted ? (
            <div className="transmit-ack-card">
              <CheckCircle2 size={44} className="ack-glyph" />
              <h4>SIGNAL DISPATCHED</h4>
              <p>Your transmission parameters have been encoded. An email draft has been generated for direct routing to {PERSONAL_INFO.email}.</p>
              <button
                className="shin-cta-btn secondary"
                onClick={() => setSubmitted(false)}
              >
                DISPATCH ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="transmit-form-console">
              <div className="t-field">
                <label className="t-label">YOUR NAME / ENTITY</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova / Google X"
                  value={form.name}
                  onChange={(e) => {
                    playTerminalKey();
                    setForm({ ...form, name: e.target.value });
                  }}
                  className="t-input"
                />
              </div>

              <div className="t-field">
                <label className="t-label">COMMUNICATION EMAIL</label>
                <input
                  type="email"
                  required
                  placeholder="elena@company.com"
                  value={form.email}
                  onChange={(e) => {
                    playTerminalKey();
                    setForm({ ...form, email: e.target.value });
                  }}
                  className="t-input"
                />
              </div>

              <div className="t-field">
                <label className="t-label">TRANSMISSION SCOPE</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Share details regarding team goals, backend architecture, or project scope..."
                  value={form.message}
                  onChange={(e) => {
                    playTerminalKey();
                    setForm({ ...form, message: e.target.value });
                  }}
                  className="t-textarea"
                />
              </div>

              <button
                type="submit"
                className="shin-cta-btn primary t-submit-btn"
                onMouseEnter={playHoverSound}
              >
                <span>TRANSMIT SIGNAL</span>
                <ArrowUpRight size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
