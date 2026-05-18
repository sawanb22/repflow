-- Remap exercise slugs and names to match /public/exercises/ image files

UPDATE exercises SET slug = 'banded-hip-extension',    name = 'Banded Hip Extension'     WHERE slug = 'banded-lateral-walk';
UPDATE exercises SET slug = 'kettlebell-goblet-squat', name = 'Kettlebell Goblet Squat'   WHERE slug = 'kettlebell-goblet-curl';
UPDATE exercises SET slug = 'banded-squat',            name = 'Banded Squat'              WHERE slug = 'lunge';
UPDATE exercises SET slug = 'bicep-curl',              name = 'Bicep Curl'                WHERE slug = 'burpee';
UPDATE exercises SET slug = 'boxer-step-jump-rope',    name = 'Boxer Step Jump Rope'      WHERE slug = 'mountain-climber';
UPDATE exercises SET slug = 'dumbbell-romanian-deadlift', name = 'Dumbbell Romanian Deadlift' WHERE slug = 'dumbbell-row';
UPDATE exercises SET slug = 'high-knees-jump-rope',    name = 'High Knees Jump Rope'      WHERE slug = 'dumbbell-shoulder-press';
UPDATE exercises SET slug = 'kettlebell-high-pull',    name = 'Kettlebell High Pull'      WHERE slug = 'glute-bridge';
