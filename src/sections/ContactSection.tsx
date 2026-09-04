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
  CornerDownRight,
  Clock,
  Sparkles,
  Radio
} from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [messages, setMessages] = useState<ContactMessage[]>(messageService.getLocalMessages());

  const loadMessages = async () => {
    try {
      const msgs = await messageService.getPublicMessages();
      setMessages(msgs);
    } catch (err) {
      console.error('Error fetching public messages:', err);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to database / public message feed
      await messageService.submitMessage(formData);

      // 2. Open mailto client for direct email delivery
      const mailtoSubject = encodeURIComponent(
        `[Portfolio Inquiry] ${formData.subject || 'Engineering Discussion'} - ${formData.name}`
      );
      const mailtoBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      
      try {
        window.open(mailtoUrl, '_blank');
      } catch {
        // Ignore popup blockers
      }

      setIsDispatched(true);
      await loadMessages();
    } catch (err) {
      console.error('Submit error:', err);
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
            <span>06 // COMMS UPLINK &bull; DIRECT CONTACT &amp; REVIEWS</span>
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

          {/* Right: Interactive Direct Comms Form */}
          <div className="lg:col-span-7 bg-hud-card border border-hud-border p-5 sm:p-6 rounded-sm shadow-xl hud-corner">
            <div className="pb-4 mb-6 border-b border-hud-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-hud-green animate-pulse" />
                <span className="font-mono text-xs text-hud-green tracking-widest uppercase">
                  MESSAGE DISPATCH PROTOCOL // PUBLIC REVIEW UPLINK
                </span>
              </div>
              <span className="text-[10px] font-mono text-hud-muted">DIRECT UPLINK</span>
            </div>

            {isDispatched ? (
              <div className="p-8 bg-hud-panel border border-hud-green/50 rounded-sm text-center space-y-3 font-mono">
                <CheckCircle2 className="w-10 h-10 text-hud-green mx-auto animate-bounce" />
                <h3 className="font-tech text-lg font-bold text-hud-green uppercase">
                  TRANSMISSION BROADCASTED &amp; LOGGED
                </h3>
                <p className="text-xs text-hud-slate max-w-md mx-auto">
                  Your message has been logged to the public transmission board and queued for the operator at <span className="text-hud-bright">{CONTACT_INFO.email}</span>.
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
                    SEND ANOTHER TRANSMISSION
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
                      placeholder="e.g. Engineering Lead / Recruiter / Peer"
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
                    TRANSMISSION SUBJECT / REVIEW TOPIC *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Project Feedback / Robotics Role / Collaboration"
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase tracking-wider block">
                    TRANSMISSION PAYLOAD / MESSAGE CONTENT *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter your message, recommendation, or project inquiries..."
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[10px] text-hud-muted">
                    * BROADCASTS TO PUBLIC TELEMETRY LOG &amp; DIRECT EMAIL
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    icon={<Send className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  >
                    {isSubmitting ? 'DISPATCHING...' : 'DISPATCH TRANSMISSION'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Public Transmission Logs & Reviews Feed */}
        <div className="pt-4 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-hud-border">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-hud-cyan" />
              <span className="font-tech text-base sm:text-lg font-bold text-hud-bright uppercase tracking-wide">
                TRANSMISSION LOGS &amp; COMMUNITY REVIEWS
              </span>
            </div>
            <div className="text-xs font-mono text-hud-muted">
              {messages.length} RECORDED TRANSMISSIONS
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
                  <div>
                    <div className="font-bold text-hud-bright flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-hud-cyan rounded-full" />
                      <span>{msg.name}</span>
                    </div>
                    <div className="text-[11px] text-hud-green font-semibold mt-0.5">
                      {msg.subject}
                    </div>
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
