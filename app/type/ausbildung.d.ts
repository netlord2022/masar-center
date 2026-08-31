import type { RichTextDoc } from "./post"

export type AusbildungStatus = "open" | "archived"

export interface AusbildungOfferContent {
  _uid: string
  component: "ausbildung_offer"

  reference: string

  title: string
  profession: string
  sector: string
  region: string
  start: string
  duration: string
  language_level: string

  positions?: number

  summary: string
  requirements?: RichTextDoc
  benefits?: RichTextDoc

  status: AusbildungStatus
  archived_at?: string

  seo_title?: string
  seo_description?: string
}

export interface AusbildungOffer {
  content: AusbildungOfferContent

  created_at: string
  first_published_at: string
  full_slug: string
  id: number
  is_startpage: boolean
  lang: string
  name: string
  published_at: string
  slug: string
  uuid: string
}
