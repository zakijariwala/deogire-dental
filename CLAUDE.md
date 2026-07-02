# CLAUDE.md — Clinic Sites Mono-Repo: Standing Rules

This repository generates marketing websites for medical / dental / veterinary
clinics in Navi Mumbai: 6 templated specialty blocks covering 43 clinics.

**Stack:** Astro (static output), TypeScript, Astro Content Collections for
clinic data, Tailwind CSS, deployed to Cloudflare Pages. No external CMS.

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

0. 🛑 Bootstrap + governance (this file) + topology decision
1. 🛑 `/config/schema.json` + `_example.json`
2. 🛑 `/config/tokens.json` (6 block palettes)
3. 🛑 `/config/blocks.json` + derm-aesthetic reference template
4. 🛑 Remaining 5 block templates + reference renders
5. Data ingestion loop (batch by batch; never fill unprovided fields)
6. 🛑 Compliance pass, then SEO + JSON-LD
7. Deploy + QA go/no-go per clinic
