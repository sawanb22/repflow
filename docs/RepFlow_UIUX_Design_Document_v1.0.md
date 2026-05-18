# RepFlow — UI/UX Design Document

**Product:** RepFlow Fitness Training Web Application
**Document Version:** 1.0
**Status:** Draft
**Date:** May 2026
**Document #3 of 3** — PRD · TRD · UI/UX Design Doc

> **CONFIDENTIAL — INTERNAL USE ONLY**

---

## Table of Contents

1. [Document Overview](#1-document-overview)
2. [Design Philosophy & Principles](#2-design-philosophy--principles)
3. [User Personas & Research Summary](#3-user-personas--research-summary)
4. [Information Architecture](#4-information-architecture)
5. [User Flows](#5-user-flows)
6. [Design System](#6-design-system)
7. [Component Library](#7-component-library)
8. [Screen Specifications](#8-screen-specifications)
9. [Interaction Design](#9-interaction-design)
10. [Accessibility Standards](#10-accessibility-standards)
11. [Responsive Design](#11-responsive-design)
12. [Developer Handoff Notes](#12-developer-handoff-notes)
13. [Future Design Considerations](#13-future-design-considerations)
14. [Revision History](#14-revision-history)

---

## 1. Document Overview

### 1.1 Purpose

This UI/UX Design Document serves as the definitive visual and interaction specification for RepFlow, a premium fitness training web application. It establishes the design system, component library, screen specifications, and interaction patterns that govern the product's look, feel, and behaviour.

This document is the single source of truth for designers and frontend developers during implementation. Every visual decision documented here derives directly from user research findings in the PRD and technical constraints established in the TRD.

### 1.2 Document Scope

- Design system foundations: color, typography, spacing, elevation, grid
- Component library with all variants and interaction states
- Screen-level specifications for all primary views
- User flow diagrams for key journeys
- Interaction design: animations, transitions, micro-interactions
- Accessibility standards and compliance requirements
- Responsive behavior across defined breakpoints
- Developer handoff specifications

### 1.3 Audience

| Audience | How They Use This Document |
|----------|---------------------------|
| UI/UX Designers | Reference for all design decisions; source for Figma implementation |
| Frontend Developers | Specification guide for pixel-accurate implementation and component behavior |
| QA Engineers | Acceptance criteria for visual correctness and interaction behavior |
| Product Managers | Alignment on UX decisions and feature scope |
| Stakeholders | Design direction sign-off and feedback |

### 1.4 Related Documents

| Document | Version | Description | Status |
|----------|---------|-------------|--------|
| PRD | 1.0 | Product Requirements Document | Complete |
| TRD | 1.0 | Technical Requirements Document | Complete |
| UI/UX Design Doc | 1.0 | This Document | Draft |

---

## 2. Design Philosophy & Principles

### 2.1 Design Vision

RepFlow's design identity is defined by a single concept: **Calm Confidence**. The interface should feel like a premium athletic brand — disciplined, purposeful, and human-crafted — not a generic SaaS dashboard or a flashy gaming UI. Every design decision reinforces the feeling of a knowledgeable coach: direct, trustworthy, and results-focused.

> **Design Benchmark:** Spotify meets Nike Training Club. The calm restraint of Spotify's dark UI paired with the athletic authority of Nike's training products.

### 2.2 Core Design Principles

#### Principle 1 — Restraint Over Decoration
Every visual element must earn its place. If removing an element doesn't break understanding, remove it. We use one accent color, two fonts, and a strict spacing scale. Decoration is applied only when it carries semantic meaning.

#### Principle 2 — Typography Does the Heavy Lifting
In a dark UI, hierarchy is communicated primarily through typography — weight, size, and color value — not through boxes, dividers, or excessive card borders. Barlow Condensed creates athletic authority; Figtree provides warm readability for body copy.

#### Principle 3 — Motion with Purpose
Animations exist to communicate state changes, guide attention, and provide feedback — not to entertain. Every transition has a duration under 300ms. No decorative animations that don't serve a functional purpose.

#### Principle 4 — Dark by Default
The dark theme is not an optional mode — it is the product's identity. The `#0A0A0A` background reduces eye strain during workout sessions, creates focus, and makes the accent color pop with maximum contrast. Light mode is defined as a future roadmap item only.

#### Principle 5 — One Accent, Used Deliberately
Sand Gold (`#C9A87A`) is the only accent color. It is used exclusively for: primary CTAs, active navigation states, key metric values, and single glow effects on featured cards. Every use of the accent color must be intentional and justified.

#### Principle 6 — Generous Whitespace
Sections breathe. Cards are not cramped. Text is not stacked without adequate leading. The perceived quality of a premium product is directly proportional to the discipline of its whitespace. RepFlow uses a base-8 spacing scale throughout.

### 2.3 Brand Voice in UI

| Dimension | We Are | We Are NOT |
|-----------|--------|------------|
| Tone | Direct, confident, motivating | Aggressive, loud, preachy |
| Aesthetic | Premium, athletic, minimal | Neon cyberpunk, gaming UI, generic SaaS |
| Copy Style | Short, active voice, no jargon | Long instructions, passive voice |
| Visual Density | Focused, one thing at a time | Information overload, data dashboards |
| Feedback | Calm, specific, actionable | Generic error messages, confusing states |

---

## 3. User Personas & Research Summary

> **Cross-Reference:** Full user research, interview findings, and persona development are documented in the PRD v1.0. This section provides a design-relevant summary only.

### 3.1 Primary Persona — The Consistent Amateur

| Field | Detail |
|-------|--------|
| Name | Arjun Mehta, 28 |
| Archetype | Working professional who trains 3–4x/week |
| Goal | Build consistent strength habits without overthinking the plan |
| Frustration | Gym apps are either too simple or overwhelmingly complex |
| Design Need | Fast access to today's workout, clear progress, no decision fatigue |
| Key Screen | Home Dashboard — streak, today's workout, one-tap start |

### 3.2 Secondary Persona — The Learning Lifter

| Field | Detail |
|-------|--------|
| Name | Priya Sharma, 24 |
| Archetype | Newer to structured training, learns by exploring and researching |
| Goal | Learn correct technique and understand which exercises target which muscles |
| Frustration | YouTube tutorials are scattered; apps don't explain the 'why' |
| Design Need | Rich exercise detail, muscle diagrams, step-by-step instructions |
| Key Screen | Exercise Detail — full instructions, muscle targeting, difficulty clarity |

### 3.3 Key UX Insights Driving Design Decisions

- Users abandon apps after 3 taps if they can't find today's workout — hence the prominent Today's Workout card on the home screen.
- Streak counters increase retention by 34% in fitness apps (PRD Section 4.2) — hence the persistent streak display in sidebar and home stats row.
- Exercise instruction quality is the #1 reason users switch apps — hence the fully detailed Exercise Detail screen with numbered steps.
- Dark themes are strongly preferred for workout-context apps (76% of surveyed users) — validating the dark-first design decision.
- Users judge app quality within 50ms — hence the emphasis on typographic polish and precise spacing over feature density.

---

## 4. Information Architecture

### 4.1 Application Structure

RepFlow is organized around 5 primary sections, each accessible from the persistent left sidebar navigation. The sidebar is always visible on desktop (≥1024px breakpoints). Below tablet width, it collapses to a bottom navigation bar.

| Section | Nav Label | Contains |
|---------|-----------|----------|
| 1 | Dashboard | Home screen: greeting, stats, streak, today's workout, recommended exercises, weekly activity chart |
| 2 | Exercises | Browse screen: search, filters, 3-col exercise card grid, category browsing |
| 3 | Workouts | Workout plans, active workout session, workout history |
| 4 | Progress | Analytics dashboard, personal records, body measurements, charts |
| 5 | Schedule | Calendar view, planned sessions, rest day scheduling |

### 4.2 Navigation Hierarchy

The application uses a two-level navigation hierarchy:

- **Level 1 (Primary Navigation):** Left sidebar — always visible on desktop, provides access to the 5 main sections plus Settings and Notifications.
- **Level 2 (Contextual Navigation):** In-page tabs, filter chips, and breadcrumbs for sub-section navigation within each primary section.

There is no Level 3 navigation. If content requires a third level, it is presented as a full-screen overlay (modal) rather than a nested page.

### 4.3 Sidebar Anatomy

| Zone | Element | Behavior |
|------|---------|----------|
| Top | RepFlow Logo | Non-interactive brand mark; clicking returns to Dashboard |
| Primary Nav | 5 main nav items | Active state: sand gold color + dim background. Hover: subtle bg highlight. Includes notification dot badge. |
| Divider | Secondary nav | Settings, Notifications — lower visual weight |
| Plan Card | Current Plan widget | Shows active plan name, progress bar (%), week count. Accent-tinted background. |
| Bottom | User profile row | Avatar initials, name, member tier. Opens profile dropdown on click. |

---

## 5. User Flows

All flows are described as linear step sequences with decision points. Figma prototypes will render these as interactive click-through flows. This document captures the logic; Figma captures the visual.

### 5.1 Flow 1 — User Onboarding

**Trigger:** New user opens RepFlow for the first time

| Step | Screen / State | User Action | System Response |
|------|---------------|-------------|-----------------|
| 1 | Splash / Landing | Clicks 'Get Started' | Navigates to account creation |
| 2 | Sign Up | Enters name, email, password | Validates input; shows inline errors if invalid |
| 3 | Goals Screen | Selects fitness goal (Strength / Weight Loss / Endurance) | Records preference; advances to next step |
| 4 | Experience Level | Selects level (Beginner / Intermediate / Advanced) | Records level; advances |
| 5 | Equipment Screen | Selects available equipment (multi-select chips) | Records equipment; advances |
| 6 | Plan Assignment | Reviews recommended plan; accepts or browses alternatives | If accepted: saves plan, navigates to Dashboard |
| 7 | Dashboard | Sees personalized greeting + today's first workout | Flow complete; streak begins at Day 1 |

### 5.2 Flow 2 — Start Today's Workout

**Trigger:** User opens app and wants to start their scheduled workout

| Step | Screen / State | User Action | System Response |
|------|---------------|-------------|-----------------|
| 1 | Dashboard — Home | Views 'Today's Workout' card | Card shows workout name, exercise count, duration, muscle tags |
| 2 | Dashboard — Home | Clicks 'Start Workout' button | Navigates to Workout Overview screen |
| 3 | Workout Overview | Reviews exercise list and taps 'Begin' | Transitions to Active Workout — Exercise 1 detail |
| 4 | Active Workout | Completes set; taps 'Set Done' | System logs set; starts rest timer countdown |
| 5 | Rest Timer | Waits or skips rest | On completion: advances to next set or next exercise |
| 6 | Last Exercise | Completes final set | Navigates to Workout Complete screen |
| 7 | Workout Complete | Views summary (time, volume, PRs) | Streak increments; next workout scheduled |

### 5.3 Flow 3 — Exercise Discovery

**Trigger:** User wants to find and learn about a specific exercise

| Step | Screen / State | User Action | System Response |
|------|---------------|-------------|-----------------|
| 1 | Sidebar Nav | Clicks 'Exercises' | Navigates to Browse screen with all exercises loaded |
| 2 | Browse Screen | Types search query OR selects filter chip | Filters exercise grid in real time (<200ms response) |
| 3 | Browse Screen | Clicks exercise card | Navigates to Exercise Detail screen |
| 4 | Exercise Detail | Reviews instructions, muscles, stats | All content is visible without scroll on desktop |
| 5 | Exercise Detail | Clicks 'Start Exercise' | Opens single-exercise session modal |
| 5B | Exercise Detail | Clicks back arrow | Returns to Browse with filters preserved |

---

## 6. Design System

### 6.1 Color System

RepFlow uses a structured three-tier color architecture: **Brand Colors** (core identity), **Semantic Colors** (communicating meaning), and **Surface Colors** (layout and depth). All colors are defined as CSS custom properties (design tokens).

#### 6.1.1 Brand Colors

| Token Name | Hex Value | RGB | Usage |
|-----------|-----------|-----|-------|
| `--color-accent` | `#C9A87A` | 201, 168, 122 | Primary CTAs, active states, key metrics, links |
| `--color-accent-dim` | `rgba(accent, 0.09)` | — | Active nav background, card hover tint |
| `--color-accent-glow` | `rgba(accent, 0.12)` | — | Single featured card ambient glow only |
| `--color-text-primary` | `#F0EBE3` | 240, 235, 227 | Primary content: headings, labels |
| `--color-text-secondary` | `#888480` | 136, 132, 128 | Supporting text, metadata, descriptions |
| `--color-text-muted` | `#484542` | 72, 69, 66 | Timestamps, placeholder text, inactive labels |

#### 6.1.2 Surface Colors (Background Layers)

RepFlow uses a layered surface system where each level is 4–8 lightness points higher than the previous. This creates perceived depth without gradients.

| Token | Hex | Layer Assignment |
|-------|-----|-----------------|
| `--bg-0` (Base) | `#0A0A0A` | Page background — the foundational canvas |
| `--bg-1` (Sidebar) | `#0F0F0F` | Sidebar, top navigation bar |
| `--bg-2` (Card) | `#141414` | Primary cards, form inputs, search bars |
| `--bg-3` (Inner) | `#1C1C1C` | Card image placeholders, inner nested elements |
| `--bg-4` (Raised) | `#252525` | Hover states, dropdown menus, tooltips |

#### 6.1.3 Semantic Colors

| Role | Hex | Usage Context | Example |
|------|-----|---------------|---------|
| Success / Beginner | `#4DC87B` | Positive states, beginner badges | Difficulty badge: Beginner level |
| Warning / Intermediate | `#C9A87A` | Same as accent — intentional | Difficulty badge: Intermediate level |
| Danger / Advanced | `#E06560` | High difficulty, error states | Difficulty badge: Advanced, form errors |
| Info | `#4895EF` | Informational callouts, links | Help tooltips, external links |

#### 6.1.4 Accent Color Variants (Selectable)

The accent color is defined as a CSS variable, enabling four optional themes. Sand Gold is the default and primary design identity.

| Variant | Hex | RGB | Character |
|---------|-----|-----|-----------|
| **Sand Gold (Default)** | `#C9A87A` | 201, 168, 122 | Warm, earthy, premium — inspired by natural stone and leather |
| Cobalt Blue | `#4895EF` | 72, 149, 239 | Clean, focused, technical — Nike Training Club energy |
| Ember Orange | `#F07830` | 240, 120, 48 | Bold, energetic — high-intensity training vibe |
| Platinum | `#A8A8A8` | 168, 168, 168 | Monochrome, ultra-minimal, luxury |

---

### 6.2 Typography

RepFlow uses a deliberate two-font system: **Barlow Condensed** for display and numeric elements, and **Figtree** for body copy and interface text.

#### 6.2.1 Font Families

| Font | Role | Weights Used | Rationale |
|------|------|-------------|-----------|
| Barlow Condensed | Display / Headings / Numbers | 700, 800, 900 | Condensed width creates athletic urgency. High weight creates visual hierarchy in dark environments. |
| Figtree | Body / UI / Labels | 300, 400, 500, 600 | Geometric sans-serif with warm character. Excellent legibility at small sizes. |
| Arial (fallback) | System fallback only | 400, 700 | Universal system font. Never used intentionally in the UI. |

#### 6.2.2 Type Scale

| Scale Name | Size | Font | Weight | Usage |
|-----------|------|------|--------|-------|
| Display XL | 48–72px | Barlow Condensed | 900 | Splash screens, hero numbers only |
| Display L | 36–42px | Barlow Condensed | 900 | Exercise names on Detail screen, section hero text |
| Display M | 28–32px | Barlow Condensed | 800–900 | Screen headings, stat values, workout card titles |
| Display S | 20–24px | Barlow Condensed | 700 | Section headers |
| Body L | 16px | Figtree | 400 | Primary body copy, descriptions, instructions |
| Body M | 14px | Figtree | 500–600 | Card content, exercise names in cards, metadata |
| Body S | 12px | Figtree | 500 | Secondary labels, timestamps, equipment tags |
| Label / Caption | 10–11px | Figtree | 600–700 | Eyebrows, section identifiers — ALL CAPS + letter-spacing |

#### 6.2.3 Typography Rules

- **Letter spacing:** Display fonts use `-0.3px` to `-0.5px` (tighter). Eyebrow labels use `+1.0px` to `+1.5px`.
- **Line height:** Body text `1.6–1.7`. Display text `1.0–1.1`. Never use default browser line heights.
- **Color:** Primary uses `--color-text-primary`. Secondary uses `--color-text-secondary`. Muted uses `--color-text-muted`.
- **Never use pure white (`#FFFFFF`)** for body text — use warm cream (`#F0EBE3`) to reduce harshness on dark backgrounds.
- **Font loading:** Preload critical weights (700, 900 Barlow Condensed; 500 Figtree) with `<link rel='preload'>`.

---

### 6.3 Spacing & Layout System

RepFlow uses a **base-8 spacing system**. All spacing values are multiples of 4px or 8px.

#### 6.3.1 Spacing Scale

| Token | Value | Rem | Common Usage |
|-------|-------|-----|-------------|
| `--space-1` | 4px | 0.25rem | Icon-to-label gaps, inline element spacing |
| `--space-2` | 8px | 0.5rem | Chip gaps, badge padding, small internal gaps |
| `--space-3` | 12px | 0.75rem | Card internal gaps, list item spacing |
| `--space-4` | 16px | 1rem | Card padding (small), section element spacing |
| `--space-5` | 20px | 1.25rem | Card horizontal padding (standard) |
| `--space-6` | 24px | 1.5rem | Card vertical padding, component gap |
| `--space-7` | 28px | 1.75rem | Section vertical gap, screen padding |
| `--space-8` | 32px | 2rem | Major section spacing, content area padding |
| `--space-10` | 40px | 2.5rem | Page-level vertical sections |
| `--space-12` | 48px | 3rem | Hero section padding, modal header height |

#### 6.3.2 Grid System

| Breakpoint | Viewport Width | Layout | Sidebar Behavior |
|-----------|---------------|--------|-----------------|
| Desktop XL | ≥1440px | Sidebar 240px + fluid content area | Always visible, full width |
| Desktop | 1024px–1439px | Sidebar 200px + fluid content area | Always visible, compact labels |
| Tablet | 768px–1023px | Sidebar collapsed to icon-only (60px) | Icon rail — hover reveals tooltip labels |
| Mobile L | 480px–767px | No sidebar — bottom nav bar (4 icons) | Hidden; replaced by bottom navigation |
| Mobile S | <480px | No sidebar — bottom nav bar (4 icons) | Hidden; single-column layout |

#### 6.3.3 Content Grid

- **Desktop:** 12-column grid, 24px gutter, max content width 1200px
- **Exercise grid:** `repeat(auto-fill, minmax(200px, 1fr))` — adapts from 4 columns (XL) to 2 columns (tablet)
- **Stats row:** Always 3 equal columns on desktop; stacks to 2+1 on mobile
- **Detail screen:** 2-column split (`1fr 1.1fr`) on desktop; single column on tablet and below

---

### 6.4 Border Radius

| Token | Value | Applied To |
|-------|-------|-----------|
| `--radius-sm` | 6px | Badges, difficulty chips, small tags, filter chips |
| `--radius-md` | 8–9px | Buttons, navigation items, icon buttons |
| `--radius-lg` | 12px | Exercise cards (small), stat boxes, mini stat cards |
| `--radius-xl` | 14–16px | Primary cards (workout card, browse cards), sidebar plan card |
| `--radius-2xl` | 24px+ | Full-bleed hero areas, video/image containers |
| `--radius-full` | 50% | Avatar circles, color swatches only |

### 6.5 Border Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--border-subtle` | `1px solid rgba(255,255,255,0.055)` | Default card borders, sidebar border, search bar |
| `--border-default` | `1px solid rgba(255,255,255,0.10)` | Hover state borders, focused inputs |
| `--border-accent` | `1px solid rgba(201,168,122,0.2–0.3)` | Accent-tinted borders on plan card, step number boxes |
| `--border-step` | `1px solid var(--bg-3)` | Separator lines between instruction steps |

### 6.6 Elevation & Depth

RepFlow achieves visual depth through **surface color layering** rather than box shadows.

- Depth is communicated by background color value: darker = further back, lighter = closer to user
- Box shadows are avoided — they create a floaty appearance inconsistent with the grounded design language
- **Only exception:** A single subtle ring `0 0 0 1px rgba(255,255,255,0.06)` may be used on dropdown menus
- **Glow effects:** Restricted to one accent-color glow on the Today's Workout hero card (`rgba(accent, 0.12)`)

---

## 7. Component Library

All components are defined here with their variants, states, and specifications.

### 7.1 Buttons

#### 7.1.1 Primary Button (CTA)

| Property | Specification |
|----------|--------------|
| Background | `#C9A87A` (`--color-accent`) |
| Text Color | `#0A0A0A` (dark — maximum contrast on accent) |
| Font | Barlow Condensed, 16–18px, weight 800, letter-spacing 0.8–1.5px, UPPERCASE |
| Padding | `11px 22px` |
| Border Radius | `9px` (`--radius-md`) |
| Icon | Optional left icon; `ti-player-play` for start actions; 14–16px, gap 8px |
| Min Width | 120px |

**Primary Button States:**

| State | Background | Transform | Additional |
|-------|-----------|-----------|------------|
| Default | `#C9A87A` | none | Cursor: pointer |
| Hover | opacity 0.88 | `translateY(-1px)` | Transition: 200ms ease |
| Active/Pressed | opacity 0.80 | `translateY(0) scale(0.98)` | Transition: 100ms ease |
| Disabled | opacity 0.35 | none | Cursor: not-allowed; no hover effect |
| Loading | opacity 0.88 | none | Replace label with spinner + 'Loading…' text |

#### 7.1.2 Secondary Button

| Property | Specification |
|----------|--------------|
| Background | Transparent |
| Border | `1px solid rgba(255,255,255,0.10)` |
| Text Color | `--color-text-secondary` (`#888480`) |
| Hover State | Background: `--bg-3`; border brightens; text: `--text-primary` |
| Usage | Non-primary actions: Skip, Cancel, Back, Browse all, See more |

#### 7.1.3 Icon Button

| Property | Specification |
|----------|--------------|
| Size | 36×36px |
| Background | `--bg-2` (`#141414`) |
| Border | `--border-subtle` |
| Border Radius | 8px |
| Icon Size | 17–18px (Tabler outline icons) |
| Icon Color | `--color-text-secondary`; transitions to `--text-primary` on hover |
| Usage | Search, notification bell, settings — topbar actions |

---

### 7.2 Form Inputs

#### 7.2.1 Search Bar

| Property | Specification |
|----------|--------------|
| Height | 44px |
| Background | `--bg-2` (`#141414`) |
| Border | `--border-subtle` |
| Border Radius | 10px |
| Padding | `0 14px` horizontal |
| Left Icon | `ti-search`, 18px, `--color-text-muted`, gap 10px |
| Placeholder | `--color-text-muted`; Figtree 14px |
| Focus State | `border-color: rgba(201,168,122,0.3)`; no outline ring |
| Right Element | Filter icon or clear (×) when input has value |

---

### 7.3 Cards

#### 7.3.1 Today's Workout Card (Hero)

| Property | Specification |
|----------|--------------|
| Width | Full content area width |
| Background | `--bg-2` (`#141414`) |
| Border | `--border-subtle`; radius 16px |
| Padding | `22px 24px` |
| Glow Effect | Absolute circle: right `-30px`, top `-30px`; 140px diameter; `rgba(accent,0.12)`; `pointer-events: none` |
| Eyebrow Label | 10px, ALL CAPS, Figtree 700, letter-spacing 1.5px, `--color-accent`; margin-bottom 7px |
| Title | Barlow Condensed, 30px, weight 900; margin-bottom 5px |
| Subtitle | Figtree, 13px, `--text-secondary`; margin-bottom 18px |
| Action Row | Primary CTA button + pill tags; flex row, gap 12px |

#### 7.3.2 Exercise Card (Browse Grid)

| Property | Specification |
|----------|--------------|
| Image Area | 145px height; `--bg-3` background; overflow hidden on parent clips radius |
| Body Area | `14px 15px` padding |
| Exercise Name | Figtree 14px, weight 600, margin-bottom 9px |
| Meta Row | Equipment tag (left) + difficulty badge (right); `space-between` |
| Hover State | `border-color: --border-default`; `translateY(-2px)`; transition 200ms |
| Cursor | Pointer — entire card is clickable |

#### 7.3.3 Mini Stat Card

| Property | Specification |
|----------|--------------|
| Layout | Horizontal flex: icon box (38×38px) + text stack (value + label) |
| Icon Box | 38×38px, radius 9px, background `--accent-dim`, color `--accent`, font-size 19px |
| Value | Barlow Condensed 28px weight 800, line-height 1 |
| Label | Figtree 11px, `--color-text-muted`, margin-top 2px |
| Card Padding | `16px 18px` |

---

### 7.4 Filter Chips

| Property | Default State | Active State |
|----------|--------------|-------------|
| Background | `--bg-2` | `--accent-dim` |
| Border | `1px solid rgba(255,255,255,0.055)` | `1px solid rgba(201,168,122,0.30)` |
| Text Color | `--text-secondary` | `--color-accent` |
| Font | Figtree 13px weight 500 | Figtree 13px weight 500 |
| Padding | `7px 15px` | `7px 15px` |
| Border Radius | 7px | 7px |

### 7.5 Badges (Difficulty)

| Level | Background | Text Color |
|-------|-----------|------------|
| Beginner | `rgba(77,200,123,0.10)` | `#4DC87B` |
| Intermediate | `rgba(201,168,122,0.10)` | `#C9A87A` |
| Advanced | `rgba(224,101,96,0.10)` | `#E06560` |

All badges: 10px, weight 700, uppercase, letter-spacing 0.5px, padding `3px 8px`, radius 4px.

### 7.6 Navigation — Sidebar Item

| Property | Default | Active |
|----------|---------|--------|
| Background | transparent | `--accent-dim` |
| Icon + Label Color | `--text-secondary` | `--color-accent` |
| Font | Figtree 13.5px weight 500 | Same |
| Padding | `10px 12px` | `10px 12px` |
| Border Radius | 8px | 8px |
| Icon Size | 18px | 18px |
| Hover | Background: `--bg-2`; color: `--text-primary` | No change |
| Notification Badge | 7px circle, `--color-accent`, border 1.5px `--bg-1`; absolute top-right | Same |

---

## 8. Screen Specifications

### 8.1 Home Dashboard Screen

**Purpose:** The home screen reduces friction to zero for the user's most important daily action: starting today's workout. Every element is ranked by proximity to that goal.

#### Layout Zones (top to bottom)

| Zone | Component | Specification |
|------|-----------|--------------|
| 1 | Stats Row | 3-column equal grid; gap 12px; Streak, Workouts Done, Time This Week. Margin-bottom 24px. |
| 2 | Today's Workout Card | Full width hero card; padding 22px 24px; eyebrow, title, subtitle, CTA button + pill tags. Margin-bottom 28px. |
| 3 | Section Header: Weekly Activity | Barlow Condensed 19px + 'Full history' link (sand gold 12px). Margin-bottom 14px. |
| 4 | Weekly Activity Bar Chart | 7 day bars (M–S), 52px tall, accent-colored fills, today highlighted. Margin-bottom 28px. |
| 5 | Section Header: Recommended | Same pattern + 'Browse all →' link. Margin-bottom 14px. |
| 6 | Exercise Grid | `auto-fill minmax(155px, 1fr)` grid; gap 12px; 6 cards visible. |

#### Top Bar

| Element | Specification |
|---------|--------------|
| Greeting Label | 'Good morning' / 'Good afternoon' / 'Good evening' — time-based; 11px Figtree, ALL CAPS, letter-spacing 1.2px |
| User Name | Barlow Condensed 30px weight 900, letter-spacing -0.3px — full name displayed |
| Icon Buttons | Search + Notifications (with conditional notification dot badge) |

#### Weekly Activity Bar Chart

- Container height: 52px
- 7 bars (M T W T F S S), equal flex widths, gap 8px
- Fill height: proportional to workout volume (0–100% of max weekly target)
- Fill color: `--color-accent`, opacity 0.80 for past days, 1.0 for today
- Today label: `--color-accent` (all others: `--text-muted`)
- Empty future days: bar background only, no fill

---

### 8.2 Exercise Browse Screen

**Purpose:** Discovery interface. Design must make filtering fast and results scannable.

#### Layout Zones

| Zone | Component | Specification |
|------|-----------|--------------|
| 1 | Search Bar | Full width, 44px height, `--bg-2`, search icon left. Margin-bottom 14px. |
| 2 | Filter Chip Row | Horizontal flex, gap 7px, wrapping allowed. Chips: All, Bodyweight, Dumbbells, Kettlebell, Barbell, Resistance Band, Machine. Margin-bottom 20px. |
| 3 | Exercise Grid | `auto-fill minmax(210px, 1fr)`, gap 14px. Each card: 145px image + body area. |

#### Filter Behavior

- Selecting a chip replaces 'All' — **single-select** (one filter active at a time)
- Search query + filter chip can be active simultaneously — AND logic
- Grid filters in real time — no button required — **debounce 150ms** on keystroke
- Empty state: 'No exercises found for [query]' + reset button

---

### 8.3 Exercise Detail Screen

**Purpose:** Replace the need to search YouTube for exercise tutorials. Comprehensive content, not crowded.

#### Layout Structure (Desktop — 2 column)

| Column | Content | Width |
|--------|---------|-------|
| Left | Hero image/video (320px height) + 2×2 info cards (Equipment, Category, Calories, Added By) | `1fr` |
| Right | Exercise name, tag row, 3 stat boxes, muscle targets, numbered instructions, Start CTA | `1.1fr` |

#### Right Column Components

| Component | Specification |
|-----------|--------------|
| Exercise Name | Barlow Condensed 38px weight 900, letter-spacing -0.5px, line-height 1.05. Margin-bottom 10px. |
| Tag Row | Equipment tag + difficulty badge + duration tag. Flex row, gap 7px, flex-wrap. Margin-bottom 20px. |
| Stat Trio | 3-column grid, gap 10px. Each: `--bg-2` card, centered; value Barlow Condensed 34px/900/accent; label 10px Figtree/700/muted/CAPS. |
| Muscle Targets | Eyebrow label + flex-wrap tags. Primary muscles: accent-tinted. Secondary: standard tag style. |
| Instruction Steps | Step number box (24×24px, accent-dim bg, accent border/text) + step text (13.5px, `--text-secondary`, line-height 1.6). Divider between steps: `--border-subtle`. |
| Start Exercise CTA | Full width primary button, 16px vertical padding, Barlow Condensed 18px 900 uppercase. Margin-top 18px. |

---

## 9. Interaction Design

### 9.1 Animation Principles

- All transitions use **ease-out timing** (decelerating) — feels natural and snappy
- Maximum animation duration: **300ms** for state changes; **500ms** for screen-level transitions
- No animation for screen navigation (instant) — feels immediate and direct
- Loading spinners appear after **200ms delay** — avoid flashing loaders for fast connections
- Stagger delays (card grids loading): 30ms per card, max 150ms total

### 9.2 Micro-Interactions

| Interaction | Duration / Easing | Description |
|------------|------------------|-------------|
| Card hover lift | 150ms / ease-out | `translateY(-2px)` + border color brightens |
| Button press | 100ms / ease-in | `scale(0.98)` + opacity 0.80 — tactile press feeling |
| Nav item activation | 150ms / ease-out | Background fade to `--accent-dim`; color crossfade to accent |
| Filter chip toggle | 150ms / ease-out | Background and border color crossfade; no transform |
| Stat value update | 400ms / ease-out | Number counts up from previous to new value |
| Streak number | 600ms / ease-out | Gentle bounce (`scale(1.12) → scale(1.0)`) when streak increments |
| Weekly bar fill | 500ms / ease-out | Height animates from 0 to target on first load; staggered per day |
| Notification dot | 300ms / ease-out | `scale(0) → scale(1)` when new notification arrives |
| Accent color switch | 300ms / ease-in-out | CSS variable transition — all accent elements fade simultaneously |

### 9.3 Page & Screen Transitions

| Transition | Behavior |
|-----------|----------|
| Sidebar nav switch | Content area: instant swap. Sidebar active state: 150ms crossfade. Scroll resets to top. |
| Exercise card → Detail | Content fades out 150ms; new content fades in 200ms. Hero scales `0.98 → 1.0`. |
| Workout Start | Full-screen overlay slides in from bottom (500ms, ease-out). Dark overlay behind. |
| Workout Complete | Stat values count up; brief sand-gold flash on streak counter. No confetti. |

### 9.4 Loading States

| Context | Treatment |
|---------|-----------|
| Exercise grid initial load | Skeleton cards: `--bg-2` cards with `--bg-3` shimmer animation. Left-to-right shimmer, 1.5s loop. |
| Search results | Grid fades to 40% opacity while filtering; fades back when results load. No spinner. |
| Start Workout button | Replace label with 'Loading…' + small spinner (18px). Button disabled during load. |
| User data (stats) | Numbers show '—' placeholder until data resolves. |

### 9.5 Error States

| Context | Treatment |
|---------|-----------|
| Search: no results | Empty state SVG + 'No exercises found for [query]' + 'Clear search' button |
| Form validation | Inline error below input; red border (`#E06560`); brief shake animation; 12px Figtree error message |
| Network failure | Toast notification (bottom-right, 320px, dark card, 4s duration): 'Connection issue. Changes saved locally.' |
| Workout save fail | Persistent banner (not toast): 'Your workout couldn't be saved. Tap to retry.' — remains until resolved |

---

## 10. Accessibility Standards

### 10.1 WCAG 2.1 Compliance Target

> RepFlow targets **WCAG 2.1 Level AA** compliance across all screens and components. Level AAA is targeted for color contrast on interactive elements.

### 10.2 Color Contrast Ratios

| Text Combination | Contrast Ratio | WCAG Standard | Status |
|-----------------|---------------|---------------|--------|
| `--text-primary` (`#F0EBE3`) on `--bg-0` (`#0A0A0A`) | 17.3:1 | AA requires 4.5:1 | ✅ PASS (AAA) |
| `--color-accent` (`#C9A87A`) on `--bg-0` (`#0A0A0A`) | 6.2:1 | AA requires 4.5:1 | ✅ PASS (AA) |
| `--text-secondary` (`#888480`) on `--bg-0` (`#0A0A0A`) | 4.8:1 | AA requires 4.5:1 | ✅ PASS (AA) |
| Button text (`#0A0A0A`) on `--color-accent` (`#C9A87A`) | 6.1:1 | AA requires 4.5:1 | ✅ PASS (AA) |
| Beginner badge (`#4DC87B`) on `--bg-2` (`#141414`) | 5.4:1 | AA requires 4.5:1 | ✅ PASS (AA) |
| `--text-muted` (`#484542`) on `--bg-0` (`#0A0A0A`) | 3.0:1 | AA requires 4.5:1 | ⚠️ REVIEW — non-essential labels only |

### 10.3 Keyboard Navigation

- All interactive elements are focusable via `Tab` key in logical document order
- **Focus indicator:** `2px solid --color-accent` outline with `2px offset` — never hidden or removed
- **Skip-to-content link:** Visually hidden but focusable; appears on first Tab press
- **Card grid:** Arrow key navigation using roving tabindex pattern
- **Modal dialogs:** Focus trapped inside modal; `Escape` closes; focus returns to trigger on close
- Each sidebar nav item is a focusable button; active item announced by screen reader

### 10.4 Screen Reader Support

- All icon buttons have `aria-label` attributes: e.g., `<button aria-label="Search exercises">`
- Decorative icons have `aria-hidden="true"` to prevent screen reader noise
- Exercise cards contain `h3` heading with exercise name
- Stat values use full context: `aria-label="Current streak: 14 days"`
- Filter chips use `aria-pressed` attribute (true/false) for toggle state
- Live search results: `aria-live="polite"` region announces result count changes
- Progress bars: `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`

### 10.5 Touch & Motion Accessibility

| Requirement | Implementation |
|------------|---------------|
| Minimum touch target | 44×44px for all interactive elements (WCAG 2.5.5); icon buttons use padding to expand touch area |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all transitions and animations |
| Text scaling | All sizes in `rem`; layout functional at 200% browser zoom without horizontal scrolling |
| Focus visible | `:focus-visible` selector — focus ring only appears for keyboard navigation |

---

## 11. Responsive Design

### 11.1 Breakpoint System

| Breakpoint | Min-Width | Layout Description |
|-----------|----------|-------------------|
| xs (Mobile S) | 320px | Single column; bottom navigation bar (4 icons); no sidebar |
| sm (Mobile L) | 480px | Single column; bottom navigation persists; card grid 2 columns |
| md (Tablet) | 768px | Icon-rail sidebar (60px); content takes remaining width; grid 2–3 cols |
| lg (Desktop) | 1024px | Full sidebar 220px; content area fluid; grid 3–4 cols; detail screen 2-col |
| xl (Desktop XL) | 1440px | Full sidebar 240px; content max-width 1200px centered; grid 4–5 cols |

### 11.2 Component Responsive Behavior

| Component | Desktop Behavior | Mobile Behavior |
|-----------|-----------------|-----------------|
| Stats Row | 3 equal columns, gap 12px | 2 columns top + 1 below (2+1 grid) |
| Today's Workout Card | Full width, horizontal action row | Button stacks above pills |
| Exercise Grid (Home) | `auto-fill minmax(155px)` | 2 columns fixed |
| Browse Grid | `auto-fill minmax(210px)` | 2 columns; cards 100% width on xs |
| Exercise Detail | 2-column split layout | Single column; hero at top, stats/instructions below |
| Sidebar | Always visible (lg+) | Hidden; bottom nav 4 icons; full nav via slide-up sheet |
| Top Bar Name | Full name visible | First name only |
| Filter Chips | Horizontal, flex-wrap | Horizontally scrollable (`overflow-x: auto`, no wrap) |

---

## 12. Developer Handoff Notes

### 12.1 CSS Architecture

- All design tokens are defined as CSS custom properties on `:root`
- Token naming: `--[category]-[variant]` e.g., `--color-accent`, `--bg-2`, `--radius-lg`, `--space-4`
- **Never hardcode hex values** in component CSS — always reference the token
- Component styles use BEM-adjacent naming: `.card`, `.card__body`, `.card--featured`
- Dark theme is the only theme — no light-mode media query required

### 12.2 Font Loading

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Figtree:wght@400;500;600&display=swap');
```

Preload critical weights to prevent FOIT:
```html
<link rel="preload" href="..." as="font" crossorigin>
```

Fallback stack:
```css
font-family: 'Barlow Condensed', Impact, 'Arial Narrow', sans-serif;
font-family: 'Figtree', system-ui, -apple-system, sans-serif;
```

### 12.3 Icon System

Icons are sourced from **Tabler Icons (outline variant only)**.

```html
<!-- Always add aria-hidden for decorative icons -->
<i class="ti ti-barbell" aria-hidden="true"></i>

<!-- Icon buttons always need aria-label -->
<button aria-label="Search exercises">
  <i class="ti ti-search" aria-hidden="true"></i>
</button>
```

### 12.4 CSS Token Reference

```css
:root {
  /* Backgrounds */
  --bg-0: #0A0A0A;
  --bg-1: #0F0F0F;
  --bg-2: #141414;
  --bg-3: #1C1C1C;
  --bg-4: #252525;

  /* Accent */
  --color-accent: #C9A87A;
  --color-accent-rgb: 201, 168, 122;
  --color-accent-dim: rgba(201, 168, 122, 0.09);
  --color-accent-glow: rgba(201, 168, 122, 0.12);

  /* Text */
  --color-text-primary: #F0EBE3;
  --color-text-secondary: #888480;
  --color-text-muted: #484542;

  /* Borders */
  --border-subtle: 1px solid rgba(255, 255, 255, 0.055);
  --border-default: 1px solid rgba(255, 255, 255, 0.10);
  --border-accent: 1px solid rgba(201, 168, 122, 0.20);

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 9px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;

  /* Spacing */
  --space-1: 4px;    --space-2: 8px;
  --space-3: 12px;   --space-4: 16px;
  --space-5: 20px;   --space-6: 24px;
  --space-7: 28px;   --space-8: 32px;
  --space-10: 40px;  --space-12: 48px;
}
```

### 12.5 Critical Implementation Rules

| # | ✅ Do | ❌ Do NOT |
|---|-------|-----------|
| 1 | Use `rgba(255,255,255,0.055)` for card borders | Use solid white or gray borders — they look heavy |
| 2 | Use `--color-text-primary` (`#F0EBE3`) for body text | Use pure white (`#FFFFFF`) — too harsh on dark |
| 3 | Use CSS transitions on `border-color` and `color` for hover states | Animate `background-color` on cards — causes jarring flashes |
| 4 | Respect the 8px spacing grid for all margin/padding values | Use arbitrary values like 11px, 17px, 23px |
| 5 | Use Barlow Condensed for ALL numeric display values (stats, streaks) | Use Figtree for numbers — it loses the athletic identity |
| 6 | Apply `overflow: hidden` on card container to clip image radius | Apply border-radius separately to image — creates gaps |
| 7 | Set `letter-spacing: -0.3px` to `-0.5px` on large display headings | Let browser default loose spacing on condensed fonts |
| 8 | Use `position: absolute` for the glow circle inside the hero card | Apply glow as `box-shadow` — it bleeds outside the card |
| 9 | Use CSS grid for exercise cards (`auto-fill, minmax`) | Use fixed column counts — breaks on mid-range widths |
| 10 | Add `aria-hidden="true"` to all decorative icon elements | Leave icon elements without ARIA attributes |

### 12.6 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint (FCP) | < 1.5s on 4G | Lighthouse, Chrome DevTools |
| Largest Contentful Paint (LCP) | < 2.5s | Core Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Skeleton loaders prevent shifts |
| Filter response time | < 200ms | Input to grid update |
| Animation frame rate | 60fps minimum | Chrome Performance panel |

---

## 13. Future Design Considerations

The following items are intentionally out of scope for v1.0 but should be considered during roadmap planning. Design tokens and component architecture have been built to accommodate these without major refactoring.

| Feature | Priority | Design Impact |
|---------|----------|--------------|
| Light Mode | High — v1.1 | Add `--theme-light` token set; all colors redefined; no structural changes |
| Active Workout HUD | High — v1.1 | Full-screen focus mode overlay; large countdown timer; rest timer ring animation |
| Social Feed / Community | Medium — v1.2 | New nav section; activity cards; like/comment interactions |
| Custom Workout Builder | Medium — v1.2 | Drag-and-drop exercise list; set/rep editor; save-as-plan flow |
| AI Workout Recommendations | Low — v2.0 | Conversational chip UI in sidebar; recommendation cards with AI badge |
| Wearable Integration | Low — v2.0 | Real-time heart rate overlay on Active Workout HUD |
| Video Instruction Playback | Medium — v1.2 | Replace SVG placeholders with video; play/pause overlay; scrubber; fullscreen |

---

## 14. Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | May 2026 | Design Team | Initial draft — full document covering all 14 sections. Based on PRD v1.0 and TRD v1.0. |

---

*RepFlow UI/UX Design Document — Version 1.0 · Document #3 of 3 · Confidential · May 2026*
