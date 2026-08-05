<script setup lang="ts">
import type { Post } from "../../type/post"
const { post } = defineProps<{
  post: Post
  index: number
  isRelated?: boolean
}>()
</script>
<template>
  <NuxtLinkLocale
    :to="`/blog/${post.slug}`"
    class="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
  >
    <div
      class="overflow-hidden bg-gray-100 dark:bg-gray-800"
      :class="isRelated ? 'h-36 md:h-32' : 'h-48'"
    >
      <NuxtImg
        v-if="post.content.cover_image?.filename"
        :src="post.content.cover_image.filename"
        :alt="post.content.title"
        provider="storyblok"
        width="400"
        height="200"
        format="webp"
        :preload="!isRelated && index < 2"
        :loading="!isRelated && index < 2 ? 'eager' : 'lazy'"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div class="p-5">
      <p
        v-if="!isRelated"
        class="text-xs text-gray-400 dark:text-gray-200 mb-2"
      >
        {{ post.content.date }}
      </p>
      <h2
        class="font-bold text-black dark:text-white leading-snug group-hover:text-primary transition-colors line-clamp-2"
        :class="isRelated ? 'text-base' : 'text-lg'"
      >
        {{ post.content.title }}
      </h2>
      <p
        class="text-gray-500 dark:text-gray-200 mt-2"
        :class="
          isRelated ? 'line-clamp-2 text-xs md:text-sm' : 'line-clamp-3 text-sm'
        "
      >
        {{ post.content.excerpt }}
      </p>
    </div>
  </NuxtLinkLocale>
</template>
