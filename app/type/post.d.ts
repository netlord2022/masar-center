export interface Post {
  alternates: unknown[]

  content: PostContent

  created_at: string
  default_full_slug: string | null
  first_published_at: string
  full_slug: string
  group_id: string
  id: number

  is_startpage: boolean
  lang: string

  meta_data: Record<string, unknown> | null

  name: string
  parent_id: number

  path: string | null
  position: number

  published_at: string
  release_id: string | null

  slug: string
  sort_by_date: string | null

  tag_list: string[]
  translated_slugs: unknown[] | null

  updated_at: string
  uuid: string
}

export interface PostContent {
  _uid: string
  component: "post"

  content: RichTextDoc

  cover_image: StoryblokAsset

  date: string
  excerpt: string

  locale: string
  slug: string

  tags: string[]

  title: string
}

export interface RichTextDoc {
  type: "doc"
  content: ParagraphNode[]
}

export interface ParagraphNode {
  type: "paragraph"

  attrs: {
    dir: string
    textAlign: string | null
  }

  content: TextNode[]
}

export interface TextNode {
  type: "text"
  text: string
}

export interface StoryblokAsset {
  alt: string
  copyright: string

  fieldtype: "asset"

  filename: string
  focus: string

  id: number

  is_external_url: boolean

  meta_data: Record<string, unknown>

  name: string
  source: string
  title: string
}
