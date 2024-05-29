<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
const route = useRoute();
const router = useRouter();
const user = useSupabaseUser();
const { $csrfFetch } = useNuxtApp();
const { data: test } = await useAPI("/test", { // /api/test
  default: () => {
    return [];
  },
});
</script>

<template>
  <div>
    <div 
      v-if="!user"
    >
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
    <div>
      <h1>From Server :</h1>
      {{ test }}
    </div>
  </div>
</template>


