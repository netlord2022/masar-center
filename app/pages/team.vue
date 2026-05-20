<script setup lang="ts">
const { t } = useI18n()
definePageMeta({
  title: "team",
})
useHead({
  meta: [
    { property: "og:title", content: t("team") },
    { property: "og:description", content: t("teams.subtitle") },
    { name: "description", content: t("teams.subtitle") },
  ],
})
const showCards = ref(false)
const { teamMembers } = useTeamData()

const ourTeamDescription = computed(() => {
  // Replaces '. ' or '.' with '.\n' and trims extra spaces
  return t("teams.subtitle").replaceAll(/\.\s*/g, ".\n")
})

onMounted(async () => {
  await nextTick()
  await setTimeout(() => {
    requestAnimationFrame(() => {
      showCards.value = true
    })
  }, 50)
})
</script>
<template>
  <section id="team" class="pt-16 md:pt-24 w-full min-h-screen">
    <h1
      class="text-5xl font-bold text-center text-primary dark:text-white rtl:font-arabic"
    >
      {{ $t("teams.title") }}
    </h1>
    <div class="max-w-7xl mx-auto mb-20 space-y-6 px-6">
      <p
        class="text-center text-gray-600 dark:text-gray-300 whitespace-pre-line mt-4"
      >
        {{ ourTeamDescription }}
      </p>
    </div>

    <div
      class="max-w-7xl mx-auto grid gap-8 px-6 md:grid-cols-2 lg:grid-cols-3"
      dir="ltr"
    >
      <NuxtLinkLocale
        v-for="(member, index) in teamMembers"
        :key="index"
        :to="`/teams/${member.slug}`"
        class="bg-white dark:bg-gray-800 transition-transform duration-1200 ease-in-out p-8 rounded-2xl shadow border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center hover:bg-blue-50 dark:hover:bg-gray-600"
        :class="[
          showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-100',
        ]"
        :style="`transitionDelay: ${index * 150}ms; `"
      >
        <div class="flex flex-col items-center">
          <img
            :src="member.photo"
            :alt="member.name"
            class="w-40 h-40 rounded-full object-cover mb-4 border-2 border-primary dark:border-secondary"
          />
          <h3 class="text-xl font-semibold dark:text-white">
            {{ member.name }}
          </h3>
          <p class="text-sm text-gray-500 mb-4 dark:text-gray-300">
            {{ member.role }}
          </p>
        </div>
      </NuxtLinkLocale>
    </div>
    <div v-show="showCards" class="w-full flex justify-center my-16 lg:my-24">
      <AnimationsTeamAnimation
        class="flex self-center text-center w-auto content-center"
      />
    </div>
  </section>
</template>
