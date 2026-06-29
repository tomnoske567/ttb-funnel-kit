---
name: build-page
description: Build a landing page for the student by picking the right Funnel Kit template and filling in their copy. Invoke when the user says "/build-page", "build me a page", "make a landing page", "create an opt-in / sales page / offer page", or describes a page they want.
---

# /build-page

Your job: turn the student's offer into a finished page by choosing the right
template and filling in real copy. You write the CONTENT; the kit's components
and design system keep it looking good - never restructure them.

## Step 1 - Understand the offer

Ask (briefly) or infer from what they said:
- What are they promoting? (a free lead magnet, a paid course/program, a
  membership, a workshop?)
- Who is it for, and what's the main outcome/promise?
- The call to action (download, buy, book) and where it points.
- Do they have proof (results, testimonials, numbers)? Optional.

## Step 2 - Pick the template

| They want… | Use | Route file |
|---|---|---|
| A free lead magnet / email opt-in (short, form-first) | **Lead magnet** | `src/pages/lead-magnet.astro` |
| A long-form, story-driven sales pitch | **Sales letter** | `src/pages/sales-letter.astro` |
| A full offer page (hero, problem, proof, pricing, FAQ) | **Offer page** | `src/pages/index.astro` (the home page `/`) |

Ask whether this should **replace** one of those starter pages or be a **new
route**. For a new route, copy the chosen template to `src/pages/<slug>.astro`
(the filename becomes the URL, e.g. `free-guide.astro` -> `/free-guide`).

## Step 3 - Fill in the copy

Every template keeps its content in clearly-labelled `const` blocks at the TOP
of the file (e.g. `heroHeadline`, `heroBullets`, `problems`, `steps`,
`deliverables`, `bonuses`, `faqs`, `about`, the checkout/membership object).
**Edit those values only** - leave the markup and components below them alone.

- Write in the student's voice, specific to their offer. No lorem ipsum, no
  "Elevate/Seamless/Unleash" filler.
- Keep array lengths roughly the same (e.g. 3 steps, 4-6 deliverables) so the
  layout stays balanced. Drop an item rather than leave it blank.
- Real numbers/proof if they have them; otherwise write honest placeholder proof
  and TELL them to swap it for real wins.
- Headlines: punchy and concrete. Subheads: one clear sentence.

### Offer-page specifics
- The hero supports `mode="split"` (copy + image), `mode="vsl"` (centred video),
  or `mode="text"` (copy only). Pick what fits; for `vsl` set `videoUrl`.
- The checkout card takes either a one-time `options` array (with split-pay) or a
  `membership` object (monthly/annual). Use whichever matches their pricing.
- Images are placeholders - replace them all: stock avatars on the
  testimonial/wins cards, `picsum.photos` mockups, and the About photo
  (`public/images/about-tom.jpg` is the DEMO founder photo - swap for the
  student's). Real images go in `public/images/`, referenced as
  `/images/your-file.jpg`. AdobeRGB photos must be converted to sRGB before
  resizing or the colour strips out (see CLAUDE.md).

### Forms
The opt-in forms already post to the Kit form set in `config.ts`. If
`kitFormId` is still `"YOUR_KIT_FORM_ID"`, remind them to run `/brand-setup` or
set it so signups actually land in Kit.

## Step 4 - Show them

1. Run `npm run dev` and give them the route (e.g. `http://localhost:4321/`).
2. Summarise the sections you filled and flag anything that still needs their
   input (real proof, images, checkout link).
3. Offer next steps: tweak copy, build another page, or deploy.

## Rules
- Only edit page files in `src/pages/` (and copy `public/images/` assets if
  given). Don't change components, tokens, or the design system.
- Keep all the structural classes and components exactly as they are.
- One page per request unless they ask for several.
