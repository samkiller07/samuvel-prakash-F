import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { TelemetryCanvas } from '../components/ui/TelemetryCanvas';
import { OperatorAvatar } from '../components/ui/OperatorAvatar';
import { profileService, ProfileData, DEFAULT_PROFILE } from '../services/profileService';
import {
  Github,
  Linkedin,
  ArrowDown,
  Terminal,
  Cpu,
  Eye,
  Settings2,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
}) => {
  const [profile, setProfile] = useState<ProfileData>(profileService.getLocalProfile());

  useEffect(() => {
    profileService.getProfile().then(setProfile);
  }, []);

  const hasAvatar = Boolean(profile.avatar_url && profile.avatar_url.trim() !== '');

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center pt-20 pb-10 sm:pt-24 sm:pb-14 lg:min-h-[88vh] px-4 sm:px-6 lg:px-8 overflow-hidden bg-hud-bg"
    >
      {/* Background Interactive Telemetry Canvas */}
      <TelemetryCanvas />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Scanline Texture */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-6 sm:space-y-8 lg:space-y-10">

        {/* Top System Status Bar */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 bg-hud-card/80 border border-hud-border-bright rounded-sm backdrop-blur-md font-mono text-xs text-hud-muted">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-hud-green rounded-full animate-ping" />
              <span className="text-hud-green font-bold">
                [SYS.ONLINE]
              </span>
            </div>

            <span className="text-hud-border-bright hidden sm:inline">|</span>

            <span className="text-hud-slate">
              CORE: MECHATRONICS
            </span>

            <span className="text-hud-border-bright hidden sm:inline">|</span>

            <span className="text-hud-green">
              STATUS: {profile.status || 'ACTIVE'}
            </span>
          </div>
        </div>

        {/* Main Hero Header & Info (Conditional 2-Column or Centered) */}
        {hasAvatar ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-center lg:text-left">
            {/* Left Text / Info Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="space-y-3">
                <div className="font-mono text-xs sm:text-sm text-hud-green uppercase tracking-[0.25em] flex items-center justify-center lg:justify-start gap-2">
                  <Terminal className="w-4 h-4 text-hud-green" />
                  <span>
                    {profile.title || 'ASPIRING ROBOTICS ENGINEER • HARDWARE × SOFTWARE'}
                  </span>
                </div>

                <h1 className="font-tech text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-hud-bright uppercase">
                  {profile.name || 'SAMUVEL PRAKASH F'}
                </h1>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-mono text-hud-slate">
                  <span className="text-hud-bright font-semibold">
                    MECHATRONICS
                  </span>
                  <span className="text-hud-green">•</span>
                  <span className="text-hud-green glow-green font-semibold">
                    ROBOTICS
                  </span>
                  <span className="text-hud-green">•</span>
                  <span className="text-hud-cyan">
                    AUTOMATION
                  </span>
                  <span className="text-hud-green">•</span>
                  <span className="text-hud-amber">
                    EMBEDDED & AI
                  </span>
                </div>
              </div>

              {/* Engineering Positioning Bio */}
              <p className="text-xs sm:text-sm md:text-base text-hud-slate leading-relaxed font-sans max-w-xl mx-auto lg:mx-0">
                {profile.bio || 'Building practical mechatronics systems by combining embedded systems, sensors, automation logic, IoT, and computer vision for real-world engineering applications.'}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onExploreProjects}
                  icon={<ArrowDown className="w-4 h-4" />}
                  iconPosition="right"
                >
                  EXPLORE PROJECTS
                </Button>

                <a
                  href={profile.github_url || "https://github.com/samkiller07"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-hud-green/60 text-xs sm:text-sm font-mono text-hud-text hover:text-hud-bright transition-all rounded-sm"
                >
                  <Github className="w-4 h-4 text-hud-green" />
                  <span>GITHUB</span>
                </a>

                <a
                  href={profile.linkedin_url || "https://linkedin.com/in/samuvel-prakash-f-3385902a5"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-hud-green/60 text-xs sm:text-sm font-mono text-hud-text hover:text-hud-bright transition-all rounded-sm"
                >
                  <Linkedin className="w-4 h-4 text-hud-green" />
                  <span>LINKEDIN</span>
                </a>
              </div>
            </div>

            {/* Right Column: Holographic Cyberpunk HUD Avatar */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <OperatorAvatar
                avatarUrl={profile.avatar_url}
                name={profile.name}
                operatorId={profile.operator_id}
                statusText={profile.status}
                size="lg"
              />
            </div>
          </div>
        ) : (
          /* Centered Presentation when no picture is present */
          <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6">
            <div className="space-y-3">
              <div className="font-mono text-xs sm:text-sm text-hud-green uppercase tracking-[0.25em] flex items-center justify-center gap-2">
                <Terminal className="w-4 h-4 text-hud-green" />
                <span>
                  {profile.title || 'ASPIRING ROBOTICS ENGINEER • HARDWARE × SOFTWARE'}
                </span>
              </div>

              <h1 className="font-tech text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-hud-bright uppercase">
                {profile.name || 'SAMUVEL PRAKASH F'}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm md:text-base font-mono text-hud-slate">
                <span className="text-hud-bright font-semibold">
                  MECHATRONICS ENGINEERING
                </span>
                <span className="text-hud-green">•</span>
                <span className="text-hud-green glow-green font-semibold">
                  ROBOTICS
                </span>
                <span className="text-hud-green">•</span>
                <span className="text-hud-cyan">
                  AUTOMATION
                </span>
                <span className="text-hud-green">•</span>
                <span className="text-hud-amber">
                  EMBEDDED & AI
                </span>
              </div>
            </div>

            {/* Engineering Positioning Bio */}
            <p className="text-xs sm:text-sm md:text-base text-hud-slate leading-relaxed font-sans max-w-2xl mx-auto px-2 sm:px-4">
              {profile.bio || 'Building practical mechatronics systems by combining embedded systems, sensors, automation logic, IoT, and computer vision for real-world engineering applications.'}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onExploreProjects}
                icon={<ArrowDown className="w-4 h-4" />}
                iconPosition="right"
              >
                EXPLORE PROJECTS
              </Button>

              <a
                href={profile.github_url || "https://github.com/samkiller07"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-hud-green/60 text-xs sm:text-sm font-mono text-hud-text hover:text-hud-bright transition-all rounded-sm"
              >
                <Github className="w-4 h-4 text-hud-green" />
                <span>GITHUB</span>
              </a>

              <a
                href={profile.linkedin_url || "https://linkedin.com/in/samuvel-prakash-f-3385902a5"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-hud-green/60 text-xs sm:text-sm font-mono text-hud-text hover:text-hud-bright transition-all rounded-sm"
              >
                <Linkedin className="w-4 h-4 text-hud-green" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>
        )}

        {/* Engineering Capability Matrix */}
        <div className="pt-4 sm:pt-6">
          <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-left font-mono">

            {/* Embedded */}
            <div className="p-3 bg-hud-card/60 border border-hud-border rounded-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[10px] text-hud-muted uppercase">
                <Cpu className="w-3 h-3 text-hud-green" />
                EMBEDDED
              </div>

              <div className="text-xs sm:text-sm text-hud-bright font-bold pt-1">
                ESP32 • ARDUINO
              </div>

              <div className="text-[10px] text-hud-green pt-0.5">
                SENSOR INTERFACING
              </div>
            </div>

            {/* Computer Vision */}
            <div className="p-3 bg-hud-card/60 border border-hud-border rounded-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[10px] text-hud-muted uppercase">
                <Eye className="w-3 h-3 text-hud-green" />
                COMPUTER VISION
              </div>

              <div className="text-xs sm:text-sm text-hud-bright font-bold pt-1">
                OPENCV • YOLO
              </div>

              <div className="text-[10px] text-hud-cyan pt-0.5">
                OBJECT DETECTION
              </div>
            </div>

            {/* IoT */}
            <div className="p-3 bg-hud-card/60 border border-hud-border rounded-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[10px] text-hud-muted uppercase">
                <Settings2 className="w-3 h-3 text-hud-green" />
                IoT & AUTOMATION
              </div>

              <div className="text-xs sm:text-sm text-hud-bright font-bold pt-1">
                SENSORS • CONTROL
              </div>

              <div className="text-[10px] text-hud-green pt-0.5">
                CONNECTED SYSTEMS
              </div>
            </div>

            {/* PLC */}
            <div className="p-3 bg-hud-card/60 border border-hud-border rounded-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 text-[10px] text-hud-muted uppercase">
                <Terminal className="w-3 h-3 text-hud-green" />
                PLC
              </div>

              <div className="text-xs sm:text-sm text-hud-bright font-bold pt-1">
                CODESYS • LADDER
              </div>

              <div className="text-[10px] text-hud-amber pt-0.5">
                CONTROL LOGIC
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};