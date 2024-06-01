
<template>
  <div>
    <div
      v-for="rental in rentals "
      :key="rental.id"
    >
      <div>{{ rental.name }}</div>
      <div>{{ rental.address }}</div>
      <NuxtLink :to="'/rentals/'+rental.id">
        詳細資訊
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  name: '租屋清單',
});
const route = useRoute();
const id = ref(route.params.id);
const rentals = ref([
  {
    id: 1,
    name: '房屋1',
    address: '地址1',
  },
  {
    id: 2,
    name: '房屋2',
    address: '地址2',
  },
  {
    id: 3,
    name: '房屋3',
    address: '地址3',
  },
]);


</script>

<style>

</style>