<template>
  <div class="w-11/12 mx-auto mt-6 table-container rounded-lg shadow-lg">
    <Table>
      <!-- <TableCaption>A list of your Student List.</TableCaption> -->
      <TableHeader class=" bg-slate-100 hover:bg-slate-100 rounded-t-lg">
        <TableRow>
          <TableHead>
            Name
          </TableHead>
          <TableHead>
            Student number
          </TableHead>
          <TableHead>
            Department ID
          </TableHead>
          <TableHead>
            email
          </TableHead>
          <TableHead id="LLL" v-bind:style="{ color: isRed ? 'red' : 'black' }">
            Is Checked
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(data, index) in All_student_init" :key="index" class="">
          <TableCell class="">
            {{ data.name }}
          </TableCell>
          <TableCell class="">
            {{ data.student_number }}
          </TableCell>
          <TableCell class="">
            {{ data.department_id }}
          </TableCell>
          <TableCell class="">
            {{ data.email }}
          </TableCell>
          <TableCell class="">
            <Checkbox :id="'terms-' + index" v-model:checked="data.isChecked" class="justify-items-center" />
            <label :for="'terms-' + index" id="LLL" v-bind:style="{ color: isRed ? 'red' : 'black' }"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-3">
              {{ data.isChecked ? "Teacher_id" : '未被分發' }}
            </label>
          </TableCell>
        </TableRow>

      </TableBody>

    </Table>
    <div class=" flex justify-end">
      <UseTemplate>
        <form class="grid items-start gap-4 px-4">
          <div class="grid gap-2">
            <Label html-for="username">姓名</Label>
            <Input id="username" v-model=new_student_create_name />
          </div>
          <div class="grid gap-2">
            <Label html-for="user_id">學號</Label>
            <Input id="user_id" v-model=new_student_create_student_number />
          </div>
          <div class="grid gap-2">
            <Label html-for="email">信箱</Label>
            <Input id="email" type="email" v-model=new_student_create_email />
          </div>
          <Button @click="new_student()">
            Create
          </Button>
        </form>
      </UseTemplate>

      <Dialog v-if="isDesktop" v-model:open="isOpen">
        <DialogTrigger as-child>
          <Button variant="outline"
            class="m-2 w-20 bg-black text-white hover  hover:text-black hover:bg hover:shadow-lg ">
            New
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create profile</DialogTitle>
            <DialogDescription>
              請輸入您要增加的學生資料
            </DialogDescription>
          </DialogHeader>
          <GridForm />
        </DialogContent>
      </Dialog>
      <Button class=" w-20 mr-2 mt-2 mb-2 hover:bg-white hover:text-black hover:shadow-lg"
        @click="Delete_student()">delete</Button>
      <Button class=" w-20 mr-2 mt-2 mb-2 hover:bg-white hover:text-black hover:shadow-lg">Submit</Button>
    </div>
    <!-- {{ All_Student[0] }} -->
  </div>

</template>
<script setup lang="ts">
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";

import * as z from 'zod';
import { useModel } from 'vue';
const [UseTemplate, GridForm] = createReusableTemplate()
const isDesktop = useMediaQuery('(min-width: 768px)')
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
const isOpen = ref(false)
// import type { Student } from "~/types";
// import Student from "~/components/management/user/Student.vue";
definePageMeta({
  name: "學生分配",
});
const toast = useToast();
const supabase = useSupabaseClient<Database>();

type Student = {
  user_id: string;
  department_id: string;
  student_number: string;
  student_id: string;
  name: string;
  email: string;
  isChecked: boolean;
};

type New_Student = {
  student_number: string;
  name: string;
  email: string;
};

let All_student_init = ref<Student[]>([]);
let All_student_init_step2 = ref([]);

let new_student_create_name = ref("王曉明");
let new_student_create_student_number = ref("a1105500");
let new_student_create_email = ref("a1105500@mail.nuk.edu.tw");
let isRed = ref(false);
const user = useSupabaseUser();
let teacher_id = "97fdcdda-8a08-4d07-abd0-2b3e5b7dace4";

onMounted(() => {
  // console.log("1");
  teacher_login();
});

const teacher_login = async () => {
  const { data, error } = await supabase
    .from("teacher")
    .select("user_id")
    .eq("user_id", "97fdcdda-8a08-4d07-abd0-2b3e5b7dace4");
  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  teacher_id = data[0].user_id;

  ListmapStudent();
};


const ListmapStudent = async () => {
  const { data, error } = await supabase
    .from("map_teacher_student")
    .select('student_id')
    .eq("teacher_id", teacher_id);

  if (error) {
    toast.toast({
      title: "Error",
      description: "目前沒有學生被分配給您",
      // variant: "destructive",
    });
    return 'error';
  }
  // console.log(data);
  for (let i = 0; i < data.length; i++) {
    All_student_init.value.push({
      student_id: data[i].student_id,
      user_id: "",
      department_id: "",
      student_number: "",
      name: "",
      email: "",
      isChecked: true,
    });
  }
  ListmapStudent_step2();
};


const ListmapStudent_step2 = async () => {
  for (let i = 0; i < All_student_init.value.length; i++) {
    const { data, error } = await supabase
      .from("app_user")
      .select('name,email')
      .eq("id", All_student_init.value[i].student_id);
    if (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    for (let j = 0; j < data.length; j++) {
      All_student_init.value[i].name = data[j].name;
      All_student_init.value[i].email = data[j].email;
    }
  }
  ListmapStudent_step3();
};

const ListmapStudent_step3 = async () => {
  for (let i = 0; i < All_student_init.value.length; i++) {
    const { data, error } = await supabase
      .from("student")
      .select('department_id,student_number')
      .eq("user_id", All_student_init.value[i].student_id);
    if (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    for (let j = 0; j < data.length; j++) {
      All_student_init.value[i].department_id = data[j].department_id;
      All_student_init.value[i].student_number = data[j].student_number;
    }
  }
};

let test = ref("");
const new_student = async () => {
  confirm("確定要新增此學生嗎？");
  const { data, error } = await supabase
    .from("student")
    .select('user_id')
    .eq("student_number", new_student_create_student_number.value);
  if (error) {
    toast.toast({
      title: "Error",
      description: "找不到此學生，請確認學號是否正確，開頭字母為小寫",
      variant: "destructive",
    });
    return;
  }
  if(data.length == 0){
    confirm("確定要新增此學生嗎？");
    toast.toast({
      title: "Error",
      description: "找不到此學生，請確認學號是否正確，開頭字母為小寫",
      variant: "destructive",
    });
    return;
  }
  test.value = data[0].user_id;
  new_student_step2(test.value);
};
const new_student_step2 = async (USER_ID: String) => {
  if(USER_ID.length == 0){
    confirm("555555555");
  }
  const now_time = new Date().toISOString();
  const { data, error } = await supabase
    .from("map_teacher_student")
    .insert(
      {
        "teacher_id": "97fdcdda-8a08-4d07-abd0-2b3e5b7dace4",
        "student_id": USER_ID,
        "created_at": now_time,
        "updated_at": now_time,
      }
    );
  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  confirm("Success");
  console.log("Success");
};

const Delete_student = async () => {

  for (let i = 0; i < All_student_init.value.length; i++) {
    if (All_student_init.value[i].isChecked) {
      const { data, error } = await supabase
        .from("map_teacher_student")
        .delete()
        .eq("student_id", All_student_init.value[i].student_id);
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
  ListmapStudent();
};

let handleSubmit = async (event: any) => {
  event.preventDefault();

  // 延遲 3 秒
  await new Promise(resolve => setTimeout(resolve, 3000));

  // 顯示錯誤提示
  window.alert('錯誤！');
};
</script>
<style scoped>
.table-container {
  background-color: #e2e8f0;
  /* slate-300 */
}
</style>
