<template>
  <TableCell class="font-medium">
    {{ teacherName }}
  </TableCell>
  <TableCell>{{ studentName }}</TableCell>
  <TableCell>{{ createdTime }}</TableCell>
    
  <TableCell>
    <NuxtLink
      class="hover:text-sky-500 hover:underline underline-offset-1"
      :to="'/advertisement/info-'+propertyLink"
    >
      {{ location }}
    </NuxtLink>
  </TableCell>
</template>

<script lang="ts" setup>

defineProps({
  teacherName: {type: String, required: false, default: '無資料'},
  studentName: {type: String, required: false, default: '無資料'},
  createdTime: {type: String, required: false, default: '無資料'},
  location: {type: String, required: false, default: '無資料'},
  propertyLink: {type: String, required: false, default: '無資料'},
  recordLink: {type: String, required: false, default: '無資料'},
});


</script>

<style>

</style>