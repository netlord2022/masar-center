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
const { preferences } = useCookieConsent()
const { initialize, gtag } = useGtag()

onMounted(() => {
  if (preferences.value?.accepted) {
    initialize()
    gtag("consent", "update", {
      ad_user_data: "granted",
      ad_personalization: "granted",
      ad_storage: "granted",
      analytics_storage: "granted",
    })
  }
})
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
