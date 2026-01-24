<script setup lang="ts">
const { y } = useWindowScroll()
const bottom = ref(false)

watch(
  y,
  () => {
    if (!window) return
    bottom.value =
      window.innerHeight + y.value >=
      document.documentElement.scrollHeight - 200
  },
  { immediate: true }
)
</script>
<template>
  <footer role="contentinfo" class="mx-auto px-6 w-full mb-8">
    <div class="bg-dark dark:bg-white pt-6 pb-8 rounded-t-lg w-full">
      <div
        class="w-full flex justify-between items-center mx-auto max-w-7xl px-6"
      >
        <div class="gap-3 sm:gap-4 flex items-center">
          <NuxtLink
            href="https://www.facebook.com/profile.php?id=61585719966946"
            target="_blank"
            rel="noopener noreferrer"
            title="Masar facebook"
          >
            <SvgIcon
              name="facebook"
              size="w-7 h-7 fill-white dark:fill-black"
            />
            <span class="sr-only">Masar facebook</span></NuxtLink
          >
          <NuxtLink
            href="https://www.instagram.com/masar.ug.de"
            target="_blank"
            title="Masar instagram"
            rel="noopener noreferrer"
          >
            <SvgIcon
              name="instagram"
              size="w-7 h-7 fill-white dark:fill-black"
            />
            <span class="sr-only">Masar instagram</span>
          </NuxtLink>
          <NuxtLink
            href="https://x.com/Masar1661048"
            target="_blank"
            title="Masar x"
            rel="noopener noreferrer"
          >
            <SvgIcon name="x" size="w-7 h-7 fill-white dark:fill-black" />
            <span class="sr-only">Masar x</span>
          </NuxtLink>
        </div>
        <div class="flex text-white dark:text-black gap-3 sm:gap-4" dir="ltr">
          <NuxtLink
            href="mailto:info@masar-center.de"
            class="flex items-center px-1"
          >
            <SvgIcon name="email" size="w-6 h-6" /><span class="sr-only"
              >info@masar-center.de</span
            ></NuxtLink
          >
          <NuxtLink
            href="https://wa.me/491771873142"
            class="flex items-center px-1"
            target="_blank"
          >
            <SvgIcon name="whatsapp" size="w-6 h-6" /><span class="sr-only"
              >&#8206;+491771873142</span
            ></NuxtLink
          >
          <NuxtLink href="tel:+491771873142" class="flex items-center">
            <SvgIcon name="telephone" size="w-6 h-6" />
            <div
              dir="rtl"
              class="text-sm font-medium px-1 sr-only md:not-sr-only"
            >
              &#8206;+491771873142
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div
        v-if="!bottom"
        class="fixed z-20 bottom-8 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-8 rtl:sm:left-auto rtl:sm:right-8 flex flex-col items-center sm:flex-row gap-2 sm:gap-4"
      >
        <div class="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
          <div class="flex group">
            <div dir="rtl" class="link-box-item">
              <NuxtLink
                href="tel:+491771873142"
                class="flex items-center float-link"
              >
                <SvgIcon name="telephone" size="w-6 h-6" />
                <div dir="rtl" class="text-sm font-medium px-3">
                  &#8206;+491771873142
                </div>
              </NuxtLink>
            </div>
          </div>
          <div class="flex group">
            <div class="link-box-item">
              <NuxtLink
                href="https://wa.me/491771873142"
                class="flex items-center float-link"
                target="_blank"
              >
                <SvgIcon name="whatsapp" size="w-6 h-6" /><span
                  class="text-sm font-medium px-3"
                  >&#8206;+491771873142</span
                ></NuxtLink
              >
            </div>
          </div>
          <div class="flex group">
            <div class="link-box-item">
              <NuxtLink
                href="mailto:info@masar-center.de"
                class="flex items-center float-link"
              >
                <SvgIcon name="email" size="w-6 h-6" /><span
                  class="text-sm font-medium px-3 whitespace-nowrap"
                  >info@masar-center.de</span
                ></NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div
      class="w-full bg-black dark:bg-white relative z-1 rounded-b-lg ronded-t-none mb-24 mx-auto"
    >
      <div
        class="footer-section footer-section-bottom md:px-10 w-full max-w-[1386px] overflow-hidden relative z-2 mx-auto my-0 dark:md:text-white text-white md:text-black dark:text-black"
      >
        <div
          class="footer-columns-row bg-black md:bg-white dark:bg-white dark:md:bg-black flex flex-col-reverse md:flex-row rounded-t-2xl relative min-h-12 justify-between items-center md:px-8"
          dir="ltr"
        >
          <div
            class="footer-column footer-copyrights-container text-[10px] md:text-xs mt-4 md:mt-0 px-1 sm:px-0"
          >
            &copy; {{ new Date().getFullYear() }} {{ $t("copyRight") }} - Images
            by Freepik
          </div>
          <div
            class="footer-column footer-additional-menu-container mt-8 md:mt-0"
          >
            <nav class="gap-3 sm:gap-4 flex text-sm sm:text-base font-medium">
              <NuxtLinkLocale to="privacy">{{
                $t("privacy.shortTitle")
              }}</NuxtLinkLocale>
              <NuxtLinkLocale to="impressum" class="">{{
                $t("impressum.title")
              }}</NuxtLinkLocale>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-dark dark:bg-white -mt-28 -mb-28 pb-2 rounded-t-lg px-8 h-16"
    />
  </footer>
</template>
<style scoped>
@reference "./../assets/css/main.css";
.link-box-item {
  @apply flex items-center cursor-pointer bg-primary dark:bg-secondary text-white p-2 rounded-[3px] max-w-10 overflow-hidden transition-all duration-400;
}
.link-box-item:hover {
  @apply max-w-[270px];
}
.link-box-item img {
  @apply min-w-6 w-6 transition-all duration-400;
}
.footer-columns-row::before,
.footer-columns-row::after {
  box-shadow: 0 20px 0 0 #ffffff;
  content: "";
  position: absolute;
  background-color: transparent;
  bottom: 0;
  height: 40px;
  width: 20px;
}
.footer-columns-row::after {
  left: 100%;
  border-bottom-left-radius: 20px;
}
.footer-columns-row::before {
  right: 100%;
  border-bottom-right-radius: 20px;
}
html.dark .footer-columns-row::before,
html.dark .footer-columns-row::after {
  box-shadow: 0 20px 0 0 #010617 !important;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.5, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(60px);
  opacity: 0;
}
html[dir="ltr"] .slide-fade-enter-from,
html[dir="ltr"] .slide-fade-leave-to {
  transform: translateX(-60px);
}
@media screen and (max-width: 640px) {
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(60px);
  }
  .footer-columns-row::before,
  .footer-columns-row::after {
    display: none;
  }
}
a {
  @apply transition-all duration-300 ease-in-out;
}
a:not(.float-link):hover {
  @apply scale-105 text-secondary;
}
a:not(.float-link):hover svg {
  @apply fill-secondary;
}
</style>
