<template>
  <Skeleton
    v-if="pending"
    class="h-[50px] rounded-lg border"
  />
  <div v-else-if="rentals?.length !== 0">
    <div

      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="property in rentals"

        :key="property.id!"
        class="p-5 rounded-lg shadow-lg bg-gray-200 dark:bg-gray-800"
      >
        <NuxtLink
          :to="'/rentals/' + property.id"
          class="block"
        >
          <img
            :src="property.rental_property.image!"
            alt="House Image"
            class="w-full h-64 object-cover rounded-lg mb-3"
          >
          <div
            :class="{ 'text-green-500': property.is_currently_renting, 'text-red-500': !property.is_currently_renting }"
            class="font-semibold"
          >
            <span v-if="property.is_currently_renting">Active</span>
            <span v-else>Inactive</span>
          </div>
          <div class="text-lg">
            {{ property.name }}
            {{ property.rental_property.address }}
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
  
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
    required: true,
  },
});

const user = await useAsyncUser();

const { data: rentals, pending } = await useAsyncData("map_rental_property_student", async () => {
  const { data, error } = await supabase.from("map_rental_property_student").select("*, rental_property!inner(*)").eq("student_id", props.studentUserId);
  if (error) {
    throw error;
  }
  return data;
});
</script>

<style></style>
