<script setup lang="ts">
const modelValue = defineModel<string | null>({ required: false })
</script>
<template>
  <div class="relative">
    <label for="search" class="sr-only">Search</label>
    <input
      id="search"
      v-model.trim="modelValue"
      type="text"
      name="search"
      :placeholder="$t('blog.search')"
      class="search-input w-full px-4 py-2 rounded-xl border border-gray-300 dark:placeholder:text-gray-400 dark:border-gray-600 bg-white dark:bg-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
    />
    <span
      class="absolute right-3 rtl:left-3 rtl:right-auto top-2.5 text-gray-400"
    >
      <svg
        v-if="!modelValue"
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
      <button v-else class="w-4 h-4 cursor-pointer" @click="modelValue = ''">
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="#0F1729"
          />
        </svg>
      </button>
    </span>
  </div>
</template>
