import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  Phone, 
  
  CheckCircle2, 
  Sparkles, 
  MapPin,
  Radio
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Github, Linkedin } from './BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { playHoverSound, playTransmitSound, playTerminalKey } from '../../utils/audioSynth';

export default function ContactTerminal() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [receiptCode, setReceiptCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    // Generate futuristic receipt code
    const code = 'TX-' + Math.floor(100000 + Math.random() * 900000);
    setReceiptCode(code);
    setSubmitted(true);
    playTransmitSound();

    // Trigger celebratory cyber confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#a855f7', '#10b981', '#f59e0b']
      });
    } catch (e) {}

    // Open user's email client draft
    const mailto = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Transmission: ' + form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`)}`;
    window.open(mailto, '_blank');
  };

  return (
    <div className="station-container">
      <div className="station-header">
        <div className="station-title-wrap">
          <Send className="station-title-icon cyan" size={24} />
          <h2 className="station-title">Sub-Space Transmission Hub</h2>
        </div>
        <p className="station-subtitle">
          Initiate direct communication for high-impact software engineering roles, enterprise consulting, data architecture, or freelance projects.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left Column: Direct Access Channels */}
        <div className="contact-channels-card holo-border">
          <div className="channels-title-row">
            <Radio size={18} className="cyan" />
            <h3 className="channels-title">Direct Comms Channels</h3>
          </div>

          <div className="channel-items">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="channel-item"
              onMouseEnter={playHoverSound}
            >
              <div className="channel-icon-wrap cyan-bg-trans">
                <Mail size={18} className="cyan" />
              </div>
              <div className="channel-text">
                <span className="channel-label">Official Email</span>
                <span className="channel-val">{PERSONAL_INFO.email}</span>
              </div>
            </a>

            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="channel-item"
              onMouseEnter={playHoverSound}
            >
              <div className="channel-icon-wrap emerald-bg-trans">
                <Phone size={18} className="emerald" />
              </div>
              <div className="channel-text">
                <span className="channel-label">Direct Phone / WhatsApp</span>
                <span className="channel-val">{PERSONAL_INFO.phone}</span>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-item"
              onMouseEnter={playHoverSound}
            >
              <div className="channel-icon-wrap purple-bg-trans">
                <Linkedin size={18} className="purple" />
              </div>
              <div className="channel-text">
                <span className="channel-label">LinkedIn Profile</span>
                <span className="channel-val">linkedin.com/in/varun-chaturvedi</span>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-item"
              onMouseEnter={playHoverSound}
            >
              <div className="channel-icon-wrap yellow-bg-trans">
                <Github size={18} className="yellow" />
              </div>
              <div className="channel-text">
                <span className="channel-label">GitHub Repositories</span>
                <span className="channel-val">github.com/varun01234</span>
              </div>
            </a>

            <div className="channel-item static">
              <div className="channel-icon-wrap cyan-bg-trans">
                <MapPin size={18} className="cyan" />
              </div>
              <div className="channel-text">
                <span className="channel-label">Operating Location</span>
                <span className="channel-val">{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Cyber Transmission Form */}
        <div className="contact-form-card holo-border">
          {submitted ? (
            <div className="transmission-success">
              <div className="success-icon-wrap">
                <CheckCircle2 size={44} className="emerald" />
              </div>
              <h3 className="success-title">Transmission Dispatched!</h3>
              <p className="success-desc">
                Your transmission has been packet-verified and logged. An email draft has been prepared to ensure instantaneous delivery.
              </p>
              <div className="receipt-box">
                <span className="receipt-label">TRANSMISSION RECEIPT:</span>
                <span className="receipt-val cyan">{receiptCode}</span>
              </div>
              <button
                className="cyber-btn secondary reset-btn"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', subject: '', message: '' });
                }}
              >
                Send Another Transmission
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="transmission-form">
              <h3 className="form-heading">Send Encrypted Transmission</h3>

              <div className="form-group">
                <label className="form-label">Your Name / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova / Google X"
                  value={form.name}
                  onChange={(e) => {
                    playTerminalKey();
                    setForm({ ...form, name: e.target.value });
                  }}
                  className="cyber-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Return Communication Email</label>
                <input
                  type="email"
                  required
                  placeholder="elena@company.com"
                  value={form.email}
                  onChange={(e) => {
                    playTerminalKey();
                    setForm({ ...form, email: e.target.value });
                  }}
                  className="cyber-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mission Subject</label>
                <input
                  type="text"
                  placeholder="Senior Python Engineer / Data Science Pipeline Architecture"
                  value={form.subject}
                  onChange={(e) => {
                    playTerminalKey();
                    setForm({ ...form, subject: e.target.value });
                  }}
                  className="cyber-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Transmission Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Share details regarding your requirements, team goals, or project scope..."
                  value={form.message}
                  onChange={(e) => {
                    playTerminalKey();
                    setForm({ ...form, message: e.target.value });
                  }}
                  className="cyber-textarea"
                />
              </div>

              <button
                type="submit"
                className="cyber-btn primary submit-btn"
                onMouseEnter={playHoverSound}
              >
                <Send size={16} />
                <span>Transmit Signal</span>
                <Sparkles size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
