<script setup lang="ts">
defineProps<{
  name: string
  photoUrl: string
}>()
</script>
<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center gap-1"
    style="background: #0f172a; font-family: Montserrat, sans-serif"
  >
    <img
      :src="photoUrl"
      width="550"
      height="550"
      :alt="name"
      style="border-radius: 5%; object-fit: cover; border: 4px solid #34d399"
    />
    <div class="flex flex-col items-center gap-3 text-white text-center">
      <h1 class="text-5xl font-bold leading-tight">{{ name }}</h1>
    </div>
  </div>
</template>
