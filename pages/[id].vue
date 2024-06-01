<template>
  <p>
    {{ id }}
  </p>
</template>

<script lang="ts" setup>
definePageMeta({
  name: '租屋平台',
});
const route = useRoute();
const id = ref(route.params.id);



</script>

<style>

</style>