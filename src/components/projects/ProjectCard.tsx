import React, { useState } from 'react';
import { Project } from '../../types/project';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import { Github, ExternalLink, ChevronRight, Activity, Layers } from 'lucide-react';
import { storageService } from '../../services/storageService';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const resolvedThumbnail = storageService.resolveStorageUrl(project.thumbnail_url);
  const hasValidThumbnail = Boolean(resolvedThumbnail) && !imageError;

  return (
    <div className="group relative bg-hud-card border border-hud-border hover:border-hud-green/60 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hud-card hud-corner hover:shadow-hud select-none">
      {/* Top Telemetry Header */}
      <div className="px-4 py-2 bg-hud-panel border-b border-hud-border flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-hud-green font-bold">&bull;</span>
          <span className="text-hud-muted text-[11px] truncate max-w-[150px] uppercase">
            {project.category}
          </span>
        </div>
        <StatusBadge status={project.status} size="sm" />
      </div>

      {/* Project Thumbnail with overlay */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/50 flex items-center justify-center">
        {hasValidThumbnail ? (
          <img
            src={resolvedThumbnail!}
            alt={project.title}
            draggable={false}
            onError={() => {
              if (import.meta.env.DEV) {
                console.warn(`[ProjectCard] Failed to load thumbnail for "${project.title}":`, resolvedThumbnail);
              }
              setImageError(true);
            }}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100 pointer-events-none"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-grid-pattern bg-hud-panel flex flex-col items-center justify-center p-4 text-center border-b border-hud-border/40">
            <Layers className="w-8 h-8 text-hud-green/60 mb-2 group-hover:text-hud-green transition-colors" />
            <span className="font-mono text-[10px] text-hud-slate uppercase tracking-wider">
              {project.category} // MODULE
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-hud-card via-transparent to-transparent opacity-90 pointer-events-none" />

        {project.featured && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-hud-green/20 border border-hud-green/80 text-hud-green text-[10px] font-mono font-semibold uppercase tracking-wider rounded-sm backdrop-blur-sm pointer-events-none">
            FEATURED MODULE
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="font-tech text-lg sm:text-xl font-bold text-hud-bright group-hover:text-hud-green transition-colors tracking-wide">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm text-hud-slate line-clamp-3 leading-relaxed font-sans">
            {project.short_description}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-hud-panel border border-hud-border text-[11px] font-mono text-hud-muted rounded-sm"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-1.5 py-0.5 bg-hud-panel border border-hud-border text-[10px] font-mono text-hud-slate rounded-sm">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-hud-border/70 flex items-center justify-between gap-2 relative z-10">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect(project)}
              icon={<ChevronRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              className="w-full sm:w-auto cursor-pointer"
            >
              SPECIFICATION
            </Button>

            <div className="flex items-center gap-1.5">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-hud-muted hover:text-hud-green bg-hud-panel hover:bg-hud-hover border border-hud-border rounded-sm transition-colors cursor-pointer"
                  title="View Source Code"
                  aria-label="View Source Code on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-hud-muted hover:text-hud-cyan bg-hud-panel hover:bg-hud-hover border border-hud-border rounded-sm transition-colors cursor-pointer"
                  title="Live Demo"
                  aria-label="Live Demo Link"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
