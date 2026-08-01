# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Masar Center marketing site (masarvisa) — a Nuxt 4 SSR site for a German visa/study consultancy. Content is static/hard-coded (no CMS wired up), trilingual (en/de/ar), and deployed to Netlify.

## Commands

```bash
npm run dev          # dev server on http://localhost:3000 (--public exposes it on LAN)
npm run build        # production build (nitro preset: netlify)
npm run generate     # static generation
npm run preview      # preview a production build locally
npm run lint         # eslint .
npm run lint:fix     # eslint . --fix
```

There is no test suite/runner configured in this repo. CI (`.github/workflows/build.yml`) only runs a SonarQube scan on push/PR to `main`.

Node version is pinned via `.nvmrc` (22.21.1).

## Architecture

- **Nuxt 4** with the `app/` source directory convention (`app/pages`, `app/layouts`, `app/components`, `app/composables`), `ssr: true`, prerendered for production (`nitro.prerender`, `crawlLinks: true`) with an explicit route list per locale in `nuxt.config.ts`. Deploy target is Netlify (`nitro.preset: "netlify"`, see `netlify.toml`).
- **i18n** (`@nuxtjs/i18n`): three locales — `en` (default, no prefix), `de`, `ar` (rtl) — strategy `prefix_except_default`. Locale strings live in `i18n/locales/{en,de,ar}.json`, kept as parallel flat/nested key structures across all three files — add a key to all three when adding UI copy. `app/layouts/default.vue` sets `<html lang>`/`dir` from `useLocaleHead()`; `main.css` swaps the font stack (`--font-latin` vs `--font-arabic`) based on `html[dir="rtl"]`.
- **Team data**: `app/composables/useTeamData.ts` is the single source of truth for team members (no CMS/API). Bios are generated per-locale via a `setBio(name, locale, feminine)` template function rather than stored per-member. `app/pages/teams/[person].vue` looks members up by slug and 404s (`createError({ statusCode: 404 })`) when not found.
- **OG images**: `nuxt-og-image` + `@takumi-rs/core` render dynamic OG images from Vue components under `app/components/OgImage/*.takumi.vue` (see `TeamMember.takumi.vue`, invoked via `defineOgImage("TeamMember", props, [...])`). Disabled in development (`ogImage.enabled`).
- **Icons**: `app/components/SvgIcon.vue` is a single component with inline SVG path data switched on a `name` prop (not per-file icon components) — add new icons as another `case` in both the path-data and `viewBox` computed switches. `app/components/icons/*` is a separate, older set of standalone icon SFCs (mostly avatar/illustration icons, not UI icons).
- **Styling**: Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config.js` — theme is declared in `app/assets/css/main.css` with `@theme`). Dark mode via `@nuxtjs/color-mode` using a `.dark` class (`classSuffix: ""`), preference stored in a cookie (`storageKey: "theme"`).
- **Consent/analytics**: `app/composables/useCookieConsent.ts` tracks consent in both a cookie (SSR-safe) and localStorage (client source of truth). `nuxt-gtag` is initialized manually (`initMode: "manual"`) only after consent is accepted (see `app/app.vue`), with Google Consent Mode v2 defaults set to `denied` in `nuxt.config.ts`.
- **Accessibility**: `@nuxt/a11y` module is enabled — this is an active focus area (see recent `fix: a11y` commits); preserve `aria-label`/`sr-only` patterns already used throughout components (e.g. `app/pages/teams/[person].vue`) when adding interactive elements or icon-only links.
- **Images**: `@nuxt/image` with avif/webp output, provider is `netlify` in production and `ipx` in dev.

## Conventions

- No semicolons, double quotes, trailing commas (ES5 style) — enforced by `.prettierrc`.
- `vue/html-self-closing` is set to always self-close void/normal/component/svg/math tags — matches existing component style.
- `<script setup>` throughout; some components use `lang="ts"`, some plain JS — follow whatever the file already does.
