<template>
  <FormControl>
    <RadioGroupItem :value="value" />
  </FormControl>
  <FormLabel class="font-normal">
    {{ lableValue }}
  </FormLabel>
</template>

<script lang="ts" setup>
defineProps<{
  value: string,
  lableValue: string,
}>();
</script>

<style>

</style>