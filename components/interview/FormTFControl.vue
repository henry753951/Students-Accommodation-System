<template>
  <Label
    class="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-zinc-100 dark:[&:has(:checked)]:bg-zinc-800"
  >
    <FormControl>
      <RadioGroupItem value="是" />
    </FormControl>
    是
  </Label>

  <Label
    class="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-zinc-100 dark:[&:has(:checked)]:bg-zinc-800"
  >
    <FormControl>
      <RadioGroupItem value="否" />
    </FormControl>
    否
  </Label>
</template>

<script lang="ts" setup>

</script>

<style>

</style>