
<template>
  <h2>Step: {{ currentStep }}</h2>
  <div class="flex justify-center">
    <Card class="w-1/2">
      <Form
        class="w-full"
        :validation-schema="currentSchema"
        keep-values
        @submit="nextStep"
      >
        <FormField
          v-if="currentStep === 1"
          name=""
        >
          <CardHeader>
            <CardTitle>確認師生資料</CardTitle>
            <CardDescription>請你先確認資料</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4 ">
            <InterviewFormInput
              field-name="StudentID"
              lable-value="學生學號"
              place-holder-value="請輸入學生學號"
            />
            <InterviewFormInput
              field-name="TeacherName"
              lable-value="老師名字"
              place-holder-value="請輸入指導老師的名字"
            />
          </CardContent>
        </FormField>  
      
        <FormField
          v-if="currentStep === 2"
          name=""
        >
          <CardHeader>
            <CardTitle>確認房東資料</CardTitle>
            <CardDescription>請你先確認資料</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4">
            <InterviewFormInput
              field-name="LandLordName"
              lable-value="房東名字"
              place-holder-value="請輸入房東名字"
            />
      
            <InterviewFormInput
              field-name="LandLordNumber"
              lable-value="房東電話"
              place-holder-value="請輸入房東電話"
            />
          </CardContent> 
        </FormField>

        <FormField
          v-if="currentStep === 3"
          name=""
        > 
          <CardHeader>
            <CardTitle>選擇租屋點資料</CardTitle>
            <CardDescription>請選擇您的租屋點</CardDescription>
          </CardHeader>
          <CardContent>
            <InterviewFormSelectProperty 
              :rental-property="rental_property!"
            />
          </CardContent>
        </FormField>
        <CardFooter v-if="currentStep < 4">
          <Button
            :disabled="currentStep === 1"
            type="button"
            @click="previousStep()"
          >
            上一步
          </Button>
          <Button
            type="submit"
          >
            下一步
          </Button>
        </CardFooter>
      </Form> 
  
      <!-- Question Form -->
      <Form
        class="w-full"
        :validation-schema="currentSchema"
        keep-values
        @submit="nextStep"
      >
        <FormField 
          v-if="currentStep === 4"
          name=""
        >
          <CardHeader>
            <CardTitle>校外賃居資料</CardTitle>
            <CardDescription>請你先確認資料</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4 ">
            <InterviewFormRadio
              field-name="rental_type"
              lable-value="租屋型態"
            >
              <InterviewFormRadioControl
                value="獨棟透天"
                lable-value="獨棟透天"
              />
              <InterviewFormRadioControl 
                value="公寓"
                lable-value="公寓(五樓以下)"
              />
              <InterviewFormRadioControl 
                value="大樓"
                lable-value="大樓(六樓以上)"  
              />
              <InterviewFormRadioControl 
                value="宿舍"
                lable-value="宿舍"
              />
              <InterviewFormRadioControl 
                value="其他"
                lable-value="其他"
              />
            </InterviewFormRadio>
      
            <InterviewFormRadio
              field-name="room_type"
              lable-value="房間型態"
            >
              <InterviewFormRadioControl
                value="雅房"
                lable-value="雅房"
              />
              <InterviewFormRadioControl 
                value="套房"
                lable-value="套房"
              />
            </InterviewFormRadio>

            <InterviewFormInput
              field-name="rent"
              lable-value="租金"
              place-holder-value="請輸入一個月的租金"
            />

            <InterviewFormInput
              field-name="deposit"
              lable-value="押金"
              place-holder-value="請輸入押金"
            />

            <InterviewFormRadio
              field-name="recommend"
              lable-value="是否值得推薦其他同學租賃?"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>
          </CardContent>
        </FormField>

        <FormField
          v-if="currentStep === 5"
          name=""
        >
          <CardHeader>
            <CardTitle>校外賃居安全資料</CardTitle>
            <CardDescription>請你先確認資料</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4 ">
            <InterviewFormRadio
              field-name="rooftop_dwellings"
              lable-value="木造隔間或鐵皮加蓋"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>

            <InterviewFormRadio
              field-name="fire_alarm"
              lable-value="有火警警報器或偵煙器"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>

            <InterviewFormRadio
              field-name="emergency_exit"
              lable-value="逃生通道暢通且標示清楚"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>

            <InterviewFormRadio
              field-name="locker"
              lable-value="門禁及鎖具良好管理"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>
      
            <InterviewFormRadio
              field-name="illumination"
              lable-value="有安裝照明設備(停車場及周邊)"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>

            <InterviewFormRadio
              field-name="escape_essentials"
              lable-value="瞭解熟悉電路安全及逃生要領"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>
      
            <InterviewFormRadio
              field-name="safety_phone_number"
              lable-value="熟悉派出所、醫療、消防隊、學校校安專線電話"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>
 
            <InterviewFormRadio
              field-name="electrical_safety"
              lable-value="使用多種電器(高耗能)，是否同時插在同一條延長線"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>

            <InterviewFormRadio
              field-name="fire_extinguisher"
              lable-value="有滅火器且功能正常"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>

            <InterviewFormRadio
              field-name="water_heater"
              lable-value="熱水器(電熱式及瓦斯式)安全良好，無一氧化碳中毒疑慮"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio> 
      
            <InterviewFormRadio
              field-name="multi_room_bed"
              lable-value="分開6個以上房間或10個以上床位"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>

            <InterviewFormRadio
              field-name="camera"
              lable-value="有安裝監視器設備"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>

            <InterviewFormRadio
              field-name="contract"
              lable-value="使用<內政部定型化租賃契約>"
            >
              <InterviewFormTFControl />
            </InterviewFormRadio>
          </CardContent>
        </FormField>

        <CardFooter v-if="currentStep >= 4">
          <Button
            type="button"
            @click="previousStep()"
          >
            上一步
          </Button>
    
          <Button
            v-if="!isLastStep()"
            type="submit"
          >
            下一步
          </Button>

          <Button
            v-if="isLastStep()"
            type="submit"
          >
            完成
          </Button>
        </CardFooter>
      </Form>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate';
import * as yup from 'yup';
import { toast } from '@/components/ui/toast';

import type { Database, Tables, Enums } from "~/database.types";


const supabase = useSupabaseClient<Database>();

const default_required_error = '此為必填問題!';

const schemas = [
  yup.object({
    StudentID: yup.string()
      .min(8, '學號應為八位!')
      .max(8, '學號應為八位!')
      .required('請輸入學號!')
      .test("studentID_async_validation","${value} 不是學號或無此學生!", function(value):Promise<boolean>{
        return isValidStudent(value);
      }),
    TeacherName: yup.string()
      .required('請輸入老師名字!')
      .test("teacherName_async_validation","沒有 ${value} 這個老師!", function(value):Promise<boolean>{
        return isValidTeacher(value);
      }),
  }),
  yup.object({
    LandLordName: yup.string().required('請輸入房東名字!'),
    LandLordNumber:yup.string()
      .min(10,'房東電話應為10位!')
      .max(10,'房東電話應為10位!')
      .required('請輸入房東電話!'),
  }),
  yup.object({
    PropertyAddress: yup.string().required('請選擇租屋點!'),
  }), 
  yup.object({
    rental_type: yup.string().required('請選擇租屋型態!'),
    room_type: yup.string().required('請選擇房間型態!'),
    rent: yup.string().required('請輸入租金!'),
    deposit: yup.string().required('請輸入押金!'),
    recommend: yup.boolean().required(default_required_error),
  }),
  yup.object({
    rooftop_dwellings: yup.boolean().required(default_required_error),
    fire_alarm: yup.boolean().required(default_required_error),
    emergency_exit: yup.boolean().required(default_required_error),
    locker: yup.boolean().required(default_required_error),
    illumination: yup.boolean().required(default_required_error),
    escape_essentials: yup.boolean().required(default_required_error),
    safety_phone_number: yup.boolean().required(default_required_error),
    electrical_safety: yup.boolean().required(default_required_error),
    fire_extinguisher: yup.boolean().required(default_required_error),
    water_heater: yup.boolean().required(default_required_error),
    multi_room_bed: yup.boolean().required(default_required_error),
    camera: yup.boolean().required(default_required_error),
    contract: yup.boolean().required(default_required_error),
  }),
];

const currentSchema = computed(() => {
  return schemas[currentStep.value - 1];
});

const currentStep = ref(1);
let firstFormValues = ref();

function isLastStep(){
  return currentStep.value === schemas.length;
};

function previousStep(){
  if(currentStep.value <= 0)
    return;
  currentStep.value--;
    
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nextStep(values: any){
  console.log(values);
  toast({
      title: 'You submitted the following values:',
      description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
    }); 
  
  if(currentStep.value === 3){
    firstFormValues = ref(values);
    console.log(JSON.stringify(values, null, 2));
  }
  if(isLastStep()){
    console.log('submit');
    handleSubmit(firstFormValues, values);
    return;
  }
  currentStep.value++;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleSubmit = async (first: any, second: any) => {
  const comfirmation = confirm('確認送出?');
  if(comfirmation){
  const time = new Date().toISOString();
  SubmitToInterviewRecord(first, second, time);
  }
  else{
    console.log(comfirmation);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SubmitToInterviewRecord = async (firstForm :any, secondForm: any, time:string) => {
  const {data: student_user_id} = await supabase
    .from("student")
    .select("*")
    .eq("student_number", firstForm.value.StudentID.toLowerCase());

  const {data: teacher_user_id} = await supabase
    .from("app_user")
    .select("*")
    .eq("name", firstForm.value.TeacherName);

  const {data: check_landlord_user} = await supabase
    .from("app_user")
    .select("*")
    .eq("name", firstForm.value.LandLordName);
  
  console.log(check_landlord_user);
  let landlord_user_id = null;
  if(check_landlord_user?.length !== 0){
    const { data } = await supabase
    .from("landlord")
    .select("*")
    .eq("user_id", check_landlord_user![0].id);
    landlord_user_id = data?.length !== 0 ? data![0].user_id : null;
  }

  const {data: property_id} = await supabase
    .from("rental_property")
    .select("*")
    .eq("address", firstForm.value.PropertyAddress);
  
  const { data , error } = await supabase
  .from("interview_record")
  .insert([{
    "student_id": student_user_id![0].user_id,
    "teacher_id": teacher_user_id![0].id,
    "landlord_id": landlord_user_id,
    "landlord_name": firstForm.value.LandLordName,
    "landlord_number": firstForm.value.LandLordNumber,
    "property_id":property_id![0].id,
    "response": secondForm,
    "record_time":time,
  }
  ])
  .select("*");
  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
};

const isValidStudent = async (value: string): Promise<boolean> => {
  if(value.length < 8 || value.length > 8){
    return true;
  }
  const {data, error}= await supabase
  .from("student")
  .select("*")
  .eq("student_number", value.toLowerCase());
  console.log(data);
  if(data?.length === 0){
    return false;
  }
  if(error){
    console.log(error);
    return false;
  }
  return true;
};

const isValidTeacher = async (value: string): Promise<boolean> => {
  if(value.length < 2){
    return false;
  }
  const {data: app_user_row, error} = await supabase
  .from("app_user")
  .select("*")
  .eq("name", value);

  if(app_user_row?.length === 0){
    return false;
  }
  else{
    const {data, error}= await supabase
    .from("teacher")
    .select("*")
    .eq("user_id", app_user_row![0].id);
    console.log(data);
    if(data?.length === 0){
      return false;
    }
    if(error){
      console.log(error);
      return false;
    }
    return true;
  }
};

const { data: rental_property, pending: isLoading, refresh: refresh } = useAsyncData('rental_property', async () => {
  const { data } = await supabase.from('rental_property').select(`
    *
  `);
  return data;
});
</script>

<style>

</style>