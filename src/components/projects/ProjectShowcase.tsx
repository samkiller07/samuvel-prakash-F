import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../../types/project';
import { storageService } from '../../services/storageService';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Button } from '../ui/Button';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Maximize2,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  HardDrive
} from 'lucide-react';

interface ProjectShowcaseProps {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  isLoading,
  error,
  onRefresh
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) return; // Don't intercept if modal is open
      if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [projects.length, selectedProject]);

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center font-mono text-xs text-hud-muted space-y-3 bg-hud-card/40 border border-hud-border rounded-sm p-12">
        <div className="w-8 h-8 border-2 border-hud-green border-t-transparent rounded-full animate-spin" />
        <span>MOUNTING INTERACTIVE ENGINEERING WORKSTATION...</span>
      </div>
    );
  }

  if (error || !projects || projects.length === 0) {
    return (
      <div className="p-8 bg-hud-card border border-hud-border text-center space-y-4 font-mono">
        <p className="text-sm text-hud-amber">
          {error || 'No engineering projects found in repository.'}
        </p>
        <Button variant="secondary" size="sm" onClick={onRefresh}>
          RETRY TELEMETRY BUS
        </Button>
      </div>
    );
  }

  const currentProject = projects[activeIndex] || projects[0];
  const totalProjects = projects.length;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : totalProjects - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < totalProjects - 1 ? prev + 1 : 0));
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // Resolve thumbnail/diagram image
  const rawImage =
    currentProject.thumbnail_url ||
    (currentProject.media && currentProject.media[0]?.url) ||
    '';
  const displayImage = storageService.resolveStorageUrl(rawImage);

  return (
    <div className="space-y-6" ref={showcaseRef}>
      {/* Workstation Header Selector & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 bg-hud-card border border-hud-border rounded-sm font-mono text-xs">
        {/* Number Selector Pills */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          <span className="text-hud-muted mr-1 hidden sm:inline">PROJECT_DECK:</span>
          {projects.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-2.5 py-1 rounded-sm border transition-all cursor-pointer font-bold ${
                idx === activeIndex
                  ? 'bg-hud-green text-black border-hud-green shadow-sm shadow-hud-green/30'
                  : 'bg-hud-panel border-hud-border text-hud-muted hover:text-hud-bright hover:border-hud-green/50'
              }`}
              title={p.title}
              aria-label={`Jump to project ${idx + 1}: ${p.title}`}
            >
              0{idx + 1}
            </button>
          ))}
        </div>

        {/* Previous / Next Workstation Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="px-3 py-1 bg-hud-panel hover:bg-hud-hover border border-hud-border hover:border-hud-green text-hud-bright rounded-sm flex items-center gap-1 transition-colors cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-hud-green" />
            <span className="hidden sm:inline">PREV</span>
          </button>

          <span className="text-hud-slate font-bold px-1">
            0{activeIndex + 1} / 0{totalProjects}
          </span>

          <button
            type="button"
            onClick={handleNext}
            className="px-3 py-1 bg-hud-panel hover:bg-hud-hover border border-hud-border hover:border-hud-green text-hud-bright rounded-sm flex items-center gap-1 transition-colors cursor-pointer"
            aria-label="Next Project"
          >
            <span className="hidden sm:inline">NEXT</span>
            <ChevronRight className="w-3.5 h-3.5 text-hud-green" />
          </button>
        </div>
      </div>

      {/* Main Single Dominant Project Workstation Card */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="bg-hud-card border-2 border-hud-border-bright rounded-sm p-4 sm:p-7 shadow-2xl hud-corner transition-all duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Interactive Project Visual & Architecture Diagram */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative group bg-[#020504] border border-hud-border rounded-sm overflow-hidden aspect-video flex items-center justify-center p-2">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt={currentProject.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 text-hud-muted font-mono text-xs">
                  <Cpu className="w-10 h-10 text-hud-green animate-pulse" />
                  <span>[ENGINEERING SPECIFICATION // SYSTEM ACTIVE]</span>
                </div>
              )}

              {/* Status Overlay Badge */}
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-hud-green/60 text-hud-green text-[10px] font-mono rounded-xs backdrop-blur-sm">
                SYS.OK // {currentProject.category || 'MECHATRONICS'}
              </div>

              {/* Fullscreen Modal Opener Icon */}
              <button
                type="button"
                onClick={() => setSelectedProject(currentProject)}
                className="absolute top-2 right-2 p-1.5 bg-black/80 border border-hud-border hover:border-hud-green text-hud-slate hover:text-hud-green rounded-xs backdrop-blur-sm transition-colors cursor-pointer"
                title="Expand Case Study & Architecture"
                aria-label="Expand Case Study"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Architecture Legend */}
            <div className="flex items-center justify-between text-[11px] font-mono text-hud-muted px-1">
              <span className="text-hud-slate">SWIPE OR USE ARROW KEYS TO BROWSE</span>
              <span className="text-hud-green font-semibold">
                {currentProject.status || 'COMPLETED'}
              </span>
            </div>
          </div>

          {/* Right Column: Project Information & Actions */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-hud-green font-bold uppercase tracking-wider">
                  PROJECT 0{activeIndex + 1} // {currentProject.category || 'ENGINEERING'}
                </span>
                <span className="text-hud-muted">
                  ID: {currentProject.slug || `PRJ-0${activeIndex + 1}`}
                </span>
              </div>

              <h3 className="font-tech text-2xl sm:text-3xl font-bold uppercase text-hud-bright tracking-wide">
                {currentProject.title}
              </h3>

              {/* 1-2 Sentence Value Proposition */}
              <p className="text-sm sm:text-base text-hud-slate font-sans leading-relaxed">
                {currentProject.short_description}
              </p>
            </div>

            {/* Core Tech Stack Chips */}
            <div className="space-y-2 pt-2 border-t border-hud-border">
              <div className="text-[10px] font-mono text-hud-muted uppercase tracking-wider">
                DEPLOYED HARDWARE &amp; SOFTWARE:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentProject.technologies &&
                  currentProject.technologies.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 bg-hud-panel border border-hud-border text-hud-bright text-xs font-mono rounded-xs"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-hud-border flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => setSelectedProject(currentProject)}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="shadow-md shadow-hud-green/20 font-bold"
              >
                VIEW FULL CASE STUDY
              </Button>

              {currentProject.github_url && (
                <a
                  href={currentProject.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-hud-panel hover:bg-hud-hover border border-hud-border hover:border-hud-green text-xs font-mono text-hud-text hover:text-hud-bright rounded-sm flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-hud-green" />
                  <span>REPOSITORY</span>
                </a>
              )}

              {currentProject.demo_url && (
                <a
                  href={currentProject.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-hud-panel hover:bg-hud-hover border border-hud-border hover:border-hud-green text-xs font-mono text-hud-text hover:text-hud-bright rounded-sm flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-hud-cyan" />
                  <span>LIVE DEMO</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Progressive Disclosure Engineering Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};
