<script setup lang="ts">
import type { Collections } from "@nuxt/content"

const route = useRoute()
const { locale } = useI18n()

// path must match exactly what Content stores: /blog/hello-world
const path = computed(() => {
  const prefix = locale.value === "en" ? "" : `/${locale.value}`
  return `${prefix}/blog/${route.params.slug}`
})

const { data: post } = await useAsyncData(
  `post-${locale.value}-${route.params.slug}`,
  async () => {
    const collection = ("blog_" + locale.value) as keyof Collections
    const content = await queryCollection(collection).path(path.value).first()

    // fallback to English if translation missing
    if (!content && locale.value !== "en") {
      return await queryCollection("blog_en").path(path.value).first()
    }
    return content
  },
  { watch: [locale] }
)

// show 404 if nothing found
if (!post.value) {
  throw createError({ statusCode: 404 })
}
</script>

<template>
  <div class="w-full max-w-7xl mx-auto dark:text-white px-6 py-12">
    <article v-if="post">
      <h1 class="text-3xl rtl:font-arabic">{{ post.title }}</h1>
      <ContentRenderer :value="post" />
    </article>
  </div>
</template>
