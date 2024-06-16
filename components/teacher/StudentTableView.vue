<template>
  <div class="border rounded-lg">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>學生姓名</TableHead>
          <TableHead>系所</TableHead>
          <TableHead>學號</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="student in students"
          :key="student.id"
          class="cursor-pointer"
          @click="navigateTo(`/teacher/student/${student.student?.user_id}`)"
        >
          <TableCell>{{ student.student?.app_user?.name }}</TableCell>
          <TableCell>{{ student.student?.school_department?.department_name }}</TableCell>
          <TableCell>{{ student.student?.student_number }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import type { QueryData} from '@supabase/supabase-js';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const supabase = useSupabaseClient<Database>();
const tempQuery = supabase.from("map_teacher_student").select("*, student(*, app_user(*), school_department(*)), teacher(*)").single();
type student = QueryData<typeof tempQuery>;
defineProps({
  students: {
    type: Array as PropType<student[]>,
    required: true,
  },
});
</script>
<style></style>
