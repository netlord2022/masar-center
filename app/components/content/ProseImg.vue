<template>
  <NuxtImg
    :src="src"
    :alt="alt ?? 'مدونة مسار'"
    :width="width"
    :height="height"
    format="webp"
    loading="lazy"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  width?: string | number
  height?: string | number
}>()
</script>
