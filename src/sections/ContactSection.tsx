import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  Terminal,
  Copy,
  Check,
  Radio,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const CONTACT_INFO = {
  name: 'SAMUVEL PRAKASH F',
  email: 'samuvelprakash09.11.2005@gmail.com',
  linkedin: 'https://linkedin.com/in/samuvel-prakash-f-3385902a5',
  github: 'https://github.com/samkiller07',
  location: 'Tamil Nadu, India',
  timezone: 'IST (UTC +5:30)',
  status: 'OPEN FOR ROLES & COLLABORATIONS'
};

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-hud-bg border-t border-hud-border">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full animate-ping" />
            <span>07 // COMMS UPLINK &bull; DIRECT REACHABILITY</span>
          </div>
          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            CONNECT &amp; DIRECT CHANNELS
          </h2>
          <div className="circuit-line-h w-48" />
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Email Direct Channel Card */}
          <div className="bg-hud-card border border-hud-border p-6 rounded-sm space-y-4 hud-corner flex flex-col justify-between hover:border-hud-green/50 transition-all duration-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-sm bg-hud-green/10 border border-hud-green/30 flex items-center justify-center text-hud-green">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-hud-green uppercase tracking-wider bg-hud-panel px-2 py-0.5 border border-hud-green/20 rounded-sm">
                  PRIMARY EMAIL
                </span>
              </div>
              <div>
                <h3 className="font-tech text-base font-bold text-hud-bright uppercase">
                  DIRECT EMAIL INBOX
                </h3>
                <p className="text-xs text-hud-slate font-sans mt-1">
                  For job opportunities, technical consulting, and robotics research inquiries.
                </p>
              </div>
              <div className="p-2.5 bg-hud-panel border border-hud-border rounded-sm font-mono text-xs text-hud-bright break-all">
                {CONTACT_INFO.email}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="flex-1 py-2 px-3 bg-hud-panel hover:bg-hud-hover border border-hud-border hover:border-hud-green text-hud-bright rounded-sm font-mono text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-hud-green" />
                    <span className="text-hud-green font-bold">COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-hud-muted" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="p-2 bg-hud-green/10 hover:bg-hud-green text-hud-green hover:text-black border border-hud-green/40 rounded-sm transition-colors"
                title="Open Email Client"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* LinkedIn Profile Card */}
          <div className="bg-hud-card border border-hud-border p-6 rounded-sm space-y-4 hud-corner flex flex-col justify-between hover:border-hud-green/50 transition-all duration-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-sm bg-hud-green/10 border border-hud-green/30 flex items-center justify-center text-hud-green">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-hud-green uppercase tracking-wider bg-hud-panel px-2 py-0.5 border border-hud-green/20 rounded-sm">
                  PROFESSIONAL
                </span>
              </div>
              <div>
                <h3 className="font-tech text-base font-bold text-hud-bright uppercase">
                  LINKEDIN NETWORK
                </h3>
                <p className="text-xs text-hud-slate font-sans mt-1">
                  Connect for professional updates, publications, and engineering career networking.
                </p>
              </div>
              <div className="p-2.5 bg-hud-panel border border-hud-border rounded-sm font-mono text-xs text-hud-slate truncate">
                in/samuvel-prakash-f-3385902a5
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-hud-panel hover:bg-hud-green hover:text-black border border-hud-border hover:border-hud-green text-hud-bright rounded-sm font-mono text-xs flex items-center justify-center gap-2 transition-colors group"
              >
                <span>VIEW LINKEDIN PROFILE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* GitHub Repositories Card */}
          <div className="bg-hud-card border border-hud-border p-6 rounded-sm space-y-4 hud-corner flex flex-col justify-between hover:border-hud-green/50 transition-all duration-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-sm bg-hud-green/10 border border-hud-green/30 flex items-center justify-center text-hud-green">
                  <Github className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-hud-green uppercase tracking-wider bg-hud-panel px-2 py-0.5 border border-hud-green/20 rounded-sm">
                  CODE &amp; CAD
                </span>
              </div>
              <div>
                <h3 className="font-tech text-base font-bold text-hud-bright uppercase">
                  GITHUB REPOSITORY
                </h3>
                <p className="text-xs text-hud-slate font-sans mt-1">
                  Explore open source robotics code, firmware, CAD designs, and active projects.
                </p>
              </div>
              <div className="p-2.5 bg-hud-panel border border-hud-border rounded-sm font-mono text-xs text-hud-slate truncate">
                github.com/samkiller07
              </div>
            </div>

            <div className="pt-2">
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 bg-hud-panel hover:bg-hud-green hover:text-black border border-hud-border hover:border-hud-green text-hud-bright rounded-sm font-mono text-xs flex items-center justify-center gap-2 transition-colors group"
              >
                <span>VISIT GITHUB REPOSITORY</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Telemetry & Availability Footer Banner */}
        <div className="p-4 sm:p-5 bg-hud-card border border-hud-border rounded-sm flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2 text-hud-green font-bold">
            <Radio className="w-4 h-4 text-hud-green animate-pulse" />
            <span>OPERATOR STATUS: {CONTACT_INFO.status}</span>
          </div>
          <div className="flex items-center gap-6 text-hud-slate text-[11px]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-hud-muted" />
              <span>{CONTACT_INFO.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-hud-muted" />
              <span>{CONTACT_INFO.timezone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-hud-green" />
              <span>VERIFIED OPERATOR</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
