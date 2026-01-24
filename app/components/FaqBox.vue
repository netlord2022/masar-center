<template>
  <div
    class="w-full flex flex-col border rounded-tl-xl rounded-br-xl border-primary/20 dark:border-gray-200 p-4 md:p-6 z-10"
  >
    <button
      class="flex justify-between cursor-pointer items-center"
      @click.prevent="more = !more"
    >
      <div class="w-auto">
        <h3 class="text-primary dark:text-white font-bold">{{ title }}</h3>
      </div>
      <div
        class="w-auto z-10 cursor-pointer text-secondary transition-all duration-300 ease-linear"
        :class="more ? 'rotate-135' : '  rotate-0'"
      >
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          class="relative block flex-none w-4 h-4"
          viewBox="0 0 16 16"
        >
          <path d="M16 7H9V0H7V7H0V9H7V16H9V9H16V7Z" fill="currentColor" />
        </svg>
      </div>
    </button>
    <div
      class="w-full transition-all duration-300 overflow-hidden ease-linear"
      :style="heightClass"
    >
      <div
        ref="content"
        class="w-full"
        :class="!text || text == '' ? '' : 'pt-6'"
      >
        <div class="text-sm md:text-base text-primary dark:text-white">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const more = ref(false)
const content = useTemplateRef("content")
const height = computed(() => {
  const el = content.value?.offsetHeight || 0
  return el
})
const heightClass = computed(() => {
  const opened = height.value + 12
  if (more.value) {
    return `height: ${opened}px;`
  } else {
    return "height: 0px;"
  }
})
defineProps<{
  title: string
  text: string
}>()
</script>

<style></style>
