import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-mono uppercase tracking-wider transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-hud-green/50 focus:ring-offset-2 focus:ring-offset-hud-bg disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.98]';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5'
  }[size];

  const variantClasses = {
    primary:
      'bg-hud-green text-black font-semibold hover:bg-[#33ff85] shadow-hud hover:shadow-hud-lg border border-hud-green',
    secondary:
      'bg-hud-card text-hud-bright hover:bg-hud-panel border border-hud-border hover:border-hud-green/50',
    outline:
      'bg-transparent text-hud-green hover:bg-hud-green/10 border border-hud-green/60 hover:border-hud-green',
    danger:
      'bg-hud-red/10 text-hud-red hover:bg-hud-red/20 border border-hud-red/40 hover:border-hud-red',
    ghost:
      'bg-transparent text-hud-muted hover:text-hud-bright hover:bg-hud-panel/50 border border-transparent'
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Subtle corner ticks for primary / outline variants */}
      {(variant === 'primary' || variant === 'outline' || variant === 'secondary') && (
        <>
          <span className="absolute top-0 left-0 w-1 h-1 bg-current opacity-70" />
          <span className="absolute bottom-0 right-0 w-1 h-1 bg-current opacity-70" />
        </>
      )}

      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        icon && iconPosition === 'left' && <span className="flex items-center">{icon}</span>
      )}

      <span>{children}</span>

      {!isLoading && icon && iconPosition === 'right' && (
        <span className="flex items-center transition-transform group-hover:translate-x-0.5">{icon}</span>
      )}
    </button>
  );
};
