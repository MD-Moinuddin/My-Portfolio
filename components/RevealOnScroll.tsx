'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
}

export function RevealOnScroll({ children, delay = 0 }: RevealOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  // With reduced motion requested, render the content plainly — no hidden initial
  // state is serialized into the HTML, so there is nothing to fade in or flash.
  if (prefersReducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
