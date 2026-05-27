UPDATE exercises
SET is_published = true
WHERE slug IN (
  'barbell-bench-press',
  'incline-dumbbell-press',
  'cable-fly',
  'lat-pulldown',
  'barbell-row',
  'cable-row',
  'overhead-press',
  'lateral-raise',
  'barbell-squat',
  'leg-press',
  'romanian-deadlift',
  'leg-curl',
  'barbell-curl',
  'cable-tricep-pushdown',
  'cable-crunch'
);
