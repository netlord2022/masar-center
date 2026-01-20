// cookie copilot
export const useConsent = () => {
  const consent = useState("consent", () => ({
    analytics: false,
    marketing: false,
    functional: true,
    decided: false,
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  }))

  const setConsent = (data: Partial<typeof consent.value>) => {
    consent.value = { ...consent.value, ...data, decided: true }
    localStorage.setItem("cookie_consent", JSON.stringify(consent.value))
  }

  const loadConsent = () => {
    const saved = localStorage.getItem("cookie_consent")
    if (saved) consent.value = JSON.parse(saved)
  }

  return { consent, setConsent, loadConsent }
}
