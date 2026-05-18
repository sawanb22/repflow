// ═══════════════════════════════════════════════════════
// RepFlow Database Types
// Maps 1:1 to Supabase table schemas
// ═══════════════════════════════════════════════════════

// ── Auth (from Supabase) ──────────────────────────────

export type AuthUser = {
  id: string;
  email: string;
  email_confirmed_at: string | null;
  created_at: string;
};

// ── Users Profile ─────────────────────────────────────

export type UserProfile = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
};

// ── User Preferences (from onboarding) ────────────────

export type WorkoutLocation = "home" | "gym" | "both";
export type Goal = "lose_fat" | "build_muscle" | "stay_active";
export type UserEquipment = "nothing_yet" | "dumbbells" | "resistance_bands" | "full_gym";

export type TrainingStyle = "home" | "gym" | "hybrid" | "yoga" | "breathwork";
export type ExperienceLevel = "beginner" | "intermediate" | "advanced";
export type FitnessGoal = "lose_fat" | "build_muscle" | "stay_active" | "improve_flexibility" | "reduce_stress";
export type Limitation = "knee_pain" | "back_pain" | "shoulder_pain" | "limited_mobility" | "recovering_injury" | "pregnancy";

export type UserPreferences = {
  id: string;
  user_id: string;
  // Legacy (deprecated, kept for backward compat)
  workout_location: WorkoutLocation | null;
  goal: Goal | null;
  equipment: UserEquipment | null;
  // V2 fields
  fitness_goals: FitnessGoal[];
  training_style: TrainingStyle | null;
  equipment_list: string[];
  workout_days_per_week: number;
  workout_duration_min: number;
  experience_level: ExperienceLevel | null;
  limitations: Limitation[];
  onboarding_done: boolean;
};

// ── Categories ────────────────────────────────────────

export type Category = {
  id: string;
  name: string;
  slug: string;
  created_at: string;
};

// ── Equipment ─────────────────────────────────────────

export type Equipment = {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  created_at: string;
};

// ── Exercises ─────────────────────────────────────────

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Exercise = {
  id: string;
  name: string;
  slug: string;
  category_id: string | null;
  equipment_id: string | null;
  difficulty: Difficulty;
  primary_muscles: string[];
  secondary_muscles: string[];
  sets: number;
  reps: string;
  rest_time: number;           // seconds
  instructions: string;
  video_url: string | null;
  video_url_side: string | null;
  video_url_front: string | null;
  is_published: boolean;
  created_at: string;
};

// ── Joined / Expanded Types ───────────────────────────

export type ExerciseWithRelations = Exercise & {
  category: Category | null;
  equipment: Equipment | null;
};

// ── Supabase Database Schema (for use with supabase.from<...>) ──

export interface Database {
  public: {
    Tables: {
      users_profile: {
        Row: UserProfile;
        Insert: Omit<UserProfile, "id" | "created_at">;
        Update: Partial<Omit<UserProfile, "id" | "created_at">>;
      };
      user_preferences: {
        Row: UserPreferences;
        Insert: Omit<UserPreferences, "id">;
        Update: Partial<Omit<UserPreferences, "id">>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, "id" | "created_at">;
        Update: Partial<Omit<Category, "id" | "created_at">>;
      };
      equipment: {
        Row: Equipment;
        Insert: Omit<Equipment, "id" | "created_at">;
        Update: Partial<Omit<Equipment, "id" | "created_at">>;
      };
      exercises: {
        Row: Exercise;
        Insert: Omit<Exercise, "id" | "created_at">;
        Update: Partial<Omit<Exercise, "id" | "created_at">>;
      };
    };
  };
}
