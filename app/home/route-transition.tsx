"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

const transition = {
  duration: 0.18,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function RouteTransition({ children }: Props) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const mainRef = useRef<HTMLElement>(null);
  const hasMountedRef = useRef(false);
  const controls = useAnimationControls();

  useLayoutEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (shouldReduceMotion) {
      controls.set({ opacity: 1, y: 0 });
      hasMountedRef.current = true;
      return;
    }

    if (!hasMountedRef.current) {
      controls.set({ opacity: 1, y: 0 });
      hasMountedRef.current = true;
      return;
    }

    controls.set({ opacity: 0, y: 10 });
    void controls.start({ opacity: 1, y: 0, transition });
  }, [controls, pathname, shouldReduceMotion]);

  return (
    <main ref={mainRef} className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
      <motion.div
        key={pathname}
        className="min-h-full"
        initial={false}
        animate={controls}
      >
        {children}
      </motion.div>
    </main>
  );
}
