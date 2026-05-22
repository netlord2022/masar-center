<script setup lang="ts">
import { StoryblokRichText } from "@storyblok/vue"
import { useDateFormatter } from "@/composables/useDateFormatter"

const props = defineProps({ blok: Object })
const formatted = useDateFormatter(props?.blok?.date)
</script>

<template>
  <article class="max-w-3xl mx-auto px-4 py-16 dark:text-white">
    <h1 class="text-4xl font-bold mb-4">{{ blok.title }}</h1>
    <NuxtImg
      v-if="blok.cover_image?.filename"
      :src="blok.cover_image.filename"
      :alt="blok.title"
      provider="storyblok"
      width="800"
      height="400"
      preload
      loading="eager"
      fetchpriority="high"
      format="webp"
      class="w-full h-72 md:h-96 object-cover rounded-2xl mb-8"
    />
    <p class="text-sm text-gray-400 mb-2">{{ formatted }}</p>

    <p class="text-xl text-gray-500 mb-10 leading-relaxed">
      {{ blok.excerpt }}
    </p>

    <div class="prose dark:prose-invert max-w-none">
      <StoryblokRichText v-if="blok.content" :doc="blok.content" />
    </div>
    <div v-if="blok.tags">
      <div class="mt-4">
        <span
          v-for="tag in blok.tags"
          :key="tag"
          class="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2"
        >
          #{{ tag.tag }}
        </span>
      </div>
    </div>
  </article>
</template>
