<script setup lang="ts">
import { ref, computed } from "vue"
const { t } = useI18n()
const isOpen = ref(false)
const linkClass = computed(
  () =>
    "text-neutral hover:text-brand-light text-primary dark:text-white hover:scale-101  transition duration-150 ease-in-out"
)
const links = computed(() => [
  {
    name: t("home"),
    path: "/",
  },
  {
    name: t("services"),
    path: { path: "/", hash: "#services" },
  },
  {
    name: t("about"),
    path: "/about",
  },
])

const target = useTemplateRef("target")
const ignoreEl = useTemplateRef("ignoreEl")
const close = () => {
  isOpen.value = false
}

onClickOutside(target, () => close(), { ignore: [ignoreEl] })
</script>
<template>
  <!-- Navbar -->
  <header
    class="bg-white shadow-md sticky top-0 z-50 dark:bg-dark dark:text-white"
    role="banner"
  >
    <div
      class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-primary dark:border-secondary/20 md:border-none"
    >
      <button
        ref="ignoreEl"
        class="flex md:hidden mr-10 focus:outline-none rtl:ml-10 rtl:mr-0 menu-toggle flex-col gap-1"
        aria-label="Open menu"
        :class="{ active: isOpen }"
        @click.prevent.stop="isOpen = !isOpen"
      >
        <span
          v-for="i in 3"
          :key="i"
          class="rounded-xs h-[3px] w-[25px] transition duration-300 ease-in-out bg-primary dark:bg-white"
        />
      </button>
      <NuxtLinkLocale to="/" class="flex items-center">
        <div
          class="logo-reveal -mr-3 rtl:mr-0 rtl:-ml-3 md:-ml-3 rtl:md:ml-0 rtl:md:-mr-3"
        >
          <NuxtImg
            src="/masar-logo.png"
            alt="Masar logo"
            width="120"
            height="40"
            class="h-10 w-auto"
            loading="eager"
            decoding="async"
            densities="1x 2x"
            :quality="100"
          />
        </div>
      </NuxtLinkLocale>
      <!-- Desktop Nav -->
      <nav class="space-x-6 hidden md:flex" role="navigation">
        <NuxtLinkLocale
          v-for="(link, index) in links"
          :key="index"
          :to="link.path"
          :class="linkClass"
          >{{ link.name }}</NuxtLinkLocale
        >
      </nav>
      <div class="hidden md:flex items-center gap-2">
        <ThemeToggle />
        <LangSwitcher />
      </div>
    </div>
    <!-- Mobile Nav -->
    <transition name="slide-fade">
      <nav
        v-if="isOpen"
        ref="target"
        class="md:hidden bg-white dark:bg-dark dark:text-white px-6 pb-4 pt-2 flex flex-col space-y-3 absolute left-0 right-0 w-full z-2 shadow-md dark:shadow-secondary/20"
      >
        <NuxtLinkLocale
          v-for="(link, index) in links"
          :key="index"
          :to="link.path"
          :class="linkClass + ' py-2'"
          @click="isOpen = false"
          >{{ link.name }}</NuxtLinkLocale
        >
        <div class="flex items-center gap-2 my-4 pt-4">
          <LangSwitcher @close="isOpen = false" />
          <ThemeToggle />
        </div>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}
.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.5, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.logo-reveal {
  animation: reveal 1s linear forwards;
  overflow: hidden;
  clip-path: inset(0 100% 0% 100%);
}
@keyframes reveal {
  to {
    clip-path: inset(0 0 0 0);
  }
}
</style>
