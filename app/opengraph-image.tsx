import { ImageResponse } from 'next/og';
import { themeColors } from '@/lib/theme-colors';
import { site } from '@/lib/site';

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundColor: themeColors.canvas,
          color: themeColors.snow,
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: themeColors.accent,
          }}
        >
          Portfolio
        </div>
        <div style={{ marginTop: 24, fontSize: 86, fontWeight: 700, lineHeight: 1.05 }}>{site.name}</div>
        <div style={{ marginTop: 20, fontSize: 38, opacity: 0.75 }}>Software Engineer</div>
        <div
          style={{
            marginTop: 48,
            height: 6,
            width: 180,
            backgroundColor: themeColors.accent,
          }}
        />
      </div>
    ),
    size,
  );
}
