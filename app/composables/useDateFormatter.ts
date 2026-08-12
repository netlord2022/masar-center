import { useDateFormat, useNow } from "@vueuse/core"
export const useDateFormatter = (date?: string | Date) => {
  const { locale } = useI18n()
  const formatter = shallowRef("YYYY-MM-DD")
  if (locale.value === "ar") {
    formatter.value = "DD-MM-YYYY"
  }
  if (date) {
    return useDateFormat(date, formatter, {
      locales: locale.value,
    })
  } else {
    return useDateFormat(useNow(), formatter, {
      locales: locale.value,
    })
  }
}
