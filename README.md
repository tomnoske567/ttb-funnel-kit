# Time to Build — Funnel Kit

Branded, high-converting landing pages you build by talking to **Claude Code** —
no designer, no developer, no code. A proper design system keeps every page
clean and on-brand no matter how you edit it.

## What's inside

- **Templates** — a lead magnet (email opt-in), a long-form sales letter, and a
  full offer page with pricing + FAQ. Each one is a fill-in-the-blanks structure.
- **8 full themes** + a live **Customise Theme** panel (the gear, bottom-right of
  the demo pages) — flip colours, light/dark, fonts, and corners and watch the
  whole site re-skin.
- **Two skills** — `/brand-setup` and `/build-page` — so you build by describing
  what you want.
- **Free hosting** on Cloudflare Pages or Vercel, and email capture straight into
  your **Kit** list.

## Get started (about 10 minutes)

1. **Use this template** (green button at the top of the repo) → create your own
   copy → clone it to your computer.
2. Install dependencies:
   ```sh
   npm install
   ```
3. **Open the folder in Claude Code.**
4. Brand it to your business:
   ```
   /brand-setup
   ```
   Claude asks a few questions (name, colours, fonts, your Kit form, your
   checkout link) and writes them in for you.
5. Build your first page:
   ```
   /build-page
   ```
   Describe what you're promoting and Claude fills in the right template.
6. Preview any time:
   ```sh
   npm run dev
   ```
   Then open the URL it prints (usually `http://localhost:4321`).

## Customise without code

Open any demo page and click the **gear button (bottom-right)** to preview
themes, dark mode, fonts, and corner radius live. When you find a look you like,
run `/brand-setup` and tell Claude — it bakes those choices in permanently.

## The pages

| Page | Route | Best for |
|---|---|---|
| Lead magnet | `/` | A free download / email opt-in |
| Sales letter | `/sales-letter` | A story-driven, long-form pitch |
| Offer page | `/offer` | A full sales page with pricing + FAQ |
| Showcase | `/showcase` | Preview of the hero layouts (internal) |

Edit copy by hand in `src/pages/*.astro`, or just ask Claude.

## Connect your email (Kit)

Find your form ID in your Kit form's embed URL —
`app.kit.com/forms/XXXXXXX/...` — and set `kitFormId` in `src/config.ts`
(or let `/brand-setup` do it). Signups then flow into that form and whatever
sequence you've connected to it.

## Deploy (free)

The kit builds to static files, so it hosts anywhere:

```sh
npm run build      # outputs to dist/
```

- **Vercel** — import the repo at vercel.com, framework auto-detects as Astro,
  deploy. Every push auto-publishes.
- **Cloudflare Pages** — create a Pages project from the repo, build command
  `npm run build`, output directory `dist`.

## Commands

| Command | Does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local preview at `localhost:4321` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |

---

Built with [Astro](https://astro.build), Tailwind CSS v4, and React. Made for
**Time to Build** students.
