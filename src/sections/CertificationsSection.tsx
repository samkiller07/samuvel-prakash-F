import React from 'react';
import { CERTIFICATIONS } from '../data/certificationsData';
import { HorizontalCarousel } from '../components/ui/HorizontalCarousel';
import { CheckCircle2, Shield, ExternalLink, BookOpen, Compass } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-hud-card/30 border-t border-hud-border">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
            <span className="w-2 h-2 bg-hud-green rounded-full" />
            <span>05 // WHAT I LEARNED &bull; CERTIFICATIONS &amp; WORKSHOPS</span>
          </div>
          <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
            CERTIFICATIONS &amp; WORKSHOPS
          </h2>
          <div className="circuit-line-h w-48" />
        </div>

        <p className="max-w-3xl text-sm sm:text-base text-hud-slate leading-relaxed font-sans">
          Technical knowledge, domain principles, and engineering methodologies acquired through structured academic accreditations and applied engineering workshops.
        </p>

        {/* Certifications Horizontal Carousel */}
        <div className="w-full">
          <HorizontalCarousel
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 2 }}
            ariaLabel="Certifications and Workshops Carousel"
            prevLabel="Previous certifications"
            nextLabel="Next certifications"
            autoSlide={false}
          >
            {CERTIFICATIONS.map((cert) => {
              const hasIssuer = cert.issuer && cert.issuer !== 'N/A';
              const hasDate = cert.issueDate && cert.issueDate !== 'N/A';
              const hasId = cert.credentialId && cert.credentialId !== 'N/A';
              const hasUrl = cert.credentialUrl && cert.credentialUrl !== 'N/A';

              return (
                <div
                  key={cert.id}
                  className="bg-hud-card border border-hud-border hover:border-hud-green/60 rounded-sm p-5 space-y-4 transition-all duration-200 hud-card hud-corner h-full flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 pb-3 border-b border-hud-border">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-hud-panel border border-hud-border-bright rounded-sm text-hud-cyan flex-shrink-0">
                          <Shield className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-tech text-base sm:text-lg font-bold text-hud-bright tracking-wide">
                            {cert.title}
                          </h3>
                          {hasIssuer && (
                            <div className="text-xs font-mono text-hud-slate">
                              {cert.issuer}
                            </div>
                          )}
                        </div>
                      </div>

                      {(hasDate || hasId) && (
                        <div className="text-right font-mono text-xs text-hud-muted flex-shrink-0">
                          {hasDate && <div className="text-hud-green font-bold">{cert.issueDate}</div>}
                          {hasId && (
                            <div className="text-[10px] text-hud-slate">ID: {cert.credentialId}</div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Short Description */}
                    {cert.description && (
                      <p className="text-xs text-hud-slate font-sans leading-relaxed">
                        {cert.description}
                      </p>
                    )}

                    {/* What I Learned */}
                    {cert.whatILearned && cert.whatILearned.length > 0 && (
                      <div className="space-y-2 p-3 bg-hud-panel/80 border border-hud-border/70 rounded-sm">
                        <div className="text-[11px] font-mono text-hud-green uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                          <BookOpen className="w-3.5 h-3.5 text-hud-green" />
                          <span>WHAT I LEARNED:</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-hud-text font-sans">
                          {cert.whatILearned.map((item, iIdx) => (
                            <li key={iIdx} className="flex items-start gap-2">
                              <span className="text-hud-green font-mono text-xs leading-none mt-0.5">&bull;</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Engineering Relevance */}
                    {cert.engineeringRelevance && (
                      <div className="p-2.5 bg-hud-card border-l-2 border-hud-cyan text-[11px] font-mono text-hud-muted space-y-0.5">
                        <div className="text-hud-cyan font-bold uppercase tracking-wider flex items-center gap-1">
                          <Compass className="w-3 h-3" />
                          <span>ENGINEERING RELEVANCE</span>
                        </div>
                        <p className="font-sans text-hud-slate">{cert.engineeringRelevance}</p>
                      </div>
                    )}

                    {/* Competencies */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-mono text-hud-muted uppercase tracking-wider">
                        KEY COMPETENCIES:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skillsCovered.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 bg-hud-panel border border-hud-border text-[11px] font-mono text-hud-text rounded-sm flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3 text-hud-green flex-shrink-0" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Optional Verify Link */}
                  {hasUrl && (
                    <div className="pt-2 border-t border-hud-border/60 flex justify-end">
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-hud-green hover:underline"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </HorizontalCarousel>
        </div>
      </div>
    </section>
  );
};
