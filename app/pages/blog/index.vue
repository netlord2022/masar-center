<script setup lang="ts">
const search = ref("")

const { data: posts } = await useAsyncData(
  "blog-list",
  () => queryCollection("blog").order("date", "DESC").all(),
  { immediate: true }
)

const featured = computed(() => posts.value?.[0] ?? null)

const filtered = computed(() => {
  const rest = posts.value?.slice(1) ?? []
  if (!search.value.trim()) return rest
  const q = search.value.toLowerCase()
  return rest.filter(
    (p) =>
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.tags?.some((t: string) => t.toLowerCase().includes(q))
  )
})

function readTime(post: unknown): string {
  const words = (post.body?.children?.length ?? 0) * 10
  const mins = Math.max(1, Math.round(words / 200))
  return `${mins} دقائق`
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("ar-SY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

useSeoMeta({
  title: "مدونة مسار — مقالات التأشيرات والدراسة في ألمانيا",
  description: "دليلك الأمين في التأشيرات والدراسة والإقامة في ألمانيا",
  ogTitle: "مدونة مسار",
  ogDescription: "مقالات تُسهّل رحلتك إلى ألمانيا",
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-dark" dir="rtl">
    <!-- Hero -->
    <section class="w-full max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
      <div
        class="inline-flex items-center gap-2 bg-primary/8 dark:bg-primary/15 border border-primary/20 text-primary dark:text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase animate-fade-up"
      >
        <span class="w-2 h-2 bg-secondary rounded-full animate-pulse" />
        مدونة مسار
      </div>

      <h1
        class="text-4xl md:text-5xl font-black text-primary dark:text-white leading-tight mb-4 animate-fade-up animation-delay-100"
      >
        مقالات تُسهّل
        <span class="text-secondary"> رحلتك </span>
        إلى ألمانيا
      </h1>

      <p
        class="text-gray-500 dark:text-gray-400 text-base max-w-xl mx-auto mb-8 leading-relaxed animate-fade-up animation-delay-200"
      >
        دليلك الأمين في التأشيرات، الدراسة، والإقامة — بأقلام خبراء ميدانيين
      </p>

      <!-- Search -->
      <div
        class="flex items-center gap-3 max-w-md mx-auto bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full px-5 py-3 focus-within:border-primary transition-colors duration-200 animate-fade-up animation-delay-300"
      >
        <input
          v-model="search"
          type="search"
          placeholder="ابحث في المقالات..."
          class="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 outline-none"
        />
      </div>
    </section>

    <!-- Stats -->
    <section class="w-full max-w-7xl mx-auto px-6 mb-12">
      <div
        class="grid grid-cols-3 gap-4 max-w-md mx-auto animate-fade-up animation-delay-400"
      >
        <div
          v-for="stat in [
            { num: posts?.length ?? 0, label: 'مقالة' },
            { num: '12k', label: 'قارئ شهري' },
            { num: '9', label: 'تصنيف' },
          ]"
          :key="stat.label"
          class="bg-gray-50 dark:bg-white/5 rounded-xl p-4 text-center border border-gray-100 dark:border-white/10"
        >
          <div class="text-2xl font-black text-primary dark:text-blue-400">
            {{ stat.num }}
          </div>
          <div class="text-xs text-gray-400 mt-0.5">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <div class="w-full max-w-7xl mx-auto px-6 pb-20">
      <!-- Featured post -->
      <template v-if="featured && !search">
        <p
          class="text-xs font-bold tracking-widest uppercase text-secondary mb-4"
        >
          مميز
        </p>

        <NuxtLinkLocale
          :to="featured.path"
          class="group grid md:grid-cols-2 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 mb-14 hover:border-primary transition-all duration-300 hover:-translate-y-1"
        >
          <!-- Cover image -->
          <div
            class="relative bg-primary min-h-56 md:min-h-auto overflow-hidden"
          >
            <NuxtImg
              v-if="featured.photo"
              :src="featured.photo"
              :alt="featured.title"
              class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
            <div
              v-else
              class="absolute inset-0 flex items-center justify-center"
            >
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
            <span
              v-if="featured.tags?.[0]"
              class="inline-block bg-primary/10 text-primary dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit"
            >
              {{ featured.tags[0] }}
            </span>

            <h2
              class="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-primary transition-colors"
            >
              {{ featured.title }}
            </h2>

            <p
              class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-5 line-clamp-3"
            >
              {{ featured.description }}
            </p>

            <div class="flex items-center gap-3 text-xs text-gray-400 mb-5">
              <div
                class="w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold"
              >
                م
              </div>
              <span>فريق مسار</span>
              <span class="w-1 h-1 bg-secondary rounded-full" />
              <span>{{ formatDate(featured.date) }}</span>
              <span class="w-1 h-1 bg-gray-300 rounded-full" />
              <span>{{ readTime(featured) }}</span>
            </div>

            <span
              class="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-xl w-fit group-hover:bg-primary/90 transition-colors"
            >
              اقرأ المقال
            </span>
          </div>
        </NuxtLinkLocale>
      </template>

      <!-- Posts grid -->
      <p
        class="text-xs font-bold tracking-widest uppercase text-secondary mb-5"
      >
        {{ search ? "نتائج البحث" : "أحدث المقالات" }}
      </p>

      <!-- Empty state -->
      <div v-if="filtered.length === 0" class="text-center py-20 text-gray-400">
        <div class="text-5xl mb-4">🔍</div>
        <p class="text-base">لا توجد مقالات مطابقة للبحث</p>
        <button
          class="mt-4 text-sm text-primary underline"
          @click="search = ''"
        >
          مسح البحث
        </button>
      </div>

      <!-- Cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <NuxtLinkLocale
          v-for="(post, i) in filtered"
          :key="post.path"
          :to="post.path"
          class="group bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden hover:border-primary hover:-translate-y-1.5 transition-all duration-300"
          :style="`animation: fadeUp .5s ${i * 0.07}s ease both`"
        >
          <!-- Thumbnail -->
          <div class="relative h-44 overflow-hidden bg-primary/10">
            <NuxtImg
              v-if="post.photo"
              :src="post.photo"
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              format="webp"
              loading="lazy"
              width="400"
              height="176"
            />
            <div
              v-else
              class="absolute inset-0 flex items-center justify-center text-4xl bg-gradient-to-br from-primary to-blue-500"
            >
              📄
            </div>
            <!-- Tag badge -->
            <span
              v-if="post.tags?.[0]"
              class="absolute top-3 inset-e-3 bg-white/90 dark:bg-black/60 text-primary dark:text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm"
            >
              {{ post.tags[0] }}
            </span>
          </div>

          <!-- Card body -->
          <div class="p-5">
            <h3
              class="font-bold text-gray-900 dark:text-white leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors text-sm"
            >
              {{ post.title }}
            </h3>
            <p class="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
              {{ post.description }}
            </p>
            <div
              class="flex items-center justify-between text-xs text-gray-400"
            >
              <span>{{ formatDate(post.date) }}</span>
              <span class="flex items-center gap-1">
                {{ readTime(post) }}
              </span>
            </div>
          </div>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-up {
  animation: fadeUp 0.6s ease both;
}
.animation-delay-100 {
  animation-delay: 0.1s;
}
.animation-delay-200 {
  animation-delay: 0.2s;
}
.animation-delay-300 {
  animation-delay: 0.3s;
}
.animation-delay-400 {
  animation-delay: 0.4s;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
