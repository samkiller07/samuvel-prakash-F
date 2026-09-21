import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './sections/HeroSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { SkillsSection } from './sections/SkillsSection';
import { AchievementsSection } from './sections/AchievementsSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { AboutSection } from './sections/AboutSection';
import { CommentsSection } from './sections/CommentsSection';
import { ContactSection } from './sections/ContactSection';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SystemBoot } from './components/ui/SystemBoot';
import { CommandTerminal } from './components/ui/CommandTerminal';
import { authService, UserSession } from './services/authService';
import { Loader2 } from 'lucide-react';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const [bootSequenceActive, setBootSequenceActive] = useState(true);
  const [session, setSession] = useState<UserSession | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

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

  const handleScrollToSection = (sectionId: string) => {
    if (currentView === 'admin') {
      handleNavigate('home', sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
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

  const handleStartProject = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceId(serviceId);
    }
    const el = document.getElementById('contact-form') || document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
          {/* 00 HERO SECTION */}
          <HeroSection
            onExploreProjects={() => handleScrollToSection('projects')}
            onStartProject={() => handleStartProject()}
          />

          {/* HUD COMMAND TERMINAL & QUICK MODULE SELECTOR */}
          <CommandTerminal
            onNavigate={handleScrollToSection}
            onStartProject={() => handleStartProject()}
          />

          {/* 01 WHAT DO YOU NEED TO BUILD? — FREELANCE SERVICES */}
          <ServicesSection
            onStartProject={handleStartProject}
            onViewProject={(slug) => handleScrollToSection('projects')}
          />

          {/* 02 WHAT I BUILT — INTERACTIVE PROJECT WORKSTATION */}
          <ProjectsSection />

          {/* 03 WHAT I CAN WORK WITH — CAPABILITY MAP */}
          <SkillsSection
            onNavigateToProjects={() => handleScrollToSection('projects')}
            onNavigateToServices={handleStartProject}
          />

          {/* 04 WHAT I DEMONSTRATED — HONORS & COMPETITIONS */}
          <AchievementsSection />

          {/* 05 WHAT I LEARNED — CERTIFICATIONS */}
          <CertificationsSection />

          {/* 06 SYSTEM SPECIFICATION — CORE OPERATOR PROFILE */}
          <AboutSection onStartProject={() => handleStartProject()} />

          {/* 07 PEER REVIEWS & FEEDBACK */}
          <CommentsSection />

          {/* 08 START A PROJECT — DIRECT CLIENT INQUIRY FORM */}
          <ContactSection selectedService={selectedServiceId} />
        </main>
      )}

      {/* Footer (Rendered on public portfolio view) */}
      {currentView === 'home' && <Footer />}
    </div>
  );
};

export default App;
