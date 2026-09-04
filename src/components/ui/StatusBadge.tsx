import React from 'react';
import { ProjectStatus } from '../../types/project';

interface StatusBadgeProps {
  status: ProjectStatus | 'ONLINE' | 'STANDBY' | 'DEGRADED' | 'OPERATIONAL';
  size?: 'sm' | 'md';
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showDot = true
}) => {
  const getColors = () => {
    switch (status) {
      case 'ACTIVE':
      case 'ONLINE':
      case 'OPERATIONAL':
        return {
          bg: 'bg-hud-green/10',
          text: 'text-hud-green',
          border: 'border-hud-green/40',
          dot: 'bg-hud-green',
          pulse: true
        };
      case 'FIELD TESTED':
      case 'COMPLETED':
        return {
          bg: 'bg-hud-cyan/10',
          text: 'text-hud-cyan',
          border: 'border-hud-cyan/40',
          dot: 'bg-hud-cyan',
          pulse: false
        };
      case 'PROTOTYPE':
      case 'STANDBY':
        return {
          bg: 'bg-hud-amber/10',
          text: 'text-hud-amber',
          border: 'border-hud-amber/40',
          dot: 'bg-hud-amber',
          pulse: true
        };
      case 'DEGRADED':
        return {
          bg: 'bg-hud-red/10',
          text: 'text-hud-red',
          border: 'border-hud-red/40',
          dot: 'bg-hud-red',
          pulse: true
        };
      default:
        return {
          bg: 'bg-hud-border/40',
          text: 'text-hud-muted',
          border: 'border-hud-border',
          dot: 'bg-hud-muted',
          pulse: false
        };
    }
  };

  const style = getColors();
  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase tracking-wider border rounded-sm ${style.bg} ${style.text} ${style.border} ${sizeClasses}`}
    >
      {showDot && (
        <span className="relative flex h-1.5 w-1.5">
          {style.pulse && (
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.dot}`}
            />
          )}
          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${style.dot}`} />
        </span>
      )}
      <span>{status}</span>
    </span>
  );
};
