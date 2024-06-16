<template>
  <div class="flex flex-col gap-5 container">
    <!-- 功能列 -->
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>操作</MenubarTrigger>
        <MenubarContent>
          <MenubarItem @click="OpenAddDepartmentDialog">
            新增
          </MenubarItem>
          <MenubarItem @click="deleteSelected">
            刪除所選
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
    <!-- 表格 -->
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <!-- 全選功能 -->
            <TableHead>
              <Checkbox
                :checked="isAllSelected"
                @update:checked="toggleSelectAll"
              />
            </TableHead>
            <TableHead>系所名稱</TableHead>
            <TableHead>系所代碼</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="department in departments"
            :key="department.id"
          >
            <TableCell>
              <Checkbox v-model:checked="selectedDepartments[department.id]" />
            </TableCell>
            <TableCell>{{ department.department_name }}</TableCell>
            <TableCell>{{ department.department_code }}</TableCell>
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
                  <DropdownMenuItem @click="OpenEditDepartmentDialog(department)">
                    編輯
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <!-- Dialog -->
    <Dialog v-model:open="isAddDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增系所</DialogTitle>
        </DialogHeader>
        <div class="flex flex-col gap-4">
          <Input
            v-model="newDepartment.department_name"
            placeholder="系所名稱"
          />
          <Input
            v-model="newDepartment.department_code"
            placeholder="系所代碼"
          />
        </div>
        <DialogFooter>
          <Button @click="createDepartment">
            保存
          </Button>
          <Button @click="isAddDialogOpen = false">
            取消
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Dialog v-model:open="isEditDialogOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>編輯系所</DialogTitle>
        </DialogHeader>
        <div class="flex flex-col gap-4">
          <Input
            v-model="currentDepartment.department_name"
            placeholder="系所名稱"
          />
          <Input
            v-model="currentDepartment.department_code"
            placeholder="系所代碼"
          />
        </div>
        <DialogFooter>
          <Button @click="saveChanges">
            保存
          </Button>
          <Button @click="isEditDialogOpen = false">
            取消
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import { toast } from "@/components/ui/toast";
import type { Database, Tables, Enums } from "~/database.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// 標題和META資料
useHead({
  title: "校外租屋平台 | 系所管理",
  meta: [
    {
      name: "description",
      content: "校外租屋平台",
    },
  ],
});
// 定義要使用的Layout，以及頁面名稱
definePageMeta(
  {
    name: "系所管理",
    layout: "dashboard",
  }
);

const supabase = useSupabaseClient<Database>();

// [Data] (useAsyncData 配合 supabase 是最完美的用法)
// 裡面有三個變數，data , pending 是是否正在載入，refresh 是重新獲取資料的方法，加冒號可以改變變數名稱，不加冒號就是原本的名稱
const { data: departments, pending: isLoading, refresh: refresh } = useAsyncData('departments', async () => {
  const { data } = await supabase.from('school_department').select('*');
  return data;
});

// 選取的系所 (打勾的)
const selectedDepartments = ref<Record<string, boolean>>({});
// 是否全選 (用來控制全選的checkbox的狀態)
const isAllSelected = computed(() => {
  if (!departments.value) return false;
  return Object.values(selectedDepartments.value).every(Boolean) && Object.keys(selectedDepartments.value).length === departments.value.length;
});

// Dialog 狀態
const isEditDialogOpen = ref(false);
const isAddDialogOpen = ref(false);

// 用來存放Dialog中的資料
const newDepartment = ref<Partial<Tables<'school_department'>>>({
  department_name: '',
  department_code: ''
});

const currentDepartment = ref<Partial<Tables<'school_department'>>>({
  department_name: '',
  department_code: ''
});


// [Methods]
const toggleSelectAll = (checked: boolean) => {
  if (!departments.value) return;
  departments.value.forEach(department => {
    selectedDepartments.value[department.id] = checked;
  });
};

// Dialog  
const OpenEditDepartmentDialog = (department: Tables<'school_department'>) => {
  currentDepartment.value = { ...department };
  isEditDialogOpen.value = true;
};

const OpenAddDepartmentDialog = () => {
  newDepartment.value = { department_name: '', department_code: '' };
  isAddDialogOpen.value = true;
};

// Database operations
const createDepartment = async () => {
  try {
    const { error } = await supabase
      .from('school_department')
      .insert({
        department_name: newDepartment.value.department_name || '',
        department_code: newDepartment.value.department_code
      } as Tables<'school_department'>);

    if (error) throw error;
    // 若成功新增，刷新資料
    refresh();
    newDepartment.value = { department_name: '', department_code: '' };
    isAddDialogOpen.value = false;
  } catch (error) {
    console.error('Error adding department:', error);
  }
};

const deleteSelected = async () => {
  try {
    // 取得所有被選取的系所的id
    const selectedIds = Object.keys(selectedDepartments.value).filter(id => selectedDepartments.value[id]);
    const { error } = await supabase
      .from('school_department')
      .delete()
      .in('id', selectedIds);

    if (error){
      toast({
      title: "Error",
      description: '刪除失敗',
      variant: "destructive",
      });
    throw error;
    }
    // 若成功新增，刷新資料
    refresh();
    selectedDepartments.value = {};
  } catch (error) {
    console.error('Error deleting selected departments:', error);
  }
};

const saveChanges = async () => {
  // TypeScript 會檢查 currentDepartment.value 是否為空，所以這邊要加上檢查，避免紅紅
  if (!currentDepartment.value) return;
  // 
  try {
    const { error } = await supabase
      .from('school_department')
      .update({
        department_name: currentDepartment.value.department_name,
        department_code: currentDepartment.value.department_code
      })
      .eq('id', currentDepartment.value.id!);

    if (error) throw error;
    // 若成功新增，刷新資料
    refresh();
    isEditDialogOpen.value = false;
  } catch (error) {
    console.error('Error saving changes:', error);
  }
};



</script>
<style></style>