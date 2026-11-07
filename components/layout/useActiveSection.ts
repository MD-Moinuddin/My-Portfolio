import { useCallback, useSyncExternalStore } from 'react';

// A section counts as "current" once its top edge has scrolled up to this many px from the top of
// the viewport. It sits just below the sticky header, so a nav click (which lands a section at
// the `scroll-padding-top` in globals.css) always selects the section it was aimed at.
const ACTIVE_OFFSET_PX = 120;
const BOTTOM_TOLERANCE_PX = 2;

function subscribe(onChange: () => void) {
  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      onChange();
    });
  };

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.removeEventListener('hashchange', schedule);
    if (frame) cancelAnimationFrame(frame);
  };
}

/**
 * Returns the id of the section the reader is currently in, from `ids` (listed in page order),
 * or null when none applies. Reaching the bottom of the page selects the last section, since a
 * short final section can never scroll up to the offset.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const getSnapshot = useCallback(() => {
    const present = ids.filter((id) => document.getElementById(id));
    if (present.length === 0) return null;

    const atBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX;
    if (atBottom && window.scrollY > 0) return present[present.length - 1];

    let current: string | null = null;
    for (const id of present) {
      if (document.getElementById(id)!.getBoundingClientRect().top > ACTIVE_OFFSET_PX) break;
      current = id;
    }
    return current;
  }, [ids]);

  // The server and the first client render agree on "nothing active"; scrolling fills it in.
  return useSyncExternalStore(subscribe, getSnapshot, () => null);
}
