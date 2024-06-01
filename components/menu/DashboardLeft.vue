<template>
  <div class="h-[100dvh] bg-secondary">
    <div class="flex flex-col">
      <!-- header -->
      <div class="p-4 font-mono text-xl">
        校外租屋平台
      </div>
      <!-- menu -->
      <div class="flex flex-col p-4 space-y-2">
        <nuxt-link
          to="/management/user"
          class="p-2 bg-white rounded hover:bg-gray-200 dark:bg-black dark:text-white"
        >
          使用者管理
        </nuxt-link>
        <nuxt-link
          to="/management/department"
          class="p-2 bg-white rounded hover:bg-gray-200 dark:bg-black dark:text-white"
        >
          系所管理
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>