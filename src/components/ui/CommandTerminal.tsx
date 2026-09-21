import React, { useState } from 'react';
import { Terminal, Send, CheckCircle2, ChevronRight, Sparkles, Activity } from 'lucide-react';

interface CommandTerminalProps {
  onNavigate: (sectionId: string) => void;
  onStartProject: () => void;
}

export const CommandTerminal: React.FC<CommandTerminalProps> = ({
  onNavigate,
  onStartProject
}) => {
  const [commandInput, setCommandInput] = useState('');
  const [commandOutput, setCommandOutput] = useState<string | null>(null);

  const modules = [
    { id: 'services', label: '01 SERVICES', icon: '⚡' },
    { id: 'projects', label: '02 PROJECTS', icon: '🛠️' },
    { id: 'skills', label: '03 SKILLS', icon: '🧠' },
    { id: 'achievements', label: '04 TIMELINE', icon: '🏆' },
    { id: 'about', label: '05 ABOUT', icon: '👤' },
    { id: 'contact', label: '06 START A PROJECT', icon: '🚀', highlight: true }
  ];

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'help') {
      setCommandOutput('AVAILABLE COMMANDS: services, projects, skills, timeline, about, hire, start, clear');
    } else if (cmd === 'services' || cmd === '01') {
      setCommandOutput('NAVIGATING TO // FREELANCE SERVICES WORKSTATION...');
      onNavigate('services');
    } else if (cmd === 'projects' || cmd === '02') {
      setCommandOutput('MOUNTING // INTERACTIVE PROJECT SHOWCASE...');
      onNavigate('projects');
    } else if (cmd === 'skills' || cmd === '03') {
      setCommandOutput('LOADING // CAPABILITY & DOMAIN EXPLORER...');
      onNavigate('skills');
    } else if (cmd === 'timeline' || cmd === 'achievements' || cmd === '04') {
      setCommandOutput('RETRIEVING // HONORS & COMPETITION MILESTONES...');
      onNavigate('achievements');
    } else if (cmd === 'about' || cmd === '05') {
      setCommandOutput('DISPLAYING // OPERATOR SYSTEM SPECIFICATION...');
      onNavigate('about');
    } else if (cmd === 'hire' || cmd === 'start' || cmd === 'contact' || cmd === '06') {
      setCommandOutput('OPENING // DIRECT CLIENT PROJECT INQUIRY FORM...');
      onStartProject();
    } else if (cmd === 'clear') {
      setCommandOutput(null);
    } else {
      setCommandOutput(`UNKNOWN COMMAND "${cmd}". TYPE "help" OR CLICK A MODULE BUTTON BELOW.`);
    }

    setCommandInput('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 font-mono">
      <div className="bg-hud-card/90 border border-hud-border hover:border-hud-green/50 rounded-sm p-3 sm:p-4 shadow-xl backdrop-blur-md hud-corner space-y-3">
        {/* Top Status & Module Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-hud-border/70 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-hud-green rounded-full animate-ping" />
            <span className="text-hud-green font-bold">[SYS.ONLINE]</span>
            <span className="text-hud-border-bright">|</span>
            <span className="text-hud-slate hidden sm:inline">SAMUVEL.OS // COMMAND TERMINAL</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-[11px] text-hud-muted">
            <span className="text-hud-slate">
              STACK: <span className="text-hud-bright">ESP32 ● PLC ● PYTHON ● OPENCV ● IOT</span>
            </span>
            <span className="text-hud-border-bright hidden md:inline">|</span>
            <span className="text-hud-green hidden md:inline">AVAILABLE FOR HIRE</span>
          </div>
        </div>

        {/* Quick Module Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-hud-green font-bold flex items-center gap-1 mr-1">
            <ChevronRight className="w-3.5 h-3.5" />
            <span>SELECT_MODULE:</span>
          </span>

          {modules.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => (m.id === 'contact' ? onStartProject() : onNavigate(m.id))}
              className={`px-2.5 py-1 text-xs rounded-sm transition-all flex items-center gap-1.5 cursor-pointer border ${
                m.highlight
                  ? 'bg-hud-green text-black border-hud-green font-bold shadow-sm shadow-hud-green/30 hover:bg-hud-green/90'
                  : 'bg-hud-panel hover:bg-hud-hover border-hud-border hover:border-hud-green/70 text-hud-text hover:text-hud-bright'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Optional Command Input Line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-hud-green text-xs font-bold pl-1 flex-shrink-0">
            <Terminal className="w-3.5 h-3.5" />
            <span>&gt;</span>
          </div>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type command (e.g. 'services', 'projects', 'hire', 'help') or click buttons above..."
            className="flex-1 bg-hud-bg/70 border border-hud-border focus:border-hud-green/80 text-hud-bright text-xs px-3 py-1.5 rounded-sm outline-none placeholder:text-hud-muted transition-colors"
            aria-label="Terminal Command Input"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-hud-panel hover:bg-hud-green hover:text-black border border-hud-border hover:border-hud-green text-hud-text hover:text-black text-xs rounded-sm transition-colors flex items-center gap-1"
          >
            <span>RUN</span>
            <Send className="w-3 h-3" />
          </button>
        </form>

        {/* Terminal Feedback message if present */}
        {commandOutput && (
          <div className="text-xs bg-hud-bg p-2 border-l-2 border-hud-green text-hud-green flex items-center justify-between animate-fadeIn">
            <span>{commandOutput}</span>
            <button
              onClick={() => setCommandOutput(null)}
              className="text-[10px] text-hud-muted hover:text-hud-bright ml-2"
            >
              [DISMISS]
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
