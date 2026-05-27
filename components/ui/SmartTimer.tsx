"use client";

import type { SVGProps } from "react";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Timer, Activity, Plus, Minus } from "lucide-react";

type Props = {
  defaultRestSeconds?: number;
};

// Programmatic premium synthesizer chime using AudioContext
function playChime(type: "tick" | "complete") {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    
    if (type === "tick") {
      // Very soft, high-frequency tap for countdown warning
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === "complete") {
      // Luxury double-chime (gold bell sound)
      const now = ctx.currentTime;
      
      const playTone = (time: number, freq: number, dur: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, time); // Fundamental
        
        // Add metallic overtone for premium bell texture
        const overtone = ctx.createOscillator();
        overtone.type = "sine";
        overtone.frequency.setValueAtTime(freq * 1.5, time);
        
        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + dur);
        
        osc.connect(gain);
        overtone.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(time);
        overtone.start(time);
        osc.stop(time + dur);
        overtone.stop(time + dur);
      };

      // Play two elegant rising chime notes
      playTone(now, 880, 0.4);
      playTone(now + 0.12, 1046.5, 0.6); // C6 note
    }
  } catch (e) {
    console.warn("AudioContext failed to play chime:", e);
  }
}

export function SmartTimer({ defaultRestSeconds = 60 }: Props) {
  const [mode, setMode] = useState<"stopwatch" | "countdown">("stopwatch");
  const [isRunning, setIsRunning] = useState(false);
  
  // Time states in milliseconds
  const [elapsedMs, setElapsedMs] = useState(0);
  const [countdownSeconds, setCountdownSeconds] = useState(defaultRestSeconds);
  const [countdownRemainingMs, setCountdownRemainingMs] = useState(defaultRestSeconds * 1000);
  const [hasCompleted, setHasCompleted] = useState(false);

  // References to keep highly accurate absolute time tracking (prevents drift)
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  // Sync countdown remaining if default rest seconds changes
  useEffect(() => {
    if (mode === "countdown" && !isRunning && accumulatedTimeRef.current === 0) {
      setCountdownSeconds(defaultRestSeconds);
      setCountdownRemainingMs(defaultRestSeconds * 1000);
    }
  }, [defaultRestSeconds, mode, isRunning]);

  // Handle ticking loop
  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      
      timerRef.current = setInterval(() => {
        const timePassed = Date.now() - startTimeRef.current;
        const totalCurrentTime = accumulatedTimeRef.current + timePassed;

        if (mode === "stopwatch") {
          setElapsedMs(totalCurrentTime);
        } else {
          const totalRemaining = Math.max(0, countdownSeconds * 1000 - totalCurrentTime);
          setCountdownRemainingMs(totalRemaining);

          // Alert when under 3 seconds (very soft warning tick)
          if (totalRemaining > 0 && totalRemaining <= 3000) {
            const currentSec = Math.ceil(totalRemaining / 1000);
            const prevSec = Math.ceil((totalRemaining + 10) / 1000);
            if (currentSec !== prevSec) {
              playChime("tick");
            }
          }

          if (totalRemaining === 0) {
            setIsRunning(false);
            setHasCompleted(true);
            playChime("complete");
            accumulatedTimeRef.current = 0;
            if (timerRef.current) clearInterval(timerRef.current);
          }
        }
      }, 10); // 10ms tick rate for high-fidelity accuracy
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, countdownSeconds]);

  // Pause action
  const handlePlayPause = () => {
    if (hasCompleted) {
      setHasCompleted(false);
      setCountdownRemainingMs(countdownSeconds * 1000);
    }
    
    if (isRunning) {
      // Accumulate time passed before pausing
      accumulatedTimeRef.current += Date.now() - startTimeRef.current;
      setIsRunning(false);
    } else {
      setIsRunning(true);
    }
  };

  // Reset action
  const handleReset = () => {
    setIsRunning(false);
    accumulatedTimeRef.current = 0;
    setHasCompleted(false);
    if (mode === "stopwatch") {
      setElapsedMs(0);
    } else {
      setCountdownRemainingMs(countdownSeconds * 1000);
    }
  };

  // Toggle Mode action
  const handleToggleMode = () => {
    setIsRunning(false);
    accumulatedTimeRef.current = 0;
    setHasCompleted(false);
    if (mode === "stopwatch") {
      setMode("countdown");
      setCountdownRemainingMs(countdownSeconds * 1000);
    } else {
      setMode("stopwatch");
      setElapsedMs(0);
    }
  };

  // Adjust countdown time
  const handleAdjustTime = (amountSeconds: number) => {
    if (mode !== "countdown" || isRunning) return;
    const newSeconds = Math.max(5, countdownSeconds + amountSeconds);
    setCountdownSeconds(newSeconds);
    setCountdownRemainingMs(newSeconds * 1000);
    setHasCompleted(false);
  };

  // Helper: Format milliseconds into 00:00.0 (MM:SS.d)
  const formatTime = (totalMs: number) => {
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const tenths = Math.floor((totalMs % 1000) / 100);

    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(minutes)}:${pad(seconds)}.${tenths}`;
  };

  // Circular progress ring math
  const activeTime = mode === "stopwatch" ? elapsedMs : countdownRemainingMs;
  const maxTime = mode === "stopwatch" ? 60000 : countdownSeconds * 1000; // Stopwatch loops circle every 60s
  const percentComplete = maxTime > 0 ? (activeTime % maxTime) / maxTime : 0;
  
  // Circumference calculations
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  // For countdown: ring empties. For stopwatch: ring fills.
  const strokeDashoffset = mode === "countdown"
    ? circumference - percentComplete * circumference
    : circumference * (1 - percentComplete);

  return (
    <div
      className="border bg-gradient-to-b from-[var(--bg-2)] to-[var(--bg-3)] shadow-xl relative overflow-hidden"
      style={{
        border: "var(--border-subtle)",
        borderRadius: "16px",
        padding: "16px 20px",
        transition: "border-color 200ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-default)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-subtle)";
      }}
    >
      {/* Background ambient glowing gradient */}
      <div 
        className="absolute -right-12 -top-12 w-24 h-24 rounded-full pointer-events-none opacity-[0.03] blur-2xl"
        style={{
          background: hasCompleted ? "var(--color-danger)" : "var(--color-accent)",
          transition: "background-color 300ms ease",
        }}
      />

      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          {mode === "stopwatch" ? (
            <Activity className="h-4 w-4 text-[var(--color-accent)]" />
          ) : (
            <Timer className="h-4 w-4 text-[var(--color-accent)]" />
          )}
          <span 
            className="text-[11px] font-bold uppercase tracking-[1px] text-[var(--color-text-secondary)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {mode === "stopwatch" ? "Active Set Stopwatch" : "Rest Countdown"}
          </span>
        </div>

        {/* Mode Toggle Button */}
        <button
          type="button"
          onClick={handleToggleMode}
          className="border bg-[var(--bg-1)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.5px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
          style={{
            border: "var(--border-subtle)",
            borderRadius: "6px",
            fontFamily: "var(--font-body)",
            cursor: "pointer",
          }}
        >
          Switch to {mode === "stopwatch" ? "Timer" : "Stopwatch"}
        </button>
      </div>

      <div className="flex items-center gap-6">
        {/* Glowing Circular Clock display */}
        <div className="relative h-[120px] w-[120px] shrink-0 flex items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" width="120" height="120" viewBox="0 0 120 120">
            {/* Background Track Ring */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke="var(--bg-1)"
              strokeWidth="5"
            />
            {/* Glowing Active Ring */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="transparent"
              stroke={hasCompleted ? "var(--color-danger)" : "var(--color-accent)"}
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: isRunning ? "none" : "stroke-dashoffset 200ms ease, stroke 300ms ease",
                filter: "drop-shadow(0 0 2px rgba(201, 168, 122, 0.25))",
              }}
            />
          </svg>

          {/* Time digits display */}
          <div className="text-center z-10 select-none">
            <span 
              className={`font-mono text-[19px] font-bold tracking-[0.5px] transition-colors duration-300 ${
                hasCompleted ? "text-[var(--color-danger)] animate-pulse" : "text-[var(--color-text-primary)]"
              }`}
            >
              {formatTime(activeTime)}
            </span>
            {hasCompleted && (
              <div className="text-[8px] font-extrabold uppercase tracking-[0.5px] text-[var(--color-danger)] mt-0.5">
                Rest Done!
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="flex-1 flex flex-col gap-2.5">
          {/* Quick Adjust Buttons (Only visible in Countdown mode) */}
          {mode === "countdown" && (
            <div className="flex gap-2">
              <button
                type="button"
                disabled={isRunning}
                onClick={() => handleAdjustTime(-10)}
                className={`flex-1 border bg-[var(--bg-2)] py-1 flex items-center justify-center gap-0.5 text-[9px] font-bold text-[var(--color-text-secondary)] transition-colors ${
                  isRunning ? "opacity-35 cursor-not-allowed" : "hover:text-[var(--color-text-primary)] cursor-pointer"
                }`}
                style={{ border: "var(--border-subtle)", borderRadius: "6px" }}
              >
                <Minus className="h-2.5 w-2.5" />
                10s
              </button>
              <button
                type="button"
                disabled={isRunning}
                onClick={() => handleAdjustTime(10)}
                className={`flex-1 border bg-[var(--bg-2)] py-1 flex items-center justify-center gap-0.5 text-[9px] font-bold text-[var(--color-text-secondary)] transition-colors ${
                  isRunning ? "opacity-35 cursor-not-allowed" : "hover:text-[var(--color-text-primary)] cursor-pointer"
                }`}
                style={{ border: "var(--border-subtle)", borderRadius: "6px" }}
              >
                <Plus className="h-2.5 w-2.5" />
                10s
              </button>
            </div>
          )}

          {/* Start/Pause and Reset Controls */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handlePlayPause}
              className="flex-[2] py-2 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.5px] transition-colors cursor-pointer"
              style={{
                borderRadius: "8px",
                background: isRunning ? "var(--bg-1)" : "var(--color-accent)",
                color: isRunning ? "var(--color-text-primary)" : "var(--bg-3)",
                border: isRunning ? "var(--border-subtle)" : "1px solid var(--color-accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              {isRunning ? (
                <>
                  <Pause className="h-3.5 w-3.5" fill="currentColor" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-3.5 w-3.5" fill="currentColor" />
                  Start
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="flex-1 border bg-[var(--bg-2)] py-2 flex items-center justify-center gap-1 text-[11px] font-semibold text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] cursor-pointer"
              style={{
                border: "var(--border-subtle)",
                borderRadius: "8px",
                fontFamily: "var(--font-body)",
              }}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
