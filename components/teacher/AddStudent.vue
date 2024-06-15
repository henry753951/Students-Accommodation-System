<template>
  <Dialog
    v-if="isDesktop"
    v-model:open="isDrawerOpen"
  >
    <DialogTrigger>
      <Button>新增</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>新增學生</DialogTitle>
        <DialogDescription>請選擇要新增的學生</DialogDescription>
      </DialogHeader>

      <div class="p-4">
        <Input
          v-model="searchQuery"
          placeholder="搜尋學生"
          class="mb-4"
          @input="refresh"
        />
        <Separator />
        <ul class="flex my-2 flex-col gap-3 overflow-y-scroll max-h-[50dvh] min-h-[30dvh]">
          <li
            v-for="student in filteredStudents"
            :key="student.user_id"
            class="rounded-lg p-2 cursor-pointer hover:bg-gray-100"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="font-bold">
                  {{ student.app_user.name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ student.student_number }}
                </div>
              </div>
              <Button
                size="sm"
                @click="emit('onStudentAdd',student.user_id)"
              >
                新增
              </Button>
            </div>
          </li>
        </ul>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          @click="isDrawerOpen = false"
        >
          取消
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>

  <Drawer
    v-else
    v-model:open="isDrawerOpen"
  >
    <DrawerTrigger>
      <Slot>
        <Button>新增</Button>
      </Slot>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>新增學生</DrawerTitle>
        <DrawerDescription>請選擇要新增的學生</DrawerDescription>
      </DrawerHeader>

      <div class="p-4">
        <Input
          v-model="searchQuery"
          placeholder="搜尋學生"
          class="mb-4"
          @input="refresh"
        />
        <Separator />
        <ul class="flex py-2 flex-col gap-3 overflow-y-scroll max-h-[50dvh] min-h-[30dvh]">
          <li
            v-for="student in filteredStudents"
            :key="student.user_id"
            class="rounded-lg p-2 cursor-pointer hover:bg-gray-100"
          >
            <div class="flex items-center justify-between">
              <div>
                <div class="font-bold">
                  {{ student.app_user.name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ student.student_number }}
                </div>
              </div>
              <Button
                size="sm"
                @click="emit('onStudentAdd',student.user_id)"
              >
                新增
              </Button>
            </div>
          </li>
        </ul>
      </div>
      <DrawerFooter>
        <DrawerClose>
          <Button variant="outline">
            取消
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
<script lang="tsx" setup>
import type { Database, Tables, Enums } from "~/database.types";
const isDesktop = useMediaQuery("(min-width: 768px)");
const supabase = useSupabaseClient<Database>();
const isDrawerOpen = ref(false);
const searchQuery = ref("");
const { data: filteredStudents, refresh } = useAsyncData("students", async () => {
  if (!searchQuery.value) {
    return [];
  }
  const { data, error } = await supabase.from("student").select("*, app_user!inner(*)").ilike("student_number", `%${searchQuery.value}%`);
  if (error) {
    throw error;
  }
  return data;
});

const emit = defineEmits<{
  (event: 'onStudentAdd', user_id: string): void;
}>();

</script>
<style></style>
