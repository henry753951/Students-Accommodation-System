<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const { user } = useUserStore();
</script>

<template>
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
</template>
