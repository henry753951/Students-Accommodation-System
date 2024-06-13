<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex-1 items-center gap-1 px-4 py-2 border rounded-full text-blue-500">
      顯示所有連結
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-full">
      <DropdownMenuItem>
        <NuxtLink
          to="/test_student_rental"
          class="w-full text-blue-500 px-4 py-2 rounded-full text-center"
        >
          要先確認身分組 Student 新增租屋點
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <NuxtLink
          to="/teacher/students"
          class="w-full text-blue-500 px-4 py-2 rounded-full text-center"
        >
          教授使用 map 學生
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <NuxtLink
          to="/addRental"
          class="w-full text-blue-500 px-4 py-2 rounded-full text-center"
        >
          Add Rental page
        </NuxtLink>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <NuxtLink
          to="/test_student_rental"
          class="w-full text-blue-500 px-4 py-2 rounded-full text-center"
        >
          test_student_rental page
        </NuxtLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* 這裡可以添加任何需要的樣式 */
</style>