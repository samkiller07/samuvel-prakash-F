/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hud: {
          bg: '#060807',
          card: '#0a0e0c',
          panel: '#0e1411',
          hover: '#131b17',
          border: '#1b2a21',
          'border-bright': '#2e4c3b',
          green: '#00ff66',
          'green-dim': '#00b347',
          'green-glow': '#00ff6633',
          emerald: '#10b981',
          cyan: '#00e5ff',
          amber: '#ffb700',
          red: '#ff3b30',
          muted: '#6b8277',
          text: '#d8e5de',
          bright: '#f0fdf4'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        tech: ['"Rajdhani"', '"Orbitron"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, rgba(0, 255, 102, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 102, 0.04) 1px, transparent 1px)',
        'dots-pattern': 'radial-gradient(rgba(0, 255, 102, 0.12) 1px, transparent 1px)',
        'scanline': 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.3))',
      },
      boxShadow: {
        'hud': '0 0 15px rgba(0, 255, 102, 0.15)',
        'hud-lg': '0 0 25px rgba(0, 255, 102, 0.25)',
        'hud-inset': 'inset 0 0 15px rgba(0, 255, 102, 0.08)',
        'hud-amber': '0 0 15px rgba(255, 183, 0, 0.2)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'telemetry-sweep': 'sweep 8s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        sweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}
