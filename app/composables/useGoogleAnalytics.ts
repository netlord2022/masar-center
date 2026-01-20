// composables/useGoogleAnalytics.ts
export const useGoogleAnalytics = () => {
  const config = useRuntimeConfig()
  const cookieConsent = useCookie("cookie-consent", {
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })

  const initGA = () => {
    if (cookieConsent.value !== "accepted") return
    console.log("config.public.gaId", config.public.gaId)

    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.public.gaId}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag
    gtag("js", new Date())
    gtag("config", config.public.gaId, {
      anonymize_ip: true, // Required for German privacy
    })
  }

  const acceptCookies = () => {
    cookieConsent.value = "accepted"
    initGA()
  }

  const declineCookies = () => {
    cookieConsent.value = "declined"
  }

  return {
    cookieConsent,
    acceptCookies,
    declineCookies,
    initGA,
  }
}
