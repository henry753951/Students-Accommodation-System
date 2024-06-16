<template>
  <Drawer class="">
    <DrawerTrigger>
      <Button
        variant="outline"
        size="sm"
      >
        預約表單
      </Button>
    </DrawerTrigger>
    <DrawerContent class="w-1/3 h-full absolute left-2/3">
        <DrawerHeader>
          <DrawerTitle>預約表單</DrawerTitle>
          <DrawerDescription>填入必要資訊</DrawerDescription>
        </DrawerHeader>
        <ScrollArea class="h-full">
          <ReservationForm :inviter="inviter"/>
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

const user = useUser();
const inviter = defineModel('inviter', { type: String, default: '' });

</script>

<style scoped>
/* 確保文本可以被選擇 */
* {
  user-select: text;
}
</style>