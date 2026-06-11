# DOX framework

- DOX is highly performant AGENTS.md hierarchy installed here
- Agent must follow DOX instructions across any edits

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable AGENTS.md plus every parent AGENTS.md above it

## Read Before Editing

1. Read the root AGENTS.md
2. Identify every file or folder you expect to touch
3. Walk from the repository root to each target path
4. Read every AGENTS.md found along each route
5. If a parent AGENTS.md lists a child AGENTS.md whose scope contains the path, read that child and continue from there
6. Use the nearest AGENTS.md as the local contract and parent docs for repo-wide rules
7. If docs conflict, the closer doc controls local work details, but no child doc may weaken DOX

Do not rely on memory. Re-read the applicable DOX chain in the current session before editing.

## Update After Editing

Every meaningful change requires a DOX pass before the task is done.

Update the closest owning AGENTS.md when a change affects:

- purpose, scope, ownership, or responsibilities
- durable structure, contracts, workflows, or operating rules
- required inputs, outputs, permissions, constraints, side effects, or artifacts
- user preferences about behavior, communication, process, organization, or quality
- AGENTS.md creation, deletion, move, rename, or index contents

Update parent docs when parent-level structure, ownership, workflow, or child index changes. Update child docs when parent changes alter local rules. Remove stale or contradictory text immediately. Small edits that do not change behavior or contracts may leave docs unchanged, but the DOX pass still must happen.

## Hierarchy

- Root AGENTS.md is the DOX rail: project-wide instructions, global preferences, durable workflow rules, and the top-level Child DOX Index
- Child AGENTS.md files own domain-specific instructions and their own Child DOX Index
- Each parent explains what its direct children cover and what stays owned by the parent
- The closer a doc is to the work, the more specific and practical it must be

## Child Doc Shape

- Create a child AGENTS.md when a folder becomes a durable boundary with its own purpose, rules, responsibilities, workflow, materials, or quality standards
- Work Guidance must reflect the current standards of the project or user instructions; if there are no specific standards or instructions yet, leave it empty
- Verification must reflect an existing check; if no verification framework exists yet, leave it empty and update it when one exists

Default section order:
- Purpose
- Ownership
- Local Contracts
- Work Guidance
- Verification
- Child DOX Index

## Style

- Keep docs concise, current, and operational
- Document stable contracts, not diary entries
- Put broad rules in parent docs and concrete details in child docs
- Prefer direct bullets with explicit names
- Do not duplicate rules across many files unless each scope needs a local version
- Delete stale notes instead of explaining history
- Trim obvious statements, repeated rules, misplaced detail, and warnings for risks that no longer exist

## Closeout

1. Re-check changed paths against the DOX chain
2. Update nearest owning docs and any affected parents or children
3. Refresh every affected Child DOX Index
4. Remove stale or contradictory text
5. Run existing verification when relevant
6. Report any docs intentionally left unchanged and why

## User Preferences

When the user requests a durable behavior change, record it here or in the relevant child AGENTS.md

---

## Purpose
Live (but unlisted) demo site for Dr. Deogire Super Speciality Dental Clinic, Nerul. Shown to prospects as JJ Consulting proof-of-work. Currently `noindex, nofollow` — invisible to Google until principal authorises go-live.

## Ownership
Principal (Zaki Jariwala). Client: Dr. Deogire. NMC compliance responsibility rests with JJ Consulting on all copy.

## Local Contracts
- **noindex MUST stay** until principal explicitly authorises go-live and go-live checklist is complete
- **Two phone numbers — never swap them:**
  - `919222122343` = clinic WhatsApp (all patient-facing CTAs)
  - `919157564545` = Zaki's JJ number (the floating "Built by JJ" badge only)
- **NMC hard rules** (apply to all files, all copy, all future edits):
  - No "painless" anywhere
  - No comparative superlatives (best, better than, #1, most experienced)
  - No "permanent" for implants — always "long-term"
  - "A confident patient heals better than an anxious one" is patient psychology, not a comparative claim — permitted
- **build-rules.md and content-rules.md are binding** — read them before editing any copy or HTML structure
- **iOS video fix** — `.intro-sticky` uses `clip-path: inset(0)`, NOT `overflow: hidden`. Do not revert.
- **Go-live blockers** (do not index until all resolved):
  - Cloudflare beacon token: replace `PLACEHOLDER_TOKEN` in index.html
  - GPS coordinates: refine from locality-level (19.0330, 73.0200) to exact shopfront
  - Domain CNAME: not configured
  - og-image.jpg exists but is a poster crop — update with branded image at go-live

## Child DOX Index
- `css/` — Extracted stylesheet. iOS autoplay constraints documented. → `css/AGENTS.md`
- `assets/` — Clinic media (intro video + poster). NMC and licensing rules. → `assets/AGENTS.md`
