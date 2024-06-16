<template>
  <Skeleton
    v-if="status === 'pending'"
    class="h-[50px] rounded-lg border"
  />
  <div
    v-else-if="rentals && rentals.length > 0"
    class="m-5 p-5 rounded-lg"
  >
    <!--  -->
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
    default: null,
  },
  landlord: {
    type: String,
    default: null,
  }
});

const { data: rentals, status } = await useAsyncData("rentals_", async () => {
  const query = supabase.from("rental_property")
    .select("*");

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
