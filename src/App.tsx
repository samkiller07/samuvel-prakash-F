import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { CommentsSection } from './sections/CommentsSection';
import { ContactSection } from './sections/ContactSection';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SystemBoot } from './components/ui/SystemBoot';
import { authService, UserSession } from './services/authService';
import { Loader2 } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const [bootSequenceActive, setBootSequenceActive] = useState(true);
  const [session, setSession] = useState<UserSession | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check initial route (hash or pathname)
  useEffect(() => {
    const handleRouteChange = () => {
      const isExplicitAdmin =
        window.location.hash === '#admin' ||
        window.location.pathname.endsWith('/admin');

      if (isExplicitAdmin) {
        setCurrentView('admin');
      } else if (currentView === 'admin' && !window.location.hash) {
        setCurrentView('home');
      }
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [currentView]);

  // Check existing Supabase session and admin authorization on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      try {
        const activeSession = await authService.getSession();
        if (activeSession && activeSession.isAdmin) {
          setSession(activeSession);
        } else {
          setSession(null);
        }
      } catch (err) {
        setSession(null);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const handleNavigate = (view: 'home' | 'admin', sectionId?: string) => {
    setCurrentView(view);
    if (view === 'admin') {
      window.location.hash = 'admin';
    } else {
      if (window.location.hash === '#admin') {
        history.pushState('', document.title, window.location.pathname + window.location.search);
      }
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    }
  };

  const handleLoginSuccess = (newSession: UserSession) => {
    setSession(newSession);
  };

  const handleLogout = async () => {
    await authService.logout();
    setSession(null);
    handleNavigate('home');
  };

  return (
    <div className="min-h-screen bg-hud-bg text-hud-text selection:bg-hud-green selection:text-black">
      {/* Optional System Boot Diagnostics Sequence */}
      {bootSequenceActive && (
        <SystemBoot onComplete={() => setBootSequenceActive(false)} />
      )}

      {/* Main App Navigation Bar (Public UI has zero admin buttons) */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} activeSection="hero" />

      {/* Main View Router */}
      {currentView === 'admin' ? (
        <main className="pt-20">
          {isCheckingAuth ? (
            <div className="min-h-[70vh] flex flex-col items-center justify-center font-mono text-xs text-hud-muted space-y-3">
              <Loader2 className="w-8 h-8 text-hud-green animate-spin" />
              <span>AUTHENTICATING ADMINISTRATIVE SECURITY CONTEXT...</span>
            </div>
          ) : session && session.isAdmin ? (
            <AdminDashboard
              session={session}
              onLogout={handleLogout}
              onExit={() => handleNavigate('home')}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={handleLoginSuccess}
              onCancel={() => handleNavigate('home')}
            />
          )}
        </main>
      ) : (
        <main>
          <HeroSection
            onExploreProjects={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <AchievementsSection />
          <CertificationsSection />
          <CommentsSection />
          <ContactSection />
        </main>
      )}

      {/* Footer (Rendered on public portfolio view) */}
      {currentView === 'home' && <Footer />}
    </div>
  );
};

export default App;
