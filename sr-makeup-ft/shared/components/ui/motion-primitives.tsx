"use client";

import React from "react";
import { motion, MotionConfig, type Variants } from "framer-motion";

const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  className?: string;
  immediate?: boolean;
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.65,
  className,
  immediate = false,
}: RevealProps) {
  const offset = 32;
  const initialOffset =
    direction === "up"
      ? { y: offset, x: 0 }
      : direction === "down"
      ? { y: -offset, x: 0 }
      : direction === "left"
      ? { x: -offset, y: 0 }
      : direction === "right"
      ? { x: offset, y: 0 }
      : { x: 0, y: 0 };

  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, ...initialOffset }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration, delay, ease: LUXURY_EASE }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration, delay, ease: LUXURY_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: LUXURY_EASE,
    },
  },
};

export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
