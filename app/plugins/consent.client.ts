import { useConsent } from "~/composables/useConsent"
export default defineNuxtPlugin(() => {
  const { loadConsent } = useConsent()
  loadConsent()
})
