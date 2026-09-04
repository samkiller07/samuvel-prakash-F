import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { messageService, ContactMessage } from '../services/messageService';
import {
  Mail,
  Linkedin,
  Github,
  Send,
  Terminal,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  ShieldCheck,
  Clock,
  Radio,
  Sparkles
} from 'lucide-react';

const CONTACT_INFO = {
  name: 'SAMUVEL PRAKASH F',
  email: 'samuvelprakash09.11.2005@gmail.com',
  linkedin: 'https://linkedin.com/in/samuvel-prakash-f-3385902a5',
  github: 'https://github.com/samkiller07'
};

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>(messageService.getLocalMessages());

  const loadMessages = async () => {
    try {
      const msgs = await messageService.getPublicMessages();
      setMessages(msgs);
    } catch (err) {
      console.error('Error fetching transmissions:', err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    try {
      // Direct post to database / feed without mail client
      await messageService.submitMessage({
        name: name.trim(),
        message: message.trim()
      });

      setName('');
      setMessage('');
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 4000);
      await loadMessages();
    } catch (err) {
      console.error('Transmission submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-hud-bg border-t border-hud-border">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full animate-ping" />
            <span>06 // COMMS UPLINK &bull; DIRECT CONTACT &amp; COMMUNITY TRANSMISSIONS</span>
          </div>
          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            CONNECT &amp; TRANSMIT
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
                <span>DIRECT REACHABILITY</span>
              </div>
              <p className="text-xs sm:text-sm text-hud-slate leading-relaxed font-sans">
                Open to full-time roles, robotics R&amp;D engineering positions, industrial automation internships, and ambitious mechatronics collaborations.
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

          {/* Right: Simplified Comment / Transmission Box */}
          <div className="lg:col-span-7 bg-hud-card border border-hud-border p-5 sm:p-6 rounded-sm shadow-xl hud-corner space-y-4">
            <div className="pb-3 border-b border-hud-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-hud-green animate-pulse" />
                <span className="font-mono text-xs text-hud-green tracking-widest uppercase">
                  LEAVE A PUBLIC TRANSMISSION / COMMENT
                </span>
              </div>
              <span className="text-[10px] font-mono text-hud-muted">DIRECT BROADCAST</span>
            </div>

            {/* Success Notification */}
            {successToast && (
              <div className="p-3 bg-hud-green/10 border border-hud-green/50 text-hud-green rounded-sm flex items-center gap-2 font-mono text-xs animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>[TRANSMISSION LOGGED] Your comment is now live on the public feed!</span>
              </div>
            )}

            {/* Clean 2-Field Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-hud-muted uppercase tracking-wider block">
                  YOUR NAME / CALLSIGN *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex (Engineering Lead) / Recruiter / Fellow Engineer"
                  className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-hud-muted uppercase tracking-wider block">
                  TRANSMISSION MESSAGE / COMMENT *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a thought, project feedback, collaboration note, or inquiry..."
                  className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green resize-y"
                />
              </div>

              <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[10px] text-hud-muted">
                  * Instantly published to the public telemetry transmission board
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting || !name.trim() || !message.trim()}
                  icon={<Send className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  {isSubmitting ? 'BROADCASTING...' : 'POST TRANSMISSION'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Public Transmission Logs & Comments Stream */}
        <div className="pt-4 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-hud-border">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-hud-cyan" />
              <span className="font-tech text-base sm:text-lg font-bold text-hud-bright uppercase tracking-wide">
                TRANSMISSION LOGS &amp; COMMUNITY REVIEWS ({messages.length})
              </span>
            </div>
            <div className="text-xs font-mono text-hud-muted">
              LIVE BROADCAST STREAM
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-hud-card border border-hud-border rounded-sm p-4 sm:p-5 space-y-3 font-mono text-xs relative hud-corner hover:border-hud-border-bright transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 border-b border-hud-border pb-2.5">
                  <div className="font-bold text-hud-bright flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-hud-cyan rounded-full" />
                    <span>{msg.name}</span>
                  </div>
                  <div className="text-[10px] text-hud-muted flex items-center gap-1 flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Message Body */}
                <p className="text-hud-slate font-sans text-xs sm:text-sm leading-relaxed">
                  "{msg.message}"
                </p>

                {/* Verified Admin / Operator Reply */}
                {msg.admin_reply && (
                  <div className="mt-3 p-3 bg-hud-panel border-l-2 border-hud-green rounded-r-sm space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-hud-green font-bold uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>OPERATOR RESPONSE // SAMUVEL PRAKASH F</span>
                    </div>
                    <p className="text-xs font-sans text-hud-bright leading-relaxed pl-1">
                      {msg.admin_reply}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
