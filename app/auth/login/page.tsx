"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dumbbell } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { debug } from "@/utils/debug";
import { toast } from "@/lib/toast-store";
import { PageWrapper } from "@/components/ui/PageWrapper";
import { Logo } from "@/components/ui/Logo";
import { FormInput } from "@/components/ui/FormInput";
import { Button } from "@/components/ui/Button";
import { AuthLink } from "@/components/ui/AuthLink";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    debug.info("Login", `Attempting sign-in for ${data.email}`);

    const supabase = createClient();
    const { data: authData, error: err } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (err) {
      debug.error("Login", `Sign-in failed: ${err.message}`, { status: err.status, code: err.code });
      toast.error(`${err.message}${err.status ? ` (${err.status})` : ""}`);
      return;
    }

    if (authData.user && !authData.user.email_confirmed_at) {
      debug.warn("Login", "Email not confirmed");
      toast.info("Please confirm your email before signing in. Check your inbox.");
      await supabase.auth.signOut();
      return;
    }

    router.refresh();
    router.push("/home");
  };

  return (
    <PageWrapper isAuth>
      <Logo
        title="Welcome back"
        subtitle="Sign in to continue your journey"
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

        <Button type="submit" loading={isSubmitting} className="w-full">
          Sign in
        </Button>
      </form>

      <AuthLink text="Don't have an account?" linkText="Sign up" href="/auth/signup" />
    </PageWrapper>
  );
}
