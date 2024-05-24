<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
const route = useRoute();
const router = useRouter();
const user = useSupabaseUser();
</script>

<template>
  <div>
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
    <div class="h-[500vh]">
      123
    </div>
  </div>
</template>
