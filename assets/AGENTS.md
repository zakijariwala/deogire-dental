# assets/ — Clinic Media

## Purpose
Stores self-hosted media assets for the clinic site. Currently: the intro video (`dr-deogire-intro.mp4`) and its poster frame (`dr-deogire-intro-poster.jpg`).

## Ownership
Dr. Deogire / JJ Consulting. Media must be clinic-owned or licensed — no stock footage of other patients or procedures.

## Local Contracts
- `dr-deogire-intro.mp4` must be H.264 MP4, short (under 90s), muted-safe, and loop-safe
- `dr-deogire-intro-poster.jpg` is the first-frame fallback shown on iOS if autoplay is blocked — it is also the source for `og-image.jpg` (center-cropped to 1200x630)
- No third-party video embeds (build-rule A6 bans YouTube/Vimeo — they set cookies)
- NMC compliance applies to any visible text or on-screen claims in the video

## Work Guidance
- Replacing the video: swap the file at the same path — no HTML changes needed
- Replacing the poster: also regenerate og-image.jpg (`python3` crop from poster, 1200x630)
- Do not gitignore these files — they are required for the site to function

## Verification
- `ls assets/` must show both `dr-deogire-intro.mp4` and `dr-deogire-intro-poster.jpg`

## Child DOX Index
None.
