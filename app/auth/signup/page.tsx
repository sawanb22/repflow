"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dumbbell, Mail, CheckCircle, ArrowRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { debug } from "@/utils/debug";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Logo } from "@/components/ui/Logo";
import { FormInput } from "@/components/ui/FormInput";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { Button } from "@/components/ui/Button";
import { AuthLink } from "@/components/ui/AuthLink";

const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (data: SignupForm) => {
    setError(null);
    setSuccess(false);
    debug.info("Signup", `Attempting sign-up for ${data.email}`);

    const supabase = createClient();
    const { data: authData, error: err } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (err) {
      debug.error("Signup", `Sign-up failed: ${err.message}`, { status: err.status, code: err.code });
      setError(`${err.message}${err.status ? ` (${err.status})` : ""}`);
      return;
    }

    debug.info("Signup", "Sign-up successful", { userId: authData.user?.id, session: authData.session ? "created" : "none" });

    if (authData.session) {
      router.refresh();
      router.push("/onboarding");
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <PageWrapper>
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(201,168,122,0.10)]">
            <Mail className="h-8 w-8 text-[#C9A87A]" />
          </div>
          <div className="space-y-2">
            <h1 className="font-[family-name:var(--font-barlow-condensed)] text-2xl font-black text-[#F0EBE3]">Check your email</h1>
            <p className="text-sm text-[#888480] leading-relaxed">
              We&apos;ve sent a confirmation link to your email. Click it to verify, then sign in.
            </p>
          </div>
          <div className="rounded-xl border border-[rgba(201,168,122,0.20)] bg-[rgba(201,168,122,0.05)] px-4 py-3 space-y-2">
            <div className="flex items-center gap-2 text-sm text-[#C9A87A]">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>Account created successfully</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#888480]">
              <ArrowRight className="h-4 w-4 shrink-0" />
              <span>Confirm your email to continue</span>
            </div>
          </div>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 bg-[#C9A87A] px-6 py-2.5 text-sm font-extrabold uppercase tracking-[0.8px] text-[#0A0A0A] font-[family-name:var(--font-barlow-condensed)] hover:opacity-90 transition-opacity"
          >
            Go to sign in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Logo
        title="Create account"
        subtitle="Start your fitness journey with RepFlow"
        icon={<Dumbbell className="h-6 w-6 text-[#0A0A0A]" />}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          register={register("email")}
          error={errors.email?.message}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          register={register("password")}
          error={errors.password?.message}
        />
        <FormInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          register={register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        {error && <ErrorBanner message={error} />}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <AuthLink text="Already have an account?" linkText="Sign in" href="/auth/login" />
    </PageWrapper>
  );
}
