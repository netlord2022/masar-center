<template>
  <div ref="menu" class="relative md:inline-block text-left hidden">
    <!-- Button -->
    <button
      ref="ignoreEl"
      dir="ltr"
      class="flex items-center p-1 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none cursor-pointer active:ring-1"
      aria-haspopup="menu"
      :class="{ 'ring-1': open }"
      :aria-expanded="open"
      title="choose language"
      @click="toggle"
    >
      <span class="sr-only">Choose language</span>
      <SvgIcon :name="currentIcon" size="w-5 h-5 rounded-sm" />

      <SvgIcon
        name="chev-down"
        size="w-4 h-4 ml-2 fill-none stroke-black stroke-2 transition-all duration-300 ease-in-out"
        :class="open ? '-scale-100' : 'scale-100'"
      />
    </button>

    <!-- Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute right-0 rtl:left-0 rtl:right-auto z-50 mt-1 w-28 origin-top-right rounded-md bg-white shadow-lg shadow-black/20 ring-gray-300 ring-1 ring-opacity-5 block focus:outline-none p-2"
        role="list"
        tabindex="0"
        @click="open = false"
      >
        <NuxtLink
          v-for="(item, key) in locales"
          :key="key"
          :to="$switchLocalePath(item.code)"
          class="text-primary block my-1 w-full h-full hover:bg-gray-100 rounded-md px-3 py-2 text-sm font-medium"
          dir="ltr"
        >
          <div class="flex items-center">
            <SvgIcon
              :name="item.icon as string"
              size="h-4 w-4 rounded-sm mt-0.5"
              width="16"
              height="16"
            />
            <span class="ml-2">{{ item.name }}</span>
          </div>
        </NuxtLink>
      </div>
    </transition>
  </div>
  <div
    ref="menu"
    class="relative md:hidden text-left flex"
    @click="onMobileMenuClick"
  >
    <NuxtLink
      v-for="(item, key) in locales"
      :key="key"
      :to="$switchLocalePath(item.code)"
      class="flex my-1 hover:bg-gray-100 mx-2 dark:p-1 dark:rounded dark:mx-1 h-5.5 dark:bg-white/80"
      :class="{ 'border-b border-primary': item.code === locale }"
    >
      <div class="flex items-center">
        <SvgIcon :name="item.icon as string" size="w-5 h-5" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"])
const { locales, locale } = useI18n()

const open = ref(false)

const onMobileMenuClick = () => {
  emit("close")
}

const toggle = () => {
  open.value = !open.value
}
const flags = computed(() => {
  return [
    { code: "en", icon: "gb-flag" },
    { code: "ar", icon: "sy-flag" },
    { code: "de", icon: "de-flag" },
  ]
})

const currentIcon = computed(() => {
  const flag = flags.value.find((f) => f.code === locale.value)
  return flag ? flag.icon : ""
})
const menu = useTemplateRef("menu")
const ignoreEl = useTemplateRef("ignoreEl")
const close = () => {
  open.value = false
}

onClickOutside(menu, () => close(), { ignore: [ignoreEl] })
</script>
