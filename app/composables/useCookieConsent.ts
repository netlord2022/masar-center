export const useCookiesConsent = () => {
  const consent = useCookie<"accepted" | "rejected" | null>("cookie_consent", {
    default: () => null,
    sameSite: "lax",
  })

  const accept = () => {
    consent.value = "accepted"
    window?.gtag?.("consent", "update", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    })
  }

  const reject = () => {
    consent.value = "rejected"
  }

  return { consent, accept, reject }
}
