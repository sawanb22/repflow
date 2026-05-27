"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, KeyRound, LogOut, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { toast } from "@/lib/toast-store";
import { createClient } from "@/utils/supabase/client";

type Props = {
  profileName: string;
  workoutSummary: string;
};

export function SettingsContent({ profileName, workoutSummary }: Props) {
  const router = useRouter();
  const [name, setName] = useState(profileName);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function saveProfile() {
    setSavingProfile(true);
    setMessage(null);
    setError(null);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Your session expired. Please sign in again.");
        return;
      }

      const { error: updateError } = await supabase.from("users_profile").upsert(
        {
          user_id: user.id,
          name: name.trim() || null,
        },
        { onConflict: "user_id" },
      );

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setMessage("Profile updated.");
      router.refresh();
    } finally {
      setSavingProfile(false);
    }
  }

  async function updatePassword() {
    setSavingPassword(true);
    setMessage(null);
    setError(null);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setPassword("");
      setMessage("Password updated.");
    } finally {
      setSavingPassword(false);
    }
  }

  async function restartOnboarding() {
    setMessage(null);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Your session expired. Please sign in again.");
      return;
    }

    const { error: updateError } = await supabase
      .from("user_preferences")
      .update({ onboarding_done: false })
      .eq("user_id", user.id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    router.push("/onboarding");
    router.refresh();
  }

  async function signOut() {
    setSigningOut(true);
    setMessage(null);
    setError(null);

    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/auth/login");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  useEffect(() => {
    if (!message) return;
    toast.success(message);
  }, [message]);

  return (
    <div className="px-8 py-7">
      <div className="mb-6">
        <div className="text-[11px] font-bold uppercase tracking-[1.2px] text-[var(--color-accent)]">Settings</div>
        <h1 className="font-[family-name:var(--font-barlow-condensed)] text-[32px] font-black text-[var(--color-text-primary)]">Profile & Account</h1>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">Manage your name, workout setup, password, and account access.</p>
      </div>

      <div className="grid grid-cols-[1fr_0.9fr] gap-6">
        <div className="flex flex-col gap-6">
          <section className="border bg-[var(--bg-2)]" style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "20px" }}>
            <div className="mb-4 flex items-center gap-2 text-[var(--color-text-primary)]">
              <UserRound className="h-4 w-4 text-[var(--color-accent)]" />
              <h2 className="font-[family-name:var(--font-barlow-condensed)] text-[20px] font-bold">Profile name</h2>
            </div>

            <div>
              <label htmlFor="profile-name" className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">Display name</label>
              <input
                id="profile-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-11 w-full rounded-[10px] border bg-[var(--bg-3)] px-[14px] text-sm text-[var(--color-text-primary)] focus:outline-none"
                style={{ border: "var(--border-subtle)" }}
              />
            </div>

            <div className="mt-4">
              <Button onClick={saveProfile} loading={savingProfile} className="rounded-[10px]">Save name</Button>
            </div>
          </section>

          <section className="border bg-[var(--bg-2)]" style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "20px" }}>
            <div className="mb-4 flex items-center gap-2 text-[var(--color-text-primary)]">
              <KeyRound className="h-4 w-4 text-[var(--color-accent)]" />
              <h2 className="font-[family-name:var(--font-barlow-condensed)] text-[20px] font-bold">Password</h2>
            </div>

            <div>
              <label htmlFor="settings-password" className="mb-1 block text-sm font-medium text-[var(--color-text-secondary)]">New password</label>
              <input
                id="settings-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Minimum 6 characters"
                className="h-11 w-full rounded-[10px] border bg-[var(--bg-3)] px-[14px] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
                style={{ border: "var(--border-subtle)" }}
              />
            </div>

            <div className="mt-4">
              <Button onClick={updatePassword} loading={savingPassword} disabled={password.length < 6} className="rounded-[10px]">Update password</Button>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section className="border bg-[var(--bg-2)]" style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "20px" }}>
            <div className="mb-2 text-[11px] font-bold uppercase tracking-[1px] text-[var(--color-accent)]">Workout preferences</div>
            <h2 className="font-[family-name:var(--font-barlow-condensed)] text-[20px] font-bold text-[var(--color-text-primary)]">Current setup</h2>
            <p className="mt-2 text-[13px] text-[var(--color-text-secondary)]">{workoutSummary}</p>
            <div className="mt-4">
              <Button variant="secondary" onClick={restartOnboarding} className="rounded-[10px]">Edit preferences</Button>
            </div>
          </section>

          <section className="border bg-[var(--bg-2)]" style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", padding: "20px" }}>
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[1px] text-[var(--color-text-muted)]">Account actions</div>
            <div className="flex flex-col gap-3">
              <Button variant="secondary" onClick={signOut} loading={signingOut} className="justify-start rounded-[10px]">
                <LogOut className="h-4 w-4" />
                Log out
              </Button>
              <button
                type="button"
                className="flex items-start gap-3 rounded-[12px] border px-4 py-4 text-left"
                style={{ border: "1px solid rgba(224,101,96,0.18)", background: "rgba(224,101,96,0.05)" }}
              >
                <AlertTriangle className="mt-[2px] h-4 w-4 shrink-0 text-[var(--color-danger)]" />
                <div>
                  <div className="text-[13px] font-semibold text-[var(--color-text-primary)]">Delete account</div>
                  <div className="mt-1 text-[12px] text-[var(--color-text-secondary)]">This flow is not live yet. Contact support before any permanent deletion.</div>
                </div>
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
