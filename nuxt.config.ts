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
        clientId:
          "293986103676-pa05nnmh8uskecrm0a11emrcquo1tfod.apps.googleusercontent.com",
        clientSecret: "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",
      },
      facebook: {
        clientId: "1970205496815189",
        clientSecret: "795bf147162ad4cbae0ac4432f554895",
      },
      instagram: {
        clientId: "123456789",
        clientSecret: "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",
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
