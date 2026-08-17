"use client";

import { motion, useReducedMotion } from "motion/react";

/*
  Scroll-reveal wrapper. The motion is motivated by storytelling: the bento cells
  arrive in reading order as the section comes into view, so the eye is given a
  sequence instead of four tiles landing at once.

  Each cell carries its own delay rather than using parent/child variants, so the
  section itself can stay a Server Component and only these leaves ship JS.
*/
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
