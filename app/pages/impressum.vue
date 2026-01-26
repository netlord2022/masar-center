<script setup>
const { t } = useI18n()
definePageMeta({
  title: "privacy.seo.title",
})
useHead({
  meta: [
    { property: "og:title", content: t("privacy.seo.title") },
    { property: "og:description", content: t("privacy.seo.description") },
    { property: "description", content: t("privacy.seo.description") },
  ],
})
</script>
<template>
  <section
    class="privacy-page max-2-7xl px-6 text-primary dark:text-white mt-24 mb-10"
  >
    <div class="container">
      <h1 class="text-3xl">{{ $t("privacy.title") }}</h1>

      <!-- Section 1 -->
      <h2 class="text-2xl">{{ $t("privacy.section1.title") }}</h2>

      <h3 class="text-xl">{{ $t("privacy.section1.generalInfoTitle") }}</h3>
      <p>{{ $t("privacy.section1.generalInfoText1") }}</p>
      <p>{{ $t("privacy.section1.generalInfoText2") }}</p>
      <p>{{ $t("privacy.section1.generalInfoText3") }}</p>

      <h3 class="text-xl">{{ $t("privacy.section1.dataCollectionTitle") }}</h3>
      <p>
        <strong>{{ $t("privacy.section1.dataControllerQuestion") }}</strong>
      </p>
      <p>{{ $t("privacy.section1.dataControllerAnswer") }}</p>

      <p>
        <strong>{{ $t("privacy.section1.dataCollectionQuestion") }}</strong>
      </p>
      <ul>
        <li>{{ $t("privacy.section1.dataCollectionList1") }}</li>
        <li>{{ $t("privacy.section1.dataCollectionList2") }}</li>
      </ul>

      <p>
        <strong>{{ $t("privacy.section1.dataUsageQuestion") }}</strong>
      </p>
      <ul>
        <li>{{ $t("privacy.section1.dataUsageList1") }}</li>
        <li>{{ $t("privacy.section1.dataUsageList2") }}</li>
        <li>{{ $t("privacy.section1.dataUsageList3") }}</li>
        <li>{{ $t("privacy.section1.dataUsageList4") }}</li>
      </ul>

      <h3 class="text-xl">{{ $t("privacy.section1.rightsTitle") }}</h3>
      <p>{{ $t("privacy.section1.rightsIntro") }}</p>
      <ul>
        <li>{{ $t("privacy.section1.rightsList1") }}</li>
        <li>{{ $t("privacy.section1.rightsList2") }}</li>
        <li>{{ $t("privacy.section1.rightsList3") }}</li>
        <li>{{ $t("privacy.section1.rightsList4") }}</li>
        <li>{{ $t("privacy.section1.rightsList5") }}</li>
      </ul>
      <p>{{ $t("privacy.section1.rightsOutro") }}</p>

      <!-- Section 2 -->
      <h2 class="text-2xl">{{ $t("privacy.section2.title") }}</h2>

      <h3 class="text-xl">{{ $t("privacy.section2.dataProtectionTitle") }}</h3>
      <p>{{ $t("privacy.section2.dataProtectionText1") }}</p>
      <p>{{ $t("privacy.section2.dataProtectionText2") }}</p>

      <h3 class="text-xl">{{ $t("privacy.section2.controllerTitle") }}</h3>
      <p>
        <strong>{{ $t("privacy.section2.controllerName") }}</strong>
      </p>
      <p>{{ $t("privacy.section2.controllerAddress") }}</p>

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

      <p>{{ $t("privacy.section2.controllerExplanation") }}</p>

      <h3 class="text-xl">{{ $t("privacy.section2.legalBasisTitle") }}</h3>
      <p>{{ $t("privacy.section2.legalBasisIntro") }}</p>
      <ul>
        <li>{{ $t("privacy.section2.legalBasisList1") }}</li>
        <li>{{ $t("privacy.section2.legalBasisList2") }}</li>
        <li>{{ $t("privacy.section2.legalBasisList3") }}</li>
        <li>{{ $t("privacy.section2.legalBasisList4") }}</li>
      </ul>

      <h3 class="text-xl">
        {{ $t("privacy.section2.storageDurationTitle") }}
      </h3>
      <p>{{ $t("privacy.section2.storageDurationText1") }}</p>
      <p>{{ $t("privacy.section2.storageDurationText2") }}</p>

      <h3 class="text-xl">
        {{ $t("privacy.section2.withdrawConsentTitle") }}
      </h3>
      <p>{{ $t("privacy.section2.withdrawConsentText1") }}</p>
      <p>{{ $t("privacy.section2.withdrawConsentText2") }}</p>
      <p>{{ $t("privacy.section2.withdrawConsentText3") }}</p>

      <h3 class="text-xl">{{ $t("privacy.section2.dataTransferTitle") }}</h3>
      <p>{{ $t("privacy.section2.dataTransferText1") }}</p>
      <p>{{ $t("privacy.section2.dataTransferText2") }}</p>

      <!-- Section 3 -->
      <h2 class="text-2xl">{{ $t("privacy.section3.title") }}</h2>

      <h3 class="text-xl">{{ $t("privacy.section3.cookiesTitle") }}</h3>
      <p>{{ $t("privacy.section3.cookiesText1") }}</p>
      <ul>
        <li>{{ $t("privacy.section3.cookiesList1") }}</li>
        <li>{{ $t("privacy.section3.cookiesList2") }}</li>
      </ul>
      <p>{{ $t("privacy.section3.cookiesText2") }}</p>
      <p>{{ $t("privacy.section3.cookiesText3") }}</p>

      <h3 class="text-xl">{{ $t("privacy.section3.contactFormTitle") }}</h3>
      <p>{{ $t("privacy.section3.contactFormText") }}</p>

      <h3 class="text-xl">{{ $t("privacy.section3.emailPhoneTitle") }}</h3>
      <p>{{ $t("privacy.section3.emailPhoneText") }}</p>

      <h3 class="text-xl">{{ $t("privacy.section3.whatsappTitle") }}</h3>
      <p>{{ $t("privacy.section3.whatsappText1") }}</p>
      <p>{{ $t("privacy.section3.whatsappText2") }}</p>
      <p>{{ $t("privacy.section3.whatsappText3") }}</p>

      <!-- Section 4 -->
      <h2 class="text-2xl">{{ $t("privacy.section4.title") }}</h2>
      <p>{{ $t("privacy.section4.text") }}</p>

      <!-- Section 5 -->
      <h2 class="text-2xl">{{ $t("privacy.section5.title") }}</h2>

      <h3 class="text-xl">{{ $t("privacy.section5.gtmTitle") }}</h3>
      <p>{{ $t("privacy.section5.gtmText") }}</p>

      <h3 class="text-xl">{{ $t("privacy.section5.gaTitle") }}</h3>
      <p>{{ $t("privacy.section5.gaText1") }}</p>
      <ul>
        <li>{{ $t("privacy.section5.gaList1") }}</li>
        <li>{{ $t("privacy.section5.gaList2") }}</li>
        <li>{{ $t("privacy.section5.gaList3") }}</li>
      </ul>

      <!-- Section 6 -->
      <h2 class="text-2xl">{{ $t("privacy.section6.title") }}</h2>
      <p>{{ $t("privacy.section6.textIntro") }}</p>
      <ul>
        <li>{{ $t("privacy.section6.list1") }}</li>
        <li>{{ $t("privacy.section6.list2") }}</li>
        <li>{{ $t("privacy.section6.list3") }}</li>
      </ul>

      <!-- Section 7 -->
      <h2 class="text-2xl">{{ $t("privacy.section7.title") }}</h2>
      <p>{{ $t("privacy.section7.text") }}</p>
      <p>
        <strong>{{ $t("privacy.section7.authorityName") }}</strong>
      </p>

      <!-- Section 8 -->
      <h2 class="text-2xl">{{ $t("privacy.section8.title") }}</h2>
      <p>{{ $t("privacy.section8.textIntro") }}</p>
      <ul>
        <li>{{ $t("privacy.section8.list1") }}</li>
        <li>{{ $t("privacy.section8.list2") }}</li>
      </ul>
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
