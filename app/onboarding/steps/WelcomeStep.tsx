"use client";

import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import type { StepProps } from "../types";

export function WelcomeStep({ onNext }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Logo
          title="Welcome to RepFlow"
          subtitle="Your personal fitness journey starts here"
          icon={<Dumbbell className="h-8 w-8 text-[#0A0A0A]" />}
          size="lg"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="mt-6 text-sm text-[#888480] max-w-xs"
      >
        We'll ask a few questions to build a plan that fits your life, your goals, and your body.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="mt-10"
      >
        <Button size="lg" onClick={onNext}>
          Start Building My Plan
        </Button>
      </motion.div>
    </div>
  );
}
