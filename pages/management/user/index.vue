<template>
  <div class="container mx-auto">
    <div class="mb-4 ">
      <Tabs
        default-value="account"
      >
        <TabsList class="w-full">
          <TabsTrigger
            value="account"
            class="flex-grow"
          >
            使用者管理
          </TabsTrigger>
          <TabsTrigger
            value="StudentImport"
            class="flex-grow"
          >
            學生資料匯入
          </TabsTrigger>
          <TabsTrigger
            value="TeacherImport"
            class="flex-grow"
          >
            教師資料匯入
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="account"
          class="p-2 flex flex-col gap-5"
        >
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>操作</MenubarTrigger>
              <MenubarContent>
                <MenubarItem @click="">
                  新增
                </MenubarItem>
                <MenubarItem @click="">
                  刪除所選
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <div class="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>身分</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="user in paginatedUsers"
                  :key="user.email"
                >
                  <TableCell>{{ user.email }}</TableCell>
                  <TableCell>{{ user.role }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div class="flex justify-end mt-4">
            <Button
              variant="outline"
              size="sm"
              :disabled="!canPreviousPage"
              @click="previousPage"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              :disabled="!canNextPage"
              @click="nextPage"
            >
              Next
            </Button>
          </div>
        </TabsContent>
        <TabsContent
          value="StudentImport"
        >
          <ManagementUserStudent />
        </TabsContent>
        <TabsContent
          value="TeacherImport"
        >
          <ManagementUserTeacher />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

definePageMeta(
  {
    name: "使用者管理",
    layout: "dashboard",
  }
);

const users = ref([
  { email: 'user1@example.com', role: 'admin' },
  { email: 'user2@example.com', role: 'user' },
]);



const newUser = ref({ email: '', role: '' });
const currentPage = ref(1);
const itemsPerPage = 50;

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return users.value.slice(start, end);
});

const canPreviousPage = computed(() => currentPage.value > 1);
const canNextPage = computed(() => currentPage.value * itemsPerPage < users.value.length);

const previousPage = () => {
  if (canPreviousPage.value) currentPage.value--;
};

const nextPage = () => {
  if (canNextPage.value) currentPage.value++;
};

const addUser = () => {
  users.value.push({ ...newUser.value });
  newUser.value.email = '';
  newUser.value.role = '';
};

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    // 處理CSV文件
  }
};

const importCSV = () => {
  // 批量匯入邏輯
};
</script>
<style></style>