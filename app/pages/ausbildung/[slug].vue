<script setup lang="ts">
import { StoryblokRichText } from "@storyblok/vue"
import type { AusbildungOffer } from "../../type/ausbildung"

const ARCHIVE_WINDOW_MONTHS = 12

const config = useRuntimeConfig()
const route = useRoute()
const { t } = useI18n()
const { sbLocale } = useStoryblokLocale()
const { label: sectorLabel } = useAusbildungSectors()
const storyblokApi = useStoryblokApi()

const slug = route.params.slug as string

const { data: pageData } = await useAsyncData(
  `ausbildung-offer-${slug}-${sbLocale.value}`,
  async () => {
    const res = await storyblokApi
      .get(`cdn/stories/ausbildung/${slug}`, {
        version: config.public.storyblokBridge ? "draft" : "published",
        language: sbLocale.value,
      })
      .catch(() => null)

    return { offer: (res?.data?.story ?? null) as AusbildungOffer | null }
  },
  { watch: [sbLocale] }
)

const offer = computed(() => pageData.value?.offer ?? null)
const content = computed(() => offer.value?.content ?? null)

// --- Archive lifecycle -------------------------------------------------------
const isArchived = computed(() => content.value?.status === "archived")

const isExpired = computed(() => {
  if (!isArchived.value) return false
  const raw = content.value?.archived_at
  if (!raw) return true // archived but no date -> treat as expired
  const archivedAt = new Date(raw.replace(" ", "T"))
  if (Number.isNaN(archivedAt.getTime())) return true
  const cutoff = new Date(archivedAt)
  cutoff.setMonth(cutoff.getMonth() + ARCHIVE_WINDOW_MONTHS)
  return Date.now() > cutoff.getTime()
})

if (!offer.value || isExpired.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Ausbildung offer not found",
    data: {
      section: "ausbildung",
      reason: offer.value ? "archived" : "notfound",
    },
    fatal: true,
  })
}

// Archived but still within the grace window: keep the URL reachable, but tell
// crawlers it's gone.
if (isArchived.value) {
  const event = useRequestEvent()
  if (event) setResponseStatus(event, 410)
}

// --- SEO -------------------------------------------------------------------
useSeoMeta({
  title: () =>
    `${content.value?.seo_title || content.value?.title || t("ausbildung.title")} | ${t("masar")}`,
  ogTitle: () =>
    `${content.value?.seo_title || content.value?.title || t("ausbildung.title")} | ${t("masar")}`,
  description: () =>
    content.value?.seo_description || content.value?.summary || "",
  ogDescription: () =>
    content.value?.seo_description || content.value?.summary || "",
  robots: () => (isArchived.value ? "noindex, follow" : "index, follow"),
})

// --- Contact CTA ----------------------------------------------------------
const whatsappUrl = computed(() => {
  const ref = content.value?.reference
  const msg = `${t("ausbildung.waMessage")}${ref ? ` [${ref}]` : ""}: ${
    content.value?.title ?? ""
  }${content.value?.region ? ` (${content.value.region})` : ""}`
  return `https://wa.me/491771873142?text=${encodeURIComponent(msg)}`
})

const details = computed(() => {
  const c = content.value
  if (!c) return []
  return [
    { label: t("ausbildung.fields.sector"), value: sectorLabel(c.sector) },
    { label: t("ausbildung.fields.region"), value: c.region },
    { label: t("ausbildung.fields.start"), value: c.start },
    { label: t("ausbildung.fields.duration"), value: c.duration },
    { label: t("ausbildung.fields.language"), value: c.language_level },
    {
      label: t("ausbildung.fields.positions"),
      value: c.positions ? String(c.positions) : "",
    },
  ].filter((row) => row.value)
})
</script>

<template>
  <article class="container mx-auto max-w-3xl px-4 py-10 dark:text-white">
    <NuxtLinkLocale
      dir="ltr"
      to="ausbildung"
      class="text-left self-start text-primary dark:text-white rtl:self-end rtl:text-right flex hover:underline"
    >
      <SvgIcon name="arrow-right" size="w-5 h-5 scale-x-[-1] mt-0.5 mx-1" />
      {{ $t("ausbildung.backToList") }}
    </NuxtLinkLocale>

    <div v-if="content" class="mt-6">
      <!-- Closed banner -->
      <div
        v-if="isArchived"
        class="mb-6 rounded-xl border border-secondary/30 bg-secondary/10 px-5 py-4 text-sm text-secondary"
      >
        <span class="font-bold">{{ $t("ausbildung.closed.badge") }}.</span>
        {{ $t("ausbildung.closed.notice") }}
      </div>

      <div class="flex flex-wrap items-center gap-2 mb-4">
        <span
          v-if="content.sector"
          class="inline-block bg-primary/10 text-primary dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full"
        >
          {{ sectorLabel(content.sector) }}
        </span>
        <span
          v-if="content.language_level"
          class="inline-block bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full"
        >
          {{ content.language_level }}
        </span>
      </div>

      <h1
        class="text-3xl md:text-4xl font-bold text-black dark:text-white rtl:font-arabic"
      >
        {{ content.title }}
      </h1>
      <p
        v-if="content.profession"
        class="text-lg text-gray-500 dark:text-gray-400 mt-2"
      >
        {{ content.profession }}
      </p>

      <p v-if="content.reference" class="mt-3 text-sm">
        <span class="text-gray-500 dark:text-gray-400 rtl:font-arabic">
          {{ $t("ausbildung.fields.reference") }}:
        </span>
        <span class="font-mono font-bold text-primary dark:text-hero mx-1">
          {{ content.reference }}
        </span>
      </p>

      <p
        v-if="content.summary"
        class="text-base text-gray-700 dark:text-gray-300 mt-6 leading-relaxed"
      >
        {{ content.summary }}
      </p>

      <!-- Details grid -->
      <dl
        v-if="details.length"
        class="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 rounded-2xl border border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-6"
      >
        <div v-for="row in details" :key="row.label">
          <dt
            class="text-xs font-bold uppercase tracking-wide text-gray-400 dark:text-gray-500"
          >
            {{ row.label }}
          </dt>
          <dd class="text-sm text-gray-800 dark:text-gray-100 mt-0.5">
            {{ row.value }}
          </dd>
        </div>
      </dl>

      <!-- Requirements -->
      <section v-if="content.requirements" class="mt-10">
        <h2
          class="text-xl font-bold mb-3 text-primary dark:text-white rtl:font-arabic"
        >
          {{ $t("ausbildung.fields.requirements") }}
        </h2>
        <div
          class="prose dark:prose-invert max-w-none text-black dark:text-white"
        >
          <StoryblokRichText :doc="content.requirements" />
        </div>
      </section>

      <!-- Benefits -->
      <section v-if="content.benefits" class="mt-10">
        <h2
          class="text-xl font-bold mb-3 text-primary dark:text-white rtl:font-arabic"
        >
          {{ $t("ausbildung.fields.benefits") }}
        </h2>
        <div
          class="prose dark:prose-invert max-w-none text-black dark:text-white"
        >
          <StoryblokRichText :doc="content.benefits" />
        </div>
      </section>

      <!-- Contact CTA -->
      <div
        class="mt-12 rounded-2xl bg-gradient-to-br from-primary/5 via-hero/10 to-primary/5 dark:from-primary/10 dark:to-primary/10 border border-primary/10 dark:border-hero/20 p-8 text-center"
      >
        <p
          class="text-gray-700 dark:text-gray-200 mb-5 max-w-md mx-auto rtl:font-arabic"
        >
          {{ $t("ausbildung.intro") }}
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
  </article>
</template>

<style scoped>
@reference "./../../assets/css/main.css";
.prose :deep() {
  h2,
  h3,
  h4 {
    @apply py-2 rtl:font-arabic font-bold;
  }
  h2 {
    @apply text-2xl;
  }
  h3 {
    @apply text-xl;
  }
  a {
    @apply text-primary dark:text-blue-500 hover:underline;
  }
  ul {
    @apply list-disc mb-4 px-2;
  }
  li {
    @apply mb-2;
  }
}
</style>
