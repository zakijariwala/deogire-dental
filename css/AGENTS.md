# css/ — Clinic Stylesheet

## Purpose
Contains `styles.css`, the single extracted stylesheet for the clinic site. All visual rules, design tokens, and component styles live here.

## Ownership
JJ Consulting (engineer). Changes must not break the live site's mobile layout or the intro video autoplay behaviour.

## Local Contracts
- `.intro-sticky` MUST use `clip-path: inset(0)` — NOT `overflow: hidden`. The overflow property triggers a separate iOS compositing layer that blocks muted autoplay. Do not revert.
- Design tokens (colours, fonts, spacing) are defined as CSS custom properties at `:root` — edit there, not inline
- `will-change` is intentionally absent from `.intro-video` — iOS suspends video in promoted layers inside sticky ancestors. Do not add it.

## Work Guidance
- Test mobile rendering (especially the services card grid and intro video) after any structural CSS change
- The `.service-card--feature` at <=768px must have `grid-area: auto` — removing this causes the featured card to escape the grid

## Verification
- `grep "overflow: hidden" css/styles.css` must return zero matches inside the `.intro-sticky` block
- `grep "clip-path: inset" css/styles.css` must return a match

## Child DOX Index
None.
