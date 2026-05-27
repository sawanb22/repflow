"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { SkeletonButtonContent } from "@/components/ui/Skeleton";
import { createClient } from "@/utils/supabase/client";

type Props = {
  exerciseId: string;
  initialFavorite: boolean;
};

export function FavoriteToggle({ exerciseId, initialFavorite }: Props) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isSaving, setIsSaving] = useState(false);

  async function toggleFavorite() {
    if (isSaving) return;
    setIsSaving(true);

    const nextValue = !isFavorite;
    setIsFavorite(nextValue);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsFavorite(!nextValue);
        return;
      }

      if (nextValue) {
        const { error } = await supabase.from("exercise_favorites").insert({
          user_id: user.id,
          exercise_id: exerciseId,
        });

        if (error) setIsFavorite(false);
        return;
      }

      const { error } = await supabase
        .from("exercise_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("exercise_id", exerciseId);

      if (error) setIsFavorite(true);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      disabled={isSaving}
      aria-busy={isSaving || undefined}
      className="relative inline-flex items-center justify-center gap-2 border bg-[var(--bg-2)] px-4 text-[12px] font-semibold text-[var(--color-text-secondary)] transition-all disabled:opacity-60 hover:border-[rgba(255,255,255,0.10)] hover:text-[var(--color-text-primary)]"
      style={{ border: "var(--border-subtle)", borderRadius: "var(--radius-xl)", minHeight: "56px" }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <span className={isSaving ? "opacity-0" : "inline-flex items-center gap-2"}>
        <Heart className={`h-4 w-4 ${isFavorite ? "fill-current text-[var(--color-accent)]" : "text-[var(--color-text-secondary)]"}`} />
        {isFavorite ? "Saved" : "Save"}
      </span>
      {isSaving ? <SkeletonButtonContent withIcon labelWidth="w-[48px]" tone="surface" /> : null}
    </button>
  );
}
