import { readFileSync } from 'node:fs';
import { generateOGImage } from '@/app/banner.png/og';

const font = readFileSync('./src/app/og/[...slug]/fonts/Inter-Regular.ttf');
const fontSemiBold = readFileSync(
  './src/app/og/[...slug]/fonts/Inter-SemiBold.ttf',
);
const fontBold = readFileSync('./src/app/og/[...slug]/fonts/Inter-Bold.ttf');
const headingFont = readFileSync(
  './src/app/og/[...slug]/fonts/BricolageGrotesque-Regular.ttf',
);

export async function GET() {
  return generateOGImage({
    primaryTextColor: 'rgb(240,240,240)',
    title: 'Ready-made blog template',
    subtitle: '',
    features: [
      { name: 'Comments', color: '#FF7A45' },
      { name: 'Authentication', color: '#597EF7' },
      { name: 'Fumadocs', color: '#A0D911' },
      { name: 'Newsletter', color: '#13C2C2' },
    ],
    fonts: [
      {
        name: 'Inter',
        data: font,
        weight: 400,
      },
      {
        name: 'Inter',
        data: fontSemiBold,
        weight: 600,
      },
      {
        name: 'Inter',
        data: fontBold,
        weight: 700,
      },
      {
        name: 'Bricolage_Grotesque',
        data: headingFont,
        weight: 400,
      },
    ],
  });
}
