<script setup lang="ts">
const { locale } = useI18n()
const form = reactive({
  name: "",
  email: "",
  message: "",
})

const loading = ref(false)
const success = ref(false)

async function submitForm() {
  loading.value = true

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "form-name": "contact",
        ...form,
      }).toString(),
    })

    if (response.ok) {
      success.value = true
      setTimeout(() => {
        success.value = false
      }, 3000)

      form.name = ""
      form.email = ""
      form.message = ""
    } else {
      console.error("Error", response)
    }
  } catch (error) {
    console.error("Error", error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form
    name="contact"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
    class="flex flex-col gap-2 mx-auto max-w-xl my-8"
    @submit.prevent="submitForm"
  >
    <h3>Contact</h3>
    <p v-if="success">Message sent successfully!</p>
    <!-- Required -->
    <input type="hidden" name="form-name" value="contact" />

    <!-- Honeypot -->
    <p hidden class="hidden">
      <label>
        Don’t fill this out:
        <input name="bot-field" />
      </label>
    </p>

    <input type="hidden" name="locale" :value="locale" />

    <input
      v-model="form.name"
      type="text"
      name="name"
      placeholder="Name"
      required
      class="rounded-lg border border-gray-500 p-2"
    />

    <input
      v-model="form.email"
      type="email"
      name="email"
      placeholder="Email"
      required
      class="rounded-lg border border-gray-500 p-2"
    />

    <textarea
      v-model="form.message"
      name="message"
      placeholder="Message"
      required
      class="rounded-lg border border-gray-500 p-2"
    />

    <button
      type="submit"
      :disabled="loading"
      class="bg-primary text-white dark:bg-secondary rounded-lg p-2"
    >
      {{ loading ? "Sending..." : "Send" }}
    </button>
  </form>
</template>
