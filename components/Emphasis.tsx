import { Fragment } from 'react';

/** Renders text with **double-asterisk** phrases emphasised in the accent colour (e.g. a key metric). */
export function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-bold text-accent-text dark:text-accent">
            {part}
          </strong>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
