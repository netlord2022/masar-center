<script setup lang="ts">
import type { AusbildungOffer } from "../../type/ausbildung"

defineProps<{
  offer: AusbildungOffer
  index: number | string
}>()

const { label: sectorLabel } = useAusbildungSectors()
</script>
<template>
  <NuxtLinkLocale
    :to="`/ausbildung/${offer.slug}`"
    class="group flex flex-col rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >
    <div class="p-6 flex flex-col grow">
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <span
          v-if="offer.content.sector"
          class="inline-block bg-primary/10 text-primary dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full"
        >
          {{ sectorLabel(offer.content.sector) }}
        </span>
        <span
          v-if="offer.content.language_level"
          class="inline-block bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full"
        >
          {{ offer.content.language_level }}
        </span>
      </div>

      <h2
        class="text-lg font-bold text-black dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2 rtl:font-arabic"
      >
        {{ offer.content.title }}
      </h2>
      <p
        v-if="offer.content.profession"
        class="text-sm text-gray-500 dark:text-gray-400 mt-1"
      >
        {{ offer.content.profession }}
      </p>

      <p
        v-if="offer.content.summary"
        class="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-3"
      >
        {{ offer.content.summary }}
      </p>

      <dl
        class="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500 dark:text-gray-400"
      >
        <div v-if="offer.content.reference" class="flex gap-1" dir="ltr">
          <dt class="font-semibold">
            {{ $t("ausbildung.fields.reference") }}:
          </dt>
          <dd class="font-mono">{{ offer.content.reference }}</dd>
        </div>
        <div v-if="offer.content.region" class="flex gap-1">
          <dt class="font-semibold">{{ $t("ausbildung.fields.region") }}:</dt>
          <dd>{{ offer.content.region }}</dd>
        </div>
        <div v-if="offer.content.start" class="flex gap-1">
          <dt class="font-semibold">{{ $t("ausbildung.fields.start") }}:</dt>
          <dd>{{ offer.content.start }}</dd>
        </div>
        <div v-if="offer.content.duration" class="flex gap-1">
          <dt class="font-semibold">{{ $t("ausbildung.fields.duration") }}:</dt>
          <dd>{{ offer.content.duration }}</dd>
        </div>
      </dl>

      <span
        class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-hero rtl:font-arabic"
      >
        {{ $t("ausbildung.ctaShort") }}
        <SvgIcon name="arrow-right" size="w-4 h-4 rtl:rotate-180" />
      </span>
    </div>
  </NuxtLinkLocale>
</template>
