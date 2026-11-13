import Image from 'next/image';

interface FigureProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  sizes?: string;
  className?: string;
  /** Letterbox into a fixed 8:5 frame so side-by-side charts line up. */
  uniform?: boolean;
}

// A figure that links to the full-size image, so small chart text stays readable on any screen.
export function Figure({ src, width, height, alt, caption, sizes, className, uniform }: FigureProps) {
  return (
    <figure className={className}>
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="block overflow-hidden rounded-xl border border-ink/10 bg-white p-2 transition-colors hover:border-accent-text/50 dark:border-snow/10 dark:hover:border-accent/50"
      >
        {uniform ? (
          <div className="relative aspect-[8/5]">
            <Image src={src} alt={alt} fill sizes={sizes ?? '(min-width: 896px) 832px, 100vw'} className="object-contain" />
          </div>
        ) : (
          <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            sizes={sizes ?? '(min-width: 896px) 832px, 100vw'}
            className="h-auto w-full"
          />
        )}
        <span className="sr-only"> (opens the full-size image in a new tab)</span>
      </a>
      <figcaption className="mt-2 text-sm opacity-75">{caption}</figcaption>
    </figure>
  );
}
