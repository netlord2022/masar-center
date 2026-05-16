<script setup lang="ts">
import type { Collections } from "@nuxt/content"

const { locale } = useI18n()
const localePath = useLocalePath() // ← add this

const { data: posts } = await useAsyncData(
  `blog-list-${locale.value}`, // key must include locale
  () =>
    queryCollection(("blog_" + locale.value) as keyof Collections)
      .order("date", "DESC")
      .all(),
  { watch: [locale] }
)
</script>

<template>
  <div class="w-full max-w-7xl mx-auto dark:text-white px-6 py-12">
    <h1 class="text-3xl">Blog</h1>
    <ul>
      <li v-for="post in posts" :key="post.path">
        <!-- use localePath() so /blog/hello-world → /de/blog/hello-world -->
        <NuxtLink :to="localePath(post.path)">{{ post.title }}</NuxtLink>
        <p>{{ post.description }}</p>
      </li>
    </ul>
  </div>
</template>
