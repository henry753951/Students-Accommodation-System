<script setup lang="ts">
import type { Database } from '~/database.types';

definePageMeta({
  name: "首頁",
});
const route = useRoute();
const router = useRouter();
const supabase = useSupabaseClient<Database>();
const user = useUser();
const { data: test } = await useAPI("/api/test", {
  default: () => {
    return [];
  },
});

const query_school_number = ref("a1105534");
const { data: students, refresh } = useAsyncData(async () => {
  const { data, error } = await supabase.from("app_user")
    .select("*,student(*)")
    .not('student', 'is', null)
    .eq("student.student_number", query_school_number.value); // eq 在join中的用法
  if (error) {
    console.error(error);
    return [];
  }
  return data;
});
</script>
<template>
  <!-- {{ user }} -->
  <div class="flex flex-col items-center justify-center p-10">
    <div class="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 space-y-6">
      <div class="flex justify-between items-center">
        <div v-if="!user">
          <Button @click="navigateTo('auth/login')">
            Login
          </Button>
        </div>
        <div
          v-else
          class="flex items-center space-x-4"
        >
          {{ user }}
          <span class="text-gray-700 font-semibold">{{ user.name }}</span>
          <Button @click="navigateTo('auth/logout')">
            Logout
          </Button>
        </div>
        <a href="/_nitro/openapi.json">
          <Button>Go to Swagger</Button>
        </a>
      </div>
      <div class="bg-gray-50 rounded-lg p-4 border-2 border-black">
        <h1 class="text-xl font-semibold text-gray-800 mb-4">
          From Server message:
        </h1>
        <div class="text-gray-700">
          {{ test }}
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button
          class="w-full"
          @click="navigateTo('test_student_rental')"
        >
          要先確認身分組 Student 新增租屋點
        </Button>
        <Button
          class="w-full"
          @click="navigateTo('map_teacher_student')"
        >
          教授使用 map 學生
        </Button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NuxtLink
          to="/addRental"
          class="w-full sm:w-auto"
        >
          <Button class="w-full">
            Add Rental page
          </Button>
        </NuxtLink>
        <NuxtLink
          to="/test_student_rental"
          class="w-full sm:w-auto"
        >
          <Button class="w-full">
            test_student_rental page
          </Button>
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <NuxtLink
          to="/addRental"
          class="w-full sm:w-auto"
        >
          <Button class="w-full">
            目前空的
          </Button>
        </NuxtLink>
        <NuxtLink
          to="/advertisement"
          class="w-full sm:w-auto"
        >
          <Button class="w-full">
            廣告頁面
          </Button>
        </NuxtLink>
      </div>
      <div>
        <!-- JOIN 範例 -->
        <h1 class="text-xl font-semibold mb-4">
          JOIN 範例
        </h1>
        <Input v-model="query_school_number" />
        <Button @click="refresh">
          Refresh
        </Button>
        <p>Result:</p>
        <div class="flex gap-2 flex-wrap">
          <span
            v-for="student in students"
            :key="student.id"
          >
            {{ student.name }}[{{ student.student!.student_number }}] </span>
        </div>
      </div>
    </div>
  </div>
</template>
