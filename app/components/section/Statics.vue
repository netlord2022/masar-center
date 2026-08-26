<script setup lang="ts"></script>
<template>
  <section id="statics" class="pt-16 md:pt-24 w-full">
    <div class="max-w-7xl mx-auto mb-20 space-y-6 px-6">
      <h2
        class="text-center text-3xl md:text-4xl font-bold text-primary dark:text-white rtl:font-arabic"
      >
        {{ $t("staticSection.title") }}
      </h2>
      <div
        class="flex flex-col md:flex-row gap-6 justify-between items-stretch mt-16"
      >
        <div
          class="flex flex-col items-center gap-2 flex-1 rounded-3xl bg-surface dark:bg-white/5 px-8 py-10 text-primary dark:text-hero"
        >
          <SvgIcon name="student-cap" size="h-16 w-16" />
          <CountUp :to="492" suffix="K+" class="text-3xl font-bold" />
          <span class="text-center">{{ $t("staticSection.studiendCount") }}</span>
        </div>
        <div
          class="flex flex-col items-center gap-2 flex-1 rounded-3xl bg-surface dark:bg-white/5 px-8 py-10 text-primary dark:text-hero"
        >
          <SvgIcon name="employee" size="h-16 w-16" />
          <CountUp :to="588" suffix="K+" class="text-3xl font-bold" />
          <span class="text-center">{{ $t("staticSection.workPermits") }}</span>
        </div>
        <div
          class="flex flex-col items-center gap-2 flex-1 rounded-3xl bg-surface dark:bg-white/5 px-8 py-10 text-primary dark:text-hero"
        >
          <SvgIcon name="university" size="h-16 w-16" />
          <CountUp :to="30" suffix="%" class="text-3xl font-bold" />
          <span class="text-center">{{ $t("staticSection.forigensInUni") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
