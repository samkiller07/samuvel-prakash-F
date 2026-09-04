import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  systemTag?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  systemTag = 'SYS.VIEW',
  children,
  maxWidth = '2xl'
}) => {
  // ESC key handler & body overflow lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl'
  }[maxWidth];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`relative w-full ${maxWidthClass} bg-hud-card border border-hud-border-bright shadow-2xl rounded-sm text-hud-text z-10 my-auto overflow-hidden hud-corner`}
      >
        {/* Top telemetry bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-hud-panel border-b border-hud-border">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-hud-green rounded-full animate-pulse" />
            <span className="font-mono text-xs text-hud-green tracking-widest uppercase">
              [{systemTag}]
            </span>
            <span className="text-hud-muted text-xs font-mono">|</span>
            <h2 id="modal-title" className="font-tech text-base sm:text-lg font-semibold text-hud-bright uppercase tracking-wide truncate">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-hud-muted hover:text-hud-green hover:bg-hud-bg transition-colors rounded-sm focus:outline-none focus:ring-1 focus:ring-hud-green"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal content body */}
        <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-6 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
