// plugins/gtag.client.ts
import { useGoogleAnalytics } from "~/composables/useGoogleAnalytics"
export default defineNuxtPlugin(() => {
  const { initGA } = useGoogleAnalytics()
  initGA()
})
