<script setup>
const { t } = useI18n()
definePageMeta({
  title: "masarCompany",
})
useHead({
  meta: [
    { property: "og:title", content: t("masarCompany") },
    { property: "twitter:title", content: t("masarCompany") },
    { property: "og:description", content: t("aboutUs.description") },
    { name: "description", content: t("aboutUs.description") },
  ],
})
</script>

<template>
  <div class="w-full max-w-full" role="main">
    <div class="w-full max-w-full">
      <div dir="ltr">
        <div
          class="w-full max-w-7xl flex justify-between mx-auto items-center py-16 px-6 flex-col md:flex-row"
        >
          <NuxtImg
            src="/hero.webp"
            alt="Home Hero Image"
            class="w-full h-auto aspect-square max-w-full md:max-w-1/2"
            loading="eager"
            fetchpriority="high"
            width="1200"
            height="1200"
            placeholder
            preload
            sizes="sm:100vw md:50vw lg:1200px"
          />
          <div
            class="text-primary dark:text-white md:pl-6 text-left rtl:text-right mt-6 md:mt-0"
          >
            <h1
              class="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 dark:text-white rtl:md:leading-20 rtl:font-arabic"
            >
              {{ $t("heroTitle") }}
            </h1>
            <h2 class="sr-only">Masar center | Masar UG | مركز مسار</h2>
            <p class="text-md md:text-xl lg:text-2xl mb-8 dark:text-white">
              {{ $t("heroSubtitle") }}
            </p>
          </div>
        </div>
      </div>
      <LazySectionServices hydrate-on-visible />
      <LazySectionStatics hydrate-on-visible />
      <LazySectionTestimonials hydrate-on-visible />
      <LazySectionFaqs hydrate-on-visible />
    </div>
  </div>
</template>
