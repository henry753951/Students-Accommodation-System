<template>
  <Drawer
    v-if="user"
    class=""
  >
    <DrawerTrigger>
      <Button
        variant="outline"
        size="sm"
      >
        預約清單
      </Button>
    </DrawerTrigger>
    <DrawerContent class="w-1/3 h-full left-2/3">
      <DrawerHeader class="pl-8 pb-3">
        <DrawerTitle>預約清單</DrawerTitle>
        <DrawerDescription>以下是您所有的預約列表</DrawerDescription>
      </DrawerHeader>
      <ScrollArea class="h-full">
        <ReservationList />
        <ReservationListLandlord />
      </ScrollArea>
      <DrawerClose class="p-3">
        <Button
          variant="outline"
        >
          關閉
        </Button>
      </DrawerClose>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">

const user = useUser();

</script>

<style scoped>
/* 確保文本可以被選擇 */
* {
  user-select: text;
}
</style>