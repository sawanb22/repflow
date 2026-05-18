"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/utils/supabase/client";
import { debug } from "@/utils/debug";
import { ONBOARDING_STEPS } from "../config";

const onboardingSchema = z.object({
  fitness_goals: z.array(z.enum(["lose_fat", "build_muscle", "stay_active", "improve_flexibility", "reduce_stress"])).min(1, "Select at least one goal"),
  training_style: z.enum(["home", "gym", "hybrid", "yoga", "breathwork", ""]).refine((v) => v !== "", "Select a training style"),
  equipment_list: z.array(z.string()).min(1, "Select at least one equipment option"),
  workout_days_per_week: z.number().min(1).max(7),
  workout_duration_min: z.number().min(10).max(120),
  experience_level: z.enum(["beginner", "intermediate", "advanced", ""]).refine((v) => v !== "", "Select your experience level"),
  limitations: z.array(z.enum(["knee_pain", "back_pain", "shoulder_pain", "limited_mobility", "recovering_injury", "pregnancy"])).default([]),
});

export function useOnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const submittingRef = useRef(false);

  const form = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      fitness_goals: [],
      training_style: "",
      equipment_list: [],
      workout_days_per_week: 3,
      workout_duration_min: 30,
      experience_level: "",
      limitations: [],
    },
    mode: "onChange",
  });

  const { trigger, getValues, setValue, formState: { isSubmitting } } = form;

  const currentConfig = ONBOARDING_STEPS[step];
  const isFirst = step === 0;
  const isLast = step === ONBOARDING_STEPS.length - 1;

  const goNext = useCallback(async () => {
    const fields = currentConfig.fields;
    if (fields.length > 0) {
      const valid = await trigger(fields as Parameters<typeof trigger>[0]);
      if (!valid) return;
    }
    if (step < ONBOARDING_STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }, [step, currentConfig.fields, trigger]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => s - 1);
  }, []);

  const skip = useCallback(() => {
    setValue("limitations", []);
    if (step < ONBOARDING_STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  }, [step, setValue]);

  const submit = useCallback(async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setError(null);

    const data = getValues();
    debug.info("Onboarding", "Submitting preferences", data);

    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (!user || userError) {
      debug.error("Onboarding", "No authenticated user", { userError: userError?.message });
      setError("Session expired. Please sign in again.");
      submittingRef.current = false;
      return;
    }

    const { error: upsertError } = await supabase.from("user_preferences").upsert(
      {
        user_id: user.id,
        fitness_goals: data.fitness_goals,
        training_style: data.training_style,
        equipment_list: data.equipment_list,
        workout_days_per_week: data.workout_days_per_week,
        workout_duration_min: data.workout_duration_min,
        experience_level: data.experience_level,
        limitations: data.limitations ?? [],
        onboarding_done: true,
      },
      { onConflict: "user_id" }
    );

    if (upsertError) {
      debug.error("Onboarding", "Upsert failed", { message: upsertError.message, code: upsertError.code });
      setError(upsertError.message);
      submittingRef.current = false;
      return;
    }

    debug.info("Onboarding", "Preferences saved");
    router.refresh();
    router.push("/home");
  }, [getValues, router]);

  return {
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
  };
}
