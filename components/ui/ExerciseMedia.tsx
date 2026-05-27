"use client";

import Image from "next/image";
import type { ReactNode } from "react";

const LOCAL_PNG_SLUGS = [
  "banded-hip-extension",
  "banded-pull-apart",
  "banded-squat",
  "bicep-curl",
  "bodyweight-squat",
  "boxer-step-jump-rope",
  "dumbbell-goblet-squat",
  "dumbbell-romanian-deadlift",
  "high-knees-jump-rope",
  "jump-rope-basic",
  "kettlebell-goblet-squat",
  "kettlebell-high-pull",
  "kettlebell-swing",
  "plank",
];

type Props = {
  slug: string;
  videoUrl: string | null;
  alt?: string;
  className?: string;
  sizes?: string;
  mode?: "video-first" | "image-first";
  fallback?: ReactNode;
};

function frameClassName(className?: string) {
  return ["relative overflow-hidden bg-[var(--bg-3)]", className].filter(Boolean).join(" ");
}

export function ExerciseMedia({
  slug,
  videoUrl,
  alt = "",
  className,
  sizes = "100vw",
  mode = "video-first",
  fallback,
}: Props) {
  if (mode === "video-first" && videoUrl) {
    return (
      <div className={frameClassName(className)}>
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          preload="metadata"
        />
      </div>
    );
  }

  if (LOCAL_PNG_SLUGS.includes(slug)) {
    return (
      <div className={frameClassName(className)}>
        <Image
          src={`/exercises/${slug}.png`}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          priority={false}
        />
      </div>
    );
  }

  if (fallback) {
    return <div className={frameClassName(className)}>{fallback}</div>;
  }

  return (
    <div className={frameClassName(["flex items-center justify-center", className].filter(Boolean).join(" "))}>
      <span className="text-xs text-[var(--color-text-muted)]">Video coming soon</span>
    </div>
  );
}
