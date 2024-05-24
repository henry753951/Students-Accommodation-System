import { fileURLToPath } from "node:url";

export default defineNuxtConfig({
  shadcn: {
    /**
     * Prefix for all the imported component
     */
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
  csurf: {
    https: false,
    cookie: {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    },
    methodsToProtect: ["POST", "PUT", "PATCH"], // the request methods we want CSRF protection for
    addCsrfTokenToEventCtx: true, // default false, to run useCsrfFetch on server set it to true
  },
  colorMode: {
    classSuffix: "",
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
  ],
  experimental: {
    viewTransition: true,
  },
});
