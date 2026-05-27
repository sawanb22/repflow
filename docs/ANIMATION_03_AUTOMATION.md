# RepFlow — Exercise Animation System: Automation
## Document Type: Technical Specification
## Version: 1.0 | May 2026
## Prerequisite: ANIMATION_02_PILOT_TEST_STATUS.md complete

---

## OVERVIEW

A Node.js script that automatically generates frame images
for all 132 exercises using an AI image generation API.

Run once → all 132 exercises done in 20-30 minutes.
Skips exercises that already have images.
Can be safely rerun at any time.

---

## SCRIPT LOCATION

```
/scripts/generate-exercise-images.js
```

Run with:
```
node scripts/generate-exercise-images.js
```

Test with push-up only first:
```
node scripts/generate-exercise-images.js --test
```

---

## ENVIRONMENT VARIABLES

Add these to .env.local:

```
IMAGE_API_KEY=your_api_key_here
IMAGE_API_PROVIDER=stability
```

Supported providers: stability / ideogram
Never commit API keys to git.
Add /scripts/progress.json to .gitignore

---

## HOW THE SCRIPT WORKS

### Step 1 — Read exercises from Supabase
Connects to Supabase using existing env variables.
Reads all exercises with these fields:
name, slug, movement_pattern, primary_muscles, difficulty

### Step 2 — Determine frame count per exercise
Maps movement_pattern to frame count:

```
isolation       → 3 frames
horizontal-push → 3 frames
horizontal-pull → 3 frames
vertical-push   → 3 frames
vertical-pull   → 3 frames
squat           → 4 frames
hinge           → 4 frames
carry           → 2 frames
rotation        → 3 frames
cardio          → 2 frames
```

Special overrides (5 frames):
turkish-get-up, power-clean, burpee, snatch

### Step 3 — Build prompt for each frame
Base prompt (same for all):
```
Athletic male, dark fitted workout clothes,
pure white background, professional fitness photography,
full body visible, portrait orientation, sharp focus,
even lighting, no text, no logo, photorealistic,
performing [exercise name]
```

Frame position lookup by movement_pattern:

horizontal-push:
- frame-1: arms fully extended, body in straight plank
- frame-2: chest near surface, elbows at 45 degrees
- frame-3: arms fully extended, completing the rep

horizontal-pull:
- frame-1: arms fully extended toward resistance
- frame-2: halfway pulled, elbows at 90 degrees
- frame-3: full contraction, elbows behind body

vertical-push:
- frame-1: weight at shoulder level, elbows bent
- frame-2: halfway extended, elbows at 135 degrees
- frame-3: arms fully extended overhead

vertical-pull:
- frame-1: arms fully extended above head
- frame-2: halfway down, elbows at 90 degrees
- frame-3: full contraction, elbows at sides

squat:
- frame-1: standing tall, feet shoulder width apart
- frame-2: quarter depth, beginning descent
- frame-3: parallel depth, thighs parallel to floor
- frame-4: standing tall, completing the rep

hinge:
- frame-1: standing tall, weight at hip level
- frame-2: beginning hip hinge, slight knee bend
- frame-3: full hinge, back flat, weight at mid shin
- frame-4: standing tall, hips fully extended

carry:
- frame-1: standing tall, weight held at sides
- frame-2: mid stride, walking forward

rotation:
- frame-1: starting position, facing forward
- frame-2: mid rotation, torso twisted 45 degrees
- frame-3: full rotation, end range of motion

isolation:
- frame-1: starting position, muscle fully relaxed
- frame-2: halfway through range of motion
- frame-3: peak contraction, end position

cardio:
- frame-1: standing or ready position
- frame-2: mid movement, active position

### Step 4 — Call image generation API
Send prompt to API.
Download the returned image.
Save to correct path:
/public/exercises/{slug}/frame-{n}.png

### Step 5 — Batch processing
Process 10 exercises at a time.
Wait 2 seconds between batches.
Prevents API rate limiting.

### Step 6 — Skip logic
Before generating — check if folder already has
the correct number of frames for that exercise.
If yes → skip entirely.
This makes the script safely rerunable.

### Step 7 — Progress tracking
Save progress to /scripts/progress.json:
```json
{
  "push-up": "done",
  "barbell-squat": "done", 
  "forward-lunges": "failed",
  "bicep-curl": "pending"
}
```

If script is stopped → rerun resumes from where it left off.
Pending and failed exercises are retried.
Done exercises are skipped.

### Step 8 — Retry logic
Failed generations retry up to 3 times.
If still failing after 3 tries → mark as failed.
Continue to next exercise — do not stop the whole script.

### Step 9 — Final summary
Print to console when complete:
```
=== Generation Complete ===
Total exercises: 132
Done: 128
Skipped (already had images): 0
Failed: 4
Failed exercises: turkish-get-up, power-clean, ...
Rerun script to retry failed exercises.
```

---

## PRIORITY ORDER FOR GENERATION

The script processes exercises in this order
so most important ones are done first:

Priority 1 (first 15 — process these first):
push-up, bodyweight-squat, plank, forward-lunges,
glute-bridge, bicep-curl, dumbbell-romanian-deadlift,
goblet-squat, kettlebell-swing, barbell-bench-press,
barbell-squat, lat-pulldown, overhead-press,
barbell-row, pull-up

Priority 2 — remaining home exercises
Priority 3 — remaining gym exercises

Script reads priority from a hardcoded array.
Any exercise not in priority lists is processed last.

---

## IMAGE API OPTIONS

### Option A — Stability AI
- Cost: ~$0.01 per image
- 396 images total × $0.01 = ~$4 total
- API docs: https://platform.stability.ai
- Best for: speed, cost

### Option B — Ideogram API  
- Cost: ~$0.02 per image
- 396 images total × $0.02 = ~$8 total
- API docs: https://ideogram.ai/api
- Best for: human pose accuracy

Recommended: Start with Ideogram for better pose quality.

---

## AFTER SCRIPT COMPLETES

1. Check /scripts/progress.json for any failures
2. Rerun script to retry failed exercises
3. Manually check a sample of generated images
4. Verify animation works on browse and detail pages
5. Remove --test flag comments from browse-content.tsx
   and exercise detail page — roll out to all exercises
6. Deploy to Vercel

---

## ROLLING OUT TO ALL EXERCISES

Once images are generated for all exercises,
update the app to use ExerciseMediaV2 for all exercises
not just push-up.

Agent prompt for rollout:
```
Read CLAUDE.md first.

The push-up animation pilot was successful.
All 132 exercises now have frame images generated.

Roll out ExerciseMediaV2 to all exercises:

1. In app/home/browse/browse-content.tsx
   Replace ExerciseMedia with ExerciseMediaV2 
   for all exercise cards — not just push-up
   Remove the testing phase comment

2. In app/home/exercise/[slug]/page.tsx
   Replace ExerciseMedia with ExerciseMediaV2
   for all exercise detail pages — not just push-up
   Remove the testing phase comment

3. Keep ExerciseMedia component — do not delete it
   It is still used as fallback inside ExerciseMediaV2

Run npm run build — must pass clean.
Report files changed.
```

---

## IMPORTANT RULES

- Never overwrite existing frame images
- Never touch any app code — script only
- Never commit API keys to git
- Add scripts/progress.json to .gitignore
- Script is completely standalone
- Does not affect the running app at all
- All images saved locally — Vercel deploys them automatically

---

*Document Owner: RepFlow Founder*
*Last Updated: May 2026*
*Version: 1.0*
*Read after: ANIMATION_01_IDEA_AND_PLAN.md*
*Read after: ANIMATION_02_PILOT_TEST_STATUS.md*
