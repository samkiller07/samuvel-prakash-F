import React, { useState } from 'react';
import { Bot, Shield, Terminal, User, Sparkles } from 'lucide-react';

interface OperatorAvatarProps {
  avatarUrl?: string;
  name?: string;
  operatorId?: string;
  statusText?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const OperatorAvatar: React.FC<OperatorAvatarProps> = ({
  avatarUrl,
  name = 'SAMUVEL PRAKASH F',
  operatorId = 'OP-SAM-01',
  statusText = 'ONLINE // READY',
  size = 'lg',
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28',
    md: 'w-40 h-40 sm:w-48 sm:h-48',
    lg: 'w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72'
  };

  const hasValidImage = avatarUrl && !imageError;

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Outer Rotating Telemetry Radar Rings */}
      <div className="absolute -inset-3 sm:-inset-4 rounded-full border border-hud-green/20 border-dashed animate-spin-slow pointer-events-none" />
      <div className="absolute -inset-6 sm:-inset-8 rounded-full border border-hud-cyan/15 pointer-events-none opacity-60" />

      {/* Main HUD Frame Card */}
      <div className="relative p-1 sm:p-1.5 bg-hud-card border border-hud-border-bright rounded-sm shadow-2xl shadow-hud-green/10 hud-corner backdrop-blur-md">
        
        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between px-2 py-1 bg-hud-panel border-b border-hud-border text-[9px] sm:text-[10px] font-mono text-hud-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-hud-green rounded-full animate-ping" />
            <span className="text-hud-green font-bold tracking-widest">{operatorId}</span>
          </div>
          <span className="text-hud-slate tracking-wider hidden sm:inline">MECHATRONICS</span>
        </div>

        {/* Image Container with Cyberpunk Scanlines and Corners */}
        <div className={`relative ${sizeClasses[size]} overflow-hidden bg-hud-bg/80 flex items-center justify-center border border-hud-border`}>
          
          {hasValidImage ? (
            <img
              src={avatarUrl}
              alt={name}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105 filter contrast-105"
            />
          ) : (
            /* Cybernetic Robot / Operator Avatar Placeholder */
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-hud-card to-hud-bg p-4 text-center space-y-2">
              <div className="relative p-3 rounded-full bg-hud-panel border border-hud-green/40 shadow-inner">
                <Bot className="w-10 h-10 sm:w-14 sm:h-14 text-hud-green animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-hud-cyan rounded-full animate-ping" />
              </div>
              <div className="space-y-0.5">
                <div className="font-tech text-xs sm:text-sm font-bold text-hud-bright tracking-wider">
                  OPERATOR PORTRAIT
                </div>
                <div className="text-[10px] font-mono text-hud-muted">
                  [UPLOAD IN ADMIN TERMINAL]
                </div>
              </div>
            </div>
          )}

          {/* Scanline Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-hud-green/[0.03] to-transparent pointer-events-none opacity-80" />

          {/* Inner Corner Crosshairs */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-hud-green pointer-events-none" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-hud-green pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-hud-green pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-hud-green pointer-events-none" />
        </div>

        {/* Bottom Status HUD Bar */}
        <div className="flex items-center justify-between px-2 py-1 bg-hud-panel border-t border-hud-border text-[9px] sm:text-[10px] font-mono">
          <span className="text-hud-slate truncate max-w-[120px] sm:max-w-[150px]">{name}</span>
          <span className="text-hud-green font-semibold">{statusText}</span>
        </div>
      </div>
    </div>
  );
};
