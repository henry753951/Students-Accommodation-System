<template>
  <Skeleton
    v-if="status === 'pending'"
    class="h-[50px] rounded-lg border"
  />
  <template
    v-else-if="rentals && rentals.length > 0"
  >
    <div
      v-for="rental in rentals"
      :key="rental.id"
      class="rounded-lg flex flex-col gap-5 bg-card shadow-lg"
    >
      <img
        :src="rental.rental_property!.image || 'https://via.placeholder.com/150'"
      >
      <div class="p-3">
        <h2 class="text-xl font-bold">
          {{ rental.name }}
        </h2>
        <p>
          {{ rental.rental_property!.address }}
        </p>
      </div>
    </div>
  </template>
  
  <div
    v-else
    class="m-5 p-5 rounded-lg flex justify-center"
  >
    <div>無資料</div>
  </div>
</template>
<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
const toast = useToast();
const supabase = useSupabaseClient<Database>();
const props = defineProps({
  studentUserId: {
    type: String,
    default: null,
  },
  landlord: {
    type: String,
    default: null,
  }
});

const { data: rentals, status } = await useAsyncData("rentals_", async () => {
  const query = supabase.from("map_rental_property_landlord")
    .select("*, rental_property(*)");

  if (props.studentUserId) {
    query.eq("student_user_id", props.studentUserId);
  }
  if (props.landlord) {
    query.eq("landlord", props.landlord);
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }
  return data;
});
</script>
<style></style>
