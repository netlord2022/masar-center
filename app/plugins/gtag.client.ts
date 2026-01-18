import { useConsent } from "~/composables/useConsent"
export default defineNuxtPlugin(() => {
  const { consent } = useConsent()
  const gtagId = useRuntimeConfig().public.gtagId

  watch(
    () => consent.value.analytics,
    (allowed) => {
      if (allowed && gtagId) {
        loadGtag(gtagId as string)
      }
    },
    { immediate: true }
  )
})

function loadGtag(id: string) {
  if (window.dataLayer) return

  window.dataLayer = window.dataLayer || []
  window.gtag = function (...args: []) {
    window.dataLayer.push(args)
  }
  window.gtag("js", new Date())
  window.gtag("config", id)

  const script = document.createElement("script")
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  script.async = true
  script.crossOrigin = "anonymous"
  document.head.appendChild(script)
}
