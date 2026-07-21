"use client";
import { ReactNode } from "react";
import { motion, AnimatePresence, MotionProps } from "motion/react";
import { cn } from "@/shared/utils";

interface AnimatedContentProps extends Omit<MotionProps, "children"> {
  children: ReactNode;
  className?: string;
  mode?: "wait" | "sync" | "popLayout";
}

export const AnimatedContent = ({ children, className, mode = "wait", ...props }: AnimatedContentProps) => {
  return (
    <AnimatePresence mode={mode}>
      <motion.div
        key={String(children)}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        exit={{
          opacity: 0,
          y: 4,
          transition: { duration: 0.3, ease: "easeIn" },
        }}
        className={cn("will-change-transform", className)}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
