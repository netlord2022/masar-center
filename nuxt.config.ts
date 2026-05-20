import tailwindcss from "@tailwindcss/vite"

const teamSlugs = [
  "morhaf-esmail",
  "zeinab-marhij",
  "sandy-nbeaa",
  "rami-ismaeel",
  "ronaq-ismail",
  "tala-alsairafi",
  "suriana-barshin",
  "afraa-ebraheem",
  "rama-ismaeel",
  "batoul-mohammad",
  "lama-kassem",
]

// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "https://masar-center.de"
export default defineNuxtConfig({
  compatibilityDate: "2026-03-14",
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  runtimeConfig: {
    public: {
      siteUrl,
    },
  },

  site: {
    url: siteUrl,
    name: "Masar Center",
  },

  // SSG Configuration
  ssr: true,
  nitro: {
    routeRules: {
      "/_og/**": { static: true },
    },
    prerender: {
      crawlLinks: true,
      ignore: ["/.netlify/images"],
      routes: [
        "/",
        "/de",
        "/ar",
        "/privacy",
        "/impressum",
        "/about",
        "/de/about",
        "/ar/about",
        "/de/privacy",
        "/ar/privacy",
        "/de/impressum",
        "/ar/impressum",
        // dynamic team pages — all 3 locales
        ...teamSlugs.flatMap((slug) => [
          `/teams/${slug}`,
          `/de/teams/${slug}`,
          `/ar/teams/${slug}`,
        ]),
      ],
    },

    preset: "netlify",
  },
  ogImage: {
    enabled: process.env.NODE_ENV !== "development",
    zeroRuntime: true,
  },
  i18n: {
    baseUrl: siteUrl,
    locales: [
      {
        code: "en",
        file: "en.json",
        language: "en-US",
        dir: "ltr",
        name: "English",
        icon: "gb-flag",
      },
      {
        code: "de",
        file: "de.json",
        language: "de-DE",
        dir: "ltr",
        name: "Deutsch",
        icon: "de-flag",
      },
      {
        code: "ar",
        file: "ar.json",
        language: "ar-SY",
        dir: "rtl",
        name: "العربية",
        icon: "sy-flag",
      },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=6",
      link: [
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: `${siteUrl}/favicon-180x180.png`,
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: `${siteUrl}/favicon-32x32.png`,
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: `${siteUrl}/favicon-16x16.png`,
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: `${siteUrl}/fonts/montserrat/montserrat-bold.woff2`,
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: `${siteUrl}/fonts/vazirmatn/vazirmatn-extrabold.woff2`,
          crossorigin: "anonymous",
        },
      ],
      meta: [
        { property: "og:type", content: "website" },
        { property: "og:url", content: siteUrl },
        { property: "og:site_name", content: "Masar Center" },
        { property: "og:image", content: `${siteUrl}/masar-meta-logo.webp` },
        {
          property: "og:image:secure_url",
          content: `${siteUrl}/masar-meta-logo.webp`,
        },
        { property: "og:image:type", content: "image/webp" },
        { property: "og:image:width", content: "1042" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Masar Center" },
        { name: "twitter:image", content: `${siteUrl}/masar-meta-logo.webp` },
      ],
    },

    pageTransition: { name: "page", mode: "out-in" },
  },

  // CSS and assets
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "vue",
        "@vueuse/core",
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "@lottiefiles/dotlottie-vue",
      ],
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/hints",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-og-image",
    "@nuxtjs/sitemap",
  ],
  colorMode: {
    preference: "system", // 'light' | 'dark' | 'system'
    fallback: "light",
    storageKey: "theme",
    storage: "cookie",
    classSuffix: "", // so Tailwind uses `.dark`
  },
  image: {
    format: ["avif", "webp"],
    quality: 60,
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
    provider: process.env.NODE_ENV === "production" ? "netlify" : "ipx",
  },
})
