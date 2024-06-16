<template>
  <h2 class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
    教師資料匯入
  </h2>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    教師資料匯入功能允許你匯入未註冊的教師資料，並指定其任教的系所等相關資訊。
  </p>
  <div class="flex gap-3 w-full justify-center mt-4">
    <ManagementUserImportTeacherCSV
      title="批量匯入"
      description="請上傳CSV檔案"
      @uploaded="refresh"
    />
  </div>
  <div>
    <h2 class="mt-10 scroll-m-20 border-b pb-2 text-1xl font-semibold tracking-tight transition-colors first:mt-0">
      資料預覽
    </h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>教師姓名</TableHead>
          <TableHead>系所</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="user in data"
          :key="user.email"
        >
          <TableCell>{{ user.email }}</TableCell>
          <TableCell>{{ user.name }}</TableCell>
          <TableCell>{{ user.school_department!.department_name }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
const supabase = useSupabaseClient<Database>();

const { data, refresh } = useAsyncData(async () => {
  const { data, error } = await supabase.from("teacherimport").select("*, school_department(*)");
  if (error) throw error;
  return data;
});


</script>
<style></style>