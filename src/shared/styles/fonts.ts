import localFont from 'next/font/local';

export const gmarketSans = localFont({
  src: [
    {
      path: './fonts/GmarketSansTTFLight.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/GmarketSansTTFMedium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/GmarketSansTTFBold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gmarket',
  display: 'swap',
});
