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

watch(debouncedSearchInput, (newVal) => {
  search.value = newVal
  page.value = 1
})

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
    watch: [page, sbLocale, search],
    lazy: true,
    default: () => [],
    getCachedData(key, nuxtApp) {
      // Only serve the cached payload during initial SSR hydration
      if (nuxtApp.isHydrating) {
        return nuxtApp.payload.data[key]
      }
      // Return undefined for any user action (search/page changes) to force a live fetch
      return undefined
    },
  }
)
const lastPosts = ref([])

watch(posts, (val) => {
  if (val?.length) lastPosts.value = val
})

const displayPosts = computed(() =>
  status.value === "pending" ? lastPosts.value : (posts.value ?? [])
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
      <StoryblokSearchPost
        v-model="searchInput"
        class="relative w-full md:w-72"
      />
    </div>
    <!-- Loading -->

    <Transition name="fade">
      <div
        v-if="status === 'pending'"
        class="absolute inset-0 z-10 flex items-center justify-center bg-white/60 dark:bg-black/40 backdrop-blur-[1px]"
      >
        <LazyAnimationsLoader class="w-16 md:w-20" />
      </div>
    </Transition>

    <div
      v-if="displayPosts.length"
      class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 dar:text-white"
      :class="{ 'opacity-60': status === 'pending' }"
    >
      <StoryblokPostCard
        v-for="(post, index) in posts"
        :key="post.uuid"
        :post="post"
        :index="index"
      />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="status !== 'pending'"
      class="text-center py-24 text-gray-400"
    >
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
<style scoped>
.search-input::-ms-clear {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
