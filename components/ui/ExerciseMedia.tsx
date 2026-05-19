"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";

const IMAGE_EXTS = ["jpg", "png"] as const;

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
  const [failedSources, setFailedSources] = useState<Record<string, number>>({});
  const sourceKey = `${slug}:${mode}`;
  const extIndex = failedSources[sourceKey] ?? 0;

  if (mode === "video-first" && videoUrl) {
    return (
      <div className={frameClassName(className)}>
        <video
          src={videoUrl}
          controls
          className="h-full w-full object-cover"
          preload="metadata"
        />
      </div>
    );
  }

  if (extIndex < IMAGE_EXTS.length) {
    return (
      <div className={frameClassName(className)}>
        <Image
          src={`/exercises/${slug}.${IMAGE_EXTS[extIndex]}`}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          onError={() => setFailedSources((current) => ({
            ...current,
            [sourceKey]: (current[sourceKey] ?? 0) + 1,
          }))}
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
