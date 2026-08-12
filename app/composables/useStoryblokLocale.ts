//
export const useStoryblokLocale = () => {
  const { locale } = useI18n()
  const sbLocale = computed(() => (locale.value === "ar" ? "ar" : "en"))
  return { sbLocale }
}
