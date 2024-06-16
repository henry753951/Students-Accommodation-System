<template>
  <Skeleton
    v-if="pending"
    class="h-[50px] rounded-lg border"
  />
  <div
    v-for="property in rentals"
    v-else-if="rentals?.length !== 0"
    :key="property.id"
    class="p-5 rounded-lg shadow-sm flex justify-between items-center bg-card mb-2"
  >
    <div>
      <div class="text-lg font-bold">
        <NuxtLink :to="'/rentals/' + property.id">
          {{ property.name || '無名稱' }}
        </NuxtLink>
      </div>
      <p>{{ property.rental_property.address }}</p>
    </div>

    <div>
      <div :class="{ 'text-red-500': property.is_currently_renting }">
        <span v-if="property.is_currently_renting">租賃中</span>
        <span v-else>未租賃</span>
      </div>
      <NuxtLink
        :to="'/rentals/edit/' + property.id"
        class="text-blue-500"
      >
        修改房屋資訊
      </NuxtLink>
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

const { data: rentals, pending } = await useAsyncData("map_rental_property_student", async () => {
  const { data, error } = await supabase.from("map_rental_property_student").select("*, rental_property!inner(*)").eq("student_id", props.studentUserId);
  if (error) {
    throw error;
  }
  return data;
});
</script>

<style></style>
