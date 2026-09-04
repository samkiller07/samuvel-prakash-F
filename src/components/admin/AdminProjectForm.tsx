import React, { useState, useRef } from 'react';
import { Project, ProjectCategory, ProjectStatus, ProjectFormData, ProjectMedia } from '../../types/project';
import { Button } from '../ui/Button';
import { storageService } from '../../services/storageService';
import {
  Save,
  Plus,
  Trash2,
  X,
  Image as ImageIcon,
  Layers,
  Wrench,
  Target,
  GitBranch,
  Workflow,
  CheckCircle2,
  Upload,
  Loader2,
  AlertCircle
} from 'lucide-react';

interface AdminProjectFormProps {
  project?: Project | null;
  onSave: (formData: ProjectFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const CATEGORIES: (ProjectCategory | string)[] = [
  'Embedded & IoT',
  'Software & AI',
  'Engineering Software',
  'Computer Vision & AI',
  'Industrial Automation',
  'Robotics & Control'
];

const STATUSES: ProjectStatus[] = ['ACTIVE', 'COMPLETED', 'PROTOTYPE', 'FIELD TESTED'];

export const AdminProjectForm: React.FC<AdminProjectFormProps> = ({
  project,
  onSave,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || '',
    slug: project?.slug || '',
    short_description: project?.short_description || '',
    category: project?.category || 'Embedded & IoT',
    status: project?.status || 'COMPLETED',
    technologies: project?.technologies || [],
    thumbnail_url: project?.thumbnail_url || null,
    github_url: project?.github_url || null,
    demo_url: project?.demo_url || null,
    problem: project?.problem || '',
    engineering_approach: project?.engineering_approach || '',
    what_i_built: project?.what_i_built || '',
    system_architecture: project?.system_architecture || '',
    workflow: project?.workflow || '',
    results_outcome: project?.results_outcome || '',
    featured: project?.featured ?? false,
    sort_order: project?.sort_order ?? 1,
    media: project?.media || []
  });

  const [techInput, setTechInput] = useState('');
  const [newMedia, setNewMedia] = useState<ProjectMedia>({
    type: 'image',
    url: '',
    caption: '',
    sort_order: 1
  });

  // Storage Upload States
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const thumbInputRef = useRef<HTMLInputElement>(null);
  const mediaFileInputRef = useRef<HTMLInputElement>(null);

  // Auto-generate slug from title if empty
  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev.slug ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }));
  };

  const addTechnology = () => {
    const trimmed = techInput.trim();
    if (trimmed && !formData.technologies.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, trimmed]
      }));
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech)
    }));
  };

  // Thumbnail File Upload Handler
  const handleThumbnailFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploadSuccess(null);
    setIsUploadingThumb(true);

    try {
      const result = await storageService.uploadProjectImage(file, 'thumbnails');
      if (result.success && result.url) {
        setFormData((prev) => ({ ...prev, thumbnail_url: result.url }));
        setUploadSuccess(`Thumbnail image "${file.name}" uploaded successfully!`);
      } else {
        setUploadError(result.error || 'Failed to upload image.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Error uploading file.');
    } finally {
      setIsUploadingThumb(false);
      if (thumbInputRef.current) thumbInputRef.current.value = '';
    }
  };

  // Gallery Media File Upload Handler
  const handleMediaFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploadSuccess(null);
    setIsUploadingMedia(true);

    try {
      const result = await storageService.uploadProjectImage(file, 'gallery');
      if (result.success && result.url) {
        setNewMedia((prev) => ({ ...prev, url: result.url as string }));
        setUploadSuccess(`Media asset "${file.name}" uploaded to storage.`);
      } else {
        setUploadError(result.error || 'Failed to upload media file.');
      }
    } catch (err: any) {
      setUploadError(err.message || 'Error uploading file.');
    } finally {
      setIsUploadingMedia(false);
      if (mediaFileInputRef.current) mediaFileInputRef.current.value = '';
    }
  };

  const addMediaItem = () => {
    if (newMedia.url.trim()) {
      setFormData((prev) => ({
        ...prev,
        media: [...(prev.media || []), { ...newMedia, sort_order: (prev.media?.length || 0) + 1 }]
      }));
      setNewMedia({ type: 'image', url: '', caption: '', sort_order: 1 });
      setUploadSuccess('Media item added to project attachments.');
    }
  };

  const removeMediaItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      media: (prev.media || []).filter((_, idx) => idx !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
      {/* Upload Feedback Alerts */}
      {uploadError && (
        <div className="p-3 bg-hud-red/10 border border-hud-red text-hud-red rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{uploadError}</span>
          </div>
          <button type="button" onClick={() => setUploadError(null)} className="p-1 hover:opacity-80">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {uploadSuccess && (
        <div className="p-3 bg-hud-green/10 border border-hud-green text-hud-green rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{uploadSuccess}</span>
          </div>
          <button type="button" onClick={() => setUploadSuccess(null)} className="p-1 hover:opacity-80">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Basic Details Grid */}
      <div className="p-4 bg-hud-panel border border-hud-border rounded-sm space-y-4">
        <div className="text-hud-green uppercase font-bold tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4" />
          <span>PROJECT IDENTIFICATION &amp; METADATA</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-hud-muted uppercase block">PROJECT TITLE *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. AI-Based Smart Air Quality Automation System"
              className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-hud-muted uppercase block">SLUG / IDENTIFIER *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. ai-smart-air-quality-automation"
              className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-hud-muted uppercase block">ENGINEERING CATEGORY *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
              className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-hud-muted uppercase block">STATUS *</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
              className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
            >
              {STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-hud-muted uppercase block">SORT PRIORITY</label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 1 })}
              className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Thumbnail Image: Direct Upload & URL */}
        <div className="space-y-2 p-3 bg-hud-card border border-hud-border rounded-sm">
          <label className="text-hud-green uppercase font-bold block flex items-center justify-between">
            <span>THUMBNAIL IMAGE (STORAGE UPLOAD / URL)</span>
            <span className="text-[10px] text-hud-slate font-normal">MAX 5MB • JPG, PNG, WEBP</span>
          </label>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Hidden file input */}
            <input
              type="file"
              ref={thumbInputRef}
              onChange={handleThumbnailFileSelect}
              accept="image/png,image/jpeg,image/webp,image/jpg"
              className="hidden"
            />

            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={isUploadingThumb}
              onClick={() => thumbInputRef.current?.click()}
              icon={isUploadingThumb ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-hud-green" />}
            >
              {isUploadingThumb ? 'UPLOADING TO STORAGE...' : 'CHOOSE IMAGE FILE'}
            </Button>

            <span className="text-hud-muted text-[10px]">OR ENTER DIRECT URL:</span>

            <input
              type="url"
              value={formData.thumbnail_url || ''}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value || null })}
              placeholder="https://..."
              className="flex-1 w-full p-1.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none text-xs"
            />

            {formData.thumbnail_url && (
              <button
                type="button"
                onClick={() => setFormData({ ...formData, thumbnail_url: null })}
                className="text-hud-muted hover:text-hud-red p-1 text-xs"
                title="Clear thumbnail"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Thumbnail Preview */}
          {formData.thumbnail_url && (
            <div className="mt-2 flex items-center gap-3 p-2 bg-hud-panel border border-hud-border/70 rounded-sm">
              <img
                src={formData.thumbnail_url}
                alt="Thumbnail preview"
                className="w-16 h-12 object-cover rounded-sm border border-hud-border"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '';
                }}
              />
              <div className="truncate text-xs text-hud-slate">
                <span className="text-hud-green font-bold">[ACTIVE THUMBNAIL]: </span>
                <span className="text-hud-text truncate">{formData.thumbnail_url}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-hud-muted uppercase block">GITHUB REPOSITORY URL (OPTIONAL)</label>
            <input
              type="url"
              value={formData.github_url || ''}
              onChange={(e) => setFormData({ ...formData, github_url: e.target.value || null })}
              placeholder="https://github.com/samkiller07/..."
              className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-hud-muted uppercase block">LIVE DEMO / SPEC URL (OPTIONAL)</label>
            <input
              type="url"
              value={formData.demo_url || ''}
              onChange={(e) => setFormData({ ...formData, demo_url: e.target.value || null })}
              placeholder="https://..."
              className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="featured_check"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 accent-hud-green rounded-sm"
          />
          <label htmlFor="featured_check" className="text-hud-bright cursor-pointer select-none">
            MARK AS FEATURED MODULE (Pin to prominent telemetry display)
          </label>
        </div>
      </div>

      {/* Technologies Manager */}
      <div className="p-4 bg-hud-panel border border-hud-border rounded-sm space-y-3">
        <label className="text-hud-green uppercase font-bold tracking-wider block">
          TECHNOLOGY CHIPS / PROTOCOLS
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTechnology();
              }
            }}
            placeholder="e.g. ESP32, OpenCV, YOLO, PID Control..."
            className="flex-1 p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
          />
          <Button type="button" variant="secondary" size="sm" onClick={addTechnology} icon={<Plus className="w-3.5 h-3.5" />}>
            ADD CHIP
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {formData.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-hud-card border border-hud-green/40 text-hud-green rounded-sm flex items-center gap-1.5"
            >
              <span>{tech}</span>
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                className="hover:text-hud-red transition-colors"
                title="Remove chip"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Engineering Specification Blocks */}
      <div className="p-4 bg-hud-panel border border-hud-border rounded-sm space-y-4">
        <div className="text-hud-green uppercase font-bold tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4" />
          <span>DETAILED ENGINEERING SPECIFICATIONS</span>
        </div>

        <div className="space-y-1">
          <label className="text-hud-muted uppercase block">SHORT DESCRIPTION *</label>
          <textarea
            required
            rows={2}
            value={formData.short_description}
            onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
            placeholder="High-level engineering summary for project cards..."
            className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none resize-y"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-hud-muted uppercase block flex items-center gap-1">
              <GitBranch className="w-3.5 h-3.5 text-hud-amber" />
              <span>PROBLEM STATEMENT *</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.problem}
              onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
              placeholder="Describe the mechanical, electrical, or software constraint..."
              className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none resize-y"
            />
          </div>

          <div className="space-y-1">
            <label className="text-hud-muted uppercase block flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-hud-cyan" />
              <span>ENGINEERING APPROACH *</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.engineering_approach}
              onChange={(e) => setFormData({ ...formData, engineering_approach: e.target.value })}
              placeholder="Formulation, mathematical models, sensor selection..."
              className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none resize-y"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-hud-muted uppercase block flex items-center gap-1">
            <Wrench className="w-3.5 h-3.5 text-hud-green" />
            <span>WHAT I BUILT &amp; HARDWARE INTEGRATION *</span>
          </label>
          <textarea
            required
            rows={3}
            value={formData.what_i_built}
            onChange={(e) => setFormData({ ...formData, what_i_built: e.target.value })}
            placeholder="Describe hardware fabrication, firmware implementation, wiring..."
            className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none resize-y"
          />
        </div>

        <div className="space-y-1">
          <label className="text-hud-muted uppercase block flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-hud-green" />
            <span>SYSTEM ARCHITECTURE (FLOW/BLOCKS) *</span>
          </label>
          <input
            type="text"
            required
            value={formData.system_architecture}
            onChange={(e) => setFormData({ ...formData, system_architecture: e.target.value })}
            placeholder="Sensors -> MCU -> Filter -> PID Output -> Actuator Stage"
            className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-hud-muted uppercase block flex items-center gap-1">
              <Workflow className="w-3.5 h-3.5 text-hud-green" />
              <span>WORKFLOW / EXECUTION *</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.workflow}
              onChange={(e) => setFormData({ ...formData, workflow: e.target.value })}
              placeholder="Sequential steps and control loop cycle timing..."
              className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none resize-y"
            />
          </div>

          <div className="space-y-1">
            <label className="text-hud-muted uppercase block flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-hud-green" />
              <span>MEASURED RESULTS / OUTCOME *</span>
            </label>
            <textarea
              required
              rows={3}
              value={formData.results_outcome}
              onChange={(e) => setFormData({ ...formData, results_outcome: e.target.value })}
              placeholder="Empirical metrics, verified hackathon awards, system outcomes..."
              className="w-full p-2 bg-hud-card border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none resize-y"
            />
          </div>
        </div>
      </div>

      {/* Media Attachments Manager */}
      <div className="p-4 bg-hud-panel border border-hud-border rounded-sm space-y-4">
        <div className="text-hud-green uppercase font-bold tracking-wider flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          <span>MEDIA &amp; SCHEMATIC ATTACHMENTS</span>
        </div>

        {/* Existing media items */}
        {formData.media && formData.media.length > 0 && (
          <div className="space-y-2">
            {formData.media.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-hud-card border border-hud-border rounded-sm flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 truncate">
                  {item.url && (
                    <img
                      src={item.url}
                      alt={item.caption || 'Media asset'}
                      className="w-10 h-8 object-cover rounded-xs border border-hud-border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <span className="px-1.5 py-0.5 bg-hud-panel border border-hud-border text-[10px] uppercase text-hud-green">
                    {item.type}
                  </span>
                  <span className="text-hud-slate truncate text-xs">{item.url}</span>
                  {item.caption && (
                    <span className="text-hud-muted text-[11px] truncate italic">
                      "{item.caption}"
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeMediaItem(idx)}
                  className="text-hud-muted hover:text-hud-red p-1"
                  title="Remove attachment"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add new media form */}
        <div className="p-3 bg-hud-card border border-hud-border rounded-sm space-y-3">
          <div className="text-[11px] text-hud-bright uppercase font-bold">
            ATTACH NEW SCHEMATIC / PHOTO / DIAGRAM
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <select
              value={newMedia.type}
              onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value as any })}
              className="p-2 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
            >
              <option value="image">Photo / Screenshot</option>
              <option value="schematic">Schematic / Wiring</option>
              <option value="diagram">Architecture Diagram</option>
              <option value="video">Video Demo Link</option>
            </select>

            <div className="sm:col-span-2 flex items-center gap-2">
              <input
                type="file"
                ref={mediaFileInputRef}
                onChange={handleMediaFileSelect}
                accept="image/png,image/jpeg,image/webp,image/jpg"
                className="hidden"
              />

              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={isUploadingMedia}
                onClick={() => mediaFileInputRef.current?.click()}
                icon={isUploadingMedia ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-hud-green" />}
              >
                {isUploadingMedia ? 'UPLOADING...' : 'UPLOAD FILE'}
              </Button>

              <input
                type="url"
                value={newMedia.url}
                onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                placeholder="Or paste media URL..."
                className="flex-1 p-2 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
              />
            </div>

            <input
              type="text"
              value={newMedia.caption || ''}
              onChange={(e) => setNewMedia({ ...newMedia, caption: e.target.value })}
              placeholder="Caption (e.g. Wiring breadboard)"
              className="p-2 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addMediaItem}
              disabled={!newMedia.url.trim()}
              icon={<Plus className="w-3.5 h-3.5" />}
            >
              ADD TO ATTACHMENTS
            </Button>
          </div>
        </div>
      </div>

      {/* Form Action Controls */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-hud-border">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isLoading}>
          CANCEL
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          icon={<Save className="w-3.5 h-3.5" />}
        >
          {project ? 'COMMIT REVISION' : 'SAVE TO REPOSITORY'}
        </Button>
      </div>
    </form>
  );
};
