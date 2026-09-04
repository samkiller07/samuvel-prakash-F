import React from 'react';
import { SKILL_CATEGORIES } from '../data/skillsData';
import { HorizontalCarousel } from '../components/ui/HorizontalCarousel';
import { Bot, Cpu, CircuitBoard, Eye, Box, Terminal, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
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

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-hud-bg border-t border-hud-border">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full" />
            <span>02 // WHAT I CAN WORK WITH &bull; TECHNICAL DOMAINS</span>
          </div>
          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            ENGINEERING SKILLS &amp; TOOLSETS
          </h2>
          <div className="circuit-line-h w-48" />
        </div>

        <p className="max-w-3xl text-sm sm:text-base text-hud-slate leading-relaxed font-sans">
          Working knowledge and hands-on toolsets developed through robotics systems, microcontroller firmware development, computer vision pipelines, and mechatronics coursework.
        </p>

        {/* Skill Category Cards Horizontal Carousel */}
        <div className="w-full">
          <HorizontalCarousel
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
            ariaLabel="Engineering Skills and Domains Carousel"
            prevLabel="Previous skill categories"
            nextLabel="Next skill categories"
            autoSlide={false}
          >
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="bg-hud-card border border-hud-border hover:border-hud-green/60 rounded-sm p-5 space-y-4 transition-all duration-300 hud-card hud-corner h-full flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-hud-border">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-hud-panel border border-hud-border rounded-sm">
                        {getIcon(cat.iconName)}
                      </div>
                      <div>
                        <h3 className="font-tech text-base font-bold text-hud-bright tracking-wide uppercase">
                          {cat.category}
                        </h3>
                        <div className="text-[10px] font-mono text-hud-green">
                          [{cat.systemCode}]
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills List in Category */}
                  <div className="pt-4 space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 bg-hud-panel/80 border border-hud-border/70 rounded-sm hover:border-hud-border-bright transition-colors space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-1.5 font-semibold text-hud-bright">
                            <CheckCircle2 className="w-3.5 h-3.5 text-hud-green flex-shrink-0" />
                            <span>{skill.name}</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 bg-hud-card border border-hud-border text-hud-slate font-mono rounded-xs">
                            {skill.telemetryCode}
                          </span>
                        </div>

                        {/* Capability Description */}
                        {skill.description && (
                          <p className="text-[11px] text-hud-muted font-sans pl-5 leading-snug">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </HorizontalCarousel>
        </div>
      </div>
    </section>
  );
};
