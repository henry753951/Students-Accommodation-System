<template>
  <div />
</template>

<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
definePageMeta({
  name: "學生資料",
});
const student_id = useRoute().params.id;
const toast = useToast();
const supabase = useSupabaseClient<Database>();

const { data:student_data } = useAsyncData("student", async () => {
  const user = await useAsyncUser();
  if (!user.value) {
    return [];
  }
  const { data, error } = await supabase.from("map_teacher_student")
  .select("*, student(*, app_user(*), school_department(*)), teacher(*)")
  .eq("teacher_id", user.value?.id)
  .eq("student_id", student_id).single();
  if (error) {
    throw error;
  }
  return data;
});


</script>

<style>

</style>