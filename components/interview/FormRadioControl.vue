<template>
  <Label
    class="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-zinc-100 dark:[&:has(:checked)]:bg-zinc-800"
  >
    <FormControl>
      <RadioGroupItem :value="value" />
    </FormControl>
    {{ value }}
  </Label>
</template>

<script lang="ts" setup>
defineProps<{
  value: string,
}>();
</script>

<style>

</style>