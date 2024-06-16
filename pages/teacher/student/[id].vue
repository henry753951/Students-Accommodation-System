<template>
  <div class="p-4 container">
    <div class="flex items-end gap-8">
      <Card class="w-full">
        <CardHeader>
          <CardTitle>{{ student_data!.student?.app_user?.name }}</CardTitle>
          <CardDescription>
            學號: {{ student_data!.student?.student_number }}<br>
            科系: {{ student_data!.student?.school_department?.department_name }}
          </CardDescription>
        </CardHeader>
      </Card>
      <Button
        variant="destructive"
        @click="handleUnbindStudent"
      >
        取消綁定此學生
      </Button>
    </div>

    <Tabs
      default-value="visit-records"
      class="mt-4"
    >
      <TabsList class="w-full">
        <TabsTrigger
          value="visit-records"
          class="w-full"
        >
          訪視紀錄
        </TabsTrigger>
        <TabsTrigger
          value="rental-points"
          class="w-full"
        >
          租屋點
        </TabsTrigger>
      </TabsList>
      <TabsContent value="visit-records">
        <InterviewList :student-user-id="student_id" />
      </TabsContent>
      <TabsContent value="rental-points">
        <StudentRentalsView :student-user-id="student_id" />
      </TabsContent>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
import type { Database } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

definePageMeta({
  name: "學生資料",
});

const student_id = useRoute().params.id as string;
const toast = useToast();
const supabase = useSupabaseClient<Database>();

const { data: student_data } = await useAsyncData("student", async () => {
  const user = await useAsyncUser();
  if (!user.value) {
    throw new Error("User not found");
  }
  const { data, error } = await supabase.from("map_teacher_student")
    .select("*, student(*, app_user(*), school_department(*)), teacher(*)")
    .eq("teacher_id", user.value?.id)
    .eq("student_id", student_id).limit(1).single();
  if (error) {
    throw error;
  }
  return data;
});

const handleUnbindStudent = async () => {
  const { error } = await supabase.from("map_teacher_student")
    .delete()
    .eq("teacher_id", student_data.value!.teacher_id)
    .eq("student_id", student_data.value!.student_id);
  if (error) {
    throw error;
  }
  toast.toast({
    title: "成功",
    description: "學生已經成功解除綁定",
    variant: "default",
  });
  navigateTo("/teacher/students");
};
</script>

<style>
/* 你可以在這裡添加自定義樣式 */
</style>