<script setup lang="ts">
import type { Post } from "../../type/post"
defineProps<{
  post: Post
}>()
</script>
<template>
  <div>
    <p
      class="text-xs font-bold tracking-widest uppercase text-secondary mb-4 flex items-center gap-1"
    >
      <span>{{ $t("blog.new") }}</span>

      <span class="relative flex size-2">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
        />
        <span class="relative inline-flex size-2 rounded-full bg-sky-500" />
      </span>
    </p>

    <NuxtLinkLocale
      :to="`/blog/${post.slug}`"
      class="group grid md:grid-cols-2 rounded-2xl overflow-hidden border border-gray-300 dark:border-white/10 bg-white dark:bg-white/10 mb-14 hover:border-primary transition-all duration-300 hover:-translate-y-1"
    >
      <!-- Cover image -->
      <div class="relative bg-primary min-h-56 md:min-h-auto overflow-hidden">
        <NuxtImg
          v-if="post.content?.cover_image?.filename"
          :src="post.content.cover_image.filename"
          :alt="post.content.title"
          provider="storyblok"
          class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
          loading="eager"
          decoding="async"
          format="webp"
          fetchpriority="high"
        />
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <!-- Lottie placeholder: replace with DotLottieVue if you have an animation -->
          <div
            class="w-24 h-24 bg-white/15 rounded-full flex items-center justify-center text-5xl"
          >
            🎓
          </div>
        </div>
        <!-- Overlay gradient -->
        <div
          class="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent"
        />
      </div>

      <!-- Body -->
      <div class="p-8 flex flex-col justify-center">
        <div class="flex items-center gap-2 mb-4">
          <span
            v-if="post.content.tags?.[0].tag"
            class="inline-block bg-primary/10 text-primary dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit"
          >
            {{ post.content.tags[0].tag }}
          </span>
          <span
            v-if="post.content.tags?.[1].tag"
            class="inline-block bg-primary/10 text-primary dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit"
          >
            {{ post.content.tags[1].tag }}
          </span>
        </div>

        <h2
          class="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors"
        >
          {{ post.content.title }}
        </h2>

        <p
          class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 line-clamp-3"
        >
          {{ post.content.excerpt }}
        </p>

        <div class="flex items-center gap-3 text-xs text-gray-400 mb-5">
          <div
            class="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold p-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0116 16v288a16 16 0 01-16 16c-128 0-177.45 25.81-208 64-30.37-38-80-64-208-64-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0116-16c131.57.59 192 32.84 208 96zM256 160v288"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
            </svg>
          </div>
          <span> {{ $t("blog.masarTeam") }}</span>
          <span class="w-1 h-1 bg-secondary rounded-full" />
          <span>{{ useDateFormatter(post.content.date) }}</span>
          <span class="w-1 h-1 bg-gray-300 rounded-full" />
        </div>

        <span
          class="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl w-fit group-hover:bg-primary/90 transition-colors"
        >
          {{ $t("blog.readArticle") }}
        </span>
      </div>
    </NuxtLinkLocale>
  </div>
</template>
