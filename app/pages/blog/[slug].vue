<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const { sbLocale } = useStoryblokLocale()
const slug = route.params.slug as string
const storyblokApi = useStoryblokApi()
const img = useImage()

// Consolidate into a single network request block
const { data: pageData } = await useAsyncData(
  `blog-post-detail-${slug}-${sbLocale.value}`,
  async () => {
    // 1. Fetch the main post first
    const postRes = await storyblokApi
      .get(`cdn/stories/blog/${slug}`, {
        version: "published",
        language: sbLocale.value,
        resolve_links: "url",
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
  },
  { watch: [sbLocale] }
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

const seoImg = img(
  story.value?.content?.cover_image?.filename,
  {
    provider: "storyblok",
    width: 300,
    quality: 70,
    format: "webp",
  },
  {
    provider: "storyblok",
    storyblok: {
      baseURL: "https://a.storyblok.com",
    },
  }
)

useSeoMeta({
  title: () =>
    (story.value?.content?.seo_title || story.value?.content?.title || "Blog") +
    " | " +
    t("masar"),
  ogImage: () => seoImg,

  description: () =>
    story.value?.content?.seo_description ||
    story.value?.content?.excerpt ||
    "",
})
</script>

<template>
  <article class="container mx-auto max-w-3xl py-10">
    <NuxtLinkLocale
      dir="ltr"
      to="blog"
      class="text-left self-start text-primary dark:text-white rtl:self-end rtl:text-right flex hover:underline"
    >
      <SvgIcon name="arrow-right" size="w-5 h-5  scale-x-[-1] mt-0.5 mx-1" />
      back to blog</NuxtLinkLocale
    >
    <StoryblokComponent v-if="story" :blok="story.content" />
    <!-- Related Posts -->
    <section v-if="relatedPosts?.length" class="max-w-3xl mx-auto px-4 pb-16">
      <h2 class="text-2xl font-bold mb-6 dark:text-white">
        {{ $t("blog.related") }}
      </h2>
      <div class="grid gap-6 grid-cols-2 md:grid-cols-3 dark:text-white">
        <LazyStoryblokPostCard
          v-for="(post, index) in relatedPosts"
          :key="post.uuid"
          :post="post"
          :index="index"
          is-related
        />
      </div>
    </section>
  </article>
</template>
