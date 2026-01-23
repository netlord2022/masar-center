<script setup>
const { tm, t } = useI18n()

const faqItems = computed(() => {
  const raw = tm("faq.items")
  if (!Array.isArray(raw)) return []

  return raw.map((_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))
})
</script>

<template>
  <div class="max-w-xl mx-auto mt-20 mb-40 space-y-6 px-6">
    <h2
      class="text-3xl md:text-4xl font-bold text-center mb-8 text-primary dark:text-white"
    >
      {{ $t("faqTitle") }}
    </h2>
    <FaqBox
      v-for="(item, index) in faqItems"
      :key="index"
      :title="item.question"
      :text="item.answer"
    />
  </div>
</template>
