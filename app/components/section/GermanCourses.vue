<script setup>
const { t } = useI18n()

const whatsappUrl = "https://wa.me/491771873142"

const socialLinks = [
  {
    icon: "facebook",
    url: "https://www.facebook.com/profile.php?id=61585719966946",
    label: "Masar Facebook",
  },
  {
    icon: "instagram",
    url: "https://www.instagram.com/masar.ug.de",
    label: "Masar Instagram",
  },
  {
    icon: "x",
    url: "https://x.com/Masar1661048",
    label: "Masar X",
  },
]

const features = computed(() => [
  {
    icon: "globe",
    text: t("germanCourses.features.online"),
  },
  {
    icon: "student-cap",
    text: t("germanCourses.features.levels"),
  },
  {
    icon: "chat",
    text: t("germanCourses.features.register"),
  },
])

const levels = ["A1", "A2", "B1", "B2"]
</script>

<template>
  <section id="german-courses" class="py-16 md:py-24 w-full bg-surface dark:bg-hero/5">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- text content -->
        <div class="text-center lg:text-left rtl:lg:text-right">
          <div
            class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 dark:bg-secondary/15 text-secondary text-sm font-medium mb-6"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"
              />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
            </span>
            {{ $t("germanCourses.badge") }}
          </div>

          <h2
            class="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4 rtl:font-arabic"
          >
            {{ $t("germanCourses.title") }}
          </h2>
          <p
            class="text-md md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 rtl:lg:mx-auto rtl:lg:mr-0"
          >
            {{ $t("germanCourses.description") }}
          </p>

          <!-- features list -->
          <div class="flex flex-col gap-4 mb-10">
            <div
              v-for="(feature, i) in features"
              :key="i"
              class="flex items-center gap-3 text-left rtl:text-right justify-center lg:justify-start"
            >
              <div
                class="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 dark:bg-hero/15 shrink-0"
              >
                <SvgIcon
                  :name="feature.icon"
                  size="w-5 h-5"
                  class="text-primary dark:text-hero"
                />
              </div>
              <span class="text-sm md:text-base text-gray-700 dark:text-gray-200">
                {{ feature.text }}
              </span>
            </div>
          </div>

          <!-- CTA -->
          <div
            class="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
          >
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-8 py-3.5 bg-primary dark:bg-hero text-white font-bold rounded-xl shadow-lg shadow-primary/25 dark:shadow-hero/25 hover:shadow-xl hover:shadow-primary/30 dark:hover:shadow-hero/30 hover:scale-105 transition-all duration-300 ease-in-out rtl:font-arabic"
            >
              <SvgIcon name="whatsapp" size="w-5 h-5" />
              {{ $t("germanCourses.cta") }}
            </a>
            <div class="flex items-center gap-3">
              <a
                v-for="link in socialLinks"
                :key="link.icon"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="link.label"
                class="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-hero hover:border-primary/30 dark:hover:border-hero/30 transition-colors duration-200"
              >
                <SvgIcon :name="link.icon" size="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <!-- levels card -->
        <div class="max-w-md w-full mx-auto lg:mx-0">
          <div
            class="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 p-8"
          >
            <h3
              class="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-5 rtl:font-arabic"
            >
              {{ $t("germanCourses.features.levels") }}
            </h3>
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div
                v-for="level in levels"
                :key="level"
                class="flex items-center justify-center py-3 rounded-xl bg-primary/5 dark:bg-hero/10 border border-primary/15 dark:border-hero/20 text-primary dark:text-hero font-bold"
              >
                {{ level }}
              </div>
            </div>
            <a
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 p-3 rounded-xl bg-surface dark:bg-white/5 hover:bg-primary/5 dark:hover:bg-hero/10 transition-colors duration-200"
            >
              <div
                class="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 dark:bg-hero/15 shrink-0"
              >
                <SvgIcon name="chat" size="w-4 h-4" class="text-primary dark:text-hero" />
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-200 rtl:font-arabic">
                {{ $t("germanCourses.cta") }}
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
