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
        <div class="mb-4">
          <Label for="phone">電話</Label>
          <Input
            id="phone"
            v-model="form.phone"
            type="tel"
            class="w-full border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div class="mb-4">
          <Label for="email">信箱</Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            class="w-full border border-gray-300 rounded mt-1"
            required
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
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Calendar as CalendarIcon } from 'lucide-vue-next';

const route = useRoute();
const type = ref(route.params.id);
const user = useUser();

const form = ref({
  student_id: computed(() => user.value?.id || ''), // 使用 computed 來動態獲取 user.id
  phone: '',
  email: '',
  message: '',
  date: undefined as Date | undefined,
});

const handleSubmit = () => {
  console.log('Form submitted:', form.value);
  // 這裡可以添加提交表單的邏輯，例如發送到服務器
};
</script>

<style scoped>
/* Add any additional styling here */
</style>