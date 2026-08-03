<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const language = locale.value === "ar" ? "ar" : "default"

const slug = route.params.slug as string

const storyblokApi = useStoryblokApi()

const { data: response } = await useAsyncData(
  `blog-${slug}-${language}`,
  async () => {
    return await storyblokApi.get(`cdn/stories/blog/${slug}`, {
      version: "published",
      language,
    })
  }
)

const story = computed(() => {
  return response.value?.data?.story
})

if (!story.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
  })
}

useSeoMeta({
  title: () =>
    story.value?.content?.seo_title || story.value?.content?.title || "Blog",

  description: () =>
    story.value?.content?.seo_description ||
    story.value?.content?.excerpt ||
    "",
})
</script>

<template>
  <article class="container mx-auto max-w-3xl py-10">
    <StoryblokComponent v-if="story" :blok="story.content" />
  </article>
</template>
