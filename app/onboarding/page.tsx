"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Logo } from "@/components/ui/Logo";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { Dumbbell } from "lucide-react";
import { useOnboardingWizard } from "./hooks/useOnboardingWizard";
import { ONBOARDING_STEPS, PROGRESS_LABELS } from "./config";

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
        <Logo title="Loading..." icon={<Dumbbell className="h-6 w-6 text-[#0A0A0A]" />} />
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

  const StepComponent = currentConfig.component;

  return (
    <PageWrapper wide>
      <div className="flex flex-col min-h-0">
        <div className="shrink-0 mb-10">
          <ProgressBar steps={PROGRESS_LABELS} current={Math.max(0, step - 1)} />
        </div>

        <div className="relative flex-1 min-h-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              {currentConfig.id === "summary" ? (
                <StepComponent
                  config={currentConfig}
                  value={values as Record<string, unknown>}
                  onChange={(field, value) => setValue(field as never, value as never)}
                  onNext={submit}
                  onBack={isFirst ? undefined! : goBack}
                  isFirst={isFirst}
                  isLast={isLast}
                  submit={submit}
                  isSubmitting={isSubmitting}
                />
              ) : (
                <StepComponent
                  config={currentConfig}
                  value={values as Record<string, unknown>}
                  onChange={(field, value) => setValue(field as never, value as never)}
                  onNext={goNext}
                  onBack={isFirst ? undefined! : goBack}
                  isFirst={isFirst}
                  isLast={isLast}
                  onSkip={currentConfig.skippable ? skip : undefined}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {error && (
          <div className="shrink-0 mt-6">
            <ErrorBanner message={error} />
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
