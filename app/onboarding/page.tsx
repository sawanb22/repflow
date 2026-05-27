"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/lib/toast-store";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SkeletonBlock } from "@/components/ui/Skeleton";
import { AccentPicker } from "@/components/AccentPicker";
import { useOnboardingWizard } from "./hooks/useOnboardingWizard";
import { PROGRESS_LABELS } from "./config";

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 80 : -80, opacity: 0 }),
};

function OnboardingPageSkeleton() {
  return (
    <PageWrapper wide>
      <div className="flex h-screen flex-col">
        <div className="shrink-0 px-8 pt-8 sm:px-12 sm:pt-10 lg:px-16">
          <div className="mb-6 flex items-center justify-end">
            <SkeletonBlock className="h-[36px] w-[36px] rounded-[8px]" tone="page" />
          </div>
          <div className="progress-scrollbar-hidden w-full overflow-x-auto pb-1">
            <div className="mx-auto flex min-w-[720px] max-w-5xl items-start px-1">
              {PROGRESS_LABELS.map((step, index) => (
                <div key={`${step.label}-${index}`} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full items-center justify-center">
                    {index > 0 ? <SkeletonBlock className="absolute right-1/2 top-1/2 h-0.5 w-full -translate-y-1/2" tone="page" /> : null}
                    <SkeletonBlock className="relative z-10 h-7 w-7 rounded-full border border-[rgba(255,255,255,0.055)]" tone="surface" />
                  </div>
                  <SkeletonBlock className="h-[20px] w-[72px] rounded-full" tone="page" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 px-8 pb-8 pt-6 sm:px-12 sm:pb-10 lg:px-16">
          <div className="flex h-full min-h-0 flex-col">
            <div className="progress-scrollbar-hidden min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
              <div className="flex min-h-full flex-col">
                <div className="mb-6 shrink-0 sm:mb-8">
                  <SkeletonBlock className="h-8 w-[260px] rounded-full sm:h-9 sm:w-[320px]" tone="page" />
                  <SkeletonBlock className="mt-2 h-5 w-[360px] max-w-full rounded-full" tone="page" />
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl border border-[rgba(255,255,255,0.055)] bg-[var(--bg-2)] p-4">
                    <SkeletonBlock className="mb-2 h-4 w-[56px] rounded-full" tone="surface" />
                    <div className="flex flex-wrap gap-1.5">
                      <SkeletonBlock className="h-7 w-[92px] rounded-md" tone="surface" />
                      <SkeletonBlock className="h-7 w-[108px] rounded-md" tone="surface" />
                      <SkeletonBlock className="h-7 w-[96px] rounded-md" tone="surface" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[0, 1].map((card) => (
                      <div key={card} className="rounded-2xl border border-[rgba(255,255,255,0.055)] bg-[var(--bg-2)] p-4">
                        <div className="flex items-center gap-3">
                          <SkeletonBlock className="h-5 w-5 rounded-full" tone="surface" />
                          <div className="flex-1">
                            <SkeletonBlock className="h-4 w-[76px] rounded-full" tone="surface" />
                            <SkeletonBlock className="mt-2 h-5 w-[120px] rounded-full" tone="surface" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-[rgba(255,255,255,0.055)] bg-[var(--bg-2)] p-4">
                    <SkeletonBlock className="mb-2 h-4 w-[90px] rounded-full" tone="surface" />
                    <div className="flex flex-wrap gap-1.5">
                      <SkeletonBlock className="h-7 w-[110px] rounded-md" tone="surface" />
                      <SkeletonBlock className="h-7 w-[124px] rounded-md" tone="surface" />
                    </div>
                  </div>

                  <SkeletonBlock className="h-[52px] w-full rounded-[12px]" tone="page" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default function OnboardingPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) window.location.href = "/auth/login";
      else setReady(true);
    };
    check();
  }, []);

  if (!ready) {
    return <OnboardingPageSkeleton />;
  }

  return <OnboardingWizard />;
}

function OnboardingWizard() {
  const {
    step,
    direction,
    currentConfig,
    form,
    error,
    isFirst,
    isLast,
    goNext,
    goBack,
    skip,
    submit,
    isSubmitting,
  } = useOnboardingWizard();

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  const { watch, setValue } = form;
  const values = watch();
  const handleNext = currentConfig.id === "summary" ? submit : goNext;

  const StepComponent = currentConfig.component;

  return (
    <PageWrapper wide>
      <div className="flex h-screen flex-col">
        <div className="shrink-0 px-8 pt-8 sm:px-12 sm:pt-10 lg:px-16">
          <div className="mb-6 flex items-center justify-end">
            <AccentPicker />
          </div>
          <ProgressBar steps={PROGRESS_LABELS} current={Math.max(0, step - 1)} />
        </div>

        <div className="min-h-0 flex-1 px-8 pb-8 pt-6 sm:px-12 sm:pb-10 lg:px-16">
          <div className="flex h-full min-h-0 flex-col">
            <div className="progress-scrollbar-hidden min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  className="min-h-full"
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <StepComponent
                    config={currentConfig}
                    value={values as Record<string, unknown>}
                    onChange={(field, value) => setValue(field as never, value as never)}
                    onNext={handleNext}
                    onBack={goBack}
                    isFirst={isFirst}
                    isLast={isLast}
                    onSkip={currentConfig.skippable ? skip : undefined}
                    submit={submit}
                    isSubmitting={isSubmitting}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
