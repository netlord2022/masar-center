<script setup>
const route = useRoute()
const { t } = useI18n()
const head = useLocaleHead()
const title = computed(() => t(route.meta.title))
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
      <Head>
        <Title>Masar - {{ title }}</Title>
        <Meta
          name="description"
          :content="
            head.meta.find((m) => m.name === 'description') ||
            'تقديم خدمات استشارية ودعم عملي للراغبين بالسفر الى ألمانيا'
          "
        />
        <template v-for="link in head.link" :key="link.key">
          <Link
            :id="link.key"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>
        <template v-for="meta in head.meta" :key="meta.key">
          <Meta
            :id="meta.key"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body class="bg-white dark:bg-dark">
        <AppHeader />
        <svg
          viewBox="0 0 1440 181"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="pointer-events-none w-full top-[72px] text-primary dark:text-secondary shrink-0 absolute"
        >
          <mask id="path-1-inside-1_414_5526" fill="white">
            <path d="M0 0H1440V181H0V0Z" />
          </mask>
          <path
            d="M0 0H1440V181H0V0Z"
            fill="url(#paint0_linear_414_5526)"
            fill-opacity="0.22"
          />
          <path
            d="M0 2H1440V-2H0V2Z"
            fill="url(#paint1_linear_414_5526)"
            mask="url(#path-1-inside-1_414_5526)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_414_5526"
              x1="720"
              y1="0"
              x2="720"
              y2="181"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="currentColor" />
              <stop offset="1" stop-color="currentColor" stop-opacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_414_5526"
              x1="0"
              y1="90.5"
              x2="1440"
              y2="90.5"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="currentColor" stop-opacity="0" />
              <stop offset="0.395" stop-color="currentColor" />
              <stop offset="1" stop-color="currentColor" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        <slot />
        <AppFooter />
      </Body>
    </Html>
  </div>
</template>
