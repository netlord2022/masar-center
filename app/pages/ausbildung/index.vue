<script setup lang="ts">
import type { AusbildungOffer } from "../../type/ausbildung"

const config = useRuntimeConfig()
const { t } = useI18n()
const { sbLocale } = useStoryblokLocale()
const storyblok = useStoryblokApi()

definePageMeta({ title: "ausbildung.title" })

const { data, status } = await useAsyncData(
  `ausbildung-offers-${sbLocale.value}`,
  async () => {
    try {
      const res = await storyblok.get("cdn/stories", {
        starts_with: "ausbildung/",
        language: sbLocale.value,
        is_startpage: "0",
        sort_by: "first_published_at:desc",
        per_page: 100,
        version: config.public.storyblokBridge ? "draft" : "published",
        // Bypass the space-level cache-version snapshot so freshly published
        // offers show up on the next build / ISR revalidation instead of
        // waiting for Storyblok's list cache to roll over.
        cv: Date.now(),
      })

      return {
        offers: (res.data.stories ?? []) as AusbildungOffer[],
      }
    } catch (error) {
      // Surface it in the build/server log instead of silently shipping an
      // empty list; still fall back so a transient blip doesn't 500 the page.
      console.error("[ausbildung] failed to load offers list:", error)
      return { offers: [] as AusbildungOffer[] }
    }
  },
  {
    watch: [sbLocale],
    default: () => ({ offers: [] as AusbildungOffer[] }),
  }
)

const offers = computed(() =>
  (data.value?.offers ?? []).filter(
    (offer) => offer.content?.status !== "archived"
  )
)

const whatsappUrl = "https://wa.me/491771873142"

const steps = computed(() => [
  t("ausbildung.step1"),
  t("ausbildung.step2"),
  t("ausbildung.step3"),
])

useSeoMeta({
  title: () => `${t("ausbildung.title")} | ${t("masar")}`,
  ogTitle: () => `${t("ausbildung.title")} | ${t("masar")}`,
  description: () => t("ausbildung.seoDescription"),
  ogDescription: () => t("ausbildung.seoDescription"),
})
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 pt-8 pb-20 w-full">
    <section class="w-full max-w-3xl mx-auto px-2 pb-12 text-center">
      <div
        class="inline-flex items-center gap-2 bg-primary/8 dark:bg-primary/15 border border-primary/20 text-primary dark:text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase"
      >
        <span class="w-2 h-2 bg-secondary rounded-full animate-pulse" />
        {{ $t("ausbildung.badge") }}
      </div>

      <i18n-t
        keypath="ausbildung.headline"
        tag="h1"
        class="text-4xl md:text-5xl font-black text-primary dark:text-white leading-tight mb-4 rtl:font-arabic"
      >
        <template #word>
          <span class="text-secondary">{{
            $t("ausbildung.headlineWord")
          }}</span>
        </template>
      </i18n-t>

      <p
        class="text-gray-500 dark:text-gray-400 text-base max-w-2xl mx-auto leading-relaxed"
      >
        {{ $t("ausbildung.intro") }}
      </p>
    </section>

    <!-- How it works -->
    <section class="max-w-4xl mx-auto mb-14">
      <h2
        class="text-xs font-bold tracking-widest uppercase text-secondary mb-4 text-center"
      >
        {{ $t("ausbildung.howItWorksTitle") }}
      </h2>
      <ol class="grid gap-4 sm:grid-cols-3">
        <li
          v-for="(step, i) in steps"
          :key="i"
          class="flex flex-col items-center text-center gap-2 rounded-xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5"
        >
          <span
            class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm"
          >
            {{ i + 1 }}
          </span>
          <span class="text-sm text-gray-700 dark:text-gray-200">{{
            step
          }}</span>
        </li>
      </ol>
    </section>

    <!-- Loading -->
    <div
      v-if="status === 'pending'"
      class="flex items-center justify-center py-24"
    >
      <LazyAnimationsLoader class="w-16 md:w-20" />
    </div>

    <div
      v-else-if="offers.length"
      class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <AusbildungOfferCard
        v-for="(offer, index) in offers"
        :key="offer.uuid"
        :offer="offer"
        :index="index"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else
      class="max-w-xl mx-auto text-center py-16 flex flex-col items-center gap-6"
    >
      <p class="text-lg text-gray-500 dark:text-gray-400">
        {{ $t("ausbildung.empty") }}
      </p>
      <a
        :href="whatsappUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-8 py-3.5 bg-primary dark:bg-hero text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:scale-105 transition-all duration-300 ease-in-out rtl:font-arabic"
      >
        <SvgIcon name="whatsapp" size="w-5 h-5" />
        {{ $t("ausbildung.cta") }}
      </a>
    </div>
  </div>
</template>
