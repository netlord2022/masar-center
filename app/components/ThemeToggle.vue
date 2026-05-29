<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === "dark"
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
  },
})
// Sync theme-color with the resolved color mode
const THEME_LIGHT = "#1a6b4a" // your brand green
const THEME_DARK = "#0d4d35" // darker shade for dark mode

useHead({
  meta: computed(() => [
    {
      name: "theme-color",
      media: `(prefers-color-scheme: ${isDark.value ? "dark" : "light"})`,
      content: isDark.value ? THEME_DARK : THEME_LIGHT,
    },
  ]),
})
</script>

<template>
  <button
    class="transition-colors duration-150 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 text-black dark:text-white rounded-lg h-6 w-6 text-center flex items-center justify-center"
    title="Dark / Light"
    @click="isDark = !isDark"
  >
    <span class="sr-only">Choose theme: dark/night</span>
    <SvgIcon
      :name="isDark ? 'sunny-outline' : 'moon-outline'"
      size="w-4 h-4"
      width="16"
      height="16"
    />
  </button>
</template>
