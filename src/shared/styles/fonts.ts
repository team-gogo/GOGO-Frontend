import localFont from 'next/font/local';

export const suit = localFont({
  src: [
    {
      path: './fonts/SUIT-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/SUIT-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/SUIT-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/SUIT-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SUIT-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SUIT-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/SUIT-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/SUIT-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/SUIT-Heavy.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-suit',
  display: 'swap',
});
