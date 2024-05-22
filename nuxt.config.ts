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
  alias: {
    images: fileURLToPath(new URL("./assets/images", import.meta.url)),
    styles: fileURLToPath(new URL("./assets/styles", import.meta.url)),
  },
  modules: [
    [
      "@nuxtjs/google-fonts",
      {
        // Add options for Google Fonts
        // https://google-fonts.nuxtjs.org/options
        families: {
          "Open+Sans": [300, 400, 600, 700],
        },
      },
    ],
    [
      "@nuxt/image",
      {
        // add nuxt-image config here
        // https://v1.image.nuxtjs.org/configuration
        dir: "assets/images/",
      },
    ],
    [
      "@vueuse/nuxt",
      {
        // No options, but see the section Caveats for further info
        // https://www.npmjs.com/package/@vueuse/nuxt}
      },
    ],
    [
      "@nuxtjs/color-mode",
      {
        // Control the site color Mode
        // https://color-mode.nuxtjs.org/
      },
    ],
    [
      "nuxt-icon",
      {
        // Add custom options for NuxtIcon
        // https://github.com/nuxt-modules/icon
      },
    ],
    [
      "@morev/vue-transitions/nuxt",
      {
        // Add custom options for vueTransitions
        // https://github.com/MorevM/vue-transitions#usage-with-nuxt
      },
    ],
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/eslint",
  ],
});
