<template>
  <Toaster />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div class="role-tag p-4 opacity-80 rounded-xl text-2xl font-bold m-2">
    <template v-if="user?.roles.includes('admin')">
      管理員
    </template>
    <template v-if="user?.roles.includes('teacher')">
      老師
    </template>
    <template v-if="user?.roles.includes('student')">
      學生
    </template>
    <template v-if="user?.roles.includes('landlord')">
      房東
    </template>
  </div>
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

const user = await useAsyncUser();


</script>

<style scoped>
.role-tag{
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgb(222, 61, 61);
  color: white;
  z-index: 9999;
}
</style>
