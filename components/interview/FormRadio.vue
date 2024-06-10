<template>
  <FormField
    v-slot="{ componentField }"
    type="radio"
    :name="fieldName"
  >
    <FormItem
      class="space-y-3"
    >
      <FormLabel>{{ fieldName }}</FormLabel>
      <FormControl>
        <RadioGroup
          class="flex flex-col space-y-1"
          v-bind="componentField"
        >
          <FormItem class="flex items-center space-y-0 gap-x-3">
            <slot />
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script lang="ts" setup>
defineProps<{
  fieldName: string,
}>();
</script>

<style>

</style>