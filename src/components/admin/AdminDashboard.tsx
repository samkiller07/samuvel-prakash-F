import React, { useState, useEffect } from 'react';
import { Project, ProjectFormData } from '../../types/project';
import { projectService } from '../../services/projectService';
import { authService, UserSession } from '../../services/authService';
import { AdminProjectForm } from './AdminProjectForm';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Plus, Edit2, Trash2, LogOut, ArrowLeft, RefreshCw, Star, Layers, Database, Shield, CheckCircle2, AlertTriangle } from 'lucide-react';

interface AdminDashboardProps {
  session: UserSession;
  onLogout: () => void;
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ session, onLogout, onExit }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const isConfigured = isSupabaseConfigured();

  const loadProjects = async () => {
    setIsLoading(true);
    try {
      const res = await projectService.getAllProjects();
      setProjects(res.data);
    } catch (err) {
      console.error('Failed to load projects in admin:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenCreate = () => {
    setEditingProject(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormModalOpen(true);
  };

  const handleSaveProject = async (formData: ProjectFormData) => {
    setIsSaving(true);
    try {
      if (editingProject) {
        await projectService.updateProject(editingProject.id, formData);
        notify(`Project "${formData.title}" updated successfully.`);
      } else {
        await projectService.createProject(formData);
        notify(`Project "${formData.title}" created successfully.`);
      }
      setIsFormModalOpen(false);
      setEditingProject(null);
      await loadProjects();
    } catch (err: any) {
      notify(`Error: ${err.message || 'Operation failed'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await projectService.deleteProject(id);
      notify('Project removed from telemetry repository.');
      setDeleteConfirmId(null);
      await loadProjects();
    } catch (err: any) {
      notify(`Error deleting project: ${err.message}`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset project repository to the verified default 6 engineering projects?')) {
      const defs = projectService.resetToDefaults();
      setProjects(defs);
      notify('Repository reset to standard 6 engineering modules.');
    }
  };

  return (
    <div className="min-h-screen bg-hud-bg py-8 px-4 sm:px-6 lg:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Top Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-hud-card border border-hud-border-bright rounded-sm hud-corner">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-hud-panel border border-hud-border rounded-sm text-hud-green">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-tech text-lg font-bold text-hud-bright uppercase tracking-wide flex items-center gap-2">
                <span>ADMIN CONTROL DASHBOARD</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-hud-panel border border-hud-green/50 text-hud-green rounded-sm">
                  AUTHORIZED ADMIN SESSION
                </span>
              </div>
              <div className="text-[11px] text-hud-slate">
                LOGGED IN AS: <span className="text-hud-bright">{session.email}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onExit} icon={<ArrowLeft className="w-3.5 h-3.5" />}>
              VIEW PORTFOLIO
            </Button>
            <Button variant="danger" size="sm" onClick={onLogout} icon={<LogOut className="w-3.5 h-3.5" />}>
              LOGOUT
            </Button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="p-3 bg-hud-green/10 border border-hud-green/50 text-hud-green rounded-sm flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-hud-card border border-hud-border rounded-sm">
            <div className="text-hud-muted uppercase text-[11px]">TOTAL PROJECTS</div>
            <div className="font-tech text-3xl font-bold text-hud-bright mt-1">{projects.length}</div>
            <div className="text-[10px] text-hud-green mt-1">TELEMETRY REPO ACTIVE</div>
          </div>

          <div className="p-4 bg-hud-card border border-hud-border rounded-sm">
            <div className="text-hud-muted uppercase text-[11px]">FEATURED MODULES</div>
            <div className="font-tech text-3xl font-bold text-hud-cyan mt-1">
              {projects.filter((p) => p.featured).length}
            </div>
            <div className="text-[10px] text-hud-slate mt-1">PINNED HIGHLIGHTS</div>
          </div>

          <div className="p-4 bg-hud-card border border-hud-border rounded-sm">
            <div className="text-hud-muted uppercase text-[11px]">DATABASE BACKEND</div>
            <div className="font-tech text-lg font-bold text-hud-green mt-2 uppercase">
              SUPABASE POSTGRESQL
            </div>
            <div className="text-[10px] text-hud-muted mt-0.5">ROW LEVEL SECURITY ENFORCED</div>
          </div>
        </div>

        {/* Project Table & Actions Header */}
        <div className="bg-hud-card border border-hud-border rounded-sm overflow-hidden">
          <div className="p-4 bg-hud-panel border-b border-hud-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-hud-green" />
              <span className="font-tech text-base font-bold text-hud-bright uppercase tracking-wide">
                PROJECT REPOSITORY MANAGER
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetDefaults}
                title="Reset to original 6 projects"
              >
                RESET DEFAULTS
              </Button>

              <Button
                variant="primary"
                size="sm"
                onClick={handleOpenCreate}
                icon={<Plus className="w-3.5 h-3.5" />}
              >
                ADD NEW PROJECT
              </Button>
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <div className="p-12 text-center text-hud-muted">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-hud-green" />
              <span>FETCHING REPOSITORY ENTRIES...</span>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-12 text-center text-hud-muted space-y-2">
              <p>No project records currently registered in database.</p>
              <Button variant="primary" size="sm" onClick={handleOpenCreate}>
                CREATE FIRST PROJECT
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-hud-border text-hud-muted text-[11px] uppercase bg-hud-panel/50">
                    <th className="p-3 pl-4">ORDER</th>
                    <th className="p-3">TITLE / SLUG</th>
                    <th className="p-3">CATEGORY</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3">FEATURED</th>
                    <th className="p-3">MEDIA</th>
                    <th className="p-3 pr-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hud-border text-xs">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-hud-panel/40 transition-colors">
                      <td className="p-3 pl-4 text-hud-slate font-bold">#{proj.sort_order}</td>
                      <td className="p-3">
                        <div className="font-bold text-hud-bright">{proj.title}</div>
                        <div className="text-[10px] text-hud-slate">{proj.slug}</div>
                      </td>
                      <td className="p-3 text-hud-text">{proj.category}</td>
                      <td className="p-3">
                        <StatusBadge status={proj.status} size="sm" />
                      </td>
                      <td className="p-3">
                        {proj.featured ? (
                          <span className="text-hud-green flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            <span>YES</span>
                          </span>
                        ) : (
                          <span className="text-hud-slate">NO</span>
                        )}
                      </td>
                      <td className="p-3 text-hud-slate">
                        {(proj.media?.length || 0)} ATTACHMENTS
                      </td>
                      <td className="p-3 pr-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(proj)}
                            className="p-1.5 hover:bg-hud-panel text-hud-muted hover:text-hud-green border border-hud-border rounded-sm transition-colors"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(proj.id)}
                            className="p-1.5 hover:bg-hud-red/20 text-hud-muted hover:text-hud-red border border-hud-border rounded-sm transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Project Create / Edit Modal */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingProject ? `EDIT MODULE // ${editingProject.title}` : 'REGISTER NEW ENGINEERING MODULE'}
        systemTag="ADMIN.CRUD"
        maxWidth="4xl"
      >
        <AdminProjectForm
          project={editingProject}
          onSave={handleSaveProject}
          onCancel={() => setIsFormModalOpen(false)}
          isLoading={isSaving}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <Modal
          isOpen={!!deleteConfirmId}
          onClose={() => setDeleteConfirmId(null)}
          title="CONFIRM MODULE DELETION"
          systemTag="ADMIN.SECURITY"
          maxWidth="md"
        >
          <div className="space-y-4 font-mono text-xs">
            <div className="flex items-center gap-3 text-hud-red">
              <AlertTriangle className="w-6 h-6 flex-shrink-0" />
              <span>WARNING: This will permanently delete this engineering module from the telemetry database.</span>
            </div>
            <p className="text-hud-slate">
              Are you sure you want to proceed with this operation?
            </p>
            <div className="pt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
                CANCEL
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteProject(deleteConfirmId)}
              >
                CONFIRM DELETE
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
