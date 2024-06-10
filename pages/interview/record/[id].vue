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
import type { Database, Tables, Enums } from "~/database.types";
const supabase = useSupabaseClient<Database>();
const route = useRoute();
const id = ref(route.params.id);

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
  
  if(error){
    data = {
      StudentID: '',
      TeacherName: '',
      LandLordName: '',
      LandLordNumber: '',
      PropertyAddress: '',
      Response: '',
      RecordLink:'new',
    };
  }
  else{
    data = {
    StudentID: record_row![0].student?.student_number,
    TeacherName: record_row![0].teacher?.app_user?.name,
    LandLordName: record_row![0].landlord_name,
    LandLordNumber: record_row![0].landlord_number,
    PropertyAddress: record_row![0].rental_property?.address,
    Response:  !error ? record_row![0].response : '',
    RecordLink: record_row![0].record_link,
  };
  }
  
  
  done = ref(true);
  return data;
});


</script>

<style>

</style>