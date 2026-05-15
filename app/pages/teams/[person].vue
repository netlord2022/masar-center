<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()
const { locale } = useI18n()
const route = useRoute()
const { findBySlug } = useTeamData()

const slug = route.params.person as string
const member = findBySlug(slug)

if (!member) {
  throw createError({ statusCode: 404, statusMessage: "Team member not found" })
}

type Locale = "en" | "de" | "ar"

const localizedBio = computed(() => member.bio[locale.value as Locale])

useSeoMeta({
  title: `${member.name} – ${t("masarCompany")}`,
  description: localizedBio,
  ogTitle: `${member.name} – ${t("masarCompany")}`,
  ogDescription: localizedBio,
  ogUrl: `${config.public.siteUrl}${route.path}`,
  //ogImageSecureUrl: `${config.public.siteUrl}/team/${slug}.webp`,
  twitterCard: "summary_large_image",
  twitterTitle: `${member.name} – ${t("masarCompany")}`,
  twitterDescription: localizedBio,
})

defineOgImage(
  "TeamMember",
  {
    name: member.name,
    photoUrl: member.photo,
  },
  [{ key: "og" }, { key: "whatsapp", width: 800, height: 800 }]
)
</script>

<template>
  <section
    class="container mx-auto py-16 max-w-7xl px-6 text-center flex flex-col items-center gap-4 dark:text-white"
  >
    <NuxtLinkLocale
      dir="ltr"
      to="team"
      class="text-left self-start rtl:self-end rtl:text-right flex hover:underline"
    >
      <SvgIcon
        name="arrow-right"
        size="w-5 h-5 dark:text-white scale-x-[-1] mt-0.5 mx-1"
      />
      back to team</NuxtLinkLocale
    >
    <h1 class="text-4xl font-bold mt-6 text-primary dark:text-white">
      {{ member.name }}
    </h1>

    <NuxtImg
      :src="member.photo"
      :alt="member.name"
      class="rounded-lg border-4 border-secondary mt-2"
      loading="eager"
      decoding="async"
      fetchpriority="high"
      width="240"
      height="320"
      preload
    />

    <p class="text-xl text-gray-800 dark:text-gray-200">{{ member.role }}</p>
    <p class="text-gray-600 dark:text-gray-300">{{ localizedBio }}</p>
  </section>
</template>
