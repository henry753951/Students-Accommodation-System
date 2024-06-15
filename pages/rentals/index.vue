<template>
  <div class="container">
    <StudentRentalsView :student-user-id="user!.id" />
  </div>
</template>

<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";

definePageMeta({
  name: '租屋清單',
});
const toast = useToast();
const supabase = useSupabaseClient<Database>();
const user = await useAsyncUser();

</script>

<style></style>