# AIM — Working Drawings

The portfolio of **Mubaraq Ibrahim (AIM)**, a full-stack developer in Kano, Nigeria. The site is an editorial portfolio rather than a résumé: real project screenshots, case studies about the decisions behind them, and short field notes about the parts that do not fit in a screenshot.

The visual direction is a **dark-first editorial system** built on the Stitch reference: a near-black page, a sky accent and slate copy, with a paper-coloured light theme built from the same semantic tokens. Fraunces carries display type, Inter carries body copy, and IBM Plex Mono handles labels and metadata. The interaction layer borrows from an engineering-lab idea — a command palette, an interactive system map on every case study, and field notes — without turning the site into a dashboard.

## Stack

- Vite 7 + React 19 + TypeScript
- React Router 7 (route-level lazy loading)
- Framer Motion (reduced-motion aware)
- Phosphor Icons
- Tailwind CSS v4 via `@tailwindcss/vite`, with semantic tokens in `src/styles/global.css`
- Fraunces Variable + Inter Variable + IBM Plex Mono, self-hosted via Fontsource
- No analytics, tracking scripts, CMS, or external UI kit

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Hero, project register, featured case study, working method, field-notes teaser |
| `/work` | Full work index, including source-only and additional builds |
| `/work/:slug` | ThesisTrack, Treevia, MemoDev and Shina Store case studies |
| `/notes` | Four engineering field notes, deep-linkable by anchor |
| `/about` | Background, working principles, tools |
| `/contact` | Direct email, copy-email fallback, mail-draft form |
| `*` | 404 with routes back into the site |

Every page has its own title and description via `usePageMeta`. Internal routes are lazily imported in `src/main.tsx`.

## Features

### Command palette

`Ctrl/⌘ + K` or the header search button opens a searchable index of pages, case studies, notes and external links. It supports:

- text filtering across labels, groups and keywords
- arrow-key navigation, Home/End, Enter to open, Escape to close
- `aria-activedescendant`, `role="listbox"`, grouped results
- focus restoration to the header trigger
- body scroll lock while open
- an explicit empty state

The palette is loaded on demand and prefetched when the trigger is hovered or focused, so its project and note data stays out of the shared app shell. In local checks the first open took 7–36 ms once the trigger had focus.

### Interactive system map

Every case study includes a four-layer architecture map. Selecting a layer updates a live detail panel (`aria-live="polite"`); the same decisions also exist as a static list for readability and printing.

### Field notes

Four notes about domain modelling, server-owned totals, session expiry and designing quiet states. Each note links back to the relevant case study and can be deep-linked from the home page, footer, palette or `/notes#slug`.

### Contact

The form never pretends to send anything. It validates locally, then opens a prefilled `mailto:` draft addressed to the real email address. If the draft does not open, the success state offers a copy-email fallback with its own failure message.

## Accessibility

Implemented and checked:

- semantic landmarks, one `h1` per route, logical heading order
- skip link that becomes visible on focus and moves focus to `#main` (`tabIndex={-1}`)
- visible `:focus-visible` treatment using a dedicated high-contrast focus colour
- keyboard-operable mobile menu, command palette and system map
- Escape restores menu-button focus; the palette restores search-trigger focus
- live-region announcements for route changes, validation errors, copy-email status and system-map details
- inline form errors linked with `aria-describedby`, `aria-invalid`, and focus moved to the first invalid field
- `prefers-reduced-motion` honoured in CSS and through Framer Motion
- forced-colors rules for buttons, screenshot frames and form surfaces
- colour pair audit at the token level: ink 15.43:1, ink-2 7.47:1, muted 5.34:1, accent-strong 7.35:1, footer text 7.06:1+, danger 5.69:1, focus 5.89:1 on paper
- no horizontal overflow at 320, 760 or 1440 CSS px across all routes

## Performance notes

- Route chunks are split. The shared app shell is 501 kB minified / **160 kB gzip**, just over Vite's 500 kB warning threshold; CSS is 59 kB / 11.6 kB gzip.
- Case studies and notes are separate data chunks (`projects` ≈ 6.3 kB gzip, `notes` ≈ 2.4 kB gzip), loaded only by the routes that display them and by the on-demand palette. Identity and contact details live in `src/data/site.ts` so the header and footer do not pull in project data.
- The Fraunces italic face is preloaded from the built asset manifest. Without it, a throttled phone measured **CLS 0.134** because the hero heading reflowed when the italic swapped in; with it, CLS is **0**. The cost is roughly 0.5 s of LCP on a simulated 1.6 Mbps connection, because the font competes with the app bundle.
- The portrait is preloaded only at `min-width: 761px`; on phones it sits below the fold.
- Project-register thumbnails are dedicated 480 × 245 WebP files (about 10–12 kB each) rather than the full case-study screenshots (70–90 kB each).
- All screenshots and the portrait are WebP with intrinsic dimensions.
- Lab measurements from a production preview build, Chrome headless, 4 runs per profile across two passes:

| Profile | FCP | LCP | CLS |
| --- | --- | --- | --- |
| Desktop, localhost | 0.52–0.74 s | 0.72–0.93 s | 0 |
| Mobile, localhost | 0.43–0.55 s | 0.48–0.72 s | 0 |
| Desktop, simulated Slow 4G | 3.49–3.67 s | 3.58–3.76 s | 0 |
| Mobile, simulated Slow 4G | 3.14–3.33 s | 3.22–3.39 s | 0 |

These are lab numbers on one machine, not field data and not a Lighthouse score. No Lighthouse or axe run is claimed.

## Content and honesty

- Project screenshots are real; demo/seeded data is labelled in captions and status notes.
- ThesisTrack is source-only. Its note says there is no public demo.
- Treevia is source-only. Its note says no public demo is deployed and that the grading and analytics modules are scaffolds; the screenshots show the implemented assessment and attempt flows, and preview analytics are not presented as real results.
- MemoDev's live URL opens at a sign-in screen. Its note says the screenshots use an administrator-provisioned demo account, with no public sign-up.
- Shina Store uses seeded products and orders; checkout is a demo flow and takes no real payment.
- AIM Blog is source-only; its previous live URL no longer resolves.
- No invented metrics, testimonials, certifications or client logos.
- External links point to public repositories and live sites; verified on 18 November 2026. LinkedIn returns HTTP 999 to command-line clients because of its bot protection, but the profile URL is the real one.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build
npm run preview  # serve dist at http://localhost:4173
```

No environment variables are required.

## Project structure

```text
src/
  components/     Layout, header/footer, palette, system map, forms, frames
  data/           site.ts (identity + links), projects.ts (case studies), notes.ts
  lib/            usePageMeta
  pages/          Home, Work, CaseStudy, Notes, About, Contact, NotFound
  styles/         global.css (tokens, layout, components, breakpoints)
public/
  images/         WebP screenshots, thumbnails and portrait
  docs/           AIM CV (PDF)
vite.config.ts    React plugin + build-time italic-font preload
```

## QA performed

- Scripted browser pass over ten routes at 320, 760 and 1440 (30 route/width combinations): no horizontal overflow, no failed images, an `h1` on every route.
- Keyboard pass: skip link, mobile menu, palette (open by button and shortcut, focus trap, filtering, empty state, arrows, Home/End, Enter, Escape, focus return, scroll lock), system map (Enter changes pressed state and detail panel).
- Palette lazy-loading pass: no palette chunk on first paint of `/about` or `/contact`; the chunk is prefetched on trigger focus and the first open renders in 7–36 ms locally.
- Contact pass at 1440 and 320: four inline errors, focus to first invalid field, success state, success heading focus, mailto draft, copy-email fallback.
- Link pass: all internal links return 200; `/notes#slug` anchors land below the sticky header and focus the note heading; all external URLs are the real destinations.
- Reduced-motion and forced-colors emulation, plus a 640 px width pass as an approximation of a 200% zoom layout.
- Titles and descriptions checked per route; no console errors or uncaught exceptions across the nine routes or the palette interaction.

## Known limitations

- Case-study and note copy ships as shared data chunks rather than inside the entry bundle. The palette loads the project and note chunks on first use (or on hover/focus of the search trigger), about 9 kB gzip in total, so the dialog appears as soon as those chunks resolve; there is no fake loading state.
- Fraunces ships with all variable axes because the design uses `opsz`, `SOFT` and `WONK`. This is the main font weight cost.
- The preload fixes CLS at the expense of some LCP on very slow connections; the trade-off is documented above rather than hidden.
- There is no automated test suite or CI configuration in this repository. The checks above were run manually and through local CDP scripts.
- QA was run in Chromium (headless, via CDP) at the listed widths. Safari, Firefox and real mobile hardware were not tested.
- Metadata is set per route at runtime. Crawlers that do not execute JavaScript see the home-page title and description, and there are no per-route social preview images or SSR/prerendering.
- The contact form depends on the visitor's mail client; the copy-email fallback is the escape hatch.
- The site is a static SPA. It has no server-side rendering, database-backed content, RSS feed or newsletter.
# AIM-Portfolio-2.0
# AIM-Portfolio-2.0
