import React, { useState } from 'react';
import {
  Cpu,
  Bot,
  Terminal,
  Code2,
  Gauge,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/Button';

interface ServicesSectionProps {
  onStartProject?: (serviceId?: string) => void;
  onViewProject?: (projectId: string) => void;
}

export const SERVICES = [
  {
    id: 'embedded-iot',
    number: '01',
    icon: <Cpu className="w-5 h-5 text-hud-green" />,
    tag: 'HARDWARE & FIRMWARE',
    title: 'Embedded Systems & IoT Prototyping',
    subtitle: 'ESP32, ESP8266 & Arduino microcontrollers',
    description:
      'Custom hardware prototypes combining sensor interfacing (gas, thermal, optical), closed-loop PID control algorithms, solid-state actuation, and low-latency IoT cloud telemetry.',
    deliverables: [
      'ESP32 / ESP8266 / Arduino C++ Firmware',
      'Multi-Sensor Interfacing & Calibration',
      'Relay / Motor / Actuator Driver Circuits',
      'MQTT / WebSockets Cloud Telemetry'
    ],
    techStack: ['ESP32', 'Arduino C++', 'DHT22 / MQ-135', 'MQTT', 'PID Control'],
    relatedProject: 'air-quality-monitoring',
    relatedProjectName: 'AI Air Quality Monitoring & Automation'
  },
  {
    id: 'industrial-plc',
    number: '02',
    icon: <Terminal className="w-5 h-5 text-hud-cyan" />,
    tag: 'INDUSTRIAL CONTROL',
    title: 'PLC & Industrial Automation',
    subtitle: 'CODESYS V3.5 & IEC 61131-3 Ladder Logic',
    description:
      'Deterministic industrial automation programming including conveyor sequencing, pneumatic actuator timing, proximity sensor interlocking, emergency stop routines, and SoftPLC simulation.',
    deliverables: [
      'IEC 61131-3 Ladder Logic Programs',
      'Motor Latching & Safety Interlocks',
      'Timer / Counter / Dwell Routines',
      'CODESYS SoftPLC Simulation Testing'
    ],
    techStack: ['CODESYS V3.5', 'IEC 61131-3', 'Ladder Logic', 'Pneumatics', 'SoftPLC'],
    relatedProject: 'plc-mini-automation-cell',
    relatedProjectName: 'PLC Mini Automation Cell & Sequence Control'
  },
  {
    id: 'computer-vision',
    number: '03',
    icon: <Bot className="w-5 h-5 text-hud-amber" />,
    tag: 'EDGE AI & VISION',
    title: 'Computer Vision & Edge AI',
    subtitle: 'Python, OpenCV & YOLO Deep Learning',
    description:
      'Real-time visual monitoring pipelines for automated object detection, spatial bounding boxes, frame preprocessing, and keypoint-based human posture classification at high frame rates.',
    deliverables: [
      'Custom YOLO Object Detection Pipelines',
      'OpenCV Frame Filtering & Analysis',
      'Pose / Activity State Classification',
      'Low-Latency Edge Video Telemetry'
    ],
    techStack: ['Python', 'OpenCV', 'YOLOv8', 'NumPy', 'Edge Inference'],
    relatedProject: 'computer-vision-detection',
    relatedProjectName: 'Computer Vision Object Detection & Pose Tracking'
  },
  {
    id: 'engineering-software',
    number: '04',
    icon: <Code2 className="w-5 h-5 text-hud-green" />,
    tag: 'CAE & AUTOMATION',
    title: 'Engineering Software & Automation',
    subtitle: 'Altair HyperMesh & Tcl/Tk Scripting',
    description:
      'Custom engineering scripts to automate repetitive CAE preprocessing, CAD defeaturing, midsurface extraction, parametric washer creation, 2D/3D quad meshing, and solver deck exports.',
    deliverables: [
      'Tcl/Tk HyperMesh Automation Scripts',
      'CAD Cleanup & Midsurface Batch Macros',
      'Element Quality Criteria Validators',
      'OptiStruct / Nastran / Abaqus Export'
    ],
    techStack: ['Altair HyperMesh', 'Tcl/Tk', 'FEA Preprocessing', 'OptiStruct', 'Nastran'],
    relatedProject: 'hypermesh-tcl-automation',
    relatedProjectName: 'HyperMesh Tcl Batch Automation Toolkit'
  },
  {
    id: 'engineering-dashboards',
    number: '05',
    icon: <Gauge className="w-5 h-5 text-hud-cyan" />,
    tag: 'SOFTWARE & TOOLS',
    title: 'Engineering Dashboards & Telemetry',
    subtitle: 'Python, Flask REST APIs & Telemetry',
    description:
      'Targeted software applications for engineering calculations, algorithmic matching engines, serial sensor data logging, and real-time interactive monitoring dashboards.',
    deliverables: [
      'Flask / Python REST API Microservices',
      'Algorithmic Weighted Matching Engines',
      'Serial & COM Port Data Acquisition Tools',
      'Live Engineering Telemetry Interfaces'
    ],
    techStack: ['Python', 'Flask', 'REST APIs', 'Data Logging', 'Web Telemetry'],
    relatedProject: 'internship-recommendation-system',
    relatedProjectName: 'Internship Recommendation & Matching Engine'
  }
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onStartProject,
  onViewProject
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);

  const selectedService =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const handleRequestService = (serviceId: string) => {
    if (onStartProject) {
      onStartProject(serviceId);
    } else {
      const el = document.getElementById('contact-form') || document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-hud-card/20 border-t border-hud-border relative"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
              <span className="w-2 h-2 bg-hud-green rounded-full animate-ping" />
              <span>01 // WHAT DO YOU NEED TO BUILD? &bull; FREELANCE SERVICES</span>
            </div>
            <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
              FREELANCE ENGINEERING CAPABILITIES
            </h2>
            <div className="circuit-line-h w-48" />
          </div>

          <div className="font-mono text-xs text-hud-green flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>AVAILABLE FOR CLIENT &amp; CONTRACT PROJECTS</span>
          </div>
        </div>

        {/* Short Statement */}
        <p className="max-w-3xl text-sm sm:text-base text-hud-slate leading-relaxed font-sans">
          Select an engineering module below to review verified capabilities, technical toolsets, and live project demonstrations.
        </p>

        {/* Interactive Services Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Service Selectors */}
          <div className="lg:col-span-5 space-y-2.5 font-mono">
            {SERVICES.map((svc) => {
              const isSelected = svc.id === selectedServiceId;
              return (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => setSelectedServiceId(svc.id)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-sm border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-hud-panel border-hud-green shadow-md shadow-hud-green/10'
                      : 'bg-hud-card/80 border-hud-border hover:border-hud-green/50 hover:bg-hud-panel/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-sm border ${
                        isSelected
                          ? 'bg-hud-green/20 border-hud-green text-hud-green'
                          : 'bg-hud-bg border-hud-border text-hud-muted'
                      }`}
                    >
                      {svc.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-hud-muted">
                        <span className="text-hud-green font-bold">[{svc.number}]</span>
                        <span>{svc.tag}</span>
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-bold uppercase ${
                          isSelected ? 'text-hud-bright' : 'text-hud-text'
                        }`}
                      >
                        {svc.title}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-hud-green translate-x-1' : 'text-hud-muted opacity-40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Service Detailed Specification Card */}
          <div className="lg:col-span-7 bg-hud-card border border-hud-border-bright p-5 sm:p-7 rounded-sm shadow-2xl space-y-6 hud-corner relative">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-hud-border">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-hud-panel border border-hud-green/40 rounded-sm">
                  {selectedService.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-hud-green uppercase tracking-wider">
                    MODULE {selectedService.number} // {selectedService.tag}
                  </span>
                  <h3 className="font-tech text-xl sm:text-2xl font-bold text-hud-bright uppercase tracking-wide">
                    {selectedService.title}
                  </h3>
                </div>
              </div>

              <span className="text-xs font-mono text-hud-slate bg-hud-panel px-2.5 py-1 border border-hud-border rounded-xs">
                {selectedService.subtitle}
              </span>
            </div>

            <p className="text-sm text-hud-slate leading-relaxed font-sans">
              {selectedService.description}
            </p>

            {/* Verified Deliverables */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-hud-green uppercase tracking-wider font-semibold">
                VERIFIED DELIVERABLES:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                {selectedService.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-hud-panel/90 border border-hud-border rounded-sm flex items-center gap-2 text-hud-text"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-hud-green flex-shrink-0" />
                    <span className="text-[11px] text-hud-slate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="space-y-2 pt-2 border-t border-hud-border">
              <div className="text-[10px] font-mono text-hud-muted uppercase tracking-wider">
                CORE TECHNICAL STACK:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedService.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 bg-hud-bg border border-hud-border-bright text-hud-bright text-xs font-mono rounded-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-hud-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs font-mono text-hud-muted text-center sm:text-left">
                <span>Proof: </span>
                <span className="text-hud-cyan">{selectedService.relatedProjectName}</span>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={() => handleRequestService(selectedService.id)}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full sm:w-auto shadow-md shadow-hud-green/20 font-bold"
              >
                REQUEST THIS SERVICE
              </Button>
            </div>
          </div>
        </div>

        {/* High-Impact CTA Banner */}
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
              Tell me what you're trying to build — sensors, PLC, IoT, computer vision, or custom software tools.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full lg:w-auto">
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleRequestService(selectedServiceId)}
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
