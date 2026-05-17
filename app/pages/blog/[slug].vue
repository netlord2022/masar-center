<script setup lang="ts">
const route = useRoute()

// always query the single Arabic collection regardless of locale
const { data: post } = await useAsyncData(`post-${route.params.slug}`, () =>
  queryCollection("blog").path(`/blog/${route.params.slug}`).first()
)

if (!post.value) {
  throw createError({ statusCode: 404 })
}
useSeoMeta({
  title: post?.value?.seo?.title || post?.value?.title,
  description: post?.value?.seo?.description || post?.value?.description,
  ogTitle: post?.value?.seo?.title || post?.value?.title,
  ogDescription: post?.value?.seo?.description || post?.value?.description,
  ogImage: post?.value?.photo,
})
</script>

<template>
  <div class="w-full max-w-7xl mx-auto dark:text-white px-6 py-12">
    <NuxtLinkLocale
      dir="ltr"
      to="/blog"
      class="text-left text-primary dark:text-white self-start rtl:self-end rtl:text-right flex hover:underline"
    >
      <SvgIcon name="arrow-right" size="w-5 h-5  scale-x-[-1] mt-0.5 mx-1" />
      عودة الى المدونة</NuxtLinkLocale
    >
    <div
      class="mt-8 w-full max-w-2xl mx-auto flex justify-center flex-col gap-6"
    >
      <article v-if="post" class="w-full">
        <h1
          class="text-2xl font-bold py-2 font-arabic text-primary dark:text-white"
        >
          {{ post.title }}
        </h1>
        <NuxtImg
          v-if="post.photo"
          :src="post.photo"
          :alt="post.title"
          width="800"
          height="400"
          format="webp"
          loading="eager"
          class="w-full rounded-xl mb-8 object-cover"
        />

        <ContentRenderer :value="post" />
        <!-- tags -->
        <div class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="bg-primary/10 text-primary dark:text-secondary dark:bg-secondary/10 text-sm font-bold py-1 px-3 rounded-full"
          >
            #{{ tag }}
          </span>
        </div>
      </article>
    </div>
  </div>
</template>
<style scoped>
@reference "./../../assets/css/main.css";

:deep() {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    @apply text-primary dark:text-secondary font-bold py-2;
  }
}
</style>
