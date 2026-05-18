export const useCookieConsent = () => {
  const consent = useCookie("cookie_consent", {
    default: () => "unset" as "unset" | "accepted" | "rejected",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: true,
    path: "/",
  })

  const accept = () => {
    consent.value = "accepted"
  }

  const reject = () => {
    consent.value = "rejected"
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  return { consent, accept, reject }
}
