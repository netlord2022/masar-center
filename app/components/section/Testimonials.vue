<script setup>
const { tm, t } = useI18n()

const resolvedIcons = [
  resolveComponent("IconsYara"),
  resolveComponent("IconsSalma"),
  resolveComponent("IconsMohammad"),
]

const persons = computed(() => {
  const raw = tm("testimonials.items")
  if (!Array.isArray(raw)) return []

  return raw.map((_, index) => ({
    name: t(`testimonials.items.${index}.name`),
    role: t(`testimonials.items.${index}.role`),
    text: t(`testimonials.items.${index}.text`),
    icon: resolvedIcons[index],
  }))
})
</script>
<template>
  <section id="testimonials" class="w-full bg-gray-50 dark:bg-gray-900 py-6">
    <div class="max-w-7xl mx-auto mt-20 mb-40 space-y-6 px-6">
      <h2
        class="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-white"
      >
        {{ $t("testimonials.title") }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(person, index) in persons"
          :key="index"
          class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
        >
          <div
            class="rounded-full mb-4 object-cover border-2 border-primary-500"
          >
            <component
              :is="person.icon"
              :name="person.icon"
              class="w-36 max-h-36 dark:text-secondary text-blue-300"
            />
          </div>

          <div class="flex mb-4 text-yellow-400">
            <span v-for="star in 5" :key="star" class="text-xl">★</span>
          </div>

          <p class="italic text-gray-600 dark:text-gray-300 mb-6">
            "{{ person.text }}"
          </p>

          <div>
            <h4 class="font-bold text-gray-900 dark:text-white">
              {{ person.name }}
            </h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ person.role }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
