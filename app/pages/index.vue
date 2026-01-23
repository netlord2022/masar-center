<script setup>
definePageMeta({
  title: "home",
})
useHead({
  meta: [
    { property: "og:title", content: "Masar" },
    { property: "og:description", content: "description todo" },
    { name: "description", content: "todo description" },
  ],
})
</script>

<template>
  <div class="w-full max-w-full" role="main">
    <section class="w-full max-w-full" dir="ltr">
      <div>
        <div
          class="w-full max-w-7xl flex justify-between mx-auto items-center py-16 px-6 flex-col md:flex-row"
        >
          <NuxtImg
            src="/hero.webp"
            alt="Home Hero Image"
            class="w-full h-auto object-fit max-w-full md:max-w-1/2 md:max-2/3"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            width="712"
            height="712"
            preload
            sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    712px
  "
          />
          <div
            class="text-primary dark:text-white md:pl-6 text-left rtl:text-right mt-6 md:mt-0"
          >
            <h1
              class="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 dark:text-white rtl:md:leading-20"
            >
              {{ $t("heroTitle") }}
            </h1>
            <p class="text-md md:text-xl lg:text-2xl mb-8 dark:text-white">
              {{ $t("heroSubtitle") }}
            </p>
          </div>
        </div>
      </div>
      <LazySectionServices hydrate-on-visible />
      <LazySectionFaqs hydrate-on-visible />
    </section>
  </div>
</template>
