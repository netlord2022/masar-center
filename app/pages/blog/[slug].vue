<script setup lang="ts">
const route = useRoute()
const { sbLocale } = useStoryblokLocale()
const slug = route.params.slug as string
const storyblokApi = useStoryblokApi()

// Consolidate into a single network request block
const { data: pageData } = await useAsyncData(
  `blog-post-detail-${slug}-${sbLocale.value}`,
  async () => {
    // 1. Fetch the main post first
    const postRes = await storyblokApi
      .get(`cdn/stories/blog/${slug}`, {
        version: "published",
        language: sbLocale.value,
      })
      .catch(() => null) // Catch errors smoothly to allow manual 404 handling below

    const story = postRes?.data?.story

    // Early exit: If the post doesn't exist, don't waste time fetching related posts
    if (!story) {
      return { story: null, relatedPosts: [] }
    }

    // 2. Fetch related posts immediately after inside the same loop
    const rawTags = story.content?.tags || []
    let relatedStories = []

    if (rawTags.length > 0) {
      const tagsString = rawTags.map((item: string) => item.tag).join(",")

      const relatedRes = await storyblokApi
        .get("cdn/stories", {
          starts_with: "blog/",
          language: sbLocale.value,
          "filter_query[tags][0, 1, 2, 3]": tagsString,
          per_page: 3,
          version: "published",
          excluding_slugs: `blog/${slug}`, // Exclude current post
        })
        .catch(() => ({ data: { stories: [] } })) // Fallback if related fetch fails

      relatedStories = relatedRes.data?.stories || []
    }

    return {
      story,
      relatedPosts: relatedStories,
    }
  }
)

// Handle 404 early before processing computed hooks or SEO metadata
if (!pageData.value?.story) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
    fatal: true, // "fatal: true" forces Nuxt to show the error screen even on client-side SPA navigation
  })
}

// Unpack the consolidated data cleanly for your template
const story = computed(() => pageData.value?.story)
const relatedPosts = computed(() => pageData.value?.relatedPosts)

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
    <!-- Related Posts -->
    <section v-if="relatedPosts?.length" class="max-w-3xl mx-auto px-4 pb-16">
      <h2 class="text-2xl font-bold mb-6 dark:text-white">
        {{ $t("blog.related") }}
      </h2>
      <div class="grid gap-6 md:grid-cols-3 dark:text-white">
        <NuxtLinkLocale
          v-for="post in relatedPosts"
          :key="post.uuid"
          :to="`/blog/${post.slug}`"
          class="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
        >
          <div class="h-36 overflow-hidden bg-gray-100 dark:bg-gray-800">
            <NuxtImg
              v-if="post.content.cover_image?.filename"
              provider="storyblok"
              :src="post.content.cover_image.filename"
              :alt="post.content.title"
              width="300"
              height="150"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div class="p-4">
            <p class="text-xs text-gray-400 mb-1">{{ post.content.date }}</p>
            <h3
              class="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2"
            >
              {{ post.content.title }}
            </h3>
          </div>
        </NuxtLinkLocale>
      </div>
    </section>
  </article>
</template>
