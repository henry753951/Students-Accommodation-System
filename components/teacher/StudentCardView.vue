<template>
  <div class="space-y-4">
    <Card
      v-for="student in students"
      :key="student.id"
      class="border rounded-lg"
      @click="navigateTo(`/teacher/student/${student.student?.user_id}`)"
    >
      <CardHeader>
        <CardTitle>{{ student.student?.app_user?.name }}</CardTitle>
        <CardDescription>{{ student.student?.school_department?.department_name }}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>學號: {{ student.student?.student_number }}</p>
      </CardContent>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import type { QueryData} from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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