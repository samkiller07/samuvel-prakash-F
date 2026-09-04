import React from 'react';
import {
  Cpu,
  Bot,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Binary,
  Terminal
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-hud-card/40 border-t border-hud-border"
    >
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full" />
            <span>01 // SYSTEM SPECIFICATION • CORE PROFILE</span>
          </div>

          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            ENGINEERING PHILOSOPHY &amp; BACKGROUND
          </h2>

          <div className="circuit-line-h w-48" />
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Main Bio Text */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-hud-slate leading-relaxed font-sans">

            <p className="text-hud-bright text-base sm:text-lg font-medium leading-relaxed">
              I am{' '}
              <span className="text-hud-green font-semibold">
                Samuvel Prakash F
              </span>
              , a Mechatronics Engineering student focused on robotics,
              automation, embedded systems, and computer vision.
            </p>

            <p>
              My engineering interests sit at the intersection of{' '}
              <span className="text-hud-bright">
                hardware, software, and intelligent automation
              </span>
              . I enjoy building systems where sensors, microcontrollers,
              control logic, and software work together to solve practical
              engineering problems.
            </p>

            <p>
              My hands-on project experience includes{' '}
              <span className="text-hud-bright">
                ESP32 and Arduino based embedded systems
              </span>
              , IoT monitoring and automation,{' '}
              <span className="text-hud-bright">
                Python-based computer vision
              </span>
              , OpenCV and YOLO object detection, and engineering workflow
              automation using{' '}
              <span className="text-hud-bright">
                Altair HyperMesh and Tcl/Tk
              </span>
              .
            </p>

            <p>
              I am particularly interested in developing my capabilities
              toward{' '}
              <span className="text-hud-green font-semibold">
                robotics and industrial automation
              </span>
              , combining my mechatronics foundation with programming,
              embedded systems, computer vision, and control-oriented
              engineering.
            </p>

            {/* Engineering Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">

              <div className="p-3.5 bg-hud-panel border border-hud-border rounded-sm space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-hud-green uppercase font-semibold">
                  <Cpu className="w-4 h-4" />
                  <span>MECHATRONICS SYSTEMS</span>
                </div>

                <p className="text-xs text-hud-slate">
                  Combining mechanical systems, electronics, sensors,
                  actuators, and software into practical engineering
                  solutions.
                </p>
              </div>

              <div className="p-3.5 bg-hud-panel border border-hud-border rounded-sm space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-hud-cyan uppercase font-semibold">
                  <Bot className="w-4 h-4" />
                  <span>ROBOTICS &amp; AUTOMATION</span>
                </div>

                <p className="text-xs text-hud-slate">
                  Interested in robotic systems, automation workflows,
                  sensor-based control, and industrial applications.
                </p>
              </div>

              <div className="p-3.5 bg-hud-panel border border-hud-border rounded-sm space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-hud-amber uppercase font-semibold">
                  <Zap className="w-4 h-4" />
                  <span>EMBEDDED &amp; IoT</span>
                </div>

                <p className="text-xs text-hud-slate">
                  Building microcontroller-based systems with ESP32,
                  Arduino, sensors, actuators, and connected monitoring.
                </p>
              </div>

              <div className="p-3.5 bg-hud-panel border border-hud-border rounded-sm space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono text-hud-green uppercase font-semibold">
                  <Binary className="w-4 h-4" />
                  <span>COMPUTER VISION</span>
                </div>

                <p className="text-xs text-hud-slate">
                  Developing real-time vision applications using Python,
                  OpenCV, YOLO, object detection, and human activity
                  recognition.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-4">

            <div className="bg-hud-card border border-hud-border rounded-sm p-5 hud-corner shadow-lg space-y-5">

              <div className="flex items-center justify-between pb-3 border-b border-hud-border">
                <div className="font-mono text-xs text-hud-green uppercase flex items-center gap-1.5">
                  <Terminal className="w-4 h-4" />
                  <span>ENGINEERING DOMAIN MATRIX</span>
                </div>

                <span className="text-[10px] font-mono text-hud-muted">
                  ID: SAM-MECH-01
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {/* Robotics */}
                <div className="p-2.5 bg-hud-panel border border-hud-border/80 rounded-sm">
                  <div className="flex justify-between items-center text-hud-bright mb-1">
                    <span className="font-bold">ROBOTICS &amp; AUTOMATION</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-hud-card border border-hud-green/50 text-hud-green rounded-xs">CORE FOCUS</span>
                  </div>
                  <div className="text-[11px] font-sans text-hud-muted">
                    Kinematics fundamentals, sensor-actuator integration, industrial control logic
                  </div>
                </div>

                {/* Embedded */}
                <div className="p-2.5 bg-hud-panel border border-hud-border/80 rounded-sm">
                  <div className="flex justify-between items-center text-hud-bright mb-1">
                    <span className="font-bold">EMBEDDED SYSTEMS &amp; IoT</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-hud-card border border-hud-cyan/50 text-hud-cyan rounded-xs">CONNECTED HARDWARE</span>
                  </div>
                  <div className="text-[11px] font-sans text-hud-muted">
                    ESP32, ESP8266, Arduino microcontrollers, PID temperature control, IoT telemetry
                  </div>
                </div>

                {/* Computer Vision */}
                <div className="p-2.5 bg-hud-panel border border-hud-border/80 rounded-sm">
                  <div className="flex justify-between items-center text-hud-bright mb-1">
                    <span className="font-bold">COMPUTER VISION &amp; AI</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-hud-card border border-hud-amber/50 text-hud-amber rounded-xs">EDGE VISION</span>
                  </div>
                  <div className="text-[11px] font-sans text-hud-muted">
                    OpenCV frame processing, YOLO object detection, posture analysis pipelines
                  </div>
                </div>

                {/* Programming */}
                <div className="p-2.5 bg-hud-panel border border-hud-border/80 rounded-sm">
                  <div className="flex justify-between items-center text-hud-bright mb-1">
                    <span className="font-bold">PROGRAMMING &amp; LOGIC</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-hud-card border border-hud-green/50 text-hud-green rounded-xs">FIRMWARE &amp; APPS</span>
                  </div>
                  <div className="text-[11px] font-sans text-hud-muted">
                    Python, C, C++, Flask web integration, structured algorithmic workflows
                  </div>
                </div>

                {/* CAE */}
                <div className="p-2.5 bg-hud-panel border border-hud-border/80 rounded-sm">
                  <div className="flex justify-between items-center text-hud-bright mb-1">
                    <span className="font-bold">CAD / CAE AUTOMATION</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-hud-card border border-hud-border-bright text-hud-slate rounded-xs">SCRIPTING &amp; FEA</span>
                  </div>
                  <div className="text-[11px] font-sans text-hud-muted">
                    Altair HyperMesh preprocessing, custom Tcl/Tk batch scripting, geometry automation
                  </div>
                </div>
              </div>

              {/* Verified Badges */}
              <div className="pt-3 border-t border-hud-border space-y-2">

                <div className="flex items-center gap-2 text-xs text-hud-slate">
                  <ShieldCheck className="w-4 h-4 text-hud-green flex-shrink-0" />
                  <span>
                    Hands-on project-based engineering experience
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-hud-slate">
                  <CheckCircle2 className="w-4 h-4 text-hud-green flex-shrink-0" />
                  <span>
                    Focused on robotics, automation and embedded systems
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};