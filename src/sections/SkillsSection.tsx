import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/skillsData';
import {
  Bot,
  Cpu,
  CircuitBoard,
  Eye,
  Box,
  Terminal,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Zap,
  FolderGit2
} from 'lucide-react';
import { Button } from '../components/ui/Button';

interface SkillsSectionProps {
  onNavigateToProjects?: () => void;
  onNavigateToServices?: (serviceId?: string) => void;
}

// Domain-to-Project & Service Relations Map
const DOMAIN_RELATIONS: Record<
  string,
  {
    projectName: string;
    projectSlug: string;
    serviceTitle: string;
    serviceId: string;
    highlights: string[];
  }
> = {
  'SYS-RBT-01': {
    projectName: 'PLC Mini Automation Cell & Sequence Control',
    projectSlug: 'plc-mini-automation-cell',
    serviceTitle: 'PLC & Industrial Automation Prototyping',
    serviceId: 'industrial-plc',
    highlights: ['Actuator Timing Loops', 'Interlocking Relays', 'State Machine Sequencing']
  },
  'SYS-EMB-02': {
    projectName: 'AI Air Quality Monitoring & Automation',
    projectSlug: 'air-quality-monitoring',
    serviceTitle: 'Embedded Systems & IoT Prototyping',
    serviceId: 'embedded-iot',
    highlights: ['ESP32 / ESP8266 C++', 'I2C / SPI / UART Sensor Interfacing', 'PID Control & Actuation']
  },
  'SYS-VIS-03': {
    projectName: 'Computer Vision Object Detection & Pose Tracking',
    projectSlug: 'computer-vision-detection',
    serviceTitle: 'Computer Vision & Edge AI Pipelines',
    serviceId: 'computer-vision',
    highlights: ['YOLOv8 Real-time Inference', 'OpenCV Frame Preprocessing', 'Spatial Activity Recognition']
  },
  'SYS-DEV-04': {
    projectName: 'Internship Recommendation & Matching Engine',
    projectSlug: 'internship-recommendation-system',
    serviceTitle: 'Engineering Dashboards & REST Telemetry',
    serviceId: 'engineering-dashboards',
    highlights: ['Python Backend Microservices', 'Algorithmic Matching', 'Serial Data Acquisition']
  },
  'SYS-CAE-05': {
    projectName: 'HyperMesh Tcl Batch Automation Toolkit',
    projectSlug: 'hypermesh-tcl-automation',
    serviceTitle: 'Engineering Software & CAE Automation',
    serviceId: 'engineering-software',
    highlights: ['Tcl/Tk Macro Scripting', 'CAD Geometry Midsurfacing', '2D/3D Mesh Criteria Validation']
  },
  'SYS-AUT-06': {
    projectName: 'PLC Mini Automation Cell & Sequence Control',
    projectSlug: 'plc-mini-automation-cell',
    serviceTitle: 'PLC & Industrial Automation Prototyping',
    serviceId: 'industrial-plc',
    highlights: ['CODESYS V3.5 Ladder Logic', 'Pneumatic Actuator Control', 'Safety Interlock Circuits']
  }
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  onNavigateToProjects,
  onNavigateToServices
}) => {
  const [selectedCatCode, setSelectedCatCode] = useState<string>(SKILL_CATEGORIES[0].systemCode);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number>(0);

  const activeCategory =
    SKILL_CATEGORIES.find((c) => c.systemCode === selectedCatCode) || SKILL_CATEGORIES[0];
  const activeSkill = activeCategory.skills[selectedSkillIndex] || activeCategory.skills[0];
  const relation = DOMAIN_RELATIONS[activeCategory.systemCode] || DOMAIN_RELATIONS['SYS-EMB-02'];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-5 h-5 text-hud-green" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-hud-cyan" />;
      case 'CircuitBoard':
        return <CircuitBoard className="w-5 h-5 text-hud-green" />;
      case 'Eye':
        return <Eye className="w-5 h-5 text-hud-amber" />;
      case 'Box':
        return <Box className="w-5 h-5 text-hud-green" />;
      default:
        return <Terminal className="w-5 h-5 text-hud-cyan" />;
    }
  };

  const handleGoToProjects = () => {
    if (onNavigateToProjects) {
      onNavigateToProjects();
    } else {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToServices = (serviceId: string) => {
    if (onNavigateToServices) {
      onNavigateToServices(serviceId);
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-hud-bg border-t border-hud-border">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full" />
            <span>03 // INTERACTIVE CAPABILITY EXPLORER &bull; SKILL &rarr; PROJECT &rarr; SERVICE</span>
          </div>
          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            ENGINEERING CAPABILITY MAP
          </h2>
          <div className="circuit-line-h w-48" />
        </div>

        <p className="max-w-3xl text-sm sm:text-base text-hud-slate leading-relaxed font-sans">
          Select a technical domain to explore verified toolsets, connected real-world project demonstrations, and freelance engineering deliverables.
        </p>

        {/* Interactive Capability Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Domain Selector Cards */}
          <div className="lg:col-span-5 space-y-2.5 font-mono">
            {SKILL_CATEGORIES.map((cat) => {
              const isSelected = cat.systemCode === selectedCatCode;
              return (
                <button
                  key={cat.systemCode}
                  type="button"
                  onClick={() => {
                    setSelectedCatCode(cat.systemCode);
                    setSelectedSkillIndex(0);
                  }}
                  className={`w-full text-left p-3.5 rounded-sm border transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-hud-panel border-hud-green shadow-md shadow-hud-green/10'
                      : 'bg-hud-card border-hud-border hover:border-hud-green/50 hover:bg-hud-panel/60'
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
                      {getIcon(cat.iconName)}
                    </div>
                    <div>
                      <div className="text-[10px] text-hud-green font-bold">
                        [{cat.systemCode}]
                      </div>
                      <div
                        className={`text-xs sm:text-sm font-bold uppercase ${
                          isSelected ? 'text-hud-bright' : 'text-hud-text'
                        }`}
                      >
                        {cat.category}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-hud-muted">
                    {cat.skills.length} TOOLS &gt;
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Interactive Detail & Capability Node */}
          <div className="lg:col-span-7 bg-hud-card border border-hud-border-bright p-5 sm:p-7 rounded-sm shadow-2xl space-y-6 hud-corner">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-hud-border">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-hud-panel border border-hud-green/40 rounded-sm">
                  {getIcon(activeCategory.iconName)}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-hud-green uppercase tracking-wider">
                    SYSTEM DOMAIN // {activeCategory.systemCode}
                  </span>
                  <h3 className="font-tech text-xl sm:text-2xl font-bold text-hud-bright uppercase tracking-wide">
                    {activeCategory.category}
                  </h3>
                </div>
              </div>
            </div>

            {/* Interactive Skill Chips in Domain */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-hud-muted uppercase tracking-wider">
                SELECT A TOOLSET TO INSPECT:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeCategory.skills.map((skill, sIdx) => {
                  const isCurrentSkill = sIdx === selectedSkillIndex;
                  return (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() => setSelectedSkillIndex(sIdx)}
                      className={`px-3 py-1.5 rounded-sm border font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        isCurrentSkill
                          ? 'bg-hud-green text-black border-hud-green font-bold shadow-sm shadow-hud-green/30'
                          : 'bg-hud-panel border-hud-border text-hud-text hover:text-hud-bright hover:border-hud-green/60'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Tool Description */}
            <div className="p-4 bg-hud-bg/80 border border-hud-border rounded-sm space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-hud-green font-bold uppercase">
                  TOOL: {activeSkill.name}
                </span>
                <span className="text-hud-muted text-[10px]">
                  CODE: {activeSkill.telemetryCode}
                </span>
              </div>
              <p className="text-sm text-hud-text font-sans leading-relaxed">
                {activeSkill.description}
              </p>
            </div>

            {/* Relationship Callout: SKILL -> PROJECT -> SERVICE */}
            <div className="p-4 bg-hud-panel border-l-4 border-hud-green rounded-sm space-y-3 font-mono text-xs">
              <div className="text-hud-green font-bold uppercase tracking-wider flex items-center gap-2 text-[11px]">
                <Zap className="w-3.5 h-3.5 text-hud-green" />
                <span>CONNECTED APPLICATION PIPELINE:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-hud-muted uppercase">REAL PROJECT PROOF:</span>
                  <div className="text-hud-bright font-semibold flex items-center gap-1">
                    <FolderGit2 className="w-3.5 h-3.5 text-hud-cyan flex-shrink-0" />
                    <span>{relation.projectName}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-hud-muted uppercase">FREELANCE SERVICE:</span>
                  <div className="text-hud-green font-semibold flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-hud-green flex-shrink-0" />
                    <span>{relation.serviceTitle}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 border-t border-hud-border flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={handleGoToProjects}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                VIEW DEMONSTRATED PROJECT
              </Button>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleGoToServices(relation.serviceId)}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                REQUEST THIS ENGINEERING SERVICE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
