<template>
  <div
    v-if="showBanner && hydrated"
    class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50"
  >
    <div
      class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p class="text-sm">
        {{ t("cookies.message") }}
        <a :href="localePath('/privacy')" class="underline">{{
          t("cookies.privacy")
        }}</a>
      </p>
      <div class="flex gap-3">
        <button
          @click="decline"
          class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
        >
          {{ t("cookies.decline") }}
        </button>
        <button
          @click="accept"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
        >
          {{ t("cookies.accept") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGoogleAnalytics } from "~/composables/useGoogleAnalytics"
const { t } = useI18n()
const localePath = useLocalePath()
const { cookieConsent, acceptCookies, declineCookies } = useGoogleAnalytics()

const showBanner = ref(!cookieConsent.value)
const hydrated = ref(false)
onMounted(() => {
  hydrated.value = true
})

const accept = () => {
  acceptCookies()
  showBanner.value = false
}

const decline = () => {
  declineCookies()
  showBanner.value = false
}
</script>
