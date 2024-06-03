<template>
  <div class="ml-16 flex gap-4 items-center">
    <NuxtLink
      to="/test_student_rental"
      class="flex-1 items-center gap-1 px-4 py-2 border rounded-full text-blue-500 truncate"
    >
      要先確認身分組 Student 新增租屋點
    </NuxtLink>
    <NuxtLink
      to="/map_teacher_student"
      class="flex-1 items-center gap-1 px-4 py-2 border rounded-full text-blue-500 truncate"
    >
      教授使用 map 學生
    </NuxtLink>
    <NuxtLink
      to="/addRental"
      class="flex-1 items-center gap-1 px-4 py-2 border rounded-full text-blue-500 truncate"
    >
      Add Rental page
    </NuxtLink>
    <NuxtLink
      to="/test_student_rental"
      class="flex-1 items-center gap-1 px-4 py-2 border rounded-full text-blue-500 truncate"
    >
      test_student_rental page
    </NuxtLink>
    <MenuLinkDropdown class="truncate"/>
  </div>
</template>

<script setup lang="ts">
// 這裡可以添加任何需要的邏輯
</script>

<style scoped>
/* 這裡可以添加任何需要的樣式 */
</style>