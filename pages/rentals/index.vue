<template>
  <div class="container">
    <div class="w-full flex flex-col justify-center">
      <div class="flex">
        <Button
          class="bg-green-600 text-white px-4 py-2 rounded mr-auto dark:bg-green-900"
          @click="navigateTo('/rentals/add')"
        >
          新增
        </Button>
      </div>
      <div class="mt-3">
        <StudentRentalsView :student-user-id="user!.id" />
      </div>
    </div>
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

<style scoped>
</style>