<template>
  <div class="container mx-auto">
    <div class="mb-4">
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
                      <MenubarSubTrigger>
                        <Icon
                          name="ri:add-line"
                          class="mr-1"
                        /> 新增
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem
                          v-for="role in roles"
                          :key="role"
                          @click="updateSingleRoleForSelections(role, 'add')"
                        >
                          {{ role }}
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                    <MenubarSub>
                      <MenubarSubTrigger>
                        <Icon
                          name="ri:delete-bin-line"
                          class="mr-1"
                        /> 刪除
                      </MenubarSubTrigger>
                      <MenubarSubContent>
                        <MenubarItem
                          v-for="role in roles"
                          :key="role"
                          @click="updateSingleRoleForSelections(role, 'remove')"
                        >
                          {{ role }}
                        </MenubarItem>
                      </MenubarSubContent>
                    </MenubarSub>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarContent>
            </MenubarMenu>
            <div class="flex gap-2 items-center ml-2">
              <span class="text-sm"> 搜尋 : </span>
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
                  <TableHead>系所</TableHead>
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
                  <TableCell>{{ user.student?.department?.department_name || "" }}</TableCell>
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
                      v-if="user.landlord"
                      variant="secondary"
                      class="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 dark:bg-opacity-30"
                    >
                      房東
                    </Badge>
                    <Badge
                      v-if="user.admin"
                      variant="secondary"
                      class="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 dark:bg-opacity-30"
                    >
                      管理員
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
                        <DropdownMenuItem @click="OpenEditDialog(user)">
                          編輯
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Dialog v-model:open="isEditDialogOpen">
            <DialogContent>
              <DialogHeader>
                <DialogTitle>編輯使用者</DialogTitle>
              </DialogHeader>
              <div
                v-if="currentEditUser"
                class="flex flex-col gap-4"
              >
                <div class="flex justify-between items-center px-2 py-4 rounded-lg border shadow">
                  <p>學生身分組</p>
                  <Switch
                    :checked="currentEditRole.student"
                    class="flex items-center gap-2"
                    @update:checked="handleSwitch('學生', $event)"
                  />
                </div>
                <div class="flex justify-between items-center px-2 py-4 rounded-lg border shadow">
                  <p>教師身分組</p>
                  <Switch
                    :checked="currentEditRole.teacher"
                    class="flex items-center gap-2"
                    @update:checked="handleSwitch('教師', $event)"
                  />
                </div>
                <div class="flex justify-between items-center px-2 py-4 rounded-lg border shadow">
                  <p>房東身分組</p>
                  <Switch
                    :checked="currentEditRole.landlord"
                    class="flex items-center gap-2"
                    @update:checked="handleSwitch('房東', $event)"
                  />
                </div>
                <div class="flex justify-between items-center px-2 py-4 rounded-lg border shadow-sm">
                  <p>管理員身分組</p>
                  <Switch
                    :checked="currentEditRole.admin"
                    class="flex items-center gap-2"
                    @update:checked="handleSwitch('管理員', $event)"
                  />
                </div>
                <div class="flex justify-between items-center">
                  <p>姓名</p>
                  <Input
                    v-model="currentEditUser.name"
                    class="w-[180px]"
                    placeholder="姓名"
                  />
                </div>
                <div
                  v-if="currentEditUser.student"
                  class="flex justify-between items-center"
                >
                  <p>系所</p>
                  <Select v-model="currentEditUser.student!.department_id">
                    <SelectTrigger class="w-[180px]">
                      <SelectValue placeholder="選擇系所" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="department in departments"
                          :key="department.id"
                          :value="department.id"
                        >
                          {{ department.department_name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button @click="saveChanged">
                  保存
                </Button>
                <Button @click="isEditDialogOpen = false">
                  取消
                </Button>
              </DialogFooter>
            </DialogContent>
            <AutoPagination
              v-model:page="currentPage"
              :data="usersSearched"
            />
          </dialog>
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from '@/components/ui/switch';
import type { QueryData } from "@supabase/supabase-js";
useHead({
  title: "校外租屋平台 | 使用者管理",
});

definePageMeta({
  name: "使用者管理",
  layout: "dashboard",
});

const roles = ["學生", "教師", "房東", "管理員"] as "學生" | "教師" | "房東" | "管理員"[];
const supabase = useSupabaseClient<Database>();
  const { data: departments } = await useAsyncData("departments", async () => {
  const { data } = await supabase.from("school_department").select("*");
  return data;
});
// [Data]
const {
  data: users,
  pending: isLoading,
  refresh: refresh,
} = useAsyncData("users", async () => {
  const { data } = await supabase.from("app_user").select("*, student(*, department:school_department(*)), teacher(*), landlord(*), admin(*)");
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
  return Object.values(selectedUsers.value).every(Boolean) && Object.keys(selectedUsers.value).length === usersSearched.value.length;
});

// 全選
const toggleSelectAll = (checked: boolean) => {
  if (!usersSearched.value) return;
  usersSearched.value.forEach((user) => {
    selectedUsers.value[user.id] = checked;
  });
};

// [Methods]
const userSync = async () => {
  const { data, error } = await useAPI("/api/management/user_sync", {
    default: () => {
      return {
        message: "同步使用者資料不成功",
      };
    },
  });

  if (error.value) {
    console.error(error);
    return;
  }
  await refresh();
};

// Database operation
const deleteUser = async (singleUser: Tables<"app_user"> | null = null) => {
  if (singleUser) {
    const selectedUserIds = Object.keys(selectedUsers.value).filter((userId) => selectedUsers.value[userId]);
    const { error } = await supabase.from("app_user").delete().eq("id", singleUser.id);
    if (error) {
      console.error(error);
      return;
    }
  } else {
    const selectedUserIds = Object.keys(selectedUsers.value).filter((userId) => selectedUsers.value[userId]);
    const { error } = await supabase.from("app_user").delete().in("id", selectedUserIds);
    if (error) {
      console.error(error);
      return;
    }
  }
  await refresh();
};

const saveChanged = async()=>{
  if (!currentEditUser.value) return;
  const { error } = await supabase.from("app_user").update({
    name: currentEditUser.value.name,
  }).eq("id", currentEditUser.value.id);
  if (error) {
    console.error(error);
    return;
  }
  if(currentEditUser.value.student){
    const { error: studentError } = await supabase.from("student").upsert({
      user_id: currentEditUser.value.id,
      department_id: currentEditUser.value.student.department_id,
    });
    if (studentError) {
      console.error(studentError);
      return;
    }

  }

  isEditDialogOpen.value = false;
  await refresh();
};

// if singleUser is null, it will update all selected users
const updateSingleRoleForSelections = async (role: string, action: "add" | "remove", userID: null | string = null) => {
  let selectedUserIds: string[] = [];
  if (userID) {
    selectedUserIds = [userID];
  } else {
    selectedUserIds = Object.keys(selectedUsers.value).filter((userId) => selectedUsers.value[userId]);
  }
  const data = selectedUserIds.map((userId) => ({ user_id: userId }));

  let error: string | null = null;

  if (action === "add") {
    if (role === "學生") {
      const { error: studentAddError } = await supabase.from("student").upsert(data);
      error = studentAddError?.message || null;
    } else if (role === "教師") {
      const { error: teacherAddError } = await supabase.from("teacher").upsert(data);
      error = teacherAddError?.message || null;
    } else if (role === "房東") {
      const { error: landlordAddError } = await supabase.from("landlord").upsert(data);
      error = landlordAddError?.message || null;
    } else if (role === "管理員") {
      const { error: adminAddError } = await supabase.from("admin").upsert(data);
      error = adminAddError?.message || null;
    }
  } else {
    if (role === "學生") {
      const { error: studentRemoveError } = await supabase.from("student").delete().in("user_id", selectedUserIds);
      error = studentRemoveError?.message || null;
    } else if (role === "教師") {
      const { error: teacherRemoveError } = await supabase.from("teacher").delete().in("user_id", selectedUserIds);
      error = teacherRemoveError?.message || null;
    } else if (role === "房東") {
      const { error: landlordRemoveError } = await supabase.from("landlord").delete().in("user_id", selectedUserIds);
      error = landlordRemoveError?.message || null;
    } else if (role === "管理員") {
      const { error: adminRemoveError } = await supabase.from("admin").delete().in("user_id", selectedUserIds);
      error = adminRemoveError?.message || null;
    }
  }

  await refresh();

  if (error) {
    console.error("Errors updating role:", error);
  }
};
const tempQuery = supabase.from("app_user").select("*, student(*, department:school_department(*)), teacher(*), landlord(*), admin(*)").single();
type AppUser = QueryData<typeof tempQuery>;
const isEditDialogOpen = ref(false);
const currentEditUser = ref<AppUser | null>(null);
const OpenEditDialog = (user: AppUser) => {
  console.log(user);
  currentEditUser.value = user;
  isEditDialogOpen.value = true;
};
const currentEditRole = computed({
  get: () => {
    if (!currentEditUser.value) return { student: false, teacher: false, landlord: false, admin: false };
    return {
      student: currentEditUser.value.student ? true : false,
      teacher: currentEditUser.value.teacher ? true : false,
      landlord: currentEditUser.value.landlord ? true : false,
      admin: currentEditUser.value.admin ? true : false,
    };
  },
  set: (value) => {
    const newCurrentEditUser = users.value?.find((user) => user.id === currentEditUser.value?.id);
    if (!newCurrentEditUser) return;
    currentEditUser.value = {
      ...currentEditUser.value,
      student: newCurrentEditUser.student,
      teacher: newCurrentEditUser.teacher,
      landlord: newCurrentEditUser.landlord,
      admin: newCurrentEditUser.admin,
    } as AppUser;
  },
});
const handleSwitch = async (role: string, value: boolean) => {
  if (currentEditUser.value) {
    await updateSingleRoleForSelections(role, value ? "add" : "remove", currentEditUser.value.id);
  }
  currentEditRole.value = {
    ...currentEditRole.value,
    [role]: value,
  };
};

// [Watch]  
watch(searchText, () => {
  currentPage.value = 1;
});
</script>
<style></style>
