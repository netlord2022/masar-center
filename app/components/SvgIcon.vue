<!-- eslint-disable vue/html-self-closing -->
<template>
  <svg
    :class="size"
    :viewBox="viewBox"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="relative block flex-none"
    :width="width"
    :height="height"
    v-html="svgContent"
  ></svg>
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: string
  width?: string
  height?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: "w-full h-full",
  width: "24",
  height: "24",
})
const svgContent = computed(() => {
  switch (props.name) {
    case "chev-down":
      return '<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>'
    case "de-flag":
      return '  <path fill="#fc0" d="M0 320h640v160H0z"/><path fill="#000001" d="M0 0h640v160H0z"/><path fill="red" d="M0 160h640v160H0z"/>'
    case "gb-flag":
      return '  <path fill="#012169" d="M0 0h640v480H0z"/><path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z"/><path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z"/><path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z"/><path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z"/>'
    case "sy-flag":
      return '<path d="M0 0h640v480H0Z" fill="#000"/><path fill="#fff" d="M0 0h640v320H0Z"/><path fill="#007a3d" d="M0 0h640v160H0Z"/><path fill="#ce1126" d="m101 300 39-120 39 120-102-74.2h126M461 300l39-120 39 120-102-74.2h126M281 300l39-120 39 120-102.1-74.2h126.2"/>'
    case "moon-outline":
      return '<path d="M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216 88.68 0 166.73-51.57 200-128-26.39 11.49-57.38 16-88 16-119.29 0-216-96.71-216-216z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/>'
    case "sunny-outline":
      return '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 48v48M256 416v48M403.08 108.92l-33.94 33.94M142.86 369.14l-33.94 33.94M464 256h-48M96 256H48M403.08 403.08l-33.94-33.94M142.86 142.86l-33.94-33.94"/><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/>'
    case "arrow-right":
      return '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M268 112l144 144-144 144M392 256H100"/>'
    default:
      return ""
  }
})
const viewBox = computed(() => {
  switch (props.name) {
    case "chev-down":
      return "0 0 24 24"
    case "de-flag":
    case "gb-flag":
    case "sy-flag":
      return "0 0 640 480"
    case "moon-outline":
    case "sunny-outline":
    case "arrow-right":
      return "0 0 512 512"
    default:
      return "0 0 40 40"
  }
})
</script>
