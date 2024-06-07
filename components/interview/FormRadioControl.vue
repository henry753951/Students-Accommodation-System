<template>
  <Label
    class="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-zinc-100 dark:[&:has(:checked)]:bg-zinc-800"
  >
    <FormControl>
      <RadioGroupItem :value="value" />
    </FormControl>
    <FormLabel class="font-normal">
      {{ lableValue }}
    </FormLabel>
  </Label>
</template>

<script lang="ts" setup>
defineProps<{
  value: string,
  lableValue: string,
}>();
</script>

<style>

</style>