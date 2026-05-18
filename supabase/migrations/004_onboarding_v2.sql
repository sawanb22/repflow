-- RepFlow Onboarding V2
-- Adds multi-select fields, training style, schedule, experience, limitations
-- Preserves existing columns (backward compatible)

BEGIN;

-- 1. Add new columns (all nullable with sensible defaults)
ALTER TABLE user_preferences
  ADD COLUMN IF NOT EXISTS fitness_goals        TEXT[]    DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS training_style       TEXT,
  ADD COLUMN IF NOT EXISTS equipment_list       TEXT[]    DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS workout_days_per_week INTEGER   DEFAULT 3,
  ADD COLUMN IF NOT EXISTS workout_duration_min  INTEGER   DEFAULT 30,
  ADD COLUMN IF NOT EXISTS experience_level     TEXT,
  ADD COLUMN IF NOT EXISTS limitations          TEXT[]    DEFAULT '{}';

-- 2. Backfill: migrate existing goal -> fitness_goals array
UPDATE user_preferences
  SET fitness_goals = ARRAY[goal]
  WHERE goal IS NOT NULL
    AND (fitness_goals IS NULL OR array_length(fitness_goals, 1) IS NULL);

-- 3. Backfill: migrate existing workout_location -> training_style
UPDATE user_preferences
  SET training_style = workout_location
  WHERE workout_location IS NOT NULL AND training_style IS NULL;

-- 4. Backfill: migrate existing equipment -> equipment_list array
UPDATE user_preferences
  SET equipment_list = ARRAY[equipment]
  WHERE equipment IS NOT NULL
    AND (equipment_list IS NULL OR array_length(equipment_list, 1) IS NULL);

-- 5. Add CHECK constraints
ALTER TABLE user_preferences
  ADD CONSTRAINT check_training_style CHECK (
    training_style IS NULL OR training_style IN ('home', 'gym', 'hybrid', 'yoga', 'breathwork')
  ) NOT VALID,
  ADD CONSTRAINT check_experience_level CHECK (
    experience_level IS NULL OR experience_level IN ('beginner', 'intermediate', 'advanced')
  ) NOT VALID,
  ADD CONSTRAINT check_workout_days CHECK (
    workout_days_per_week IS NULL OR (workout_days_per_week >= 1 AND workout_days_per_week <= 7)
  ) NOT VALID,
  ADD CONSTRAINT check_workout_duration CHECK (
    workout_duration_min IS NULL OR (workout_duration_min >= 10 AND workout_duration_min <= 120)
  ) NOT VALID;

-- 6. Add RLS policies (table had none)
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own preferences" ON user_preferences;
CREATE POLICY "Users can read own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own preferences" ON user_preferences;
CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;
CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

COMMIT;
