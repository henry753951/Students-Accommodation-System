<template>
  <div class="bg-gray-50 min-h-screen p-6 flex items-center justify-center">
    <div class="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg border border-gray-300">
      <h2 class="text-2xl font-bold mb-6 text-center">
        預約表單 - {{ type }}
      </h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <Label for="student_id">學生ID</Label>
          <Input
            id="student_id"
            v-model="form.student_id"
            type="text"
            class="w-full border border-gray-300 rounded mt-1"
            readonly
            required
          />
        </div>
        <Popover v-model:open="open">
          <PopoverTrigger as-child>
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="open"
              class="w-[200px] justify-between"
            >
              {{ value
                ? house?.find((house) => house.address === value)?.address
                : "搜尋或選擇地址" }}
              <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput class="h-9" placeholder="Search framework..." />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="property in house"
                    :key="property.id"
                    :value="property.address"
                    @select="(ev) => {
                      if (typeof ev.detail.value === 'string') {
                        value = ev.detail.value
                        form.property_addr = ev.detail.value
                        form.property_id = house?.find((house) => house.address === value)?.landlord_id ?? ''
                        fetchAppUser()
                      }
                      open = false
                    }"
                  >
                    {{ property.address }}
                    <Check
                      :class="[
                        'ml-auto h-4 w-4',
                        value === property.address ? 'opacity-100' : 'opacity-0',
                      ]"
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <div class="mb-4">
          <Label for="phone">房東名稱(自動抓取)</Label>
          <Input
            id="property_name"
            v-model="form.property_name"
            type="tel"
            class="w-full border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div class="mb-4">
          <Label for="status">狀態</Label>
          <Input
            id="status"
            v-model="form.status"
            type="email"
            class="w-full border border-gray-300 rounded mt-1"
            required
            readonly
          />
        </div>
        <div class="mb-4">
          <Label for="message">備註訊息</Label>
          <Textarea
            id="message"
            v-model="form.message"
            class="w-full border border-gray-300 rounded mt-1"
            rows="4"
          />
        </div>
        <div class="mb-4">
          <FormField name="date">
            <FormLabel class="mr-2">選擇日期</FormLabel>
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
          <Button
            type="submit"
            class="bg-green-500 text-white px-4 py-2 rounded"
          >
            提交
          </Button>
        </div>
        {{form}}
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import type { Database } from '~/database.types';
definePageMeta({
  name: "首頁",
});
const supabase = useSupabaseClient<Database>();
const route = useRoute();
const type = ref(route.params.id);
const user = useUser();



const open = ref(false)
const value = ref('') //選擇表單的value


const { data: house, refresh } = useAsyncData(async () => {
  const { data, error } = await supabase.from("rental_property")
    .select("*")
  if (error) {
    console.error(error);
    return [];
  }
  return data;
});


const form = ref({
  student_id: computed(() => user.value?.id || ''), // 使用 computed 來動態獲取 user.id
  property_addr: '',
  property_id: '',
  property_name: '',
  property_phone: '',
  status: '請求中',
  message: '',
  date: undefined as Date | undefined,
});

const fetchAppUser = async () => {
  try {
    let { data: app_user, error } = await supabase
      .from('app_user')
      .select('*')
      .eq('id', form.value.property_id);

      form.value.property_name = app_user && app_user.length > 0 && app_user[0].name !== null ? app_user[0].name : '';
      form.value.property_phone = app_user && app_user.length > 0 && app_user[0].phone !== null ? app_user[0].phone : '房東沒有留下電話';
    } catch (error) {
    console.error('Error fetching app_user:', error);
    form.value.property_name = '';
  }
};

const handleSubmit = () => {
  console.log('Form submitted:', form.value);
  // 這裡可以添加提交表單的邏輯，例如發送到服務器
};
</script>

<style scoped>
/* Add any additional styling here */
</style>