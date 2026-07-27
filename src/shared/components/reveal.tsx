"use client";
import { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/shared/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

/* Scroll-triggered entrance: opacity + translate + a whisper of blur to mask
   the transition. Reduced motion keeps the fade and drops the movement. */
export const Reveal = ({ children, className, delay = 0, y = 16, once = true }: RevealProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : y, filter: reduceMotion ? "none" : "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
};
