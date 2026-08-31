# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**Masar Center** (`masarvisa`) — a **Nuxt 4 SSR/SSG** marketing site for a German visa & study consultancy (**Masar UG**). The live domain is **masar-center.de**. Content is a mix of hard-coded static pages and CMS-driven blog posts via Storyblok. The site is **trilingual** (en/de/ar) and deployed to **Netlify**. A separate external client portal is linked from the homepage at `portal.masar-center.de` (see `app/components/section/Portal.vue`) — it is not part of this repo.

## Commands

```bash
npm run dev          # dev server on https://localhost:3000 (HTTPS via mkcert, --public exposes on LAN)
npm run build        # production build (nitro preset: netlify)
npm run generate     # static generation
npm run preview      # preview a production build locally
npm run lint         # eslint .
npm run lint:fix     # eslint . --fix
```

There is **no test suite/runner** and **no GitHub Actions CI** configured in this repo. Code quality scanning is handled entirely by SonarQube Cloud's **Automatic Analysis** (configured in the SonarQube Cloud project settings, not by any workflow file) on push/PR to `main`. Do not add a CI-based Sonar scan workflow — it conflicts with and fails alongside Automatic Analysis for the same project.

Node version is pinned via `.nvmrc` (**22.21.1**).

## Architecture

### Framework & Rendering

- **Nuxt 4** with the `app/` source directory convention (`app/pages`, `app/layouts`, `app/components`, `app/composables`).
- `ssr: true`, prerendered for production (`nitro.prerender`, `crawlLinks: true`) with an explicit route list per locale in `nuxt.config.ts`.
- Deploy target is **Netlify** (`nitro.preset: "netlify"`, see `netlify.toml`).
- Dev server uses **HTTPS** via `vite-plugin-mkcert`.
- Page transitions: 0.4s fade + blur (`app.vue` `<style>` block, `pageTransition: { name: "page", mode: "out-in" }` in nuxt config).

### i18n

- **`@nuxtjs/i18n`**: three locales — `en` (default, no prefix), `de`, `ar` (rtl).
- Strategy: `prefix_except_default`.
- Locale strings live in `i18n/locales/{en,de,ar}.json`, kept as parallel flat/nested key structures across all three files — **add a key to all three when adding UI copy**.
- `app/layouts/default.vue` sets `<html lang>`/`dir` from `useLocaleHead()`.
- `main.css` swaps the font stack (`--font-latin` → Montserrat vs `--font-arabic` → Vazirmatn) based on `html[dir="rtl"]`.
- Browser language detection is enabled with cookie `i18n_redirected`, redirect on root only.

### Styling

- **Tailwind CSS v4** via `@tailwindcss/vite` (no `tailwind.config.js` — theme is declared in `app/assets/css/main.css` with `@theme`).
- Theme tokens defined in `@theme`:
  - `--color-primary: #0041b6` (blue)
  - `--color-secondary: #ff551c` (orange)
  - `--color-dark: #010617` (near-black, used as `dark:bg-dark`)
  - `--color-hero: #349ad4` (light blue)
  - `--font-latin` / `--font-arabic` font stacks
- Dark mode via `@nuxtjs/color-mode` using a `.dark` class (`classSuffix: ""`), preference stored in cookie (`storageKey: "theme"`). Custom variant: `@custom-variant dark (&:where(.dark, .dark *))`.
- Fonts loaded via `@nuxt/fonts` — **Montserrat** (400, 700, 800) and **Vazirmatn** (400, 700, 800) from Google Fonts.
- Hidden scrollbar globally. `scroll-padding-top: 80px` for fixed header offset.

### CMS (Storyblok)

- **`@storyblok/nuxt`** is configured with `accessToken` from env, region `eu`.
- Blog routes use **ISR** (1 hour TTL): `/blog`, `/de/blog`, `/ar/blog` and their children.
- Ausbildung routes use **ISR** (1 hour TTL) too: `/ausbildung`, `/de/ausbildung`, `/ar/ausbildung` and their children (see **Ausbildung offers** below).
- Storyblok components live in `app/components/storyblok/`:
  - `Featured.vue` — featured blog post display
  - `PostCard.vue` — blog post card
  - `SearchPost.vue` — blog search functionality
  - `State.vue` — state management for Storyblok
  - `post.vue` — individual blog post renderer
- Plugin: `app/plugins/storyBlok.ts` — Storyblok initialization.
- Composable: `app/composables/useStoryblokLocale.ts` — locale mapping for Storyblok API.

### Team data

- `app/composables/useTeamData.ts` is the **single source of truth** for team members (no CMS/API).
- 13 team members currently defined, each with: `slug`, `name`, `role`, `bio`, `photo`, and optional social links (`facebook`, `instagram`, `linkedin`, `mail`).
- Bios are **generated per-locale** via a `setBio(name, locale, feminine)` template function (handles Arabic grammatical gender) rather than stored per-member.
- `app/pages/teams/[person].vue` looks members up by slug and 404s (`createError({ statusCode: 404 })`) when not found.
- Team photos stored in `public/team/` as `.webp` files.

### Ausbildung offers

Lead-generation listing of vocational-training (Ausbildung) openings in Germany. Deliberately **teaser-only** — no employer name, no exact address, no direct contact on the offer. Readers contact Masar (WhatsApp `https://wa.me/491771873142`) to learn where the offer is and how to apply.

- **Source: Storyblok**, content type `ausbildung_offer`, stories under the `ausbildung/` folder — mirrors the blog setup.
- **Reference number** (`content.reference`): shown on the card and detail page, and injected into the WhatsApp deep-link (`?text=... [MC-A-2026-014]: <title> (<region>)`) so an inbound client message self-identifies which offer. Masar keeps the full sensitive details (employer, address, contact, contract terms, who-can-apply specifics) in a **private master record keyed by this reference** — a spreadsheet (one row per reference) or docs folder, outside this repo. The public site never holds those details.
- **Storyblok languages:** the space has only `en` + `ar` (free plan). `de` visitors get `en` content, exactly like the blog — `useStoryblokLocale()` maps `ar → ar`, everything else `→ en`.
- Routes use **ISR** (1 hour TTL): `/ausbildung`, `/de/ausbildung`, `/ar/ausbildung` and their children (`nitro.routeRules`). ISR (not prerender) is required so the time-based archive/expiry logic re-evaluates without a rebuild.
- Pages:
  - `app/pages/ausbildung/index.vue` — lists offers where `content.status !== "archived"`, newest first. No pagination (low volume).
  - `app/pages/ausbildung/[slug].vue` — offer detail + archive lifecycle (below).
- `app/components/ausbildung/OfferCard.vue` — listing card. Detail fields are rendered directly in the page (no blok component); `requirements`/`benefits` are Storyblok richtext rendered with `<StoryblokRichText>`.
- `app/composables/useAusbildungSectors.ts` — canonical `sector` slug list + `label()` (slug → i18n) + `options` (for a future filter). Single source of truth; the Storyblok `sector` field's option values must match these slugs.
- i18n keys live under the `ausbildung.*` namespace in all three locale files.
- Nav link added in `app/components/AppHeader.vue` (`links` array).

**Archive lifecycle** (staff never delete/unpublish — that kills the URL with no grace window):

1. **Open** (`status = "open"`) — shown in the list, indexable, HTTP 200.
2. **Archived, < 12 months since `archived_at`** — removed from the list, still reachable at its URL with a "closed" banner, `robots: noindex, follow`, HTTP **410 Gone** (`setResponseStatus`).
3. **Archived, ≥ 12 months** (or `archived_at` missing) — `createError({ statusCode: 404, data: { section: "ausbildung", reason: "archived" }, fatal: true })`.

`app/error.vue` branches on `error.data?.section === "ausbildung"` to show tailored copy (`ausbildung.gone.*`) linking back to `/ausbildung`, instead of the generic error screen.

**Sector filter (future):** `useAusbildungSectors().options` already yields `{ value, label }` per locale. To add a filter, read a `?sector=` query param on `/ausbildung/index.vue` and either filter the fetched list client-side on `offer.content.sector` or pass `filter_query[sector][in]` to the Storyblok call. The slugs are URL-safe by design.

**Storyblok dashboard setup** (one-time, do this before offers can be published):

1. **Block library → New block → `ausbildung_offer`**, type *Content type* (nestable is fine too). Fields:
   | Field (technical name) | Type | Notes |
   |---|---|---|
   | `reference` | Text | **required, unique, staff-assigned** — e.g. `MC-A-2026-014`. Non-translatable. The client's private lookup key (see below). |
   | `title` | Text | e.g. "Fachkraft für Lagerlogistik" |
   | `profession` | Text | job title / role |
   | `sector` | Single-Option | **option values must be the slugs** in `app/composables/useAusbildungSectors.ts` (`pflege`, `it`, `handwerk`, `gastronomie`, `kaufmaennisch`, `industrie`, `logistik`, `sonstige`) — option *names* can be German for editors. Never localize/rename a value once offers use it. Display labels come from i18n `ausbildung.sectors.<slug>`, not from Storyblok. |
   | `region` | Text | **Bundesland only** — "Nordrhein-Westfalen", never a city |
   | `start` | Text | descriptive — "August 2026", "ab sofort" |
   | `duration` | Text | "3 Jahre" |
   | `language_level` | Single-Option | A2, B1, B2 |
   | `positions` | Number | optional |
   | `summary` | Textarea | plain text; card teaser + meta description |
   | `requirements` | Richtext | general, non-identifying ("Mittlerer Schulabschluss, Motivation …") |
   | `benefits` | Richtext | optional |
   | `status` | Single-Option | values `open`, `archived`; **default `open`** |
   | `archived_at` | Date | set **only** when archiving |
   | `seo_title` | Text | optional |
   | `seo_description` | Text | optional |
2. Mark `title`, `profession`, `sector`, `region`, `start`, `duration`, `language_level`, `summary`, `requirements`, `benefits` as **translatable** (Space → Settings → check the field's "Translatable" box). `status`, `archived_at`, `positions` stay non-translatable.
3. **Content → New folder → `ausbildung`.** Set the folder's default content type to `ausbildung_offer` so new stories inside it use the block automatically.
4. Create offers as stories inside `ausbildung/` (slug e.g. `ausbildung/lagerlogistik-nrw-2026`). Fill the `en` fields, then switch the language dropdown to `ar` and fill the Arabic values.
5. **To retire an offer:** set `status = archived` and `archived_at = today`. Do **not** unpublish or delete. Once a year, delete stories archived more than ~12 months ago.
6. Optional: add a Storyblok webhook (Settings → Webhooks, "Story published/unpublished") pointing at a Netlify build hook so changes also trigger a deploy; otherwise they still go live within the 1h ISR window.

### OG images

- `nuxt-og-image` + `@takumi-rs/core` render dynamic OG images from Vue components under `app/components/OgImage/*.takumi.vue`.
- Currently only `TeamMember.takumi.vue` exists (invoked via `defineOgImage("TeamMember", props, [...])`).
- **Disabled in development** (`ogImage.enabled` = false when `NODE_ENV === "development"`).
- OG image routes (`/_og/**`) are statically cached with immutable headers in `netlify.toml`.

### Icons

- `app/components/SvgIcon.vue` is a **single component** with inline SVG path data switched on a `name` prop (not per-file icon components) — add new icons as another `case` in both the path-data and `viewBox` computed switches.
- `app/components/icons/*` is a separate, older set of standalone icon SFCs (mostly avatar/illustration icons, not UI icons):
  - `Doctor.vue`, `Error.vue`, `JobSearch.vue`, `Mohammad.vue`, `Salma.vue`, `Study.vue`, `Yara.vue`
  - These are complex SVG illustrations, not small UI icons.

### Consent & Analytics

- `app/composables/useCookieConsent.ts` tracks consent in both a **cookie** (SSR-safe, key: `cookie_consent`, values: `"unset" | "accepted" | "rejected"`) and **localStorage** (client source of truth, key: `cookie_preferences`, stores `{ accepted: boolean, timestamp: number }`).
- `nuxt-gtag` is initialized **manually** (`initMode: "manual"`) only after consent is accepted (see `app/app.vue` `onMounted` hook), with Google Consent Mode v2 defaults set to `denied` in `nuxt.config.ts`.
- GTM container ID: `GTM-PJ2FN7P2`.
- On rejection, the page reloads to clear any already-loaded scripts.
- `CookieBanner.vue` is rendered client-only via `<ClientOnly>` in `app.vue`.

### Images

- `@nuxt/image` with avif/webp output.
- Provider: `netlify` in production, `ipx` in dev.
- Quality: 60.
- Storyblok images base URL: `https://a.storyblok.com`.
- Responsive breakpoints: sm (640), md (768), lg (1024), xl (1280), 2xl (1536).
- Netlify image transforms configured in `netlify.toml` (remote images from `a.storyblok.com` allowed, `/transform-small/*` redirect for 50x50 thumbnails).

### Accessibility

- `@nuxt/a11y` module is enabled — this is an active focus area.
- Preserve `aria-label`/`sr-only` patterns already used throughout components when adding interactive elements or icon-only links.

### Other modules

- `@nuxt/hints` — performance hints.
- `@nuxtjs/sitemap` — auto sitemap generation.
- `@vueuse/nuxt` — VueUse composables (used for `useLocalStorage` in cookie consent, among others).
- `@lottiefiles/dotlottie-vue` — Lottie animations.

## File tree (key paths)

```
masarvisa/
├── app/
│   ├── app.vue                          # Root: NuxtLayout + CookieBanner + gtag init
│   ├── error.vue                        # Error page
│   ├── env.d.ts                         # Environment type declarations
│   ├── assets/css/main.css              # Tailwind v4 theme (@theme), global styles
│   ├── layouts/
│   │   └── default.vue                  # Single layout: html lang/dir, header, wave SVG, footer
│   ├── pages/
│   │   ├── index.vue                    # Homepage
│   │   ├── about.vue                    # About page
│   │   ├── team.vue                     # Team listing page
│   │   ├── privacy.vue                  # Privacy policy
│   │   ├── impressum.vue                # Legal notice (Impressum)
│   │   ├── blog/
│   │   │   ├── index.vue                # Blog listing (Storyblok)
│   │   │   └── [slug].vue              # Blog post detail (Storyblok)
│   │   ├── ausbildung/
│   │   │   ├── index.vue                # Ausbildung offers listing (Storyblok)
│   │   │   └── [slug].vue              # Ausbildung offer detail + archive lifecycle
│   │   └── teams/
│   │       └── [person].vue             # Individual team member page
│   ├── components/
│   │   ├── AppHeader.vue                # Site header/navigation
│   │   ├── AppFooter.vue                # Site footer
│   │   ├── CookieBanner.vue             # GDPR cookie consent banner
│   │   ├── LangSwitcher.vue             # Language selector (en/de/ar)
│   │   ├── ThemeToggle.vue              # Dark/light mode toggle
│   │   ├── SvgIcon.vue                  # Centralized icon component (switch on name prop)
│   │   ├── CountUp.vue                  # Animated number counter
│   │   ├── FaqBox.vue                   # Accordion FAQ item
│   │   ├── FlipCard.vue                 # Flip card component
│   │   ├── CircleLoop.vue               # Decorative circle animation
│   │   ├── section/                     # Homepage section components
│   │   │   ├── Faqs.vue
│   │   │   ├── Services.vue
│   │   │   ├── Statics.vue
│   │   │   ├── Testimonials.vue
│   │   │   └── Portal.vue               # Links out to the external client portal (portal.masar-center.de)
│   │   ├── icons/                       # Standalone SVG illustration components
│   │   │   ├── Doctor.vue, Error.vue, JobSearch.vue
│   │   │   ├── Mohammad.vue, Salma.vue, Study.vue, Yara.vue
│   │   ├── animations/
│   │   │   ├── Loader.vue               # Loading animation
│   │   │   └── TeamAnimation.client.vue # Client-only team animation (Lottie)
│   │   ├── storyblok/                   # Storyblok content components
│   │   │   ├── Featured.vue, PostCard.vue, SearchPost.vue
│   │   │   ├── State.vue, post.vue
│   │   ├── ausbildung/
│   │   │   └── OfferCard.vue            # Ausbildung offer listing card
│   │   └── OgImage/
│   │       └── TeamMember.takumi.vue    # Dynamic OG image for team members
│   ├── composables/
│   │   ├── useTeamData.ts               # Team member data (hard-coded, 13 members)
│   │   ├── useCookieConsent.ts          # Cookie consent state (cookie + localStorage)
│   │   ├── useDateFormatter.ts          # Date formatting utility
│   │   └── useStoryblokLocale.ts        # Storyblok locale mapping
│   ├── plugins/
│   │   └── storyBlok.ts                 # Storyblok plugin initialization
│   └── type/                            # TypeScript type definitions
├── i18n/locales/
│   ├── en.json                          # English translations (~18KB)
│   ├── de.json                          # German translations (~20KB)
│   └── ar.json                          # Arabic translations (~24KB)
├── public/
│   ├── team/                            # Team member photos (.webp)
│   ├── animations/                      # Lottie animation files
│   ├── fonts/                           # Local font files
│   ├── hero.webp, hero-small.webp       # Hero images
│   ├── doctor.webp, study.webp, job-search.webp  # Service images
│   ├── masar-logo.png                   # Logo
│   ├── masar-meta-logo.webp             # OG image fallback
│   ├── favicon*.png, favicon.ico        # Favicons
│   └── robots.txt, BingSiteAuth.xml     # SEO files
├── server/                              # Nitro server (currently empty)
├── nuxt.config.ts                       # Central Nuxt configuration
├── netlify.toml                         # Netlify deploy config (headers, redirects, image transforms)
├── package.json                         # Dependencies & scripts
├── eslint.config.mjs                    # ESLint config (extends Nuxt preset)
├── .prettierrc                          # Prettier config
├── .nvmrc                               # Node version: 22.21.1
├── tsconfig.json                        # TypeScript config
├── sonar-project.properties             # SonarQube config
└── renovate.json                        # Dependency auto-update config
```

## Environment variables

| Variable | Purpose |
|---|---|
| `NUXT_PUBLIC_SITE_URL` | Site base URL (default: `https://masar-center.de`) |
| `STORYBLOK_DELIVERY_API_TOKEN` | Storyblok content delivery API token |
| `STORYBLOK_API_BASE_URL` | Storyblok API base URL |
| `STORYBLOK_REGION` | Storyblok region (`eu`) |
| `STORYBLOK_BRIDGE` | Enable Storyblok visual editor bridge (`true`/`false`) |
| `NUXT_CONTENT_DATABASE_TYPE` | Content database type (libsql) |
| `NUXT_CONTENT_DATABASE_URL` | Content database URL |

## Conventions

- **No semicolons**, **double quotes**, **trailing commas (ES5 style)** — enforced by `.prettierrc`.
- `vue/html-self-closing` is set to **always self-close** void/normal/component/svg/math tags — matches existing component style.
- `<script setup>` throughout; some components use `lang="ts"`, some plain JS — **follow whatever the file already does**.
- Preserve all existing comments, `aria-label` attributes, and `sr-only` classes.
- When adding new i18n keys, **always add to all three locale files** (`en.json`, `de.json`, `ar.json`).
- Team member photos go in `public/team/` as `.webp` format.
- New UI icons → add a `case` in `SvgIcon.vue`. New illustration icons → create an SFC in `app/components/icons/`.

## Gotchas & important notes

1. **Dev server uses HTTPS** — `vite-plugin-mkcert` generates local certs. URLs are `https://localhost:3000`.
2. **OG images are disabled in dev** — don't debug OG image rendering locally; use `npm run build && npm run preview`.
3. **No hot CMS preview** — Storyblok bridge is disabled in production (`STORYBLOK_BRIDGE=false`). Set to `true` + use the draft token for visual editor work.
4. **Blog uses ISR** — blog routes use Incremental Static Regeneration (1h TTL) via `routeRules`, not full prerender.
5. **Arabic locale has RTL** — adding any new layout or component must be tested with `dir="rtl"`. The CSS custom variant `@custom-variant dark (&:where(.dark, .dark *))` handles dark mode scoping.
6. **Cookie consent gates analytics** — `nuxt-gtag` does NOT load until `useCookieConsent().preferences.value.accepted` is true. Never auto-initialize gtag.
7. **`server/` directory is empty** — there are no custom API routes or server middleware yet. Nitro is used purely for SSG/ISR.
8. **Netlify image optimization** — production uses `provider: "netlify"` for `@nuxt/image`. Remote images from `a.storyblok.com` are whitelisted in `netlify.toml`.
