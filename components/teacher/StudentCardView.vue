<template>
  <div class="space-y-4">
    <Card
      v-for="student in students"
      :key="student.id"
      class="card bg-card hover:bg-background hover:shadow-lg border-none"
      @click="
        navigateTo(`/teacher/student/${student.student?.user_id}`)"
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
import type { QueryData } from '@supabase/supabase-js';
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
<style scoped>
.card {
  transition: all 0.3s;
  /* rounded-lg */
  border-radius: 0.5rem;
  cursor: pointer;
}
.dark .card {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
}
</style>