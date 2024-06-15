<template>
  <div>
    <div v-if="records">
      <InterviewForm 
        v-if="done"
        v-model="records"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Database, Tables, Enums} from "~/database.types";
const supabase = useSupabaseClient<Database>();
const route = useRoute();
const id = ref(route.params.id);
const app_user = useUser();

useHead({
  title: '校外租屋平台 | 訪視紀錄編輯',
});

definePageMeta(
  {
    name: "訪視記錄編輯",
  }
);

let done = ref(true);

const { data: records } =  useAsyncData('record', async() =>{
  done = ref(false);
  let data;
  const {data: record_row, error} = await supabase
  .from('interview_record')
  .select('*, student(*), teacher(app_user(*)), rental_property(*)')
  .eq('record_link', id.value);

  const student_number = ref<string>('');
  if(isStudent()){
    const {data: student, error} = await supabase
    .from('student')
    .select('*')
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    .eq('user_id', app_user.value?.id!);

    student_number.value = student![0].student_number!;
  }

  if(error){
    data = {
      StudentID: isStudent() ? student_number.value : '',
      TeacherName: isTeacher() ? app_user.value?.name : '',
      RecordLink:'new',
    };
  }
  else{
    data = {
    StudentID: record_row![0].student?.student_number,
    TeacherName: record_row![0].teacher?.app_user?.name,
    LandLordName: record_row![0].landlord_name ? record_row![0].landlord_name : null,
    LandLordNumber: record_row![0].landlord_number  ? record_row![0].landlord_number : null,
    PropertyAddress: record_row![0].rental_property?.address,
    Response:  checkNullResponse(record_row![0].response),
    RecordTime: computed(() =>{
        const dateObj = {
          calendar: { identifier: 'gregory' },
          era: 'AD',
          year: record_row![0].record_time?.slice(0, 4),
          month: record_row![0].record_time?.slice(5, 7),
          day: record_row![0].record_time?.slice(8, 10)
      };
      return dateObj as unknown as string;
    }),
    RecordLink: record_row![0].record_link,
  };
  }
  
  
  done = ref(true);
  return data;
});

function isStudent(){
  for(const i in app_user.value?.roles){
    if(app_user.value?.roles[i as unknown as number] === 'student')
      return true;
  }
  return false;
}

function isTeacher(){
  for(const i in app_user.value?.roles){
    if(app_user.value?.roles[i as unknown as number] === 'teacher')
      return true;
  }
  return false;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkNullResponse(response: any){
  for(const i in response){
   if(!response[i])
    response[i] = null;
  }
  return response;
}
</script>

<style>

</style>