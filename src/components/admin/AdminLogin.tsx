import React, { useState } from 'react';
import { authService, UserSession } from '../../services/authService';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Button } from '../ui/Button';
import { Lock, Shield, AlertCircle, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: (session: UserSession) => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConfigured = isSupabaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await authService.login(email, password);
      if (res.success && res.session) {
        onLoginSuccess(res.session);
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'System authorization error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 bg-hud-bg font-mono">
      <div className="w-full max-w-md bg-hud-card border border-hud-border-bright p-6 sm:p-8 rounded-sm shadow-2xl space-y-6 relative hud-corner">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-hud-border">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-hud-green" />
            <span className="font-tech text-base font-bold text-hud-bright uppercase tracking-wider">
              ADMIN CONTROL TERMINAL
            </span>
          </div>
          <button
            onClick={onCancel}
            className="text-xs text-hud-muted hover:text-hud-green flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>EXIT</span>
          </button>
        </div>

        {/* Configuration notice if Supabase is not connected */}
        {!isConfigured && (
          <div className="p-3 bg-hud-amber/10 border border-hud-amber/50 text-xs text-hud-amber rounded-sm space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>SUPABASE AUTH REQUIRED</span>
            </div>
            <p className="text-[11px] text-hud-slate pt-0.5 font-sans">
              Admin management requires a configured Supabase database. Please set <code className="text-hud-bright">VITE_SUPABASE_URL</code> and <code className="text-hud-bright">VITE_SUPABASE_PUBLISHABLE_KEY</code> in your environment.
            </p>
          </div>
        )}

        {/* Error notification */}
        {error && (
          <div className="p-3 bg-hud-red/10 border border-hud-red/40 text-xs text-hud-red rounded-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-hud-muted uppercase tracking-wider block">
              ADMINISTRATOR EMAIL
            </label>
            <input
              type="email"
              required
              disabled={!isConfigured || isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-hud-muted uppercase tracking-wider block">
              ACCESS PASSWORD
            </label>
            <input
              type="password"
              required
              disabled={!isConfigured || isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full p-2.5 bg-hud-panel border border-hud-border focus:border-hud-green text-hud-bright rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green disabled:opacity-50"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!isConfigured || isLoading}
              isLoading={isLoading}
              icon={<Lock className="w-3.5 h-3.5" />}
              className="w-full"
            >
              AUTHENTICATE SESSION
            </Button>
          </div>
        </form>

        <div className="pt-3 border-t border-hud-border text-center text-[10px] text-hud-muted">
          RESTRICTED ACCESS // AUTHORIZED PERSONNEL ONLY
        </div>
      </div>
    </div>
  );
};
