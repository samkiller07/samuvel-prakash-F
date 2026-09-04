import React from 'react';
import { Button } from '../components/ui/Button';
import { TelemetryCanvas } from '../components/ui/TelemetryCanvas';
import {
  Github,
  Linkedin,
  ArrowDown,
  Terminal,
  Cpu,
  Eye,
  Settings2,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreProjects: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProjects,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-hud-bg"
    >
      {/* Background Interactive Telemetry Canvas */}
      <TelemetryCanvas />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Scanline Texture */}
      <div className="absolute inset-0 scanline-overlay pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center space-y-8">

        {/* System Diagnostics */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-2 bg-hud-card/80 border border-hud-border-bright rounded-sm backdrop-blur-md font-mono text-xs text-hud-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-hud-green rounded-full animate-ping" />
            <span className="text-hud-green font-bold">
              [SYS.ONLINE]
            </span>
          </div>

          <span className="text-hud-border-bright hidden sm:inline">
            |
          </span>

          <span className="text-hud-slate">
            CORE: MECHATRONICS
          </span>

          <span className="text-hud-border-bright hidden sm:inline">
            |
          </span>

          <span className="text-hud-green">
            STATUS: ACTIVE
          </span>
        </div>

        {/* Main Hero Header */}
        <div className="space-y-4">

          <div className="font-mono text-xs sm:text-sm text-hud-green uppercase tracking-[0.25em] flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4 text-hud-green" />

            <span>
              ASPIRING ROBOTICS ENGINEER • HARDWARE × SOFTWARE
            </span>
          </div>

          <h1 className="font-tech text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-hud-bright uppercase">
            SAMUVEL PRAKASH F
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-mono text-hud-slate">
            <span className="text-hud-bright font-semibold">
              MECHATRONICS ENGINEERING
            </span>

            <span className="text-hud-green">•</span>

            <span className="text-hud-green glow-green">
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

        {/* Engineering Positioning */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base text-hud-slate leading-relaxed font-sans px-4">
          Building practical mechatronics systems by combining embedded
          systems, sensors, automation logic, IoT, and computer vision
          for real-world engineering applications.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">

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
            href="https://github.com/samkiller07"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-hud-green/60 text-sm font-mono text-hud-text hover:text-hud-bright transition-all rounded-sm"
          >
            <Github className="w-4 h-4 text-hud-green" />
            <span>GITHUB</span>
          </a>

          <a
            href="https://linkedin.com/in/samuvel-prakash-f-3385902a5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 bg-hud-card hover:bg-hud-panel border border-hud-border hover:border-hud-green/60 text-sm font-mono text-hud-text hover:text-hud-bright transition-all rounded-sm"
          >
            <Linkedin className="w-4 h-4 text-hud-green" />
            <span>LINKEDIN</span>
          </a>
        </div>

        {/* Engineering Capability Matrix */}
        <div className="pt-6">
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