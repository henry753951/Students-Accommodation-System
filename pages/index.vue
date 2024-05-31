<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
const route = useRoute();
const router = useRouter();
const user = useSupabaseUser();
const { $csrfFetch } = useNuxtApp();
const { data: test } = await useAPI("/api/test", {
  // /api/test
  default: () => {
    return [];
  },
});
</script>

<template>
  <div class="flex gap-5">
    <div v-if="!user">
      <Button @click="navigateTo('auth/login')">
        Login
      </Button>
    </div>
    <div v-else>
      {{ user.user_metadata.full_name }}
      <Button @click="navigateTo('auth/logout')">
        Logout
      </Button>
    </div>
    <a href="/_nitro/openapi.json">
      <Button> Go to Swagger </Button>
    </a>
    <div>
      <h1>From Server :</h1>
      {{ test }}
    </div>
    <!--  -->
    <div>
      <Button @click="navigateTo('test_student_rental')">
        要先確認身分組 Student 新增租屋點
      </Button>
    </div>
    <div class="現在這邊放連結方便快速過去 flex flex-row">
      <NuxtLink to="/addRental" class="" >
        <Button>
          Add Rental page
        </Button>
      </NuxtLink>
      <NuxtLink to="/test_student_rental" class="ml-4">
        <Button>
          test_student_rental page
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>
