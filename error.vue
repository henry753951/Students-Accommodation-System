<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div v-if="error">
    <h1>Error: {{ error.statusCode }}</h1>
    <pre>{{ error.message }}</pre>
    <button @click="handleError">
      Clear errors
    </button>
  </div>
</template>
