"use client";

import type { ComponentType, SVGProps } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Dumbbell, Search, SlidersHorizontal, User } from "lucide-react";
import { ExerciseMediaV2 } from "@/components/ui/ExerciseMediaV2";
import { getWorkoutLocationOptionState } from "@/lib/browse-workout-location";
import type { Category, Exercise, Equipment, WorkoutLocation } from "@/types/database";

type Props = {
  equipment: Equipment[];
  exercises: Exercise[];
  categories: Category[];
  defaultWorkoutLocation: WorkoutLocation;
};

type FilterChip = {
  label: string;
  key: string;
  matches: (equipment: Equipment | null) => boolean;
};

const filterChips: FilterChip[] = [
  { label: "All", key: "all", matches: () => true },
  { label: "Bodyweight", key: "bodyweight", matches: (equipment) => equipment?.slug === "bodyweight" },
  { label: "Dumbbells", key: "dumbbells", matches: (equipment) => equipment?.slug === "dumbbells" },
  { label: "Kettlebell", key: "kettlebell", matches: (equipment) => equipment?.slug === "kettlebell" },
  { label: "Barbell", key: "barbell", matches: (equipment) => equipment?.slug === "barbell" },
  {
    label: "Resistance Band",
    key: "resistance-band",
    matches: (equipment) => equipment?.slug === "resistance-bands" || equipment?.slug === "resistance-band",
  },
  { label: "Cable", key: "cable", matches: (equipment) => equipment?.slug === "cable-machine" },
  {
    label: "Machine",
    key: "machine",
    matches: (equipment) => (
      equipment?.slug === "smith-machine" ||
      equipment?.slug === "bench-press-machine" ||
      equipment?.slug === "leg-press-machine"
    ),
  },
];

const workoutLocationOptions: { label: string; value: WorkoutLocation }[] = [
  { label: "Home", value: "home" },
  { label: "Gym", value: "gym" },
  { label: "Both", value: "both" },
];

const difficultyClasses = {
  beginner: "bg-[rgba(77,200,123,0.10)] text-[var(--color-success)]",
  intermediate: "bg-[rgba(201,168,122,0.10)] text-[var(--color-accent)]",
  advanced: "bg-[rgba(224,101,96,0.10)] text-[var(--color-danger)]",
} as const;

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function equipmentIcon(equipment: Equipment | null): ComponentType<SVGProps<SVGSVGElement>> {
  return equipment?.slug === "bodyweight" ? User : Dumbbell;
}

function resolveWorkoutLocation(category: Category | null): WorkoutLocation {
  return category?.slug === "gym-workout" ? "gym" : "home";
}

function ExerciseArtworkFallback() {
  return (
    <svg viewBox="0 0 210 145" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect width="210" height="145" fill="var(--bg-3)" />
      <path d="M65 100 Q90 55 105 70 Q120 85 145 40" fill="none" stroke="rgba(201,168,122,0.22)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="105" cy="70" r="5" fill="rgba(201,168,122,0.22)" />
      <circle cx="145" cy="40" r="7" fill="rgba(201,168,122,0.35)" />
      <circle cx="145" cy="40" r="3.5" fill="rgba(201,168,122,0.65)" />
      <circle cx="65" cy="100" r="5" fill="rgba(201,168,122,0.12)" />
    </svg>
  );
}

export function BrowseContent({ equipment, exercises, categories, defaultWorkoutLocation }: Props) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedChip, setSelectedChip] = useState<string>("all");
  const [selectedWorkoutLocation, setSelectedWorkoutLocation] = useState<WorkoutLocation>(defaultWorkoutLocation);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 150);

    return () => window.clearTimeout(timeout);
  }, [query]);

  const equipmentById = useMemo(
    () => new Map(equipment.map((item) => [item.id, item])),
    [equipment],
  );

  const categoriesById = useMemo(
    () => new Map(categories.map((item) => [item.id, item])),
    [categories],
  );

  const filteredExercises = useMemo(() => {
    const activeChip = filterChips.find((chip) => chip.key === selectedChip) ?? filterChips[0];
    const normalizedQuery = normalize(debouncedQuery);

    return exercises.filter((exercise) => {
      const matchedEquipment = equipmentById.get(exercise.equipment_id ?? "") ?? null;
      const matchedCategory = categoriesById.get(exercise.category_id ?? "") ?? null;
      const chipMatches = activeChip.matches(matchedEquipment);
      const exerciseWorkoutLocation = resolveWorkoutLocation(matchedCategory);
      const locationMatches = selectedWorkoutLocation === "both" || exerciseWorkoutLocation === selectedWorkoutLocation;

      if (!chipMatches || !locationMatches) return false;
      if (!normalizedQuery) return true;

      const searchableText = [
        exercise.name,
        exercise.difficulty,
        matchedEquipment?.name ?? "",
        matchedCategory?.name ?? "",
        ...exercise.primary_muscles,
        ...exercise.secondary_muscles,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [categoriesById, debouncedQuery, equipmentById, exercises, selectedChip, selectedWorkoutLocation]);

  return (
    <div className="px-8 py-6">
      <div className="mb-4 flex flex-wrap gap-[7px]">
        {workoutLocationOptions.map((option) => {
          const { active, disabled } = getWorkoutLocationOptionState(selectedWorkoutLocation, option.value);

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              disabled={disabled}
              onClick={() => setSelectedWorkoutLocation(option.value)}
              className="border text-[13px] font-medium"
              style={{
                padding: "7px 15px",
                borderRadius: "7px",
                border: active ? "var(--border-accent)" : "var(--border-subtle)",
                background: active ? "var(--color-accent-dim)" : "var(--bg-2)",
                color: active ? "var(--color-accent)" : "var(--color-text-secondary)",
                opacity: disabled ? 0.45 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
                fontFamily: "var(--font-body)",
                transition: "var(--transition-fast)",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div
        className="mb-[14px] flex h-[44px] items-center gap-[10px] border bg-[var(--bg-2)] px-[14px]"
        style={{ border: "var(--border-subtle)", borderRadius: "10px" }}
      >
        <Search className="h-[18px] w-[18px] text-[var(--color-text-muted)]" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search exercises, muscles, equipment…"
          aria-label="Search exercises"
          className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus-visible:outline-none"
          style={{ fontFamily: "var(--font-body)" }}
        />
        <SlidersHorizontal className="h-[16px] w-[16px] cursor-pointer text-[var(--color-text-muted)]" />
      </div>

      <div className="mb-4 flex flex-wrap gap-[7px]">
        {filterChips.map((chip) => {
          const active = chip.key === selectedChip;

          return (
            <button
              key={chip.key}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedChip(chip.key)}
              className="border text-[13px] font-medium"
              style={{
                padding: "7px 15px",
                borderRadius: "7px",
                border: active ? "var(--border-accent)" : "var(--border-subtle)",
                background: active ? "var(--color-accent-dim)" : "var(--bg-2)",
                color: active ? "var(--color-accent)" : "var(--color-text-secondary)",
                fontFamily: "var(--font-body)",
                transition: "var(--transition-fast)",
              }}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {filteredExercises.length === 0 ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[14px] border bg-[var(--bg-2)] text-center"
          style={{ border: "var(--border-subtle)" }}
        >
          <p className="text-[14px] text-[var(--color-text-secondary)]">No exercises found</p>
          <p className="mt-1 text-[12px] text-[var(--color-text-muted)]">
            Try a different search or filter chip.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-[14px]">
          {filteredExercises.map((exercise) => {
            const matchedEquipment = equipmentById.get(exercise.equipment_id ?? "") ?? null;
            const EquipmentIcon = equipmentIcon(matchedEquipment);

            return (
              <Link
                key={exercise.id}
                href={`/home/exercise/${exercise.slug}`}
                className="overflow-hidden border bg-[var(--bg-2)]"
                style={{
                  border: "var(--border-subtle)",
                  borderRadius: "14px",
                  transition: "transform 200ms ease-out, border-color 200ms ease-out",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.border = "var(--border-default)";
                  event.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.border = "var(--border-subtle)";
                  event.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <ExerciseMediaV2
                  slug={exercise.slug}
                  name={exercise.name}
                  videoUrl={null}
                  mode="image-first"
                  alt={exercise.name}
                  sizes="(min-width: 1024px) 210px, (min-width: 768px) 33vw, 100vw"
                  className="h-[145px]"
                  fallback={<ExerciseArtworkFallback />}
                />
                <div style={{ padding: "14px 15px" }}>
                  <div className="mb-[9px] text-[14px] font-semibold text-[var(--color-text-primary)]">
                    {exercise.name}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-[5px] text-[11px] font-medium text-[var(--color-text-muted)]">
                      <EquipmentIcon className="h-[13px] w-[13px]" />
                      {matchedEquipment?.name ?? "Bodyweight"}
                    </span>
                    <span
                      className={`inline-block rounded-[4px] px-[8px] py-[3px] text-[10px] font-bold uppercase ${difficultyClasses[exercise.difficulty]}`}
                      style={{ letterSpacing: "0.5px" }}
                    >
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
