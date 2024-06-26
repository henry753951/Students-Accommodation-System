
export default defineNuxtConfig({
  ssr: true,
  shadcn: {
    prefix: "",
  },
  devtools: true,
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-tw",
      },
      title: "校外租屋平台",
    },
  },
  components: {
    dirs: ["~/components"],
  },
  supabase: {
    redirect: false,
  },
  colorMode: {
    preference: "system",
    classSuffix: "",
    storageKey: "color-mode",
  },
  nitro: {
    azure: {
      config: {
        platform: {
          apiRuntime: "node:18",
        },
      },
    },
    experimental: {
      openAPI: true,
    },
  },
  routeRules: {
    "/auth/callback": { ssr: false },
    // "/api/*": {
    //   csurf: {
    //     https: false,
    //     cookie: {
    //       path: "/",
    //       httpOnly: true,
    //       sameSite: "strict",
    //     },
    // methodsToProtect: ["POST", "PUT", "PATCH", "GET"],
    // addCsrfTokenToEventCtx: true,
    //   },
    // },
  },
  vite: {
    optimizeDeps: {
      exclude: ['vee-validate']
    }
  },
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        // https://google-fonts.nuxtjs.org/options
        families: {
          "Open+Sans": [300, 400, 600, 700],
        },
      },
    ],
    [
      "@nuxt/image",
      {
        dir: "assets/images/",
      },
    ],
    "nuxt-csurf",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/eslint",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@nuxtjs/color-mode",
    "@morev/vue-transitions/nuxt",
    // RWD
    // https://nuxt.com/modules/nuxt-viewport
    "nuxt-viewport",
    // Supabase
    // https://supabase.nuxtjs.org/get-started
    "@nuxtjs/supabase",
    "vue-view-transitions/nuxt",
    "@vee-validate/nuxt",
  ],
  // experimental: {
  //   viewTransition: true,
  // },
});
