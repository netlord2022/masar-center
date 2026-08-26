<script setup lang="ts">
const props = defineProps<{ length?: number }>()
const { t } = useI18n()
const stats: { num: number; label: string; unit?: string }[] = [
  { num: props.length ?? 0, label: t("blog.posts") },
  { num: 3, label: t("blog.reader"), unit: "k" },
  { num: 7, label: t("blog.categories") },
]
</script>
<template>
  <section class="w-full max-w-7xl mx-auto px-6 mb-12 flex flex-col gap-4">
    <div
      class="grid grid-cols-3 gap-4 max-w-md mx-auto animate-fade-up animation-delay-400"
    >
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-gray-50 dark:bg-white/5 rounded-xl p-4 text-center border border-gray-100 dark:border-white/20"
      >
        <div class="text-2xl font-black text-primary dark:text-blue-400">
          <CountUp :to="stat.num" :suffix="stat.unit" :duration="1400" />
        </div>
        <div class="text-xs text-gray-400 mt-0.5">{{ stat.label }}</div>
      </div>
    </div>
  </section>
</template>
