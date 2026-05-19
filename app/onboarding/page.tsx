"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Logo } from "@/components/ui/Logo";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { AccentPicker } from "@/components/AccentPicker";
import { Dumbbell } from "lucide-react";
import { useOnboardingWizard } from "./hooks/useOnboardingWizard";
import { PROGRESS_LABELS } from "./config";

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 80 : -80, opacity: 0 }),
};

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
    return (
      <PageWrapper>
        <div className="flex min-h-screen items-center justify-center px-8">
          <Logo title="Loading..." icon={<Dumbbell className="h-6 w-6 text-[#0A0A0A]" />} />
        </div>
      </PageWrapper>
    );
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
            {error && (
              <div className="mb-4 shrink-0">
                <ErrorBanner message={error} />
              </div>
            )}

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
