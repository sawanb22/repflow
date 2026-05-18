-- Phase 4: Exercise Content Foundation
-- Copy this ENTIRE block into Supabase SQL Editor and run

-- --------------------------------------------------
-- 1. Drop old objects (clean slate from any failed runs)
-- --------------------------------------------------

DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS equipment CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- --------------------------------------------------
-- 2. Create tables
-- --------------------------------------------------

CREATE TABLE categories (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT NOT NULL,
  slug       TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cat_read" ON categories FOR SELECT USING (true);

CREATE TABLE equipment (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
CREATE POLICY "eq_read" ON equipment FOR SELECT USING (true);

CREATE TABLE exercises (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name              TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,
  category_id       UUID REFERENCES categories(id) ON DELETE SET NULL,
  equipment_id      UUID REFERENCES equipment(id) ON DELETE SET NULL,
  difficulty        TEXT NOT NULL CHECK (difficulty IN ('beginner','intermediate','advanced')),
  primary_muscles   TEXT[] NOT NULL DEFAULT '{}',
  secondary_muscles TEXT[] NOT NULL DEFAULT '{}',
  sets              INT NOT NULL DEFAULT 3,
  reps              TEXT NOT NULL DEFAULT '10',
  rest_time         INT NOT NULL DEFAULT 60,
  instructions      TEXT NOT NULL DEFAULT '',
  video_url         TEXT,
  video_url_side    TEXT,
  video_url_front   TEXT,
  is_published      BOOLEAN NOT NULL DEFAULT false,
  created_at        TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ex_read" ON exercises FOR SELECT USING (is_published = true);

-- --------------------------------------------------
-- 3. Seed category
-- --------------------------------------------------

INSERT INTO categories (name, slug) VALUES ('Home Workout', 'home-workout');

-- --------------------------------------------------
-- 4. Seed equipment
-- --------------------------------------------------

INSERT INTO equipment (name, slug, category_id)
  VALUES ('Bodyweight',       'bodyweight',       (SELECT id FROM categories WHERE slug = 'home-workout'));
INSERT INTO equipment (name, slug, category_id)
  VALUES ('Dumbbells',        'dumbbells',        (SELECT id FROM categories WHERE slug = 'home-workout'));
INSERT INTO equipment (name, slug, category_id)
  VALUES ('Resistance Bands', 'resistance-bands', (SELECT id FROM categories WHERE slug = 'home-workout'));
INSERT INTO equipment (name, slug, category_id)
  VALUES ('Kettlebell',       'kettlebell',       (SELECT id FROM categories WHERE slug = 'home-workout'));
INSERT INTO equipment (name, slug, category_id)
  VALUES ('Jump Rope',        'jump-rope',        (SELECT id FROM categories WHERE slug = 'home-workout'));

-- --------------------------------------------------
-- 5. Seed exercises (all is_published = false)
-- --------------------------------------------------

-- 1. Push-Up
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Push-Up', 'push-up',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'bodyweight'),
  'beginner',
  ARRAY['chest','shoulders','triceps'],
  ARRAY['core','serratus anterior'],
  3, '10-15', 60,
  $$1. Start in a plank position with hands shoulder-width apart
2. Keep your body in a straight line from head to heels
3. Lower your chest until it nearly touches the floor
4. Push back up to the starting position
5. Keep elbows at a 45° angle from your body$$,
  false
);

-- 2. Bodyweight Squat
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Bodyweight Squat', 'bodyweight-squat',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'bodyweight'),
  'beginner',
  ARRAY['quadriceps','glutes','hamstrings'],
  ARRAY['core','calves','lower back'],
  3, '15-20', 60,
  $$1. Stand with feet shoulder-width apart, toes slightly out
2. Keep your chest up and core braced
3. Lower your hips back and down as if sitting in a chair
4. Go as low as you can while keeping heels on the ground
5. Drive through your heels to stand back up$$,
  false
);

-- 3. Lunge
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Lunge', 'lunge',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'bodyweight'),
  'beginner',
  ARRAY['quadriceps','glutes','hamstrings'],
  ARRAY['core','calves','hip flexors'],
  3, '10 each leg', 45,
  $$1. Stand tall with feet hip-width apart
2. Step forward with your right leg
3. Lower your hips until both knees are at 90 degrees
4. Keep your front knee aligned over your ankle
5. Push through your front heel to return to start
6. Alternate legs each rep$$,
  false
);

-- 4. Plank
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Plank', 'plank',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'bodyweight'),
  'beginner',
  ARRAY['core','shoulders'],
  ARRAY['glutes','lower back'],
  3, '30-60 sec', 30,
  $$1. Start on your hands and knees
2. Extend your legs back, coming up onto your toes
3. Keep your body in a straight line from head to heels
4. Engage your core by pulling your navel toward your spine
5. Hold the position without letting hips sag or rise$$,
  false
);

-- 5. Glute Bridge
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Glute Bridge', 'glute-bridge',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'bodyweight'),
  'beginner',
  ARRAY['glutes','hamstrings'],
  ARRAY['core','lower back'],
  3, '15', 45,
  $$1. Lie on your back with knees bent and feet flat on the floor
2. Place arms at your sides, palms down
3. Squeeze your glutes and lift your hips toward the ceiling
4. Hold at the top for 2 seconds
5. Lower slowly back to the starting position$$,
  false
);

-- 6. Dumbbell Shoulder Press
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Dumbbell Shoulder Press', 'dumbbell-shoulder-press',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'dumbbells'),
  'intermediate',
  ARRAY['shoulders','triceps'],
  ARRAY['upper chest','core'],
  3, '10-12', 60,
  $$1. Sit on a bench with back support, holding dumbbells at shoulder height
2. Palms facing forward, elbows bent at 90 degrees
3. Press the dumbbells straight up until arms are fully extended
4. Lower the dumbbells back to shoulder height with control
5. Keep core engaged throughout the movement$$,
  false
);

-- 7. Dumbbell Row
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Dumbbell Row', 'dumbbell-row',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'dumbbells'),
  'intermediate',
  ARRAY['lats','rhomboids','biceps'],
  ARRAY['rear deltoids','forearms'],
  3, '10-12 each arm', 60,
  $$1. Place your right knee and right hand on a bench
2. Hold a dumbbell in your left hand, arm extended
3. Keep your back flat and core tight
4. Pull the dumbbell up to your hip, squeezing your back
5. Lower the dumbbell with control to the starting position$$,
  false
);

-- 8. Dumbbell Goblet Squat
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Dumbbell Goblet Squat', 'dumbbell-goblet-squat',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'dumbbells'),
  'intermediate',
  ARRAY['quadriceps','glutes','hamstrings'],
  ARRAY['core','upper back'],
  3, '10-12', 60,
  $$1. Hold one dumbbell vertically against your chest with both hands
2. Stand with feet slightly wider than shoulder-width
3. Keep your chest up and elbows pointing down
4. Squat down while keeping the dumbbell close to your body
5. Drive through your heels to stand back up$$,
  false
);

-- 9. Banded Lateral Walk
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Banded Lateral Walk', 'banded-lateral-walk',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'resistance-bands'),
  'beginner',
  ARRAY['gluteus medius','hip abductors'],
  ARRAY['quadriceps'],
  3, '10 steps each way', 45,
  $$1. Place a resistance band around your legs just above the knees
2. Stand with feet shoulder-width apart, knees slightly bent
3. Keep tension on the band and maintain a squat position
4. Step sideways with your right foot, then follow with your left
5. Take 10 steps to the right, then 10 steps to the left$$,
  false
);

-- 10. Banded Pull-Apart
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Banded Pull-Apart', 'banded-pull-apart',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'resistance-bands'),
  'beginner',
  ARRAY['rear deltoids','rhomboids','rotator cuff'],
  ARRAY['upper back'],
  3, '15', 30,
  $$1. Hold a resistance band with both hands, arms extended at shoulder height
2. Keep your arms straight and core engaged
3. Pull the band apart by squeezing your shoulder blades together
4. Hold for 1 second at the fully stretched position
5. Return to the starting position with control$$,
  false
);

-- 11. Kettlebell Swing
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Kettlebell Swing', 'kettlebell-swing',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'kettlebell'),
  'intermediate',
  ARRAY['glutes','hamstrings','lower back'],
  ARRAY['core','shoulders','forearms'],
  3, '15-20', 60,
  $$1. Stand with feet shoulder-width apart, kettlebell on the floor
2. Hinge at your hips, grab the kettlebell with both hands
3. Hike the kettlebell back between your legs
4. Thrust your hips forward to swing the bell to chest height
5. Let the bell swing back down and repeat in one fluid motion$$,
  false
);

-- 12. Kettlebell Goblet Curl
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Kettlebell Goblet Curl', 'kettlebell-goblet-curl',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'kettlebell'),
  'beginner',
  ARRAY['biceps','forearms'],
  ARRAY['shoulders'],
  3, '12-15', 45,
  $$1. Hold the kettlebell by the horns at chest height
2. Stand with feet shoulder-width apart
3. Lower the kettlebell with control until arms are fully extended
4. Curl the kettlebell back to chest height
5. Keep your upper arms stationary throughout$$,
  false
);

-- 13. Jump Rope Basic
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Jump Rope Basic', 'jump-rope-basic',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'jump-rope'),
  'beginner',
  ARRAY['calves','quadriceps','shoulders'],
  ARRAY['core','forearms','glutes'],
  3, '60 sec', 30,
  $$1. Hold the jump rope handles at hip height
2. Keep elbows close to your sides
3. Spin the rope using wrist rotation, not arm swings
4. Jump just high enough to clear the rope (1-2 inches)
5. Land softly on the balls of your feet
6. Maintain a steady rhythm$$,
  false
);

-- 14. Burpee
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Burpee', 'burpee',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'bodyweight'),
  'advanced',
  ARRAY['full body','chest','quadriceps'],
  ARRAY['shoulders','core','hamstrings'],
  3, '8-10', 90,
  $$1. Start standing with feet shoulder-width apart
2. Drop into a squat and place your hands on the floor
3. Kick your feet back into a plank position
4. Perform a push-up (optional)
5. Jump your feet back to the squat position
6. Explosively jump up with arms overhead$$,
  false
);

-- 15. Mountain Climber
INSERT INTO exercises (name, slug, category_id, equipment_id, difficulty, primary_muscles, secondary_muscles, sets, reps, rest_time, instructions, is_published)
VALUES (
  'Mountain Climber', 'mountain-climber',
  (SELECT id FROM categories WHERE slug = 'home-workout'),
  (SELECT id FROM equipment WHERE slug = 'bodyweight'),
  'intermediate',
  ARRAY['core','hip flexors','shoulders'],
  ARRAY['quadriceps','chest'],
  3, '30 sec each side', 45,
  $$1. Start in a plank position with hands under shoulders
2. Keep your body in a straight line
3. Drive your right knee toward your chest
4. Quickly switch legs, extending the right leg back
5. Continue alternating legs at a fast pace
6. Maintain a stable upper body throughout$$,
  false
);
