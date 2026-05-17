<script setup lang="ts">
const { data: posts } = await useAsyncData("blog-list", () =>
  queryCollection("blog").order("date", "DESC").all()
)
</script>

<template>
  <div class="w-full max-w-7xl mx-auto dark:text-white px-6 py-12">
    <h1
      class="text-3xl pt-3 font-bold text-center text-primary dark:text-white"
    >
      {{ $t("blog") }}
    </h1>
    <div
      class="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl_grid-cols-4 mt-8"
    >
      <NuxtLinkLocale
        v-for="post in posts"
        :key="post.path"
        :to="post.path"
        class="w-full flex flex-col rounded-lg border-2 border-primary shadow-md bg-white p-4 hover:shadow-lg transition-shadow duration-300 dark:bg-dark dark:border-secondary/20 dark:hover:shadow-secondary/20 gap-2 hover:bg-blue-50 dark:hover:bg-gray-700"
      >
        <NuxtImg
          v-if="post.photo"
          :src="post.photo"
          :alt="post.title"
          width="353"
          height="192"
          format="webp"
          loading="lazy"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <NuxtImg
          v-else
          src="/masar-meta-logo.webp"
          alt="Masar blog post image"
          width="353"
          height="192"
          format="webp"
          loading="lazy"
          class="w-full h-48 object-cover rounded-t"
        />
        <h2
          class="text-primary dark:text-secondary text-lg font-bold font-arabic"
        >
          {{ post.title }}
        </h2>
        <p class="line-clamp-2">{{ post.description }}</p>
      </NuxtLinkLocale>
    </div>
  </div>
</template>
