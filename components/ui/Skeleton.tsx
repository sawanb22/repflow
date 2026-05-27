"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

export type SkeletonTone = "page" | "surface" | "contrast";

type SkeletonBlockProps = {
  className?: string;
  style?: CSSProperties;
  tone?: SkeletonTone;
};

type SkeletonButtonContentProps = {
  labelWidth?: string;
  withIcon?: boolean;
  tone?: SkeletonTone;
};

const toneStyles: Record<SkeletonTone, { background: string; shimmer: string; opacity: number }> = {
  page: {
    background: "var(--bg-2)",
    shimmer: "var(--bg-3)",
    opacity: 1,
  },
  surface: {
    background: "var(--bg-3)",
    shimmer: "var(--bg-4)",
    opacity: 1,
  },
  contrast: {
    background: "var(--bg-0)",
    shimmer: "var(--bg-2)",
    opacity: 0.7,
  },
};

export function SkeletonBlock({ className = "", style, tone = "page" }: SkeletonBlockProps) {
  const reduceMotion = useReducedMotion();
  const colors = toneStyles[tone];

  return (
    <div
      aria-hidden="true"
      className={["relative overflow-hidden", className].filter(Boolean).join(" ")}
      style={{
        background: colors.background,
        ...style,
      }}
    >
      {reduceMotion ? null : (
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[42%]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${colors.shimmer} 50%, transparent 100%)`,
            opacity: colors.opacity,
          }}
          initial={{ x: "-160%" }}
          animate={{ x: "320%" }}
          transition={{
            duration: 1.5,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      )}
    </div>
  );
}

export function SkeletonButtonContent({ labelWidth = "w-[80px]", withIcon = false, tone = "contrast" }: SkeletonButtonContentProps) {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2" aria-hidden="true">
      {withIcon ? <SkeletonBlock className="h-4 w-4 rounded-full" tone={tone} /> : null}
      <SkeletonBlock className={["h-4 rounded-full", labelWidth].join(" ")} tone={tone} />
    </span>
  );
}
