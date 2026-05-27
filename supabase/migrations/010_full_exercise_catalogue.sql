BEGIN;

WITH source_data (name, slug, category_slug, equipment_name, difficulty, movement_pattern, primary_muscles, secondary_muscles, sets_count, reps_text, rest_time_text, instructions_text, tips_text, common_mistakes_text) AS (
VALUES
  ('Forward Lunges', 'forward-lunges', 'home-workout', 'None', 'beginner', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '10-12', '60s', '1. Stand upright with feet together
2. Step one leg forward and lower hips until knees are at 90 degrees
3. Push off the front foot to return to the starting position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Glute Bridge', 'glute-bridge', 'home-workout', 'None', 'beginner', 'hinge', ARRAY['Gluteus Maximus', 'Hamstrings'], ARRAY['Core'], 3, '12-15', '60s', '1. Lie on your back with knees bent and feet flat on the floor
2. Squeeze your glutes and push through your heels to lift your hips
3. Lower your hips back to the starting position with control', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Burpees', 'burpees', 'home-workout', 'None', 'advanced', 'cardio', ARRAY['Quadriceps', 'Pectoralis Major'], ARRAY['Core', 'Gluteus Maximus'], 4, '45s', '60s', '1. Drop into a squat position and place your hands on the ground
2. Jump your feet back to a plank and do a push-up
3. Jump your feet back to your hands and stand up with a jump', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Mountain Climbers', 'mountain-climbers', 'home-workout', 'None', 'beginner', 'cardio', ARRAY['Core', 'Deltoids'], ARRAY['Quadriceps', 'Hip Flexors'], 4, '40s', '45s', '1. Start in a high plank position with hands under shoulders
2. Drive one knee towards your chest
3. Quickly switch legs back and forth in a running motion', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Bear Crawl', 'bear-crawl', 'home-workout', 'None', 'intermediate', 'carry', ARRAY['Core', 'Deltoids', 'Quadriceps'], ARRAY['Triceps Brachii', 'Pectoralis Major'], 3, '30s', '60s', '1. Start on all fours with knees hovering slightly off the ground
2. Move opposite hand and foot forward simultaneously
3. Continue crawling forward while keeping the back flat', '- Maintain an upright, rigid posture
- Take short, controlled steps', '- Leaning too far forward or backward
- Holding your breath'),
  ('V-Ups', 'v-ups', 'home-workout', 'None', 'advanced', 'isolation', ARRAY['Rectus Abdominis'], ARRAY['Obliques', 'Hip Flexors'], 3, '10-15', '60s', '1. Lie flat on your back with arms extended overhead
2. Simultaneously lift your legs and torso to form a V shape
3. Slowly lower back down to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Russian Twists', 'russian-twists', 'home-workout', 'None', 'intermediate', 'rotation', ARRAY['Obliques', 'Rectus Abdominis'], ARRAY['Hip Flexors'], 3, '20-30', '45s', '1. Sit on the floor and lean back slightly with legs lifted
2. Clasp hands and twist your torso to the right side
3. Twist your torso to the left side in a fluid motion', '- Engage your core entirely
- Rotate from the torso, not just the arms', '- Twisting the lower back excessively
- Moving too fast without control'),
  ('Superman', 'superman', 'home-workout', 'None', 'beginner', 'isolation', ARRAY['Erector Spinae', 'Gluteus Maximus'], ARRAY['Hamstrings'], 3, '12-15', '45s', '1. Lie face down with arms extended in front of you
2. Lift your arms, chest, and legs off the floor simultaneously
3. Hold for a second before slowly lowering back down', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Triceps Dips on Chair', 'triceps-dips-on-chair', 'home-workout', 'Chair', 'intermediate', 'vertical-push', ARRAY['Triceps Brachii'], ARRAY['Deltoids', 'Pectoralis Major'], 3, '10-12', '60s', '1. Place hands on the edge of a chair and extend legs forward
2. Lower your body until elbows form a 90-degree angle
3. Push back up to the starting position extending the arms', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Pike Push-up', 'pike-push-up', 'home-workout', 'None', 'intermediate', 'vertical-push', ARRAY['Deltoids', 'Triceps Brachii'], ARRAY['Pectoralis Major', 'Trapezius'], 3, '8-12', '60s', '1. Start in a downward dog position with hips high
2. Bend your elbows to lower your head towards the floor between your hands
3. Push back up until arms are fully extended', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Reverse Lunges', 'reverse-lunges', 'home-workout', 'None', 'beginner', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '10-12', '60s', '1. Stand tall with feet shoulder-width apart
2. Step one foot backward and lower hips until both knees are 90 degrees
3. Push off the back foot to return to the standing position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Side Plank', 'side-plank', 'home-workout', 'None', 'intermediate', 'isolation', ARRAY['Obliques', 'Core'], ARRAY['Deltoids', 'Gluteus Medius'], 3, '30-45s', '60s', '1. Lie on your side and prop yourself up on one forearm
2. Lift your hips so your body forms a straight line
3. Hold the position for the specified time', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Floor Press', 'dumbbell-floor-press', 'home-workout', 'Dumbbells', 'beginner', 'horizontal-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 3, '8-12', '60s', '1. Lie on your back with knees bent and a dumbbell in each hand
2. Press the weights up until your arms are fully extended
3. Lower the weights until your upper arms gently touch the floor', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Dumbbell Bent Over Row', 'dumbbell-bent-over-row', 'home-workout', 'Dumbbells', 'intermediate', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Biceps Brachii', 'Erector Spinae'], 3, '8-12', '90s', '1. Hinge at the hips with a flat back holding dumbbells letting them hang
2. Pull the dumbbells up towards your hips squeezing shoulder blades
3. Slowly lower the weights back to the starting position', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Dumbbell Overhead Press', 'dumbbell-overhead-press', 'home-workout', 'Dumbbells', 'intermediate', 'vertical-push', ARRAY['Deltoids', 'Triceps Brachii'], ARRAY['Upper Trapezius', 'Core'], 3, '8-12', '90s', '1. Stand or sit holding dumbbells at shoulder level with palms facing forward
2. Press the dumbbells straight up overhead until arms are extended
3. Lower the dumbbells back to shoulder level with control', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Dumbbell Forward Lunge', 'dumbbell-forward-lunge', 'home-workout', 'Dumbbells', 'beginner', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '10-12', '60s', '1. Stand holding dumbbells at your sides
2. Step forward and lower until both knees are at 90-degree angles
3. Push through the front heel to return to the start', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Dumbbell Lateral Raise', 'dumbbell-lateral-raise', 'home-workout', 'Dumbbells', 'intermediate', 'isolation', ARRAY['Lateral Deltoid'], ARRAY['Anterior Deltoid', 'Trapezius'], 3, '12-15', '60s', '1. Stand holding dumbbells at your sides with a slight bend in elbows
2. Raise the weights out to the sides until shoulder height
3. Slowly lower them back down to your sides', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Triceps Extension', 'dumbbell-triceps-extension', 'home-workout', 'Dumbbells', 'beginner', 'isolation', ARRAY['Triceps Brachii'], ARRAY['Core'], 3, '10-15', '60s', '1. Hold one dumbbell with both hands overhead
2. Keeping upper arms stationary lower the weight behind your head
3. Extend your arms fully to press the weight back up', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Thruster', 'dumbbell-thruster', 'home-workout', 'Dumbbells', 'advanced', 'squat', ARRAY['Quadriceps', 'Deltoids'], ARRAY['Gluteus Maximus', 'Triceps Brachii'], 4, '10-12', '90s', '1. Stand with dumbbells racked at your shoulders
2. Perform a full squat
3. Explosively stand up and press the dumbbells overhead', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Dumbbell Renegade Row', 'dumbbell-renegade-row', 'home-workout', 'Dumbbells', 'advanced', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Core'], ARRAY['Biceps Brachii', 'Deltoids'], 3, '16-20', '90s', '1. Start in a high plank holding a dumbbell in each hand
2. Row one dumbbell up to your hip while balancing on the other
3. Lower the dumbbell and repeat on the opposite side', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Dumbbell Shrugs', 'dumbbell-shrugs', 'home-workout', 'Dumbbells', 'beginner', 'isolation', ARRAY['Trapezius'], ARRAY['Forearms'], 3, '12-15', '60s', '1. Stand holding dumbbells by your sides with straight arms
2. Elevate your shoulders straight up towards your ears
3. Hold for a second at the top then slowly lower', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Calf Raise', 'dumbbell-calf-raise', 'home-workout', 'Dumbbells', 'beginner', 'isolation', ARRAY['Gastrocnemius', 'Soleus'], ARRAY['Core'], 3, '15-20', '60s', '1. Stand tall holding dumbbells at your sides
2. Push up onto your toes as high as possible
3. Slowly lower your heels back to the ground', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Reverse Fly', 'dumbbell-reverse-fly', 'home-workout', 'Dumbbells', 'intermediate', 'isolation', ARRAY['Posterior Deltoid', 'Rhomboids'], ARRAY['Trapezius'], 3, '12-15', '60s', '1. Hinge at the hips holding dumbbells with a slight bend in elbows
2. Raise the arms out to the sides squeezing the shoulder blades
3. Slowly lower the dumbbells back down', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Step-up', 'dumbbell-step-up', 'home-workout', 'Dumbbells', 'intermediate', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '10-12', '60s', '1. Stand holding dumbbells in front of a sturdy box or chair
2. Step firmly onto the box with one foot and push up to stand
3. Carefully step back down to the starting position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Banded Overhead Press', 'banded-overhead-press', 'home-workout', 'Resistance Band', 'beginner', 'vertical-push', ARRAY['Deltoids', 'Triceps Brachii'], ARRAY['Upper Trapezius', 'Core'], 3, '10-15', '60s', '1. Stand on the center of the band and hold the handles at shoulder level
2. Press the handles straight up until your arms are fully extended
3. Slowly return the handles to your shoulders', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Banded Seated Row', 'banded-seated-row', 'home-workout', 'Resistance Band', 'beginner', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Biceps Brachii'], 3, '12-15', '60s', '1. Sit on the floor with legs extended and the band wrapped around your feet
2. Pull the handles toward your stomach while squeezing shoulder blades
3. Extend your arms slowly back to the start', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Banded Chest Press', 'banded-chest-press', 'home-workout', 'Resistance Band', 'intermediate', 'horizontal-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 3, '10-15', '60s', '1. Anchor the band behind you and hold one end in each hand at chest level
2. Push the handles forward until your arms are fully extended
3. Slowly return to the starting position with control', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Banded Triceps Pushdown', 'banded-triceps-pushdown', 'home-workout', 'Resistance Band', 'beginner', 'isolation', ARRAY['Triceps Brachii'], ARRAY['Core'], 3, '12-15', '45s', '1. Anchor the band high above you and hold it with elbows bent at 90 degrees
2. Push the band down until your arms are completely straight
3. Slowly bend elbows to return to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Banded Bicep Curl', 'banded-bicep-curl', 'home-workout', 'Resistance Band', 'beginner', 'isolation', ARRAY['Biceps Brachii'], ARRAY['Forearms'], 3, '12-15', '45s', '1. Stand on the band holding the handles with palms facing forward
2. Curl the handles up toward your shoulders keeping elbows stationary
3. Lower the handles back down under control', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Banded Lateral Walk', 'banded-lateral-walk', 'home-workout', 'Resistance Band', 'intermediate', 'isolation', ARRAY['Gluteus Medius', 'Gluteus Minimus'], ARRAY['Tensor Fasciae Latae'], 3, '15-20', '60s', '1. Place a loop band around your thighs just above the knees
2. Drop into a quarter squat and step to the side with one foot
3. Follow with the other foot maintaining tension in the band', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Banded Glute Bridge', 'banded-glute-bridge', 'home-workout', 'Resistance Band', 'intermediate', 'hinge', ARRAY['Gluteus Maximus'], ARRAY['Hamstrings'], 3, '15-20', '60s', '1. Wrap a band above your knees and lie on your back with knees bent
2. Push through your heels to raise your hips squeezing your glutes
3. Lower your hips slowly back to the ground', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Kettlebell Turkish Get-Up', 'kettlebell-turkish-get-up', 'home-workout', 'Kettlebell', 'advanced', 'isolation', ARRAY['Core', 'Deltoids'], ARRAY['Gluteus Maximus', 'Quadriceps'], 3, '3-5', '90s', '1. Lie on your back holding a kettlebell extended overhead with one arm
2. Transition to sitting then kneeling and finally standing while keeping the arm locked out
3. Reverse the exact steps to return to the lying position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Kettlebell Clean and Press', 'kettlebell-clean-and-press', 'home-workout', 'Kettlebell', 'advanced', 'vertical-push', ARRAY['Deltoids', 'Hamstrings'], ARRAY['Gluteus Maximus', 'Triceps Brachii'], 3, '8-10', '90s', '1. Hinge at the hips and explosively pull the kettlebell to the rack position at shoulder height
2. Press the kettlebell strictly overhead until the arm is locked
3. Lower back to the rack position then back between the legs', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Kettlebell Snatch', 'kettlebell-snatch', 'home-workout', 'Kettlebell', 'advanced', 'hinge', ARRAY['Hamstrings', 'Gluteus Maximus'], ARRAY['Deltoids', 'Trapezius'], 3, '8-10', '90s', '1. Hinge to swing the kettlebell between your legs
2. Explosively extend hips and pull the bell straight up punching your hand through at the top
3. Let the kettlebell drop in a controlled arc back between the legs', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Kettlebell Halo', 'kettlebell-halo', 'home-workout', 'Kettlebell', 'intermediate', 'rotation', ARRAY['Deltoids', 'Core'], ARRAY['Trapezius'], 3, '10-12', '60s', '1. Stand holding a kettlebell by the horns upside down in front of your chest
2. Circle the kettlebell tightly around your head in one direction
3. Return to the chest and circle in the opposite direction', '- Engage your core entirely
- Rotate from the torso, not just the arms', '- Twisting the lower back excessively
- Moving too fast without control'),
  ('Kettlebell Reverse Lunge', 'kettlebell-reverse-lunge', 'home-workout', 'Kettlebell', 'intermediate', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '10-12', '60s', '1. Hold a kettlebell in the goblet position at chest level
2. Step one foot backward and descend until both knees are bent at 90 degrees
3. Push off the front foot to return to the starting position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Kettlebell Windmill', 'kettlebell-windmill', 'home-workout', 'Kettlebell', 'advanced', 'rotation', ARRAY['Obliques', 'Core'], ARRAY['Hamstrings', 'Deltoids'], 3, '5-8', '90s', '1. Press a kettlebell overhead and angle your feet 45 degrees away from the loaded arm
2. Push your hips back and slide your free hand down the inside of your leg
3. Engage your core to return to the standing position', '- Engage your core entirely
- Rotate from the torso, not just the arms', '- Twisting the lower back excessively
- Moving too fast without control'),
  ('Kettlebell Figure 8', 'kettlebell-figure-8', 'home-workout', 'Kettlebell', 'intermediate', 'hinge', ARRAY['Gluteus Maximus', 'Hamstrings'], ARRAY['Core'], 3, '16-20', '60s', '1. Drop into a quarter squat and pass the kettlebell between your legs to your other hand
2. Bring the bell around the outside of the leg back to the front
3. Repeat the motion passing it through the legs in a figure 8 pattern', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Double Unders', 'double-unders', 'home-workout', 'Jump Rope', 'advanced', 'cardio', ARRAY['Calves', 'Core'], ARRAY['Forearms', 'Deltoids'], 4, '30s', '60s', '1. Jump slightly higher than a normal jump rope bound
2. Whip the rope rapidly to pass it under your feet twice per jump
3. Land softly on the balls of your feet', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Alternating Foot Jump Rope', 'alternating-foot-jump-rope', 'home-workout', 'Jump Rope', 'intermediate', 'cardio', ARRAY['Calves', 'Core'], ARRAY['Forearms', 'Quadriceps'], 4, '60s', '45s', '1. Swing the rope forward and hop over it with your right foot
2. On the next revolution hop over it with your left foot
3. Continue alternating feet mimicking a running in place motion', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Pull-up', 'pull-up', 'home-workout', 'Pull-up Bar', 'advanced', 'vertical-pull', ARRAY['Latissimus Dorsi', 'Biceps Brachii'], ARRAY['Rhomboids', 'Core'], 3, '5-10', '90s', '1. Grip the bar with palms facing away from you slightly wider than shoulder-width
2. Pull yourself up until your chin clears the bar
3. Lower yourself down with control to a dead hang', '- Initiate the pull by dropping your shoulders
- Drive elbows down towards hips', '- Swinging your body
- Rounding shoulders forward at the bottom'),
  ('Chin-up', 'chin-up', 'home-workout', 'Pull-up Bar', 'intermediate', 'vertical-pull', ARRAY['Latissimus Dorsi', 'Biceps Brachii'], ARRAY['Core'], 3, '6-12', '90s', '1. Grip the bar with palms facing toward you at shoulder-width
2. Pull your body up until your chin is over the bar
3. Slowly lower your body back to the starting position', '- Initiate the pull by dropping your shoulders
- Drive elbows down towards hips', '- Swinging your body
- Rounding shoulders forward at the bottom'),
  ('Hanging Leg Raise', 'hanging-leg-raise', 'home-workout', 'Pull-up Bar', 'advanced', 'isolation', ARRAY['Rectus Abdominis', 'Hip Flexors'], ARRAY['Core', 'Forearms'], 3, '10-15', '60s', '1. Hang from the bar with an overhand grip and legs straight
2. Keep legs straight and lift them until they are parallel to the floor
3. Lower them slowly and under complete control', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Toes to Bar', 'toes-to-bar', 'home-workout', 'Pull-up Bar', 'advanced', 'isolation', ARRAY['Rectus Abdominis', 'Hip Flexors'], ARRAY['Latissimus Dorsi'], 3, '8-12', '90s', '1. Hang from the bar and engage your lats by pulling down slightly
2. Hinge at the hips to lift your legs straight up until your toes touch the bar
3. Slowly lower your legs back to a dead hang', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('L-Sit Hang', 'l-sit-hang', 'home-workout', 'Pull-up Bar', 'advanced', 'isolation', ARRAY['Rectus Abdominis', 'Hip Flexors'], ARRAY['Quadriceps', 'Forearms'], 3, '15-30s', '60s', '1. Hang from the bar with a stable overhand grip
2. Raise straight legs until they are parallel to the floor forming an L shape
3. Hold this position bracing your core tightly', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Barbell Bench Press', 'barbell-bench-press', 'gym-workout', 'Barbell', 'intermediate', 'horizontal-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 4, '8-10', '120s', '1. Lie on the bench and grip the bar slightly wider than shoulder-width
2. Unrack the bar and lower it to your mid-chest with elbows tucked at 45 degrees
3. Press the bar back up to the starting position', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Incline Dumbbell Press', 'incline-dumbbell-press', 'gym-workout', 'Dumbbells', 'intermediate', 'horizontal-push', ARRAY['Pectoralis Major', 'Anterior Deltoid'], ARRAY['Triceps Brachii'], 3, '8-12', '90s', '1. Lie on a bench set to a 30-45 degree incline holding dumbbells at your chest
2. Press the dumbbells straight up until arms are fully extended
3. Lower the weights slowly back to the chest', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Cable Crossover', 'cable-crossover', 'gym-workout', 'Cable Machine', 'intermediate', 'isolation', ARRAY['Pectoralis Major'], ARRAY['Anterior Deltoid'], 3, '12-15', '60s', '1. Stand between cable pulleys set high holding a handle in each hand
2. Step forward slightly and pull the handles down and together in front of you
3. Slowly let the handles return to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Machine Chest Press', 'machine-chest-press', 'gym-workout', 'Machine', 'beginner', 'horizontal-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 3, '10-12', '60s', '1. Adjust the seat so the handles align with your mid-chest
2. Press the handles forward until your arms are fully extended
3. Slowly return the handles until you feel a stretch in your chest', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Pec Deck Fly', 'pec-deck-fly', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Pectoralis Major'], ARRAY['Anterior Deltoid'], 3, '12-15', '60s', '1. Sit on the machine with your back flat and grab the handles
2. Bring the handles together in front of your chest while maintaining a slight elbow bend
3. Slowly open your arms back to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Decline Barbell Press', 'decline-barbell-press', 'gym-workout', 'Barbell', 'intermediate', 'horizontal-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 3, '8-12', '90s', '1. Secure your feet at the end of the decline bench and lie back
2. Lower the barbell to your lower chest
3. Press the bar back up until your arms are fully extended', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Dumbbell Pullover', 'dumbbell-pullover', 'gym-workout', 'Dumbbells', 'intermediate', 'isolation', ARRAY['Pectoralis Major', 'Latissimus Dorsi'], ARRAY['Triceps Brachii'], 3, '10-15', '90s', '1. Lie across a bench with your upper back supported holding a single dumbbell over your chest
2. Keeping arms slightly bent slowly lower the dumbbell behind your head
3. Pull the dumbbell back over to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Weighted Dips', 'weighted-dips', 'gym-workout', 'Bodyweight', 'advanced', 'vertical-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 3, '6-10', '120s', '1. Attach a weight belt and mount the dip station with arms extended
2. Lean forward slightly and lower your body until elbows are at 90 degrees
3. Press back up to full arm extension', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Lat Pulldown', 'lat-pulldown', 'gym-workout', 'Cable Machine', 'beginner', 'vertical-pull', ARRAY['Latissimus Dorsi'], ARRAY['Biceps Brachii', 'Rhomboids'], 3, '10-12', '90s', '1. Sit at the machine and grip the wide bar outside shoulder-width
2. Pull the bar down to your upper chest while leaning back slightly
3. Slowly return the bar to the top until arms are fully extended', '- Initiate the pull by dropping your shoulders
- Drive elbows down towards hips', '- Swinging your body
- Rounding shoulders forward at the bottom'),
  ('Seated Cable Row', 'seated-cable-row', 'gym-workout', 'Cable Machine', 'beginner', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Biceps Brachii', 'Erector Spinae'], 3, '10-12', '90s', '1. Sit with knees slightly bent and grab the V-handle attachment
2. Keep your torso stationary and pull the handle to your lower stomach
3. Extend arms forward under control to feel the stretch in your lats', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('T-Bar Row', 't-bar-row', 'gym-workout', 'Barbell', 'intermediate', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Biceps Brachii', 'Erector Spinae'], 3, '8-12', '90s', '1. Straddle the barbell hinge at the hips and grab the V-handle
2. Pull the weight up toward your chest keeping elbows close to the body
3. Lower the weight slowly until arms are fully extended', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Single-Arm Dumbbell Row', 'single-arm-dumbbell-row', 'gym-workout', 'Dumbbells', 'intermediate', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Biceps Brachii'], 3, '8-12', '90s', '1. Place one knee and hand on a bench with a flat back holding a dumbbell in the other hand
2. Pull the dumbbell up to your hip keeping the elbow tight to your side
3. Lower the dumbbell slowly to a full stretch', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Straight-Arm Pulldown', 'straight-arm-pulldown', 'gym-workout', 'Cable Machine', 'intermediate', 'isolation', ARRAY['Latissimus Dorsi'], ARRAY['Teres Major', 'Core'], 3, '12-15', '60s', '1. Stand facing a cable pulley holding a straight bar at face height with straight arms
2. Push the bar down in an arc to your thighs without bending elbows
3. Slowly let the bar return to face height', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Machine Reverse Fly', 'machine-reverse-fly', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Posterior Deltoid', 'Rhomboids'], ARRAY['Trapezius'], 3, '12-15', '60s', '1. Sit facing the machine pad and grip the horizontal handles
2. Pull the handles back and out in an arc squeezing shoulder blades
3. Return the handles forward with control', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Assisted Pull-up', 'assisted-pull-up', 'gym-workout', 'Machine', 'beginner', 'vertical-pull', ARRAY['Latissimus Dorsi', 'Biceps Brachii'], ARRAY['Rhomboids', 'Core'], 3, '8-12', '90s', '1. Kneel on the assist pad and grip the overhead handles
2. Pull your body up until your chin clears the handles
3. Slowly lower yourself until your arms are fully straight', '- Initiate the pull by dropping your shoulders
- Drive elbows down towards hips', '- Swinging your body
- Rounding shoulders forward at the bottom'),
  ('Pendlay Row', 'pendlay-row', 'gym-workout', 'Barbell', 'advanced', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Erector Spinae', 'Biceps Brachii'], 4, '6-8', '120s', '1. Hinge at the hips until your torso is parallel to the floor and grip the barbell
2. Explosively row the bar from the floor to your lower chest
3. Return the bar to a dead stop on the floor', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Seated Dumbbell Press', 'seated-dumbbell-press', 'gym-workout', 'Dumbbells', 'intermediate', 'vertical-push', ARRAY['Anterior Deltoid', 'Lateral Deltoid'], ARRAY['Triceps Brachii'], 3, '8-12', '90s', '1. Sit on a bench with back support holding dumbbells at shoulder height
2. Press the dumbbells straight overhead until arms are extended
3. Lower the dumbbells back to shoulder level slowly', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Machine Shoulder Press', 'machine-shoulder-press', 'gym-workout', 'Machine', 'beginner', 'vertical-push', ARRAY['Anterior Deltoid'], ARRAY['Triceps Brachii', 'Lateral Deltoid'], 3, '10-12', '60s', '1. Adjust the seat height so the handles are at shoulder level
2. Press the handles upward until arms are straight
3. Slowly lower the handles back down', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Cable Lateral Raise', 'cable-lateral-raise', 'gym-workout', 'Cable Machine', 'intermediate', 'isolation', ARRAY['Lateral Deltoid'], ARRAY['Anterior Deltoid', 'Trapezius'], 3, '12-15', '60s', '1. Stand sideways to a low pulley and grasp the handle with the far hand
2. Raise the arm out to the side until it reaches shoulder height
3. Slowly lower the handle back across your body', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Front Dumbbell Raise', 'front-dumbbell-raise', 'gym-workout', 'Dumbbells', 'beginner', 'isolation', ARRAY['Anterior Deltoid'], ARRAY['Pectoralis Major', 'Lateral Deltoid'], 3, '12-15', '60s', '1. Stand holding dumbbells in front of your thighs with palms facing you
2. Raise the dumbbells straight out in front until shoulder height
3. Slowly lower them back down to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Face Pulls', 'face-pulls', 'gym-workout', 'Cable Machine', 'intermediate', 'horizontal-pull', ARRAY['Posterior Deltoid', 'Rhomboids'], ARRAY['Trapezius'], 3, '12-15', '60s', '1. Set a cable pulley to upper chest height with a rope attachment
2. Pull the rope towards your face splitting the ends past your ears
3. Slowly return to the starting position', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Upright Row', 'upright-row', 'gym-workout', 'Barbell', 'intermediate', 'vertical-pull', ARRAY['Lateral Deltoid', 'Trapezius'], ARRAY['Biceps Brachii'], 3, '10-12', '90s', '1. Stand holding a barbell with a slightly narrower than shoulder-width overhand grip
2. Pull the bar straight up close to your body until it reaches chest level
3. Lower the bar smoothly to the starting position', '- Initiate the pull by dropping your shoulders
- Drive elbows down towards hips', '- Swinging your body
- Rounding shoulders forward at the bottom'),
  ('Arnold Press', 'arnold-press', 'gym-workout', 'Dumbbells', 'intermediate', 'vertical-push', ARRAY['Anterior Deltoid', 'Lateral Deltoid'], ARRAY['Triceps Brachii'], 3, '8-12', '90s', '1. Sit on a bench holding dumbbells in front of your face with palms facing you
2. Press the weights overhead while simultaneously rotating your palms to face forward
3. Lower the weights reversing the rotation to the start position', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Reverse Pec Deck', 'reverse-pec-deck', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Posterior Deltoid', 'Rhomboids'], ARRAY['Trapezius'], 3, '12-15', '60s', '1. Sit facing the pad on a pec deck machine grasping the handles
2. Pull the handles outward and backward squeezing your rear delts
3. Return smoothly to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Leg Press', 'leg-press', 'gym-workout', 'Machine', 'intermediate', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings'], 3, '10-12', '90s', '1. Sit on the leg press machine with feet shoulder-width on the platform
2. Unlatch the sled and lower it until your knees are at 90 degrees
3. Press the sled back up until legs are fully extended', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Leg Extension', 'leg-extension', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Quadriceps'], ARRAY[]::text[], 3, '12-15', '60s', '1. Sit on the machine and adjust the pad to rest on your lower shins
2. Extend your legs straight out squeezing the quads
3. Slowly lower the weight back down', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Seated Leg Curl', 'seated-leg-curl', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Hamstrings'], ARRAY['Calves'], 3, '12-15', '60s', '1. Sit on the machine and place your ankles on top of the padded lever
2. Curl the lever downward towards your thighs squeezing the hamstrings
3. Return slowly to the starting straight leg position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Lying Leg Curl', 'lying-leg-curl', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Hamstrings'], ARRAY['Calves'], 3, '12-15', '60s', '1. Lie face down on the machine placing your ankles under the roller pad
2. Curl your legs upward toward your glutes
3. Lower the weight slowly to full extension', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Bulgarian Split Squat', 'bulgarian-split-squat', 'gym-workout', 'Dumbbells', 'advanced', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '8-12', '90s', '1. Stand holding dumbbells with one foot resting on a bench behind you
2. Lower your hips until the front thigh is parallel to the floor
3. Push through the front heel to stand back up', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Barbell Hip Thrust', 'barbell-hip-thrust', 'gym-workout', 'Barbell', 'intermediate', 'hinge', ARRAY['Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '8-12', '90s', '1. Sit on the floor with your upper back against a bench and a barbell across your hips
2. Drive through your heels extending hips vertically until they align with your shoulders
3. Lower hips back down slowly', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Standing Calf Raise', 'standing-calf-raise', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Gastrocnemius'], ARRAY['Soleus'], 3, '15-20', '60s', '1. Stand on the machine platform with shoulders under the pads
2. Drop your heels down until you feel a deep stretch in your calves
3. Push up high onto your toes contracting the calves', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Seated Calf Raise', 'seated-calf-raise', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Soleus'], ARRAY['Gastrocnemius'], 3, '15-20', '60s', '1. Sit on the machine placing the balls of your feet on the platform and pads on your lower thighs
2. Lower your heels to a full stretch
3. Push up onto your toes squeezing the calf muscles', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Hack Squat', 'hack-squat', 'gym-workout', 'Machine', 'intermediate', 'squat', ARRAY['Quadriceps'], ARRAY['Gluteus Maximus', 'Hamstrings'], 3, '8-12', '90s', '1. Step into the machine resting your shoulders under the pads with feet shoulder-width
2. Lower the sled by bending your knees to 90 degrees
3. Press back up to the starting position extending the legs', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Glute Ham Raise', 'glute-ham-raise', 'gym-workout', 'Machine', 'advanced', 'hinge', ARRAY['Hamstrings', 'Gluteus Maximus'], ARRAY['Erector Spinae', 'Calves'], 3, '8-12', '90s', '1. Secure your feet in the GHD machine with your knees on the pads
2. Lower your torso forward slowly extending your knees
3. Pull your body back up using your hamstrings', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Barbell Curl', 'barbell-curl', 'gym-workout', 'Barbell', 'beginner', 'isolation', ARRAY['Biceps Brachii'], ARRAY['Forearms'], 3, '8-12', '60s', '1. Stand holding a barbell with an underhand shoulder-width grip
2. Curl the bar up toward your chest keeping elbows pinned to your sides
3. Lower the bar slowly to full extension', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Preacher Curl', 'preacher-curl', 'gym-workout', 'EZ Bar', 'intermediate', 'isolation', ARRAY['Biceps Brachii'], ARRAY['Forearms'], 3, '10-12', '60s', '1. Sit at the preacher bench and grab the EZ bar resting triceps on the pad
2. Curl the weight up towards your shoulders
3. Lower the bar until your arms are fully extended', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Cable Bicep Curl', 'cable-bicep-curl', 'gym-workout', 'Cable Machine', 'beginner', 'isolation', ARRAY['Biceps Brachii'], ARRAY['Forearms'], 3, '12-15', '60s', '1. Stand facing a low cable pulley holding a straight bar attachment
2. Curl the bar upwards keeping elbows fixed
3. Return the bar slowly to the start position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Hammer Curl', 'hammer-curl', 'gym-workout', 'Dumbbells', 'beginner', 'isolation', ARRAY['Brachialis', 'Biceps Brachii'], ARRAY['Brachioradialis'], 3, '10-12', '60s', '1. Stand holding dumbbells at your sides with palms facing inward
2. Curl the weights up keeping your palms facing each other
3. Slowly lower back down to your sides', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Incline Dumbbell Curl', 'incline-dumbbell-curl', 'gym-workout', 'Dumbbells', 'intermediate', 'isolation', ARRAY['Biceps Brachii'], ARRAY['Forearms'], 3, '10-12', '60s', '1. Sit on an incline bench holding dumbbells letting arms hang straight down
2. Curl the weights up keeping your upper arms completely still
3. Lower the weights back to a dead hang', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Triceps Rope Pushdown', 'triceps-rope-pushdown', 'gym-workout', 'Cable Machine', 'beginner', 'isolation', ARRAY['Triceps Brachii'], ARRAY['Forearms'], 3, '12-15', '60s', '1. Stand facing a high pulley gripping the rope attachment
2. Push the rope downward spreading the ends apart at the bottom
3. Slowly let the rope rise back up to chest level', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Skull Crushers', 'skull-crushers', 'gym-workout', 'EZ Bar', 'intermediate', 'isolation', ARRAY['Triceps Brachii'], ARRAY['Forearms'], 3, '10-12', '90s', '1. Lie flat on a bench holding an EZ bar extended straight up over your chest
2. Bend your elbows to lower the bar toward your forehead
3. Press the bar back up to full extension', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Overhead Cable Extension', 'overhead-cable-extension', 'gym-workout', 'Cable Machine', 'intermediate', 'isolation', ARRAY['Triceps Brachii'], ARRAY['Core'], 3, '12-15', '60s', '1. Attach a rope to a low pulley and grab it holding it behind your head
2. Push the rope straight up overhead extending your arms
3. Lower the rope slowly back behind your head', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Close-Grip Bench Press', 'close-grip-bench-press', 'gym-workout', 'Barbell', 'intermediate', 'horizontal-push', ARRAY['Triceps Brachii', 'Pectoralis Major'], ARRAY['Anterior Deltoid'], 3, '8-10', '90s', '1. Lie on a bench gripping the barbell slightly narrower than shoulder-width
2. Lower the bar to your lower chest keeping elbows tucked in
3. Press the bar back up locking out the triceps', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Machine Triceps Extension', 'machine-triceps-extension', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Triceps Brachii'], ARRAY[]::text[], 3, '12-15', '60s', '1. Sit at the machine resting the back of your arms on the pad
2. Push the handles down extending your arms fully
3. Slowly allow the handles to return to the top position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Cable Crunch', 'cable-crunch', 'gym-workout', 'Cable Machine', 'intermediate', 'isolation', ARRAY['Rectus Abdominis'], ARRAY['Obliques'], 3, '15-20', '60s', '1. Kneel below a high cable pulley holding a rope attachment behind your neck
2. Crunch your torso downward bringing your elbows toward your knees
3. Slowly return to the upright kneeling position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Ab Wheel Rollout', 'ab-wheel-rollout', 'gym-workout', 'Ab Wheel', 'advanced', 'isolation', ARRAY['Rectus Abdominis', 'Core'], ARRAY['Latissimus Dorsi', 'Triceps Brachii'], 3, '8-12', '90s', '1. Kneel on the floor holding the ab wheel directly under your shoulders
2. Roll the wheel forward extending your body as far as you can control
3. Pull the wheel back to the starting position using your core', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Hanging Knee Raise', 'hanging-knee-raise', 'gym-workout', 'Pull-up Bar', 'intermediate', 'isolation', ARRAY['Rectus Abdominis', 'Hip Flexors'], ARRAY['Core'], 3, '12-15', '60s', '1. Hang from a bar with a shoulder-width overhand grip
2. Bring your knees up towards your chest
3. Lower your legs slowly to a dead hang', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Decline Crunch', 'decline-crunch', 'gym-workout', 'Decline Bench', 'intermediate', 'isolation', ARRAY['Rectus Abdominis'], ARRAY['Hip Flexors', 'Obliques'], 3, '15-20', '60s', '1. Secure your legs at the top of a decline bench and lean back
2. Crunch your upper body upward reaching toward your knees
3. Lower your torso back down with control', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Machine Crunch', 'machine-crunch', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Rectus Abdominis'], ARRAY['Core'], 3, '15-20', '60s', '1. Sit in the ab machine securing your feet and gripping the handles
2. Contract your abs to pull your torso forward against the resistance
3. Slowly return to the starting upright position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Russian Twist with Medicine Ball', 'russian-twist-with-medicine-ball', 'gym-workout', 'Medicine Ball', 'intermediate', 'rotation', ARRAY['Obliques', 'Rectus Abdominis'], ARRAY['Hip Flexors'], 3, '20-30', '60s', '1. Sit on the floor holding a medicine ball with legs slightly elevated
2. Twist your torso to touch the ball to the floor on your right
3. Twist to touch the ball on your left side', '- Engage your core entirely
- Rotate from the torso, not just the arms', '- Twisting the lower back excessively
- Moving too fast without control'),
  ('Woodchoppers', 'woodchoppers', 'gym-workout', 'Cable Machine', 'intermediate', 'rotation', ARRAY['Obliques', 'Core'], ARRAY['Deltoids'], 3, '12-15', '60s', '1. Stand sideways to a high cable pulley holding the handle with both hands
2. Pull the handle diagonally downward across your body to the opposite knee
3. Return slowly to the starting high position', '- Engage your core entirely
- Rotate from the torso, not just the arms', '- Twisting the lower back excessively
- Moving too fast without control'),
  ('Captains Chair Leg Raise', 'captains-chair-leg-raise', 'gym-workout', 'Captains Chair', 'intermediate', 'isolation', ARRAY['Rectus Abdominis', 'Hip Flexors'], ARRAY['Core'], 3, '12-15', '60s', '1. Position yourself in the chair with back flat against the pad and forearms supported
2. Raise your straight legs until they are parallel to the floor
3. Lower them slowly and under control', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Treadmill Sprint', 'treadmill-sprint', 'gym-workout', 'Treadmill', 'advanced', 'cardio', ARRAY['Quadriceps', 'Hamstrings'], ARRAY['Calves', 'Gluteus Maximus'], 6, '30s', '60s', '1. Set the treadmill to a challenging sprinting speed
2. Sprint with max effort for the designated time
3. Step onto the side rails to rest or reduce speed', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Rowing Machine', 'rowing-machine', 'gym-workout', 'Rowing Machine', 'intermediate', 'cardio', ARRAY['Latissimus Dorsi', 'Quadriceps'], ARRAY['Hamstrings', 'Core'], 4, '500m', '90s', '1. Sit on the seat strap in feet and grab the handle with straight arms
2. Push with your legs then pull with your arms leaning back slightly
3. Reverse the motion by extending arms then bending knees', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Stair Climber', 'stair-climber', 'gym-workout', 'Stair Climber', 'intermediate', 'cardio', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Calves', 'Hamstrings'], 1, '15m', '0s', '1. Step onto the revolving stairs and select a steady pace
2. Climb the stairs continuously maintaining an upright posture
3. Use the handrails only for light balance', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Elliptical Trainer', 'elliptical-trainer', 'gym-workout', 'Elliptical', 'beginner', 'cardio', ARRAY['Quadriceps', 'Hamstrings'], ARRAY['Gluteus Maximus', 'Calves'], 1, '20m', '0s', '1. Step onto the pedals and grab the moving handles
2. Push and pull the handles while simultaneously pedaling your legs
3. Maintain a steady rhythm and upright posture', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Stationary Bike', 'stationary-bike', 'gym-workout', 'Stationary Bike', 'beginner', 'cardio', ARRAY['Quadriceps', 'Hamstrings'], ARRAY['Calves', 'Gluteus Maximus'], 1, '20m', '0s', '1. Adjust the seat height so your leg is almost straight at the bottom of the pedal stroke
2. Pedal at a steady resistance and pace
3. Keep your upper body relaxed and hands lightly on the bars', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Assault Bike', 'assault-bike', 'gym-workout', 'Assault Bike', 'advanced', 'cardio', ARRAY['Quadriceps', 'Deltoids'], ARRAY['Core', 'Hamstrings'], 5, '30s', '60s', '1. Sit on the bike placing feet on pedals and hands on the handles
2. Pedal hard and push/pull the handles simultaneously with maximum effort
3. Slow down to a relaxed pace during the rest interval', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Barbell Back Squat', 'barbell-back-squat', 'gym-workout', 'Barbell', 'intermediate', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 4, '5-8', '120s', '1. Place the barbell on your upper back and stand with feet shoulder-width apart
2. Push your hips back and bend your knees to lower into a squat
3. Drive through your feet to stand back up to the starting position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Barbell Conventional Deadlift', 'barbell-conventional-deadlift', 'gym-workout', 'Barbell', 'intermediate', 'hinge', ARRAY['Hamstrings', 'Gluteus Maximus'], ARRAY['Erector Spinae', 'Latissimus Dorsi'], 4, '5-8', '120s', '1. Stand with the barbell over your mid-foot and hinge to grab the bar
2. Pull the slack out of the bar, keep your chest up, and flatten your back
3. Drive through your legs and extend your hips to stand up straight', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Barbell Overhead Press', 'barbell-overhead-press', 'gym-workout', 'Barbell', 'intermediate', 'vertical-push', ARRAY['Anterior Deltoid', 'Triceps Brachii'], ARRAY['Lateral Deltoid', 'Core'], 4, '5-8', '120s', '1. Stand holding the barbell in a front rack position across your collarbone
2. Brace your core and press the bar strictly overhead until arms are locked
3. Lower the bar under control back to the collarbone', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Barbell Front Squat', 'barbell-front-squat', 'gym-workout', 'Barbell', 'advanced', 'squat', ARRAY['Quadriceps', 'Core'], ARRAY['Gluteus Maximus', 'Upper Back'], 4, '5-8', '120s', '1. Rest the barbell on your front deltoids keeping elbows pointed forward and high
2. Lower into a squat keeping your torso completely upright
3. Drive through your heels to return to the standing position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back')
)
INSERT INTO public.equipment (name, slug, category_id)
SELECT DISTINCT ON (lower(sd.equipment_name))
  sd.equipment_name,
  lower(regexp_replace(regexp_replace(sd.equipment_name, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')),
  c.id
FROM source_data sd
JOIN public.categories c ON c.slug = sd.category_slug
LEFT JOIN public.equipment e ON lower(e.name) = lower(sd.equipment_name)
WHERE e.id IS NULL
ORDER BY lower(sd.equipment_name), sd.category_slug
ON CONFLICT (slug) DO NOTHING;

WITH source_data (name, slug, category_slug, equipment_name, difficulty, movement_pattern, primary_muscles, secondary_muscles, sets_count, reps_text, rest_time_text, instructions_text, tips_text, common_mistakes_text) AS (
VALUES
  ('Forward Lunges', 'forward-lunges', 'home-workout', 'None', 'beginner', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '10-12', '60s', '1. Stand upright with feet together
2. Step one leg forward and lower hips until knees are at 90 degrees
3. Push off the front foot to return to the starting position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Glute Bridge', 'glute-bridge', 'home-workout', 'None', 'beginner', 'hinge', ARRAY['Gluteus Maximus', 'Hamstrings'], ARRAY['Core'], 3, '12-15', '60s', '1. Lie on your back with knees bent and feet flat on the floor
2. Squeeze your glutes and push through your heels to lift your hips
3. Lower your hips back to the starting position with control', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Burpees', 'burpees', 'home-workout', 'None', 'advanced', 'cardio', ARRAY['Quadriceps', 'Pectoralis Major'], ARRAY['Core', 'Gluteus Maximus'], 4, '45s', '60s', '1. Drop into a squat position and place your hands on the ground
2. Jump your feet back to a plank and do a push-up
3. Jump your feet back to your hands and stand up with a jump', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Mountain Climbers', 'mountain-climbers', 'home-workout', 'None', 'beginner', 'cardio', ARRAY['Core', 'Deltoids'], ARRAY['Quadriceps', 'Hip Flexors'], 4, '40s', '45s', '1. Start in a high plank position with hands under shoulders
2. Drive one knee towards your chest
3. Quickly switch legs back and forth in a running motion', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Bear Crawl', 'bear-crawl', 'home-workout', 'None', 'intermediate', 'carry', ARRAY['Core', 'Deltoids', 'Quadriceps'], ARRAY['Triceps Brachii', 'Pectoralis Major'], 3, '30s', '60s', '1. Start on all fours with knees hovering slightly off the ground
2. Move opposite hand and foot forward simultaneously
3. Continue crawling forward while keeping the back flat', '- Maintain an upright, rigid posture
- Take short, controlled steps', '- Leaning too far forward or backward
- Holding your breath'),
  ('V-Ups', 'v-ups', 'home-workout', 'None', 'advanced', 'isolation', ARRAY['Rectus Abdominis'], ARRAY['Obliques', 'Hip Flexors'], 3, '10-15', '60s', '1. Lie flat on your back with arms extended overhead
2. Simultaneously lift your legs and torso to form a V shape
3. Slowly lower back down to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Russian Twists', 'russian-twists', 'home-workout', 'None', 'intermediate', 'rotation', ARRAY['Obliques', 'Rectus Abdominis'], ARRAY['Hip Flexors'], 3, '20-30', '45s', '1. Sit on the floor and lean back slightly with legs lifted
2. Clasp hands and twist your torso to the right side
3. Twist your torso to the left side in a fluid motion', '- Engage your core entirely
- Rotate from the torso, not just the arms', '- Twisting the lower back excessively
- Moving too fast without control'),
  ('Superman', 'superman', 'home-workout', 'None', 'beginner', 'isolation', ARRAY['Erector Spinae', 'Gluteus Maximus'], ARRAY['Hamstrings'], 3, '12-15', '45s', '1. Lie face down with arms extended in front of you
2. Lift your arms, chest, and legs off the floor simultaneously
3. Hold for a second before slowly lowering back down', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Triceps Dips on Chair', 'triceps-dips-on-chair', 'home-workout', 'Chair', 'intermediate', 'vertical-push', ARRAY['Triceps Brachii'], ARRAY['Deltoids', 'Pectoralis Major'], 3, '10-12', '60s', '1. Place hands on the edge of a chair and extend legs forward
2. Lower your body until elbows form a 90-degree angle
3. Push back up to the starting position extending the arms', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Pike Push-up', 'pike-push-up', 'home-workout', 'None', 'intermediate', 'vertical-push', ARRAY['Deltoids', 'Triceps Brachii'], ARRAY['Pectoralis Major', 'Trapezius'], 3, '8-12', '60s', '1. Start in a downward dog position with hips high
2. Bend your elbows to lower your head towards the floor between your hands
3. Push back up until arms are fully extended', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Reverse Lunges', 'reverse-lunges', 'home-workout', 'None', 'beginner', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '10-12', '60s', '1. Stand tall with feet shoulder-width apart
2. Step one foot backward and lower hips until both knees are 90 degrees
3. Push off the back foot to return to the standing position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Side Plank', 'side-plank', 'home-workout', 'None', 'intermediate', 'isolation', ARRAY['Obliques', 'Core'], ARRAY['Deltoids', 'Gluteus Medius'], 3, '30-45s', '60s', '1. Lie on your side and prop yourself up on one forearm
2. Lift your hips so your body forms a straight line
3. Hold the position for the specified time', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Floor Press', 'dumbbell-floor-press', 'home-workout', 'Dumbbells', 'beginner', 'horizontal-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 3, '8-12', '60s', '1. Lie on your back with knees bent and a dumbbell in each hand
2. Press the weights up until your arms are fully extended
3. Lower the weights until your upper arms gently touch the floor', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Dumbbell Bent Over Row', 'dumbbell-bent-over-row', 'home-workout', 'Dumbbells', 'intermediate', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Biceps Brachii', 'Erector Spinae'], 3, '8-12', '90s', '1. Hinge at the hips with a flat back holding dumbbells letting them hang
2. Pull the dumbbells up towards your hips squeezing shoulder blades
3. Slowly lower the weights back to the starting position', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Dumbbell Overhead Press', 'dumbbell-overhead-press', 'home-workout', 'Dumbbells', 'intermediate', 'vertical-push', ARRAY['Deltoids', 'Triceps Brachii'], ARRAY['Upper Trapezius', 'Core'], 3, '8-12', '90s', '1. Stand or sit holding dumbbells at shoulder level with palms facing forward
2. Press the dumbbells straight up overhead until arms are extended
3. Lower the dumbbells back to shoulder level with control', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Dumbbell Forward Lunge', 'dumbbell-forward-lunge', 'home-workout', 'Dumbbells', 'beginner', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '10-12', '60s', '1. Stand holding dumbbells at your sides
2. Step forward and lower until both knees are at 90-degree angles
3. Push through the front heel to return to the start', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Dumbbell Lateral Raise', 'dumbbell-lateral-raise', 'home-workout', 'Dumbbells', 'intermediate', 'isolation', ARRAY['Lateral Deltoid'], ARRAY['Anterior Deltoid', 'Trapezius'], 3, '12-15', '60s', '1. Stand holding dumbbells at your sides with a slight bend in elbows
2. Raise the weights out to the sides until shoulder height
3. Slowly lower them back down to your sides', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Triceps Extension', 'dumbbell-triceps-extension', 'home-workout', 'Dumbbells', 'beginner', 'isolation', ARRAY['Triceps Brachii'], ARRAY['Core'], 3, '10-15', '60s', '1. Hold one dumbbell with both hands overhead
2. Keeping upper arms stationary lower the weight behind your head
3. Extend your arms fully to press the weight back up', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Thruster', 'dumbbell-thruster', 'home-workout', 'Dumbbells', 'advanced', 'squat', ARRAY['Quadriceps', 'Deltoids'], ARRAY['Gluteus Maximus', 'Triceps Brachii'], 4, '10-12', '90s', '1. Stand with dumbbells racked at your shoulders
2. Perform a full squat
3. Explosively stand up and press the dumbbells overhead', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Dumbbell Renegade Row', 'dumbbell-renegade-row', 'home-workout', 'Dumbbells', 'advanced', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Core'], ARRAY['Biceps Brachii', 'Deltoids'], 3, '16-20', '90s', '1. Start in a high plank holding a dumbbell in each hand
2. Row one dumbbell up to your hip while balancing on the other
3. Lower the dumbbell and repeat on the opposite side', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Dumbbell Shrugs', 'dumbbell-shrugs', 'home-workout', 'Dumbbells', 'beginner', 'isolation', ARRAY['Trapezius'], ARRAY['Forearms'], 3, '12-15', '60s', '1. Stand holding dumbbells by your sides with straight arms
2. Elevate your shoulders straight up towards your ears
3. Hold for a second at the top then slowly lower', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Calf Raise', 'dumbbell-calf-raise', 'home-workout', 'Dumbbells', 'beginner', 'isolation', ARRAY['Gastrocnemius', 'Soleus'], ARRAY['Core'], 3, '15-20', '60s', '1. Stand tall holding dumbbells at your sides
2. Push up onto your toes as high as possible
3. Slowly lower your heels back to the ground', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Reverse Fly', 'dumbbell-reverse-fly', 'home-workout', 'Dumbbells', 'intermediate', 'isolation', ARRAY['Posterior Deltoid', 'Rhomboids'], ARRAY['Trapezius'], 3, '12-15', '60s', '1. Hinge at the hips holding dumbbells with a slight bend in elbows
2. Raise the arms out to the sides squeezing the shoulder blades
3. Slowly lower the dumbbells back down', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Dumbbell Step-up', 'dumbbell-step-up', 'home-workout', 'Dumbbells', 'intermediate', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '10-12', '60s', '1. Stand holding dumbbells in front of a sturdy box or chair
2. Step firmly onto the box with one foot and push up to stand
3. Carefully step back down to the starting position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Banded Overhead Press', 'banded-overhead-press', 'home-workout', 'Resistance Band', 'beginner', 'vertical-push', ARRAY['Deltoids', 'Triceps Brachii'], ARRAY['Upper Trapezius', 'Core'], 3, '10-15', '60s', '1. Stand on the center of the band and hold the handles at shoulder level
2. Press the handles straight up until your arms are fully extended
3. Slowly return the handles to your shoulders', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Banded Seated Row', 'banded-seated-row', 'home-workout', 'Resistance Band', 'beginner', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Biceps Brachii'], 3, '12-15', '60s', '1. Sit on the floor with legs extended and the band wrapped around your feet
2. Pull the handles toward your stomach while squeezing shoulder blades
3. Extend your arms slowly back to the start', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Banded Chest Press', 'banded-chest-press', 'home-workout', 'Resistance Band', 'intermediate', 'horizontal-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 3, '10-15', '60s', '1. Anchor the band behind you and hold one end in each hand at chest level
2. Push the handles forward until your arms are fully extended
3. Slowly return to the starting position with control', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Banded Triceps Pushdown', 'banded-triceps-pushdown', 'home-workout', 'Resistance Band', 'beginner', 'isolation', ARRAY['Triceps Brachii'], ARRAY['Core'], 3, '12-15', '45s', '1. Anchor the band high above you and hold it with elbows bent at 90 degrees
2. Push the band down until your arms are completely straight
3. Slowly bend elbows to return to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Banded Bicep Curl', 'banded-bicep-curl', 'home-workout', 'Resistance Band', 'beginner', 'isolation', ARRAY['Biceps Brachii'], ARRAY['Forearms'], 3, '12-15', '45s', '1. Stand on the band holding the handles with palms facing forward
2. Curl the handles up toward your shoulders keeping elbows stationary
3. Lower the handles back down under control', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Banded Lateral Walk', 'banded-lateral-walk', 'home-workout', 'Resistance Band', 'intermediate', 'isolation', ARRAY['Gluteus Medius', 'Gluteus Minimus'], ARRAY['Tensor Fasciae Latae'], 3, '15-20', '60s', '1. Place a loop band around your thighs just above the knees
2. Drop into a quarter squat and step to the side with one foot
3. Follow with the other foot maintaining tension in the band', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Banded Glute Bridge', 'banded-glute-bridge', 'home-workout', 'Resistance Band', 'intermediate', 'hinge', ARRAY['Gluteus Maximus'], ARRAY['Hamstrings'], 3, '15-20', '60s', '1. Wrap a band above your knees and lie on your back with knees bent
2. Push through your heels to raise your hips squeezing your glutes
3. Lower your hips slowly back to the ground', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Kettlebell Turkish Get-Up', 'kettlebell-turkish-get-up', 'home-workout', 'Kettlebell', 'advanced', 'isolation', ARRAY['Core', 'Deltoids'], ARRAY['Gluteus Maximus', 'Quadriceps'], 3, '3-5', '90s', '1. Lie on your back holding a kettlebell extended overhead with one arm
2. Transition to sitting then kneeling and finally standing while keeping the arm locked out
3. Reverse the exact steps to return to the lying position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Kettlebell Clean and Press', 'kettlebell-clean-and-press', 'home-workout', 'Kettlebell', 'advanced', 'vertical-push', ARRAY['Deltoids', 'Hamstrings'], ARRAY['Gluteus Maximus', 'Triceps Brachii'], 3, '8-10', '90s', '1. Hinge at the hips and explosively pull the kettlebell to the rack position at shoulder height
2. Press the kettlebell strictly overhead until the arm is locked
3. Lower back to the rack position then back between the legs', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Kettlebell Snatch', 'kettlebell-snatch', 'home-workout', 'Kettlebell', 'advanced', 'hinge', ARRAY['Hamstrings', 'Gluteus Maximus'], ARRAY['Deltoids', 'Trapezius'], 3, '8-10', '90s', '1. Hinge to swing the kettlebell between your legs
2. Explosively extend hips and pull the bell straight up punching your hand through at the top
3. Let the kettlebell drop in a controlled arc back between the legs', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Kettlebell Halo', 'kettlebell-halo', 'home-workout', 'Kettlebell', 'intermediate', 'rotation', ARRAY['Deltoids', 'Core'], ARRAY['Trapezius'], 3, '10-12', '60s', '1. Stand holding a kettlebell by the horns upside down in front of your chest
2. Circle the kettlebell tightly around your head in one direction
3. Return to the chest and circle in the opposite direction', '- Engage your core entirely
- Rotate from the torso, not just the arms', '- Twisting the lower back excessively
- Moving too fast without control'),
  ('Kettlebell Reverse Lunge', 'kettlebell-reverse-lunge', 'home-workout', 'Kettlebell', 'intermediate', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '10-12', '60s', '1. Hold a kettlebell in the goblet position at chest level
2. Step one foot backward and descend until both knees are bent at 90 degrees
3. Push off the front foot to return to the starting position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Kettlebell Windmill', 'kettlebell-windmill', 'home-workout', 'Kettlebell', 'advanced', 'rotation', ARRAY['Obliques', 'Core'], ARRAY['Hamstrings', 'Deltoids'], 3, '5-8', '90s', '1. Press a kettlebell overhead and angle your feet 45 degrees away from the loaded arm
2. Push your hips back and slide your free hand down the inside of your leg
3. Engage your core to return to the standing position', '- Engage your core entirely
- Rotate from the torso, not just the arms', '- Twisting the lower back excessively
- Moving too fast without control'),
  ('Kettlebell Figure 8', 'kettlebell-figure-8', 'home-workout', 'Kettlebell', 'intermediate', 'hinge', ARRAY['Gluteus Maximus', 'Hamstrings'], ARRAY['Core'], 3, '16-20', '60s', '1. Drop into a quarter squat and pass the kettlebell between your legs to your other hand
2. Bring the bell around the outside of the leg back to the front
3. Repeat the motion passing it through the legs in a figure 8 pattern', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Double Unders', 'double-unders', 'home-workout', 'Jump Rope', 'advanced', 'cardio', ARRAY['Calves', 'Core'], ARRAY['Forearms', 'Deltoids'], 4, '30s', '60s', '1. Jump slightly higher than a normal jump rope bound
2. Whip the rope rapidly to pass it under your feet twice per jump
3. Land softly on the balls of your feet', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Alternating Foot Jump Rope', 'alternating-foot-jump-rope', 'home-workout', 'Jump Rope', 'intermediate', 'cardio', ARRAY['Calves', 'Core'], ARRAY['Forearms', 'Quadriceps'], 4, '60s', '45s', '1. Swing the rope forward and hop over it with your right foot
2. On the next revolution hop over it with your left foot
3. Continue alternating feet mimicking a running in place motion', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Pull-up', 'pull-up', 'home-workout', 'Pull-up Bar', 'advanced', 'vertical-pull', ARRAY['Latissimus Dorsi', 'Biceps Brachii'], ARRAY['Rhomboids', 'Core'], 3, '5-10', '90s', '1. Grip the bar with palms facing away from you slightly wider than shoulder-width
2. Pull yourself up until your chin clears the bar
3. Lower yourself down with control to a dead hang', '- Initiate the pull by dropping your shoulders
- Drive elbows down towards hips', '- Swinging your body
- Rounding shoulders forward at the bottom'),
  ('Chin-up', 'chin-up', 'home-workout', 'Pull-up Bar', 'intermediate', 'vertical-pull', ARRAY['Latissimus Dorsi', 'Biceps Brachii'], ARRAY['Core'], 3, '6-12', '90s', '1. Grip the bar with palms facing toward you at shoulder-width
2. Pull your body up until your chin is over the bar
3. Slowly lower your body back to the starting position', '- Initiate the pull by dropping your shoulders
- Drive elbows down towards hips', '- Swinging your body
- Rounding shoulders forward at the bottom'),
  ('Hanging Leg Raise', 'hanging-leg-raise', 'home-workout', 'Pull-up Bar', 'advanced', 'isolation', ARRAY['Rectus Abdominis', 'Hip Flexors'], ARRAY['Core', 'Forearms'], 3, '10-15', '60s', '1. Hang from the bar with an overhand grip and legs straight
2. Keep legs straight and lift them until they are parallel to the floor
3. Lower them slowly and under complete control', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Toes to Bar', 'toes-to-bar', 'home-workout', 'Pull-up Bar', 'advanced', 'isolation', ARRAY['Rectus Abdominis', 'Hip Flexors'], ARRAY['Latissimus Dorsi'], 3, '8-12', '90s', '1. Hang from the bar and engage your lats by pulling down slightly
2. Hinge at the hips to lift your legs straight up until your toes touch the bar
3. Slowly lower your legs back to a dead hang', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('L-Sit Hang', 'l-sit-hang', 'home-workout', 'Pull-up Bar', 'advanced', 'isolation', ARRAY['Rectus Abdominis', 'Hip Flexors'], ARRAY['Quadriceps', 'Forearms'], 3, '15-30s', '60s', '1. Hang from the bar with a stable overhand grip
2. Raise straight legs until they are parallel to the floor forming an L shape
3. Hold this position bracing your core tightly', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Barbell Bench Press', 'barbell-bench-press', 'gym-workout', 'Barbell', 'intermediate', 'horizontal-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 4, '8-10', '120s', '1. Lie on the bench and grip the bar slightly wider than shoulder-width
2. Unrack the bar and lower it to your mid-chest with elbows tucked at 45 degrees
3. Press the bar back up to the starting position', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Incline Dumbbell Press', 'incline-dumbbell-press', 'gym-workout', 'Dumbbells', 'intermediate', 'horizontal-push', ARRAY['Pectoralis Major', 'Anterior Deltoid'], ARRAY['Triceps Brachii'], 3, '8-12', '90s', '1. Lie on a bench set to a 30-45 degree incline holding dumbbells at your chest
2. Press the dumbbells straight up until arms are fully extended
3. Lower the weights slowly back to the chest', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Cable Crossover', 'cable-crossover', 'gym-workout', 'Cable Machine', 'intermediate', 'isolation', ARRAY['Pectoralis Major'], ARRAY['Anterior Deltoid'], 3, '12-15', '60s', '1. Stand between cable pulleys set high holding a handle in each hand
2. Step forward slightly and pull the handles down and together in front of you
3. Slowly let the handles return to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Machine Chest Press', 'machine-chest-press', 'gym-workout', 'Machine', 'beginner', 'horizontal-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 3, '10-12', '60s', '1. Adjust the seat so the handles align with your mid-chest
2. Press the handles forward until your arms are fully extended
3. Slowly return the handles until you feel a stretch in your chest', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Pec Deck Fly', 'pec-deck-fly', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Pectoralis Major'], ARRAY['Anterior Deltoid'], 3, '12-15', '60s', '1. Sit on the machine with your back flat and grab the handles
2. Bring the handles together in front of your chest while maintaining a slight elbow bend
3. Slowly open your arms back to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Decline Barbell Press', 'decline-barbell-press', 'gym-workout', 'Barbell', 'intermediate', 'horizontal-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 3, '8-12', '90s', '1. Secure your feet at the end of the decline bench and lie back
2. Lower the barbell to your lower chest
3. Press the bar back up until your arms are fully extended', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Dumbbell Pullover', 'dumbbell-pullover', 'gym-workout', 'Dumbbells', 'intermediate', 'isolation', ARRAY['Pectoralis Major', 'Latissimus Dorsi'], ARRAY['Triceps Brachii'], 3, '10-15', '90s', '1. Lie across a bench with your upper back supported holding a single dumbbell over your chest
2. Keeping arms slightly bent slowly lower the dumbbell behind your head
3. Pull the dumbbell back over to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Weighted Dips', 'weighted-dips', 'gym-workout', 'Bodyweight', 'advanced', 'vertical-push', ARRAY['Pectoralis Major', 'Triceps Brachii'], ARRAY['Anterior Deltoid'], 3, '6-10', '120s', '1. Attach a weight belt and mount the dip station with arms extended
2. Lean forward slightly and lower your body until elbows are at 90 degrees
3. Press back up to full arm extension', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Lat Pulldown', 'lat-pulldown', 'gym-workout', 'Cable Machine', 'beginner', 'vertical-pull', ARRAY['Latissimus Dorsi'], ARRAY['Biceps Brachii', 'Rhomboids'], 3, '10-12', '90s', '1. Sit at the machine and grip the wide bar outside shoulder-width
2. Pull the bar down to your upper chest while leaning back slightly
3. Slowly return the bar to the top until arms are fully extended', '- Initiate the pull by dropping your shoulders
- Drive elbows down towards hips', '- Swinging your body
- Rounding shoulders forward at the bottom'),
  ('Seated Cable Row', 'seated-cable-row', 'gym-workout', 'Cable Machine', 'beginner', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Biceps Brachii', 'Erector Spinae'], 3, '10-12', '90s', '1. Sit with knees slightly bent and grab the V-handle attachment
2. Keep your torso stationary and pull the handle to your lower stomach
3. Extend arms forward under control to feel the stretch in your lats', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('T-Bar Row', 't-bar-row', 'gym-workout', 'Barbell', 'intermediate', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Biceps Brachii', 'Erector Spinae'], 3, '8-12', '90s', '1. Straddle the barbell hinge at the hips and grab the V-handle
2. Pull the weight up toward your chest keeping elbows close to the body
3. Lower the weight slowly until arms are fully extended', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Single-Arm Dumbbell Row', 'single-arm-dumbbell-row', 'gym-workout', 'Dumbbells', 'intermediate', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Biceps Brachii'], 3, '8-12', '90s', '1. Place one knee and hand on a bench with a flat back holding a dumbbell in the other hand
2. Pull the dumbbell up to your hip keeping the elbow tight to your side
3. Lower the dumbbell slowly to a full stretch', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Straight-Arm Pulldown', 'straight-arm-pulldown', 'gym-workout', 'Cable Machine', 'intermediate', 'isolation', ARRAY['Latissimus Dorsi'], ARRAY['Teres Major', 'Core'], 3, '12-15', '60s', '1. Stand facing a cable pulley holding a straight bar at face height with straight arms
2. Push the bar down in an arc to your thighs without bending elbows
3. Slowly let the bar return to face height', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Machine Reverse Fly', 'machine-reverse-fly', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Posterior Deltoid', 'Rhomboids'], ARRAY['Trapezius'], 3, '12-15', '60s', '1. Sit facing the machine pad and grip the horizontal handles
2. Pull the handles back and out in an arc squeezing shoulder blades
3. Return the handles forward with control', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Assisted Pull-up', 'assisted-pull-up', 'gym-workout', 'Machine', 'beginner', 'vertical-pull', ARRAY['Latissimus Dorsi', 'Biceps Brachii'], ARRAY['Rhomboids', 'Core'], 3, '8-12', '90s', '1. Kneel on the assist pad and grip the overhead handles
2. Pull your body up until your chin clears the handles
3. Slowly lower yourself until your arms are fully straight', '- Initiate the pull by dropping your shoulders
- Drive elbows down towards hips', '- Swinging your body
- Rounding shoulders forward at the bottom'),
  ('Pendlay Row', 'pendlay-row', 'gym-workout', 'Barbell', 'advanced', 'horizontal-pull', ARRAY['Latissimus Dorsi', 'Rhomboids'], ARRAY['Erector Spinae', 'Biceps Brachii'], 4, '6-8', '120s', '1. Hinge at the hips until your torso is parallel to the floor and grip the barbell
2. Explosively row the bar from the floor to your lower chest
3. Return the bar to a dead stop on the floor', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Seated Dumbbell Press', 'seated-dumbbell-press', 'gym-workout', 'Dumbbells', 'intermediate', 'vertical-push', ARRAY['Anterior Deltoid', 'Lateral Deltoid'], ARRAY['Triceps Brachii'], 3, '8-12', '90s', '1. Sit on a bench with back support holding dumbbells at shoulder height
2. Press the dumbbells straight overhead until arms are extended
3. Lower the dumbbells back to shoulder level slowly', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Machine Shoulder Press', 'machine-shoulder-press', 'gym-workout', 'Machine', 'beginner', 'vertical-push', ARRAY['Anterior Deltoid'], ARRAY['Triceps Brachii', 'Lateral Deltoid'], 3, '10-12', '60s', '1. Adjust the seat height so the handles are at shoulder level
2. Press the handles upward until arms are straight
3. Slowly lower the handles back down', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Cable Lateral Raise', 'cable-lateral-raise', 'gym-workout', 'Cable Machine', 'intermediate', 'isolation', ARRAY['Lateral Deltoid'], ARRAY['Anterior Deltoid', 'Trapezius'], 3, '12-15', '60s', '1. Stand sideways to a low pulley and grasp the handle with the far hand
2. Raise the arm out to the side until it reaches shoulder height
3. Slowly lower the handle back across your body', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Front Dumbbell Raise', 'front-dumbbell-raise', 'gym-workout', 'Dumbbells', 'beginner', 'isolation', ARRAY['Anterior Deltoid'], ARRAY['Pectoralis Major', 'Lateral Deltoid'], 3, '12-15', '60s', '1. Stand holding dumbbells in front of your thighs with palms facing you
2. Raise the dumbbells straight out in front until shoulder height
3. Slowly lower them back down to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Face Pulls', 'face-pulls', 'gym-workout', 'Cable Machine', 'intermediate', 'horizontal-pull', ARRAY['Posterior Deltoid', 'Rhomboids'], ARRAY['Trapezius'], 3, '12-15', '60s', '1. Set a cable pulley to upper chest height with a rope attachment
2. Pull the rope towards your face splitting the ends past your ears
3. Slowly return to the starting position', '- Squeeze shoulder blades together
- Pull with your elbows, not hands', '- Using momentum to swing the weight
- Shrugging shoulders up'),
  ('Upright Row', 'upright-row', 'gym-workout', 'Barbell', 'intermediate', 'vertical-pull', ARRAY['Lateral Deltoid', 'Trapezius'], ARRAY['Biceps Brachii'], 3, '10-12', '90s', '1. Stand holding a barbell with a slightly narrower than shoulder-width overhand grip
2. Pull the bar straight up close to your body until it reaches chest level
3. Lower the bar smoothly to the starting position', '- Initiate the pull by dropping your shoulders
- Drive elbows down towards hips', '- Swinging your body
- Rounding shoulders forward at the bottom'),
  ('Arnold Press', 'arnold-press', 'gym-workout', 'Dumbbells', 'intermediate', 'vertical-push', ARRAY['Anterior Deltoid', 'Lateral Deltoid'], ARRAY['Triceps Brachii'], 3, '8-12', '90s', '1. Sit on a bench holding dumbbells in front of your face with palms facing you
2. Press the weights overhead while simultaneously rotating your palms to face forward
3. Lower the weights reversing the rotation to the start position', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Reverse Pec Deck', 'reverse-pec-deck', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Posterior Deltoid', 'Rhomboids'], ARRAY['Trapezius'], 3, '12-15', '60s', '1. Sit facing the pad on a pec deck machine grasping the handles
2. Pull the handles outward and backward squeezing your rear delts
3. Return smoothly to the starting position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Leg Press', 'leg-press', 'gym-workout', 'Machine', 'intermediate', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings'], 3, '10-12', '90s', '1. Sit on the leg press machine with feet shoulder-width on the platform
2. Unlatch the sled and lower it until your knees are at 90 degrees
3. Press the sled back up until legs are fully extended', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Leg Extension', 'leg-extension', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Quadriceps'], ARRAY[]::text[], 3, '12-15', '60s', '1. Sit on the machine and adjust the pad to rest on your lower shins
2. Extend your legs straight out squeezing the quads
3. Slowly lower the weight back down', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Seated Leg Curl', 'seated-leg-curl', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Hamstrings'], ARRAY['Calves'], 3, '12-15', '60s', '1. Sit on the machine and place your ankles on top of the padded lever
2. Curl the lever downward towards your thighs squeezing the hamstrings
3. Return slowly to the starting straight leg position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Lying Leg Curl', 'lying-leg-curl', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Hamstrings'], ARRAY['Calves'], 3, '12-15', '60s', '1. Lie face down on the machine placing your ankles under the roller pad
2. Curl your legs upward toward your glutes
3. Lower the weight slowly to full extension', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Bulgarian Split Squat', 'bulgarian-split-squat', 'gym-workout', 'Dumbbells', 'advanced', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '8-12', '90s', '1. Stand holding dumbbells with one foot resting on a bench behind you
2. Lower your hips until the front thigh is parallel to the floor
3. Push through the front heel to stand back up', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Barbell Hip Thrust', 'barbell-hip-thrust', 'gym-workout', 'Barbell', 'intermediate', 'hinge', ARRAY['Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 3, '8-12', '90s', '1. Sit on the floor with your upper back against a bench and a barbell across your hips
2. Drive through your heels extending hips vertically until they align with your shoulders
3. Lower hips back down slowly', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Standing Calf Raise', 'standing-calf-raise', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Gastrocnemius'], ARRAY['Soleus'], 3, '15-20', '60s', '1. Stand on the machine platform with shoulders under the pads
2. Drop your heels down until you feel a deep stretch in your calves
3. Push up high onto your toes contracting the calves', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Seated Calf Raise', 'seated-calf-raise', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Soleus'], ARRAY['Gastrocnemius'], 3, '15-20', '60s', '1. Sit on the machine placing the balls of your feet on the platform and pads on your lower thighs
2. Lower your heels to a full stretch
3. Push up onto your toes squeezing the calf muscles', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Hack Squat', 'hack-squat', 'gym-workout', 'Machine', 'intermediate', 'squat', ARRAY['Quadriceps'], ARRAY['Gluteus Maximus', 'Hamstrings'], 3, '8-12', '90s', '1. Step into the machine resting your shoulders under the pads with feet shoulder-width
2. Lower the sled by bending your knees to 90 degrees
3. Press back up to the starting position extending the legs', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Glute Ham Raise', 'glute-ham-raise', 'gym-workout', 'Machine', 'advanced', 'hinge', ARRAY['Hamstrings', 'Gluteus Maximus'], ARRAY['Erector Spinae', 'Calves'], 3, '8-12', '90s', '1. Secure your feet in the GHD machine with your knees on the pads
2. Lower your torso forward slowly extending your knees
3. Pull your body back up using your hamstrings', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Barbell Curl', 'barbell-curl', 'gym-workout', 'Barbell', 'beginner', 'isolation', ARRAY['Biceps Brachii'], ARRAY['Forearms'], 3, '8-12', '60s', '1. Stand holding a barbell with an underhand shoulder-width grip
2. Curl the bar up toward your chest keeping elbows pinned to your sides
3. Lower the bar slowly to full extension', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Preacher Curl', 'preacher-curl', 'gym-workout', 'EZ Bar', 'intermediate', 'isolation', ARRAY['Biceps Brachii'], ARRAY['Forearms'], 3, '10-12', '60s', '1. Sit at the preacher bench and grab the EZ bar resting triceps on the pad
2. Curl the weight up towards your shoulders
3. Lower the bar until your arms are fully extended', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Cable Bicep Curl', 'cable-bicep-curl', 'gym-workout', 'Cable Machine', 'beginner', 'isolation', ARRAY['Biceps Brachii'], ARRAY['Forearms'], 3, '12-15', '60s', '1. Stand facing a low cable pulley holding a straight bar attachment
2. Curl the bar upwards keeping elbows fixed
3. Return the bar slowly to the start position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Hammer Curl', 'hammer-curl', 'gym-workout', 'Dumbbells', 'beginner', 'isolation', ARRAY['Brachialis', 'Biceps Brachii'], ARRAY['Brachioradialis'], 3, '10-12', '60s', '1. Stand holding dumbbells at your sides with palms facing inward
2. Curl the weights up keeping your palms facing each other
3. Slowly lower back down to your sides', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Incline Dumbbell Curl', 'incline-dumbbell-curl', 'gym-workout', 'Dumbbells', 'intermediate', 'isolation', ARRAY['Biceps Brachii'], ARRAY['Forearms'], 3, '10-12', '60s', '1. Sit on an incline bench holding dumbbells letting arms hang straight down
2. Curl the weights up keeping your upper arms completely still
3. Lower the weights back to a dead hang', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Triceps Rope Pushdown', 'triceps-rope-pushdown', 'gym-workout', 'Cable Machine', 'beginner', 'isolation', ARRAY['Triceps Brachii'], ARRAY['Forearms'], 3, '12-15', '60s', '1. Stand facing a high pulley gripping the rope attachment
2. Push the rope downward spreading the ends apart at the bottom
3. Slowly let the rope rise back up to chest level', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Skull Crushers', 'skull-crushers', 'gym-workout', 'EZ Bar', 'intermediate', 'isolation', ARRAY['Triceps Brachii'], ARRAY['Forearms'], 3, '10-12', '90s', '1. Lie flat on a bench holding an EZ bar extended straight up over your chest
2. Bend your elbows to lower the bar toward your forehead
3. Press the bar back up to full extension', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Overhead Cable Extension', 'overhead-cable-extension', 'gym-workout', 'Cable Machine', 'intermediate', 'isolation', ARRAY['Triceps Brachii'], ARRAY['Core'], 3, '12-15', '60s', '1. Attach a rope to a low pulley and grab it holding it behind your head
2. Push the rope straight up overhead extending your arms
3. Lower the rope slowly back behind your head', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Close-Grip Bench Press', 'close-grip-bench-press', 'gym-workout', 'Barbell', 'intermediate', 'horizontal-push', ARRAY['Triceps Brachii', 'Pectoralis Major'], ARRAY['Anterior Deltoid'], 3, '8-10', '90s', '1. Lie on a bench gripping the barbell slightly narrower than shoulder-width
2. Lower the bar to your lower chest keeping elbows tucked in
3. Press the bar back up locking out the triceps', '- Keep shoulders down and back
- Control the eccentric (lowering) phase', '- Flaring elbows out too wide
- Bouncing the weight at the bottom'),
  ('Machine Triceps Extension', 'machine-triceps-extension', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Triceps Brachii'], ARRAY[]::text[], 3, '12-15', '60s', '1. Sit at the machine resting the back of your arms on the pad
2. Push the handles down extending your arms fully
3. Slowly allow the handles to return to the top position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Cable Crunch', 'cable-crunch', 'gym-workout', 'Cable Machine', 'intermediate', 'isolation', ARRAY['Rectus Abdominis'], ARRAY['Obliques'], 3, '15-20', '60s', '1. Kneel below a high cable pulley holding a rope attachment behind your neck
2. Crunch your torso downward bringing your elbows toward your knees
3. Slowly return to the upright kneeling position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Ab Wheel Rollout', 'ab-wheel-rollout', 'gym-workout', 'Ab Wheel', 'advanced', 'isolation', ARRAY['Rectus Abdominis', 'Core'], ARRAY['Latissimus Dorsi', 'Triceps Brachii'], 3, '8-12', '90s', '1. Kneel on the floor holding the ab wheel directly under your shoulders
2. Roll the wheel forward extending your body as far as you can control
3. Pull the wheel back to the starting position using your core', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Hanging Knee Raise', 'hanging-knee-raise', 'gym-workout', 'Pull-up Bar', 'intermediate', 'isolation', ARRAY['Rectus Abdominis', 'Hip Flexors'], ARRAY['Core'], 3, '12-15', '60s', '1. Hang from a bar with a shoulder-width overhand grip
2. Bring your knees up towards your chest
3. Lower your legs slowly to a dead hang', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Decline Crunch', 'decline-crunch', 'gym-workout', 'Decline Bench', 'intermediate', 'isolation', ARRAY['Rectus Abdominis'], ARRAY['Hip Flexors', 'Obliques'], 3, '15-20', '60s', '1. Secure your legs at the top of a decline bench and lean back
2. Crunch your upper body upward reaching toward your knees
3. Lower your torso back down with control', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Machine Crunch', 'machine-crunch', 'gym-workout', 'Machine', 'beginner', 'isolation', ARRAY['Rectus Abdominis'], ARRAY['Core'], 3, '15-20', '60s', '1. Sit in the ab machine securing your feet and gripping the handles
2. Contract your abs to pull your torso forward against the resistance
3. Slowly return to the starting upright position', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Russian Twist with Medicine Ball', 'russian-twist-with-medicine-ball', 'gym-workout', 'Medicine Ball', 'intermediate', 'rotation', ARRAY['Obliques', 'Rectus Abdominis'], ARRAY['Hip Flexors'], 3, '20-30', '60s', '1. Sit on the floor holding a medicine ball with legs slightly elevated
2. Twist your torso to touch the ball to the floor on your right
3. Twist to touch the ball on your left side', '- Engage your core entirely
- Rotate from the torso, not just the arms', '- Twisting the lower back excessively
- Moving too fast without control'),
  ('Woodchoppers', 'woodchoppers', 'gym-workout', 'Cable Machine', 'intermediate', 'rotation', ARRAY['Obliques', 'Core'], ARRAY['Deltoids'], 3, '12-15', '60s', '1. Stand sideways to a high cable pulley holding the handle with both hands
2. Pull the handle diagonally downward across your body to the opposite knee
3. Return slowly to the starting high position', '- Engage your core entirely
- Rotate from the torso, not just the arms', '- Twisting the lower back excessively
- Moving too fast without control'),
  ('Captains Chair Leg Raise', 'captains-chair-leg-raise', 'gym-workout', 'Captains Chair', 'intermediate', 'isolation', ARRAY['Rectus Abdominis', 'Hip Flexors'], ARRAY['Core'], 3, '12-15', '60s', '1. Position yourself in the chair with back flat against the pad and forearms supported
2. Raise your straight legs until they are parallel to the floor
3. Lower them slowly and under control', '- Focus on the mind-muscle connection
- Control the weight throughout the entire range', '- Using momentum to lift the weight
- Rushing through the reps'),
  ('Treadmill Sprint', 'treadmill-sprint', 'gym-workout', 'Treadmill', 'advanced', 'cardio', ARRAY['Quadriceps', 'Hamstrings'], ARRAY['Calves', 'Gluteus Maximus'], 6, '30s', '60s', '1. Set the treadmill to a challenging sprinting speed
2. Sprint with max effort for the designated time
3. Step onto the side rails to rest or reduce speed', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Rowing Machine', 'rowing-machine', 'gym-workout', 'Rowing Machine', 'intermediate', 'cardio', ARRAY['Latissimus Dorsi', 'Quadriceps'], ARRAY['Hamstrings', 'Core'], 4, '500m', '90s', '1. Sit on the seat strap in feet and grab the handle with straight arms
2. Push with your legs then pull with your arms leaning back slightly
3. Reverse the motion by extending arms then bending knees', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Stair Climber', 'stair-climber', 'gym-workout', 'Stair Climber', 'intermediate', 'cardio', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Calves', 'Hamstrings'], 1, '15m', '0s', '1. Step onto the revolving stairs and select a steady pace
2. Climb the stairs continuously maintaining an upright posture
3. Use the handrails only for light balance', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Elliptical Trainer', 'elliptical-trainer', 'gym-workout', 'Elliptical', 'beginner', 'cardio', ARRAY['Quadriceps', 'Hamstrings'], ARRAY['Gluteus Maximus', 'Calves'], 1, '20m', '0s', '1. Step onto the pedals and grab the moving handles
2. Push and pull the handles while simultaneously pedaling your legs
3. Maintain a steady rhythm and upright posture', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Stationary Bike', 'stationary-bike', 'gym-workout', 'Stationary Bike', 'beginner', 'cardio', ARRAY['Quadriceps', 'Hamstrings'], ARRAY['Calves', 'Gluteus Maximus'], 1, '20m', '0s', '1. Adjust the seat height so your leg is almost straight at the bottom of the pedal stroke
2. Pedal at a steady resistance and pace
3. Keep your upper body relaxed and hands lightly on the bars', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Assault Bike', 'assault-bike', 'gym-workout', 'Assault Bike', 'advanced', 'cardio', ARRAY['Quadriceps', 'Deltoids'], ARRAY['Core', 'Hamstrings'], 5, '30s', '60s', '1. Sit on the bike placing feet on pedals and hands on the handles
2. Pedal hard and push/pull the handles simultaneously with maximum effort
3. Slow down to a relaxed pace during the rest interval', '- Pace yourself to maintain steady breathing
- Focus on proper form even when fatigued', '- Starting too fast and burning out
- Holding your breath'),
  ('Barbell Back Squat', 'barbell-back-squat', 'gym-workout', 'Barbell', 'intermediate', 'squat', ARRAY['Quadriceps', 'Gluteus Maximus'], ARRAY['Hamstrings', 'Core'], 4, '5-8', '120s', '1. Place the barbell on your upper back and stand with feet shoulder-width apart
2. Push your hips back and bend your knees to lower into a squat
3. Drive through your feet to stand back up to the starting position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back'),
  ('Barbell Conventional Deadlift', 'barbell-conventional-deadlift', 'gym-workout', 'Barbell', 'intermediate', 'hinge', ARRAY['Hamstrings', 'Gluteus Maximus'], ARRAY['Erector Spinae', 'Latissimus Dorsi'], 4, '5-8', '120s', '1. Stand with the barbell over your mid-foot and hinge to grab the bar
2. Pull the slack out of the bar, keep your chest up, and flatten your back
3. Drive through your legs and extend your hips to stand up straight', '- Maintain a neutral spine
- Push hips back to feel a stretch', '- Rounding the lower back
- Bending knees too much instead of hinging'),
  ('Barbell Overhead Press', 'barbell-overhead-press', 'gym-workout', 'Barbell', 'intermediate', 'vertical-push', ARRAY['Anterior Deltoid', 'Triceps Brachii'], ARRAY['Lateral Deltoid', 'Core'], 4, '5-8', '120s', '1. Stand holding the barbell in a front rack position across your collarbone
2. Brace your core and press the bar strictly overhead until arms are locked
3. Lower the bar under control back to the collarbone', '- Brace your core to prevent arching
- Press in a straight path', '- Leaning back excessively
- Using momentum from the legs'),
  ('Barbell Front Squat', 'barbell-front-squat', 'gym-workout', 'Barbell', 'advanced', 'squat', ARRAY['Quadriceps', 'Core'], ARRAY['Gluteus Maximus', 'Upper Back'], 4, '5-8', '120s', '1. Rest the barbell on your front deltoids keeping elbows pointed forward and high
2. Lower into a squat keeping your torso completely upright
3. Drive through your heels to return to the standing position', '- Keep your chest upright
- Drive through your heels', '- Letting knees cave inward
- Rounding the lower back')
),
equipment_map AS (
  SELECT DISTINCT ON (lower(name)) id, name
  FROM public.equipment
  ORDER BY lower(name), id
)
INSERT INTO public.exercises (
  name,
  slug,
  category_id,
  equipment_id,
  difficulty,
  movement_pattern,
  primary_muscles,
  secondary_muscles,
  sets,
  reps,
  rest_time,
  instructions,
  tips,
  common_mistakes,
  image_url,
  video_url,
  video_url_side,
  video_url_front,
  is_published,
  updated_at
)
SELECT
  sd.name,
  sd.slug,
  c.id,
  em.id,
  sd.difficulty,
  sd.movement_pattern,
  sd.primary_muscles,
  sd.secondary_muscles,
  sd.sets_count,
  sd.reps_text,
  sd.rest_time_text,
  sd.instructions_text,
  sd.tips_text,
  sd.common_mistakes_text,
  NULL,
  NULL,
  NULL,
  NULL,
  true,
  now()
FROM source_data sd
JOIN public.categories c ON c.slug = sd.category_slug
LEFT JOIN equipment_map em ON lower(em.name) = lower(sd.equipment_name)
WHERE sd.slug NOT IN ('banded-hip-extension', 'banded-pull-apart', 'banded-squat', 'bicep-curl', 'bodyweight-squat', 'boxer-step-jump-rope', 'dumbbell-romanian-deadlift', 'goblet-squat', 'high-knees-jump-rope', 'jump-rope-basic', 'kettlebell-goblet-squat', 'kettlebell-high-pull', 'kettlebell-swing', 'plank', 'push-up')
ON CONFLICT (slug) DO NOTHING;

COMMIT;
