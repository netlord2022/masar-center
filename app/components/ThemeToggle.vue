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
</script>

<template>
  <button
    class="transition-colors duration-150 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg h-6 w-6 text-center flex items-center justify-center"
    @click="isDark = !isDark"
  >
    <NuxtImg
      v-show="isDark !== true"
      src="/moon-outline.svg"
      alt="moon Icon"
      class="h-4 w-4 text-black"
      width="16"
      height="16"
    />
    <NuxtImg
      v-show="isDark === true"
      src="/sunny-outline.svg"
      alt="sunny Icon"
      class="h-4 w-4 text-white invert"
      width="16"
      height="16"
    />
  </button>
</template>
