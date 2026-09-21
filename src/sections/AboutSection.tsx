import React, { useState, useEffect } from 'react';
import { profileService, ProfileData } from '../services/profileService';
import {
  Cpu,
  Bot,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Binary,
  Terminal,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';

interface AboutSectionProps {
  onStartProject?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onStartProject }) => {
  const [profile, setProfile] = useState<ProfileData>(profileService.getLocalProfile());

  useEffect(() => {
    profileService.getProfile().then(setProfile);
  }, []);

  return (
    <section
      id="about"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-hud-card/40 border-t border-hud-border"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full" />
            <span>05 // SYSTEM SPECIFICATION &bull; CORE OPERATOR PROFILE</span>
          </div>

          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            ENGINEERING PROFILE &amp; FOCUS
          </h2>

          <div className="circuit-line-h w-48" />
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Bio Text */}
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-hud-slate leading-relaxed font-sans">
            <div className="p-4 bg-hud-card border-l-4 border-hud-green rounded-sm font-mono text-xs text-hud-bright space-y-1">
              <span className="text-hud-green font-bold">&gt; OPERATOR:</span> {profile.name || 'Samuvel Prakash F'}
              <br />
              <span className="text-hud-green font-bold">&gt; DISCIPLINE:</span> Mechatronics &amp; Automation Engineering
              <br />
              <span className="text-hud-green font-bold">&gt; CAPABILITY:</span> Embedded Systems &bull; PLC Logic &bull; Computer Vision &bull; Python Automation
            </div>

            <p className="text-hud-bright font-medium leading-relaxed">
              I am a mechatronics engineer who builds at the intersection of <span className="text-hud-green font-semibold">hardware, software, and industrial automation</span>.
            </p>

            <p>
              My hands-on engineering spans ESP32/Arduino microcontroller firmware, deterministic PLC ladder logic sequencing, real-time OpenCV/YOLO vision pipelines, and CAE engineering automation using Altair HyperMesh.
            </p>

            <p>
              I take pride in creating practical, working prototypes and deterministic software for technical teams, research projects, and private clients.
            </p>

            <div className="pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={onStartProject}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                DISCUSS A PROJECT WITH SAMUVEL
              </Button>
            </div>
          </div>

          {/* Right Column: Engineering Highlights */}
          <div className="lg:col-span-5 bg-hud-card border border-hud-border rounded-sm p-5 hud-corner shadow-lg space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-hud-border">
              <div className="text-xs text-hud-green uppercase font-bold flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                <span>VERIFIED FOCUS AREAS</span>
              </div>
              <span className="text-[10px] text-hud-muted">READY FOR CONTRACTS</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-2.5 bg-hud-panel border border-hud-border rounded-sm">
                <div className="text-hud-bright font-bold">1. EMBEDDED SYSTEMS &amp; IoT</div>
                <div className="text-[11px] text-hud-slate font-sans">
                  Closed-loop sensor control, PID loops, solid-state actuation &amp; MQTT telemetry.
                </div>
              </div>

              <div className="p-2.5 bg-hud-panel border border-hud-border rounded-sm">
                <div className="text-hud-cyan font-bold">2. INDUSTRIAL AUTOMATION</div>
                <div className="text-[11px] text-hud-slate font-sans">
                  CODESYS V3.5, IEC 61131-3 Ladder Logic, conveyor timing &amp; safety interlocks.
                </div>
              </div>

              <div className="p-2.5 bg-hud-panel border border-hud-border rounded-sm">
                <div className="text-hud-amber font-bold">3. COMPUTER VISION &amp; AI</div>
                <div className="text-[11px] text-hud-slate font-sans">
                  OpenCV frame filtering, YOLOv8 object detection, and spatial posture tracking.
                </div>
              </div>

              <div className="p-2.5 bg-hud-panel border border-hud-border rounded-sm">
                <div className="text-hud-green font-bold">4. CAE &amp; SCRIPTING TOOLS</div>
                <div className="text-[11px] text-hud-slate font-sans">
                  Altair HyperMesh batch automation, CAD midsurfacing &amp; solver deck generation.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};