<script setup>
const { t, locale } = useI18n()
const portalUrl = computed(() =>
  locale.value === "ar"
    ? "https://portal.masar-center.de/ar"
    : "https://portal.masar-center.de/"
)

const features = computed(() => [
  {
    icon: "student-cap",
    text: t("portal.features.categories"),
  },
  {
    icon: "employee",
    text: t("portal.features.checklist"),
  },
  {
    icon: "university",
    text: t("portal.features.upload"),
  },
])
</script>
<template>
  <section id="portal" class="py-16 md:py-24 w-full">
    <div class="max-w-7xl mx-auto px-6">
      <div
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-hero/10 to-primary/5 dark:from-primary/10 dark:via-hero/5 dark:to-primary/10 border border-primary/10 dark:border-hero/20 p-8 md:p-12 lg:p-16"
      >
        <!-- decorative circles -->
        <div
          class="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 dark:bg-hero/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          class="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-hero/5 dark:bg-primary/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div class="relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <!-- text content -->
          <div class="flex-1 text-center lg:text-left rtl:lg:text-right">
            <div
              class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-hero/15 text-primary dark:text-hero text-sm font-medium mb-6"
            >
              <span class="relative flex h-2 w-2">
                <span
                  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary dark:bg-hero opacity-75"
                />
                <span
                  class="relative inline-flex rounded-full h-2 w-2 bg-primary dark:bg-hero"
                />
              </span>
              {{ $t("portal.badge") }}
            </div>

            <h2
              class="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4 rtl:font-arabic"
            >
              {{ $t("portal.title") }}
            </h2>
            <p
              class="text-md md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 rtl:lg:mx-auto rtl:lg:mr-0"
            >
              {{ $t("portal.description") }}
            </p>

            <!-- features list -->
            <div class="flex flex-col gap-4 mb-10">
              <div
                v-for="(feature, i) in features"
                :key="i"
                class="flex items-center gap-3 text-left rtl:text-right"
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
            <a
              :href="portalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-8 py-3.5 bg-primary dark:bg-hero text-white font-bold rounded-xl shadow-lg shadow-primary/25 dark:shadow-hero/25 hover:shadow-xl hover:shadow-primary/30 dark:hover:shadow-hero/30 hover:scale-105 transition-all duration-300 ease-in-out rtl:font-arabic"
            >
              {{ $t("portal.cta") }}
              <SvgIcon
                name="arrow-right"
                size="w-5 h-5"
                class="rtl:rotate-180"
              />
            </a>
          </div>

          <!-- visual card mockup -->
          <div class="flex-1 max-w-md w-full">
            <div
              class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl shadow-primary/10 dark:shadow-hero/10 border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <!-- mock header bar -->
              <div
                class="flex items-center gap-2 px-5 py-3 bg-surface dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-600"
              >
                <div class="w-3 h-3 rounded-full bg-red-400" />
                <div class="w-3 h-3 rounded-full bg-yellow-400" />
                <div class="w-3 h-3 rounded-full bg-green-400" />
                <div
                  class="ml-3 rtl:mr-3 rtl:ml-0 flex-1 h-6 bg-gray-200 dark:bg-gray-600 rounded-md text-[10px] text-gray-400 dark:text-gray-400 flex items-center justify-center px-2"
                  dir="ltr"
                >
                  portal.masar-center.de
                </div>
              </div>
              <!-- mock content -->
              <div class="p-6 space-y-4">
                <div
                  class="h-3 bg-primary/20 dark:bg-hero/20 rounded-full w-3/4"
                />
                <div
                  class="h-3 bg-primary/10 dark:bg-hero/10 rounded-full w-full"
                />
                <div
                  class="h-3 bg-primary/10 dark:bg-hero/10 rounded-full w-5/6"
                />
                <div class="pt-2 flex gap-3">
                  <div
                    class="h-20 flex-1 bg-primary/5 dark:bg-hero/5 rounded-xl border border-primary/10 dark:border-hero/10 flex items-center justify-center"
                  >
                    <SvgIcon
                      name="student-cap"
                      size="w-8 h-8"
                      class="text-primary/30 dark:text-hero/30"
                    />
                  </div>
                  <div
                    class="h-20 flex-1 bg-primary/5 dark:bg-hero/5 rounded-xl border border-primary/10 dark:border-hero/10 flex items-center justify-center"
                  >
                    <SvgIcon
                      name="employee"
                      size="w-8 h-8"
                      class="text-primary/30 dark:text-hero/30"
                    />
                  </div>
                  <div
                    class="h-20 flex-1 bg-primary/5 dark:bg-hero/5 rounded-xl border border-primary/10 dark:border-hero/10 flex items-center justify-center"
                  >
                    <SvgIcon
                      name="university"
                      size="w-8 h-8"
                      class="text-primary/30 dark:text-hero/30"
                    />
                  </div>
                </div>
                <div class="pt-2 flex gap-2 items-center">
                  <div
                    class="h-8 flex-1 bg-primary/15 dark:bg-hero/15 rounded-lg"
                  />
                  <div
                    class="h-8 w-20 bg-primary dark:bg-hero rounded-lg opacity-60"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
