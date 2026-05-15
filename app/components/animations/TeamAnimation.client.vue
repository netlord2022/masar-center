<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue"

const isVisible = ref(false)
const target = ref(null)

const { stop } = useIntersectionObserver(target, ([entry]) => {
  if (entry.isIntersecting) {
    isVisible.value = true
    stop()
  }
})
</script>

<template>
  <div ref="target">
    <DotLottieVue
      v-if="isVisible"
      src="/animations/team.lottie"
      loop
      autoplay
      style="height: 200px; width: 200px"
    />
  </div>
</template>
