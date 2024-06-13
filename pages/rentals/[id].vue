<template>
  <p>
    {{ id }}
    
  </p>
</template>

<script lang="ts" setup>
definePageMeta({
  name: '租屋資訊',
});
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
const route = useRoute();
const id = ref(route.params.id);
const supabase = useSupabaseClient<Database>();


</script>

<style>

</style>