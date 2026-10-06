import React from 'react';
import { Smartphone, WifiOff, PhoneCall, MessageSquare, ShieldCheck, Database, Layers, Radio } from 'lucide-react';

export default function MobileSection() {
  const pillars = [
    {
      icon: <WifiOff className="text-cyan" size={24} />,
      title: "Offline-First Local SQLite Sync",
      desc: "Architected local SQLite caching allowing field agents to create, inspect, and update critical inventory records without cellular coverage, automatically reconciling changes when back online.",
      tags: ["SQLite", "Drift / Moor", "Conflict Resolution", "Local Storage"]
    },
    {
      icon: <PhoneCall className="text-indigo" size={24} />,
      title: "Enterprise VoIP & Zadarma Telephony",
      desc: "Integrated Zadarma SIP VoIP trunks and IVR routing into mobile interfaces, enabling one-touch client calls, automated call recording, and real-time CRM logging.",
      tags: ["Zadarma API", "SIP Protocol", "WebRTC", "Audio Routing"]
    },
    {
      icon: <Radio className="text-emerald" size={24} />,
      title: "Real-Time WebSockets Communication",
      desc: "Engineered low-latency bidirectional messaging channels for live inventory dispatch, field agent geolocation tracking, and instant push event broadcast.",
      tags: ["WebSockets", "Push Notifications", "Event Streams", "Node.js"]
    },
    {
      icon: <MessageSquare className="text-amber" size={24} />,
      title: "Automated WhatsApp Business Bots",
      desc: "Deployed automated conversational capture pipelines via WhatsApp Business Cloud API to qualify leads, send catalog updates, and sync inquiries directly into backend ERP.",
      tags: ["WhatsApp Cloud API", "Webhook Ingestion", "Chatbot NLP", "FastAPI"]
    }
  ];

  return (
    <section id="mobile" className="section-container mobile-section">
      <div className="section-header">
        <div className="section-eyebrow">
          <span className="section-eyebrow-dot"></span>
          <span>CROSS-PLATFORM MOBILE & REAL-TIME ARCHITECTURE</span>
        </div>
        <h2 className="section-heading">Engineered For Fluid Mobile Execution.</h2>
        <p className="section-subtitle">
          Cross-platform Flutter and React Native suites designed for uncompromised offline resilience, low-latency telemetry, and hardware-level VoIP telephony.
        </p>
      </div>

      <div className="mobile-pillars-grid">
        {pillars.map((pillar, idx) => (
          <div key={idx} className="pillar-card glass-card">
            <div className="pillar-icon-box">
              {pillar.icon}
            </div>
            <h3 className="pillar-title">{pillar.title}</h3>
            <p className="pillar-desc">{pillar.desc}</p>
            <div className="pillar-tags">
              {pillar.tags.map((t, i) => (
                <span key={i} className="mini-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
