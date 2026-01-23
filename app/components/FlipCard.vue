<template>
  <div class="perspective-[1000px] relative">
    <div
      :class="[{ '-rotate-y-180': !showFront }, flipClass]"
      class="relative"
      @click="flip"
    >
      <slot name="front" />
    </div>
    <div
      class="absolute z-1 top-0 left-0"
      :class="[{ 'rotate-y-180': showFront }, flipClass]"
      @click="flip"
    >
      <slot name="back" />
    </div>
  </div>
</template>
<script setup lang="ts">
type Props = {
  classes?: string
}
const props = withDefaults(defineProps<Props>(), {
  classes: "",
})

const showFront = ref(true)
const flip = () => {
  showFront.value = !showFront.value
}
const flipClass = computed(
  () =>
    "bg-white dark:bg-dark p-4 z-2 backface-hidden transform transition delay-50 duration-700 ease-in-out w-full h-full rounded shadow-lg cursor-pointer border border-gray-200" +
    " " +
    props.classes
)
</script>
<style scoped></style>
