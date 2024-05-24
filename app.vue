<template>
  <Toaster />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: "校外租屋平台",
  meta: [
    {
      name: "description",
      content: "校外租屋平台",
    },
  ],
  htmlAttrs: {
    class: "theme-zinc",
  },
});
</script>
