<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="outline">
        {{ title }}
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>
          {{ description }}
        </DialogDescription>
      </DialogHeader>
      <div class="mt-4">
        <!-- <Button  @change="handleFileUpload">匯入</Button> -->
        <input type="file" @change="handleFileUpload" accept=".csv" />
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { Database, Tables, Enums } from "~/database.types";
const supabase = useSupabaseClient<Database>();
defineProps({
  title: String,
  description: String,
});

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target?.result;
      if (csvData) {
        processCSV(csvData as string);
      }
    };
    reader.readAsText(file);
  }
};

type department = {
  department_name: string;
  department_code: string;
};
type student_import_ = {
  email: string;
  department_uuid: string | undefined;
  teacher_name: string;
  name: string;
};

const processCSV = async (data: string) => {
  const rows = data.split('\n');
  const result = rows.map(row => row.split(','));
  let departments: department[] = [];
  for (let i = 1; i < result.length; i++) {
    let departmentName = result[i][0];
    let departmentCode = result[i][1];
    let exists = departments.some(department => department.department_name === departmentName && department.department_code === departmentCode);
    if (!exists) {
      departments.push({
        department_name: departmentName,
        department_code: departmentCode
      });
    }
  }

  departments.pop();

  const { data: department_info, error: department_error } = await supabase
    .from('school_department')
    .upsert(
      departments,
      {
        ignoreDuplicates: true,
        onConflict: "department_code",
      }
      ,

    )
  if (department_error) {
    console.log(department_error)
  }
  // console.log(result, "result");
  result.pop();
  let student_import: student_import_[] = [];
  const { data: map_department_id, error: department_data_error } = await supabase
    .from('school_department')
    .select('department_name, id')
  console.log(map_department_id, "map_department_id");
  for (let i = 1; i < result.length; i++) {
    let email = result[i][3] + "@mail.nuk.edu.tw";
    let teacher_name = result[i][2];
    let student_name = result[i][4];
    student_import.push({
      email: email,
      department_uuid: map_department_id?.find(department => department.department_name === result[i][0])?.id,
      teacher_name: teacher_name,
      name: student_name
    });
  }
  // console.log(student_import, "651651");
  const { data: upsert_data, error: upsert_error } = await supabase
    .from("studentimport")
    .upsert(
      student_import,
      {
        ignoreDuplicates: true,
      }
    );
  if (upsert_error) {
    console.log(upsert_error);
  }
};
</script>

<style scoped>
/* 添加一些基本的樣式 */
</style>