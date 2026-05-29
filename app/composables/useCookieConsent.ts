export type ConsentPreferences = {
  accepted: boolean
  timestamp: number
}

export const useCookieConsent = () => {
  // Cookie keeps SSR working
  const consent = useCookie<"unset" | "accepted" | "rejected">(
    "cookie_consent",
    {
      default: () => "unset" as const,
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: true,
      path: "/",
    }
  )

  // localStorage is the source of truth for the client banner
  const preferences = useLocalStorage<ConsentPreferences | null>(
    "cookie_preferences",
    null,
    {
      serializer: {
        read: (v: string) => JSON.parse(v),
        write: (v: ConsentPreferences | null) => JSON.stringify(v),
      },
    }
  )

  const accept = () => {
    consent.value = "accepted"
    preferences.value = { accepted: true, timestamp: Date.now() }
  }

  const reject = () => {
    consent.value = "rejected"
    preferences.value = { accepted: false, timestamp: Date.now() }
    if (import.meta.client) window.location.reload()
  }
  const reset = () => {
    consent.value = "unset"
    preferences.value = null
  }

  return { consent, preferences, accept, reject, reset }
}
