import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0D9488',
          dark:    '#0F766E',
          light:   '#F0FDFA',
          mid:     '#CCFBF1',
        },
        ink: {
          DEFAULT: '#0F172A',
          700:     '#1E293B',
          600:     '#334155',
          500:     '#475569',
          400:     '#64748B',
          300:     '#94A3B8',
          200:     '#CBD5E1',
          100:     '#E2E8F0',
          50:      '#F1F5F9',
        },
      },
      fontFamily: {
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04)',
        'card-md': '0 4px 12px rgba(15,23,42,0.08), 0 1px 3px rgba(15,23,42,0.05)',
      },
    },
  },
  plugins: [],
} satisfies Config
