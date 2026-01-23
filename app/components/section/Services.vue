<script setup lang="ts">
const { t } = useI18n()
const VISA_TEXT_KEYS = [
  "title",
  "subtitle",
  "listTitle",
  "list1",
  "list2",
  "list3",
  "list4",
  "list5",
]
const useVisaTexts = (basePath: string) =>
  VISA_TEXT_KEYS.reduce((acc: Record<string, string>, key: string | number) => {
    acc[key] = t(`${basePath}.${key}`)
    return acc
  }, {})

const VISA_CONFIG = [
  {
    key: "doctorsVisa",
    icon: resolveComponent("IconsDoctor"),
    img: "/doctor.webp",
  },
  {
    key: "jobSearcherVisa",
    icon: resolveComponent("IconsJobSearch"),
    img: "/job-search.webp",
  },
  {
    key: "studyVisa",
    icon: resolveComponent("IconsStudy"),
    img: "/study.webp",
  },
]

const visas = computed(() =>
  VISA_CONFIG.map((visa) => ({
    ...visa,
    texts: useVisaTexts(`servicesAndVisa.${visa.key}`),
  }))
)
</script>
<template>
  <div id="services" class="pt-24">
    <div class="text-primary dark:text-white bg-hero/15 dark:bg-hero/5">
      <div class="max-w-10xl mx-auto py-12 px-6">
        <h2
          class="text-3xl md:text-4xl font-bold mb-4 dark:text-white text-center"
        >
          {{ $t("servicesAndVisa.title") }}
        </h2>
        <p class="text-md md:text-xl dark:text-white text-center" dir="auto">
          {{ $t("servicesAndVisa.subtitle") }}
        </p>
        <div
          class="w-full py-8 flex flex-row flex-wrap gap-8 justify-center items-stretch"
        >
          <FlipCard
            v-for="(visa, i) in visas"
            :key="i"
            class="h-112 max-h-112 max-w-106 rounded-2xl snap-center shrink-0 w-full md:w-1/2 lg:w-1/3"
            classes="rounded-2xl"
          >
            ">
            <template #front>
              <div
                class="w-full relative h-98/100 max-w-full max-h-98/100 m-auto flex flex-col items-center justify-start rounded-2xl text-right"
              >
                <NuxtImg
                  :src="visa.img"
                  alt="Home Hero Image"
                  class="w-full h-4/7 max-h-4/7 rounded-2xl object-cover flex justify-self-start"
                  loading="lazy"
                  width="712"
                  height="712"
                />
                <h4
                  class="text-medium sm:text-lg font-medium w-full my-2 xl:my-3"
                >
                  {{ visa.texts.title }}
                </h4>
                <div class="text-sm">{{ visa.texts.subtitle }}</div>
                <span class="absolute -bottom-2 right-0">
                  <SvgIcon name="arrow-right" size="w-5 h-5 "
                /></span>
              </div>
            </template>
            <template #back>
              <div>
                <component
                  :is="visa.icon"
                  class="w-36 max-h-36 dark:text-secondary"
                />
                <div class="text-right m-4" dir="auto">
                  <h4 class="text-medium sm:text-lg font-medium">
                    {{ visa.texts.listTitle }}
                  </h4>
                  <ul class="list-disc list-outside">
                    <li>{{ visa.texts.list1 }}</li>
                    <li>{{ visa.texts.list2 }}</li>
                    <li>{{ visa.texts.list3 }}</li>
                    <li>{{ visa.texts.list4 }}</li>
                    <li>{{ visa.texts.list5 }}</li>
                  </ul>
                </div>
              </div>
            </template>
          </FlipCard>
        </div>
      </div>
    </div>
  </div>
</template>
