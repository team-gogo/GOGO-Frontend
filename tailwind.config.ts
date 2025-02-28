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
        h1e: ['44px', { lineHeight: '66px', fontWeight: '800' }],
        h2e: ['40px', { lineHeight: '60px', fontWeight: '800' }],
        h3e: ['36px', { lineHeight: '54px', fontWeight: '800' }],
        h4e: ['32px', { lineHeight: '48px', fontWeight: '800' }],
        h4s: ['32px', { lineHeight: '48px', fontWeight: '600' }],
        body1e: ['24px', { lineHeight: '36px', fontWeight: '800' }],
        body1s: ['24px', { lineHeight: '36px', fontWeight: '600' }],
        body2e: ['20px', { lineHeight: '24px', fontWeight: '800' }],
        body2s: ['20px', { lineHeight: '24px', fontWeight: '600' }],
        body3e: ['16px', { lineHeight: '24px', fontWeight: '800' }],
        body3s: ['16px', { lineHeight: '24px', fontWeight: '600' }],
        caption1e: ['14px', { lineHeight: '21px', fontWeight: '800' }],
        caption1s: ['14px', { lineHeight: '21px', fontWeight: '600' }],
        caption2e: ['12px', { lineHeight: '18px', fontWeight: '800' }],
        caption2s: ['12px', { lineHeight: '18px', fontWeight: '600' }],
        caption3e: ['11px', { lineHeight: '22px', fontWeight: '800' }],
        caption3s: ['11px', { lineHeight: '22px', fontWeight: '600' }],
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
