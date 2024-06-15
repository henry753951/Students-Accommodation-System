<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">
        您的學生
      </h1>
      <div>
        <Button
          class="mr-2"
          @click="TeacherStudentTableViewRef?.refresh"
        >
          刷新
        </Button>
        <TeacherAddStudent />
      </div>
    </div>
    <TeacherStudentTableView ref="TeacherStudentTableViewRef" />
  </div>
</template>

<script setup lang="ts">
import type { Database, Tables, Enums } from "~/database.types";
import TeacherStudentTableView from "~/components/teacher/StudentTableView.vue";
import { useToast } from "~/components/ui/toast/use-toast";

definePageMeta({
  name: "學生分配",
});

const toast = useToast();
const TeacherStudentTableViewRef = ref<InstanceType<typeof TeacherStudentTableView> | null>(null);
const students = ref([
  { id: 1, name: '學生A' },
  { id: 2, name: '學生B' },
  { id: 3, name: '學生C' },
]);


</script>

<style scoped>
</style>