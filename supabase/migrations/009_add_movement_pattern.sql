BEGIN;

ALTER TABLE public.exercises
  ADD COLUMN IF NOT EXISTS movement_pattern text,
  ADD COLUMN IF NOT EXISTS tips text,
  ADD COLUMN IF NOT EXISTS common_mistakes text,
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

ALTER TABLE public.exercises
  ALTER COLUMN rest_time DROP DEFAULT;

ALTER TABLE public.exercises
  ALTER COLUMN rest_time TYPE text
  USING CASE
    WHEN rest_time IS NULL THEN NULL
    ELSE rest_time::text || 's'
  END;

UPDATE public.exercises
SET updated_at = created_at
WHERE updated_at IS NULL;

ALTER TABLE public.exercises
  ALTER COLUMN updated_at SET NOT NULL;

COMMIT;
