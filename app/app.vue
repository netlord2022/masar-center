<template>
  <NuxtLayout class="flex flex-col min-h-screen">
    <main role="main" class="h-full grow flex flex-col">
      <NuxtPage class="grow" />
    </main>
    <ClientOnly>
      <CookieBanner />
    </ClientOnly>
  </NuxtLayout>
</template>
<script setup>
const { consent } = useCookieConsent()
useHead(
  computed(() => ({
    script:
      consent.value === "accepted"
        ? [
            {
              src: "https://www.googletagmanager.com/gtm.js?id=GTM-PJ2FN7P2",
              async: true,
              crossorigin: "anonymous",
            },
          ]
        : [],
  }))
)
</script>
