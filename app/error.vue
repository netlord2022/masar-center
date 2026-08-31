<script setup lang="ts">
import type { NuxtError } from "#app"

const props = defineProps<{ error: NuxtError }>()

const errorData = computed(() => {
  const raw = props.error?.data as unknown
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw) as Record<string, unknown>
    } catch {
      return {}
    }
  }
  return (raw ?? {}) as Record<string, unknown>
})

const isAusbildung = computed(() => errorData.value.section === "ausbildung")
</script>

<template>
  <NuxtLayout class="flex flex-col min-h-screen">
    <main
      role="main"
      class="flex flex-col items-center justify-center gap-6 py-16 grow h-full text-center px-6"
    >
      <IconsError class="text-primary dark:text-secondary w-60 h-auto" />

      <template v-if="isAusbildung">
        <h1
          class="text-3xl md:text-4xl font-bold dark:text-white rtl:font-arabic"
        >
          {{ $t("ausbildung.gone.title") }}
        </h1>
        <p class="text-gray-500 dark:text-gray-400 max-w-md">
          {{ $t("ausbildung.gone.text") }}
        </p>
        <NuxtLinkLocale
          to="ausbildung"
          class="underline dark:text-white text-lg"
        >
          {{ $t("ausbildung.gone.cta") }}
        </NuxtLinkLocale>
      </template>

      <template v-else>
        <h1 class="text-6xl dark:text-white">{{ error.status }}</h1>
        <NuxtLink class="underline dark:text-white text-lg" to="/"
          >Go back home</NuxtLink
        >
      </template>
    </main>
    <ClientOnly>
      <CookieBanner />
    </ClientOnly>
  </NuxtLayout>
</template>
