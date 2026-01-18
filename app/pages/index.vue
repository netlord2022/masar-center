<script setup>
definePageMeta({
  title: "home",
})
const { tm, t } = useI18n()

const faqItems = computed(() => {
  const raw = tm("faq.items")
  if (!Array.isArray(raw)) return []

  return raw.map((_, index) => ({
    question: t(`faq.items.${index}.question`),
    answer: t(`faq.items.${index}.answer`),
  }))
})
</script>

<template>
  <div class="w-full max-w-full" role="main">
    <section class="w-full max-w-full" dir="ltr">
      <div class="bg-hero/15 dark:bg-hero/5">
        <div
          class="w-full max-w-7xl flex justify-between mx-auto items-center py-16 px-6 flex-col md:flex-row"
        >
          <NuxtImg
            src="/hero.webp"
            alt="Home Hero Image"
            class="w-full h-auto object-fit max-w-full md:max-w-1/2 md:max-2/3"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            width="712"
            height="712"
            preload
            sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 80vw,
    712px
  "
          />
          <div
            class="text-primary dark:text-white md:pl-6 text-left rtl:text-right mt-6 md:mt-0"
          >
            <h1
              class="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 dark:text-white rtl:md:leading-20"
            >
              {{ $t("heroTitle") }}
            </h1>
            <p class="text-md md:text-xl lg:text-2xl mb-8 dark:text-white">
              {{ $t("heroSubtitle") }}
            </p>
          </div>
        </div>
      </div>
      <div
        id="services"
        class="text-primary dark:text-white max-w-7xl mx-auto px-6"
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus
        dignissimos facere, maxime labore delectus omnis quae. Excepturi
        similique modi ipsam quaerat, officia harum numquam, asperiores,
        consectetur consequatur corporis autem itaque. Doloremque maiores, hic
        expedita atque nostrum autem! Error possimus unde cupiditate aut qui
        incidunt repudiandae deleniti ducimus, velit nostrum adipisci architecto
        hic totam labore voluptate excepturi quod, in vero commodi nam, cum
        veritatis? Unde possimus quaerat esse labore voluptatum quidem cumque ex
        dolorem debitis deserunt. Ex perferendis dignissimos sit dolorum
        deleniti rerum doloribus corporis fugiat in neque maxime molestiae minus
        assumenda dolor voluptatum, suscipit voluptate omnis beatae cum quasi
        impedit, consequuntur eum est pariatur? Magni tenetur eaque
        necessitatibus voluptatibus, voluptate, beatae distinctio nisi, ut quas
        in ullam! Modi facilis doloremque quas praesentium rem consequatur
        consequuntur velit quo? Mollitia modi doloremque officia quae voluptate
        impedit illo quo distinctio, adipisci placeat incidunt aliquam fugit,
        beatae cupiditate laudantium provident praesentium non quis nulla minima
        dolores itaque excepturi omnis repellendus. Perferendis autem esse
        ratione, eaque inventore doloremque sed dicta distinctio, nisi, rerum
        delectus! Nisi, fuga soluta dolore distinctio voluptatem beatae
        doloribus ullam accusantium aut architecto voluptates inventore eius
        voluptatibus, eligendi alias excepturi temporibus porro illo amet fugit.
        Vero consectetur nihil accusamus velit expedita quaerat similique maxime
        architecto? Natus reprehenderit aliquam, facilis cupiditate ipsum ad
        quod dolorem culpa porro qui temporibus rerum delectus reiciendis
        provident dolor perspiciatis, dignissimos possimus animi. Ea laboriosam
        nemo nostrum a reprehenderit repudiandae. Aperiam harum ipsum velit
        dolor cumque veniam quasi voluptatem numquam rerum molestias, quis
        minima impedit, ullam blanditiis quos perspiciatis illum obcaecati sed
        sapiente fugit, dolores quaerat pariatur ipsam! Laudantium deserunt quos
        adipisci earum officia? Voluptatem placeat officia tempore excepturi
        consequatur, sequi explicabo rem dolorum, expedita, aperiam voluptate.
        Minima atque molestias perspiciatis inventore. Ipsam quam nam fugiat,
        quidem voluptas a hic assumenda reiciendis neque labore pariatur,
        accusantium impedit molestiae!
      </div>
      <div class="max-w-xl mx-auto mt-20 mb-40 space-y-6 px-6">
        <h2
          class="text-3xl md:text-4xl font-bold text-center mb-8 text-primary dark:text-white"
        >
          {{ $t("faqTitle") }}
        </h2>
        <FaqBox
          v-for="(item, index) in faqItems"
          :key="index"
          :title="item.question"
          :text="item.answer"
        />
      </div>
    </section>
  </div>
</template>
