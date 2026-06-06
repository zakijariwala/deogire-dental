# Project Handover — Deogire Dental Demo Site

**Prepared for:** Chief of Staff
**Date:** 2026-06-06
**Owner:** Zaki Jariwala (jariwalazaki@gmail.com)
**Repo:** github.com/zakijariwala/deogire-dental
**Active branch:** `claude/jj-consulting-copy-reposition-1d2LV`

---

## What This Project Is

The demonstration site for JJ Consulting — a real, live (but unlisted) website built for Dr. Deogire Super Speciality Dental Clinic, Nerul. Shown to every prospect as proof of work: "This is what I build. This is what yours will look like."

Dr. Deogire is likely to become the first paying client once the site is presented.

**Live URL:** Hosted on Cloudflare Pages (unlisted — `noindex, nofollow` until go-live)
**Hosting:** Cloudflare Pages (auto-deploys from `master`)
**Stack:** Pure static HTML / CSS / JS — no framework, no build step

**Two numbers — do not confuse them:**

| Number | What it is | Where it appears |
|--------|-----------|-----------------|
| `919222122343` | Dr. Deogire's clinic WhatsApp | Main CTA buttons |
| `919157564545` | Zaki's JJ Consulting number | Floating "Built by JJ" badge (bottom-right) |

The floating badge is the firm's prospecting trigger — when a competing clinic owner views the demo and taps the badge, that call goes to Zaki. Do not swap these numbers.

---

## Current Status

| Item | State |
|------|-------|
| NMC compliance | ✅ Clean (fixed last session) |
| Indexed by Google | ❌ `noindex, nofollow` — intentional until go-live |
| `og-image.jpg` | ❌ Missing — WhatsApp/social previews show no image |
| Cloudflare beacon token | ❌ Placeholder — analytics not active |
| Mobile video autoplay | ⚠️ Unreliable on iOS/Android — unresolved after 5 attempts |
| GPS coordinates in schema | ❌ Placeholder `null` values in JSON-LD |
| Domain CNAME | ❌ Not configured |

---

## Pending Owner Actions

**Required before go-live (all must be done — do not go live with any outstanding):**
- [ ] Flip `noindex` → `index`: change `<meta name="robots" content="noindex, nofollow">` to `index, follow` in `index.html`
- [ ] Add `og-image.jpg`: export `og-image.svg` to 1200×630 JPG, commit to repo root
- [ ] Replace Cloudflare beacon token: search `PLACEHOLDER_TOKEN` in `index.html`, replace with real token from Cloudflare Web Analytics dashboard
- [ ] Add GPS coordinates: find `"latitude": null, "longitude": null` in JSON-LD schema, replace with clinic's actual coordinates (Google Maps → right-click → copy coordinates)
- [ ] Configure domain CNAME to point to Cloudflare Pages

**Decision required:**
- [ ] Mobile video: decide between (a) one more fix attempt (~1 hr) or (b) remove video section and show static poster image instead — **recommendation: remove and ship cleanly**

---

## Day-to-Day Operating Procedure

**Using the site in a prospect demo:**
1. Open the site on phone or laptop during the call (or share the URL)
2. Scroll through hero → services → reviews → booking CTA
3. Tap the booking/WhatsApp button — confirm it routes to Dr. Deogire's number
4. Tap the floating "Built by JJ" badge — this routes to Zaki's number (intentional)
5. If prospect asks for more examples: "Deogire is the first. That's why the price for client #2 in Nerul is what it is."

**Do not share the URL publicly before go-live** — it's `noindex` but directly accessible via URL.

**NMC compliance rule for future edits:**
- No "painless" anywhere
- No comparative superlatives ("best," "better than all…")
- No "permanent" for implants — always "long-term"
- No specific medical outcome claims without reference and disclaimer

---

## Deployment

No build step. The repository IS the site.

```
Push to master → Cloudflare Pages detects → live in ~60 seconds
```

**Local dev:**
```bash
python -m http.server 8080
# Open http://localhost:8080
# (Use HTTP server — site uses absolute paths that break over file://)
```

---

## Repo Structure

```
deogire-dental/
├── index.html           ← Full site (single page)
├── styles.css           ← All styles
├── assets/
│   ├── dr-deogire-intro.mp4        ← Hero video (mobile autoplay unreliable)
│   └── dr-deogire-intro-poster.jpg ← Poster fallback
├── og-image.svg         ← Source for social preview (og-image.jpg missing — must be exported)
└── HANDOVER.md
```

---

## Budget & Running Cost

| Service | Plan | Monthly cost | Notes |
|---------|------|-------------|-------|
| Cloudflare Pages | Free | £0 | |
| Cloudflare Web Analytics | Free | £0 | Cookieless, DPDP-compliant — activate with beacon token |

**Total: £0/month**

---

## Escalate to Owner If

- NMC-sensitive copy is proposed — flag before any edit is committed
- A competing clinic taps the "Built by JJ" badge — live sales lead for Zaki
- Dr. Deogire asks for changes after presentation — scope must be agreed before work starts
- Go-live checklist is complete — principal must sign off before flipping `noindex`
- Mobile video decision has been pending more than 1 week — force a decision

---

## Decisions Made — Do Not Revisit

- **`noindex` until principal signs off** — a live unpolished site is worse than no site for a firm selling polish.
- **Two separate phone numbers** — Dr. Deogire's number on CTAs, Zaki's on the JJ badge. Never swap.
- **No framework, no build tools** — consistent with all JJ Consulting sites. Do not introduce npm.
- **"Long-term" not "permanent" for implants** — NMC compliance. Not negotiable.
- **Keep "a confident patient heals better than an anxious one"** — patient psychology statement, not a comparative claim. Verified compliant.

---

## Quick Reference

| Task | Action |
|------|--------|
| Test locally | `python -m http.server 8080` → http://localhost:8080 |
| Deploy changes | Push to `master` → CF Pages auto-deploys in ~60s |
| Find beacon token placeholder | Search `PLACEHOLDER_TOKEN` in `index.html` |
| Find GPS placeholder | Search `"latitude": null` in `index.html` |
| Flip noindex at go-live | Change `noindex, nofollow` → `index, follow` in `index.html` |
| Check NMC rule | No "painless", no superlatives, no "permanent" for implants |
