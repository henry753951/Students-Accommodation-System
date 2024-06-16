<template>
  <Drawer class="">
    <DrawerTrigger>
      <Button
        variant="outline"
        size="sm"
      >
        預約清單
      </Button>
    </DrawerTrigger>
    <DrawerContent class="w-1/3 h-full absolute left-2/3">
        <DrawerHeader>
          <DrawerTitle>預約清單</DrawerTitle>
          <DrawerDescription>以下是您的預約列表</DrawerDescription>
        </DrawerHeader>
        <ScrollArea class="h-full">
          <ReservationList class=""/>
          <ReservationListLandlord />
        </ScrollArea>
        <DrawerClose>
          <Button variant="outline" class="border-2 border-black">
            關閉
          </Button>
        </DrawerClose>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* 確保文本可以被選擇 */
* {
  user-select: text;
}
</style>