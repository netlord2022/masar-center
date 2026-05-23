<script setup lang="ts">
const { t, locale } = useI18n()

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
})

const errors = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
})

const status = ref<"idle" | "loading" | "success" | "error">("idle")

const validate = () => {
  let valid = true

  errors.name = ""
  errors.email = ""
  errors.subject = ""
  errors.message = ""

  if (!form.name.trim()) {
    errors.name = t("contact.errors.name")
    valid = false
  }

  if (!form.email.trim()) {
    errors.email = t("contact.errors.email")
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t("contact.errors.invalidEmail")
    valid = false
  }

  if (!form.subject.trim()) {
    errors.subject = t("contact.errors.subject")
    valid = false
  }

  if (!form.message.trim()) {
    errors.message = t("contact.errors.message")
    valid = false
  }

  return valid
}

const submitForm = async () => {
  if (!validate()) return

  status.value = "loading"

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
      status.value = "success"

      form.name = ""
      form.email = ""
      form.subject = ""
      form.message = ""
    } else {
      console.error("Error", response)
    }
    setTimeout(() => {
      status.value = "idle"
    }, 3500)
  } catch (error) {
    status.value = "error"

    console.error("Error", error)

    setTimeout(() => {
      status.value = "idle"
    }, 3500)
  }
}
</script>
<template>
  <section id="contact" class="w-full py-12 flex flex-col">
    <h2
      class="text-3xl md:text-4xl font-bold text-center mb-8 rtl:font-arabic text-primary dark:text-white my-4"
    >
      {{ t("contact.header") }}
    </h2>
    <form
      class="backdrop-blur-2xl p-8 max-w-xl mx-auto flex flex-col gap-4"
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      @submit.prevent="submitForm"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Name -->
        <div class="flex flex-col mb-2">
          <input type="hidden" name="form-name" value="contact" />

          <!-- Honeypot -->
          <p hidden class="hidden">
            <label>
              Don’t fill this out:
              <input name="bot-field" />
            </label>
          </p>
          <input type="hidden" name="locale" :value="locale" />
          <label
            for="form-name"
            class="mb-2 text-gray-800 dark:text-white text-sm"
          >
            {{ t("contact.name") }}
          </label>

          <input
            id="form-name"
            v-model="form.name"
            type="text"
            :placeholder="t('contact.placeholders.name')"
            class="text-input"
          />

          <small v-if="errors.name" class="text-red-400 mt-1 text-xs">
            {{ errors.name }}
          </small>
        </div>

        <!-- Email -->
        <div class="flex flex-col mb-2">
          <label
            for="form-email"
            class="mb-2 text-gray-800 dark:text-white text-sm"
          >
            {{ t("contact.email") }}
          </label>

          <input
            id="form-email"
            v-model="form.email"
            type="email"
            :placeholder="t('contact.placeholders.email')"
            class="text-input"
          />

          <small v-if="errors.email" class="text-red-400 mt-1 text-xs">
            {{ errors.email }}
          </small>
        </div>
      </div>

      <!-- Subject -->
      <div class="flex flex-col mb-5">
        <label
          for="form-subject"
          class="mb-2 text-gray-800 dark:text-white text-sm"
        >
          {{ t("contact.subject") }}
        </label>

        <input
          id="form-subject"
          v-model="form.subject"
          type="text"
          :placeholder="t('contact.placeholders.subject')"
          class="text-input"
        />

        <small v-if="errors.subject" class="text-red-400 mt-1 text-xs">
          {{ errors.subject }}
        </small>
      </div>

      <!-- Message -->
      <div class="flex flex-col mb-5">
        <label
          for="form-message"
          class="mb-2 text-gray-800 dark:text-white text-sm"
        >
          {{ t("contact.message") }}
        </label>

        <textarea
          id="form-message"
          v-model="form.message"
          rows="6"
          :placeholder="t('contact.placeholders.message')"
          class="text-input"
        />

        <small v-if="errors.message" class="text-red-400 mt-1 text-xs">
          {{ errors.message }}
        </small>
      </div>

      <!-- Submit -->
      <button
        :disabled="status === 'loading'"
        class="w-full bg-linear-to-r from-primary/80 to-primary dark:from-secondary/80 dark:to-secondary hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(37,99,235,0.35)] transition-all duration-300 text-white font-bold py-4 rounded-2xl disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        type="submit"
      >
        <span
          v-if="status !== 'loading'"
          class="flex items-center justify-center"
        >
          {{ t("contact.send") }}
        </span>

        <span v-else class="flex items-center justify-center gap-3">
          <span
            class="w-4.5 h-4.5 rounded-full border-2 border-white/40 border-t-white animate-spin"
          />

          {{ t("contact.loading") }}
        </span>
      </button>

      <!-- Success -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="status === 'success'"
          class="mt-4 text-center font-semibold rounded-2xl border border-green-500/30 bg-green-500/10 text-green-400 p-4"
        >
          {{ t("contact.success") }}
        </div>
      </Transition>

      <!-- Error -->
      <Transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="status === 'error'"
          class="mt-4 text-center font-semibold rounded-2xl border border-red-500/30 bg-red-500/10 text-red-400 p-4"
        >
          {{ t("contact.error") }}
        </div>
      </Transition>
    </form>
  </section>
</template>
<style lang="css" scoped>
@reference "./../../assets/css/main.css";

.text-input {
  @apply border border-gray-400 focus:border-blue-500 focus:bg-white/10 outline-none transition-all duration-300 rounded-2xl p-3 dark:text-white placeholder:text-slate-400;
}
label {
  @apply text-gray-800 dark:text-white text-sm font-semibold;
}
</style>
