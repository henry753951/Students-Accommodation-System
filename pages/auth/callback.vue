<template>
  <div />
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
const UserStore = useUserStore();
onMounted(() => {
  UserStore.user = user.value;
  if (user.value) {
    navigateTo("/");
  }
});
</script>

<style></style>
