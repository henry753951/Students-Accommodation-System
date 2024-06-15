<template>
  <FormField
    v-slot="{componentField}"
    type="checkbox"
    name="關懷宣導項目"
  >
    <FormItem>
      <FormField
        v-for="item in items"
        v-slot="{ handleChange }"
        :key="item.id"
        type="checkbox"
        :value="item.id"
        :unchecked-value="false"
        name="關懷宣導項目"
      >
        <FormItem class="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              :checked="componentField.modelValue && componentField.modelValue.includes(item.id)"
              @update:checked="handleChange"
            />
          </FormControl>
          <FormLabel class="font-normal">
            {{ item.label }}
          </FormLabel>
        </FormItem>
      </FormField>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script lang="ts" setup>
const items = [
  {
    id: '交通安全',
    label: '交通安全',
  },
  {
    id: '拒絕菸害',
    label: '拒絕菸害',
  },
  {
    id: '拒絕毒品',
    label: '拒絕毒品',
  },
  {
    id: '登革熱防治',
    label: '登革熱防治',
  },
] as const;
</script>

<style>

</style>