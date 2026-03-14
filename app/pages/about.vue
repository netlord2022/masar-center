<script setup>
import CircleLoop from "~/components/CircleLoop.vue"
const { t } = useI18n()
definePageMeta({
  title: "about",
})

useHead({
  meta: [
    { property: "og:title", content: t("metaAbout") },
    { property: "og:description", content: t("aboutUs.description") },
    { name: "description", content: t("aboutUs.description") },
  ],
})
</script>

<template>
  <section
    class="max-w-7xl mx-auto px-6 text-primary dark:text-white mt-24 mb-10"
  >
    <div class="w-full mb-6 flex text-center justify-center items-center">
      <CircleLoop />
    </div>

    <h1 class="text-4xl md:text-4xl font-bold mb-6 dark:text-white">
      {{ $t("about") }}
    </h1>
    <h2 class="text-2xl font-bold mb-6 dark:text-white">
      {{ $t("aboutUs.title") }}
    </h2>
    <p
      class="text-md md:text-xl dark:text-white whitespace-pre-wrap"
      dir="auto"
    >
      {{ $t("aboutUs.vision") }}
    </p>
    <p
      class="text-md md:text-xl dark:text-white whitespace-pre-wrap mt-6"
      dir="auto"
    >
      {{ $t("aboutUs.whoWeAre") }}
    </p>
    <p
      class="text-md md:text-xl dark:text-white whitespace-pre-wrap mt-6"
      dir="auto"
    >
      {{ $t("aboutUs.whatMakesUsDifferent") }}
    </p>
    <p
      class="text-md md:text-xl dark:text-white whitespace-pre-wrap mt-6"
      dir="auto"
    >
      {{ $t("aboutUs.ourMission") }}
    </p>
  </section>
</template>
