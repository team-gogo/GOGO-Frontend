import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/entities/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/widgets/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: {
          '100': '#DCE2FF',
          '200': '#BAC5FF',
          '300': '#97A9FF',
          '400': '#748CFE',
          '500': '#526FFE',
          '600': '#2F52FE',
        },
        gray: {
          '100': '#E3E3E3',
          '200': '#C7C7C7',
          '300': '#ABABAB',
          '400': '#8F8F8F',
          '500': '#727272',
          '600': '#565656',
          '700': '#3A3A3A',
        },
        system: {
          success: '#01C612',
          error: '#E30000',
        },
        black: '#1E1E1E',
        white: '#FFFFFF',
      },
      fontFamily: {
        Gmarket: ['Gmarket Sans', 'sans-serif'],
      },
      fontSize: {
        h1b: ['2.75rem', { lineHeight: '3.025rem', fontWeight: '500' }],
        h2m: ['2.5rem', { lineHeight: '3rem', fontWeight: '400' }],
        h3m: ['2.25rem', { lineHeight: '2.7rem', fontWeight: '400' }],
        h4b: ['2rem', { lineHeight: '2.4rem', fontWeight: '500' }],
        h4m: ['2rem', { lineHeight: '2.4rem', fontWeight: '400' }],
        body1b: ['1.5rem', { lineHeight: '1.8rem', fontWeight: '500' }],
        body1m: ['1.5rem', { lineHeight: '1.8rem', fontWeight: '400' }],
        body2b: ['1.25rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        body2m: ['1.25rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        body3b: ['1rem', { lineHeight: '1.4rem', fontWeight: '500' }],
        body3m: ['1rem', { lineHeight: '1.4rem', fontWeight: '400' }],
        caption1b: ['0.875rem', { lineHeight: '1.225rem', fontWeight: '500' }],
        caption1m: ['0.875rem', { lineHeight: '1.225rem', fontWeight: '400' }],
        caption2b: ['0.75rem', { lineHeight: '1.125rem', fontWeight: '500' }],
        caption2m: ['0.75rem', { lineHeight: '1.125rem', fontWeight: '400' }],
        caption3b: [
          '0.6875rem',
          { lineHeight: '1.0313rem', fontWeight: '500' },
        ],
        caption3m: [
          '0.6875rem',
          { lineHeight: '1.0313rem', fontWeight: '400' },
        ],
      },
      spacing: {
        '0': '0px',
        '1': '1px',
        '2': '2px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '16': '16px',
        '18': '18px',
        '20': '20px',
        '22': '22px',
        '24': '24px',
        '26': '26px',
        '28': '28px',
        '30': '30px',
      },
      borderRadius: {
        none: '0',
        sm: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '0.75rem', // 12px
        xl: '1rem', // 16px
        '2xl': '1.5rem', // 24px
        '3xl': '2rem', // 32px
        full: '9999px', // 완전한 원형
      },
      borderWidth: {
        '1': '1px',
      },
      opacity: {
        '0': '0',
        '20': '0.2',
        '40': '0.4',
        '60': '0.6',
        '80': '0.8',
        '100': '1',
      },
    },
    screens: {
      mobile: { max: '640px' },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
