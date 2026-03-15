export const useCookieConsent = () => {
  const consent = useCookie("cookie_consent", { default: () => "unset" })

  const accept = () => {
    consent.value = "accepted"
    updateGTM("granted")
  }

  const reject = () => {
    consent.value = "rejected"
    updateGTM("denied")
    window.dataLayer = []
  }

  const updateGTM = (value: "granted" | "denied") => {
    if (typeof window === "undefined") return

    window.dataLayer = window.dataLayer || []

    window.dataLayer.push({
      event: "consent_update",
      analytics_storage: value,
      ad_storage: value,
    })
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    })
  }

  return { consent, accept, reject }
}
