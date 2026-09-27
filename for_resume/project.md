---
schema: 2
slug: dental-clinic-staging-site
title: Dental clinic website (JJ Consulting)
tagline: Compliance-first static site for a dental practice
publish: true
reason: ""
status: paused
kind: client-work
size: small
started: 2026-05
ended: null
role: "Owner — scoped, set the build and compliance rules, built"
summary: Built an 8-page static site for a dental clinic under written medical-advertising and privacy rules, with no data collection and every enquiry routed to WhatsApp.
problem: The clinic needed a fast site that drives enquiries without breaking Indian medical-advertising rules on claims, pricing and credentials, or collecting patient data.
stack: [HTML, CSS, JavaScript, JSON-LD, Cloudflare Pages]
categories: [web, product]
links: { live: "", docs: "", demo: "" }
metrics:
  - value: "8"
    label: "static pages (home, doctor profile, 5 service pages, privacy policy)"
    evidence: "*.html at repo root"
  - value: "7"
    label: "pages carrying structured JSON-LD data"
    evidence: "grep application/ld+json *.html"
  - value: "23"
    label: "numbered compliance, technical and content rules the site is checked against"
    evidence: "build-rules.md (A1–A10, B1–B7, C1–C6)"
highlights:
  recruiter:
    - Turned regulatory limits into a written rule set covering claims, pricing, credentials and privacy, and audited the build against it with a pass and open-item list.
    - Removed features that broke the rules, such as a cost estimator and quiz, rather than ship risk to a client.
    - Grew a single-page pitch site into a multi-page build in 2 planned phases, adding service and doctor pages aimed at local search.
  engineer:
    - Pure static HTML, CSS and JavaScript on Cloudflare Pages, with no build step, backend, forms or cookies; the staging build carries a noindex tag until sign-off.
    - Every call to action is a WhatsApp link with a service-specific prefilled message, so enquiries arrive with context and no personal data is stored.
    - Phase B extracted shared CSS into one stylesheet and added 5 service pages plus a doctor profile, each with its own JSON-LD.
    - Scroll-driven intro video uses a sticky container; overflow-x clip replaced hidden because hidden silently broke sticky positioning.
    - Mobile video autoplay took 5 iterations (muted properties, explicit load, canplay and touch fallbacks), and the open issue and fallback plan are documented.
  story: ""
skills: [Regulatory compliance, Requirements into rules, Client delivery, Privacy by design, Local SEO, Phased delivery]
ai_assisted: true
media: []
todo_owner:
  - "Did the clinic become a paying client, and did the site go live? Status is set to paused because the repo shows a staging build with go-live pending."
  - "Are you happy to name the clinic publicly? The entry withholds its name."
  - "Has mobile video autoplay been fixed, and have the 4 open copy-compliance items in context.md been resolved?"
  - "Why did you build this? A 1–3 sentence first-person story would fill highlights.story."
generated: { at: 2026-09-27, commit: 9685193 }
---

## Overview

A staging website for a specialist dental clinic in Navi Mumbai, built under my JJ Consulting practice. It is a static multi-page site that presents the clinic, its doctor and its main treatments, and routes every enquiry to WhatsApp. The distinctive part is the rule set behind it: medical-advertising and privacy constraints written down first, then applied to every page.

## The problem

Clinic websites in India must follow medical-advertising rules: no comparative claims, no guaranteed outcomes, no promotional pricing and credentials only where they can be verified. The clinic also needed fast pages on mobile and a simple way for patients to get in touch, without forms, cookies or stored patient data.

## What I built

- A build rule set covering mandatory compliance (noindex on staging, banned claims and wording, no data collection, no pop-ups), technical standards (performance, font loading, meta tags, structured data, analytics) and content rules for reviews, services, doctor details, statistics, address and hours.
- A content generation guide that turns clinic data into compliant copy section by section, with rules for handling missing fields.
- A home page with a scroll-driven intro video, a trust bar, a sterilisation timeline, service cards, a reviews carousel, location and a final call to action.
- 5 treatment pages, a doctor profile page and a privacy policy, sharing one stylesheet.
- WhatsApp calls to action with prefilled, service-specific messages, and a sticky button that hides once the booking section is on screen.

## Architecture

- Static HTML pages with a shared CSS file and small inline scripts; no framework or build tools.
- Hosting on Cloudflare Pages, deployed on every push to the main branch.
- Structured data per page for the clinic, doctor and services.
- Privacy-friendly analytics through a cookieless beacon; no third-party embeds, since video platforms would set cookies.

## Key decisions

- **Rules before copy.** Writing the compliance rules first meant each change could be checked against a list instead of judged ad hoc. An audit records which rules pass and which copy items remain open.
- **No data collection at all.** Forms and chat widgets were ruled out. Enquiries go to WhatsApp, which removes the need to store or secure patient details.
- **Remove features that break the rules.** An early version had a cost estimator and a lead quiz. Both conflicted with the rules on pricing and pop-ups, and the rules now forbid them.
- **Self-hosted video.** Embedding from a video platform would add cookies, so the intro video is served from the site with a poster image.
- **Clip, not hidden.** Setting horizontal overflow to hidden turned the page body into a scroll container and broke the sticky intro; clip prevents sideways scroll without that side effect.

## Results

- 8 pages built and deployed to a noindex staging URL.
- The audit shows the core compliance, metadata, structured data and analytics rules passing.
- Go-live is pending: 4 copy items still breach the wording rules, a social sharing image is missing, the analytics token is a placeholder, and client paperwork and domain setup are outstanding.

## What's next

- Fix the 4 open copy-compliance items.
- Resolve mobile video autoplay, or show a lighter animation on touch devices as planned.
- Add the sharing image and analytics token, then remove noindex once the client approves go-live.
