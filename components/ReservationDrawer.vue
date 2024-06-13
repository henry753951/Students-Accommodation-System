<template>
  <Drawer>
    <DrawerTrigger>
      <Button
        variant="outline"
        size="sm"
      >
        預約清單
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>預約清單</DrawerTitle>
        <DrawerDescription>以下是您的預約列表</DrawerDescription>
      </DrawerHeader>
      <DrawerBody>
        <ReservationList />
      </DrawerBody>
      <DrawerFooter>
        <DrawerClose>
          <Button variant="outline">
            關閉
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Add any additional styling here */
</style>