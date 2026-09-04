import React from 'react';
import { Github, Linkedin, Mail, Terminal, ArrowUp, Cpu, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-hud-card border-t border-hud-border mt-20 pt-12 pb-8 text-hud-muted font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top footer row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-hud-border">
          {/* Identity column */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-hud-bright font-tech text-lg font-bold">
              <Cpu className="w-5 h-5 text-hud-green" />
              <span>SAMUVEL PRAKASH F</span>
            </div>
            <p className="text-hud-slate text-xs leading-relaxed max-w-md font-sans">
              Mechatronics Engineering student focused on building practical robotics systems, industrial automation logic, embedded firmware, and computer vision applications.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-hud-panel border border-hud-border text-[11px] text-hud-green">
                <span className="w-1.5 h-1.5 bg-hud-green rounded-full" />
                SYSTEM STATUS: ONLINE
              </span>
              <span className="inline-flex items-center gap-1 text-hud-slate text-[11px]">
                <MapPin className="w-3 h-3 text-hud-green" />
                COIMBATORE, TAMIL NADU
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2.5">
            <div className="text-hud-bright font-tech uppercase tracking-wider text-sm font-semibold">
              // NAVIGATION
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#about" className="hover:text-hud-green transition-colors flex items-center gap-1.5">
                  <span className="text-hud-green">&gt;</span> About &amp; Focus
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-hud-green transition-colors flex items-center gap-1.5">
                  <span className="text-hud-green">&gt;</span> Engineering Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-hud-green transition-colors flex items-center gap-1.5">
                  <span className="text-hud-green">&gt;</span> Featured Projects
                </a>
              </li>
              <li>
                <a href="#achievements" className="hover:text-hud-green transition-colors flex items-center gap-1.5">
                  <span className="text-hud-green">&gt;</span> Achievements
                </a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-hud-green transition-colors flex items-center gap-1.5">
                  <span className="text-hud-green">&gt;</span> Certifications
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-2.5">
            <div className="text-hud-bright font-tech uppercase tracking-wider text-sm font-semibold">
              // CONTACT CHANNELS
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/samkiller07"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-hud-panel border border-hud-border hover:border-hud-green/50 hover:text-hud-bright transition-colors rounded-sm"
              >
                <Github className="w-4 h-4 text-hud-green" />
                <span>GitHub Repository</span>
              </a>
              <a
                href="https://linkedin.com/in/samuvel-prakash-f-3385902a5"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-hud-panel border border-hud-border hover:border-hud-green/50 hover:text-hud-bright transition-colors rounded-sm"
              >
                <Linkedin className="w-4 h-4 text-hud-green" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="mailto:samuvelprakash09.11.2005@gmail.com"
                className="flex items-center gap-2 p-2 bg-hud-panel border border-hud-border hover:border-hud-green/50 hover:text-hud-bright transition-colors rounded-sm"
              >
                <Mail className="w-4 h-4 text-hud-green" />
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-hud-green" />
            <span>PORTFOLIO CONSOLE &copy; {new Date().getFullYear()} SAMUVEL PRAKASH F. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-hud-slate">LOCATION: COIMBATORE, TN</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 bg-hud-panel border border-hud-border hover:border-hud-green text-hud-muted hover:text-hud-green rounded-sm transition-colors"
              title="Return to top"
              aria-label="Return to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
