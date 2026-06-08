# Deogire Dental — Agent Context
**Last updated:** 2026-06-03  
**Branch:** master  
**Deployed:** Cloudflare Pages → `https://deogire-dental.pages.dev` (noindex staging)

---

## Project overview

JJ Consulting staging site for **Dr. Deogire Super Speciality Dental Clinic**, Nerul, Navi Mumbai.  
Single-file static site: everything is in **`index.html`** (all CSS and JS inline).  
Governed by **`build-rules.md`** and **`content-rules.md`** — read those before making any changes.  
Deployed automatically by Cloudflare Pages on every push to `master`.

---

## File structure

```
deogire-dental/
├── index.html           — entire site (CSS + JS + HTML inline, ~115 KB)
├── build-rules.md       — mandatory compliance rules (NMC, technical, staging)
├── content-rules.md     — copy generation rules
├── assets/
│   ├── dr-deogire-intro.mp4          — placeholder hero video (2.8 MB, 1080p, 10s)
│   └── dr-deogire-intro-poster.jpg   — poster frame for the video
└── .claude/
    └── commands/taste.md             — custom /taste design audit skill
```

---

## Clinic data (hardcoded in index.html)

| Field | Value |
|---|---|
| Clinic name | Dr. Deogire Super Speciality Dental Clinic |
| Doctor | Dr. Gopal Deogire |
| Phone / WhatsApp | +91 92221 22343 |
| Location | Nerul, Navi Mumbai, Maharashtra |
| Google rating | 4.9★ · 212 reviews |
| Accent colour | `--accent: #B85C38` (terracotta) |
| Hours | Confirm from GMB — open until 10 PM daily per hero pill |

---

## Design system

- **Fonts:** Cormorant Garamond (serif, headings) + Inter (sans, body)
- **Colours:** `--warm-white: #FAF6F0`, `--charcoal: #2A2420`, `--sage: #B85C38` (terracotta), `--sage-light: #D4896E`, `--sage-pale: #F5E8E0`
- `overflow-x: clip` on html + body (NOT `hidden` — hidden breaks `position: sticky`)
- `.reveal` + IntersectionObserver for scroll-in animations
- All WhatsApp CTAs use clinic number `919222122343` with context-specific prefill messages
- JJ Consulting float button (bottom-left) uses a **different** number `919157564545` — this is intentional, it's the agency's own lead-gen button

---

## Page structure (top → bottom)

1. `#intro` — **NEW** full-viewport video header (above nav, added 2026-06-03)
2. `<nav id="navbar">` — fixed, z-index 100
3. `#hero` — main hero: clinic name, rating badge, WhatsApp + phone CTAs, review card
4. `#trust-bar` — years / rating / review count / differentiator
5. `#why` — about / doctor narrative / feature pills
6. `#safety` — sterilisation timeline (4-step tab system)
7. `#services` — service cards with per-service WhatsApp CTAs
8. `#reviews` — patient reviews carousel + tag pills
9. `#location` — address, hours, directions
10. `#book` — final CTA section
11. `<footer>` — clinic name, address, auto year
12. JJ Consulting float button (fixed, bottom-left, z-index 90)

---

## The #intro video header (added 2026-06-03)

Full-viewport intro above the nav. Self-hosted `<video>` only — YouTube/Vimeo are banned by build-rule A6 (cookies).

**Scroll choreography:**
- Section is `180svh` tall; the `.intro-sticky` child is `position: sticky; height: 100svh`
- **Pinned phase** (first ~80svh of scroll): "Dr. Deogire" name drifts down and fades out
- **Hand-off phase** (final ~100svh): video + scrim dissolve as sticky slides up and the hero rises in behind it — no empty gap

**Why `overflow-x: clip` instead of `hidden`:** `overflow-x: hidden` on html/body makes the body a scroll container, which silently breaks `position: sticky` (sticky pins to body, never moves). `clip` prevents horizontal scroll without creating a scroll container.

**Placeholder video:** sourced from Pixabay (commercial use licence, no attribution required). To be replaced by real clinic footage when shot. Path: `assets/dr-deogire-intro.mp4`.

**Mobile autoplay — known open issue (as of 2026-06-03):** Video is not autoplaying on mobile despite three fix attempts. Current approach in JS:
- Sets `video.muted = true` and `video.defaultMuted = true` as JS properties
- Calls `video.load()` explicitly (mobile browsers ignore `preload="auto"`)
- Listens on `loadedmetadata` and `canplay` events
- Falls back to `touchstart` for Low Power Mode / Data Saver
- If still not resolved: consider replacing the `<video>` with a CSS-animated placeholder on mobile (`@media (hover: none)`) and only loading the video on desktop

---

## Compliance status (build-rules.md audit)

### Passing
- A1 noindex ✅ | A6 no data collection ✅ | A5 no promotional pricing ✅
- A7 WhatsApp prefill ✅ | A8 copyright auto-year ✅ | A9 footer no domain ✅
- B2 fonts ✅ | B3 meta set ✅ | B4 JSON-LD schema ✅ | B5 Cloudflare analytics ✅
- B6 accent variable ✅ | Rule Set D sections all present ✅

### Outstanding NMC copy violations (NOT yet fixed)
These need fixing before go-live or client review of copy:

1. **`index.html` ~line 1953** — review quote: *"Makes their service **better than all other dentists**"* → A2 comparative claim. Paraphrase and trim to under 40 words.
2. **`index.html` ~line 9** — `<meta name="keywords" content="... **painless** dentist ...">` → CC1 bans "painless"; also `keywords` meta is not in the B3 required set (Google ignores it). Remove the tag entirely.
3. **`index.html` ~line 1827** — implant card: *"**Permanent** tooth replacement"* → A3 guaranteed-outcome word. Change to "Long-term tooth replacement".
4. **`index.html` ~line 2041** — review tag pill: *"Painless Treatment · 7"* → CC1 bans "painless". Rename to "Comfortable Experience".

### Go-live blockers (expected — staging site)
- noindex still in place (correct)
- `og-image.jpg` missing from repo (referenced in meta/schema but not committed)
- `PLACEHOLDER_TOKEN` in Cloudflare beacon (PA replaces post-deploy)
- MSA, final payment, domain config — pending

---

## JJ Consulting float button

Fixed bottom-left, z-index 90. Links to JJ Consulting's WhatsApp (`919157564545`) with a pre-filled "I saw a dental site built by your team" message. Intentionally uses a different number from the clinic — do not change it to the clinic's number.

---

## What NOT to do

- Do not embed YouTube/Vimeo (A6 — cookies)
- Do not add forms, inputs, chat widgets, analytics pixels (A6)
- Do not add cost estimators, quiz popups (A5/A10)
- Do not use: best, #1, guaranteed, painless, permanent, cure, specialist (unless NMC-verified)
- Do not remove the `noindex` tag until PA explicitly approves go-live and final invoice clears
- Do not change `overflow-x` back to `hidden` — it breaks `position: sticky`
