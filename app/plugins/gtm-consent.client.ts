export default defineNuxtPlugin(() => {
  window.dataLayer = window.dataLayer || []

  window.dataLayer.push({
    consent_default: true,
    analytics_storage: "denied",
    ad_storage: "denied",
  })
})
