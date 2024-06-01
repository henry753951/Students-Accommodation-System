<template>
  <div class="w-11/12 mx-auto mt-6 table-container rounded-lg shadow-lg">
    <Table>
      <!-- <TableCaption>A list of your Student List.</TableCaption> -->
      <TableHeader>
        <TableRow class="flex flex-row items-center bg-slate-100 hover:bg-slate-100 rounded-t-lg">
          <TableHead class="basis-4/12">
            User ID
          </TableHead>
          <TableHead class="basis-3/12">
            Department ID
          </TableHead>
          <TableHead class="basis-2/12">
            Student Number
          </TableHead>
          <TableHead class="basis-2/12">
            Check Add
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(data, index) in All_Student"
          :key="index"
          class="flex items-center r ounded"
        >
          <TableCell class="basis-4/12">
            {{ data.user_id }}
          </TableCell>
          <TableCell class="basis-3/12">
            {{ data.department_id }}
          </TableCell>
          <TableCell class="basis-2/12">
            {{ data.student_number }}
          </TableCell>
          <Checkbox
            :id="'terms-' + index"
            v-model:checked="data.isChecked"
            class="ml-4"
          />
          <label
            :for="'terms-' + index"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-3"
          >
            {{ data.isChecked ? "Teacher_id" : '未被分發' }}
          </label>
        </TableRow>
      </TableBody>
    </Table>
    <div class="flex justify-end mt-0 bg-transparent">
      <Button @click="handleSubmit()">
        Submit
      </Button>
    </div>
    {{ All_Student[0].isChecked }}
  </div>
</template>
<script setup lang="ts">
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
import * as z from 'zod';
import { useModel } from 'vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Student } from "~/types";
definePageMeta({
  name: "學生分配",
});
const toast = useToast();
const supabase = useSupabaseClient<Database>();
const All_Student = ref<Array<Student>>([]);

onMounted(() => {
  ListAllStudent();
});
const ListAllStudent = async () => {
  const { data, error } = await supabase
    .from("student")
    .select("user_id, department_id, student_number, app_user(*)".eq(
      "app_user_id",
      null
    ));
  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return 'error';
  }
  All_Student.value = [];
  // All_Student.value = data.map(student => ({ ...student, isChecked: false }));
  for (let i = 0; i < data.length; i++) {
    // 判斷那些教授有選擇學生了 isCHecked 顯示教授名字
    if (i == 0) {
      All_Student.value.push({
        user_id: data[i].user_id,
        department_id: data[i].department_id,
        student_number: data[i].student_number,
        isChecked: false
      });
    } else {
      All_Student.value.push({
        user_id: data[i].user_id,
        department_id: data[i].department_id,
        student_number: data[i].student_number,
        isChecked: true
      });
    }

  }
};

const handleSubmit = async () => {
  const now_time = new Date().toISOString();
  for (let i = 0; i < All_Student.value.length; i++) {
    if (All_Student.value[i].isChecked) {
      const { data, error } = await supabase
        .from("map_teacher_student")
        .insert([
          {
            "id": All_Student.value[i].user_id,
            "teacher_id": All_Student.value[i].department_id,
            "student_id": All_Student.value[i].user_id,
            "created_at": now_time,
            "updated_at": now_time,
          }
        ]);
      if (error) {
        toast.toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
    }
  }

};



</script>
<style scoped>
.table-container {
  background-color: #e2e8f0;
  /* slate-300 */
}
</style>
