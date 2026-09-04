import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import {
  Mail,
  Linkedin,
  Github,
  Terminal,
  Copy,
  Check,
  Radio,
  Send,
  CheckCircle2,
  Clock
} from 'lucide-react';

const CONTACT_INFO = {
  name: 'SAMUVEL PRAKASH F',
  email: 'samuvelprakash09.11.2005@gmail.com',
  linkedin: 'https://linkedin.com/in/samuvel-prakash-f-3385902a5',
  github: 'https://github.com/samkiller07'
};

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleDirectEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject || 'Engineering Discussion'} - ${senderName}`);
    const mailBody = encodeURIComponent(`Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${mailSubject}&body=${mailBody}`;
    setIsSent(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-hud-bg border-t border-hud-border">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full" />
            <span>07 // COMMS UPLINK &bull; DIRECT REACHABILITY</span>
          </div>
          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            CONNECT &amp; INITIATE TRANSMISSION
          </h2>
          <div className="circuit-line-h w-48" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left info & direct channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-hud-card border border-hud-border p-5 sm:p-6 rounded-sm space-y-4 hud-corner">
              <div className="font-mono text-xs text-hud-green uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>OFFICIAL CHANNELS</span>
              </div>
              <p className="text-xs sm:text-sm text-hud-slate leading-relaxed font-sans">
                Open to full-time engineering roles, robotics R&amp;D positions, industrial automation internships, and ambitious mechatronics collaborations.
              </p>

              <div className="space-y-3 pt-2">
                {/* Email Item with copy */}
                <div className="p-3 bg-hud-panel border border-hud-border rounded-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-hud-green flex-shrink-0" />
                    <span className="font-mono text-xs text-hud-bright truncate">
                      {CONTACT_INFO.email}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 hover:bg-hud-hover text-hud-muted hover:text-hud-green rounded-sm transition-colors text-xs font-mono flex items-center gap-1 flex-shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-hud-green" />
                        <span className="text-hud-green text-[10px]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">COPY</span>
                      </>
                    )}
                  </button>
                </div>

                {/* LinkedIn Link */}
                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-hud-panel border border-hud-border hover:border-hud-green/60 rounded-sm flex items-center justify-between text-xs font-mono text-hud-text hover:text-hud-bright transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Linkedin className="w-4 h-4 text-hud-green flex-shrink-0" />
                    <span className="truncate">linkedin.com/in/samuvel-prakash-f-3385902a5</span>
                  </div>
                  <span className="text-hud-slate group-hover:text-hud-green">&rarr;</span>
                </a>

                {/* GitHub Link */}
                <a
                  href={CONTACT_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-hud-panel border border-hud-border hover:border-hud-green/60 rounded-sm flex items-center justify-between text-xs font-mono text-hud-text hover:text-hud-bright transition-colors group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Github className="w-4 h-4 text-hud-green flex-shrink-0" />
                    <span className="truncate">github.com/samkiller07</span>
                  </div>
                  <span className="text-hud-slate group-hover:text-hud-green">&rarr;</span>
                </a>
              </div>
            </div>

            {/* Quick response badge */}
            <div className="p-4 bg-hud-panel border border-hud-border rounded-sm flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-hud-green rounded-full animate-ping" />
              <div className="text-xs font-mono">
                <span className="text-hud-green font-bold">ACTIVE RESPONSE TIME:</span>
                <span className="text-hud-slate ml-2">&lt; 24 HOURS</span>
              </div>
            </div>
          </div>

          {/* Right: Direct Email Dispatch */}
          <div className="lg:col-span-7 bg-hud-card border border-hud-border p-5 sm:p-6 rounded-sm shadow-xl hud-corner space-y-4">
            <div className="pb-3 border-b border-hud-border flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-wider font-bold">
                <Radio className="w-4 h-4 text-hud-green animate-pulse" />
                <span>DIRECT INQUIRY // INITIATE COMMS</span>
              </div>
              <span className="text-[10px] font-mono text-hud-muted">DIRECT MAIL</span>
            </div>

            {isSent ? (
              <div className="p-8 bg-hud-panel border border-hud-green/50 rounded-sm text-center space-y-3 font-mono">
                <CheckCircle2 className="w-10 h-10 text-hud-green mx-auto" />
                <h3 className="font-tech text-lg font-bold text-hud-green uppercase">
                  EMAIL CLIENT OPENED
                </h3>
                <p className="text-xs text-hud-slate max-w-md mx-auto">
                  Your message has been formatted and queued for direct transmission to <span className="text-hud-bright">{CONTACT_INFO.email}</span>.
                </p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsSent(false);
                      setSubject('');
                      setMessage('');
                    }}
                  >
                    SEND ANOTHER INQUIRY
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDirectEmail} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-hud-muted uppercase tracking-wider block">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Hiring Manager / Engineering Lead"
                      className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-hud-muted uppercase tracking-wider block">
                      YOUR EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="name@organization.com"
                      className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase tracking-wider block">
                    INQUIRY SUBJECT *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Robotics Engineering Role / Technical Collaboration"
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase tracking-wider block">
                    MESSAGE PAYLOAD *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your project specifications or role..."
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none resize-y"
                  />
                </div>

                <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[10px] text-hud-muted">
                    * Direct transmission to {CONTACT_INFO.email}
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={<Send className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  >
                    SEND DIRECT INQUIRY
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
