"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toastStore, type Toast, type ToastType } from "@/lib/toast-store";

const toneMap: Record<ToastType, { icon: typeof CheckCircle2; border: string; background: string; color: string; label: string }> = {
  success: {
    icon: CheckCircle2,
    border: "1px solid rgba(77,200,123,0.20)",
    background: "rgba(77,200,123,0.08)",
    color: "var(--color-success)",
    label: "Success",
  },
  error: {
    icon: XCircle,
    border: "1px solid rgba(224,101,96,0.20)",
    background: "rgba(224,101,96,0.08)",
    color: "var(--color-danger)",
    label: "Error",
  },
  info: {
    icon: Info,
    border: "var(--border-accent)",
    background: "var(--color-accent-dim)",
    color: "var(--color-accent)",
    label: "Info",
  },
};

function ToastCard({ toast }: { toast: Toast }) {
  const shouldReduceMotion = useReducedMotion();
  const tone = toneMap[toast.type];
  const Icon = tone.icon;

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      toastStore.dismiss(toast.id);
    }, toast.duration);

    return () => window.clearTimeout(timeout);
  }, [toast.duration, toast.id]);

  return (
    <motion.div
      layout
      initial={shouldReduceMotion ? false : { opacity: 0, x: 48 }}
      animate={shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 48 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto w-[320px] border shadow-none"
      style={{
        border: tone.border,
        background: tone.background,
        borderRadius: "var(--radius-xl)",
      }}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <div
          className="mt-[1px] flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
          style={{ background: "var(--bg-2)", color: tone.color }}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-[1px]" style={{ color: tone.color }}>
            {tone.label}
          </div>
          <p className="mt-1 text-[13px] leading-[1.5] text-[var(--color-text-primary)]">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={() => toastStore.dismiss(toast.id)}
          aria-label="Dismiss notification"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--bg-2)] hover:text-[var(--color-text-primary)]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

export function ToastViewport() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => toastStore.subscribe(setToasts), []);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[500] flex flex-col-reverse gap-3">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
