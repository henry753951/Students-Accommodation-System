<template>
  <div />
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "account-default",
});
const user = useSupabaseUser();

if (user.value?.user_metadata.full_name) {
  console.log("User is logged in");
} else {
  console.log("User is not logged in");
  setPageLayout("account-no-nav");
}

</script>

<style></style>
