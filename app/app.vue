<template>
  <NuxtLayout class="flex flex-col min-h-screen">
    <main role="main">
      <NuxtPage class="grow" />
    </main>
    <ClientOnly>
      <CookieBanner />
    </ClientOnly>
  </NuxtLayout>
</template>
<script setup>
import CookieBanner from "~/components/CookieBanner.vue"
const { consent } = useCookieConsent()

const isAccepted = computed(() => consent.value === "accepted")

useHead(() => ({
  script: isAccepted.value
    ? [
        {
          src: "https://www.googletagmanager.com/gtm.js?id=GTM-PJ2FN7P2",
          async: true,
          crossorigin: "anonymous",
        },
      ]
    : [],
}))
</script>
