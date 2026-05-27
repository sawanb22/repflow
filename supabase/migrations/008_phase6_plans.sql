BEGIN;

CREATE TABLE IF NOT EXISTS workout_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  days JSONB NOT NULL DEFAULT '{}'::jsonb,
  is_active BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS workout_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES workout_plans(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'in_progress' NOT NULL,
  started_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  completed_at TIMESTAMPTZ,
  duration_minutes INTEGER,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  CONSTRAINT workout_sessions_status_check CHECK (status IN ('in_progress', 'completed', 'abandoned'))
);

CREATE TABLE IF NOT EXISTS session_exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES workout_sessions(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE NOT NULL,
  order_index INTEGER NOT NULL,
  sets_done INTEGER DEFAULT 0 NOT NULL,
  reps_done TEXT,
  weight TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS user_streaks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  current_streak INTEGER DEFAULT 0 NOT NULL,
  longest_streak INTEGER DEFAULT 0 NOT NULL,
  last_workout_date DATE,
  total_workouts INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS exercise_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exercise_id UUID REFERENCES exercises(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, exercise_id)
);

CREATE INDEX IF NOT EXISTS workout_plans_user_active_idx ON workout_plans(user_id, is_active);
CREATE UNIQUE INDEX IF NOT EXISTS workout_plans_one_active_idx ON workout_plans(user_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS workout_sessions_user_started_idx ON workout_sessions(user_id, started_at DESC);
CREATE INDEX IF NOT EXISTS workout_sessions_plan_id_idx ON workout_sessions(plan_id);
CREATE INDEX IF NOT EXISTS workout_sessions_status_idx ON workout_sessions(status);
CREATE INDEX IF NOT EXISTS session_exercises_session_order_idx ON session_exercises(session_id, order_index);
CREATE INDEX IF NOT EXISTS session_exercises_exercise_id_idx ON session_exercises(exercise_id);
CREATE INDEX IF NOT EXISTS user_streaks_user_id_idx ON user_streaks(user_id);
CREATE INDEX IF NOT EXISTS exercise_favorites_user_id_idx ON exercise_favorites(user_id);
CREATE INDEX IF NOT EXISTS exercise_favorites_exercise_id_idx ON exercise_favorites(exercise_id);

ALTER TABLE workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_favorites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own plans" ON workout_plans;
CREATE POLICY "Users can read own plans"
  ON workout_plans FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own plans" ON workout_plans;
CREATE POLICY "Users can insert own plans"
  ON workout_plans FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own plans" ON workout_plans;
CREATE POLICY "Users can update own plans"
  ON workout_plans FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own plans" ON workout_plans;
CREATE POLICY "Users can delete own plans"
  ON workout_plans FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own sessions" ON workout_sessions;
CREATE POLICY "Users can read own sessions"
  ON workout_sessions FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own sessions" ON workout_sessions;
CREATE POLICY "Users can insert own sessions"
  ON workout_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own sessions" ON workout_sessions;
CREATE POLICY "Users can update own sessions"
  ON workout_sessions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own sessions" ON workout_sessions;
CREATE POLICY "Users can delete own sessions"
  ON workout_sessions FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own session exercises" ON session_exercises;
CREATE POLICY "Users can read own session exercises"
  ON session_exercises FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM workout_sessions
      WHERE workout_sessions.id = session_exercises.session_id
        AND workout_sessions.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can insert own session exercises" ON session_exercises;
CREATE POLICY "Users can insert own session exercises"
  ON session_exercises FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM workout_sessions
      WHERE workout_sessions.id = session_exercises.session_id
        AND workout_sessions.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can update own session exercises" ON session_exercises;
CREATE POLICY "Users can update own session exercises"
  ON session_exercises FOR UPDATE
  USING (
    EXISTS (
      SELECT 1
      FROM workout_sessions
      WHERE workout_sessions.id = session_exercises.session_id
        AND workout_sessions.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1
      FROM workout_sessions
      WHERE workout_sessions.id = session_exercises.session_id
        AND workout_sessions.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can delete own session exercises" ON session_exercises;
CREATE POLICY "Users can delete own session exercises"
  ON session_exercises FOR DELETE
  USING (
    EXISTS (
      SELECT 1
      FROM workout_sessions
      WHERE workout_sessions.id = session_exercises.session_id
        AND workout_sessions.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can read own streak" ON user_streaks;
CREATE POLICY "Users can read own streak"
  ON user_streaks FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own streak" ON user_streaks;
CREATE POLICY "Users can insert own streak"
  ON user_streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own streak" ON user_streaks;
CREATE POLICY "Users can update own streak"
  ON user_streaks FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own streak" ON user_streaks;
CREATE POLICY "Users can delete own streak"
  ON user_streaks FOR DELETE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own favorites" ON exercise_favorites;
CREATE POLICY "Users can read own favorites"
  ON exercise_favorites FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own favorites" ON exercise_favorites;
CREATE POLICY "Users can insert own favorites"
  ON exercise_favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own favorites" ON exercise_favorites;
CREATE POLICY "Users can delete own favorites"
  ON exercise_favorites FOR DELETE
  USING (auth.uid() = user_id);

COMMIT;
