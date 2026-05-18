# RepFlow — Technical Requirements Document (TRD)
## Version 1.0 | May 2026
## Status: Final — Source of Truth

---

## Change History

| Version | Date | What Changed |
|---|---|---|
| 1.0 | May 2026 | Initial TRD created |

---

## 1. PURPOSE

This document defines all technical decisions, architecture, infrastructure, and system requirements for RepFlow. It is the reference document for all development decisions. Every technical choice made during development must align with what is written here. If a new technical decision is needed, this document must be updated first.

This document does NOT cover:
- Visual design (see UIUX.md)
- Product features (see PRD.md)
- Database schema details (see BACKEND_SCHEMA.md)
- Phase by phase tasks (see IMPLEMENTATION.md)

---

## 2. SYSTEM ARCHITECTURE OVERVIEW

RepFlow follows a monolithic Next.js architecture with Supabase as the backend. There is no separate backend server. All data access happens either through Next.js server components calling Supabase directly, or through Next.js API routes for custom logic.

```
Browser / Mobile Browser
        ↓
   Next.js App (Vercel)
   ├── Server Components → Supabase (direct)
   ├── Client Components → Supabase (browser client)
   └── API Routes → Custom logic + Supabase (server client)
        ↓
   Supabase
   ├── PostgreSQL Database
   ├── Auth (sessions, users)
   └── Storage (videos, images)
```

---

## 3. TECH STACK — FINAL DECISIONS

### 3.1 Frontend
| Technology | Version | Purpose | Why |
|---|---|---|---|
| Next.js | 14+ | App Router, SSR, routing, API routes | Industry standard, free, Vercel native |
| TypeScript | 5+ | Type safety across entire codebase | Catches errors before runtime |
| Tailwind CSS | 3+ | Utility-first styling | Fast, consistent, no CSS files |
| Framer Motion | Latest | Animations and transitions | Smooth premium feel |
| React Hook Form | Latest | All form handling | Performance, validation |
| Zod | Latest | Schema validation | Works with React Hook Form |
| Lucide React | Latest | Icons | Clean, consistent set |
| Radix UI | Latest | Accessible component primitives | Accessible by default |

### 3.2 Backend / Infrastructure
| Technology | Purpose | Free Tier Limit | When to Upgrade |
|---|---|---|---|
| Supabase | Database + Auth + Storage | 50,000 MAU, 500MB DB, 1GB storage | At 50k users — $25/month Pro |
| Vercel | Hosting + CDN + deployment | 100GB bandwidth, auto-deploy | At scale — Pro plan |
| Supabase Auth | Authentication and sessions | Included in Supabase | Never — stays on Supabase |
| Supabase Storage | Video and image files | 1GB free | When full → migrate to Cloudflare R2 |
| Supabase SMTP | Transactional emails | 3 emails/hour (free) | At scale → Resend ($0 for 3k/month) |

### 3.3 Development Tools
| Tool | Purpose |
|---|---|
| Supabase CLI | Database migrations via code |
| ESLint | Code quality |
| Prettier | Code formatting |
| GitHub | Version control |

### 3.4 Future Mobile Stack
| Technology | Purpose | When |
|---|---|---|
| React Native | iOS and Android app | After web is validated |
| Expo | React Native tooling | Same time as React Native |
| Same Supabase project | Reuse all backend | Same time as React Native |

No PWA. Native mobile app only.

---

## 4. AUTHENTICATION

### 4.1 Provider
Supabase Auth — only provider. No Clerk, no NextAuth, no other providers.

### 4.2 Methods Supported
- Email and password
- Google OAuth (to be connected — Supabase dashboard → Authentication → Providers)

### 4.3 Session Management
- Sessions managed by Supabase via cookies
- Middleware reads session on every request
- `@supabase/ssr` handles cookie-based sessions for Next.js App Router
- Access token refreshed automatically by Supabase client

### 4.4 Route Protection Rules
All routes are protected by middleware at `middleware.ts`:

| Route Pattern | Rule |
|---|---|
| `/auth/*` | Public — redirect to /home if already logged in |
| `/onboarding` | Logged in only — redirect to /auth/login if not |
| `/home/*` | Logged in only — redirect to /auth/login if not |
| `/` | Public — landing page |

### 4.5 Onboarding Guard
After login, middleware checks `onboarding_done` in `user_preferences`:
- If `false` or row does not exist → redirect to `/onboarding`
- If `true` → continue to `/home`

### 4.6 Email Confirmation
- Disabled during development
- Must be enabled before production launch
- Uses Supabase built-in SMTP
- Custom email template stored in Supabase dashboard

### 4.7 Password Reset
- Uses Supabase built-in forgot password flow
- Email sent via Supabase SMTP
- Redirect URL must be set in Supabase dashboard → Authentication → URL Configuration

---

## 5. DATABASE

### 5.1 Provider
Supabase PostgreSQL. No other database.

### 5.2 Schema Management
All database changes must be made through migration files.

Rules:
- Never change the database manually through the Supabase dashboard
- Every change goes in a new file in `/supabase/migrations/`
- Files named: `001_description.sql`, `002_description.sql` etc.
- Run with: `npm run db:push`

### 5.3 Row Level Security
RLS must be enabled on every table. No exceptions.

Standard policies for user-owned tables:
- Users can only SELECT their own rows (`auth.uid() = user_id`)
- Users can only INSERT their own rows (`auth.uid() = user_id`)
- Users can only UPDATE their own rows (`auth.uid() = user_id`)

Public read tables (exercises, categories, equipment):
- Anyone can SELECT published rows (`is_published = true`)
- Only service role can INSERT or UPDATE

### 5.4 Data Access Patterns

Server Components (pages that need data on load):
```typescript
// Always use server client with cookieStore
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const cookieStore = cookies()
const supabase = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  { cookies: { get: cookieStore.get.bind(cookieStore) } }
)
```

Client Components (interactive UI):
```typescript
// Use browser client
import { createBrowserClient } from '@supabase/ssr'
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)
```

API Routes:
```typescript
// Use server client with request cookies
import { createServerClient } from '@supabase/ssr'
```

### 5.5 Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_anon_key
```

Never commit `.env.local` to git. It is in `.gitignore`.

---

## 6. FILE STORAGE

### 6.1 Provider
Supabase Storage — only provider for now.

### 6.2 Buckets
| Bucket Name | Contents | Access |
|---|---|---|
| `exercise-videos` | MP4 exercise demo videos | Public read |
| `exercise-images` | JPG/PNG exercise images | Public read |
| `user-avatars` | User profile pictures | Private (user only) |

### 6.3 File Naming Convention
All exercise media files use the exercise slug:
- Video: `{slug}.mp4`
- Video side angle: `{slug}-side.mp4`
- Video front angle: `{slug}-front.mp4`
- Image: `{slug}.jpg`

### 6.4 Video Fallback Logic
Every exercise page uses this priority order:
1. If `video_url` exists in database → show video
2. If no video but `/public/exercises/{slug}.jpg` exists → show image
3. If neither → show grey placeholder box

### 6.5 Storage Limits
- Free tier: 1GB total
- At 1GB → migrate videos to Cloudflare R2 (free 10GB)
- Images stay on Supabase Storage (much smaller files)
- Migration plan: update `video_url` in database to point to R2 URLs

---

## 7. API ROUTES

### 7.1 When to Use API Routes
API routes are only used when:
- Custom server-side logic is needed that Supabase cannot handle
- Third party API calls must be made server-side (to hide keys)
- Complex data transformations are needed before sending to client

For all standard CRUD operations → use Supabase client directly from server or client components. Do not wrap Supabase calls in API routes unnecessarily.

### 7.2 Planned API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/generate-plan` | POST | Future — AI plan generation |
| `/api/pose-check` | POST | Future — pose correction processing |
| `/api/webhooks/stripe` | POST | Future — payment webhooks |

### 7.3 API Route Rules
- All API routes must validate the user session before processing
- All API routes must return consistent error responses
- No sensitive keys in client-side code — only in API routes or server components

---

## 8. FOLDER STRUCTURE

```
repflow/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── onboarding/page.tsx
│   ├── home/
│   │   ├── page.tsx
│   │   ├── browse/page.tsx
│   │   ├── exercise/[slug]/page.tsx
│   │   ├── plan/page.tsx
│   │   ├── workout/[id]/page.tsx
│   │   ├── complete/page.tsx
│   │   ├── progress/page.tsx
│   │   ├── feed/page.tsx
│   │   └── settings/page.tsx
│   ├── api/
│   │   └── (future API routes)
│   ├── layout.tsx
│   ├── page.tsx (landing)
│   └── globals.css
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── Avatar.tsx
│   │   ├── PageWrapper.tsx
│   │   ├── Logo.tsx
│   │   ├── ErrorBanner.tsx
│   │   └── AuthLink.tsx
│   └── (feature components)
├── utils/
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       └── middleware.ts
├── types/
│   └── database.ts
├── styles/
│   └── tokens.ts
├── docs/
│   ├── PRD.md
│   ├── TRD.md
│   ├── UIUX.md
│   ├── APPFLOW.md
│   ├── BACKEND_SCHEMA.md
│   └── IMPLEMENTATION.md
├── supabase/
│   └── migrations/
│       ├── 001_initial_tables.sql
│       └── (future migrations)
├── public/
│   └── exercises/
│       └── (exercise images)
├── middleware.ts
├── CLAUDE.md
├── AGENTS.md
├── .env.local
└── package.json
```

---

## 9. PERFORMANCE REQUIREMENTS

| Requirement | Target | How |
|---|---|---|
| First page load | Under 2 seconds | Next.js SSR + Vercel CDN |
| Exercise video start | Under 1 second | Supabase Storage CDN |
| Database queries | Under 200ms | Indexes on slug, user_id, is_published |
| Client navigation | Instant feel | Next.js App Router prefetching |
| Mobile performance | Smooth on mid-range phones | Minimal JS bundle, lazy load images |

---

## 10. SECURITY REQUIREMENTS

| Requirement | Implementation |
|---|---|
| User data isolation | RLS on all tables — users only see their own data |
| Exercise data | Public read only for published exercises |
| Environment variables | Never in client code, never committed to git |
| API routes | Session validation before any operation |
| File uploads | Validated file type and size before upload |
| SQL injection | Not possible — Supabase client uses parameterized queries |
| XSS | Next.js escapes output by default |
| HTTPS | Enforced by Vercel on all routes |

---

## 11. ERROR HANDLING

### 11.1 Rules
- Every Supabase call must be wrapped in try/catch or handle the `error` return
- Never show raw database errors to the user
- Always show a friendly error message
- Log errors to console in development

### 11.2 Standard Error Response (API Routes)
```typescript
// Success
{ success: true, data: any }

// Error
{ success: false, error: string, code?: string }
```

### 11.3 Page-level Errors
- Database fetch fails → show error state with retry button
- Exercise not found (invalid slug) → `notFound()` → 404 page
- User not authenticated → middleware redirects to login
- Onboarding not complete → middleware redirects to onboarding

---

## 12. TypeScript RULES

- Strict mode enabled in `tsconfig.json`
- All database types defined in `/types/database.ts`
- No `any` types except where absolutely unavoidable
- All Supabase query results typed using database types
- Props interfaces defined for every component
- No implicit returns in async functions

---

## 13. COMPONENT RULES

All UI components live in `/components/ui/`. Rules:
- Check `/components/ui/` before creating any new UI element
- Never hardcode colors, spacing, or border radius — use tokens from `/styles/tokens.ts`
- Every component must accept variants as typed props
- Every component must have sensible defaults
- After creating a new component → add it to `CLAUDE.md` component list

---

## 14. MIGRATIONS RULES

- Never modify the database through the Supabase dashboard directly
- All schema changes go in a new migration file
- Migration files are numbered sequentially
- Every migration must be tested locally before pushing
- Command: `npm run db:push`
- Command: `npm run db:reset` (development only — wipes data)

---

## 15. DEPLOYMENT

### 15.1 Hosting
Vercel — connected to GitHub repository. Every push to `main` branch auto-deploys.

### 15.2 Environment Variables in Production
Must be added manually in Vercel dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

### 15.3 Deployment Checklist Before Launch
- [ ] Email confirmation enabled in Supabase
- [ ] Google OAuth redirect URLs set in Supabase
- [ ] Password reset redirect URL set in Supabase
- [ ] All environment variables set in Vercel
- [ ] RLS enabled on all tables
- [ ] All exercises set to `is_published = true`
- [ ] Landing page built and live at `/`
- [ ] No console errors in production build
- [ ] `npm run build` passes clean

---

## 16. FUTURE TECHNICAL DECISIONS

| Decision | Current | When to Change | What to Change to |
|---|---|---|---|
| Video storage | Supabase Storage (1GB free) | When 1GB is full | Cloudflare R2 (10GB free) |
| Email sending | Supabase SMTP (3/hr free) | When traffic grows | Resend (3,000/month free) |
| Database | Supabase free tier | At 50,000 users | Supabase Pro ($25/month) |
| Hosting | Vercel free | At bandwidth limit | Vercel Pro ($20/month) |
| Mobile | None | After web validated | React Native + Expo |
| AI features | None | After 1,000 users | Anthropic API or Google Gemini |
| Pose detection | None | V4 phase | MediaPipe (free, runs in browser) |

---

*Document Owner: RepFlow Founder*
*Last Updated: May 2026*
*Version: 1.0*
*Related: PRD.md, BACKEND_SCHEMA.md, IMPLEMENTATION.md*
