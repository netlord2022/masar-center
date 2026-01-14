import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //compatibilityDate: "2025-07-15",
  devtools: { enabled: process.env.NODE_ENV !== "production" },

  // SSG Configuration
  ssr: true,
  nitro: {
    // output: {
    //   publicDir: "dist",
    // },
    prerender: {
      //crawlLinks: true,
      routes: ["/", "/de", "/ar"],
      //routes: [],
    },
    preset: "netlify",
  },
  i18n: {
    baseUrl: "https://masar-center.netlify.app/",
    locales: [
      {
        code: "en",
        file: "en.json",
        language: "es-US",
        dir: "ltr",
        name: "English",
        img: "/gb.svg",
      },
      {
        code: "de",
        file: "de.json",
        language: "de-DE",
        dir: "ltr",
        name: "Deutsch",
        img: "/de.svg",
      },
      {
        code: "ar",
        file: "ar.json",
        language: "ar-SY",
        dir: "rtl",
        name: "العربية",
        img: "/sy.svg",
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
          href: "/favicon-180x180.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/montserrat/montserrat-bold.woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "preload",
          as: "font",
          type: "font/woff2",
          href: "/fonts/vazirmatn/vazirmatn-extrabold.woff2",
          crossorigin: "anonymous",
        },
        {
          rel: "canonical",
          href: "https://masar-center.netlify.app/",
        },
      ],
      meta: [
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://masar-center.netlify.app/" },
        { property: "og:title", content: "Masar Center" },
        {
          property: "og:description",
          content:
            "تقديم خدمات استشارية ودعم عملي للراغبين بالسفر الى ألمانيا.",
        },
        { property: "og:image", content: "/masar-meta-logo.webp" },
        { property: "og:image:secure_url", content: "/masar-meta-logo.webp" },
        { property: "og:image:type", content: "image/webp" },
        { property: "og:image:width", content: "1042" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Masar Center" },
        {
          name: "twitter:description",
          content:
            "تقديم خدمات استشارية ودعم عملي للراغبين بالسفر الى ألمانيا.",
        },
        { name: "twitter:image", content: "/masar-meta-logo.webp" },
      ],
    },

    pageTransition: { name: "page", mode: "out-in" },
  },

  // CSS and assets
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/hints",
    "@nuxtjs/i18n",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
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
    provider: "netlify",
    // todo:domains: ['images.example.com']
  },
})
