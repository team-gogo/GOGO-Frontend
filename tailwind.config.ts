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
        suit: ['SUIT', 'sans-serif'],
      },
      fontSize: {
        title4s: ['2rem', { lineHeight: '3rem', fontWeight: '600' }],
        h1e: ['2.75rem', { lineHeight: '4.125rem', fontWeight: '800' }],
        h2e: ['2.5rem', { lineHeight: '3.75rem', fontWeight: '800' }],
        h3e: ['2.25rem', { lineHeight: '3.375rem', fontWeight: '800' }],
        h4e: ['2rem', { lineHeight: '3rem', fontWeight: '800' }],
        h4s: ['2rem', { lineHeight: '3rem', fontWeight: '600' }],
        body1e: ['1.5rem', { lineHeight: '2.25rem', fontWeight: '800' }],
        body1s: ['1.5rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        body2e: ['1.25rem', { lineHeight: '1.5rem', fontWeight: '800' }],
        body2s: ['1.25rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        body3e: ['1rem', { lineHeight: '1.5rem', fontWeight: '800' }],
        body3s: ['1rem', { lineHeight: '1.5rem', fontWeight: '600' }],
        caption1e: ['0.875rem', { lineHeight: '1.3125rem', fontWeight: '800' }],
        caption1s: ['0.875rem', { lineHeight: '1.3125rem', fontWeight: '600' }],
        caption2e: ['0.75rem', { lineHeight: '1.125rem', fontWeight: '800' }],
        caption2s: ['0.75rem', { lineHeight: '1.125rem', fontWeight: '600' }],
        caption3e: ['0.6875rem', { lineHeight: '1.375rem', fontWeight: '800' }],
        caption3s: ['0.6875rem', { lineHeight: '1.375rem', fontWeight: '600' }],
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
      mobile: { max: '639px' },
      tablet: { max: '1023px' },
      laptop: { max: '1279px' },
      desktop: { max: '1535px' },
      wide: { min: '1536px' },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
