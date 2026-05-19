"use client";

import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import type { StepProps } from "../types";

export function WelcomeStep({ config, onNext }: StepProps) {
  return (
    <div className="flex min-h-full flex-col justify-between gap-8">
      <div>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-[24px] border border-[rgba(255,255,255,0.055)] bg-[#141414] px-6 py-8 sm:px-8 sm:py-10"
        >
          <div className="text-center">
            <Logo
              title="Welcome to RepFlow"
              subtitle="Your personal fitness journey starts here"
              icon={<Dumbbell className="h-8 w-8 text-[#0A0A0A]" />}
              size="lg"
            />
          </div>
        </motion.div>

        {config.description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="mt-6 max-w-2xl text-sm leading-relaxed text-[#888480]"
          >
            {config.description}
          </motion.p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="border-t border-[rgba(255,255,255,0.055)] pt-6"
      >
        <Button size="lg" onClick={onNext} className="w-full sm:w-auto">
          Start Building My Plan
        </Button>
      </motion.div>
    </div>
  );
}
