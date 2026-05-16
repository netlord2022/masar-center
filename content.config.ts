// content.config.ts
import { defineContentConfig, defineCollection, z } from "@nuxt/content"

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  cover: z.string().optional(),
})

export default defineContentConfig({
  collections: {
    blog_en: defineCollection({
      type: "page",
      source: { include: "en/blog/**", prefix: "/blog" },
      schema: blogSchema,
    }),
    blog_de: defineCollection({
      type: "page",
      source: { include: "de/blog/**", prefix: "/de/blog" },
      schema: blogSchema,
    }),
    blog_ar: defineCollection({
      type: "page",
      source: { include: "ar/blog/**", prefix: "/ar/blog" },
      schema: blogSchema,
    }),
  },
})
