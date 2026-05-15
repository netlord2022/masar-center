<script setup lang="ts">
import type { NuxtError } from "#app"

defineProps<{ error: NuxtError }>()
</script>

<template>
  <NuxtLayout class="flex flex-col min-h-screen">
    <main
      role="main"
      class="flex flex-col items-center justify-center gap-6 py-16 grow h-full"
    >
      <IconsError class="text-primary dark:text-secondary w-60 h-auto" />
      <h1 class="text-6xl dark:text-white">{{ error.status }}</h1>
      <NuxtLink class="underline dark:text-white text-lg" to="/"
        >Go back home</NuxtLink
      >
    </main>
    <ClientOnly>
      <CookieBanner />
    </ClientOnly>
  </NuxtLayout>
</template>
