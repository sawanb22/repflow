## Documentation — Read Before Every Task

All project documentation is in /docs/ folder.

Before ANY task:

* New feature or page → read /docs/PRD.md
* Technical decision → read /docs/TRD.md
* Any UI work → read /docs/RepFlow\_UIUX\_Design\_Document\_v1.0.md + repflow.html + tokens.css
* Database work → read /docs/BACKEND\_SCHEMA.md
* Starting new phase → read /docs/IMPLEMENTATION.md

Never build anything that contradicts these documents.
Never hardcode anything defined in these documents.
If something is unclear — read the relevant doc again
before asking.

## Layout Rules — Non-Negotiable

App must be edge-to-edge. No gaps. No centering.

* App shell: display flex, width 100vw, height 100vh
* Sidebar: width 230px, min-width 230px, flex-shrink 0
* Main content: flex 1, min-width 0, overflow-y auto
* NO max-width on any layout element
* NO margin: 0 auto on any layout element
* Padding goes INSIDE screen content only: 26px 30px
* Check globals.css for any container/max-width — delete it

## Tech Stack Rule

Read package.json before writing any code.
Use ONLY packages already installed. Zero new dependencies.

## Accent Color System

Accent color is runtime-switchable via CSS variables.
NEVER hardcode #C9A87A or any accent hex anywhere.
Always use var(--color-accent) and var(--color-accent-rgb).
ThemeContext.tsx controls this — do not bypass it.

## How to Approach Any Task

Before writing code for any task:

1. Read the relevant docs in /docs/ as CLAUDE.md instructs
2. Read 2-3 existing files in the area you're working in
3. Understand the pattern already established — match it
4. Make the smallest change that solves the problem
5. After finishing — list every file you modified

## Self-Check Before Saving Any File

Ask yourself these questions before saving:

* Does this match the pattern of existing files in this area?
* Am I introducing something that doesn't already exist in the project?
* If this is a layout component — does it center or constrain anything?
* Am I using a package/class/pattern not already in this codebase?
* Could this change break something outside the task scope?

If any answer is yes — stop and reconsider.

## Layout Principle (one rule, not a list)

This is a full-viewport app like Notion or Linear, not a
marketing page. Layout components never center, constrain,
or add outer padding. Padding lives inside screen content only.

Banned on any wrapper/shell/layout component:
items-center · justify-center · mx-auto · max-w-\* · container · px-4+

## When Something Looks Wrong

Do not patch it. Trace it:

1. Find where the problem originates
2. Read the surrounding code to understand intent
3. Fix the root cause, not the symptom
4. Report what you found and what you changed

