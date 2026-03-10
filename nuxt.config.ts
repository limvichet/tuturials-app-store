import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: { plugins: [tailwindcss()]},
  $development: {
    runtimeConfig: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
      public: { siteUrl: process.env.NUXT_PUBLIC_SITE_URL }
    },
  },
  $production: {
    runtimeConfig: {
      apiBaseUrl: process.env.NUXT_API_BASE_URL,
      public: { siteUrl: process.env.NUXT_PUBLIC_SITE_URL }
    },
  },
})
