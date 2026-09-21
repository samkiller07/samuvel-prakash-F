import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { TelemetryCanvas } from '../components/ui/TelemetryCanvas';
import { OperatorAvatar } from '../components/ui/OperatorAvatar';
import { profileService, ProfileData } from '../services/profileService';
import {
  Github,
  Linkedin,
  ArrowDown,
  Terminal,
  Cpu,
  Bot,
  Eye,
  Settings2,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
  onStartProject,
}) => {
  const [profile, setProfile] = useState<ProfileData>(profileService.getLocalProfile());

  useEffect(() => {
    profileService.getProfile().then(setProfile);
  }, []);

  const hasAvatar = Boolean(profile.avatar_url && profile.avatar_url.trim() !== '');

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center pt-20 pb-8 sm:pt-24 sm:pb-12 lg:min-h-[85vh] px-4 sm:px-6 lg:px-8 overflow-hidden bg-hud-bg"
    >
      {/* Background Interactive Telemetry Canvas */}
      <TelemetryCanvas />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Scanline Texture */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-6 sm:space-y-8">

        {/* Top Operator Telemetry Bar */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-3 py-1.5 bg-hud-card/90 border border-hud-green/40 rounded-sm backdrop-blur-md font-mono text-xs text-hud-muted shadow-lg">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-hud-green rounded-full animate-ping" />
              <span className="text-hud-green font-bold">
                OPERATOR: {profile.operator_id || 'SAMUVEL PRAKASH F'}
              </span>
            </div>

            <span className="text-hud-border-bright hidden sm:inline">|</span>

            <span className="text-hud-slate hidden sm:inline">
              ROLE: MECHATRONICS &amp; AUTOMATION
            </span>

            <span className="text-hud-border-bright hidden sm:inline">|</span>

            <span className="text-hud-green font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>STATUS: AVAILABLE FOR FREELANCE</span>
            </span>
          </div>
        </div>

        {/* Main Hero Header & Bio */}
        {hasAvatar ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-center lg:text-left">
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-3">
                <div className="font-mono text-xs sm:text-sm text-hud-green uppercase tracking-[0.2em] flex items-center justify-center lg:justify-start gap-2">
                  <Terminal className="w-4 h-4 text-hud-green" />
                  <span>FREELANCE &amp; CONTRACT MECHATRONICS ENGINEER</span>
                </div>

                <h1 className="font-tech text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-hud-bright uppercase">
                  {profile.name || 'SAMUVEL PRAKASH F'}
                </h1>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-mono text-hud-slate">
                  <span className="text-hud-green font-bold glow-green">
                    EMBEDDED IoT
                  </span>
                  <span className="text-hud-border-bright">•</span>
                  <span className="text-hud-cyan font-bold">
                    PLC AUTOMATION
                  </span>
                  <span className="text-hud-border-bright">•</span>
                  <span className="text-hud-amber font-bold">
                    COMPUTER VISION
                  </span>
                  <span className="text-hud-border-bright">•</span>
                  <span className="text-hud-bright font-bold">
                    CAE TOOLS
                  </span>
                </div>
              </div>

              {/* Short Freelancer-First Value Statement */}
              <p className="text-sm sm:text-base md:text-lg text-hud-text leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                I build practical engineering solutions combining embedded systems, sensors, PLC automation, computer vision, and engineering software.
              </p>

              {/* Primary Call To Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onStartProject}
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="shadow-lg shadow-hud-green/20 font-bold"
                >
                  START A PROJECT
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={onExploreProjects}
                  icon={<ArrowDown className="w-4 h-4" />}
                  iconPosition="right"
                >
                  EXPLORE MY WORK
                </Button>

                <div className="flex items-center gap-2">
                  <a
                    href={profile.github_url || "https://github.com/samkiller07"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-hud-green/60 text-hud-text hover:text-hud-bright transition-all rounded-sm"
                    title="GitHub Profile"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-4 h-4 text-hud-green" />
                  </a>

                  <a
                    href={profile.linkedin_url || "https://linkedin.com/in/samuvel-prakash-f-3385902a5"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-hud-green/60 text-hud-text hover:text-hud-bright transition-all rounded-sm"
                    title="LinkedIn Profile"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4 text-hud-green" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Operator Avatar Panel */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <OperatorAvatar
                avatarUrl={profile.avatar_url}
                name={profile.name}
                operatorId={profile.operator_id}
                statusText="AVAILABLE // FOR HIRE"
                size="lg"
              />
            </div>
          </div>
        ) : (
          /* Centered Presentation */
          <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
            <div className="space-y-3">
              <div className="font-mono text-xs sm:text-sm text-hud-green uppercase tracking-[0.25em] flex items-center justify-center gap-2">
                <Terminal className="w-4 h-4 text-hud-green" />
                <span>FREELANCE &amp; CONTRACT MECHATRONICS ENGINEER</span>
              </div>

              <h1 className="font-tech text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-hud-bright uppercase">
                {profile.name || 'SAMUVEL PRAKASH F'}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-mono text-hud-slate">
                <span className="text-hud-green font-bold glow-green">
                  EMBEDDED IoT
                </span>
                <span className="text-hud-border-bright">•</span>
                <span className="text-hud-cyan font-bold">
                  PLC AUTOMATION
                </span>
                <span className="text-hud-border-bright">•</span>
                <span className="text-hud-amber font-bold">
                  COMPUTER VISION
                </span>
                <span className="text-hud-border-bright">•</span>
                <span className="text-hud-bright font-bold">
                  CAE TOOLS
                </span>
              </div>
            </div>

            {/* Core Value Statement */}
            <p className="text-sm sm:text-base md:text-lg text-hud-text leading-relaxed font-sans max-w-2xl mx-auto px-2">
              I build practical engineering solutions combining embedded systems, sensors, PLC automation, computer vision, and engineering software.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onStartProject}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="shadow-lg shadow-hud-green/20 font-bold"
              >
                START A PROJECT
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={onExploreProjects}
                icon={<ArrowDown className="w-4 h-4" />}
                iconPosition="right"
              >
                EXPLORE MY WORK
              </Button>

              <div className="flex items-center gap-2">
                <a
                  href={profile.github_url || "https://github.com/samkiller07"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-hud-green/60 text-hud-text hover:text-hud-bright transition-all rounded-sm"
                  title="GitHub Profile"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4 text-hud-green" />
                </a>

                <a
                  href={profile.linkedin_url || "https://linkedin.com/in/samuvel-prakash-f-3385902a5"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-hud-green/60 text-hud-text hover:text-hud-bright transition-all rounded-sm"
                  title="LinkedIn Profile"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-hud-green" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 4 Fast Scannable Service Capabilities Chips */}
        <div className="pt-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-left font-mono">
            {/* Embedded */}
            <div className="p-3 bg-hud-card/80 border border-hud-border hover:border-hud-green/50 rounded-sm backdrop-blur-sm transition-colors">
              <div className="flex items-center gap-1.5 text-[10px] text-hud-green uppercase font-bold">
                <Cpu className="w-3.5 h-3.5 text-hud-green" />
                <span>01 EMBEDDED IoT</span>
              </div>
              <div className="text-xs text-hud-bright font-bold pt-1">
                ESP32 &bull; Sensors &bull; Control
              </div>
            </div>

            {/* Industrial Automation */}
            <div className="p-3 bg-hud-card/80 border border-hud-border hover:border-hud-cyan/50 rounded-sm backdrop-blur-sm transition-colors">
              <div className="flex items-center gap-1.5 text-[10px] text-hud-cyan uppercase font-bold">
                <Terminal className="w-3.5 h-3.5 text-hud-cyan" />
                <span>02 PLC AUTOMATION</span>
              </div>
              <div className="text-xs text-hud-bright font-bold pt-1">
                CODESYS &bull; Ladder Logic
              </div>
            </div>

            {/* Vision */}
            <div className="p-3 bg-hud-card/80 border border-hud-border hover:border-hud-amber/50 rounded-sm backdrop-blur-sm transition-colors">
              <div className="flex items-center gap-1.5 text-[10px] text-hud-amber uppercase font-bold">
                <Eye className="w-3.5 h-3.5 text-hud-amber" />
                <span>03 COMPUTER VISION</span>
              </div>
              <div className="text-xs text-hud-bright font-bold pt-1">
                OpenCV &bull; YOLO Detection
              </div>
            </div>

            {/* Automation Scripting */}
            <div className="p-3 bg-hud-card/80 border border-hud-border hover:border-hud-green/50 rounded-sm backdrop-blur-sm transition-colors">
              <div className="flex items-center gap-1.5 text-[10px] text-hud-green uppercase font-bold">
                <Bot className="w-3.5 h-3.5 text-hud-green" />
                <span>04 CAE SCRIPTING</span>
              </div>
              <div className="text-xs text-hud-bright font-bold pt-1">
                HyperMesh &bull; Tcl Automation
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};