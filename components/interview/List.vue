<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1 gap-5 w-2/3">
      <div class="grid grid-cols-2 g-5">
        <NuxtLink
          to="/interview/record/id"
          class="place-self-start"
        >
          <Button> 新增 </Button>
        </NuxtLink>
        <Select
          class="w-48 border border-gray-300 rounded"
        >
          <SelectTrigger>
            <SelectValue placeholder="選擇篩選條件" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">
                全部
              </SelectItem>
              <SelectItem value="time_low_to_high">
                時間：最近
              </SelectItem>
              <SelectItem value="time_high_to_low">
                時間：最遠
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="place-self-strech">
        <Skeleton
          v-if="doneValue.length === 0"
          class="h-[50px]"
        />
        <Table v-if="doneValue.length !== 0">
          <TableCaption>以上為與你相關的訪視記錄</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead class="w-1/5">
                老師名稱
              </TableHead>
              <TableHead class="w-1/5">
                學生名稱
              </TableHead>
              <TableHead class="w-1/5">
                建立時間
              </TableHead>
              <TableHead class="w-1/5">
                居住地
              </TableHead>
              <TableHead class="w-1/6 text-center">
                編輯/刪除
              </TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            <template
              v-for="record in doneValue"
              :key="record"
            >
              <InterviewTableRow 
                :teacher-name="record.teacherName"
                :student-name="record.studentName"
                :created-time="record.recordTime"
                :location="record.location"
                :link="record.link"
              />
            </template>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import { toast } from '@/components/ui/toast';
import Table from "../ui/table/Table.vue";

onMounted(() => {
  get_intervirew_record();
});

const supabase = useSupabaseClient<Database>();

type ListValue = {
  teacherName: string,
  studentName: string,
  recordTime: string,
  location: string,
  link: string,
};
// eslint-disable-next-line prefer-const
let undoneValue = ref<ListValue[]>([]);
const doneValue = ref<ListValue[]>([]);
const get_intervirew_record = async () => {
  const { data , error } = await supabase
  .from('interview_record')
  .select('*');
  if(error){
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  for (let i = 0; i< data.length; i++){
    await get_all_name(data[i].teacher_id, data[i].student_id, data[i].record_time, data[i].property_id!);
  }
  doneValue.value = undoneValue.value;
};

const get_all_name = async (teacher_id: string, student_id :string, record_time :string, property_id :string) => {
  const { data: teacher_data } = await supabase
  .from("app_user")
  .select("*")
  .eq('id', teacher_id);

  const { data: student_data } = await supabase
  .from("app_user")
  .select("*")
  .eq('id', student_id);

  const { data: property_data } = await supabase
  .from("rental_property")
  .select("*")
  .eq('id', property_id);
  undoneValue.value.push({
    teacherName: teacher_data![0].name!,
    studentName: student_data![0].name!,
    recordTime: record_time,
    location: property_data![0].address,
    link: property_id,
  });
};
</script>

<style>

</style>