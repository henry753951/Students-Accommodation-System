<template>
  <TableCell class="font-medium">
    {{ teacherName }}
  </TableCell>
  <TableCell>{{ studentName }}</TableCell>
  <TableCell>{{ recordTime }}</TableCell>
  <TableCell>{{ updatedTime }}</TableCell>
  <TableCell>
    <NuxtLink
      v-if="propertyLink !== null"
      class="hover:text-sky-500 hover:underline underline-offset-1"
      :to="'/advertisement/info-'+propertyLink"
    >
      {{ location }}
    </NuxtLink>
    <div v-else>
      {{ location }}
    </div>
  </TableCell>
  <TableCell :class="['text-right', status ==='填答完畢' && 'text-green-400', status === '尚未完成' && 'text-orange-500']">
    {{ status }}
  </TableCell>
</template>

<script lang="ts" setup>

defineProps({
  teacherName: {type: String, required: false, default: '無資料'},
  studentName: {type: String, required: false, default: '無資料'},
  recordTime: {type: String, required: false, default: '無資料'},
  updatedTime: {type: String, required: false, default: '無資料'},
  location: {type: String, required: false, default: '無資料'},
  propertyLink: {type: String, required: false, default: '無資料'},
  recordLink: {type: String, required: false, default: '無資料'},
  status: {type: String, required: false, default: '無資料'},
});


</script>

<style>

</style>