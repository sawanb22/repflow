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
  name: string | null;
  avatar_url?: string | null;
  created_at: string;
};

// ── User Preferences (from onboarding) ────────────────

export type WorkoutLocation = "home" | "gym" | "both";
export type Goal = "lose_fat" | "build_muscle" | "stay_active";
export type UserEquipment = "bodyweight" | "nothing_yet" | "dumbbells" | "resistance_bands" | "kettlebell" | "jump_rope" | "full_gym";

export type TrainingStyle = "home" | "gym" | "hybrid" | "yoga" | "breathwork";
export type ExperienceLevel = "beginner" | "intermediate" | "advanced";
export type FitnessGoal = "lose_fat" | "build_muscle" | "stay_active" | "improve_flexibility" | "reduce_stress";
export type Limitation = "knee_pain" | "back_pain" | "shoulder_pain" | "limited_mobility" | "recovering_injury" | "pregnancy";

export type UserPreferences = {
  id: string;
  user_id: string;
  workout_location: WorkoutLocation | null;
  goal: Goal | null;
  equipment: UserEquipment | null;
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
  movement_pattern: string | null;
  primary_muscles: string[];
  secondary_muscles: string[];
  sets: number;
  reps: string;
  rest_time: string;
  instructions: string;
  tips: string | null;
  common_mistakes: string | null;
  image_url: string | null;
  video_url: string | null;
  video_url_side: string | null;
  video_url_front: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ExerciseWithRelations = Exercise & {
  category: Category | null;
  equipment: Equipment | null;
};

// ── Workout Plans / Sessions ──────────────────────────

export type PlanDayKey = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type SessionStatus = "in_progress" | "completed" | "abandoned";

export type WorkoutPlanExercise = {
  exercise_id: string;
  order: number;
  sets: number;
  reps: string;
  rest_seconds: number;
};

export type WorkoutPlanDay = {
  is_rest: boolean;
  exercises: WorkoutPlanExercise[];
};

export type WorkoutPlanDays = Partial<Record<PlanDayKey, WorkoutPlanDay>>;

export type WorkoutPlan = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  days: WorkoutPlanDays;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type WorkoutSession = {
  id: string;
  user_id: string;
  plan_id: string | null;
  status: SessionStatus;
  started_at: string;
  completed_at: string | null;
  duration_minutes: number | null;
  created_at: string;
};

export type SessionExercise = {
  id: string;
  session_id: string;
  exercise_id: string;
  order_index: number;
  sets_done: number;
  reps_done: string | null;
  weight: string | null;
  created_at: string;
};

export type UserStreak = {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_workout_date: string | null;
  total_workouts: number;
  created_at: string;
  updated_at: string;
};

export type ExerciseFavorite = {
  id: string;
  user_id: string;
  exercise_id: string;
  created_at: string;
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
      workout_plans: {
        Row: WorkoutPlan;
        Insert: Omit<WorkoutPlan, "id" | "created_at" | "updated_at"> & Partial<Pick<WorkoutPlan, "is_active" | "description" | "days">>;
        Update: Partial<Omit<WorkoutPlan, "id" | "created_at" | "updated_at">>;
      };
      workout_sessions: {
        Row: WorkoutSession;
        Insert: Omit<WorkoutSession, "id" | "created_at" | "started_at"> & Partial<Pick<WorkoutSession, "status" | "started_at" | "completed_at" | "duration_minutes" | "plan_id">>;
        Update: Partial<Omit<WorkoutSession, "id" | "created_at">>;
      };
      session_exercises: {
        Row: SessionExercise;
        Insert: Omit<SessionExercise, "id" | "created_at" | "sets_done" | "reps_done" | "weight"> & Partial<Pick<SessionExercise, "sets_done" | "reps_done" | "weight">>;
        Update: Partial<Omit<SessionExercise, "id" | "created_at">>;
      };
      user_streaks: {
        Row: UserStreak;
        Insert: Omit<UserStreak, "id" | "created_at" | "updated_at"> & Partial<Pick<UserStreak, "current_streak" | "longest_streak" | "last_workout_date" | "total_workouts">>;
        Update: Partial<Omit<UserStreak, "id" | "created_at" | "updated_at">>;
      };
      exercise_favorites: {
        Row: ExerciseFavorite;
        Insert: Omit<ExerciseFavorite, "id" | "created_at">;
        Update: Partial<Omit<ExerciseFavorite, "id" | "created_at">>;
      };
    };
  };
}
