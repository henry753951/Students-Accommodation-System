<template>
  <div>
    <div class="flex justify-center items-center h-screen">
      <div class="flex flex-col items-center">
        <div class="text-2xl font-bold">
          登入中...
        </div>
        <div class="mt-5">
          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
definePageMeta({
  layout: "account-no-nav",
});
const supabase = useSupabaseClient<Database>();
const supabaseUser = useSupabaseUser();
const user = ref({
  id: supabaseUser.value?.id,
  email: supabaseUser.value?.email,
});

const { data: student } = await useAsyncData(async () => {
  const { data, error } = await supabase.from("studentimport").select("*").eq("email", user.value!.email!).limit(1).single();
  if (error) {
    throw error;
  }
  return data;
});
const { data: teacher } = await useAsyncData(async () => {
  const { data, error } = await supabase.from("teacherimport").select("*").eq("email", user.value!.email!).limit(1).single();
  if (error) {
    throw error;
  }
  return data;
});


onMounted(async () => {
  if (user.value) {
    if (student.value) {
      await supabase.from("student").upsert({
        user_id: user.value!.id!,
        student_number: student.value!.email!.split('@')[0],
        department_id: student.value!.department_uuid
      });
      await supabase.from("app_user").update({ name: student.value!.name }).eq("id", user.value!.id!);
    }
    if (teacher.value) {
      await supabase.from("teacher").upsert({
        user_id: user.value!.id!,
        department_id: teacher.value!.department_uuid
      });
      await supabase.from("app_user").update({ name: teacher.value!.name }).eq("id", user.value!.id!);
    }

    const { data } = await supabase.from("app_user").select("*").eq("id", user.value!.id!).single();
    if (data) {
      if (data.first_time) {
        navigateTo("/auth/role_select");
      }
    }
  }else{
    navigateTo("/auth/login");
  }
  navigateTo("/");
});


</script>
<style></style>
