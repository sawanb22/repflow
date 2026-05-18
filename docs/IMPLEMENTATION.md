# RepFlow — Implementation Plan
## Version 1.0 | May 2026
## Status: Final — Source of Truth

---

## Change History

| Version | Date | What Changed |
|---|---|---|
| 1.0 | May 2026 | Initial implementation plan created |

---

## 1. PURPOSE

This document defines the exact execution order, tasks, and completion criteria for every phase of RepFlow development. It is the daily reference for what to build next.

Rules:
- Never skip a phase or start the next phase before the current one is complete
- Every task must align with PRD.md, TRD.md, UIUX.md, and BACKEND_SCHEMA.md
- Every phase ends with a checklist — all items must pass before moving on
- Agent must read this document at the start of every new phase

---

## 2. CURRENT STATUS

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

## 3. PHASE 1 — Foundation
### Status: DONE

### What Was Built
- Next.js 14 App Router project with TypeScript
- Tailwind CSS configured
- Supabase project created and connected
- Environment variables set in `.env.local` and Vercel
- Component system created in `/components/ui/`
- Design tokens created in `/styles/tokens.ts`
- Supabase CLI configured with `npm run db:push`
- Deployed to Vercel via GitHub auto-deploy
- `CLAUDE.md` and `AGENTS.md` configured

### Completion Checklist
- [x] `npm run dev` runs without errors
- [x] `npm run build` passes clean
- [x] Supabase connected and tables created
- [x] Deployed on Vercel with live URL
- [x] Component system in place
- [x] Design tokens defined

---

## 4. PHASE 2 — Auth + Onboarding
### Status: DONE

### What Was Built
- `/auth/login` — email + password login
- `/auth/signup` — email + password signup
- `/onboarding` — 3-step quiz (location, goal, equipment)
- Middleware route protection
- Answers saved to `user_preferences` table
- Redirect logic based on `onboarding_done` flag

### Known Gaps (Fix Before Launch)
- Onboarding needs to expand from 3 steps to 7 steps per PRD
- Onboarding UI needs redesign to match UIUX.md Athletic Luxury Minimalism theme
- Google OAuth not connected yet
- Forgot password flow not built
- Email confirmation disabled — must enable before launch

### Completion Checklist
- [x] Signup works end to end
- [x] Login works end to end
- [x] Onboarding quiz saves to Supabase
- [x] Route protection working
- [x] Redirects working correctly

---

## 5. PHASE 3 — Personalized Homepage
### Status: DONE (basic)

### What Was Built
- `/home` — personalized homepage
- Greeting by time of day
- Sections shown or hidden based on `user_preferences`
- Browse Exercises button
- Settings icon placeholder

### Known Gaps (Fix in Phase 6)
- Today's Workout card not built
- Streak counter not built
- Weekly activity bar chart not built
- Stats row not built
- Recommended exercises section not built
- Full design not applied — still uses basic styles

### Completion Checklist
- [x] Homepage reads user preferences from Supabase
- [x] Personalization logic working
- [x] Sections shown/hidden correctly

---

## 6. PHASE 4 — Home Workout Content
### Status: DONE

### Goal
Complete the exercise library for home workouts. All 15 exercises published with images. Browse page and detail page fully working and styled correctly per UIUX.md.

### Tasks

#### Database
- [ ] Run migration `001_initial_tables.sql` — verify all tables exist
- [ ] Verify all 15 exercises are seeded in database
- [ ] Set `is_published = true` for all 15 exercises
- [ ] Verify categories and equipment rows exist

#### Content
- [ ] Rename all 15 exercise images to match slug format (`push-up.jpg` etc.)
- [ ] Move all images into `/public/exercises/`
- [ ] Verify every exercise slug has a matching image file
- [ ] Generate exercise videos with Veo 3 (one per exercise)
- [ ] Upload videos to Supabase Storage `exercise-videos` bucket
- [ ] Update `video_url` column for each exercise row

#### Browse Page (`/home/browse`)
- [ ] Apply UIUX.md design — Sand Gold accent, Barlow Condensed + Figtree fonts
- [ ] Equipment filter chips working (All, Bodyweight, Dumbbells, Resistance Bands, Kettlebell, Jump Rope)
- [ ] Search bar filters exercises in real time (debounce 150ms)
- [ ] Exercise card grid — `auto-fill minmax(210px, 1fr)`
- [ ] Each card shows: image, exercise name, equipment tag, difficulty badge
- [ ] Difficulty badge colors: Beginner #4DC87B, Intermediate #C9A87A, Advanced #E06560
- [ ] Card hover: `translateY(-2px)` + border brightens
- [ ] Empty state message when no results
- [ ] Clicking card navigates to detail page

#### Exercise Detail Page (`/home/exercise/[slug]`)
- [ ] Apply UIUX.md design throughout
- [ ] Video player with fallback to image then placeholder
- [ ] Side / Front angle toggle (when both video URLs exist)
- [ ] Exercise name in Barlow Condensed 38px weight 900
- [ ] Equipment tag + difficulty badge in tag row
- [ ] Stat trio (Sets / Reps / Rest) — 3 equal columns, accent-colored values
- [ ] Primary muscles — accent-tinted tags
- [ ] Secondary muscles — standard tags
- [ ] Numbered instruction steps with accent step boxes
- [ ] Start Exercise button — full width primary CTA
- [ ] Add to Plan button — secondary CTA
- [ ] Favorites heart button — toggles favorite state
- [ ] Back button returns to browse with filters preserved
- [ ] `notFound()` for invalid slugs

#### Homepage Updates
- [ ] Browse Exercises card links to `/home/browse`
- [ ] Design updated to match UIUX.md

### Phase 4 Completion Checklist
- [ ] All 15 exercises visible on browse page
- [ ] All 15 exercise detail pages load correctly
- [ ] Images display on all cards and detail pages
- [ ] Videos play on detail pages (or image fallback shows)
- [ ] Search and filter working
- [ ] Design matches UIUX.md spec
- [ ] `npm run build` passes clean
- [ ] No console errors

---

## 7. PHASE 5 — Gym Workout Content
### Status: UPCOMING

### Goal
Add the complete gym workout section. Mirror the home workout structure but with gym-specific categories and equipment. Users who selected Gym or Both in onboarding see this content.

### Tasks

#### Database
- [ ] Create migration `003_gym_content.sql`
- [ ] Add gym equipment rows: Barbell, Cable Machine, Smith Machine, Leg Press Machine, Bench
- [ ] Seed gym exercises — minimum 15 to match home workout library
- [ ] Set `is_published = false` initially — publish after content is ready

#### Content (Generate with Veo 3)
Minimum exercises to seed:
- Barbell Bench Press
- Incline Dumbbell Press
- Cable Fly
- Lat Pulldown
- Barbell Row
- Cable Row
- Overhead Press
- Lateral Raise
- Barbell Squat
- Leg Press
- Romanian Deadlift
- Leg Curl
- Barbell Curl
- Cable Tricep Pushdown
- Cable Crunch

#### Browse Page Updates
- [ ] Add Home / Gym / Both toggle at top of browse page
- [ ] Gym filter chips: Barbell, Cable, Machine, Bodyweight (gym)
- [ ] Muscle group filter tabs for gym (Chest, Back, Shoulders, Legs, Arms, Core)
- [ ] Gym exercises appear only for Gym and Both users on homepage

#### Homepage Updates
- [ ] Gym users see gym sections on homepage
- [ ] Both users see both sections

### Phase 5 Completion Checklist
- [ ] All gym exercises visible on browse page (gym filter)
- [ ] Home / Gym toggle works correctly
- [ ] Gym exercise detail pages load correctly
- [ ] Personalization: Home users don't see gym content
- [ ] `npm run build` passes clean

---

## 8. PHASE 6 — Workout Plans + Active Tracking
### Status: UPCOMING

### Goal
Build the core workout experience. Users can create or auto-generate a weekly plan, execute workouts exercise by exercise, and see their streak grow.

### Tasks

#### Database
- [ ] Create migration `004_phase6_plans.sql`
- [ ] Tables: `workout_plans`, `workout_sessions`, `session_exercises`, `user_streaks`
- [ ] Tables: `exercise_favorites`
- [ ] RLS policies on all new tables
- [ ] Indexes on `user_id`, `session_id`, `exercise_id`

#### Weekly Plan Page (`/home/plan`)
- [ ] Monday to Sunday day view
- [ ] Each day shows assigned exercises or "Rest Day"
- [ ] Rest day toggle per day
- [ ] Exercise list per day with sets/reps
- [ ] Edit and reorder exercises within a day
- [ ] Plan completion percentage bar
- [ ] Start today's workout button
- [ ] Auto-generate plan from `user_preferences` (goal, equipment, days_per_week)

#### Active Workout (`/home/workout/[id]`)
- [ ] Current exercise display with video loop
- [ ] Set tracker with checkboxes (set 1 of 3, set 2 of 3, etc.)
- [ ] Rest timer countdown with sound alert
- [ ] Progress indicator (exercise 3 of 8)
- [ ] Next exercise preview card at bottom
- [ ] Skip exercise option
- [ ] Pause and resume
- [ ] Complete workout button on last exercise

#### Workout Complete (`/home/complete`)
- [ ] Completion animation (stat values count up)
- [ ] Total stats: time, exercises done, sets done
- [ ] Streak counter updates with sand gold flash animation
- [ ] Share to feed button (placeholder — links to social in V2)
- [ ] Next workout preview card
- [ ] Save session to `workout_sessions` table
- [ ] Update `user_streaks` table

#### Homepage Updates
- [ ] Today's Workout card showing active plan's current day
- [ ] Streak counter with current streak number
- [ ] Weekly activity bar chart (7 days, M–S)
- [ ] Stats row: streak, workouts done, time this week

#### Settings Page (`/home/settings`)
- [ ] Edit workout preferences (re-triggers onboarding quiz)
- [ ] Edit profile name
- [ ] Change password
- [ ] Log out button
- [ ] Delete account option

### Phase 6 Completion Checklist
- [ ] User can create or auto-generate a weekly plan
- [ ] User can start and complete a workout end to end
- [ ] Streak increments correctly after workout completion
- [ ] Session saved to database
- [ ] Homepage shows today's workout card
- [ ] Stats row shows real data
- [ ] Settings page working
- [ ] `npm run build` passes clean

---

## 9. PHASE 7 — Landing Page
### Status: UPCOMING

### Goal
Build the public-facing landing page at `/`. This is what non-logged-in users see. It must convert visitors to signups. No login required to view.

### Tasks

#### Landing Page (`/`)
- [ ] Hero section — headline, supporting text, two CTAs (Start Free, Browse Exercises)
- [ ] Problem section — 4 relatable pain points in card format
- [ ] Features section — 6 key feature cards with icons
- [ ] Home vs Gym category choice section
- [ ] Social proof section (user count, quote — placeholder until launch)
- [ ] Final CTA section — "No signup needed to browse"
- [ ] Footer with links

#### SEO
- [ ] `<title>` and `<meta description>` tags
- [ ] Open Graph image (1200x630px) for social sharing
- [ ] `robots.txt` and `sitemap.xml`
- [ ] Correct heading hierarchy (one H1 per page)

#### Navigation
- [ ] Navbar: RepFlow logo + Login + Sign Up buttons
- [ ] Logged-in users redirected to `/home` automatically
- [ ] Mobile responsive navbar

### Phase 7 Completion Checklist
- [ ] Landing page loads at `/` without login
- [ ] All sections complete and styled per UIUX.md
- [ ] SEO tags in place
- [ ] OG image renders correctly when shared
- [ ] CTAs link to correct pages
- [ ] Mobile responsive
- [ ] `npm run build` passes clean

---

## 10. PHASE 8 — Launch + Validate
### Status: UPCOMING

### Goal
Enable production settings, do a final quality pass, and launch to real users. Track behavior and fix the top issues.

### Tasks

#### Pre-Launch Checklist
- [ ] Enable email confirmation in Supabase → Authentication → Email
- [ ] Set password reset redirect URL in Supabase → Authentication → URL Configuration
- [ ] Connect Google OAuth in Supabase → Authentication → Providers
- [ ] Verify all environment variables set in Vercel dashboard
- [ ] Run `npm run build` — must pass clean, zero errors
- [ ] Test full user journey end to end on mobile browser:
  - Sign up → confirm email → onboarding → homepage → browse → exercise detail → plan → workout → complete
- [ ] Test on iOS Safari and Android Chrome
- [ ] Check all pages load under 2 seconds on 4G
- [ ] Verify RLS — log in as two different users, confirm data isolation
- [ ] Add legal disclaimer to all exercise pages: "Consult a doctor before starting any exercise program"
- [ ] Add privacy policy page (basic)
- [ ] Add terms of service page (basic)

#### Launch
- [ ] Post on Reddit: r/fitness, r/bodyweightfitness, r/startups, r/SideProject
- [ ] Post on Twitter/X with screenshots and demo GIF
- [ ] Post on LinkedIn
- [ ] Share with 5 people personally — watch them use it without helping them

#### Post-Launch (First 30 Days)
- [ ] Set up basic analytics (Plausible or Posthog — free tier)
- [ ] Track: which exercises get viewed most, where users drop off, search queries
- [ ] Talk to at least 10 real users — ask what's missing
- [ ] Fix top 3 critical issues within first week
- [ ] Decide what Phase 9 looks like based on real user data

### Phase 8 Completion Checklist
- [ ] App live in production with real users
- [ ] Email confirmation working
- [ ] Analytics tracking active
- [ ] First 10 real users signed up
- [ ] No critical bugs reported

---

## 11. POST-LAUNCH PHASES

These phases are NOT planned in detail yet. They will be planned based on what real users tell us after launch. The order may change.

---

### V2 — Social Feed
**Trigger:** 500+ active users, retention data shows users want community

Tasks (high level):
- `social_posts` and `post_likes` tables (already in schema)
- `/home/feed` page with post cards
- Auto-post on workout completion
- Optional photo upload
- Like system
- Weekly leaderboard

---

### V3 — AI Workout Planner
**Trigger:** 1,000+ users, Pro tier launched

Tasks (high level):
- Anthropic API or Google Gemini integration via `/api/generate-plan`
- User inputs goal, schedule, equipment → AI returns weekly plan JSON
- Plan saved to `workout_plans` table
- Locked behind Pro subscription

---

### V4 — Live Pose Correction
**Trigger:** 2,000+ users, core product validated

Tasks (high level):
- MediaPipe or TensorFlow.js PoseNet integration
- Camera access via browser `getUserMedia()`
- Real-time body keypoint detection
- Comparison against reference pose per exercise
- Audio + visual feedback system
- Works in browser — no app install required
- Runs on device — no data stored
- Locked behind Pro subscription

---

### V5 — Fitness Challenges
**Trigger:** Strong community engagement in social feed

Tasks (high level):
- `challenges` and `challenge_participants` tables
- Challenge creation and joining
- Daily exercise tracking within challenge
- Leaderboard
- Streak badges for challenge completion

---

### V6 — Creator Marketplace
**Trigger:** 10,000+ users, stable revenue from Pro

Tasks (high level):
- Creator onboarding flow
- Program builder (multi-week plan creator)
- Stripe payment integration (20% platform cut)
- Creator analytics dashboard
- Program browse and purchase flow
- Verified creator badge system

---

## 12. MOBILE APP PLAN

**Trigger:** Web app validated with 1,000+ users

Stack:
- React Native + Expo
- Same Supabase project (reuse all backend)
- No PWA — native app only

Order:
1. iOS app first (TestFlight beta)
2. Android app after iOS validated
3. App Store + Google Play submission

---

## 13. MONETIZATION TRIGGER PLAN

| Milestone | Action |
|---|---|
| 100 users | Start gathering feedback, fix top issues |
| 500 users | Design Pro tier pricing page |
| 1,000 users | Launch RepFlow Pro at Rs.299/month |
| 5,000 users | Introduce annual plan at Rs.2,499/year |
| 10,000 users | Launch Creator Plan at Rs.999/month + 20% cut |
| 50,000 users | Upgrade Supabase to Pro tier ($25/month) |

---

## 14. RULES FOR AGENT

When working on any phase:

1. Read the relevant `/docs/` files before writing any code
2. Never build features not listed in the current phase
3. Never skip the completion checklist — all items must pass
4. Every new database table needs a migration file
5. Every new UI component must use tokens from `/styles/tokens.ts`
6. Every new component must be checked against `/components/ui/` first
7. Every page must be tested on mobile viewport before marking done
8. `npm run build` must pass before any phase is marked complete

---

*Document Owner: RepFlow Founder*
*Last Updated: May 2026*
*Version: 1.0*
*Related: PRD.md, TRD.md, UIUX.md, BACKEND_SCHEMA.md*
