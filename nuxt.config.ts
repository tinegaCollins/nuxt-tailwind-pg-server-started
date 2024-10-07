// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@prisma/nuxt",
    "nuxt-auth-utils",
    "notivue/nuxt",
    "@nuxt/image",
  ],
  devtools: { enabled: true },
  css: [
    "~/assets/style.css",
    "notivue/notification.css",
    "notivue/animations.css",
  ],
  runtimeConfig: {
    oauth: {
      google: {
        clientId: useRuntimeConfig().oauth.google.clientId,
        clientSecret: useRuntimeConfig().oauth.google.clientSecret,
      },
      facebook: {
        clientId: useRuntimeConfig().oauth.facebook.clientId,
        clientSecret: useRuntimeConfig().oauth.facebook.clientSecret,
      },
      instagram: {
        clientId: useRuntimeConfig().oauth.instagram.clientId,
        clientSecret: useRuntimeConfig().oauth.instagram.clientSecret,
      },
    },
  },
  app: {
    head: {
      title: "This is the title of the page",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width,initial-scale=1" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/logo.png",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",
        },
      ],
    },
  },
  notivue: {
    limit: 3,
    avoidDuplicates: true,
    notifications: {
      global: {
        duration: 5000,
      },
    },
  },
});
