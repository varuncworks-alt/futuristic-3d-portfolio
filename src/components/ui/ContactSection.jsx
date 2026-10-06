import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Terminal, Send, ArrowUp, Download, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Github, Linkedin } from './BrandIcons';
import { PERSONAL_INFO, SKILL_CATEGORIES, FEATURED_PROJECTS } from '../../data/portfolioData';

export default function ContactSection({ onOpenResume = () => {} }) {
  const [copied, setCopied] = useState(false);
  const [cliInput, setCliInput] = useState('');
  const [cliHistory, setCliHistory] = useState([
    { type: 'system', text: 'VARUN CHATURVEDI // INTERACTIVE TERMINAL v2.6.0' },
    { type: 'system', text: 'Type "help" to view available commands, or click the chips below.' }
  ]);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollTop = terminalEndRef.current.scrollHeight;
    }
  }, [cliHistory]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#6366f1', '#06b6d4', '#10b981']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const executeCommand = (cmd) => {
    const cleaned = cmd.trim().toLowerCase();
    const newHistory = [...cliHistory, { type: 'user', text: `> ${cmd}` }];

    switch (cleaned) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: 'Available commands: "skills", "projects", "contact", "resume", "clear"'
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'response',
          text: 'Core: Python, Django REST, FastAPI, MySQL, PostgreSQL, AWS EC2/S3, Docker, scikit-learn, Flutter, WebSockets, Pandas.'
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'response',
          text: 'Featured: StockOne ERP (Django/MySQL), AOLM Suite (Flutter/VoIP), Rashtra Dharam CMS (SEO/AWS), SoundX (WebSockets).'
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'response',
          text: `Email: ${PERSONAL_INFO.email} | Phone: ${PERSONAL_INFO.phone}`
        });
        break;
      case 'resume':
        newHistory.push({
          type: 'response',
          text: 'Opening verified PDF resume viewer...'
        });
        onOpenResume();
        break;
      case 'clear':
        setCliHistory([]);
        setCliInput('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${cleaned}". Type "help" for valid commands.`
        });
    }

    setCliHistory(newHistory);
    setCliInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && cliInput.trim()) {
      executeCommand(cliInput);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="section-container contact-section">
      <div className="section-header">
        <div className="section-eyebrow">
          <span className="section-eyebrow-dot"></span>
          <span>INITIATE CONTACT & COLLABORATION</span>
        </div>
        <h2 className="section-heading">Let's Build Something Exceptional.</h2>
        <p className="section-subtitle">
          I am actively exploring high-impact Software Engineering roles, backend architecture contracts, and machine learning initiatives.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left Column: Direct Communication Card */}
        <div className="contact-card glass-card">
          <h3 className="contact-card-title">Direct Inquiries</h3>
          <p className="contact-card-desc">
            Whether you have an enterprise system that needs scaling, an AI pipeline to build, or a full-time role to discuss, feel free to connect directly.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <div className="info-icon-box">
                <Mail size={16} className="text-indigo" />
              </div>
              <div className="info-content">
                <span className="info-label">Email Address</span>
                <span className="info-value">{PERSONAL_INFO.email}</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="btn-secondary btn-sm"
                title="Copy email to clipboard"
              >
                {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="contact-info-item">
              <div className="info-icon-box">
                <Phone size={16} className="text-cyan" />
              </div>
              <div className="info-content">
                <span className="info-label">Direct Phone</span>
                <span className="info-value">{PERSONAL_INFO.phone}</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="info-icon-box">
                <MapPin size={16} className="text-emerald" />
              </div>
              <div className="info-content">
                <span className="info-label">Base Location</span>
                <span className="info-value">{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          <div className="contact-actions-row">
            <button onClick={onOpenResume} className="btn-primary">
              <Download size={16} />
              <span>Download Resume</span>
            </button>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Developer CLI Terminal */}
        <div className="terminal-card glass-card">
          <div className="terminal-topbar">
            <div className="terminal-dots">
              <span className="term-dot red"></span>
              <span className="term-dot yellow"></span>
              <span className="term-dot green"></span>
            </div>
            <span className="terminal-title">bash // varun-engineer@terminal</span>
            <Terminal size={14} className="text-muted" />
          </div>

          <div ref={terminalEndRef} className="terminal-body">
            {cliHistory.map((item, idx) => (
              <div key={idx} className={`terminal-line line-${item.type}`}>
                {item.text}
              </div>
            ))}
          </div>

          {/* Quick command buttons */}
          <div className="terminal-quick-chips">
            <span className="chips-label">Quick run:</span>
            {['help', 'skills', 'projects', 'contact', 'resume'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="chip-btn"
              >
                {cmd}
              </button>
            ))}
          </div>

          <div className="terminal-input-row">
            <span className="term-prompt">$</span>
            <input
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command ('help', 'skills', 'contact')..."
              className="terminal-input"
            />
            <button
              onClick={() => cliInput.trim() && executeCommand(cliInput)}
              className="term-send-btn"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <footer className="footer-bar">
        <div className="footer-left">
          <span className="pulsing-dot"></span>
          <span>Designed & Engineered by Varun Chaturvedi • 2026</span>
        </div>
        <button onClick={scrollToTop} className="back-to-top-btn">
          <span>Back to Top</span>
          <ArrowUp size={14} />
        </button>
      </footer>
    </section>
  );
}
