<script setup lang="ts">
import { refDebounced } from "@vueuse/core"

const { sbLocale } = useStoryblokLocale()
const storyblok = useStoryblokApi()

definePageMeta({ title: "blog.title" })

const search = ref("")
const page = ref(1)
const perPage = 10

const searchInput = ref("")
const debouncedSearchInput = refDebounced(searchInput, 700)

watch(debouncedSearchInput, (newVal) => {
  search.value = newVal
  page.value = 1
})

const { data, status } = await useAsyncData(
  `blog-posts-${sbLocale.value}`,
  async () => {
    const params: Record<string, unknown> = {
      starts_with: "blog/",
      language: sbLocale.value,
      sort_by: "content.date:desc",
      per_page: perPage,
      page: page.value,
      version: process.env.NODE_ENV === "production" ? "published" : "draft",
      resolve_links: "url",
    }

    if (search.value.trim()) {
      params.search_term = search.value.trim()
    }

    const res = await storyblok.get("cdn/stories", params)

    return {
      stories: res.data.stories,
      total: Number(res.headers?.total ?? 0),
    }
  },
  {
    watch: [page, sbLocale, search],
    server: true,
    lazy: true,
    default: () => ({ stories: [], total: 0 }),
    getCachedData(key, nuxtApp) {
      if (nuxtApp.isHydrating) {
        return nuxtApp.payload.data[key]
      }
      return undefined
    },
  }
)

const posts = computed(() => data.value?.stories ?? [])
const total = computed(() => data.value?.total ?? 0)

const lastPosts = ref<typeof posts.value>([])
watch(posts, (val) => {
  if (val?.length) lastPosts.value = val
})

const displayPosts = computed(() =>
  status.value === "pending" ? lastPosts.value : posts.value
)
const totalPages = computed(() => Math.ceil(total.value / perPage))
const featured = computed(() => posts.value?.[0] ?? null)
const nonFeatured = computed(() =>
  searchInput.value?.length ? posts.value : posts.value?.slice(1)
)
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 pt-8 pb-20 w-full">
    <!-- Header -->

    <div
      class="w-full mb-12 flex flex-col md:flex-row md:items-center gap-4 justify-between"
    >
      <section class="w-full max-w-7xl mx-auto px-6 pb-10 text-center">
        <div
          class="inline-flex items-center gap-2 bg-primary/8 dark:bg-primary/15 border border-primary/20 text-primary dark:text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase animate-fade-up"
        >
          <span class="w-2 h-2 bg-secondary rounded-full animate-pulse" />
          {{ $t("blog.masarBlog") }}
        </div>

        <i18n-t
          keypath="blog.headline"
          tag="h1"
          class="text-4xl md:text-5xl font-black text-primary dark:text-white leading-tight mb-4 animate-fade-up animation-delay-100"
        >
          <template #journey>
            <span class="text-secondary">
              {{ $t("blog.journey_word") }}
            </span>
          </template>
        </i18n-t>
        <p
          class="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto mb-8 leading-relaxed animate-fade-up animation-delay-200"
        >
          {{ $t("blog.description") }}
        </p>

        <!-- Search -->
        <StoryblokSearchPost
          v-model="searchInput"
          class="relative w-full md:w-72"
        />
      </section>
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
      :class="{ 'opacity-60': status === 'pending' }"
    >
      <StoryblokState :length="displayPosts?.length" />

      <StoryblokFeatured v-if="featured && !search" :post="featured" />
      <p
        v-if="nonFeatured.length > 1"
        class="text-xs font-bold tracking-widest uppercase text-secondary mt-8 mb-4 flex items-center gap-1"
      >
        {{ $t("blog.readMore") }}
      </p>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 dar:text-white">
        <StoryblokPostCard
          v-for="(post, index) in nonFeatured"
          :key="post.uuid"
          :post="post"
          :index="index"
        />
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="status !== 'pending'"
      class="text-center py-24 text-gray-400"
    >
      <p class="text-xl">{{ $t("blog.empty") }}</p>
    </div>

    <!-- Pagination  -->
    <div
      v-if="totalPages > 1"
      dir="ltr"
      class="flex justify-center items-center gap-2 mt-16"
    >
      <button
        :disabled="page === 1"
        class="cursor-pointer disabled:cursor-not-allowed px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        @click="page--"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon text-primary dark:text-secondary w-4 h-6"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="48"
            d="M244 400L100 256l144-144M120 256h292"
          />
        </svg>
      </button>

      <button
        v-for="p in totalPages"
        :key="p"
        :class="[
          'px-4 py-2 rounded-lg border transition-colors',
          p === page
            ? 'bg-primary text-white border-primary'
            : 'cursor-pointer border-gray-300 text-gray-800 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800',
        ]"
        @click="page = p"
      >
        {{ p }}
      </button>

      <button
        :disabled="page === totalPages"
        class="cursor-pointer disabled:cursor-not-allowed px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        @click="page++"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon text-primary dark:text-secondary w-4 h-6"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="48"
            d="M268 112l144 144-144 144M392 256H100"
          />
        </svg>
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
