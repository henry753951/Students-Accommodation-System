<template>
  <Social :property-id="current_property_id" />
</template>

<script setup lang="ts">
import type { Database, Tables, Enums, Json } from "~/database.types";
const route = useRoute();
const current_property_id = ref(route.params.id as string);

definePageMeta({
  name: "留言板",
});

//租屋點資料

</script>

<style scoped>

</style>
