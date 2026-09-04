import React, { useState, useEffect } from 'react';
import { StatusBadge } from '../ui/StatusBadge';
import { Cpu, Menu, X, Terminal } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (view: 'home' | 'admin') => void;
  currentView: 'home' | 'admin';
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  currentView
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clock, setClock] = useState<string>('00:00:00');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time UTC clock tick
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      setClock(`${hours}:${minutes}:${seconds}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'about', label: '01 ABOUT' },
    { id: 'skills', label: '02 SKILLS' },
    { id: 'projects', label: '03 PROJECTS' },
    { id: 'achievements', label: '04 AWARDS' },
    { id: 'certifications', label: '05 CERTS' },
    { id: 'contact', label: '06 CONTACT' }
  ];

  const handleNavClick = (id: string) => {
    if (currentView === 'admin') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-hud-bg/90 backdrop-blur-md border-b border-hud-border shadow-lg py-2.5'
          : 'bg-transparent border-b border-hud-border/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-8 h-8 rounded-sm bg-hud-panel border border-hud-border-bright flex items-center justify-center text-hud-green group-hover:border-hud-green transition-colors">
            <Cpu className="w-4 h-4 text-hud-green" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-tech text-base sm:text-lg font-bold tracking-wider text-hud-bright group-hover:text-hud-green transition-colors">
                SAMUVEL PRAKASH F
              </span>
              <span className="hidden sm:inline-block">
                <StatusBadge status="ONLINE" size="sm" />
              </span>
            </div>
            <div className="text-[10px] font-mono text-hud-muted tracking-widest uppercase">
              MECHATRONICS &bull; ROBOTICS &bull; AI
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-mono text-xs" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentView === 'home' && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-sm transition-all duration-150 tracking-wider relative ${
                  isActive
                    ? 'text-hud-green bg-hud-panel border border-hud-green/50'
                    : 'text-hud-muted hover:text-hud-text hover:bg-hud-panel/40'
                }`}
              >
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-hud-green" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Status Telemetry */}
        <div className="hidden md:flex items-center gap-3 font-mono text-xs">
          <div className="px-2.5 py-1 bg-hud-card border border-hud-border rounded-sm text-[11px] text-hud-muted flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-hud-green rounded-full animate-pulse" />
            <span className="text-hud-slate">UTC {clock}</span>
          </div>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-hud-card border border-hud-border rounded-sm text-hud-muted hover:text-hud-green focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-hud-card/95 backdrop-blur-md border-b border-hud-border px-4 py-4 mt-2 space-y-1 font-mono text-sm">
          <div className="pb-2 mb-2 border-b border-hud-border flex items-center justify-between text-xs text-hud-muted">
            <span>SYS.NAVIGATION</span>
            <StatusBadge status="ONLINE" size="sm" />
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3 py-2 rounded-sm tracking-wider flex items-center justify-between ${
                currentView === 'home' && activeSection === item.id
                  ? 'text-hud-green bg-hud-panel border-l-2 border-hud-green'
                  : 'text-hud-muted hover:text-hud-text hover:bg-hud-panel/40'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs text-hud-border-bright">&rarr;</span>
            </button>
          ))}

          <div className="pt-3 border-t border-hud-border flex items-center justify-between text-xs text-hud-muted">
            <span>TIME: {clock}</span>
          </div>
        </div>
      )}
    </header>
  );
};
