<template>
  <FormField
    v-slot="{ componentField }"
    :name="fieldName"
  >
    <FormItem>
      <FormLabel>{{ lableValue }}</FormLabel>
      <FormControl>
        <Input
          v-bind="componentField"
          type="text"
          :placeholder="placeHolderValue"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<!-- eslint-disable vue/require-default-prop -->
<script lang="ts" setup>
defineProps<{
  fieldName: string,
  lableValue: string,
  placeHolderValue: string
}>();

</script>

<style>

</style>