<script setup lang="ts">
const { consent, accept, reject } = useCookieConsent()
</script>

<template>
  <div
    v-if="consent === 'unset'"
    class="fixed bottom-0 inset-x-0 bg-gray-900 text-white p-4 z-30 border-t border-white/20"
  >
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row gap-3 items-center">
      <p class="text-sm flex-1">
        {{ $t("cookie.description") }}
      </p>

      <div class="flex gap-2">
        <button
          class="px-4 py-2 bg-green-700 rounded text-sm cursor-pointer"
          @click="accept"
        >
          {{ $t("cookie.acceptAll") }}
        </button>

        <button
          class="px-4 py-2 bg-gray-700 rounded text-sm cursor-pointer"
          @click="reject"
        >
          {{ $t("cookie.rejectAll") }}
        </button>
      </div>
    </div>
  </div>
</template>
