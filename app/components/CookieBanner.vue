<script setup lang="ts">
const { preferences, accept, reject } = useCookieConsent()
const { initialize, gtag } = useGtag()

function handleAccept() {
  accept()
  initialize()
  gtag("consent", "update", {
    ad_user_data: "granted",
    ad_personalization: "granted",
    ad_storage: "granted",
    analytics_storage: "granted",
  })
}

function handleReject() {
  reject() // saves { accepted: false } + reloads
}
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="preferences === null"
      class="fixed bottom-0 inset-x-0 bg-gray-900 text-white p-4 z-30 border-t border-white/20"
    >
      <div
        class="max-w-5xl mx-auto flex flex-col md:flex-row gap-3 items-center"
      >
        <p class="text-sm flex-1">
          {{ $t("cookie.description") }}
        </p>

        <div class="flex gap-2">
          <button
            class="px-4 py-2 bg-green-700 rounded text-sm cursor-pointer"
            @click="handleAccept"
          >
            {{ $t("cookie.acceptAll") }}
          </button>

          <button
            class="px-4 py-2 bg-gray-700 rounded text-sm cursor-pointer"
            @click="handleReject"
          >
            {{ $t("cookie.rejectAll") }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
