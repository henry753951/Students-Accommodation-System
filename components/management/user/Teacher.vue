<template>
  <h2
    class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
    教師資料匯入
  </h2>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    教師資料匯入功能允許你匯入未註冊的教師資料，並指定其任教的系所等相關資訊。
  </p>
          
  <div class="flex gap-3 w-full justify-center mt-4">
    <UserManagementImport
      title="單筆匯入"
      description="請輸入學生的Email與資料"
    />
    <ManagementUserImportTeacherCSV
      title="批量匯入"
      description="請上傳CSV檔案"
    />
  </div>

  <div>
    <h2
      class="mt-10 scroll-m-20 border-b pb-2 text-1xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      資料預覽
    </h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>任教教師</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="user in users"
          :key="user.email"
        >
          <TableCell>{{ user.email }}</TableCell>
          <TableCell>{{ user.teacher }}</TableCell>
        </TableRow>
      </TableBody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const users = ref([] as { email: string; teacher: string }[]);

</script>

<style>

</style>