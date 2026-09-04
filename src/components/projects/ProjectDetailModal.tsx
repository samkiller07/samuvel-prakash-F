import React from 'react';
import { Project } from '../../types/project';
import { Modal } from '../ui/Modal';
import { StatusBadge } from '../ui/StatusBadge';
import { Button } from '../ui/Button';
import { MediaGallery } from './MediaGallery';
import { Github, ExternalLink, Cpu, GitBranch, Target, Wrench, CheckCircle2, Workflow, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project.title}
      systemTag={`SPEC.${project.category.replace(/[^A-Z]/g, '').substring(0, 4) || 'ENG'}`}
      maxWidth="4xl"
    >
      <div className="space-y-8 font-sans">
        {/* Module Header Bar */}
        <div className="p-4 bg-hud-panel border border-hud-border rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <StatusBadge status={project.status} />
              <span className="text-xs font-mono text-hud-muted">|</span>
              <span className="text-xs font-mono text-hud-green uppercase">{project.category}</span>
            </div>
            <div className="text-xs font-mono text-hud-slate">
              SLUG_ID: <span className="text-hud-text">{project.slug}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-hud-card border border-hud-border hover:border-hud-green text-xs font-mono text-hud-text hover:text-hud-bright transition-colors rounded-sm"
              >
                <Github className="w-3.5 h-3.5 text-hud-green" />
                <span>GITHUB REPO</span>
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-hud-card border border-hud-cyan/50 hover:border-hud-cyan text-xs font-mono text-hud-cyan transition-colors rounded-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE DEMO</span>
              </a>
            )}
          </div>
        </div>

        {/* Short Executive Overview */}
        <div className="text-sm sm:text-base text-hud-bright leading-relaxed border-l-2 border-hud-green pl-4">
          {project.short_description}
        </div>

        {/* Technologies Grid */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono text-hud-green uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>TECHNOLOGY STACK &amp; PROTOCOLS</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-hud-panel border border-hud-border text-xs font-mono text-hud-text rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Structured Engineering Spec Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Problem */}
          <div className="p-4 bg-hud-panel border border-hud-border rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-hud-amber uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>THE ENGINEERING PROBLEM</span>
            </div>
            <p className="text-xs sm:text-sm text-hud-slate leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Approach */}
          <div className="p-4 bg-hud-panel border border-hud-border rounded-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-hud-cyan uppercase tracking-wider">
              <GitBranch className="w-4 h-4" />
              <span>ENGINEERING APPROACH &amp; DESIGN</span>
            </div>
            <p className="text-xs sm:text-sm text-hud-slate leading-relaxed">
              {project.engineering_approach}
            </p>
          </div>
        </div>

        {/* What I Built */}
        <div className="p-4 bg-hud-panel border border-hud-border rounded-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-hud-green uppercase tracking-wider">
            <Wrench className="w-4 h-4" />
            <span>WHAT I BUILT &amp; HARDWARE/SOFTWARE INTEGRATION</span>
          </div>
          <p className="text-xs sm:text-sm text-hud-slate leading-relaxed">
            {project.what_i_built}
          </p>
        </div>

        {/* System Architecture Block */}
        <div className="p-4 bg-hud-card border border-hud-border-bright rounded-sm space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono text-hud-green uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>SYSTEM ARCHITECTURE DIAGRAM FLOW</span>
          </div>
          <div className="p-3 bg-hud-panel border border-hud-border font-mono text-xs text-hud-text rounded-sm overflow-x-auto whitespace-pre-wrap leading-relaxed">
            {project.system_architecture}
          </div>
        </div>

        {/* Workflow & Execution */}
        <div className="p-4 bg-hud-panel border border-hud-border rounded-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-hud-green uppercase tracking-wider">
            <Workflow className="w-4 h-4" />
            <span>OPERATION &amp; CONTROL WORKFLOW</span>
          </div>
          <p className="text-xs sm:text-sm text-hud-slate leading-relaxed">
            {project.workflow}
          </p>
        </div>

        {/* Results & Empirical Outcomes */}
        <div className="p-4 bg-hud-panel border border-hud-green/40 bg-hud-green/[0.03] rounded-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-hud-green uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-hud-green" />
            <span>MEASURED RESULTS &amp; OUTCOMES</span>
          </div>
          <p className="text-xs sm:text-sm text-hud-bright leading-relaxed font-medium">
            {project.results_outcome}
          </p>
        </div>

        {/* Media Gallery / Diagrams / Schematics */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono text-hud-green uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>TECHNICAL MEDIA &amp; SCHEMATIC ATTACHMENTS</span>
          </div>
          <MediaGallery media={project.media} projectTitle={project.title} />
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-hud-border flex items-center justify-between">
          <div className="text-[11px] font-mono text-hud-muted">
            STATUS: <span className="text-hud-green">VERIFIED ARCHITECTURE</span>
          </div>
          <Button variant="secondary" size="sm" onClick={onClose}>
            CLOSE SPECIFICATION
          </Button>
        </div>
      </div>
    </Modal>
  );
};
