"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Play, PauseCircle } from "lucide-react";
import { ExerciseMedia } from "@/components/ui/ExerciseMedia";

type Props = {
  slug: string;
  name: string;
  videoUrl?: string | null;
  alt?: string;
  className?: string;
  sizes?: string;
  mode?: "video-first" | "image-first";
  fallback?: ReactNode;
};

function containerClassName(className?: string) {
  return ["relative overflow-hidden bg-[var(--bg-2)]", className].filter(Boolean).join(" ");
}

export function ExerciseMediaV2({
  slug,
  name,
  videoUrl = null,
  alt,
  className,
  sizes = "100vw",
  mode = "video-first",
  fallback,
}: Props) {
  const [hasVideo, setHasVideo] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isImageFirst = mode === "image-first";
  const [isPlaying, setIsPlaying] = useState(!isImageFirst);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const localVideoUrl = `/exercises/${slug}/animation.mp4`;

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.videoWidth && video.videoHeight) {
      setAspectRatio(video.videoWidth / video.videoHeight);
    }
  };

  const LOCAL_VIDEO_SLUGS = ["push-up"];

  // No need to probe the server anymore. We know exactly which exercises have local videos.
  useEffect(() => {
    const exists = LOCAL_VIDEO_SLUGS.includes(slug);
    setHasVideo(exists);
    setHasChecked(true);
    setIsPaused(false);
    setIsPlaying(!isImageFirst);
  }, [slug, isImageFirst]);

  // Keep video play/pause/reset in sync with isPlaying and isPaused state
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasVideo) return;

    if (isImageFirst) {
      if (hovered) {
        setIsPlaying(true);
        video.play().catch(() => {});
      } else {
        setIsPlaying(false);
        video.pause();
        // Force seek back to the very first frame to show muscles/starting position
        video.currentTime = 0;
      }
    } else {
      // video-first mode (detail page) with click-to-pause
      if (isPaused) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    }
  }, [hovered, isPaused, isImageFirst, hasVideo]);

  const handleClick = () => {
    if (!hasVideo || isImageFirst) return;
    setIsPaused((prev) => !prev);
  };

  // --- Loading state ---
  if (!hasChecked) {
    return (
      <div className={containerClassName(className)}>
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-2)]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent" />
        </div>
      </div>
    );
  }

  // --- Fallback: no local animation video — use original ExerciseMedia ---
  if (!hasVideo) {
    return (
      <ExerciseMedia
        slug={slug}
        videoUrl={videoUrl}
        alt={alt ?? name}
        className={className}
        sizes={sizes}
        mode={mode}
        fallback={fallback}
      />
    );
  }

  // --- Animation video player ---
  return (
    <div
      className={containerClassName(className)}
      style={{
        cursor: isImageFirst ? "default" : "pointer",
        aspectRatio: aspectRatio ? `${aspectRatio}` : undefined,
        height: aspectRatio ? "auto" : undefined,
      }}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        // Appending #t=0.001 forces browser to immediately render the first frame on load
        src={`${localVideoUrl}#t=0.001`}
        autoPlay={!isImageFirst}
        loop
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        className="absolute inset-0 h-full w-full object-contain"
        style={{ backgroundColor: "var(--bg-2)" }}
      />

      {/* Hover / paused overlay badge — only show on detail page (video-first mode) */}
      {!isImageFirst && (hovered || isPaused) ? (
        <div
          className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-[999px] border bg-[rgba(10,10,10,0.85)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.8px] text-[var(--color-text-primary)] shadow-lg"
          style={{ border: "var(--border-subtle)" }}
        >
          {isPaused ? (
            <>
              <div className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span>Paused — Click to play</span>
            </>
          ) : (
            <>
              <PauseCircle className="h-3.5 w-3.5 text-[var(--color-accent)] animate-pulse" />
              <span>Click to pause</span>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
