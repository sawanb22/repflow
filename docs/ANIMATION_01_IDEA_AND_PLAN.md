# RepFlow — Exercise Animation System: Full Idea & Plan
## Document Type: Concept & Strategy
## Version: 1.0 | May 2026

---

## THE IDEA

Instead of expensive AI-generated videos, RepFlow uses a 
frame-by-frame motion sequence animation.

A series of 2-5 still images crossfade in a loop showing 
users exactly how to perform each exercise.

This is better than video because:
- No video hosting costs
- Loads instantly — no buffering
- Works on any connection speed
- Each frame teaches a clear body position
- The pause between frames lets users study the stance
- Looks premium and intentional
- Easy to update — just swap one image

---

## HOW IT LOOKS TO THE USER

The exercise card and detail page show a looping animation:

```
[Start Position — 1.5s]
        ↓ smooth 300ms crossfade
[Mid Position — 1.5s]
        ↓ smooth 300ms crossfade
[End Position — 1.5s]
        ↓ smooth 300ms crossfade
[Loop back to Start]
```

---

## FILE STRUCTURE

Every exercise gets its own folder inside /public/exercises/
The folder name matches the exercise slug exactly.

```
/public/exercises/
├── push-up/
│   ├── frame-1.png    ← starting position
│   ├── frame-2.png    ← mid movement
│   └── frame-3.png    ← end position
│
├── barbell-squat/
│   ├── frame-1.png
│   ├── frame-2.png
│   ├── frame-3.png
│   └── frame-4.png
```

Rules:
- Folder name = exercise slug exactly
- Always name files frame-1.png, frame-2.png etc.
- PNG format only
- Minimum 2 frames, maximum 5 frames
- If folder has 1 image → show static
- If folder does not exist → show grey placeholder

---

## FRAME COUNT LOGIC

Number of frames depends on movement complexity:

| movement_pattern | frames | reason |
|---|---|---|
| isolation | 3 | simple single joint |
| horizontal-push | 3 | push up, bench press |
| horizontal-pull | 3 | row, cable row |
| vertical-push | 3 | shoulder press |
| vertical-pull | 3 | pulldown, pull-up |
| squat | 4 | multi-phase compound |
| hinge | 4 | multi-phase compound |
| carry | 2 | walking motion |
| rotation | 3 | twist movements |
| cardio | 2 | simple repeat motion |

Special complex exercises override with 5 frames:
- Turkish Get-Up
- Power Clean
- Burpee
- Snatch

---

## IMAGE STYLE RULES

Every image must follow these rules for consistency:

- Background: Pure white or transparent
- Subject: Athletic male, medium build
- Clothing: Dark fitted workout clothes
- Framing: Full body visible, centered, portrait
- Lighting: Clean, even, no harsh shadows
- No text, no logos, no watermarks
- Same person, same clothing across all exercises
- Size: 800x1000px minimum, portrait orientation

The app provides the dark card background — 
images should be white/transparent so they 
look consistent on any background color.

---

## PRIORITY ORDER

Priority 1 — most viewed (15 exercises):
push-up, bodyweight-squat, plank, forward-lunges,
glute-bridge, bicep-curl, dumbbell-romanian-deadlift,
goblet-squat, kettlebell-swing, barbell-bench-press,
barbell-squat, lat-pulldown, overhead-press,
barbell-row, pull-up

Priority 2 — complete home set (next 15)
Priority 3 — complete gym set
Priority 4 — remaining exercises

---

## BUSINESS IMPACT

- Zero video hosting costs
- Faster loading than video — better mobile experience
- Cheaper to produce than video
- Easier to update — swap one PNG
- Teaches better than smooth video — each position is clear
- Works offline once cached
