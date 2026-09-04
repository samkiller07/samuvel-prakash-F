import React, { useState, useEffect } from 'react';
import { Project, ProjectFormData } from '../../types/project';
import { projectService } from '../../services/projectService';
import { authService, UserSession } from '../../services/authService';
import { profileService, ProfileData } from '../../services/profileService';
import { commentService, CommentItem } from '../../services/commentService';
import { AdminProjectForm } from './AdminProjectForm';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { StatusBadge } from '../ui/StatusBadge';
import { OperatorAvatar } from '../ui/OperatorAvatar';
import { isSupabaseConfigured } from '../../lib/supabase';
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  ArrowLeft,
  RefreshCw,
  Star,
  Layers,
  Database,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Upload,
  User,
  Sparkles,
  Save,
  MessageSquare,
  Reply,
  Radio,
  Clock,
  CornerDownRight,
  ShieldCheck
} from 'lucide-react';

interface AdminDashboardProps {
  session: UserSession;
  onLogout: () => void;
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ session, onLogout, onExit }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'comments'>('profile');
  
  // Projects state
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Profile state
  const [profile, setProfile] = useState<ProfileData>(profileService.getDefaultProfile());
  const [profileFormData, setProfileFormData] = useState<ProfileData>(profileService.getDefaultProfile());
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);

  // Comments state
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  // Notifications
  const [notification, setNotification] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const notifyError = (msg: string) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(null), 6000);
  };

  const loadAllData = async () => {
    setIsLoadingProjects(true);
    setIsLoadingComments(true);

    try {
      const [projRes, profData, comRes] = await Promise.all([
        projectService.getAllProjects(),
        profileService.getProfile(),
        commentService.getComments()
      ]);

      setProjects(projRes.data);
      setProfile(profData);
      setProfileFormData(profData);
      setComments(comRes.data);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setIsLoadingProjects(false);
      setIsLoadingComments(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      if (avatarPreviewUrl && avatarPreviewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    };
  }, [avatarPreviewUrl]);

  // Profile Handlers
  const handleAvatarFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Temporary local preview ONLY
    if (avatarPreviewUrl && avatarPreviewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreviewUrl);
    }
    const preview = URL.createObjectURL(file);
    setSelectedAvatarFile(file);
    setAvatarPreviewUrl(preview);
    notify('Photo selected. Click "SAVE & APPLY CHANGES" to upload to Supabase Storage.');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);

    try {
      if (selectedAvatarFile) {
        // Upload File object to Supabase Storage and persist to database
        const res = await profileService.uploadAndSaveAvatar(selectedAvatarFile, profileFormData);
        if (res.success && res.data) {
          setProfile(res.data);
          setProfileFormData(res.data);
          setSelectedAvatarFile(null);
          setAvatarPreviewUrl(null);
          notify('Operator photo uploaded to Supabase Storage and profile saved successfully!');
        } else {
          notifyError(`Photo upload error: ${res.error || 'Failed to upload photo.'}`);
        }
      } else {
        // Update database table directly
        const res = await profileService.updateProfile(profileFormData);
        if (res.success && res.data) {
          setProfile(res.data);
          notify('Operator profile configuration saved to database successfully!');
        } else {
          notifyError(`Database save error: ${res.error}`);
        }
      }
    } catch (err: any) {
      notifyError(`Profile update exception: ${err.message}`);
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Project Handlers
  const handleOpenCreateProject = () => {
    setEditingProject(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditProject = (project: Project) => {
    setEditingProject(project);
    setIsFormModalOpen(true);
  };

  const handleSaveProject = async (formData: ProjectFormData) => {
    setIsSavingProject(true);
    try {
      if (editingProject) {
        await projectService.updateProject(editingProject.id, formData);
        notify(`Project "${formData.title}" updated.`);
      } else {
        await projectService.createProject(formData);
        notify(`Project "${formData.title}" created.`);
      }
      setIsFormModalOpen(false);
      setEditingProject(null);
      const res = await projectService.getAllProjects();
      setProjects(res.data);
    } catch (err: any) {
      notifyError(`Project error: ${err.message}`);
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await projectService.deleteProject(id);
      notify('Project removed from repository.');
      setDeleteConfirmId(null);
      const res = await projectService.getAllProjects();
      setProjects(res.data);
    } catch (err: any) {
      notifyError(`Error deleting project: ${err.message}`);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset project repository to original 6 modules?')) {
      const defs = projectService.resetToDefaults();
      setProjects(defs);
      notify('Repository reset to 6 standard engineering modules.');
    }
  };

  // Comment Handlers
  const handleStartReply = (comment: CommentItem) => {
    setReplyingCommentId(comment.id);
    setReplyText('');
  };

  const handleSendReply = async (parentId: string) => {
    if (!replyText.trim()) return;
    setIsSubmittingReply(true);

    try {
      const res = await commentService.postAdminReply(parentId, replyText, profile.name || 'SAMUVEL PRAKASH F');
      if (res.success) {
        notify('Admin reply published to Supabase database!');
        setReplyingCommentId(null);
        setReplyText('');
        const updated = await commentService.getComments();
        setComments(updated.data);
      } else {
        notifyError(`Reply error: ${res.error}`);
      }
    } catch (err: any) {
      notifyError(`Reply exception: ${err.message}`);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (window.confirm('Permanently delete this comment and its replies from the database?')) {
      const res = await commentService.deleteComment(id);
      if (res.success) {
        notify('Comment deleted from database.');
        const updated = await commentService.getComments();
        setComments(updated.data);
      } else {
        notifyError(`Delete error: ${res.error}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-hud-bg py-8 px-3 sm:px-6 lg:px-8 font-mono text-xs">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-hud-card border border-hud-border-bright rounded-sm hud-corner">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-hud-panel border border-hud-border rounded-sm text-hud-green">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="font-tech text-base sm:text-lg font-bold text-hud-bright uppercase tracking-wide flex flex-wrap items-center gap-2">
                <span>ADMIN CONTROL DASHBOARD</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-hud-panel border border-hud-green/50 text-hud-green rounded-sm">
                  OPERATOR // {profile.operator_id}
                </span>
              </div>
              <div className="text-[11px] text-hud-slate truncate">
                AUTHENTICATED AS: <span className="text-hud-bright">{session.email}</span>
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

        {/* Notifications */}
        {notification && (
          <div className="p-3 bg-hud-green/10 border border-hud-green/50 text-hud-green rounded-sm flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-hud-red/10 border border-hud-red/50 text-hud-red rounded-sm flex items-center gap-2 animate-fadeIn">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-hud-border pb-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-sm font-tech font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-hud-green text-black shadow-lg shadow-hud-green/20'
                : 'bg-hud-card text-hud-slate hover:text-hud-bright hover:bg-hud-panel'
            }`}
          >
            <User className="w-4 h-4" />
            <span>OPERATOR PROFILE &amp; PHOTO</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-sm font-tech font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === 'projects'
                ? 'bg-hud-green text-black shadow-lg shadow-hud-green/20'
                : 'bg-hud-card text-hud-slate hover:text-hud-bright hover:bg-hud-panel'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>PROJECT REPOSITORY ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`px-4 py-2 rounded-sm font-tech font-bold uppercase transition-all flex items-center gap-2 ${
              activeTab === 'comments'
                ? 'bg-hud-green text-black shadow-lg shadow-hud-green/20'
                : 'bg-hud-card text-hud-slate hover:text-hud-bright hover:bg-hud-panel'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>COMMENTS &amp; REPLIES ({comments.length})</span>
          </button>
        </div>

        {/* TAB 1: OPERATOR PROFILE & PHOTO */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Avatar Upload & Live HUD Preview */}
            <div className="lg:col-span-5 bg-hud-card border border-hud-border p-6 rounded-sm space-y-6 text-center hud-corner">
              <div className="flex items-center justify-between pb-3 border-b border-hud-border text-left">
                <div className="font-tech text-base font-bold text-hud-bright uppercase flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-hud-green" />
                  <span>HUD OPERATOR FRAME</span>
                </div>
                <span className="text-[10px] text-hud-green">
                  {profile.image_url ? 'SUPABASE CLOUD URL' : 'NO PHOTO UPLOADED'}
                </span>
              </div>

              <div className="flex justify-center py-2">
                <OperatorAvatar
                  avatarUrl={avatarPreviewUrl || profile.image_url || profile.avatar_url}
                  name={profileFormData.name}
                  operatorId={profileFormData.operator_id}
                  statusText={profileFormData.status}
                  size="lg"
                />
              </div>

              {/* Upload Action */}
              <div className="space-y-3 pt-2">
                <label className="block w-full">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleAvatarFileSelect}
                    disabled={isSavingProfile}
                    className="block w-full text-xs text-hud-slate
                      file:mr-3 file:py-2 file:px-4
                      file:rounded-sm file:border-0
                      file:text-xs file:font-mono file:font-semibold
                      file:bg-hud-panel file:text-hud-green
                      hover:file:bg-hud-green hover:file:text-black
                      file:cursor-pointer cursor-pointer"
                  />
                </label>
                <div className="text-[10px] text-hud-muted">
                  Formats: JPG, PNG, WEBP (Max 5MB) &bull; Persisted to Supabase Storage
                </div>
              </div>
            </div>

            {/* Right: Operator Specification Form */}
            <div className="lg:col-span-7 bg-hud-card border border-hud-border p-6 rounded-sm space-y-5 hud-corner">
              <div className="flex items-center justify-between pb-3 border-b border-hud-border">
                <div className="font-tech text-base font-bold text-hud-bright uppercase">
                  OPERATOR METADATA SPECIFICATIONS
                </div>
                <span className="text-[10px] text-hud-slate">SUPABASE TABLE: profile_settings</span>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-hud-muted uppercase">OPERATOR NAME</label>
                    <input
                      type="text"
                      required
                      value={profileFormData.name}
                      onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })}
                      className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-hud-muted uppercase">OPERATOR CALLSIGN / ID</label>
                    <input
                      type="text"
                      required
                      value={profileFormData.operator_id}
                      onChange={(e) => setProfileFormData({ ...profileFormData, operator_id: e.target.value })}
                      className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase">HEADLINE TITLE</label>
                  <input
                    type="text"
                    required
                    value={profileFormData.title}
                    onChange={(e) => setProfileFormData({ ...profileFormData, title: e.target.value })}
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase">LIVE STATUS BADGE TEXT</label>
                  <input
                    type="text"
                    required
                    value={profileFormData.status}
                    onChange={(e) => setProfileFormData({ ...profileFormData, status: e.target.value })}
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-hud-muted uppercase">ENGINEERING BIO / POSITIONING</label>
                  <textarea
                    rows={4}
                    required
                    value={profileFormData.bio}
                    onChange={(e) => setProfileFormData({ ...profileFormData, bio: e.target.value })}
                    className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none resize-y"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSavingProfile}
                    icon={<Save className="w-4 h-4" />}
                  >
                    {isSavingProfile ? 'UPLOADING & SAVING TO SUPABASE...' : 'SAVE & APPLY CHANGES'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: PROJECTS REPOSITORY MANAGER */}
        {activeTab === 'projects' && (
          <div className="bg-hud-card border border-hud-border rounded-sm overflow-hidden space-y-4 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-hud-border">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-hud-green" />
                <span className="font-tech text-base font-bold text-hud-bright uppercase">
                  PROJECT REPOSITORY ({projects.length})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleResetDefaults}>
                  RESET DEFAULTS
                </Button>
                <Button variant="primary" size="sm" onClick={handleOpenCreateProject} icon={<Plus className="w-3.5 h-3.5" />}>
                  ADD NEW PROJECT
                </Button>
              </div>
            </div>

            {isLoadingProjects ? (
              <div className="p-12 text-center text-hud-muted">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-hud-green" />
                <span>FETCHING REPOSITORY ENTRIES...</span>
              </div>
            ) : projects.length === 0 ? (
              <div className="p-12 text-center text-hud-muted">No projects currently registered.</div>
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
                        <td className="p-3 pr-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProject(proj)}
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
        )}

        {/* TAB 3: COMMENTS & REPLIES MANAGER */}
        {activeTab === 'comments' && (
          <div className="bg-hud-card border border-hud-border rounded-sm p-6 space-y-6 hud-corner">
            <div className="flex items-center justify-between pb-3 border-b border-hud-border">
              <div className="font-tech text-base font-bold text-hud-bright uppercase flex items-center gap-2">
                <Radio className="w-4 h-4 text-hud-green animate-pulse" />
                <span>COMMUNITY COMMENTS &amp; REPLIES MANAGER</span>
              </div>
              <span className="text-[10px] text-hud-slate">SUPABASE TABLE: comments</span>
            </div>

            {isLoadingComments ? (
              <div className="p-12 text-center text-hud-muted">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-hud-green" />
                <span>FETCHING COMMENTS FROM SUPABASE...</span>
              </div>
            ) : comments.length === 0 ? (
              <div className="p-12 text-center text-hud-muted">
                No visitor comments recorded in database yet.
              </div>
            ) : (
              <div className="space-y-4">
                {comments.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-hud-panel border border-hud-border rounded-sm space-y-3 font-mono"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hud-border pb-2">
                      <div>
                        <span className="text-hud-bright font-bold">{item.name}</span>
                        <span className="text-hud-slate ml-2 text-[10px]">ID: {item.id.slice(0, 8)}</span>
                      </div>
                      <div className="text-[10px] text-hud-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(item.created_at).toLocaleString()}</span>
                      </div>
                    </div>

                    <p className="text-xs font-sans text-hud-text leading-relaxed whitespace-pre-wrap">
                      "{item.comment}"
                    </p>

                    {/* Existing Replies */}
                    {item.replies && item.replies.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {item.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="p-3 bg-hud-card border-l-2 border-hud-green rounded-r-sm text-xs space-y-1 ml-4"
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-[10px] text-hud-green font-bold uppercase flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>{reply.name} [OPERATOR REPLY]:</span>
                              </div>
                              <button
                                onClick={() => handleDeleteComment(reply.id)}
                                className="text-hud-muted hover:text-hud-red p-1"
                                title="Delete this reply"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="font-sans text-hud-bright whitespace-pre-wrap">{reply.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reply Form or Action Buttons */}
                    <div className="pt-2 flex flex-col gap-2">
                      {replyingCommentId === item.id ? (
                        <div className="space-y-2">
                          <div className="text-[10px] text-hud-green font-bold">
                            REPLYING AS OPERATOR ({profile.name || 'SAMUVEL PRAKASH F'}):
                          </div>
                          <textarea
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Type operator response (stored in Supabase with parent_id)..."
                            className="w-full p-2 bg-hud-bg border border-hud-green text-hud-bright rounded-sm text-xs focus:outline-none"
                          />
                          <div className="flex gap-2 justify-end">
                            <Button variant="ghost" size="sm" onClick={() => setReplyingCommentId(null)}>
                              CANCEL
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              disabled={isSubmittingReply}
                              onClick={() => handleSendReply(item.id)}
                              icon={<Reply className="w-3.5 h-3.5" />}
                            >
                              {isSubmittingReply ? 'POSTING TO SUPABASE...' : 'POST OPERATOR REPLY'}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleStartReply(item)}
                            icon={<Reply className="w-3.5 h-3.5" />}
                          >
                            REPLY
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteComment(item.id)}
                            icon={<Trash2 className="w-3.5 h-3.5" />}
                          >
                            DELETE
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Project Modal */}
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
          isLoading={isSavingProject}
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
              <span>WARNING: This will permanently delete this module from the repository.</span>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(null)}>
                CANCEL
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleDeleteProject(deleteConfirmId)}>
                CONFIRM DELETE
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
