import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '../../types/project';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { HorizontalCarousel } from '../ui/HorizontalCarousel';
import { Search, AlertCircle, RefreshCw, Terminal, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';

interface ProjectGridProps {
  projects: Project[];
  isLoading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

const CATEGORIES: (ProjectCategory | string)[] = [
  'All',
  'Embedded & IoT',
  'Software & AI',
  'Computer Vision & AI',
  'Industrial Automation',
  'Engineering Software'
];

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  isLoading = false,
  error = null,
  onRefresh
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Filter projects by category and search term
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.short_description.toLowerCase().includes(query) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-3 sm:p-4 bg-hud-card border border-hud-border rounded-sm">
        {/* Category Pill Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-sm transition-all duration-150 uppercase tracking-wider ${
                selectedCategory === cat
                  ? 'bg-hud-green text-black font-semibold shadow-hud'
                  : 'bg-hud-panel text-hud-muted hover:text-hud-text border border-hud-border hover:border-hud-border-bright'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-hud-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="FILTER BY PROTOCOL / TECH..."
            className="w-full pl-9 pr-3 py-1.5 bg-hud-panel border border-hud-border focus:border-hud-green rounded-sm text-xs font-mono text-hud-bright placeholder:text-hud-muted focus:outline-none focus:ring-1 focus:ring-hud-green"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-hud-muted hover:text-hud-bright"
            >
              [CLEAR]
            </button>
          )}
        </div>
      </div>

      {/* Telemetry Counter Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-hud-muted px-1">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-hud-green" />
          <span>
            MATCHED MODULES: <span className="text-hud-green font-bold">{filteredProjects.length}</span> / {projects.length}
          </span>
        </div>
        {selectedCategory !== 'All' && (
          <span className="text-hud-slate">
            CATEGORY: <span className="text-hud-bright uppercase">{selectedCategory}</span>
          </span>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="p-12 text-center bg-hud-card border border-hud-border rounded-sm space-y-3">
          <div className="w-8 h-8 border-2 border-hud-green border-t-transparent rounded-full animate-spin mx-auto" />
          <div className="font-mono text-xs text-hud-green uppercase tracking-widest">
            SYNCHRONIZING PROJECT TELEMETRY BUS...
          </div>
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && (
        <div className="p-6 bg-hud-red/5 border border-hud-red/30 rounded-sm text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-hud-red mx-auto" />
          <div className="font-mono text-xs text-hud-red uppercase">
            BUS EXCEPTION: {error}
          </div>
          {onRefresh && (
            <Button variant="secondary" size="sm" onClick={onRefresh} icon={<RefreshCw className="w-3.5 h-3.5" />}>
              RE-ESTABLISH TELEMETRY
            </Button>
          )}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredProjects.length === 0 && (
        <div className="p-12 text-center bg-hud-card border border-hud-border rounded-sm space-y-3 font-mono text-xs">
          <p className="text-hud-muted">
            [SYS.QUERY] No engineering modules match the specified parameters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-hud-green hover:underline uppercase"
          >
            [RESET FILTER CRITERIA]
          </button>
        </div>
      )}

      {/* Interactive Horizontal Carousel */}
      {!isLoading && !error && filteredProjects.length > 0 && (
        <div className="w-full">
          <HorizontalCarousel
            itemsPerView={{ mobile: 1, tablet: 2, desktop: 3 }}
            ariaLabel="Featured Engineering Projects Carousel"
            prevLabel="Previous projects"
            nextLabel="Next projects"
            autoSlide={false}
          >
            {filteredProjects.map((project) => (
              <div key={project.id} className="h-full pb-2">
                <ProjectCard
                  project={project}
                  onSelect={(proj) => setActiveProject(proj)}
                />
              </div>
            ))}
          </HorizontalCarousel>
        </div>
      )}

      {/* Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
};
