<template>
  <footer role="contentinfo">
    <div class="bg-dark dark:bg-white">
      <div
        class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-white dark:text-black"
      >
        &copy; {{ new Date().getFullYear() }} Masar Center. All rights reserved.
        Images by Freepik.
      </div>
    </div>

    <div
      class="fixed z-20 bottom-8 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-8 rtl:sm:left-auto rtl:sm:right-8 flex flex-col items-center sm:flex-row gap-2 sm:gap-4"
    >
      <div class="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
        <div class="flex group">
          <div dir="rtl" class="link-box-item">
            <a href="tel:+491771873142" class="flex items-center"
              ><NuxtImg
                src="/telephone.svg"
                alt="telephone-icon"
                width="24"
                loading="lazy"
                height="24"
              />
              <div dir="rtl" class="text-sm font-medium px-3">
                &#8206;+491771873142
              </div>
            </a>
          </div>
        </div>
        <div class="flex group">
          <div class="link-box-item">
            <a
              href="https://wa.me/491771873142"
              class="flex items-center"
              target="_blank"
              ><NuxtImg
                src="/whatsapp.svg"
                alt="whatsapp-icon"
                width="24"
                height="24"
                loading="lazy"
              /><span class="text-sm font-medium px-3"
                >&#8206;+491771873142</span
              ></a
            >
          </div>
        </div>
        <div class="flex group">
          <div class="link-box-item">
            <a href="mailto:info@masar-center.de" class="flex items-center">
              <NuxtImg
                src="/email.svg"
                alt="email-icon"
                width="24"
                height="24"
                loading="lazy"
              /><span class="text-sm font-medium px-3 whitespace-nowrap"
                >info@masar-center.de</span
              ></a
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style scoped>
@reference "./../assets/css/main.css";
.link-box-item {
  @apply flex items-center cursor-pointer bg-primary text-white p-2 rounded-[3px] max-w-10 overflow-hidden transition-all duration-400;
}
.link-box-item:hover {
  @apply max-w-[270px];
}
.link-box-item img {
  @apply min-w-6 w-6 transition-all duration-400;
}
</style>
