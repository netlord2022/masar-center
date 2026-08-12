/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  const component: DefineComponent<Record<string, unknown>, object, unknown>
  export default component
}

interface Window {
  dataLayer: unknown[]
}
