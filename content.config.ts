// content.config.ts
import { defineContentConfig, defineCollection, z } from "@nuxt/content"

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string().default(() => new Date().toISOString().split("T")[0]),
  photo: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: { include: "blog/**" },
      schema: blogSchema,
    }),
  },
})
