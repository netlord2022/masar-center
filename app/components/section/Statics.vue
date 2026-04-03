<script setup lang="ts"></script>
<template>
  <section id="statics" class="pt-16 md:pt-24 w-full">
    <div class="max-w-7xl mx-auto mb-20 space-y-6 px-6">
      <h2
        class="text-center text-3xl md:text-4xl font-bold text-yellow-600 dark:text-yellow-400"
      >
        {{ $t("staticSection.title") }}
      </h2>
      <div
        class="flex flex-col md:flex-row gap-y-10 md:gap-y-6 justify-between items-center mt-16 text-yellow-600 dark:text-yellow-400"
      >
        <div class="flex flex-col items-center gap-2">
          <SvgIcon name="student-cap" size="h-24 w-24  " />
          <CountUp :to="492" suffix="K+" class="text-3xl font-bold" />
          <span>{{ $t("staticSection.studiendCount") }}</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <SvgIcon name="employee" size="h-24 w-24  " />
          <CountUp :to="588" suffix="K+" class="text-3xl font-bold" />
          <span>{{ $t("staticSection.workPermits") }}</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <SvgIcon name="university" size="h-24 w-24  " />
          <CountUp :to="30" suffix="%" class="text-3xl font-bold" />
          <span>{{ $t("staticSection.forigensInUni") }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
