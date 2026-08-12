import post from "../app/components/storyblok/post.vue"
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("post", post)
})
