<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { cn } from "@/lib/utils";
import { type DividerVariants, dividerVariants } from ".";
const props = defineProps<{
  class?: HTMLAttributes["class"];
  text?: string;
  textClass?: {
    type: HTMLAttributes["class"];
    default: "text-gray-500 dark:text-gray-400";
  };
}>();
</script>

<template>
  <div class="flex gap-3 items-center">
    <hr :class="cn(dividerVariants(), props.class)">
    <span
      class="text-nowrap"
      :class="textClass"
    >{{ props.text }}</span>
    <hr :class="cn(dividerVariants(), props.class)">
  </div>
</template>

<style scoped></style>
