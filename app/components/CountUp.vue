<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to: number
    duration?: number
    prefix?: string
    suffix?: string
  }>(),
  {
    duration: 2000,
    prefix: "",
    suffix: "",
  }
)

const count = ref(0)
const el = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) return
      observer.disconnect()

      const start = performance.now()
      const step = (now: number) => {
        const progress = Math.min((now - start) / props.duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        count.value = Math.floor(eased * props.to)
        if (progress < 1) requestAnimationFrame(step)
        else count.value = props.to
      }
      requestAnimationFrame(step)
    },
    { threshold: 0.3 }
  )
  if (el.value) observer.observe(el.value)
})
</script>

<template>
  <span ref="el">{{ prefix }}{{ count }}{{ suffix }}</span>
</template>
