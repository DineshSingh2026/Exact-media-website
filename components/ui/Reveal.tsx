"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  /** Seconds to wait before animating */
  delay?: number;
}

/** Fades + slides an element up 24px when it scrolls into view (once). */
export function Reveal({ delay = 0, transition, ...props }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay, ...transition }}
      {...props}
    />
  );
}

interface RevealGroupProps extends HTMLMotionProps<"div"> {
  /** Seconds between each child's reveal */
  interval?: number;
}

/** Parent that staggers its <RevealItem> children into view. */
export function RevealGroup({ interval = 0.08, ...props }: RevealGroupProps) {
  return (
    <motion.div variants={stagger(interval)} initial="hidden" whileInView="visible" viewport={viewportOnce} {...props} />
  );
}

export function RevealItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={fadeUp} {...props} />;
}
