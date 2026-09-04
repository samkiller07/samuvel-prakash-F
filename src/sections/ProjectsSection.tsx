import React, { useState, useEffect } from 'react';
import { Project } from '../types/project';
import { projectService } from '../services/projectService';
import { ProjectGrid } from '../components/projects/ProjectGrid';
import { isSupabaseConfigured } from '../lib/supabase';
import { Database, HardDrive, RefreshCw } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'supabase' | 'local'>('local');

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await projectService.getAllProjects();
      setProjects(res.data);
      setDataSource(res.source);
      if (res.error) {
        // Soft error logged, local fallback displayed
        console.warn('Projects loaded via fallback store:', res.error);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-hud-card/30 border-t border-hud-border">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs text-hud-green uppercase tracking-widest">
              <span className="w-2 h-2 bg-hud-green rounded-full" />
              <span>03 // WHAT I BUILT &bull; ENGINEERING PROJECTS</span>
            </div>
            <h2 className="font-tech text-3xl sm:text-4xl font-bold uppercase tracking-wide text-hud-bright">
              FEATURED ENGINEERING PROJECTS
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
                  <span className="text-hud-slate">AUTONOMOUS LOCAL REPO</span>
                </>
              )}
            </div>

            <button
              onClick={fetchProjects}
              className="p-1.5 bg-hud-panel hover:bg-hud-hover border border-hud-border hover:border-hud-green text-hud-muted hover:text-hud-green rounded-sm transition-colors"
              title="Refresh project telemetry"
              aria-label="Refresh project telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Dynamic Project Grid */}
        <ProjectGrid
          projects={projects}
          isLoading={isLoading}
          error={error}
          onRefresh={fetchProjects}
        />
      </div>
    </section>
  );
};
