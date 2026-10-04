import React, { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { projectService } from '../services/projectService';
import { ClientWorkCard } from '../components/projects/ClientWorkCard';
import { ProjectDetailModal } from '../components/projects/ProjectDetailModal';
import { HorizontalCarousel } from '../components/ui/HorizontalCarousel';
import { Database, HardDrive, RefreshCw, Briefcase, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ClientWorkSection: React.FC = () => {
  const [clientProjects, setClientProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('local');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fetchClientProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await projectService.getClientProjects();
      setClientProjects(res.data);
      setDataSource(res.source);
    } catch (err: any) {
      setError(err.message || 'Failed to load client projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClientProjects();
  }, []);

  return (
    <section
      id="client-work"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-hud-bg border-t border-hud-border relative"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
              <span className="w-2 h-2 bg-hud-green rounded-full animate-ping" />
              <span>02.5 // CLIENT WORK &bull; DELIVERED CLIENT SOLUTIONS</span>
            </div>
            <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
              CLIENT WORK
            </h2>
            <div className="circuit-line-h w-48" />
          </div>

          {/* Data Bus Source Indicator */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-hud-panel border border-hud-border rounded-sm text-hud-muted">
              {dataSource === 'supabase' ? (
                <>
                  <Database className="w-3.5 h-3.5 text-hud-green" />
                  <span className="text-hud-green">SUPABASE CLOUD DB</span>
                </>
              ) : (
                <>
                  <HardDrive className="w-3.5 h-3.5 text-hud-cyan" />
                  <span className="text-hud-slate">VERIFIED TELEMETRY</span>
                </>
              )}
            </div>

            <button
              onClick={fetchClientProjects}
              className="p-1.5 bg-hud-panel hover:bg-hud-hover border border-hud-border hover:border-hud-green text-hud-muted hover:text-hud-green rounded-sm transition-colors cursor-pointer"
              title="Refresh client project telemetry"
              aria-label="Refresh client project telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Supporting Subtitle */}
        <p className="max-w-3xl text-sm sm:text-base text-hud-slate leading-relaxed font-sans">
          Selected projects delivered for clients. Each solution is built to client specifications with strict focus on production reliability, performance, and responsive design.
        </p>

        {/* Loading State */}
        {isLoading && (
          <div className="min-h-[300px] flex flex-col items-center justify-center font-mono text-xs text-hud-muted space-y-3 bg-hud-card/40 border border-hud-border rounded-sm p-12">
            <div className="w-8 h-8 border-2 border-hud-green border-t-transparent rounded-full animate-spin" />
            <span>CONNECTING TO CLIENT DELIVERY REPOSITORY...</span>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="p-8 bg-hud-card border border-hud-border text-center space-y-4 font-mono">
            <p className="text-sm text-hud-amber">
              {error || 'Unable to retrieve client work records.'}
            </p>
            <Button variant="secondary" size="sm" onClick={fetchClientProjects}>
              RETRY TELEMETRY BUS
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && clientProjects.length === 0 && (
          <div className="p-12 text-center bg-hud-card border border-hud-border rounded-sm space-y-3 font-mono text-xs">
            <Briefcase className="w-8 h-8 mx-auto text-hud-muted opacity-40 mb-1" />
            <p className="text-hud-slate">No client projects currently published.</p>
          </div>
        )}

        {/* Single Item State: Clean prominent display */}
        {!isLoading && !error && clientProjects.length === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <ClientWorkCard
                project={clientProjects[0]}
                onSelect={(proj) => setSelectedProject(proj)}
              />
            </div>
            {/* Delivery Guarantee Card */}
            <div className="bg-hud-card/60 border border-hud-border rounded-sm p-6 flex flex-col justify-between space-y-4 font-mono text-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-hud-green font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CLIENT DELIVERY COMMITMENT</span>
                </div>
                <p className="text-hud-slate leading-relaxed font-sans text-xs sm:text-sm">
                  Available for freelance web application development, custom software dashboards, embedded prototyping, and engineering automation.
                </p>
                <div className="space-y-2 pt-2 border-t border-hud-border">
                  <div className="flex items-center gap-2 text-hud-bright">
                    <span className="text-hud-green">&bull;</span>
                    <span>100% On-Time Delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-hud-bright">
                    <span className="text-hud-green">&bull;</span>
                    <span>Direct Communication &amp; Live Previews</span>
                  </div>
                  <div className="flex items-center gap-2 text-hud-bright">
                    <span className="text-hud-green">&bull;</span>
                    <span>Production Quality &amp; Clean Code</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-hud-border">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-hud-panel hover:bg-hud-green hover:text-black border border-hud-border hover:border-hud-green text-hud-bright rounded-sm transition-all font-bold"
                >
                  START A CLIENT INQUIRY
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Multi-Item Carousel State */}
        {!isLoading && !error && clientProjects.length > 1 && (
          <div className="w-full">
            <HorizontalCarousel
              itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
              ariaLabel="Client Work Carousel"
              prevLabel="Previous client project"
              nextLabel="Next client project"
              autoSlide={true}
              autoSlideInterval={4500}
            >
              {clientProjects.map((project) => (
                <div key={project.id} className="h-full pb-2">
                  <ClientWorkCard
                    project={project}
                    onSelect={(proj) => setSelectedProject(proj)}
                  />
                </div>
              ))}
            </HorizontalCarousel>
          </div>
        )}
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
