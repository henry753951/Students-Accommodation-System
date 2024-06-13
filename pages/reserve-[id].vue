<template>
  <div class="bg-gray-50 min-h-screen p-6 flex items-center justify-center">
    <div class="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg border border-gray-300">
      <h2 class="text-2xl font-bold mb-6 text-center">
        預約表單 - {{ type }}
      </h2>
      {{ form }}
      <form @submit.prevent="handleSubmit">
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
          <Label for="date">選擇時間</Label>
          <Calendar
            v-model="form.date"
            class="w-full border border-gray-300 rounded mt-1"
          />
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
import { ref } from 'vue';
const route = useRoute();
const type = ref(route.params.id);

const form = ref({
  phone: '',
  email: '',
  message: '',
  date: null,
});

const handleSubmit = () => {
  console.log('Form submitted:', form.value);
  // 這裡可以添加提交表單的邏輯，例如發送到服務器
};
</script>

<style scoped>
/* Add any additional styling here */
</style>