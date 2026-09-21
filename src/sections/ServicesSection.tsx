import React from 'react';
import {
  Cpu,
  Bot,
  Terminal,
  Layers,
  Wrench,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Code2,
  Gauge,
  Activity
} from 'lucide-react';
import { Button } from '../components/ui/Button';

interface ServicesSectionProps {
  onStartProject?: () => void;
}

export const SERVICES = [
  {
    id: 'embedded-iot',
    icon: <Cpu className="w-5 h-5 text-hud-green" />,
    tag: 'HARDWARE & FIRMWARE',
    title: 'Embedded Systems & IoT Prototypes',
    subtitle: 'ESP32, ESP8266 & Arduino microcontrollers',
    description:
      'Custom hardware prototypes combining sensor interfacing (gas, thermal, optical), closed-loop PID control algorithms, solid-state actuation, and low-latency IoT cloud telemetry.',
    deliverables: [
      'ESP32 / ESP8266 / Arduino C++ Firmware',
      'Multi-Sensor Interfacing & Calibration',
      'Relay / Motor / Actuator Driver Circuits',
      'MQTT / WebSockets Cloud Telemetry'
    ]
  },
  {
    id: 'industrial-plc',
    icon: <Terminal className="w-5 h-5 text-hud-cyan" />,
    tag: 'INDUSTRIAL CONTROL',
    title: 'PLC & Automation Logic Simulation',
    subtitle: 'CODESYS V3.5 & IEC 61131-3 Ladder Logic',
    description:
      'Deterministic industrial automation programming including conveyor sequencing, pneumatic actuator timing, proximity sensor interlocking, emergency stop routines, and SoftPLC simulation.',
    deliverables: [
      'IEC 61131-3 Ladder Logic Programs',
      'Motor Latching & Safety Interlocks',
      'Timer / Counter / Dwell Routines',
      'CODESYS SoftPLC Simulation Testing'
    ]
  },
  {
    id: 'computer-vision',
    icon: <Bot className="w-5 h-5 text-hud-amber" />,
    tag: 'EDGE AI & VISION',
    title: 'Computer Vision & Object Detection',
    subtitle: 'Python, OpenCV & YOLO Deep Learning',
    description:
      'Real-time visual monitoring pipelines for automated object detection, spatial bounding boxes, frame preprocessing, and keypoint-based human posture classification at high frame rates.',
    deliverables: [
      'Custom YOLO Object Detection Pipelines',
      'OpenCV Frame Filtering & Analysis',
      'Pose / Activity State Classification',
      'Low-Latency Edge Video Telemetry'
    ]
  },
  {
    id: 'engineering-software',
    icon: <Code2 className="w-5 h-5 text-hud-green" />,
    tag: 'CAE & AUTOMATION',
    title: 'HyperMesh Tcl Automation & CAE Tools',
    subtitle: 'Altair HyperMesh & Tcl/Tk Scripting',
    description:
      'Custom engineering scripts to automate repetitive CAE preprocessing, CAD defeaturing, midsurface extraction, parametric washer creation, 2D/3D quad meshing, and solver deck exports.',
    deliverables: [
      'Tcl/Tk HyperMesh Automation Scripts',
      'CAD Cleanup & Midsurface Batch Macros',
      'Element Quality Criteria Validators',
      'OptiStruct / Nastran / Abaqus Export'
    ]
  },
  {
    id: 'python-dashboards',
    icon: <Gauge className="w-5 h-5 text-hud-cyan" />,
    tag: 'SOFTWARE & TOOLS',
    title: 'Custom Engineering Tools & Dashboards',
    subtitle: 'Python, Flask REST APIs & Telemetry',
    description:
      'Targeted software applications for engineering calculations, algorithmic matching engines, serial sensor data logging, and real-time interactive monitoring dashboards.',
    deliverables: [
      'Flask / Python REST API Microservices',
      'Algorithmic Weighted Matching Engines',
      'Serial & COM Port Data Acquisition Tools',
      'Live Engineering Telemetry Interfaces'
    ]
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onStartProject }) => {
  const handleScrollToInquiry = () => {
    if (onStartProject) {
      onStartProject();
    } else {
      const el = document.getElementById('contact-form') || document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-hud-card/20 border-t border-hud-border relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
              <span className="w-2 h-2 bg-hud-green rounded-full animate-ping" />
              <span>06 // WHAT I CAN BUILD &bull; FREELANCE &amp; CONTRACT ENGINEERING</span>
            </div>
            <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
              ENGINEERING PROTOTYPING &amp; CONSULTING SERVICES
            </h2>
            <div className="circuit-line-h w-48" />
          </div>

          <div className="font-mono text-xs text-hud-green flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>DIRECT CLIENT &amp; RESEARCH CONTRACTS</span>
          </div>
        </div>

        <p className="max-w-3xl text-sm sm:text-base text-hud-slate leading-relaxed font-sans">
          Offering hands-on mechatronics engineering, embedded IoT prototyping, industrial PLC sequencing, computer vision solutions, and custom software automation for startups, engineering firms, and technical teams.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc) => (
            <div
              key={svc.id}
              className="bg-hud-card border border-hud-border hover:border-hud-green/60 rounded-sm p-6 space-y-5 transition-all duration-300 hud-card hud-corner flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Service Header */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-hud-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-hud-panel border border-hud-border rounded-sm group-hover:border-hud-green/50 transition-colors">
                      {svc.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-hud-green uppercase tracking-wider">
                        {svc.tag}
                      </span>
                      <h3 className="font-tech text-base sm:text-lg font-bold text-hud-bright uppercase tracking-wide">
                        {svc.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-hud-slate font-medium">
                  {svc.subtitle}
                </div>

                <p className="text-xs text-hud-slate font-sans leading-relaxed">
                  {svc.description}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-1.5 pt-2 border-t border-hud-border/60">
                  <div className="text-[10px] font-mono text-hud-muted uppercase tracking-wider">
                    VERIFIED DELIVERABLES:
                  </div>
                  <ul className="space-y-1 text-xs font-mono text-hud-text">
                    {svc.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-hud-green flex-shrink-0" />
                        <span className="text-hud-slate text-[11px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Service Action Button */}
              <div className="pt-3 border-t border-hud-border">
                <button
                  type="button"
                  onClick={handleScrollToInquiry}
                  className="w-full py-2 px-3 bg-hud-panel hover:bg-hud-green hover:text-black border border-hud-border hover:border-hud-green text-hud-bright rounded-sm font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>REQUEST THIS SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Special Custom Engineering Box */}
          <div className="bg-gradient-to-br from-hud-card via-hud-panel to-hud-card border border-hud-green/40 rounded-sm p-6 space-y-5 hud-corner flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <div className="p-2.5 bg-hud-green/10 border border-hud-green/40 rounded-sm w-fit text-hud-green">
                <Zap className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-mono text-hud-green uppercase tracking-wider">
                  CUSTOM ENGINEERING
                </span>
                <h3 className="font-tech text-lg font-bold text-hud-bright uppercase tracking-wide">
                  Custom Mechatronics Problem?
                </h3>
              </div>

              <p className="text-xs text-hud-slate font-sans leading-relaxed">
                Have a multidisciplinary engineering project combining sensors, custom microcontrollers, computer vision, or automated test setups? Let's discuss your technical constraints.
              </p>

              <div className="p-3 bg-hud-bg/80 border border-hud-border rounded-sm font-mono text-xs space-y-1 text-hud-slate">
                <div className="text-hud-green font-bold text-[11px]">&gt; RAPID PROTOTYPING</div>
                <div className="text-[11px]">&gt; RIGOROUS TESTING &amp; DATA</div>
                <div className="text-[11px]">&gt; CLEAN DOCUMENTATION</div>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleScrollToInquiry}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full"
            >
              DISCUSS CUSTOM BUILD
            </Button>
          </div>
        </div>

        {/* High-Impact Engineering CTA Banner */}
        <div className="bg-hud-card border-2 border-hud-green/50 p-6 sm:p-8 rounded-sm shadow-2xl hud-corner flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-hud-green/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-hud-green/10 border border-hud-green/30 text-hud-green text-[10px] font-mono rounded-sm uppercase">
              <Activity className="w-3 h-3" />
              <span>READY FOR NEW ENGINEERING CHALLENGES</span>
            </div>
            <h3 className="font-tech text-2xl sm:text-3xl font-bold uppercase tracking-wide text-hud-bright">
              HAVE AN ENGINEERING PROBLEM?
            </h3>
            <p className="text-xs sm:text-sm text-hud-slate font-sans max-w-xl">
              Let's build a practical, tested solution tailored to your timeline, technical tolerances, and project goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full lg:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={handleScrollToInquiry}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto shadow-lg shadow-hud-green/20"
            >
              START A PROJECT INQUIRY
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
