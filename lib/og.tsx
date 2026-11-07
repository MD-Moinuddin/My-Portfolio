import { ImageResponse } from 'next/og';
import { themeColors } from '@/lib/theme-colors';
import { site } from '@/lib/site';

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

export interface OgCopy {
  eyebrow: string;
  title: string;
  summary: string;
  tags: string[];
}

const MAX_TITLE = 80;
const MAX_SUMMARY = 140;
const MAX_TAGS = 5;

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

export function ogCopy({ eyebrow, title, summary, tags }: OgCopy): OgCopy {
  return {
    eyebrow,
    title: truncate(title, MAX_TITLE),
    summary: truncate(summary, MAX_SUMMARY),
    tags: tags.slice(0, MAX_TAGS),
  };
}

// Social crawlers (LinkedIn, X, Slack) don't render SVG, so every shareable page gets a generated PNG
// in the same look as the site instead of its raw cover image.
export function renderOgImage(copy: OgCopy) {
  const { eyebrow, title, summary, tags } = ogCopy(copy);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: themeColors.canvas,
          color: themeColors.snow,
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 8,
              textTransform: 'uppercase',
              color: themeColors.accent,
            }}
          >
            {eyebrow}
          </div>
          <div style={{ marginTop: 28, fontSize: title.length > 60 ? 54 : title.length > 40 ? 60 : 84, fontWeight: 700, lineHeight: 1.08 }}>
            {title}
          </div>
          <div style={{ marginTop: 24, fontSize: 32, lineHeight: 1.35, opacity: 0.75 }}>{summary}</div>
          {tags.length > 0 && (
            <div style={{ marginTop: 36, display: 'flex', flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <div
                  key={tag}
                  style={{
                    marginRight: 14,
                    marginBottom: 10,
                    padding: '6px 20px',
                    fontSize: 24,
                    borderRadius: 999,
                    color: themeColors.accent,
                    border: `2px solid ${themeColors.accent}`,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', height: 6, width: 180, backgroundColor: themeColors.accent }} />
          <div style={{ fontSize: 28, opacity: 0.8 }}>{site.name}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
