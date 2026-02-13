<script setup>
const { t } = useI18n()
definePageMeta({
  title: "impressum.seo.title",
})
useHead({
  meta: [
    { property: "og:title", content: t("impressum.seo.title") },
    { property: "og:description", content: t("impressum.seo.description") },
    { property: "description", content: t("impressum.seo.description") },
  ],
})
</script>
<template>
  <section
    class="privacy-page max-w-7xl mx-auto px-6 text-primary dark:text-white mt-24 mb-10"
  >
    <div class="container">
      <h1 class="text-3xl">{{ $t("impressum.title") }}</h1>

      <!-- Section 1 -->
      <h2 class="text-2xl sr-only">Masar UG</h2>

      <h3 class="text-xl">Masar UG</h3>
      <p>Hünxer Str. 121</p>
      <p>46537 Dinslaken</p>
      <p>{{ $t("impressum.germany") }}</p>

      <h3 class="text-xl">{{ $t("impressum.director") }}</h3>
      <p>
        <strong>Morhaf Esmail</strong>
      </p>

      <h3 class="text-xl">{{ $t("impressum.commercialRegister") }}</h3>
      <p>HHRB 39995</p>

      <h3 class="text-xl">{{ $t("impressum.court") }}</h3>
      <p>Amtsgericht Duisburg, {{ $t("impressum.germany") }}</p>

      <h3 class="text-xl">{{ $t("impressum.contact") }}</h3>
      <p>
        {{ $t("privacy.section2.controllerPhoneLabel") }}
        <NuxtLink href="https://wa.me/491771873142" target="_blank" dir="ltr"
          >+491771873142</NuxtLink
        >
      </p>
      <p>
        {{ $t("privacy.section2.controllerEmailLabel") }}
        <NuxtLink href="mailto:info@masar-center.de"
          >info@masar-center.de</NuxtLink
        >
      </p>
      <h3 class="text-xl">{{ $t("impressum.disclaimer") }}</h3>
      <p>{{ $t("impressum.disclaimerText") }}</p>

      <h3 class="text-xl">{{ $t("impressum.responsible") }}</h3>
      <p>Masar UG</p>
      <p>Hünxer Str. 121</p>
      <p>46537 Dinslaken</p>
      <p>{{ $t("impressum.germany") }}</p>
    </div>
  </section>
</template>

<style scoped>
.privacy-page {
  line-height: 1.8;
}

h1,
h2,
h3 {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 700;
}
ul {
  padding-right: 1.5rem;
}
</style>
