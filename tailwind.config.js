export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep blacks and blues
        'dark': '#0a0e27',
        'dark-secondary': '#0f1325',
        'dark-tertiary': '#12182f',
        'surface': '#090b16',
        'surface-light': '#0f1325',
        'surface-lighter': '#1a2847',
        
        // Electric and neon
        'accent': '#6f7cff',
        'accent-light': '#7b8eff',
        'neon': '#6cc5ff',
        'neon-light': '#7ccfff',
        'purple': '#8e56ff',
        'purple-light': '#9d6dff',
        'cyan': '#00d9ff',
        
        // Status colors
        'success': '#10b981',
        'warning': '#f59e0b',
        'danger': '#ef4444',
        'info': '#3b82f6',
      },
      
      backgroundColor: {
        'glass': 'rgba(15, 19, 37, 0.7)',
        'glass-light': 'rgba(26, 40, 71, 0.5)',
      },
      
      backdropBlur: {
        'glass': '12px',
      },
      
      boxShadow: {
        'glow': '0 20px 60px rgba(110, 125, 255, 0.18)',
        'glow-strong': '0 25px 80px rgba(110, 125, 255, 0.25)',
        'glow-subtle': '0 10px 30px rgba(110, 125, 255, 0.1)',
        'neon': '0 0 20px rgba(108, 197, 255, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 12px 48px rgba(110, 125, 255, 0.15)',
        'inner': 'inset 0 1px 2px rgba(255, 255, 255, 0.05)',
      },
      
      borderColor: {
        'glass': 'rgba(110, 125, 255, 0.1)',
        'glass-light': 'rgba(108, 197, 255, 0.15)',
      },
      
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      
      spacing: {
        'glass': '12px',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(110, 125, 255, 0.3)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 40px rgba(110, 125, 255, 0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      
      transitionProperty: {
        'all': 'all',
      },
      
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '500': '500ms',
      },
    },
  },
  plugins: [],
};
