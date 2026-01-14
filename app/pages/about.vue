<script setup>
const { t } = useI18n()
definePageMeta({
  title: "about",
})

useHead({
  meta: [{ property: "og:title", content: t("metaAbout") }],
})
</script>

<template>
  <section class="p-10 text-center">
    <h2 class="text-3xl font-semibold mb-4">{{ $t("about") }}</h2>
    <NuxtLinkLocale to="/" class="underline text-blue-400"
      >← {{ $t("hero") }}</NuxtLinkLocale
    >
  </section>
</template>
