import React from 'react';
import { ACHIEVEMENTS } from '../data/achievementsData';
import { HorizontalCarousel } from '../components/ui/HorizontalCarousel';
import { Trophy, Award, Medal, Flag, Zap, Target } from 'lucide-react';

const getIcon = (badge?: string) => {
  switch (badge) {
    case '1ST PRIZE':
    case 'WINNER':
      return <Trophy className="w-5 h-5 text-hud-green" />;
    case '2ND PRIZE':
    case 'RUNNER-UP':
      return <Award className="w-5 h-5 text-hud-cyan" />;
    case '3RD PRIZE':
    case 'PROJECT AWARD':
      return <Medal className="w-5 h-5 text-hud-amber" />;
    default:
      return <Flag className="w-5 h-5 text-hud-green" />;
  }
};

export const AchievementsSection: React.FC = () => {
  return (
    <section
      id="achievements"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-hud-bg border-t border-hud-border"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full" />
            <span>04 // WHAT I DEMONSTRATED &bull; ACHIEVEMENTS &amp; RECOGNITION</span>
          </div>

          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            HONORS &amp; COMPETITIONS
          </h2>

          <div className="circuit-line-h w-48" />
        </div>

        {/* Intro */}
        <p className="max-w-3xl text-sm sm:text-base text-hud-slate leading-relaxed font-sans">
          Practical milestones and competitive problem-solving recognitions achieved through hackathons, technical presentations, and multidisciplinary engineering challenges.
        </p>

        {/* Horizontal Carousel for Achievements */}
        <div className="w-full">
          <HorizontalCarousel
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 2 }}
            ariaLabel="Achievements and Competitions Carousel"
            prevLabel="Previous achievements"
            nextLabel="Next achievements"
            autoSlide={false}
          >
            {ACHIEVEMENTS.map((item) => (
              <div
                key={item.id}
                className="bg-hud-card border border-hud-border hover:border-hud-green/60 rounded-sm p-6 space-y-4 transition-all duration-200 hud-card hud-corner h-full flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4 pb-3 border-b border-hud-border">
                    <div className="flex gap-3">
                      <div className="p-2 bg-hud-panel border border-hud-border rounded-sm flex-shrink-0">
                        {getIcon(item.badge)}
                      </div>

                      <div>
                        <h3 className="font-tech text-base sm:text-lg text-hud-bright uppercase tracking-wide font-bold">
                          {item.title}
                        </h3>

                        <p className="text-xs font-mono text-hud-slate mt-0.5">
                          {item.organization}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-mono text-hud-green font-bold">
                        {item.dateText}
                      </p>

                      <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-mono border border-hud-green/40 text-hud-green bg-hud-panel rounded-xs uppercase">
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-hud-slate leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* What It Demonstrates Callout */}
                  {item.whatItDemonstrates && (
                    <div className="p-3 bg-hud-panel/80 border border-hud-border/70 rounded-sm space-y-1">
                      <div className="text-[10px] font-mono text-hud-green uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                        <Target className="w-3.5 h-3.5 text-hud-green" />
                        <span>WHAT IT DEMONSTRATES:</span>
                      </div>
                      <p className="text-xs text-hud-text font-sans leading-relaxed">
                        {item.whatItDemonstrates}
                      </p>
                    </div>
                  )}
                </div>

                {/* Outcome Footer */}
                <div className="pt-3 border-t border-hud-border/70 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-hud-muted">
                    VERIFIED RESULT
                  </span>

                  <span className="px-2.5 py-1 text-xs font-mono text-hud-cyan border border-hud-cyan/30 bg-hud-panel rounded-sm font-semibold">
                    {item.metrics}
                  </span>
                </div>
              </div>
            ))}
          </HorizontalCarousel>
        </div>

        {/* Bottom Summary Metric Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 font-mono">
          <div className="bg-hud-card border border-hud-border p-4 text-center rounded-sm">
            <div className="text-2xl sm:text-3xl font-tech text-hud-green font-bold">1ST</div>
            <div className="text-[11px] text-hud-muted uppercase pt-1">
              AutoBot Hackathon
            </div>
          </div>

          <div className="bg-hud-card border border-hud-border p-4 text-center rounded-sm">
            <div className="text-2xl sm:text-3xl font-tech text-hud-cyan font-bold">2ND</div>
            <div className="text-[11px] text-hud-muted uppercase pt-1">
              Buildathon Award
            </div>
          </div>

          <div className="bg-hud-card border border-hud-border p-4 text-center rounded-sm">
            <div className="text-2xl sm:text-3xl font-tech text-hud-amber font-bold">3RD</div>
            <div className="text-[11px] text-hud-muted uppercase pt-1">
              Project Defense
            </div>
          </div>

          <div className="bg-hud-card border border-hud-border p-4 text-center rounded-sm">
            <div className="text-2xl sm:text-3xl font-tech text-hud-green font-bold">2&times;</div>
            <div className="text-[11px] text-hud-muted uppercase pt-1">
              SIH Participant
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};