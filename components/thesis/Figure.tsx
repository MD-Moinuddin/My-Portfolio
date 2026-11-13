'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

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

// A figure that opens in a pop-up (a native <dialog>), so readers can see the small chart text
// without leaving the page. Esc, the close button, and a click outside the image all close it.
export function Figure({ src, width, height, alt, caption, sizes, className, uniform }: FigureProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const inlineSizes = sizes ?? '(min-width: 896px) 832px, 100vw';

  function openDialog() {
    setOpen(true);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  // Runs for every way of closing (button, Esc, backdrop), so the page scroll is always restored.
  function handleClose() {
    setOpen(false);
    document.body.style.overflow = '';
  }

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-ink/10 bg-white p-2 transition-colors hover:border-accent-text/50 dark:border-snow/10 dark:hover:border-accent/50"
      >
        {uniform ? (
          <div className="relative aspect-[8/5]">
            <Image src={src} alt={alt} fill sizes={inlineSizes} className="object-contain" />
          </div>
        ) : (
          <Image src={src} width={width} height={height} alt={alt} sizes={inlineSizes} className="h-auto w-full" />
        )}
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:opacity-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
          </svg>
        </span>
        <span className="sr-only">Enlarge image</span>
      </button>
      <figcaption className="mt-2 text-sm opacity-75">{caption}</figcaption>

      <dialog
        ref={dialogRef}
        aria-label={caption}
        onClose={handleClose}
        onClick={(event) => {
          // A click on the backdrop lands on the <dialog> element itself, not on its content.
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="m-auto max-h-[94vh] w-[min(96vw,1400px)] max-w-none overflow-visible rounded-2xl border-0 bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="relative">
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Close"
              className="absolute -top-3 right-0 z-10 inline-flex h-10 w-10 -translate-y-full items-center justify-center rounded-full bg-white text-ink shadow-lg transition-transform hover:scale-105 max-sm:right-1 max-sm:top-1 max-sm:translate-y-0"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            <div className="overflow-auto rounded-2xl bg-white p-3 sm:p-4">
              <Image
                src={src}
                width={width}
                height={height}
                alt={alt}
                sizes="96vw"
                className="mx-auto h-auto max-h-[80vh] w-full object-contain"
              />
            </div>
            <p className="mt-3 text-center text-sm text-white/90">{caption}</p>
          </div>
        )}
      </dialog>
    </figure>
  );
}
