import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Mail, Linkedin, Github, Send, Terminal, CheckCircle2, Copy, Check } from 'lucide-react';

const CONTACT_INFO = {
  name: 'SAMUVEL PRAKASH F',
  email: 'samuvelprakash09.11.2005@gmail.com',
  linkedin: 'https://linkedin.com/in/samuvel-prakash-f-3385902a5',
  github: 'https://github.com/samkiller07'
};

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isDispatched, setIsDispatched] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct mailto link with encoded payload
    const mailtoSubject = encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject || 'Engineering Discussion'} - ${formData.name}`
    );
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Trigger user's mail client
    window.location.href = mailtoUrl;

    setIsDispatched(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-hud-bg border-t border-hud-border">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full" />
            <span>06 // COMMS UPLINK &bull; DIRECT CONTACT</span>
          </div>
          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            CONNECT / INITIATE TRANSMISSION
          </h2>
          <div className="circuit-line-h w-48" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left info & direct channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-hud-card border border-hud-border p-6 rounded-sm space-y-4 hud-corner">
              <div className="font-mono text-xs text-hud-green uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>DIRECT REACHABILITY</span>
              </div>
              <p className="text-sm text-hud-slate leading-relaxed font-sans">
                Open to full-time roles, robotics R&amp;D engineering positions, industrial automation internships, and ambitious mechatronics collaborations.
              </p>

              <div className="space-y-3 pt-2">
                {/* Email Item with copy */}
                <div className="p-3 bg-hud-panel border border-hud-border rounded-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 truncate">
                    <Mail className="w-4 h-4 text-hud-green flex-shrink-0" />
                    <span className="font-mono text-xs text-hud-bright truncate">
                      {CONTACT_INFO.email}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 hover:bg-hud-hover text-hud-muted hover:text-hud-green rounded-sm transition-colors text-xs font-mono flex items-center gap-1"
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
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-hud-green" />
                    <span>linkedin.com/in/samuvel-prakash-f-3385902a5</span>
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
                  <div className="flex items-center gap-2.5">
                    <Github className="w-4 h-4 text-hud-green" />
                    <span>github.com/samkiller07</span>
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

          {/* Right: Interactive Direct Comms Form */}
          <div className="lg:col-span-7 bg-hud-card border border-hud-border p-6 rounded-sm shadow-xl hud-corner">
            <div className="pb-4 mb-6 border-b border-hud-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-hud-green rounded-full" />
                <span className="font-mono text-xs text-hud-green tracking-widest uppercase">
                  MESSAGE DISPATCH PROTOCOL // DIRECT MAILTO
                </span>
              </div>
              <span className="text-[10px] font-mono text-hud-muted">DIRECT UPLINK</span>
            </div>

            {isDispatched ? (
              <div className="p-8 bg-hud-panel border border-hud-green/50 rounded-sm text-center space-y-3 font-mono">
                <CheckCircle2 className="w-10 h-10 text-hud-green mx-auto animate-bounce" />
                <h3 className="font-tech text-lg font-bold text-hud-green uppercase">
                  EMAIL CLIENT LAUNCHED
                </h3>
                <p className="text-xs text-hud-slate max-w-md mx-auto">
                  Your default email client has been opened with your message prefilled for <span className="text-hud-bright">{CONTACT_INFO.email}</span>.
                </p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsDispatched(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                  >
                    COMPOSE ANOTHER MESSAGE
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-hud-muted uppercase tracking-wider block">
                      OPERATOR / YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Engineering Lead / Recruiter"
                      className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-hud-muted uppercase tracking-wider block">
                      RETURN EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@organization.com"
                      className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase tracking-wider block">
                    TRANSMISSION SUBJECT *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Robotics Engineering Role / Technical Collaboration"
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase tracking-wider block">
                    PROJECT / MESSAGE PAYLOAD *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide context on your inquiry, role requirements, or project specs..."
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green resize-y"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[10px] text-hud-muted">
                    * LAUNCHES DIRECT EMAIL CLIENT
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={<Send className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  >
                    DISPATCH TRANSMISSION
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
