import { ImageResponse } from 'next/og';
import type { ReactElement } from 'react';
import type { ImageResponseOptions } from 'next/dist/compiled/@vercel/og/types';

interface GenerateProps {
  primaryTextColor?: string;
  title?: string;
  subtitle?: string;
  features?: Array<{
    name: string;
    color: string;
  }>;
}

export function generateOGImage(
  options: GenerateProps & ImageResponseOptions,
): ImageResponse {
  const { title, subtitle, features, ...rest } = options;

  return new ImageResponse(
    generate({
      title,
      subtitle,
      features,
    }),
    {
      width: 1200,
      height: 630,
      ...rest,
    },
  );
}

export function generate({
  primaryTextColor,
  title = 'Ready-made blog template',
  subtitle = '',
  features = [
    { name: 'Comments', color: '#FF7A45' },
    { name: 'Authentication', color: '#597EF7' },
    { name: 'Fumadocs', color: '#A0D911' },
    { name: 'Newsletter', color: '#13C2C2' },
  ],
}: GenerateProps): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        color: 'white',
        background:
          'linear-gradient(to bottom, rgb(30, 30, 30), rgb(10, 10, 10), rgb(0, 0, 0))',
        fontFamily: 'Inter, sans-serif',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage:
            'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          top: '0px',
          right: '0px',
          zIndex: '0',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryTextColor}22, transparent 70%)`,
          top: '-100px',
          right: '-100px',
          zIndex: '0',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryTextColor}15, transparent 70%)`,
          bottom: '-50px',
          left: '-50px',
          zIndex: '0',
        }}
      />

      {/* Content container */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          zIndex: '1',
          justifyContent: 'space-between',
          padding: '60px',
        }}
      >
        {/* Left side - Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '50%',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 700,
              lineHeight: 1.1,
              margin: '0',
              maxWidth: '600px',
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: '32px',
                color: 'rgba(255, 255, 255, 0.8)',
                margin: '24px 0 0 0',
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Right side - Features */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '32px',
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  backgroundColor: feature.color,
                }}
              />
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 500,
                }}
              >
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
