import tailwindcss from "@tailwindcss/vite"
import mkcert from "vite-plugin-mkcert"

// https://nuxt.com/docs/api/configuration/nuxt-config
const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "https://masar-center.de"
export default defineNuxtConfig({
  compatibilityDate: "2026-03-14",
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  runtimeConfig: {
    public: {
      siteUrl,
      storyblokBridge: process.env.STORYBLOK_BRIDGE === "true",
    },
    storyblokApiBaseUrl: process.env.STORYBLOK_API_BASE_URL,
    storyblokDeliveryApiToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
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
      "/blog": { isr: 3600 },
      "/de/blog": { isr: 3600 },
      "/ar/blog": { isr: 3600 },
      // Use ISR for individual blog posts so they generate instantly on demand
      // without bloating your initial production build times
      "/blog/**": { isr: 3600 },
      "/de/blog/**": { isr: 3600 },
      "/ar/blog/**": { isr: 3600 },
    },
    prerender:
      process.env.NODE_ENV === "production"
        ? {
            crawlLinks: true,
            ignore: ["/.netlify/images"],
            routes: [
              "/",
              "/de",
              "/ar",
              "/team",
              "/ar/team",
              "/privacy",
              "/impressum",
              "/about",
              "/de/about",
              "/ar/about",
              "/de/privacy",
              "/ar/privacy",
              "/de/impressum",
              "/ar/impressum",
            ],
          }
        : {},
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
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: `/favicon-180x180.png`,
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: `/favicon-32x32.png`,
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "48x48",
          href: `/favicon-48x48.png`,
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: `/favicon-16x16.png`,
        },
        // {
        //   rel: "preload",
        //   as: "image",
        //   type: "image/webp",
        //   href: `${siteUrl}/hero.webp`,
        // },
      ],
      meta: [
        { property: "og:type", content: "website" },
        { property: "og:url", content: siteUrl },
        { property: "og:site_name", content: "Masar Center" },
        { property: "og:image", content: `/masar-meta-logo.webp` },
        {
          property: "og:image:secure_url",
          content: `${siteUrl}/masar-meta-logo.webp`,
        },
        { property: "og:image:type", content: "image/webp" },
        {
          property: "og:image:alt",
          content: "Masar Center - German visa consulting by Masar UG",
        },
        { property: "og:image:width", content: "1042" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Masar Center" },
        { name: "twitter:image", content: `/masar-meta-logo.webp` },
        {
          name: "twitter:description",
          content: "Masar Center - German visa consulting by Masar UG",
        },
        {
          name: "theme-color",
          content: "#1a6b4a",
          media: "(prefers-color-scheme: light)",
        },
        {
          name: "theme-color",
          content: "#0d4d35",
          media: "(prefers-color-scheme: dark)",
        },
        { name: "color-scheme", content: "light dark" },
      ],
    },

    pageTransition: { name: "page", mode: "out-in" },
  },

  // CSS and assets
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss(), mkcert()],
    optimizeDeps: {
      include: [
        "vue",
        "@vueuse/core",
        ...(process.env.NODE_ENV !== "production"
          ? ["@vue/devtools-core", "@vue/devtools-kit"]
          : []),
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
    "@storyblok/nuxt",
    "nuxt-gtag",
    "@nuxt/fonts",
    "@nuxt/a11y",
  ],
  fonts: {
    defaults: {
      weights: [400, 700, 800],
      styles: ["normal"],
      subsets: [
        "cyrillic-ext",
        "cyrillic",
        "greek-ext",
        "greek",
        "vietnamese",
        "latin-ext",
        "latin",
        "arabic",
      ],
    },
    families: [
      { name: "Montserrat", provider: "google", weights: [400, 700, 800] },
      { name: "Vazirmatn", provider: "google", weights: [400, 700, 800] },
    ],
  },
  storyblok: {
    accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
    apiOptions: {
      region: process.env.STORYBLOK_REGION || "eu",
      cache: {
        clear: "auto", // clears cache on each request in draft, manual in published
        type: "memory",
      },
      maxRetries: 3,
    },
    bridge: process.env.STORYBLOK_BRIDGE === "true",
    devtools: process.env.STORYBLOK_BRIDGE === "true",
  },
  devServer: {
    https: true,
  },
  colorMode: {
    preference: "system", // 'light' | 'dark' | 'system'
    fallback: "light",
    storageKey: "theme",
    storage: "cookie",
    classSuffix: "", // so Tailwind uses `.dark`
  },
  gtag: {
    enabled: true, // process.env.NODE_ENV === "production", // silent no-op in dev
    initMode: "manual", // never loads until user clicks Accept
    id: "GTM-PJ2FN7P2", // your GTM container — fires Heap + all nested tags

    // Consent Mode v2 defaults: everything denied until user decides
    initCommands: [
      [
        "consent",
        "default",
        {
          ad_user_data: "denied",
          ad_personalization: "denied",
          ad_storage: "denied",
          analytics_storage: "denied",
          wait_for_update: 500,
        },
      ],
    ],
  },
  image: {
    format: ["avif", "webp"],
    //domains: ["a.storyblok.com"],
    storyblok: {
      baseURL: "https://a.storyblok.com",
    },
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
