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
          <TableHead
            id="LLL"
            :style="{ color: isRed ? 'red' : 'black' }"
          >
            Is Checked
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="(data, index) in All_student_init_2"
          :key="index"
          class=""
        >
          <TableCell class="">
            {{ data.name }}
          </TableCell>
          <TableCell class="">
            {{ data.student_number }}
          </TableCell>
          <TableCell class="">
            {{ data.department_name }}
          </TableCell>
          <TableCell class="">
            {{ data.email }}
          </TableCell>
          <TableCell class="">
            <Checkbox
              :id="'terms-' + index"
              v-model:checked="data.isChecked"
              class="justify-items-center"
            />
            <label
              id="LLL"
              :for="'terms-' + index"
              :style="{ color: isRed ? 'red' : 'black' }"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-3"
            >
              {{ data.isChecked ? "Teacher_id" : '未被分發' }}
            </label>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div class=" flex justify-end">
      <UseTemplate>
        <div class="grid items-start gap-4 px-4">
          <div class="grid gap-2">
            <Label html-for="username">姓名</Label>
            <Input
              id="username"
              v-model="new_student_create_name"
            />
          </div>
          <div class="grid gap-2">
            <Label html-for="user_id">學號</Label>
            <Input
              id="user_id"
              v-model="new_student_create_student_number"
            />
          </div>
          <div class="grid gap-2">
            <Label html-for="email">信箱</Label>
            <Input
              id="email"
              v-model="new_student_create_email"
              type="email"
            />
          </div>
          <Button @click="new_student()">
            Create
          </Button>
        </div>
      </UseTemplate>

      <Dialog
        v-if="isDesktop"
        v-model:open="isOpen"
      >
        <DialogTrigger as-child>
          <Button
            variant="outline"
            :disabled="isreadytodelete"
            class="m-2 w-20 bg-black text-white hover  hover:text-black hover:bg hover:shadow-lg "
          >
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
      <Button
        class=" w-20 mr-2 mt-2 mb-2 hover:bg-white hover:text-black hover:shadow-lg"
        :disabled="isreadytodelete"
        @click="Delete_student()"
      >
        delete
      </Button>
      <Button
        class=" w-20 mr-2 mt-2 mb-2 hover:bg-white hover:text-black hover:shadow-lg"
        :disabled="canuse_submit_btn"
        @click="submit()"
      >
        Submit
      </Button>
    </div>
    <!-- {{ All_Student[0] }} -->
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
const [UseTemplate, GridForm] = createReusableTemplate();
const isDesktop = useMediaQuery('(min-width: 768px)');

const isOpen = ref(false);
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
  department_name: string;
  student_number: string;
  student_id: string;
  name: string;
  email: string;
  isChecked: boolean;
};

const All_student_init = ref<Student[]>([]);

const All_student_init_2 = ref<Student[]>([]);
const new_student_create_name = ref("王曉明");
const new_student_create_student_number = ref("a1105500");
const new_student_create_email = ref("a1105500@mail.nuk.edu.tw");
const isRed = ref(false);
const user = useSupabaseUser();
let teacher_id = "97fdcdda-8a08-4d07-abd0-2b3e5b7dace4";
const isreadytodelete = ref(false);
const canuse_submit_btn = ref(true);
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
    // console.log("11",data[i].student_id);
    All_student_init.value.push({
      student_id: data[i].student_id,
      user_id: "",
      department_id: "",
      student_number: "",
      name: "",
      email: "",
      department_name: "",
      isChecked: false,
    });
  }

  ListmapStudent_step2();
};


const ListmapStudent_step2 = async () => {
  for (let i = 0; i < All_student_init.value.length; i++) {

    const { data, error } = await supabase
      .from("app_user")
      .select('name, email, student:student(department_id, student_number)')
      .eq("id", All_student_init.value[i].student_id);

    if (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      continue;
    }

    if (data && data.length > 0) {
      console.log("app_user data:", data);
      const studentData = data[0];
      All_student_init.value[i].name = studentData.name || "";
      All_student_init.value[i].email = studentData.email || "";
      All_student_init.value[i].department_id = studentData.student?.department_id || "";
      All_student_init.value[i].student_number = studentData.student?.student_number || "";
    }

    const { data: data2, error: error2 } = await supabase
      .from("school_department")
      .select('department_name')
      .eq("id", All_student_init.value[i].department_id || "");

    if (error2) {
      toast.toast({
        title: "Error",
        description: error2.message+"1231123",
        variant: "destructive",
      });
      continue;
    }

    if (data2 && data2.length > 0) {
      console.log("school_department data:", data2);
      All_student_init.value[i].department_name = data2[0].department_name || "";
    } else {
      continue;
    }
  }
  All_student_init_2.value = All_student_init.value;
};


const test = ref("");
const new_student = async () => {
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
    window.location.reload();
    return;
  }
  if (data.length == 0) {
    toast.toast({
      title: "Error",
      description: "找不到此學生之學號。開頭字母為小寫",
      variant: "destructive",
    });
    return;
  }
  new_student_step2(data[0].user_id);

};

const new_student_step2 = async (USER_ID: string) => {
  console.log("1", new_student_create_email.value);
  const { data, error } = await supabase
    .from("app_user")
    .select('id')
    .eq("name", new_student_create_name.value)
    .eq("email", new_student_create_email.value);
  if (error) {
    toast.toast({
      title: "Error",
      description: "找不到學生姓名或者信箱，請確認姓名信箱是否正確",
      variant: "destructive",
    });
    // window.location.reload();
    return;
  }
  if (data.length == 0) {
    toast.toast({
      title: "Error",
      description: "找不到學生姓名或者信箱，請確認姓名信箱是否正確",
      variant: "destructive",
    });
    return;
  }
  new_student_step3(USER_ID);
};


const new_student_step3 = async (USER_ID: string) => {
  const now_time = new Date().toISOString();
  const { data, error } = await supabase
    .from("map_teacher_student")
    .insert(
      {
        "teacher_id": "97fdcdda-8a08-4d07-abd0-2b3e5b7dace4",
        "student_id": USER_ID as string,
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
  confirm("新增成功搂");
  window.location.reload();
};

const Delete_student = async () => {
  isRed.value = true;
  isreadytodelete.value = true;
  canuse_submit_btn.value = false;
};

const submit = async () => {
  for (let i = 0; i < All_student_init.value.length; i++) {
    if (All_student_init.value[i].isChecked) {
      const { data, error } = await supabase
        .from("map_teacher_student")
        .delete()
        .eq("teacher_id", teacher_id)
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
  confirm("更新成功搂");
  window.location.reload();
};

</script>
<style scoped>
.table-container {
  background-color: #e2e8f0;
  /* slate-300 */
}
</style>
