
<template>
  <h2>Step: {{ currentStep }}</h2>
  <Form
    class="w-full space-y-6"
    :validation-schema="currentSchema"
    keep-values
    @submit="nextStep"
  >  
    <FormField
      v-if="currentStep === 1"
      name=""
    >
      <FormField
        v-slot="{ componentField }"
        name="StudentID"
      >
        <FormItem>
          <FormLabel>Student ID</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Enter your Student ID"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="TeacherID"
      >
        <FormItem>
          <FormLabel>Teacher ID</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Enter your Teacher ID"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </FormField>  

    <FormField
      v-if="currentStep === 2"
      name=""
    >
      <FormField
        v-slot="{ componentField }"
        name="LandLordID"
      >
        <FormItem>
          <FormLabel>LandLord ID</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Enter your LandLord ID"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>


      <FormField
        v-slot="{ componentField }"
        name="LandLordName"
      >
        <FormItem>
          <FormLabel>LandLord Name</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Enter your LandLord Name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="LandLordNumber"
      >
        <FormItem>
          <FormLabel>LandLord Number</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Enter your LandLord Number"
            />
          </FormControl>
          <FormMessage />
        </FormItem>    
      </FormField>
    </FormField>

    <FormField
      v-if="currentStep === 3"
      name=""
    >
      <FormField
        v-slot="{ componentField }"
        name="PropertyID"
      >
        <FormItem>
          <FormLabel>Property ID</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="Enter your Property ID"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </FormField>
    <Button
      v-if="currentStep < 4"
      :disabled="currentStep === 1"
      type="button"
      @click="previousStep()"
    >
      上一步
    </Button>
    <Button
      v-if="currentStep < 4"
      type="submit"
    >
      下一步
    </Button>
  </Form> 
  
  <!-- Question Form -->
  <Form
    v-slot="{values}"
    class="w-full space-y-6"
    :validation-schema="currentSchema"
    keep-values
    @submit="nextStep"
  >
    <FormField 
      v-if="currentStep === 4"
      name=""
    >
      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="rental_type"
      >
        <h2>校外賃居資料</h2>
        <FormItem
          class="space-y-3"
        >
          <FormLabel>租屋型態</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="獨棟透天" />
                </FormControl>
                <FormLabel class="font-normal">
                  獨棟透天
                </FormLabel>

                <FormControl>
                  <RadioGroupItem value="公寓" />
                </FormControl>
                <FormLabel class="font-normal">
                  公寓(五樓以下)
                </FormLabel>

                <FormControl>
                  <RadioGroupItem value="大樓" />
                </FormControl>
                <FormLabel class="font-normal">
                  大樓(六樓以上)
                </FormLabel>
              
                <FormControl>
                  <RadioGroupItem value="宿舍" />
                </FormControl>
                <FormLabel class="font-normal">
                  宿舍
                </FormLabel>

                <FormControl>
                  <RadioGroupItem value="其他" />
                </FormControl>
                <FormLabel class="font-normal">
                  其他
                </FormLabel>

                <FormControl>
                  <Input
                    v-if="values.rental_type === '其他'"
                    v-bind="componentField"
                    type="text"
                    placeholder="請輸入其他"
                  />
                </FormControl>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="room_type"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>房間型態</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="雅房" />
                </FormControl>
                <FormLabel class="font-normal">
                  雅房
                </FormLabel>

                <FormControl>
                  <RadioGroupItem value="套房" />
                </FormControl>
                <FormLabel class="font-normal">
                  套房
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="rent"
      >
        <FormItem>
          <FormLabel>租金</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="請輸入一個月的租金"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="deposit"
      >
        <FormItem>
          <FormLabel>押金</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              type="text"
              placeholder="請輸入押金"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="recommend"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>是否值得推薦其他同學租賃?</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>

                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField> 
    </FormField>
    
    <FormField
      v-if="currentStep === 5"
      name=""
    >
      <h2>賃居安全自主管理檢視資料</h2>
      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="rooftop_dwellings"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>木造隔間或鐵皮加蓋</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>

                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="fire_alarm"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>有火警警報器或偵煙器</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>

                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="emergency_exit"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>逃生通道暢通且標示清楚</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>

                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="locker"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>門禁及鎖具良好管理</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>

                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="illumination"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>有安裝照明設備(停車場及周邊)</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="escape_essentials"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>瞭解熟悉電路安全及逃生要領</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>      
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="safety_phone_number"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>熟悉派出所、醫療、消防隊、學校校安專線電話</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="electrical_safety"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>
            使用多種電器(高耗能)，是否同時插在同一條延長線
          </FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="fire_extinguisher"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>有滅火器且功能正常</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="water_heater"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>熱水器(電熱式及瓦斯式)安全良好，無一氧化碳中毒疑慮</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="multi_room_bed"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>分開6個以上房間或10個以上床位</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="camera"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>有安裝監視器設備</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        type="radio"
        name="contract"
      >
        <FormItem
          class="space-y-3"
        >
          <FormLabel>使用"內政部定型化租賃契約"</FormLabel>
          <FormControl>
            <RadioGroup
              class="flex flex-col space-y-1"
              v-bind="componentField"
            >
              <FormItem class="flex items-center space-y-0 gap-x-3">
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel class="font-normal">
                  是
                </FormLabel>
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel class="font-normal">
                  否
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </FormField> 

    <Button
      v-if="currentStep >= 4"
      type="button"
      @click="previousStep()"
    >
      上一步
    </Button>
    
    <Button
      v-if="currentStep >=4 && !isLastStep()"
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
  </Form>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate';
import * as yup from 'yup';
import { toast } from '@/components/ui/toast';

const schemas = [
  yup.object({
    StudentID: yup.string().min(8,'學號應至少包含八位!').required('請輸入學號!'),
    TeacherID: yup.string().min(8,'老師ID應至少包含八位!').required('請輸入老師ID!'),
  }),
  yup.object({
    LandLordID: yup.string().min(8,'房東ID應至少包含八位!').required('請輸入房東ID!'),
    LandLordName: yup.string().required('請輸入房東名字!'),
    LandLordNumber:yup.string().min(10,'房東電話應為10位!').max(10,'房東電話應為10位!').required('請輸入房東電話!'),
  }),
  yup.object({
    PropertyID: yup.string().required('請輸入租屋點ID!'),
  }), 
  yup.object({
    rental_type: yup.string().required('請選擇租屋型態!'),
    room_type: yup.string().required('請選擇房間型態!'),
    rent: yup.string().required('請輸入租金!'),
    deposit: yup.string().required('請輸入押金!'),
    recommend: yup.boolean().required('此為必填問題!'),
  }),
  yup.object({
    rooftop_dwellings: yup.boolean().required('此為必填問題!'),
    fire_alarm: yup.boolean().required('此為必填問題!'),
    emergency_exit: yup.boolean().required('此為必填問題!'),
    locker: yup.boolean().required('此為必填問題!'),
    illumination: yup.boolean().required('此為必填問題!'),
    escape_essentials: yup.boolean().required('此為必填問題!'),
    safety_phone_number: yup.boolean().required('此為必填問題!'),
    electrical_safety: yup.boolean().required('此為必填問題!'),
    fire_extinguisher: yup.boolean().required('此為必填問題!'),
    water_heater: yup.boolean().required('此為必填問題!'),
    multi_room_bed: yup.boolean().required('此為必填問題!'),
    camera: yup.boolean().required('此為必填問題!'),
    contract: yup.boolean().required('此為必填問題!'),
  }),
];

const currentStep = ref(1);
const indentifyValues = ref(JSON);

const currentSchema = computed(() => {
  return schemas[currentStep.value - 1];
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function nextStep(values: any){
  console.log(values);
  toast({
      title: 'You submitted the following values:',
      description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
    }); 
  
  if(currentStep.value === 3){
    indentifyValues.value = values;
  }
  if(isLastStep()){
    console.log('submit');
    return;
  }
  currentStep.value++;
};


function previousStep(){
  if(currentStep.value <= 0)
    return;
  currentStep.value--;
    
};

function isLastStep(){
  return currentStep.value === schemas.length;
};
</script>

<style>

</style>