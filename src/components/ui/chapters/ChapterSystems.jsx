import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Server, Smartphone, Globe, Music } from 'lucide-react';
import { playHoverSound, playTerminalKey } from '../../../utils/audioSynth';

export default function ChapterSystems() {
  const [activeItem, setActiveItem] = useState(0);

  const systems = [
    {
      id: "stockone",
      num: "01",
      title: "STOCKONE ENTERPRISE ERP",
      category: "Enterprise Cloud Backend // High-Throughput",
      desc: "Full-scale enterprise inventory, multi-warehouse stock management, and automated reporting backend built with Django REST Framework, MySQL, and AWS EC2/S3.",
      specs: [
        "Architected role-based authorization modules and secure system integrations.",
        "Optimized complex SQL queries reducing API response times by 70% on large datasets.",
        "Engineered bulk data import/export pipelines with Pandas processing tens of thousands of records."
      ],
      tags: ["Python", "Django REST", "AWS S3/EC2", "MySQL", "Pandas", "Docker"],
      repo: "https://github.com/varun01234/Django-Project"
    },
    {
      id: "aolm",
      num: "02",
      title: "AOLM CROSS-PLATFORM MOBILE SUITE",
      category: "Mobile Architecture // Offline-First Engine",
      desc: "Enterprise field operations mobile app delivering instant barcode lookups, offline SQLite queue synchronization, and zero-latency push alert dispatch.",
      specs: [
        "Optimistic UI updates with resilient local database synchronization.",
        "Role-based permission gating synchronized with desktop enterprise ERP.",
        "Cross-platform responsive layout optimized for smartphones and tablets."
      ],
      tags: ["Flutter / React Native", "SQLite", "Firebase Cloud Messaging", "REST APIs"],
      repo: "https://github.com/varun01234"
    },
    {
      id: "rashtradharam",
      num: "03",
      title: "RASHTRA DHARAM DIGITAL CMS",
      category: "High-Traffic Publication // Redis Caching",
      desc: "Digital publication platform serving over 500,000 monthly readers with instant publishing workflows, Redis caching layers, and JSON-LD structured news metadata.",
      specs: [
        "High-concurrency Redis caching layer serving cached fragments to eliminate database bottlenecks.",
        "Structured rich-text WYSIWYG workflow for editorial staff.",
        "Full schema.org microdata for Google News rich-result inclusion."
      ],
      tags: ["Python", "Django", "Next.js", "PostgreSQL", "Redis", "JSON-LD"],
      repo: "https://github.com/varun01234"
    },
    {
      id: "soundx",
      num: "04",
      title: "SOUNDX AUDIO EXPERIENCE PLATFORM",
      category: "Creative WebGL // Web Audio Synthesis",
      desc: "Futuristic audio platform featuring real-time frequency analysis, 60 FPS interactive WebGL mesh rendering, and spatial sound modulation.",
      specs: [
        "Canvas-based real-time frequency visualizer connected to Web Audio analyzer node.",
        "Fully responsive audio player with keyboard shortcuts and spatial presets.",
        "Sub-second page load times with asset preloading."
      ],
      tags: ["React.js", "Web Audio API", "Three.js", "Vanilla CSS"],
      repo: "https://github.com/varun01234"
    }
  ];

  const current = systems[activeItem];

  return (
    <div className="chapter-overlay chapter-systems">
      <div className="chapter-badge-line">
        <span className="chapter-num-tag">SECTOR 02 // SYSTEMS ARCHITECTURE</span>
        <span className="chapter-sub-tag">SCALABLE BACKENDS & MULTI-WAREHOUSE ERPS</span>
      </div>

      <div className="systems-dual-layout">
        {/* Left: Interactive Monolith Switcher */}
        <div className="systems-selector-col">
          {systems.map((s, idx) => (
            <button
              key={s.id}
              className={`system-tab-btn ${activeItem === idx ? 'active' : ''}`}
              onClick={() => {
                playTerminalKey();
                setActiveItem(idx);
              }}
              onMouseEnter={playHoverSound}
            >
              <span className="tab-num">{s.num}</span>
              <span className="tab-name">{s.title}</span>
              <span className="tab-arrow">→</span>
            </button>
          ))}
        </div>

        {/* Right: Focused System Monograph */}
        <div className="system-monograph-card">
          <div className="monograph-top">
            <span className="monograph-category">{current.category}</span>
            <a
              href={current.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="monograph-link"
              title="Inspect Repository"
            >
              <span>VIEW REPO</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <h2 className="monograph-title">{current.title}</h2>
          <p className="monograph-desc">{current.desc}</p>

          <div className="monograph-specs">
            <h4 className="specs-title">ENGINEERING SPECS:</h4>
            <ul className="specs-list">
              {current.specs.map((sp, i) => (
                <li key={i}>
                  <span className="dash">—</span>
                  <span>{sp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="monograph-tags">
            {current.tags.map((t, idx) => (
              <span key={idx} className="monograph-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
