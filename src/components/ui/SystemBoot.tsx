import React, { useState, useEffect } from 'react';

interface SystemBootProps {
  onComplete: () => void;
}

export const SystemBoot: React.FC<SystemBootProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check if user already booted recently in session
    if (sessionStorage.getItem('samuvel_sys_booted') === 'true') {
      onComplete();
      return;
    }

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('samuvel_sys_booted', 'true');
      onComplete();
      return;
    }

    const bootLogs = [
      'INITIALIZING SAMUVEL.OS // ENGINEERING WORKSTATION',
      'EMBEDDED RTOS & SENSORS ....... [ ONLINE ]',
      'PLC & INDUSTRIAL AUTOMATION ... [ ONLINE ]',
      'COMPUTER VISION & EDGE AI ..... [ ONLINE ]',
      'CAE & SOFTWARE AUTOMATION ..... [ ONLINE ]',
      'STATUS: OPERATOR AVAILABLE FOR FREELANCE & CONTRACTS',
      'SYSTEM READY // LAUNCHING COMMAND INTERFACE...'
    ];

    let current = 0;
    const interval = setInterval(() => {
      if (current < bootLogs.length) {
        setLogs((prev) => [...prev, bootLogs[current]]);
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            sessionStorage.setItem('samuvel_sys_booted', 'true');
            onComplete();
          }, 300);
        }, 250);
      }
    }, 140);

    const handleKey = () => {
      clearInterval(interval);
      sessionStorage.setItem('samuvel_sys_booted', 'true');
      onComplete();
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onComplete]);

  return (
    <div
      onClick={onComplete}
      className={`fixed inset-0 z-50 bg-[#040605] flex flex-col justify-center items-center p-4 sm:p-6 cursor-pointer transition-opacity duration-300 font-mono ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-lg bg-hud-card border border-hud-green/60 p-5 sm:p-6 rounded-sm shadow-2xl relative hud-corner">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-hud-border">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-hud-green rounded-full animate-ping" />
            <span className="text-xs text-hud-green tracking-widest uppercase font-bold">
              SAMUVEL.OS // BOOT SEQUENCE
            </span>
          </div>
          <span className="text-[10px] text-hud-muted hover:text-hud-green transition-colors">
            TAP ANYWHERE / [ESC] TO SKIP
          </span>
        </div>

        <div className="space-y-1.5 text-xs sm:text-sm text-hud-text min-h-[160px]">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-hud-green font-bold">&gt;</span>
              <span
                className={
                  index === logs.length - 1
                    ? 'text-hud-green font-semibold glow-green'
                    : 'text-hud-slate'
                }
              >
                {log}
              </span>
            </div>
          ))}
          {logs.length < 7 && (
            <div className="flex items-center gap-2 text-hud-green animate-pulse">
              <span>&gt;</span>
              <span className="inline-block w-2 h-4 bg-hud-green" />
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-hud-border flex justify-between items-center text-[10px] font-mono text-hud-muted">
          <span>HOST: SAMUVEL_PRAKASH_F</span>
          <span className="text-hud-green">INITIALIZING RUNTIME...</span>
        </div>
      </div>
    </div>
  );
};
