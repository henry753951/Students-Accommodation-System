<template>
  <div />
</template>

<script lang="ts" setup>
const user = useSupabaseUser();
onMounted(() => {
  if (user.value) {
    navigateTo("/");
  }
});
</script>

<style></style>
