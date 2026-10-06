import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Maximize2, Minimize2 } from 'lucide-react';
import { TERMINAL_COMMANDS } from '../../data/portfolioData';
import { playTerminalKey, playHoverSound } from '../../utils/audioSynth';

export default function InteractiveTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'sys', text: "Varun.OS v2.4 Interactive Cyberdeck Terminal initialized." },
    { type: 'sys', text: "Type 'help' to inspect available system commands." }
  ]);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      playTerminalKey();

      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }

      const response = TERMINAL_COMMANDS[cmd] || `Command not recognized: '${cmd}'. Type 'help' for options.`;
      setHistory((prev) => [
        ...prev,
        { type: 'user', text: `> ${input}` },
        { type: 'output', text: response }
      ]);
      setInput('');
    }
  };

  return (
    <div className="cyber-terminal holo-border">
      <div className="terminal-header">
        <div className="terminal-header-left">
          <TerminalIcon size={14} className="cyan" />
          <span className="terminal-title">TERMINAL // VARUN-CHANDRA-SYS</span>
        </div>
        <div className="terminal-dots">
          <span className="term-dot red" />
          <span className="term-dot yellow" />
          <span className="term-dot green" />
        </div>
      </div>

      <div className="terminal-body">
        {history.map((item, idx) => (
          <div key={idx} className={`term-line ${item.type}`}>
            {item.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="terminal-input-row">
        <span className="term-prompt">&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          placeholder="type 'help', 'skills', 'data', 'mobile', 'web', 'github'..."
          className="term-input"
          autoComplete="off"
          spellCheck="false"
        />
        <CornerDownLeft size={14} className="cyan term-enter-icon" />
      </div>
    </div>
  );
}
