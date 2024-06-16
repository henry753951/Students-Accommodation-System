<template>
  <div class="p-6 flex items-center justify-center">
    <div class="w-full bg-card p-6 rounded-lg shadow-lg border">
      <h2 class="text-2xl font-bold mb-6 text-center">
        預約表單 - {{ reservation_type }} 
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <Label for="student_id">邀請者</Label>
          <Input
            id="student_id"
            v-model="inviter_name as string"
            type="text"
            class="w-full border rounded mt-1"
            readonly
            required
          />
        </div>
        <div class="mb-4">
          <Label for="phone">受邀者</Label>
          <Input
            id="property_name"
            v-model="invitee_name as string"
            type="tel"
            class="w-full border rounded mt-1"
            readonly
            required
          />
        </div>
        <Popover v-model:open="open">
          <Label
            for="property_id"
            class="pr-4"
          >房屋地址</Label>
          <Input
            v-if="reservation_type === '預約看房'"
            id="autoInputAddress"
            v-model="auto_rental_property![0].address as string"
            type="tel"
            class="w-full border rounded mt-1"
            readonly
          />
          <PopoverTrigger
            v-if="reservation_type !== '預約看房'"
            as-child
          >
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="open"
              class="justify-between border-2"
            >
              {{ value
                ? house?.find((house) => house.rental_property.address === value)?.rental_property.address
                : "搜尋或選擇地址" }}
              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="p-0">
            <Command>
              <CommandInput
                class="h-9"
                placeholder="搜尋地址..."
              />
              <CommandEmpty>無地址或沒有找到該地址</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="property in house"
                    :key="property.id"
                    :value="property.rental_property.address"
                    @select="(ev) => {
                      if (typeof ev.detail.value === 'string') {
                        value = ev.detail.value
                        form.property_addr = ev.detail.value
                      }
                      open = false
                    }"
                  >
                    {{ property.rental_property.address }}
                    <Check
                      :class="[
                        'ml-auto h-4 w-4',
                        value === property.rental_property.address ? 'opacity-100' : 'opacity-0',
                      ]"
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        <div class="mb-4 pt-3">
          <Label for="message">備註訊息</Label>
          <Textarea
            id="message"
            v-model="form.message"
            class="w-full border rounded mt-1"
            rows="4"
          />
        </div>
        <div class="mb-4">
          <FormField name="date">
            <FormLabel class="mr-2">
              選擇日期
            </FormLabel>
            <Popover>
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  :class="[
                    'w-[280px] justify-start text-left font-normal',
                    !form.date && 'text-muted-foreground'
                  ]"
                >
                  <CalendarIcon class="mr-2 h-4 w-4" />
                  {{ form.date ? form.date : 'Pick a date' }}
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-auto p-0">
                <Calendar
                  v-model="form.date"
                  initial-focus
                />
              </PopoverContent>
            </Popover>
          </FormField>
        </div>
        <div class="text-center">
          <DrawerClose>
            <Button
              type="submit"
              class="bg-green-500 text-white px-4 py-2 rounded"
            >
              提交
            </Button>
          </DrawerClose>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import type { Database } from '~/database.types';
import { useToast } from "~/components/ui/toast/use-toast";

definePageMeta({
  name: "新增預約",
});
const toast = useToast();
const supabase = useSupabaseClient<Database>();
const route = useRoute();
const user = useUser();

const open = ref(false);
const value = ref(''); //選擇表單的value

const props = defineProps<{
  inviter: string;  //我有小改變數名稱
  invitee: string; //房東or老師id
  reservation_type: string;//預約類型
  property_id: string; //房屋的id
}>();


interface DateObj {
  year: number;
  month: number;
  day: number;
}

const formatDate = (dateObj: DateObj): string => {
  const year = dateObj.year;
  const month = String(dateObj.month).padStart(2, '0');
  const day = String(dateObj.day).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const { data: inviter_name } = useAsyncData('get_inviter_name', async () => {
  try {
    const { data: app_user, error } = await supabase
      .from('app_user')
      .select('*')
      .eq('id', props.inviter);

      console.log(app_user);
      return app_user![0].name;   
    } catch (error) {
    console.error('Error fetching app_user:', error);
    return '';
  }
}); 

const { data: invitee_name } = useAsyncData('get_invitee_name', async () => {
  try {
    const { data: app_user, error } = await supabase
      .from('app_user')
      .select('*')
      .eq('id', props.invitee);

      console.log(app_user);
      return app_user![0].name;   
    } catch (error) {
    console.error('Error fetching app_user:', error);
    return '';
  }
});

const { data: house, refresh } = useAsyncData(async () => {
  const { data, error } = await supabase.from("map_rental_property_student")
  .select("*, rental_property!inner(*)")
  .eq("student_id", props.invitee);
  if (error) {
    console.error(error);
    return [];
  }
  return data;
});

let { data: auto_rental_property } = await supabase
  .from('rental_property')
  .select('address')
  .eq('id', props.property_id);

  if (auto_rental_property === null) {
    auto_rental_property = [];
}
          
const handleSubmit = async () => {
  const confirmation = confirm(`
    確定要送出嗎?
  `);

  if (confirmation) {
    if(props.reservation_type !== '預約看房'){
      SubmitToReserve();
    }
    else{
      SubmitToReserveRental();
    }
  } else {
    console.log(confirmation);
  }
};

const form = ref({
  student_id: props.inviter, // 使用 computed 來動態獲取 user.id
  property_addr: props.property_id ? auto_rental_property![0].address : '',
  property_id: props.property_id,
  property_name: invitee_name,
  property_phone: '',
  status: '邀請中',
  message: '',
  date: '',
});



const SubmitToReserve = async () => {
  console.log("BINHAN SO BIG");
  const { data, error } = await supabase
    .from("reservations")
    .insert([
      {
        "student_id": props.inviter as string,
        "user_id": props.invitee as string,
        "status": form.value.status as string,
        "reservation_time": formatDate(form.value.date as unknown as DateObj),
        "reservation_type": props.reservation_type as string,
        "reservation_addr": form.value.property_addr as string,
        "message": form.value.message as string,
      },
    ])
    .select("*");
  if (error) {
    toast.toast({
      title: "Error",
      description: ifTimeError(error.message),
      variant: "destructive",
    });
    return 'error';
  }else{
    toast.toast({
      title: "Success",
      description: "預約成功",
    });
  }
};

const SubmitToReserveRental = async () => {
  console.log("BINHAN SO BIG");
  const { data, error } = await supabase
    .from("reservations")
    .insert([
      {
        "student_id": props.inviter as string,
        "user_id": props.invitee as string,
        "status": form.value.status as string,
        "reservation_time": formatDate(form.value.date as unknown as DateObj),
        "reservation_type": props.reservation_type as string,
        "reservation_addr": auto_rental_property[0].address  as string,
        "message": form.value.message as string,
      },
    ])
    .select("*");
  if (error) {
    toast.toast({
      title: "Error",
      description: ifTimeError(error.message),
      variant: "destructive",
    });
    return 'error';
  }else{
    toast.toast({
      title: "Success",
      description: "預約成功",
    });
  }
};

function ifTimeError(msg: string){
  if(msg === 'invalid input syntax for type timestamp: "undefined-undefined-undefined"')
    return '請選擇日期!';
  else
    return msg;
}

</script>

<style scoped>
/* Add any additional styling here */
</style>