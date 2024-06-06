<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1 gap-5 w-2/3">
      <div class="grid grid-cols-2 g-5">
        <NuxtLink
          to="/interview/record/id"
          class="place-self-start"
        >
          <Button> 新增 </Button>
        </NuxtLink>
        <Select
          class="w-48 border border-gray-300 rounded"
        >
          <SelectTrigger>
            <SelectValue placeholder="選擇篩選條件" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">
                全部
              </SelectItem>
              <SelectItem value="time_low_to_high">
                時間：最近
              </SelectItem>
              <SelectItem value="time_high_to_low">
                時間：最遠
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="place-self-strech">
        <Table>
          <TableCaption>以上為與你相關的訪視記錄</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead class="w-1/5">
                老師名稱
              </TableHead>
              <TableHead class="w-1/5">
                學生名稱
              </TableHead>
              <TableHead class="w-1/5">
                建立時間
              </TableHead>
              <TableHead class="w-1/5">
                居住地
              </TableHead>
              <TableHead class="w-1/6">
                編輯/刪除
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell class="font-medium">
                殷堂凱
              </TableCell>
              <TableCell>莊印哲</TableCell>
              <TableCell>20240606</TableCell>
              <TableCell>
                綜合宿舍
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
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>