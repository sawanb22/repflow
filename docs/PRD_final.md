# RepFlow — Product Requirements Document (PRD)
## Version 3.0 | May 2026
## Status: Final — Source of Truth
## Next Review: After Phase 8 Launch

---

## Change History

| Version | Date | What Changed |
|---|---|---|
| 1.0 | May 2026 | Initial PRD created |
| 2.0 | May 2026 | Merged with design and onboarding documents |
| 3.0 | May 2026 | Removed design details (moved to UIUX.md), cleaned to professional PRD standard |

---

## 1. OVERVIEW

### 1.1 Product Name
RepFlow

### 1.2 Product Summary
RepFlow is a personalized fitness web application that helps people aged 16–45 discover workouts, build consistency, and stay motivated — whether they train at home, at the gym, or both.

### 1.3 Problem Statement
Most people who want to get fit quit within weeks. Not because they lack motivation — but because:
- They don't know what exercises to do today
- They don't know if their form is correct
- They can't build a structured plan around what they own
- Existing apps are bloated, expensive, or overwhelming
- Nothing tells them exactly what to do — they have to figure it out themselves
- Apps make them feel punished when they miss a day

### 1.4 Solution
RepFlow removes all friction. The app learns the user's goal, equipment, and training style on day one. It then tells them exactly what to do, shows them how to do it correctly, and keeps them coming back through gentle motivation — not guilt.

### 1.5 Product Positioning
RepFlow is not a gym tracker. It is not a calorie counter. It is not a bodybuilding app. RepFlow is a personal fitness companion — guided, simple, and motivating — for everyone.

---

## 2. GOALS AND SUCCESS METRICS

### 2.1 Product Goals
- Help users discover the right workouts for their goals and equipment
- Build daily workout consistency through habit-forming features
- Deliver a personalized experience from the very first minute
- Cover home, gym, yoga, mobility, and recovery in one place
- Be self-sustaining — minimal manual work after launch

### 2.2 Business Goals
- Validate the product with real users before spending money
- Reach 1,000 active users as the first milestone
- Launch freemium subscription after validation
- Build creator marketplace as long-term revenue engine
- Keep maintenance burden low — no physical products, no personal coaching dependency

### 2.3 Success Metrics

| Metric | Target |
|---|---|
| Registered users | 1,000 minimum (6-month goal) |
| 7-day retention | 40% of users return within 7 days |
| Average session length | Over 3 minutes |
| Workout completions | At least 200 full workouts completed |
| Qualitative signal | Users say "this is the only app I need" |

### 2.4 Release Criteria
The product is ready to launch when:
- A user can sign up, complete onboarding, browse exercises, and start a workout in under 5 minutes
- At least 15 exercises are published with video or image
- All routes are protected and secure
- The app loads in under 2 seconds on a mobile browser
- No critical bugs exist in the core user journey

---

## 3. TARGET USERS

### 3.1 Demographics
- Age: 16 to 45
- Geography: Global — English first, regional languages later
- Fitness Level: Complete beginners to intermediate
- Gender: All genders

### 3.2 User Personas

---

**Persona A — The Home Warrior**
- Age: 22–35
- Situation: Works out at home. Has dumbbells or resistance bands. Has tried YouTube but finds it chaotic and unstructured.
- Goal: Lose fat or build muscle without a gym membership
- Frustration: Too many choices, no structure, can't tell if form is right
- What they need from RepFlow: A plan that uses their equipment, shows them how to do it correctly, tells them what to do today

---

**Persona B — The Gym Goer**
- Age: 18–40
- Situation: Has a gym membership but follows random routines or just wanders around the gym
- Goal: Build muscle, improve physique, get stronger
- Frustration: No structured plan, wastes time deciding what to do, inconsistent results
- What they need from RepFlow: A gym-specific weekly plan they can follow on their phone, exercise by exercise

---

**Persona C — The Hybrid**
- Age: 25–40
- Situation: Some days works out at home, some days goes to the gym depending on schedule
- Goal: Stay consistent regardless of where they are
- Frustration: Switching between apps or having no plan when location changes
- What they need from RepFlow: One app that adapts to both environments seamlessly

---

**Persona D — The Wellness Seeker**
- Age: 20–45
- Situation: Not just about lifting — interested in yoga, mobility, breathing, and recovery
- Goal: Feel better, move better, reduce stress
- Frustration: Most fitness apps are too intense or bodybuilding-focused
- What they need from RepFlow: Yoga, mobility, and recovery content alongside regular workouts

---

**Persona E — The Returner**
- Age: 28–45
- Situation: Used to be active. Life happened — kids, work, stress. Wants to get back on track.
- Goal: Rebuild a habit without getting overwhelmed
- Frustration: Starting from zero feels intimidating. Most apps assume you already know what you're doing.
- What they need from RepFlow: A gentle, simple entry point with beginner-friendly content and a plan that builds gradually

---

## 4. USER SCENARIOS

### Scenario 1 — First Time User (Home, No Equipment)
Riya, 24, opens RepFlow for the first time. She signs up, confirms her email, and is taken through the onboarding quiz. She selects Home, Fat Loss, and Bodyweight only. Her homepage shows a personalized Today's Workout card with a 20-minute bodyweight fat loss session. She taps Start, follows the exercise videos, completes the workout, and sees a completion screen with her stats. Her streak starts at 1.

### Scenario 2 — Returning User (Gym, Dumbbells)
Arjun, 30, opens RepFlow on a Tuesday morning before going to the gym. His homepage shows his weekly plan. Today is chest and triceps day. He taps Start Workout, follows each exercise on his phone between sets, logs his reps, and completes the session. His streak updates to 14 days.

### Scenario 3 — Wellness Seeker (Yoga)
Sara, 38, opens RepFlow after a stressful day. She doesn't want to lift — she wants to unwind. She goes to the browse page, selects Yoga, filters by Evening and Beginner. She finds a 15-minute yoga flow, follows the video, and marks it complete.

### Scenario 4 — Returner (Starting Fresh)
Vikram, 42, hasn't worked out in two years. He signs up and selects Starting Fresh experience level. RepFlow gives him a beginner 3-days-per-week plan with simple exercises, short durations, and clear videos. Nothing is overwhelming. He completes day one and feels good.

---

## 5. FEATURES AND REQUIREMENTS

Features are prioritized using MoSCoW: Must Have, Should Have, Could Have, Won't Have (now).

---

### 5.1 Authentication

| Feature | Priority |
|---|---|
| Email and password signup | Must Have |
| Email and password login | Must Have |
| Email confirmation | Must Have |
| Forgot password flow | Must Have |
| Google OAuth login | Should Have |
| Protected routes (middleware) | Must Have |
| Secure sessions | Must Have |

---

### 5.2 Onboarding

| Feature | Priority |
|---|---|
| Welcome screen | Must Have |
| Fitness goal selection (multi-select) | Must Have |
| Training style selection (Home / Gym / Both / Yoga / Recovery) | Must Have |
| Equipment selection (multi-select) | Must Have |
| Workout schedule (days per week, duration) | Should Have |
| Experience level selection | Must Have |
| Limitations and recovery flags (optional, skippable) | Could Have |
| Personalization summary screen before entering app | Should Have |
| Shown only once — on first signup | Must Have |
| Skippable (user can skip and edit later in settings) | Should Have |
| All answers saved to database | Must Have |
| Changeable later in Settings | Must Have |

---

### 5.3 Personalized Homepage

| Feature | Priority |
|---|---|
| Personalized greeting by time of day and name | Must Have |
| Today's Workout card with Start button | Must Have |
| Sections shown or hidden based on onboarding answers | Must Have |
| Streak counter | Should Have |
| Weekly progress indicator | Should Have |
| Personalized exercise recommendations | Should Have |
| Netflix-style browsing rows by category | Could Have |
| Quick stats (total workouts, total time) | Could Have |
| Music / playlist integration (Spotify, Apple Music) | Won't Have (now) |

---

### 5.4 Exercise Library

| Feature | Priority |
|---|---|
| Browse page with exercise card grid | Must Have |
| Equipment filter tabs | Must Have |
| Muscle group filter | Should Have |
| Difficulty filter | Should Have |
| Search by exercise name | Should Have |
| Sort by Popular / New / A-Z | Could Have |
| Favorites / save exercise | Should Have |
| Exercise detail page | Must Have |
| Looping video demo on detail page | Must Have |
| Two-angle video toggle (side / front) | Should Have |
| Sets / Reps / Rest cards | Must Have |
| Primary and secondary muscle targeting | Must Have |
| Step-by-step instructions | Must Have |
| Common mistakes section | Should Have |
| Related exercises section | Could Have |
| Add to Plan button | Should Have |
| Start Exercise button | Should Have |

---

### 5.5 Workout Categories

**Home Workout (Phase 4 — Active)**
- Bodyweight: Upper Body, Lower Body, Core, Full Body / HIIT
- Dumbbells: Upper Body, Lower Body, Full Body
- Resistance Bands: Upper Body, Lower Body, Full Body
- Kettlebell: Ballistic / Power, Strength / Grind, Mobility / Core
- Jump Rope: Cardio / Agility
- Pull-Up Bar: Pulling Mechanics, Core Mechanics
- Household Items: Chair, Sliders
- Yoga: Beginner, Intermediate, Advanced, Morning, Evening
- Mobility: Hip, Shoulder, Spine, Full Body
- Stretching: Static, Dynamic, Post-workout
- Breathwork: Recovery, Focus, Energy

**Gym Workout (Phase 5 — Upcoming)**
- Chest: Horizontal Push, Incline / Decline
- Back: Vertical Pull, Horizontal Pull
- Shoulders: Vertical Push, Lateral and Rear Delt
- Legs: Squat Pattern, Hinge Pattern, Isolation
- Arms: Biceps, Triceps
- Core: Anti-Extension, Anti-Rotation
- Cardio Machines: Treadmill, Bike, Rowing, Stairmaster

---

### 5.6 Weekly Planner

| Feature | Priority |
|---|---|
| Monday to Sunday day view | Must Have |
| Exercises assigned per day | Must Have |
| Rest day markers | Must Have |
| Start today's workout from plan | Must Have |
| Auto-generate plan from user preferences | Should Have |
| Edit and reorder exercises manually | Should Have |
| Drag to reorder exercises | Could Have |
| Copy a day's plan to another day | Could Have |
| Plan completion percentage | Should Have |

---

### 5.7 Active Workout Mode

| Feature | Priority |
|---|---|
| Current exercise display with video | Must Have |
| Set tracker with checkboxes | Must Have |
| Rest timer with sound alert | Must Have |
| Progress indicator (exercise 3 of 8) | Must Have |
| Next exercise preview card | Should Have |
| Skip exercise option | Should Have |
| Pause and resume | Should Have |
| Modify reps on the fly | Could Have |
| Voice cues | Won't Have (now) |

---

### 5.8 Workout Complete Screen

| Feature | Priority |
|---|---|
| Completion animation | Must Have |
| Total stats (time, exercises, sets) | Must Have |
| Streak update | Must Have |
| Muscles worked visual | Should Have |
| Share to social feed button | Should Have |
| Next workout preview | Should Have |
| Calories estimate | Could Have |
| Personal record detection | Could Have |

---

### 5.9 Progress Tracking

| Feature | Priority |
|---|---|
| Daily streak counter | Must Have |
| Longest streak record | Must Have |
| Streak badges at milestones (7, 30, 100 days) | Should Have |
| Workout history list | Should Have |
| Weekly completion heatmap | Should Have |
| Total workout stats | Should Have |
| Achievement badges | Could Have |

---

### 5.10 Settings

| Feature | Priority |
|---|---|
| Edit workout preferences (re-take onboarding) | Must Have |
| Edit profile name and photo | Should Have |
| Change email | Should Have |
| Change password | Should Have |
| Notification preferences | Could Have |
| Units toggle (kg vs lbs) | Could Have |
| Log out | Must Have |
| Delete account | Should Have |

---

### 5.11 Landing Page

| Feature | Priority |
|---|---|
| Hero section with headline and CTA | Must Have |
| Problem section | Must Have |
| Features section | Must Have |
| Home vs Gym category choice | Must Have |
| Final CTA | Must Have |
| SEO meta tags | Must Have |
| OG image for social sharing | Should Have |
| No login required to view | Must Have |

---

### 5.12 Social Feed (V2 — Post Launch)

| Feature | Priority |
|---|---|
| Auto completion post after workout | Should Have |
| Optional photo post | Should Have |
| Like and react | Should Have |
| Comments | Could Have |
| Weekly leaderboard | Could Have |
| Follow friends | Could Have |

---

### 5.13 AI Workout Planner (V3)

| Feature | Priority |
|---|---|
| AI generates weekly plan from user data | Must Have (when built) |
| Plan adapts based on progress | Should Have (when built) |
| Smart recovery suggestions | Could Have (when built) |

---

### 5.14 Live AI Pose Correction (V4 — Killer Feature)

| Feature | Priority |
|---|---|
| Camera watches user perform exercise | Must Have (when built) |
| Real-time body keypoint detection | Must Have (when built) |
| Live audio and visual feedback | Must Have (when built) |
| Works in browser — no install needed | Must Have (when built) |
| Runs on device — no data stored | Must Have (when built) |

---

### 5.15 Fitness Challenges (V5)

| Feature | Priority |
|---|---|
| 30-day challenges | Should Have (when built) |
| Daily exercise tracking within challenge | Must Have (when built) |
| Leaderboard | Should Have (when built) |
| Viral share mechanic | Could Have (when built) |

---

### 5.16 Creator Marketplace (V6)

| Feature | Priority |
|---|---|
| Creators publish workout programs | Must Have (when built) |
| Users purchase programs | Must Have (when built) |
| RepFlow takes 20% revenue share | Must Have (when built) |
| Creator analytics dashboard | Should Have (when built) |
| Verified creator badges | Could Have (when built) |

---

## 6. NON-FUNCTIONAL REQUIREMENTS

| Requirement | Target |
|---|---|
| Page load time | Under 2 seconds on mobile |
| Video loading | Seamless loop, no buffering |
| Platform | Works in mobile browser without app install |
| Security | Row Level Security on all user data in Supabase |
| Data isolation | No user can access another user's data |
| Bandwidth | Works on low-bandwidth connections (India, Southeast Asia) |
| Content dependency | No single creator dependency — all content owned or licensed |
| Maintenance | Minimal manual work required after launch |
| Commerce | Zero physical product sales — digital only |
| Liability | Disclaimer on all exercise pages: consult a doctor before exercising |

---

## 7. WHAT REPFLOW IS NOT

- Does NOT sell physical products
- Does NOT provide medical or dietary advice
- Does NOT guarantee specific fitness results
- Does NOT depend on any single content creator
- Does NOT have aggressive notification systems
- Does NOT punish users for missing workouts
- Does NOT track calories at MVP stage
- Does NOT require expensive infrastructure to run

---

## 8. ASSUMPTIONS, CONSTRAINTS, DEPENDENCIES

### Assumptions
- All users have internet connectivity
- Users have a smartphone with a working camera (for pose correction feature later)
- Exercise video content is generated using Veo 3 and owned by RepFlow
- English is sufficient for the first version

### Constraints
- Solo developer — features must be scoped to what one person can build
- Zero budget at launch — must use free tiers (Supabase, Vercel)
- No physical product sales — business model is purely digital
- Content must not create medical or liability risk

### Dependencies
- Supabase — authentication and database
- Vercel — hosting and deployment
- Veo 3 — exercise video generation
- MediaPipe or TensorFlow.js — pose detection (future feature)
- Spotify / Apple Music API — music integration (future feature)

---

## 9. MONETIZATION

| Tier | Price | Key Features | Launch When |
|---|---|---|---|
| Free | Rs.0 | Browse exercises, basic plan, workout tracking, social feed | Now |
| RepFlow Pro | Rs.299/mo or Rs.2,499/yr | AI planner, pose correction, no ads, advanced analytics | After 1,000 users |
| Creator Plan | Rs.999/mo + 20% cut | Sell programs, analytics, custom branding | After 10,000 users |

---

## 10. PHASES AND TIMELINE

| Phase | Name | Status |
|---|---|---|
| 1 | Foundation | Done |
| 2 | Auth + Onboarding | Done |
| 3 | Personalized Homepage | Done |
| 4 | Home Workout Content | Active |
| 5 | Gym Workout Content | Upcoming |
| 6 | Workout Plans + Active Tracking | Upcoming |
| 7 | Landing Page | Upcoming |
| 8 | Launch + Validate | Upcoming |
| V2 | Social Feed | Post-Launch |
| V3 | AI Workout Planner | Post-Launch |
| V4 | Live Pose Correction | Post-Launch |
| V5 | Fitness Challenges | Post-Launch |
| V6 | Creator Marketplace | Post-Launch |

---

## 11. RISKS

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Users don't return after day 1 | High | High | Streak system and gentle daily reminders |
| Content feels too thin at launch | Medium | Medium | Rich filters make 15 exercises feel bigger |
| Videos too large to load on mobile | Medium | High | Cloudinary or Cloudflare R2 for delivery |
| Nobody signs up after launch | Medium | High | Test with 5 real users first, then post on Reddit |
| Legal liability for injury | Low | High | Disclaimer on all exercise pages |
| Competitor copies the idea | Medium | Low | Move fast, build community, creator moat |

---

## 12. APPENDIX

Related documents (to be created):
- `/docs/TRD.md` — Technical requirements and API design
- `/docs/BACKEND_SCHEMA.md` — Database schema and relationships
- `/docs/APPFLOW.md` — User journey diagrams
- `/docs/UIUX.md` — Visual design system and screen specifications
- `/docs/IMPLEMENTATION.md` — Phase by phase development plan

---

*Document Owner: RepFlow Founder*
*Last Updated: May 2026*
*Version: 3.0*
