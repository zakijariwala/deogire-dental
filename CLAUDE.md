# CLAUDE.md — Clinic Demo Pipeline: Standing Rules

This repository generates **demo / prospecting websites** for medical / dental
/ veterinary clinics in Navi Mumbai: 6 templated specialty blocks covering 43
prospects. It is a sales tool. **Nothing in this repo ever serves production
traffic** — when a prospect signs, their site is rebuilt and deployed from a
separate dedicated repository (out of scope here).

**Stack:** Astro (static output), TypeScript, Astro Content Collections for
clinic data, Tailwind CSS, deployed to Cloudflare Pages. No external CMS.

## Topology (decided 2026-07-02)

One Cloudflare Pages project, deployed as a single build containing all demos:

```
<project>.pages.dev
├── /hq-<SECRET>/                    operator-only index (unguessable path):
│   └── /hq-<SECRET>/<block>/        lists all 6 blocks → per-block pages
│                                    listing every prospect demo in that block
└── /demo/<block>/<slug>-<token>/    shareable prospect demo (per-prospect
                                     unguessable token)
```

Access control is private-by-link (unguessable paths), enforced by rule 7.
The Phase 1 schema must therefore carry demo-routing fields: `demo_token`
(random, unguessable, never reused across prospects) and `prospect_status`.

These rules govern **every** prompt, phase, and edit in this repo. They are not
suggestions. When a rule conflicts with getting a page built faster, the rule
wins.

---

## 1. No fabrication

Never invent or infer clinic-specific data — names, doctors, qualifications,
registration numbers, services, addresses, phone numbers, hours, fees, ratings,
review counts, or review text.

Every clinic field is exactly one of:

| provenance | meaning |
|---|---|
| `web` | sourced from a live, credible public source (URL recorded) |
| `client` | supplied directly by the clinic via the intake form |
| `missing` | not yet sourced |

If a field is `missing` and required to build, append a row to
`/data/DATA-NEEDED.md` and render a **visible placeholder** (e.g. a dashed box
reading `DATA NEEDED: council_reg_no`) — never a plausible-looking guess.
A wrong-but-plausible value is strictly worse than an obvious gap.

## 2. Ratings, review counts, and review text are volatile and legally sensitive

Never hardcode them from memory or training data. They come **only** from a
live pull or from the client, always recorded as a dated snapshot. Every review
used on any page must be logged in `/intake/reviews-compliance-log.md` with
source URL, date pulled, and compliance-check status.

## 3. Compliance gate

Before rendering any **testimonial**, **before/after image**, or
**superiority / "best" / "No.1" claim**, check `/config/compliance.json` for
the clinic's block. If the corresponding flag is not explicitly `true`, do not
render it. `null` (undetermined) and `false` both mean OFF. Compliance values
are set by the human operator after verifying current NMC / DCI / state
veterinary council guidance — never filled in from model memory (Phase 6).

## 4. The data model is fixed by `/config/schema.json`

Do not add, rename, or restructure clinic fields outside the schema without
asking first. Templates read only schema fields.

## 5. One reference clinic before scaling

No block template is mass-applied until its reference clinic is built,
previewed, and explicitly approved by the operator.

## 6. Ask, don't assume, on architecture

Where a structural decision has real trade-offs (routing, build topology,
data shape, dependency choices), stop and present the options rather than
picking silently.

## 7. Demo privacy invariants

This deployment is private-by-link. Every build must preserve all of these:

- **No indexing, ever.** `robots.txt` disallows everything; a `_headers` file
  sets `X-Robots-Tag: noindex, nofollow` on every route. No `sitemap.xml` is
  ever emitted in the demo deployment (Phase 6b builds SEO artifacts to
  *demonstrate and validate* them, not to expose them).
- **No upward or sideways links.** A prospect demo page never links to the HQ
  index, any block page, or any other prospect's demo. The `hq-<SECRET>` path
  must not appear anywhere in demo-page output.
- **No referrer leakage.** `Referrer-Policy: no-referrer` on every route, so
  navigating from HQ to a demo never exposes the secret path.
- **Unguessable URLs.** Every demo path carries its per-prospect `demo_token`;
  `/demo/` and `/demo/<block>/` serve no listing (404). Tokens are random,
  never sequential, never reused, and never published anywhere public.
- **Every demo page is labelled.** Each prospect demo carries a discreet but
  always-visible "Preview — not a live website" notice, so a circulating link
  can never be mistaken for the clinic's real published site. The notice is
  removed only in the separate go-live repository, never here.
- **Know the limit.** This is link-based privacy, not authentication — anyone
  holding a demo link sees that demo (and only that demo). If real auth is
  ever needed on HQ, the upgrade is a custom domain + Cloudflare Access on
  `/hq*`; do not attempt to fake auth in static output.

---

## Repo map

```
/config              schema.json, tokens.json, compliance.json, blocks.json
/data/clinics        one <slug>.json per clinic
/data/DATA-NEEDED.md auto-regenerated gap log (grouped by clinic)
/src/layouts         shared Astro layouts
/src/components      shared, props-driven section components
/src/templates       one block-<specialty>.astro per block
/src/pages           route entry points
/intake              intake-form.md, reviews-compliance-log.md
```

Note: the repo root also contains the original hand-built static site for
Dr. Deogire's dental clinic (`*.html`, `/css`, `/assets`, `*-rules.md`,
`context.md`). It predates this pipeline. Do not modify or delete it without
operator instruction.

## Phase gates (🛑 = stop for operator approval)

0. 🛑 Bootstrap + governance (this file) + topology decision — **done 2026-07-02**
1. 🛑 `/config/schema.json` + `_example.json` (must include `demo_token`,
   `prospect_status`)
2. 🛑 `/config/tokens.json` (6 block palettes)
3. 🛑 `/config/blocks.json` + derm-aesthetic reference template
4. 🛑 Remaining 5 block templates + reference renders
5. Data ingestion loop (batch by batch; never fill unprovided fields)
6. 🛑 Compliance pass, then SEO + JSON-LD (built and validated, but kept
   non-indexable per rule 7 — no public sitemap in the demo deployment)
7. Demo deploy + QA go/no-go per prospect (single Pages project). Go-live is
   **not** part of this repo: a signed clinic's production site ships from a
   separate dedicated repository.
