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
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  DollarSign
} from 'lucide-react';
import { messageService } from '../services/messageService';
import { Button } from '../components/ui/Button';

const CONTACT_INFO = {
  name: 'SAMUVEL PRAKASH F',
  email: 'samuvelprakash09.11.2005@gmail.com',
  linkedin: 'https://linkedin.com/in/samuvel-prakash-f-3385902a5',
  github: 'https://github.com/samkiller07',
  location: 'Tamil Nadu, India',
  timezone: 'IST (UTC +5:30)',
  status: 'OPEN FOR CONTRACTS & FULL-TIME ROLES'
};

const SERVICE_OPTIONS = [
  'Embedded Systems & IoT Hardware Prototype',
  'PLC Automation & CODESYS Simulation',
  'Computer Vision & Edge AI (YOLO / OpenCV)',
  'HyperMesh Tcl Automation & CAE Preprocessing',
  'Custom Python Engineering Tools & Dashboards',
  'General Engineering Inquiry / Career Role'
];

interface ContactSectionProps {
  selectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ selectedService }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceType, setServiceType] = useState(() => {
    if (selectedService) {
      if (selectedService === 'embedded-iot') return SERVICE_OPTIONS[0];
      if (selectedService === 'industrial-plc') return SERVICE_OPTIONS[1];
      if (selectedService === 'computer-vision') return SERVICE_OPTIONS[2];
      if (selectedService === 'engineering-software') return SERVICE_OPTIONS[3];
      if (selectedService === 'engineering-dashboards') return SERVICE_OPTIONS[4];
    }
    return SERVICE_OPTIONS[0];
  });
  const [requirement, setRequirement] = useState('');
  const [deadline, setDeadline] = useState('Flexible');
  const [budget, setBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync selectedService prop updates
  React.useEffect(() => {
    if (selectedService) {
      if (selectedService === 'embedded-iot') setServiceType(SERVICE_OPTIONS[0]);
      else if (selectedService === 'industrial-plc') setServiceType(SERVICE_OPTIONS[1]);
      else if (selectedService === 'computer-vision') setServiceType(SERVICE_OPTIONS[2]);
      else if (selectedService === 'engineering-software') setServiceType(SERVICE_OPTIONS[3]);
      else if (selectedService === 'engineering-dashboards') setServiceType(SERVICE_OPTIONS[4]);
    }
  }, [selectedService]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !requirement.trim()) return;

    setIsSubmitting(true);
    setSubmitSuccess(null);
    setSubmitError(null);

    try {
      const res = await messageService.submitInquiry({
        name,
        email,
        service_type: serviceType,
        subject: `Project Inquiry: ${serviceType}`,
        message: requirement,
        deadline,
        budget: budget || 'Discussion'
      });

      if (res.success) {
        setSubmitSuccess(
          'Project inquiry received! Your requirements have been logged and routed to the engineering console. I will review and get back to you within 24-48 hours.'
        );
        setName('');
        setEmail('');
        setRequirement('');
        setBudget('');
      } else {
        setSubmitError(res.error || 'Failed to submit inquiry. Please try again or email directly.');
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Transmission error. Please email directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-hud-bg border-t border-hud-border">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full animate-ping" />
            <span>08 // COMMS UPLINK &bull; DIRECT REACHABILITY &amp; INQUIRIES</span>
          </div>
          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            CONNECT &amp; START A PROJECT
          </h2>
          <div className="circuit-line-h w-48" />
        </div>

        {/* Main 2-Column Grid: Form & Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="contact-form">
          {/* Left Column: Direct Project Inquiry Form */}
          <div className="lg:col-span-7 bg-hud-card border border-hud-border-bright p-5 sm:p-7 rounded-sm shadow-xl hud-corner space-y-5">
            <div className="pb-3 border-b border-hud-border flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-wider font-bold">
                <FileText className="w-4 h-4 text-hud-green" />
                <span>DIRECT PROJECT REQUIREMENT INQUIRY</span>
              </div>
              <span className="text-[10px] font-mono text-hud-slate">SECURE // ENCRYPTED</span>
            </div>

            <p className="text-xs text-hud-slate font-sans leading-relaxed">
              Have an embedded system, robotics prototype, PLC sequence, computer vision pipeline, or engineering automation task? Fill in your project specifications below.
            </p>

            {/* Notifications */}
            {submitSuccess && (
              <div className="p-3 bg-hud-green/10 border border-hud-green/50 text-hud-green rounded-sm flex items-start gap-2 font-mono text-xs animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{submitSuccess}</span>
              </div>
            )}

            {submitError && (
              <div className="p-3 bg-hud-red/10 border border-hud-red/50 text-hud-red rounded-sm flex items-start gap-2 font-mono text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase tracking-wider block">
                    YOUR NAME / COMPANY *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Ramesh / Tech Robotics Corp"
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase tracking-wider block">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@domain.com"
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-hud-muted uppercase tracking-wider block">
                  SERVICE / REQUIREMENT CATEGORY *
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-hud-muted uppercase tracking-wider block">
                  PROJECT SPECIFICATION &amp; DELIVERABLES *
                </label>
                <textarea
                  required
                  rows={4}
                  maxLength={3000}
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  placeholder="Describe your technical challenge, hardware/software constraints, target sensors, inputs, expected outputs, and scope..."
                  className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase tracking-wider block flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-hud-cyan" />
                    <span>TIMELINE / TARGET DEADLINE</span>
                  </label>
                  <select
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
                  >
                    <option value="Urgent (< 2 Weeks)">Urgent (&lt; 2 Weeks)</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2-3 Months">2-3 Months</option>
                    <option value="Flexible">Flexible / Ongoing Discussion</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase tracking-wider block flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-hud-green" />
                    <span>BUDGET RANGE (OPTIONAL)</span>
                  </label>
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="e.g. ₹15k - ₹40k / $200 - $800"
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[10px] text-hud-muted">
                  * Inquiries are kept strictly confidential and routed directly to Samuvel.
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting || !name.trim() || !email.trim() || !requirement.trim()}
                  icon={<Send className="w-3.5 h-3.5" />}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? 'TRANSMITTING INQUIRY...' : 'TRANSMIT PROJECT INQUIRY'}
                </Button>
              </div>
            </form>
          </div>

          {/* Right Column: Direct Comms Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="bg-hud-card border border-hud-border p-5 rounded-sm space-y-3 hud-corner hover:border-hud-green/50 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-sm bg-hud-green/10 border border-hud-green/30 flex items-center justify-center text-hud-green">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-tech text-sm font-bold text-hud-bright uppercase">DIRECT INBOX</h3>
                    <div className="text-[10px] font-mono text-hud-green">PRIMARY COMM CHANNEL</div>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-hud-panel border border-hud-border rounded-sm font-mono text-xs text-hud-bright break-all">
                {CONTACT_INFO.email}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 py-1.5 px-3 bg-hud-panel hover:bg-hud-hover border border-hud-border hover:border-hud-green text-hud-bright rounded-sm font-mono text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-hud-green" />
                      <span className="text-hud-green font-bold text-[11px]">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-hud-muted" />
                      <span className="text-[11px]">COPY EMAIL</span>
                    </>
                  )}
                </button>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="p-1.5 bg-hud-green/10 hover:bg-hud-green text-hud-green hover:text-black border border-hud-green/40 rounded-sm transition-colors"
                  title="Open Mail Client"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="bg-hud-card border border-hud-border p-5 rounded-sm space-y-3 hud-corner hover:border-hud-green/50 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-sm bg-hud-cyan/10 border border-hud-cyan/30 flex items-center justify-center text-hud-cyan">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-tech text-sm font-bold text-hud-bright uppercase">LINKEDIN NETWORK</h3>
                    <div className="text-[10px] font-mono text-hud-cyan">PROFESSIONAL &amp; CAREER</div>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-hud-panel border border-hud-border rounded-sm font-mono text-xs text-hud-slate truncate">
                in/samuvel-prakash-f-3385902a5
              </div>
              <a
                href={CONTACT_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 px-3 bg-hud-panel hover:bg-hud-green hover:text-black border border-hud-border hover:border-hud-green text-hud-bright rounded-sm font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>OPEN LINKEDIN PROFILE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* GitHub Card */}
            <div className="bg-hud-card border border-hud-border p-5 rounded-sm space-y-3 hud-corner hover:border-hud-green/50 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-sm bg-hud-green/10 border border-hud-green/30 flex items-center justify-center text-hud-green">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-tech text-sm font-bold text-hud-bright uppercase">GITHUB REPOSITORY</h3>
                    <div className="text-[10px] font-mono text-hud-green">CODE &amp; CAD ARCHIVES</div>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-hud-panel border border-hud-border rounded-sm font-mono text-xs text-hud-slate truncate">
                github.com/samkiller07
              </div>
              <a
                href={CONTACT_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 px-3 bg-hud-panel hover:bg-hud-green hover:text-black border border-hud-border hover:border-hud-green text-hud-bright rounded-sm font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>VISIT GITHUB REPOSITORY</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Telemetry Footer Banner */}
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
