<template>
  <div class="container mx-auto">
    <div class="mb-4 ">
      <Tabs default-value="account">
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
              <MenubarTrigger>編輯</MenubarTrigger>
              <MenubarContent>
                <MenubarItem> 刪除所選 </MenubarItem>
                <MenubarSub>
                  <MenubarSubTrigger>身份組編輯</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarSub>
                      <MenubarSubTrigger>新增</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>學生</MenubarItem>
                        <MenubarItem>教師</MenubarItem>
                        <MenubarItem>房東</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                      <MenubarSubTrigger>刪除</MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem>學生</MenubarItem>
                        <MenubarItem>教師</MenubarItem>
                        <MenubarItem>房東</MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            
            <div class="flex gap-2 items-center ml-2">
              <span class="text-sm">
                搜尋 :
              </span>
              <input
                v-model="searchText"
                class="focus-visible:outline-0 rounded-md p-1 px-2 bg-gray-100 dark:bg-opacity-30 dark:bg-gray-800"
                placeholder="Email或姓名"
              >
            </div>
            <MenubarMenu>
              <MenubarTrigger class="ml-auto">
                其他操作
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem @click="refresh">
                  <Icon name="hugeicons:refresh" />
                  <p class="ml-1">
                    刷新
                  </p>
                </MenubarItem>
                <MenubarItem @click="userSync">
                  同步使用者資料
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <div class="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Checkbox
                      :checked="isAllSelected"
                      @update:checked="toggleSelectAll"
                    />
                  </TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>電子郵件</TableHead>
                  <TableHead>身份</TableHead>
                  <TableHead>操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  v-for="user in paginatedUsers"
                  :key="user.id"
                >
                  <TableCell>
                    <Checkbox v-model:checked="selectedUsers[user.id]" />
                  </TableCell>
                  <TableCell>{{ user.name }}</TableCell>
                  <TableCell>{{ user.email }}</TableCell>
                  <TableCell class="flex gap-2">
                    <Badge
                      v-if="user.student"
                      variant="secondary"
                    >
                      學生
                    </Badge>
                    <Badge
                      v-if="user.teacher"
                      variant="secondary"
                      class="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 dark:bg-opacity-30"
                    >
                      教師
                    </Badge>
                    <Badge
                      v-if="
                        user.landlord"
                      variant="secondary"
                      class="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 dark:bg-opacity-30"
                    >
                      房東
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button
                          size="xs"
                          variant="ghost"
                        >
                          <Icon name="ri:more-fill" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem> 編輯 </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <AutoPagination
            v-model:page="currentPage"
            :data="usersSearched"
          />
        </TabsContent>
        <TabsContent value="StudentImport">
          <ManagementUserStudent />
        </TabsContent>
        <TabsContent value="TeacherImport">
          <ManagementUserTeacher />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
useHead({
  title: '校外租屋平台 | 使用者管理',
});

definePageMeta(
  {
    name: "使用者管理",
    layout: "dashboard",
  }
);


const supabase = useSupabaseClient<Database>();

// [Data] 
const { data: users, pending: isLoading, refresh: refresh } = useAsyncData('users', async () => {
  const { data } = await supabase.from('app_user').select('*, student(*), teacher(*), landlord(*)');
  return data;
});

const currentPage = ref(1);
const itemsPerPage = 50;
const searchText = ref("");

// 搜尋後的使用者列表
const usersSearched = computed(() => {
  if (!users.value) return [];
  const userSearched = users.value.filter((user) => {
    if (searchText.value === "") return true;
    if (!user.email || !user.name) return false;
    return user.email.includes(searchText.value) || user.name.includes(searchText.value);
  });
  return userSearched;
});

// 分頁後的使用者列表
const paginatedUsers = computed(() => {
  if (!usersSearched.value) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return usersSearched.value.slice(start, end);
});
// 選取的使用者 (打勾的)
const selectedUsers = ref<Record<string, boolean>>({});
// 是否全選 (用來控制全選的checkbox的狀態)
const isAllSelected = computed(() => {
  if (!users.value) return false;
  return Object.values(selectedUsers.value).every(Boolean) && Object.keys(selectedUsers.value).length === users.value.length;
});

// 全選
const toggleSelectAll = (checked: boolean) => {
  if (!users.value) return;
  users.value.forEach((user) => {
    selectedUsers.value[user.id] = checked;
  });
};


// [Methods]
const userSync = async () => {
  const { data, error } = await useAPI('/api/management/user_sync', {
    default: () => {
      return {
        "message": "同步使用者資料不成功",
      };
    },
    });

    if (error.value) {
      console.error(error);
      return;
    }
    await refresh();
};

// [Watch]
watch(searchText, () => {
  currentPage.value = 1;
});

</script>
<style></style>