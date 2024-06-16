<template>
  <Drawer>
    <DrawerTrigger>
      <Button class="rounded">
        預約
      </Button>
    </DrawerTrigger>
    <DrawerContent class="w-1/3 h-full left-2/3">
      <DrawerHeader class="pl-8 pb-3">
        <DrawerTitle>預約表單</DrawerTitle>
        <DrawerDescription>您可以填入您的預約資料</DrawerDescription>
      </DrawerHeader>
      <ScrollArea class="h-full">
        <ReservationForm 
          :inviter="inviter" 
          :invitee="invitee" 
          :reservation_type="reservation_type" 
          :property_id="propertyId" 
        />
      </ScrollArea>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">

const inviter = defineModel('inviter', { type: String, default: '' });
const invitee = defineModel('invitee', { type: String, default: '' });
const reservation_type = defineModel('reservation_type', { type: String, default: '' }); 
const propertyId = defineModel('propertyId', { type: String, default: '' });
</script>

<style scoped>
/* 確保文本可以被選擇 */
* {
  user-select: text;
}
</style>