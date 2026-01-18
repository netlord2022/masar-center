<template>
  <div
    v-if="hydrated && !consent.decided"
    class="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-6 shadow-xl z-50"
  >
    <div class="max-w-4xl mx-auto flex flex-col gap-4">
      <h2 class="text-lg font-semibold">{{ $t("cookies.title") }}</h2>
      <p class="text-sm opacity-80">{{ $t("cookies.description") }}</p>

      <div class="flex gap-4 mt-2">
        <button class="px-4 py-2 bg-green-600 rounded" @click="acceptAll">
          {{ $t("cookies.accept_all") }}
        </button>

        <button class="px-4 py-2 bg-gray-700 rounded" @click="rejectAll">
          {{ $t("cookies.reject_all") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { consent, setConsent } = useConsent()
const hydrated = ref(false)

onMounted(() => {
  hydrated.value = true
})

const acceptAll = () => {
  setConsent({
    analytics: true,
    marketing: true,
    ad_storage: "granted",
    analytics_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    ad_technical: "granted",
  })
}

const rejectAll = () => {
  setConsent({
    analytics: false,
    marketing: false,
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    ad_technical: "denied",
  })
}
</script>
