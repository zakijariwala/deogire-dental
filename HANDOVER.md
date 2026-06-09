# HANDOVER — deogire-dental
### Repo role: Demo client site — shown to every prospect as proof of work
### For: Chief of Staff · Prepared: 2026-06-06
### Branch: `claude/jj-consulting-copy-reposition-1d2LV`

---

## What This Repo Is

The **demonstration site** for JJ Consulting — a live (but unlisted) website built for Dr. Deogire Super Speciality Dental Clinic, Nerul. This is the proof-of-work asset shown to every prospect: "This is what I build. This is what yours will look like."

It is **not a template** — it is a real client site. Dr. Deogire is likely to become the first paying client once the site goes live and is presented.

**Critical:** This site is currently `noindex, nofollow`. It is invisible to Google. It will stay that way until the principal decides it's ready for go-live (see checklist below).

---

## Current Status

| Item | State |
|---|---|
| NMC compliance | ✅ Clean (fixed this session, commit `5c8beb0`) |
| Indexed by Google | ❌ `noindex, nofollow` — intentional until go-live |
| `og-image.jpg` | ✅ Added — 1200×630 crop of the intro poster |
| Cloudflare beacon token | ❌ Placeholder — analytics not active |
| Mobile video | ✅ Fix applied (clip-path + no load() reset + poster fallback) — verify on a real iPhone before demoing |
| GPS coordinates in schema | ⚠️ Nerul-locality level added — refine to exact shopfront coords at go-live |
| Domain CNAME | ❌ Not configured |

---

## NMC Compliance — What Was Fixed

India's National Medical Commission prohibits certain advertising claims in medical practice marketing. Four violations were present and have been fixed:

| What was there | What it is now |
|---|---|
| `<meta name="keywords">` containing "painless dentist" | Tag removed entirely |
| "Permanent tooth replacement" | "Long-term tooth replacement" |
| Review text: "painless" + "better than all other dentists" | Trimmed — both phrases removed |
| Tag label: "Painless Treatment" | "Comfortable Experience" |

**Still present (not a violation):** "a confident patient heals better than an anxious one" — this is a patient psychology statement, not a comparative advertising claim. Verified and left in place.

**Rule of thumb for future edits:**
- No "painless" anywhere
- No comparative superlatives ("best," "better than all…")
- No "permanent" for implants — always "long-term"
- No claims about specific medical outcomes unless they're referenced and disclaimed

---

## Phone Numbers — There Are Two, Don't Confuse Them

| Number | What it is | Where it appears |
|---|---|---|
| `919222122343` | Dr. Deogire's clinic WhatsApp | Main CTA buttons on the site |
| `919157564545` | Zaki's JJ Consulting number | The floating "Built by JJ" badge at bottom-right |

The floating badge is the firm's **prospecting trigger** — when a competing clinic owner views the demo and taps the badge, that call/message goes to Zaki, not the clinic. Do not swap these numbers.

---

## Go-Live Checklist (T3 — Principal signs off before any of this)

These are the steps to take the site from "private demo" to "live client site":

- [ ] **Flip `noindex` → `index`** — find and change `<meta name="robots" content="noindex, nofollow">` to `index, follow` in `index.html`
- [ ] **`og-image.jpg`** — add a 1200×630 JPG at the repo root; currently missing, WhatsApp previews are broken
- [ ] **Cloudflare beacon token** — search for `PLACEHOLDER_TOKEN` in `index.html`; replace with the real token from the Cloudflare Web Analytics dashboard (cookieless, DPDP-compliant)
- [ ] **GPS coordinates** — find `"latitude": null, "longitude": null` in the JSON-LD schema block; replace with Dr. Deogire's actual clinic GPS coordinates (from Google Maps → right-click → copy coordinates)
- [ ] **Domain CNAME** — configure the clinic's domain to point to Cloudflare Pages
- [ ] **Mobile video decision** — decide: one more fix attempt, or remove the video section entirely (see below)

**Do not go live without completing all of the above.** A site that's `noindex` is safe to share in demos; a live site with placeholder tokens and missing schema data is a liability.

---

## Mobile Video — The Open Issue (T2)

There is a hero/intro video section featuring Dr. Deogire (`assets/dr-deogire-intro.mp4` + `assets/dr-deogire-intro-poster.jpg`). The video **does not reliably autoplay on mobile** — it silently fails on iOS Safari and some Android Chrome configurations.

Five commits have already attempted fixes. The issue appears to be iOS's autoplay restriction (video must be muted + `playsinline` + triggered by user gesture, or it won't play).

**Options for the principal:**
1. **One more attempt** — add `muted playsinline autoplay` attributes explicitly + a JS fallback that shows the poster on failure. Roughly 1 hour of work.
2. **Remove the video section** — the poster image already exists as a static fallback; show that instead. The site is not materially weaker without the video. Recommended if the goal is to ship cleanly.

The CoS should surface this decision clearly and not let it block go-live indefinitely.

---

## How to Use This Site in a Prospect Demo

**The flow:**
1. Open the site on your phone or laptop during the call (or share the URL)
2. Scroll through — show the hero, the services section, the review trust block, the booking CTA
3. Point out: "This is a real clinic site. Yours would be built to the same standard, with your branding and your content."
4. Tap the booking/WhatsApp button — confirm it routes to Dr. Deogire's number (not yours)
5. Tap the floating "Built by JJ" badge at bottom-right — that's Zaki's number, which is intentional
6. If prospect asks "can I see more examples?" — the honest answer is: "Deogire is the first. That's why the price for being client #2 in Nerul is what it is."

**What not to demo before go-live:**
- Don't share the URL publicly — it's `noindex` but the URL can still be accessed directly
- Don't present it as "live and indexed" — it isn't yet
- Don't show it if the mobile video bug is visually broken — fix or remove first

---

## Local Dev

No build step. Open `index.html` directly or serve with:
```bash
python -m http.server 8080
# View at http://localhost:8080/
```

The site uses absolute paths for some assets — if things look broken over `file://`, use the local server.

---

## What a CoS Monitors Here

- **NMC compliance on any future copy edits** — flag anything that looks like a medical claim, a superlative, or the word "painless" before it goes near a file
- **Go-live readiness** — maintain the checklist above; surface blockers weekly until resolved
- **The mobile video decision** — don't let it rot as an open loop; bring it to the principal with a clear recommendation
- **`noindex` status** — the single most important deploy switch; do not forget it at go-live
