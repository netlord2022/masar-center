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

const localizedRole = computed(() => member.role[locale.value as Locale])
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
    role: localizedRole.value,
    photoUrl: member.photo,
  },
  [{ key: "og" }, { key: "whatsapp", width: 800, height: 800 }]
)
</script>

<template>
  <section class="container mx-auto py-16 min-h-screen">
    <img :src="member.photo" :alt="member.name" width="200" height="200" />
    <h1 class="text-4xl font-bold mt-6">{{ member.name }}</h1>
    <p class="text-xl text-slate-500 mt-2">{{ localizedRole }}</p>
    <p class="mt-6">{{ localizedBio }}</p>
  </section>
</template>
