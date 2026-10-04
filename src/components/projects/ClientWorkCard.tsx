import React, { useState } from 'react';
import { Project } from '../../types/project';
import { Button } from '../ui/Button';
import { ExternalLink, Github, Layers, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { storageService } from '../../services/storageService';

interface ClientWorkCardProps {
  project: Project;
  onSelect?: (project: Project) => void;
}

export const ClientWorkCard: React.FC<ClientWorkCardProps> = ({ project, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const resolvedThumbnail = storageService.resolveStorageUrl(project.thumbnail_url);
  const hasValidThumbnail = Boolean(resolvedThumbnail) && !imageError;

  const deliveryText = project.delivery_time
    ? `Client Project · Delivered in ${project.delivery_time.replace(/^delivered in /i, '')}`
    : 'Client Project · Delivered on Spec';

  return (
    <div className="group relative bg-hud-card border border-hud-border hover:border-hud-green/70 rounded-sm overflow-hidden flex flex-col transition-all duration-300 hud-card hud-corner hover:shadow-hud select-none h-full">
      {/* Top Telemetry Header */}
      <div className="px-4 py-2 bg-hud-panel border-b border-hud-border flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-hud-green rounded-full animate-pulse" />
          <span className="text-hud-green font-bold text-[11px] tracking-wider uppercase">
            CLIENT PROJECT
          </span>
        </div>
        {project.delivery_time && (
          <div className="flex items-center gap-1 text-[10px] text-hud-muted bg-hud-card px-2 py-0.5 border border-hud-border rounded-xs">
            <Clock className="w-3 h-3 text-hud-cyan" />
            <span>{project.delivery_time}</span>
          </div>
        )}
      </div>

      {/* Project Thumbnail with overlay */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60 flex items-center justify-center">
        {hasValidThumbnail ? (
          <img
            src={resolvedThumbnail!}
            alt={project.title}
            draggable={false}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100 pointer-events-none"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-grid-pattern bg-hud-panel flex flex-col items-center justify-center p-4 text-center border-b border-hud-border/40">
            <Layers className="w-8 h-8 text-hud-green/60 mb-2 group-hover:text-hud-green transition-colors" />
            <span className="font-mono text-[10px] text-hud-slate uppercase tracking-wider">
              CLIENT SOLUTION // PRODUCTION
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-hud-card via-transparent to-transparent opacity-90 pointer-events-none" />

        <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-hud-green/50 text-hud-green text-[10px] font-mono rounded-xs backdrop-blur-sm pointer-events-none">
          VERIFIED CLIENT DELIVERY
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Subtitle / Delivery tag */}
          <div className="text-[11px] font-mono text-hud-muted flex items-center gap-1.5">
            <CheckCircle2 className="w-3 h-3 text-hud-green" />
            <span>{deliveryText}</span>
          </div>

          {/* Title */}
          <h3 className="font-tech text-xl sm:text-2xl font-bold text-hud-bright group-hover:text-hud-green transition-colors tracking-wide">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-hud-slate leading-relaxed font-sans line-clamp-3">
            {project.short_description}
          </p>
        </div>

        {/* Tech Stack Chips & Action Buttons */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 bg-hud-panel border border-hud-border text-[11px] font-mono text-hud-bright rounded-xs"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-1.5 py-0.5 bg-hud-panel border border-hud-border text-[10px] font-mono text-hud-slate rounded-xs">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-hud-border/70 flex items-center justify-between gap-2 relative z-10">
            {project.demo_url ? (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-hud-green text-black hover:bg-hud-bright font-mono text-xs font-bold rounded-sm transition-all shadow-sm shadow-hud-green/20 cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>VIEW LIVE PROJECT</span>
              </a>
            ) : onSelect ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSelect(project)}
                icon={<ChevronRight className="w-3.5 h-3.5" />}
                iconPosition="right"
                className="cursor-pointer"
              >
                VIEW SPECIFICATION
              </Button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-1.5">
              {onSelect && project.demo_url && (
                <button
                  type="button"
                  onClick={() => onSelect(project)}
                  className="px-3 py-2 text-hud-muted hover:text-hud-bright bg-hud-panel hover:bg-hud-hover border border-hud-border rounded-sm transition-colors text-xs font-mono cursor-pointer"
                  title="View Case Study Details"
                >
                  DETAILS
                </button>
              )}

              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-hud-muted hover:text-hud-green bg-hud-panel hover:bg-hud-hover border border-hud-border rounded-sm transition-colors cursor-pointer"
                  title="View Repository"
                  aria-label="View Source Code on GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
