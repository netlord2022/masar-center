<script setup lang="ts">
import { refDebounced } from "@vueuse/core"

const { sbLocale } = useStoryblokLocale()
const storyblok = useStoryblokApi()

definePageMeta({ title: "blog.title" })

const search = ref("")
const page = ref(1)
const perPage = 9
const total = ref(0)

const searchInput = ref("")
const debouncedSearchInput = refDebounced(searchInput, 700)

// 1. Correctly watch the debounced input to trigger updates
watch(debouncedSearchInput, (newVal) => {
  search.value = newVal
  page.value = 1 // Excellent fix to reset pagination
})

// 2. Fetch data with a stable cache key per language
const { data: posts, status } = await useAsyncData(
  `blog-posts-${sbLocale.value}`,
  async () => {
    const params: Record<string, unknown> = {
      starts_with: "blog/",
      language: sbLocale.value,
      sort_by: "content.date:desc",
      per_page: perPage,
      page: page.value,
      version: "published",
    }

    if (search.value.trim()) {
      params.search_term = search.value.trim()
    }

    const res = await storyblok.get("cdn/stories", params)
    total.value = Number(res.headers?.total ?? 0)
    return res.data.stories
  },
  {
    // Nuxt will automatically re-run the async function whenever any of these change
    watch: [page, sbLocale, search],
  }
)

const totalPages = computed(() => Math.ceil(total.value / perPage))
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-16 w-full">
    <!-- Header -->
    <div
      class="w-full mb-12 flex flex-col md:flex-row md:items-center gap-4 justify-between"
    >
      <h1 class="text-4xl font-bold">{{ $t("blog.title") }}</h1>

      <!-- Search -->
      <div class="relative w-full md:w-72">
        <input
          v-model="searchInput"
          type="search"
          :placeholder="$t('blog.search')"
          class="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <span class="absolute right-3 top-2.5 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
        </span>
      </div>
    </div>
    <!-- Loading -->
    <div
      v-if="status === 'pending'"
      class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="i in perPage"
        :key="i"
        class="rounded-2xl bg-gray-100 dark:bg-gray-800 animate-pulse h-72"
      />
    </div>

    <!-- Posts grid -->
    <div
      v-else-if="posts?.length"
      class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 dar:text-white"
    >
      <NuxtLink
        v-for="post in posts"
        :key="post.uuid"
        :to="`/blog/${post.slug}`"
        class="group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
      >
        <div class="overflow-hidden h-48 bg-gray-100 dark:bg-gray-800">
          <NuxtImg
            v-if="post.content.cover_image?.filename"
            :src="post.content.cover_image.filename"
            :alt="post.content.title"
            width="400"
            height="200"
            format="webp"
            loading="lazy"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="p-5">
          <p class="text-xs text-gray-400 dark:text-gray-200 mb-2">
            {{ post.content.date }}
          </p>
          <h2
            class="font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2"
          >
            {{ post.content.title }}
          </h2>
          <p class="text-sm text-gray-500 dark:text-gray-200 mt-2 line-clamp-3">
            {{ post.content.excerpt }}
          </p>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-24 text-gray-400">
      <p class="text-xl">{{ $t("blog.empty") }}</p>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex justify-center items-center gap-2 mt-16"
    >
      <button
        :disabled="page === 1"
        class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        @click="page--"
      >
        ←
      </button>

      <button
        v-for="p in totalPages"
        :key="p"
        :class="[
          'px-4 py-2 rounded-lg border transition-colors',
          p === page
            ? 'bg-primary text-white border-primary'
            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800',
        ]"
        @click="page = p"
      >
        {{ p }}
      </button>

      <button
        :disabled="page === totalPages"
        class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        @click="page++"
      >
        →
      </button>
    </div>
  </div>
</template>
