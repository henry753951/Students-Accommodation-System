<template>
  <div class="flex">
    <!-- <MenuLeft class="w-64 sticky top-0" /> -->
    <div class="inline-block w-full">
      <MenuTop class="p-2 sticky top-0 z-20" />
      <div class="p-4">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped></style>
