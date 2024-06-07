<template>
  <TableRow>
    <TableCell class="font-medium">
      {{ teacherName }}
    </TableCell>
    <TableCell>{{ studentName }}</TableCell>
    <TableCell>{{ createdTime }}</TableCell>
    
    <TableCell>
      <NuxtLink
        :to="'/advertisement/info-'+link"
      >
        {{ location }}
      </NuxtLink>
    </TableCell>
    <TableCell class="grid grid-cols-2 g-5">
      <NuxtLink
        to="/interview/record/id"
        class="place-self-center"
      >
        <Button>編輯</Button>
      </NuxtLink>
      <Button
        variant="destructive"
        class="place-self-center"
      >
        刪除
      </Button>
    </TableCell>
  </TableRow>
</template>

<script lang="ts" setup>
defineProps({
  teacherName: {type: String, required: false, default: '無資料'},
  studentName: {type: String, required: false, default: '無資料'},
  createdTime: {type: String, required: false, default: '無資料'},
  location: {type: String, required: false, default: '無資料'},
  link: {type: String, required: false, default: '無資料'},
});
</script>

<style>

</style>