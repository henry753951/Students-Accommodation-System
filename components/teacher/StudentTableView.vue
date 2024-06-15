<template>
  <div class="border rounded-lg">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>學生姓名</TableHead>
          <TableHead>學號</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="student in students"
          :key="student.id"
        >
          <TableCell>{{ student.student?.app_user?.name }}</TableCell>
          <TableCell>{{ student.student?.student_number }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';


const supabase = useSupabaseClient<Database>();
const { data: students, refresh } = useAsyncData("student", async () => {
  const user = await useAsyncUser();
  console.log("user", user.value);
  if (!user.value) {
    return [];
  }
  console.log("123");
  const { data, error } = await supabase.from("map_teacher_student").select("*, student(*, app_user(*)), teacher(*)").eq("teacher_id", user.value?.id);
  if (error) {
    throw error;
  }
  return data;
});

defineExpose({
  refresh,
});







</script>
<style></style>