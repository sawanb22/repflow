RepFlow — Master Project DocumentationVersion: 4.0 (Premium Dynamic Pivot Edition)Status: Final — Source of TruthCurrent Phase: Phase 6 (Dynamic Workout Tracking & RPE Progression)TABLE OF CONTENTSProduct Requirements Document (PRD)UI/UX Design DocumentTechnical Requirements Document (TRD)Backend Schema & DatabaseImplementation PlanAgent AI Rules (CLAUDE.md)1. PRODUCT REQUIREMENTS DOCUMENT (PRD)1.1 Product SummaryRepFlow is a premium, dynamic fitness coaching web application ($30–$75/month) designed specifically for busy professionals. It replaces static, rigid workout PDFs and generic fitness apps with a reactive programming model that adapts instantly to a user's volatile schedule, available equipment, and daily biofeedback (RPE). While delivering the intelligence of a $100/hour personal trainer in an asynchronous digital format, RepFlow maintains a minimal, athletic luxury aesthetic that feels like an exclusive, high-end health club in the user's pocket.1.2 Problem StatementThe traditional fitness industry relies on the "PDF Trap": users purchase rigid, 12-week static plans that demand perfect adherence. Working professionals (managers, tech workers, busy parents) have unpredictable schedules, varying gym equipment access, and fluctuating daily energy levels.When a user misses "Week 2, Day 3" due to a late meeting, or when they are forced to skip an exercise because the gym is too crowded, static plans break down. This friction causes immediate decision fatigue, leading to skipped workouts, loss of momentum, and ultimate abandonment of fitness goals. These users do not lack motivation; they lack the real-time adaptability of a human coach. They need an application that removes all decision-making anxiety by adjusting their micro-cycle on the fly.1.3 Target PersonasPersona A — The Schedule-Crunched Professional (Primary): Age 30-45, high disposable income, time-poor. Their calendar is chaotic. They frequently encounter situations where a 60-minute workout needs to be compressed into 30 minutes, or a gym day becomes a living room day. They willingly pay a premium for an app that says, "No bench press? Do this instead. Only 25 mins? We've compressed your workout via supersets."Persona B — The Consistent Amateur (Secondary): Wants to build strength habits without overthinking the science of progressive overload. They don't want to calculate percentages of their 1-Rep Max; they just need fast, frictionless access to today's optimal workout based on last week's performance.Persona C — The Hybrid Traveler (Tertiary): Frequently travels for work. Sometimes trains in fully-equipped commercial gyms, sometimes in sparse hotel gyms, and sometimes at home with bands. Needs a single ecosystem that translates their overall physical progression seamlessly across vastly different environments.1.4 Core Dynamic Features (Phase 6 Pivot)To justify a premium subscription, RepFlow actively coaches users through friction points using a triad of dynamic features:Dynamic Metric-Driven Progression (RPE Engine): This is the mathematical "brain" of the app. Instead of blindly adding 5 lbs every week until the user hits a plateau and gets injured, the app asks the user to rate their Rate of Perceived Exertion (Scale 1-10) after their sets. It automatically scales the target weight for the next workout based on this feedback, mimicking human auto-regulation.The "Equipment Swapper" (Gym Compatibility Engine): Solves peak-hour gym anxiety. If the cable machine is taken, the user hits "Swap." The engine queries alternatives matching the exact same primary_muscle and movement_pattern (e.g., swapping a Cable Row for a Dumbbell Row), ensuring the day's physical stimulus remains intact without awkward waiting.Dynamic "Stuck-at-Home" Pivot: Regenerates today's scheduled gym workout into an equivalent home workout instantly using a single dashboard toggle. If the user was scheduled for a Heavy Leg Day at the gym, the app seamlessly substitutes heavy barbell squats with high-rep Bulgarian Split Squats using dumbbells, preserving the micro-cycle and the user's weekly streak.1.5 MonetizationRepFlow’s pricing strategy is intentionally positioned as a premium product. A $30/month price point acts as a filter, attracting highly committed users and allowing us to focus heavily on retention and high-touch features rather than racing to the bottom against $5/month generic trackers.TierPriceKey FeaturesLaunch TimelineRepFlow BasicRs.0 (Free)Browse exercises, static logbook, basic progress tracking, limited to 3 swaps per week.ImmediateRepFlow EliteRs.2,499/mo ($30)Full RPE Auto-regulation engine, Unlimited Equipment Swaps, Unlimited Home Pivots, Advanced 12-week Analytics.Post-MVP validation2. UI/UX DESIGN DOCUMENT2.1 Design Philosophy: "Calm Confidence"Most fitness apps utilize hyper-aggressive visual language (neon greens, blaring sirens, aggressive reds) that induces stress. RepFlow's interface feels like a premium athletic brand—disciplined, purposeful, and human-crafted. The goal is to lower the user's cognitive load as soon as they open the app.Dark by Default: #0A0A0A background reduces eye strain, saves battery life during 60-minute gym sessions, and blends unobtrusively into a public gym environment.Typography Hierarchy: Information architecture is communicated purely through weight and size. Barlow Condensed (700, 800, 900) is used exclusively for high-impact display moments (timers, active weight numbers, hero headers) to evoke a sports-editorial feel. Figtree (400, 500, 600) is used for highly legible body copy and technical instructions.One Accent: Sand Gold (#C9A87A). We avoid traditional primary colors to stand out. Sand Gold feels like premium brass, wood, and luxury health clubs. It is used deliberately and sparingly—only for primary CTAs, active states, and single glow effects to draw the eye precisely where action is needed.2.2 Design Tokens:root {
  /* Backgrounds: Uses a strict elevation system for depth */
  --bg-0: #0A0A0A; /* Absolute bottom canvas */
  --bg-1: #0F0F0F; /* Sidebar, topbar nav */
  --bg-2: #141414; /* Cards, inputs, resting surfaces */
  --bg-3: #1C1C1C; /* Image placeholders, elevated inner elements */
  
  /* Accent System */
  --color-accent: #C9A87A; 
  --color-accent-rgb: 201, 168, 122;
  --color-accent-dim: rgba(201, 168, 122, 0.09); /* Subtle active nav bg, card tint */
  --color-accent-glow: rgba(201, 168, 122, 0.12); /* Soft ambient hero glow */
  
  /* Text */
  --color-text-primary: #F0EBE3; /* Warm off-white to prevent stark contrast fatigue */
  --color-text-secondary: #888480; /* Standard metadata, descriptions */
  --color-text-muted: #484542; /* Inactive states, subtle borders */
  
  /* Borders & Radius */
  --border-subtle: 1px solid rgba(255, 255, 255, 0.055);
  --border-default: 1px solid rgba(255, 255, 255, 0.10);
  --radius-sm: 6px; --radius-md: 9px; --radius-lg: 12px; --radius-xl: 16px;
}
2.3 New Dynamic Components (Phase 6)RPE Slider (Haptic-Ready): A horizontal range input (1-10) appearing immediately after a user completes their sets. The track uses --bg-3, filling with --color-accent as it slides right. The thumb is an oversized 24px circle for easy tapping with sweaty hands. Labels at the extremes ("1 - Effortless" to "10 - Absolute Max") guide the user. Interaction note: Values 8-10 should subtly shift the accent color to a slightly warmer, intense hue to indicate approaching failure bounds.Swap Button: A secondary icon button (ti-arrows-exchange) anchored to the top-right of Active Exercise cards. Tapping it opens a modal overlay (with a glassmorphism blur over the workout) displaying 3 structurally identical exercise alternatives."Train at Home" Toggle: A pill-shaped switch anchored prominently above the "Today's Workout" card on the Dashboard. When toggled, a 300ms transition pulses the workout card (--bg-3) to visually indicate that the gym exercises have been seamlessly rewritten into their home equivalents.3. TECHNICAL REQUIREMENTS DOCUMENT (TRD)3.1 Tech Stack JustificationFrontend: Next.js 14+ (App Router). Crucial for optimizing performance via Server Components, ensuring fast initial loads even on spotty gym cellular connections. TypeScript 5+ enforces strict types across the complex mathematical progression algorithms. Tailwind CSS 3+ is utilized for rapid, consistent token-based styling.Backend: Supabase (PostgreSQL, Auth, Storage). Chose PostgreSQL for its robust relational querying abilities (essential for the Equipment Swapper logic) and Supabase for its zero-boilerplate authentication and Row Level Security (RLS).Hosting: Vercel. Ensures edge-network caching and seamless CI/CD.3.2 Data Access & Server ActionsWith the introduction of complex mathematical progressions (RPE) and relational swapping, we are shifting these heavy, sensitive operations entirely to Next.js Server Actions ("use server").Security: The RPE scaling algorithm is our proprietary "secret sauce" that dictates premium user value. Executing this on the server prevents client-side tampering, reverse engineering, or manipulation of progression logs.Performance: Relational queries for the Equipment Swapper require joining the exercises, equipment, and categories tables. Doing this heavy lifting on the server reduces the client payload to just the 3 final exercise objects.Optimistic UI (Crucial for Gym Environments): Gyms notoriously have poor internet connections (basements, thick walls). The active workout session (/home/workout/[id]) relies heavily on React's useOptimistic hook. When a user logs an RPE or swaps an exercise, the UI updates instantly, preventing the user from waiting on a loading spinner between sets. The Server Action processes the actual Supabase mutation asynchronously in the background.3.3 Auth & Security MechanismsProvider: Supabase Auth (Email/Password logic implemented).Session Persistence: Managed by Supabase via cookies (@supabase/ssr). Because mobile browsers aggressively sleep background tabs, session tokens must be reliably refreshed by middleware. Middleware strictly protects the /home and /onboarding routing groups.RLS (Row Level Security): Enabled by default on EVERY table. We enforce a strict policy where users can only SELECT, INSERT, UPDATE, and DELETE rows in workout_plans, workout_sessions, and session_exercises where user_id = auth.uid().4. BACKEND SCHEMA & DATABASEAll tables live in the public schema. All primary keys are UUIDs to prevent ID enumeration attacks and ensure scalable distributed data down the line.4.1 Foundational Tables (Already Built)users_profile: id, user_id, name, avatar_url.user_preferences: Contains onboarding configuration (workout_location, goal, equipment_list, experience_level).categories: Top-level groupings (id, name, slug like "Home Workout", "Gym Workout").equipment: Granular tags (id, name, slug, category_id like "Barbell", "Resistance Band").4.2 Content & Dynamic Pivot Tables (Phase 6 Updates)The exercises table acts as the foundational knowledge graph. By adding primary_muscle and movement_pattern, the database understands the structural biomechanics of the lift, rather than just treating it as a string of text.-- Updated Exercises Table with Relational Mapping
create table exercises (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  slug              text not null unique,
  category_id       uuid references categories,
  equipment_id      uuid references equipment,
  difficulty        text not null,
  
  -- NEW: Dynamic Relational Mapping (Phase 6)
  primary_muscle    varchar(50),  -- e.g., 'Chest', 'Quads'. Used for strict filtering.
  movement_pattern  varchar(50),  -- e.g., 'Horizontal Push'. Ensures biomechanical equivalence when swapping.
  default_rpe_target integer default 8, -- Baseline exertion target if user has no historical data.
  
  primary_muscles   text[] not null, -- Legacy array, kept for backwards compatibility
  secondary_muscles text[],
  sets              integer,
  reps              text,
  video_url         text,
  image_url         text,
  is_published      boolean default false
);

-- Crucial for performance: the swapper will query these two columns heavily.
create index if not exists exercises_swap_idx on exercises(primary_muscle, movement_pattern);
4.3 Workout Session TablesThe session tables separate the planned template (workout_plans) from the actual executed instance (session_exercises), allowing the app to log history without permanently destroying the base routine.create table workout_plans (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users not null,
  name        text not null,
  days        jsonb not null default '{}',
  is_active   boolean default false
);

create table workout_sessions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references auth.users not null,
  plan_id          uuid references workout_plans,
  status           text default 'in_progress',
  started_at       timestamptz default now(),
  completed_at     timestamptz
);

create table session_exercises (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid references workout_sessions not null,
  exercise_id      uuid references exercises not null,
  order_index      integer not null,
  sets_done        integer default 0,
  weight           text,
  
  -- NEW: Auto-Regulation Columns (Phase 6)
  target_weight    decimal(5,2), -- Populated by algorithm: what the user SHOULD lift today
  completed_weight decimal(5,2), -- Populated by user: what they ACTUALLY lifted
  rpe_logged       integer check (rpe_logged >= 1 and rpe_logged <= 10) -- The biofeedback rating
);
4.4 TypeScript Types (types/database.ts)Enforcing strict type boundaries ensures that the frontend cannot pass invalid movement patterns to the backend Swapper engine.export type MovementPattern = 
  | 'Horizontal Push' 
  | 'Horizontal Pull' 
  | 'Vertical Push' 
  | 'Vertical Pull' 
  | 'Squat' 
  | 'Hinge' 
  | 'Core' 
  | 'Isolation'
  | 'Carry';

export interface Exercise {
  id: string; name: string; slug: string; category_id: string | null; equipment_id: string | null; difficulty: string;
  primary_muscle: string | null; movement_pattern: MovementPattern | null; default_rpe_target: number | null;
  primary_muscles: string[]; secondary_muscles: string[] | null;
  /* ... existing fields ... */
}

export interface SessionExercise {
  id: string; session_id: string; exercise_id: string; order_index: number; sets_done: number; weight: string | null;
  target_weight: number | null; completed_weight: number | null; rpe_logged: number | null;
}
5. IMPLEMENTATION PLAN5.1 Current StatusPhase 1-3 (Foundation, Auth, Onboarding): DONEPhase 4-5 (Home & Gym Workout Content): DONEPhase 6 (Dynamic Tracking & Premium Pivot): ACTIVE NOW5.2 Phase 6 Execution Strategy (Bottom-Up)The execution strictly follows a bottom-up approach to ensure the data layer is robust before binding it to the UI.Step 1: Database Migration (009_dynamic_pivot.sql)Ensure zero downtime by adding columns as nullable first.Add mapping columns (primary_muscle, movement_pattern, default_rpe_target) to exercises.Add telemetry columns (target_weight, completed_weight, rpe_logged) to session_exercises.Update types/database.ts immediately to ensure strict typing for upcoming UI components.Step 2: Server Actions & Backend Logic (The Engine)Create app/actions/workout.ts (with 'use server').Swapper Logic: Build getExerciseAlternatives(exerciseId). Must match primary_muscle + movement_pattern, strictly exclude current equipment_id, and ideally prioritize equipment the user actually has listed in user_preferences.RPE Math Logic: Build logRpeAndUpdateProgression(sessionExerciseId, rpe, weight).Apply math: Next Target = Completed Weight * (1 + ((10 - RPE) / 100)).Edge Case Handling: If RPE is 10 but reps completed are significantly lower than target reps, do NOT increase the weight.Step 3: UI Integration (The Swapper & RPE)Build <SwapExerciseModal /> utilizing Radix UI primitives for accessibility. Add the "Swap" icon to /home/workout/[id]/page.tsx.Build <RpeSlider /> and tie it into the "Complete Exercise" state loop. Apply the Optimistic UI hook here.Step 4: The Stuck-at-Home PivotAdd the prominent "Train at Home Today" toggle to Dashboard (/home/page.tsx).Hook the toggle into lib/workout-helpers.ts. When triggered, the system temporarily bypasses the scheduled plan, reads the planned primary_muscles for the day, and queries the database for location = home exercises targeting those muscles. It then dynamically rewrites the active session state without mutating the master workout_plans template.6. AGENT AI RULES (CLAUDE.MD CONSTRAINTS)Read Before Every Task:Never build anything that contradicts these documents. Never hardcode anything defined in these documents. Use ONLY packages already installed in package.json. Zero new dependencies.Layout Rules — Non-Negotiable:RepFlow is a true full-viewport web application (like Notion or Linear). It is NOT a standard marketing webpage. Therefore, we do not constrain the application inside centered wrappers.App must be edge-to-edge. No gaps. No centering.App shell: display: flex, width: 100vw, height: 100vh.Sidebar: width: 230px, min-width: 230px, flex-shrink: 0.Main content: flex: 1, min-width: 0, overflow-y: auto.NO max-width on any layout element anywhere in the codebase.NO margin: 0 auto on any layout element.Padding goes INSIDE screen content only (e.g., 26px 30px on a content area).BANNED CLASSES on wrappers/shells: items-center, justify-center, mx-auto, max-w-*, container, px-4+.Accent Color System:Accent color is runtime-switchable via CSS variables.NEVER hardcode #C9A87A or any accent hex anywhere in JSX or CSS.Always use var(--color-accent) and var(--color-accent-rgb). Rely on ThemeContext.tsx to handle the heavy lifting.Self-Check Before Saving Any File:Consistency: Does this match the pattern of existing files in this area? (e.g., Are you using Server Actions exactly how we defined them?)Scope Creep: Am I introducing something that doesn't already exist in the project? (e.g., adding a random animation library).Layout Violation: If this is a layout component — does it center or constrain anything? Did I accidentally use max-w-7xl mx-auto?Dependency Check: Am I using a package, CSS utility class, or pattern not already approved and present in this codebase?