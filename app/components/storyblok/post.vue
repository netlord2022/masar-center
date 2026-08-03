<script setup lang="ts">
import { StoryblokRichText } from "@storyblok/vue"
defineProps({ blok: Object })
</script>

<template>
  <article class="max-w-3xl mx-auto px-4 py-16">
    <NuxtImg
      v-if="blok.cover_image?.filename"
      :src="blok.cover_image.filename"
      :alt="blok.title"
      width="800"
      height="400"
      loading="lazy"
      format="webp"
      class="w-full h-72 object-cover rounded-2xl mb-8"
    />
    <p class="text-sm text-gray-400 mb-2">{{ blok.date }}</p>
    <h1 class="text-4xl font-bold mb-4">{{ blok.title }}</h1>
    <p class="text-xl text-gray-500 mb-10 leading-relaxed">
      {{ blok.excerpt }}
    </p>

    <div class="prose dark:prose-invert max-w-none">
      <StoryblokRichText v-if="blok.content" :doc="blok.content" />
    </div>
  </article>
</template>
