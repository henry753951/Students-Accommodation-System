<template>
  <Label
    class="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-zinc-100 dark:[&:has(:checked)]:bg-zinc-800"
  >
    <FormControl>
      <RadioGroupItem value="true" />
    </FormControl>
    <FormLabel class="font-normal">
      是
    </FormLabel>
  </Label>

  <Label
    class="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-zinc-100 dark:[&:has(:checked)]:bg-zinc-800"
  >
    <FormControl>
      <RadioGroupItem value="false" />
    </FormControl>
    <FormLabel class="font-normal">
      否
    </FormLabel>
  </Label>
</template>

<script lang="ts" setup>

</script>

<style>

</style>