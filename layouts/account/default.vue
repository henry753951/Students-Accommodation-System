<template>
  <div class="flex">
    <!-- <MenuLeft class="w-64 sticky top-0" /> -->
    <div class="inline-block w-full">
      <MenuTop class="p-2 sticky top-0" />
      <div class="p-4">
        Default Account Layout
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
