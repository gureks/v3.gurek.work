/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'background-elevated': 'var(--background-elevated)',
        'background-elevated-alt': 'var(--background-elevated-alt)',
        'background-nav': 'var(--background-nav)',
        'background-input': 'var(--background-input)',
        'background-tooltip': 'var(--background-tooltip)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        foreground: 'var(--foreground)',
        'foreground-muted': 'var(--foreground-muted)',
        'foreground-secondary': 'var(--foreground-secondary)',
        border: 'var(--border)',
        'border-subtle': 'var(--border-subtle)',
        'border-input': 'var(--border-input)',
      },
      spacing: {
        '1': '4px',
        '1-5': '6px',
        '2': '8px',
        '2-5': '10px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '10': '40px',
      },
      maxWidth: {
        'content': 'var(--content-max-width)',
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
        'full': 'var(--radius-full)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'tooltip': 'var(--shadow-tooltip)',
        'glow-accent': 'var(--glow-accent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};
