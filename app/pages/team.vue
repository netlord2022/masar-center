<script setup lang="ts">
const sameCounter = useState("counter")
const showCards = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    showCards.value = true
  })
})
</script>
<template>
  <section id="team" class="pt-16 md:pt-24 w-full min-h-screen">
    <h1 class="text-4xl font-bold text-center">Team {{ sameCounter }}</h1>

    <div class="max-w-7xl mx-auto mb-20 space-y-6 px-6">
      <h2 class="text-4xl font-bold text-center">Meet Our Team</h2>
      <p class="text-center text-gray-600">
        Our team is made up of passionate individuals dedicated to making a
        difference.
      </p>
    </div>

    <div
      class="max-w-7xl mx-auto grid gap-12 px-6 md:grid-cols-2 lg:grid-cols-3"
    >
      <div
        class="bg-white transition-all delay-200 fadeInUp ease-in-out dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
        :class="[
          showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        ]"
      >
        <NuxtLinkLocale to="/teams/sandy-nbeaa">
          <img
            src="/hero.webp"
            alt="person.name"
            class="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h3 class="text-xl font-semibold">name 1</h3>
          <p class="text-sm text-gray-500 mb-4">role 1</p>
          <p class="text-gray-600 dark:text-gray-400">bio 1</p>
        </NuxtLinkLocale>
      </div>
      <div
        class="bg-white transition-all delay-400 fadeInUp ease-in-out dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
        :class="[
          showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        ]"
      >
        <NuxtLinkLocale to="/teams/zeinab-marhij">
          <img
            src="/hero.webp"
            alt="person.name"
            class="w-32 h-32 rounded-full object-cover mb-4"
          />
          <h3 class="text-xl font-semibold">name 1</h3>
          <p class="text-sm text-gray-500 mb-4">role 1</p>
          <p class="text-gray-600 dark:text-gray-400">bio 1</p>
        </NuxtLinkLocale>
      </div>
      <div
        class="bg-white transition-all delay-600 fadeInUp ease-in-out dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center"
        :class="[
          showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10',
        ]"
      >
        <img
          src="/hero.webp"
          alt="person.name"
          class="w-32 h-32 rounded-full object-cover mb-4"
        />
        <h3 class="text-xl font-semibold">name 1</h3>
        <p class="text-sm text-gray-500 mb-4">role 1</p>
        <p class="text-gray-600 dark:text-gray-400">bio 1</p>
      </div>
    </div>
  </section>
</template>
<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: none;
  }
}

.fadeInUp {
  transition-duration: 700ms;
}
</style>
