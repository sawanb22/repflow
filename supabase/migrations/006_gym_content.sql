BEGIN;

INSERT INTO categories (name, slug)
SELECT 'Gym Workout', 'gym-workout'
WHERE NOT EXISTS (
  SELECT 1 FROM categories WHERE slug = 'gym-workout'
);

INSERT INTO equipment (name, slug, category_id)
SELECT 'Barbell', 'barbell', (SELECT id FROM categories WHERE slug = 'gym-workout')
WHERE NOT EXISTS (
  SELECT 1 FROM equipment WHERE slug = 'barbell'
);

INSERT INTO equipment (name, slug, category_id)
SELECT 'Cable Machine', 'cable-machine', (SELECT id FROM categories WHERE slug = 'gym-workout')
WHERE NOT EXISTS (
  SELECT 1 FROM equipment WHERE slug = 'cable-machine'
);

INSERT INTO equipment (name, slug, category_id)
SELECT 'Smith Machine', 'smith-machine', (SELECT id FROM categories WHERE slug = 'gym-workout')
WHERE NOT EXISTS (
  SELECT 1 FROM equipment WHERE slug = 'smith-machine'
);

INSERT INTO equipment (name, slug, category_id)
SELECT 'Bench Press Machine', 'bench-press-machine', (SELECT id FROM categories WHERE slug = 'gym-workout')
WHERE NOT EXISTS (
  SELECT 1 FROM equipment WHERE slug = 'bench-press-machine'
);

INSERT INTO equipment (name, slug, category_id)
SELECT 'Leg Press Machine', 'leg-press-machine', (SELECT id FROM categories WHERE slug = 'gym-workout')
WHERE NOT EXISTS (
  SELECT 1 FROM equipment WHERE slug = 'leg-press-machine'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Barbell Bench Press',
  'barbell-bench-press',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'barbell'),
  'intermediate',
  ARRAY['chest','shoulders','triceps'],
  ARRAY['upper chest','core'],
  4,
  '6-10',
  90,
  $$1. Lie flat on the bench with eyes under the bar
2. Plant your feet firmly and grip the bar just outside shoulder width
3. Unrack the bar and lower it to mid-chest with control
4. Press the bar straight up until your elbows are locked out
5. Keep your shoulder blades pinned to the bench the whole time$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'barbell-bench-press'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Incline Dumbbell Press',
  'incline-dumbbell-press',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'dumbbells'),
  'intermediate',
  ARRAY['upper chest','shoulders','triceps'],
  ARRAY['core','forearms'],
  3,
  '8-12',
  75,
  $$1. Set the bench to a slight incline and hold dumbbells at shoulder level
2. Press the weights up over your upper chest
3. Keep your wrists stacked over your elbows
4. Lower both dumbbells until they reach chest height
5. Drive them back up without bouncing at the bottom$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'incline-dumbbell-press'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Cable Fly',
  'cable-fly',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'cable-machine'),
  'beginner',
  ARRAY['chest'],
  ARRAY['front deltoids','biceps'],
  3,
  '10-15',
  60,
  $$1. Stand centered between the pulleys with handles in both hands
2. Step slightly forward and keep a soft bend in your elbows
3. Bring your hands together in front of your chest in a hugging motion
4. Squeeze your chest hard at the front
5. Return slowly until you feel a stretch through the chest$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'cable-fly'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Lat Pulldown',
  'lat-pulldown',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'cable-machine'),
  'beginner',
  ARRAY['lats','upper back'],
  ARRAY['biceps','rear deltoids'],
  3,
  '8-12',
  75,
  $$1. Sit tall with your thighs secured under the pad
2. Take a wide grip on the bar and brace your core
3. Pull the bar toward the top of your chest by driving your elbows down
4. Pause briefly while squeezing your back
5. Let the bar rise under control without shrugging your shoulders$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'lat-pulldown'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Barbell Row',
  'barbell-row',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'barbell'),
  'intermediate',
  ARRAY['lats','rhomboids','middle back'],
  ARRAY['biceps','hamstrings','lower back'],
  4,
  '6-10',
  90,
  $$1. Hinge at the hips with the bar hanging below your knees
2. Keep your back flat and chest proud
3. Row the bar toward your lower ribs by driving your elbows back
4. Lower the bar until your arms are straight again
5. Stay braced and avoid jerking the weight with your torso$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'barbell-row'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Cable Row',
  'cable-row',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'cable-machine'),
  'beginner',
  ARRAY['middle back','lats','rhomboids'],
  ARRAY['biceps','rear deltoids'],
  3,
  '10-12',
  75,
  $$1. Sit tall and grab the handle with both hands
2. Drive your feet into the platform and brace your torso
3. Pull the handle toward your lower abdomen
4. Squeeze your shoulder blades together at the finish
5. Extend your arms forward with control on every rep$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'cable-row'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Overhead Press',
  'overhead-press',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'barbell'),
  'intermediate',
  ARRAY['shoulders','triceps'],
  ARRAY['upper chest','core'],
  4,
  '6-8',
  90,
  $$1. Start with the bar resting across your upper chest
2. Squeeze your glutes and brace your core before each rep
3. Press the bar overhead in a straight line
4. Move your head slightly back and then through as the bar passes
5. Lower to the start position under control$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'overhead-press'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Lateral Raise',
  'lateral-raise',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'dumbbells'),
  'beginner',
  ARRAY['side deltoids'],
  ARRAY['traps','upper back'],
  3,
  '12-15',
  45,
  $$1. Stand tall with a dumbbell in each hand by your sides
2. Keep a slight bend in your elbows
3. Raise your arms out to shoulder height
4. Pause briefly without shrugging your shoulders up
5. Lower slowly back to the start$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'lateral-raise'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Barbell Squat',
  'barbell-squat',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'barbell'),
  'intermediate',
  ARRAY['quadriceps','glutes','hamstrings'],
  ARRAY['core','lower back','calves'],
  4,
  '5-8',
  120,
  $$1. Set the bar across your upper back and stand with feet shoulder width apart
2. Brace your core and keep your chest lifted
3. Sit your hips down and back until your thighs reach depth
4. Drive through your whole foot to stand back up
5. Keep your knees tracking over your toes throughout$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'barbell-squat'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Leg Press',
  'leg-press',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'leg-press-machine'),
  'beginner',
  ARRAY['quadriceps','glutes'],
  ARRAY['hamstrings','calves'],
  3,
  '10-15',
  75,
  $$1. Sit into the machine with your feet shoulder width on the platform
2. Lower the safety handles and brace your core
3. Bend your knees until they reach a comfortable depth
4. Press the platform away through your heels and midfoot
5. Stop just short of locking your knees at the top$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'leg-press'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Romanian Deadlift',
  'romanian-deadlift',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'barbell'),
  'intermediate',
  ARRAY['hamstrings','glutes'],
  ARRAY['lower back','forearms','core'],
  4,
  '8-10',
  90,
  $$1. Hold the bar at hip height with your feet hip width apart
2. Unlock your knees and push your hips back
3. Lower the bar along your legs while keeping your back flat
4. Stop when you feel a strong hamstring stretch
5. Drive your hips forward to return to standing$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'romanian-deadlift'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Leg Curl',
  'leg-curl',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'leg-press-machine'),
  'beginner',
  ARRAY['hamstrings'],
  ARRAY['calves','glutes'],
  3,
  '10-15',
  60,
  $$1. Adjust the machine so the pad rests above your heels
2. Brace your torso against the bench or seat
3. Curl the pad toward your glutes by squeezing your hamstrings
4. Pause briefly at the top without lifting your hips
5. Lower back to the start with control$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'leg-curl'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Barbell Curl',
  'barbell-curl',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'barbell'),
  'beginner',
  ARRAY['biceps'],
  ARRAY['forearms','front deltoids'],
  3,
  '10-12',
  60,
  $$1. Stand tall with the bar resting against your thighs
2. Keep your elbows pinned near your sides
3. Curl the bar toward shoulder height without swinging
4. Squeeze your biceps at the top
5. Lower the bar slowly until your arms are fully extended$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'barbell-curl'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Cable Tricep Pushdown',
  'cable-tricep-pushdown',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'cable-machine'),
  'beginner',
  ARRAY['triceps'],
  ARRAY['forearms','shoulders'],
  3,
  '10-15',
  45,
  $$1. Stand tall and grip the handle with your elbows tucked in
2. Start with your forearms slightly above parallel
3. Press the handle down until your arms are straight
4. Squeeze your triceps hard at the bottom
5. Return slowly without letting your elbows flare out$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'cable-tricep-pushdown'
);

INSERT INTO exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  video_url,
  video_url_side,
  video_url_front,
  is_published
)
SELECT
  'Cable Crunch',
  'cable-crunch',
  (SELECT id FROM categories WHERE slug = 'gym-workout'),
  (SELECT id FROM equipment WHERE slug = 'cable-machine'),
  'beginner',
  ARRAY['abs'],
  ARRAY['obliques','hip flexors'],
  3,
  '12-15',
  45,
  $$1. Kneel facing the cable stack with the rope held beside your head
2. Brace your hips and keep them mostly still
3. Curl your ribcage down toward your hips
4. Exhale and squeeze your abs hard at the bottom
5. Return slowly until your torso is upright again$$,
  NULL,
  NULL,
  NULL,
  false
WHERE NOT EXISTS (
  SELECT 1 FROM exercises WHERE slug = 'cable-crunch'
);

COMMIT;
