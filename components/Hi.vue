<template>
  <div>
    Hi {{ count }}
    <Button @click="count--">
      Decrease
    </Button>
  </div>
</template>

<script lang="ts" setup>
const count = defineModel('count', { type: Number, default: 0 });
</script>

<style>

</style>