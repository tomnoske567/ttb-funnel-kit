---
name: brand-setup
description: Brand the Funnel Kit to a student's business in one command - sets their name, colours/theme, fonts, corner radius, Kit form, and checkout link by writing config.ts and global.css. Invoke when the user says "/brand-setup", "brand my kit", "set up my brand", or is starting a fresh copy of the kit.
---

# /brand-setup

Your job: turn this template into THIS student's branded site by writing real
values into the source files. The Customise Theme panel (the gear, bottom-right)
is only a live *preview* - this skill bakes the choices in permanently.

## Step 1 - Gather the brand (ask, don't assume)

Ask the student these, one short message, and wait for answers. Offer the
defaults in brackets so they can just say "yeah" to any of them.

1. **Business / brand name** (shows in the logo + page titles)
2. **One line on what you do** (used as the site description / SEO)
3. **Colour theme** - either:
   - a built-in theme: `default` (teal), `sage`, `nature`, `brutalist`,
     `linen`, `amber`, `retro`, `ocean`, **or**
   - a custom accent colour (any colour name or hex - you'll map it to a hue)
4. **Light or dark** by default? [light]
5. **Corner style** - sharp / slightly round / round / pill? [slightly round]
6. **Kit (ConvertKit) form ID** - found in their form's embed URL
   `app.kit.com/forms/XXXXXXX/...` (the `XXXXXXX`). Skip if they don't have Kit yet.
7. **Checkout / CTA link** - where the offer-page buttons send people (their
   Stripe/checkout URL). Skip if not selling yet.

If the student pastes a brand brief or says "just pick something that fits my
vibe", infer sensible answers and tell them what you chose.

## Step 2 - Apply it

### A. `src/config.ts` (the `site` object)
- `name` -> their business name
- `description` -> their one-liner
- `kitFormId` -> their form ID (leave `"YOUR_KIT_FORM_ID"` if none yet)
- `checkoutUrl` -> their checkout link (leave as-is if none yet)
- `theme` -> `"light"` or `"dark"`
- `themePreset` -> their chosen built-in theme, or `"default"` if they're using
  a custom accent colour (set the hue in step B instead)

### B. Colour - `src/styles/global.css`
**If they picked a built-in theme:** you're done - just set `themePreset` above.

**If they gave a custom accent colour:** keep `themePreset: "default"` and edit
the `@theme` block in `src/styles/global.css`:
- `--brand-hue:` set to the matching hue (OKLCH hue, 0-360). Reference points:
  `red 25 · orange 55 · amber 75 · green 146 · sage 155 · emerald 162 · teal 185
  · blue 264 · violet 295 · magenta 358`. Interpolate for in-between colours.
- `--brand-chroma:` saturation multiplier. `1` = vivid (default), `~0.3` = muted
  / earthy, `~1.2` = punchy. Pick to match their vibe.
The whole 10-step brand scale, buttons, chips, and links derive from these two
values, so that's all you change for colour.

### C. Corners - `src/styles/global.css` `@theme`
Map their answer to BOTH `--radius-control` (buttons/inputs) and `--radius-card`
(cards/images): sharp `0` · slightly round `0.5rem` · round `0.75rem` ·
very round `1rem` · pill `9999px` (pill only suits buttons - keep cards at `1rem`).

### D. Fonts (only if they asked to change them)
In `src/styles/global.css` `@theme`: `--font-display` (headings) and
`--font-sans` (body). The kit ships Inter + Outfit; other options
(Space Grotesk, Sora, Plus Jakarta Sans, Geist, Work Sans) are already installed
via `@fontsource-variable/*` - import the one they want at the top of global.css
and set the variable to e.g. `"Sora Variable", ui-sans-serif, sans-serif`.

### E. Logo
The logo is text (`{site.name}`) + an arrow mark in `src/components/Logo.astro`.
If they want a different icon or an image logo, edit that file. Otherwise the
name from config is enough.

## Step 3 - Strip the demo-only bits (ask first)

The template ships with pieces that exist for the DEMO, not a live customer
site. Offer to remove them (ask - they may want to keep some while still
experimenting with looks):

- **The Customise Theme panel** — `<ThemeCustomizer />` (the floating gear,
  bottom-right) is a *preview* tool. Real visitors should NOT see it. Once their
  brand is locked, remove the `import ThemeCustomizer` line and the
  `<ThemeCustomizer />` usage from `src/pages/index.astro` (and
  `src/pages/showcase.astro` if kept). The component file can be deleted too.
- **The `/showcase` page** (`src/pages/showcase.astro`) — an internal hero-mode
  gallery. Delete it for a real site.
- **The countdown bar** — `<CountdownBar />` on the home page. Remove it unless
  they have a genuine deadline / scarcity.
- **Placeholder identity** — the demo ships with TOM's photo
  (`public/images/about-tom.jpg`), Time to Build copy, and stock avatar images
  on the testimonial/wins cards. Make sure the About photo, every line of copy,
  and the proof are the STUDENT'S, not the demo's. (Use `/build-page` for the
  copy.)

## Step 4 - Confirm

1. Run `npm run dev` (or tell them to) and give them the local URL.
2. Summarise exactly what you changed (name, theme, hue, radius, Kit, checkout).
3. Remind them: the gear panel still previews *other* looks live, but their
   saved brand is now the default everywhere.
4. Point them to `/build-page` to start filling in their pages.

## Rules
- Only edit `config.ts` and `global.css` (+ `Logo.astro` if needed). Don't touch
  components or restructure templates - the design system keeps things on-brand.
- Never invent a Kit form ID or checkout URL. Leave the placeholder if unknown.
- Keep the existing comments in `config.ts`; just change the values.
