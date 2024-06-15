<template>
  <div class="flex justify-center">
    <Card class="w-1/2">
      <Form
        class="w-full"
        :initial-values="modelValue"
        :validation-schema="currentSchema"
        keep-values
        @submit="nextStep"
      >
        <FormField
          v-if="currentStep === 1"
          name=""
        >
          <CardHeader>
            <CardTitle>確認師生資料及訪視日期</CardTitle>
            <CardDescription>請您填入您的師生資料，以及進行校外訪視的日期</CardDescription>
          </CardHeader>
          <CardContent class="grid gap-4 ">
            <InterviewFormInput
              field-name="TeacherName"
              lable-value="老師名字"
              place-holder-value="請輸入指導老師的名字"
            />
            <InterviewFormInput
              field-name="StudentID"
              lable-value="學生學號"
              place-holder-value="請輸入學生學號"
            />
            <InterviewFormDatePicker />
          </CardContent>
        </FormField>  
      
        <FormField
          v-if="currentStep === 2"
          name=""
        >
          <CardHeader>
            <CardTitle>確認房東資料</CardTitle>
            <CardDescription>請您輸入房東相關資料</CardDescription>
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
            <CardDescription>請選擇您進行訪視的租屋點</CardDescription>
          </CardHeader>
          <CardContent>
            <InterviewFormSelectProperty 
              :rental-property="rental_property!"
            />
          </CardContent>
        </FormField>
        <CardFooter
          v-if="currentStep < 4"
          class="flex gap-5 place-content-end"
        >
          <Button
            :disabled="currentStep === 1"
            type="button"
            variant="outline"
            @click="previousStep()"
          >
            上一步
          </Button>
          <Button
            type="submit"
            variant="outline"
          >
            下一步
          </Button>
        </CardFooter>
      </Form> 
  
      <!-- Question Form -->
      <Form
        class="w-full"
        :initial-values="modelValue?.Response"
        :validation-schema="currentSchema"
        keep-values
        @submit="nextStep"
      >
        <FormField 
          v-if="currentStep === 4"
          name=""
        >
          <div v-show="student_role">
            <CardHeader>
              <CardTitle>校外賃居資料 ( 學生填寫 )</CardTitle>
              <CardDescription>請學生確認自己的賃居資料</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4 ">
              <InterviewFormRadio
                field-name="租屋型態"
              >
                <InterviewFormRadioControl
                  value="獨棟透天"
                />
                <InterviewFormRadioControl 
                  value="公寓(五樓以下)"
                />
                <InterviewFormRadioControl 
                  value="大樓(六樓以上)"
                />
                <InterviewFormRadioControl 
                  value="大型學舍(為學生建設的宿舍)"
                />
              </InterviewFormRadio>
      
              <InterviewFormRadio
                field-name="房間型態"
              >
                <InterviewFormRadioControl
                  value="雅房"
                />
                <InterviewFormRadioControl 
                  value="套房"
                />
              </InterviewFormRadio>

              <InterviewFormInput
                field-name="租金"
                lable-value="租金"
                place-holder-value="請輸入一個月的租金"
              />

              <InterviewFormInput
                field-name="押金"
                lable-value="押金"
                place-holder-value="請輸入押金"
              />

              <InterviewFormRadio
                field-name="是否值得推薦其他同學租賃"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>
            </CardContent>
          </div>
        </FormField>

        <FormField
          v-if="currentStep === 5"
          name=""
        >
          <div v-show="student_role">
            <CardHeader>
              <CardTitle>賃居安全自主管理檢視資料 ( 學生填寫 )</CardTitle>
              <CardDescription>請學生對自己校外賃居的地點進行安全評估</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4 ">
              <InterviewFormRadio
                field-name="木造隔間或鐵皮加蓋"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="有火警警報器或偵煙器"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="逃生通道暢通且標示清楚"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="門禁及鎖具良好管理"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>
      
              <InterviewFormRadio
                field-name="有安裝照明設備(停車場及周邊)"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="瞭解熟悉電路安全及逃生要領"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>
      
              <InterviewFormRadio
                field-name="熟悉派出所、醫療、消防隊、學校校安專線電話"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>
            </CardContent>
          </div>
        </FormField>

        <FormField
          v-if="currentStep === 6"
          name=""
        >
          <div v-show="student_role">
            <CardHeader>
              <CardTitle>賃居安全自主管理檢視資料 ( 學生填寫 )</CardTitle>
              <CardDescription>請學生對自己校外賃居的地點進行安全評估</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4 ">
              <InterviewFormRadio
                field-name="使用多種電器(高耗能)，是否同時插在同一條延長線"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="有滅火器且功能正常"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="熱水器(電熱式及瓦斯式)安全良好，無一氧化碳中毒疑慮"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio> 
      
              <InterviewFormRadio
                field-name="分開6個以上房間或10個以上床位"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="有安裝監視器設備"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="使用<內政部定型化租賃契約>"
              >
                <InterviewFormTFControl />
              </InterviewFormRadio>
            </CardContent>
          </div>
        </FormField>

        <FormField 
          v-if="currentStep === 4"
          name=""
        >
          <div v-show="teacher_role">
            <CardHeader>
              <CardTitle>環境及作息評估 ( 導師填寫 )</CardTitle>
              <CardDescription>請導師評估學生賃居之環境及作息</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4 ">
              <InterviewFormRadio
                field-name="押金要求"
              >
                <InterviewFormRadioControl
                  value="合理"
                />
                <InterviewFormRadioControl 
                  value="不合理(2個月以上之租金)"
                />
              </InterviewFormRadio>
      
              <InterviewFormRadio
                field-name="水電費要求"
              >
                <InterviewFormRadioControl
                  value="合理"
                />
                <InterviewFormRadioControl 
                  value="不合理"
                />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="居家環境"
              >
                <InterviewFormRadioControl
                  value="佳"
                />
                <InterviewFormRadioControl 
                  value="適中"
                />
                <InterviewFormRadioControl 
                  value="欠佳"
                />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="生活設施"
              >
                <InterviewFormRadioControl
                  value="佳"
                />
                <InterviewFormRadioControl 
                  value="適中"
                />
                <InterviewFormRadioControl 
                  value="欠佳"
                />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="訪視現況"
              >
                <InterviewFormRadioControl
                  value="生活規律"
                />
                <InterviewFormRadioControl 
                  value="適中"
                />
                <InterviewFormRadioControl 
                  value="待加強"
                />
              </InterviewFormRadio>

              <InterviewFormRadio
                field-name="主客相處"
              >
                <InterviewFormRadioControl
                  value="和睦"
                />
                <InterviewFormRadioControl 
                  value="欠佳"
                />
              </InterviewFormRadio>
            </CardContent>
          </div>
        </FormField>

        <FormField
          v-if="currentStep === 5"
          name=""
        >
          <div v-show="teacher_role">
            <CardHeader>
              <CardTitle>訪視結果 ( 導師填寫 )</CardTitle>
              <CardDescription>請導師大略總結訪視結果</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4 ">
              <InterviewFormRadio
                field-name="訪視結果"
              >
                <InterviewFormRadioControl
                  value="整體賃居狀況良好"
                />
                <InterviewFormRadioControl 
                  value="聯繫家長關注"
                />
                <InterviewFormRadioControl 
                  value="安全堪慮請協助"
                />
              </InterviewFormRadio>

              <InterviewFormInput
                field-name="訪視結果說明"
                lable-value="訪視結果說明(若沒有請填無)"
                place-holder-value="請簡述訪視結果"
              />
              <InterviewFormInput
                field-name="其他記載或建議事項"
                lable-value="其他記載或建議事項(若沒有請填無)"
                place-holder-value="請輸入建議事項"
              />
            </CardContent>
          </div>
        </FormField> 

        <FormField
          v-if="currentStep === 6"
          name=""
        >
          <div v-show="teacher_role">
            <CardHeader>
              <CardTitle>關懷宣導項目 ( 導師填寫 )</CardTitle>
              <CardDescription>懇請導師賃居訪視時多予關懷叮嚀，至少選填一選項</CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4 ">
              <InterviewFormCheckBox />
            </CardContent>
          </div>
        </FormField>

        <FormField 
          v-if="currentStep === 7"
          name=""
        >
          <CardHeader>
            <CardTitle v-if="status === '填答完畢'">
              填寫完成!
            </CardTitle>
            <CardTitle v-else>
              填寫尚未完成!
            </CardTitle>
            <CardDescription v-if="status === '填答完畢'">
              感謝您的填寫
            </CardDescription>
            <CardDescription v-else>
              目前已填寫的資料已上傳，後續請將未填寫的資料補上，或透過分享功能邀請他人填寫無法填寫的部分
            </CardDescription>
          </CardHeader>
        </FormField>

        <CardFooter
          v-if="currentStep >= 4 && currentStep < 7"
          class="flex gap-5 place-content-end"
        >
          <Button
            type="button"
            variant="outline"
            @click="previousStep()"
          >
            上一步
          </Button>
    
          <Button
            v-if="!isLastStep()"
            variant="outline"
            type="submit"
          >
            下一步
          </Button>

          <Button
            v-if="isLastStep()"
            variant="outline"
            type="submit"
          >
            完成
          </Button>
        </CardFooter>

        <CardFooter
          v-if="currentStep === 7"
          class="place-content-end gap-5"
        >
          <NuxtLink
            :to="'/interview/record/info-' + completed_link"
          >
            <Button
              variant="outline"
              type="button"
            >
              確認資料
            </Button>
          </NuxtLink>
          <NuxtLink
            to="/interview/record"
          >
            <Button
              variant="outline"
              type="button"
            >
              返回訪視紀錄清單
            </Button>
          </NuxtLink>
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
const app_user = useUser();

type initial = {
  StudentID: string,
  TeacherName: string,
  LandLordName: string,
  LandLordNumber: string,
  PropertyAddress: string,
  Response: JSON,
  RecordTime: unknown,
  RecordLink: string,
};

const modelValue = defineModel<initial>();
const supabase = useSupabaseClient<Database>();
const status = ref('填答完畢');

const default_required_error = '此為必填問題!';
onMounted(() => {
  isStudent();
  isTeacher();
});
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
    RecordTime: yup.mixed().required('請選擇訪視時間!')
  }),
  yup.object({
    LandLordName: yup.string().nullable(),
    LandLordNumber:yup.string()
      .min(10,'房東電話應為10位!')
      .max(10,'房東電話應為10位!')
      .nullable(),
  }),
  yup.object({
    PropertyAddress: yup.string().nullable(),
  }), 
  yup.object({
    '租屋型態': yup.string().nullable(),
    '房間型態': yup.string().nullable(),
    '租金': yup.string().nullable(),
    '押金': yup.string().nullable(),
    '是否值得推薦其他同學租賃': yup.string().nullable(),
    '押金要求': yup.string().nullable(),
    '水電費要求': yup.string().nullable(),
    '居家環境': yup.string().nullable(),
    '生活設施': yup.string().nullable(),
    '訪視現況': yup.string().nullable(),
    '主客相處': yup.string().nullable(),
  }),
  yup.object({
    '木造隔間或鐵皮加蓋': yup.string().nullable(),
    '有火警警報器或偵煙器': yup.string().nullable(),
    '逃生通道暢通且標示清楚': yup.string().nullable(),
    '門禁及鎖具良好管理': yup.string().nullable(),
    '有安裝照明設備(停車場及周邊)': yup.string().nullable(),
    '瞭解熟悉電路安全及逃生要領': yup.string().nullable(),
    '熟悉派出所、醫療、消防隊、學校校安專線電話': yup.string().nullable(),
    '訪視結果': yup.string().nullable(),
    '訪視結果說明': yup.string().nullable(),
    '其他記載或建議事項': yup.string().nullable(),
  }),
  yup.object({
    '使用多種電器(高耗能)，是否同時插在同一條延長線': yup.string().nullable(),
    '有滅火器且功能正常': yup.string().nullable(),
    '熱水器(電熱式及瓦斯式)安全良好，無一氧化碳中毒疑慮': yup.string().nullable(),
    '分開6個以上房間或10個以上床位': yup.string().nullable(),
    '有安裝監視器設備': yup.string().nullable(),
    '使用<內政部定型化租賃契約>': yup.string().nullable(),
    '關懷宣導項目': yup.array().nullable(),
  }),
];

const currentSchema = computed(() => {
  return schemas[currentStep.value - 1];
});

const currentStep = ref(1);
let firstFormValues = ref();

function isLastStep(){
  return currentStep.value === 6;
};

function previousStep(){
  if(currentStep.value <= 0)
    return;
  currentStep.value--;
    
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nextStep(values: any){
  // toast({
  //     title: 'You submitted the following values:',
  //     description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  //   }); 
  
  if(currentStep.value === 3){
    firstFormValues = ref(values);
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
  const time = new Date(first.value.RecordTime.year, first.value.RecordTime.month - 1, first.value.RecordTime.day, 8, 0, 0).toISOString();
  SubmitToInterviewRecord(first, second, time);
  }
  else{
    console.log(comfirmation);
  }
};

const completed_link = ref('');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SubmitToInterviewRecord = async (firstForm :any, secondForm: any, time:string) => {
  checkIfValueNull(firstForm.value);
  checkIfValueNull(secondForm);

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

  if(modelValue?.value?.RecordLink !== 'new'){
    const { data: update , error } = await supabase
      .from("interview_record")
      .update({
        "student_id": student_user_id![0].user_id,
        "teacher_id": teacher_user_id![0].id,
        "landlord_id": landlord_user_id,
        "landlord_name": firstForm.value.LandLordName,
        "landlord_number": firstForm.value.LandLordNumber,
        "property_id": firstForm.value.PropertyAddress !== null ? property_id![0].id : null,
        "response": secondForm,
        "record_time":time,
        "status": status.value,
      }
      ) 
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      .eq("record_link", modelValue?.value?.RecordLink!)
      .select("*");
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      completed_link.value = update![0].record_link;
      currentStep.value++;
  }
  else{
    const { data: insert , error } = await supabase
      .from("interview_record")
      .insert({
        "student_id": student_user_id![0].user_id,
        "teacher_id": teacher_user_id![0].id,
        "landlord_id": landlord_user_id,
        "landlord_name": firstForm.value.LandLordName,
        "landlord_number": firstForm.value.LandLordNumber,
        "property_id": firstForm.value.PropertyAddress !== null ? property_id![0].id : null,
        "response": secondForm,
        "record_time":time,
        "status": status.value,
      }
      )
      .select("*");
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      completed_link.value = insert![0].record_link;
      currentStep.value++;
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

const { data: rental_property, pending, refresh } = useAsyncData('rental_property', async () => {
  const { data, error } = await supabase.from("map_rental_property_student").select("*, rental_property!inner(*)").eq("student_id", app_user.value!.id);
  if (error) {
    throw error;
  }
  return data;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkIfValueNull(form: any){
  for(const i in form){
    if(!form[i]){
      form[i] = null;
      status.value = '尚未完成';
    }
  }
};

const student_role = ref(false);
function isStudent(){
  for(const i in app_user.value?.roles){
    if(app_user.value?.roles[i as unknown as number] === 'student')
      student_role.value = true;
  }
}

const teacher_role = ref(false);
function isTeacher(){
  for(const i in app_user.value?.roles){
    if(app_user.value?.roles[i as unknown as number] === 'teacher')
      teacher_role.value = true;
  }
}
</script>

<style>

</style>