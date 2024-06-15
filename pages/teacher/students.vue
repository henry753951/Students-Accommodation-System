<template>
  <div class="p-4 container">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">
        您的學生
      </h1>
      <div>
        <Button
          class="mr-2"
          @click="refresh"
        >
          刷新
        </Button>
        <TeacherAddStudent @on-student-add="bindStudent" />
      </div>
    </div>
    <template v-if="students">
      <TeacherStudentTableView
        :students="students"
        class="hidden lg:block"
      />
      <TeacherStudentCardView
        :students="students"
        class="block lg:hidden"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
definePageMeta({
  name: "學生分配",
});

const toast = useToast();
const supabase = useSupabaseClient<Database>();

const { data: students, refresh } = await useAsyncData("student", async () => {
  const user = await useAsyncUser();
  if (!user.value) {
    return [];
  }
  const { data, error } = await supabase.from("map_teacher_student").select("*, student(*, app_user(*), school_department(*)), teacher(*)").eq("teacher_id", user.value?.id);
  if (error) {
    throw error;
  }
  return data;
});


const bindStudent = async (user_id: string) => {
  const user = await useAsyncUser();
  if (!user.value) {
    return;
  }
  const { error } = await supabase.from("map_teacher_student").insert({
    student_id: user_id,
    teacher_id: user.value.id,
  });
  if (error) {
    throw error;
  }
  refresh();
  toast.toast({
    title: "成功",
    description: "學生已經成功綁定",
    variant: "default",
  });
};
</script>

<style scoped></style>
