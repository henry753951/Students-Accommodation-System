<template>
  <FormField
    v-slot="{componentField}"
    name="RecordTime"
  >
    <FormItem class="flex flex-col gap-2">
      <FormLabel>
        訪視日期
      </FormLabel>
      
      <Popover>
        <PopoverTrigger
          as-child
        >
          <FormControl>
            <Button
              variant="outline"
              :class="[
                'w-[280px] justify-start text-left font-normal',
                !componentField.modelValue && 'text-muted-foreground',
              ]"
            >
              <CalendarIcon class="mr-2 h-4 w-4" />
              <span>{{ componentField.modelValue ? getTime(componentField.modelValue) : '請選擇日期' }}</span>
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <Calendar
            v-bind="componentField"
            v-model="form.date"
            initial-focus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script lang="ts" setup>
import { Calendar as CalendarIcon } from 'lucide-vue-next';
const form = ref({
  date: ''
  });

function getTime(value: { year: string; month: number; day: number; }) {
  if(!form.value.date){
    return value.year + '-' + (value.month) + '-' + value.day;
  }
  return form.value.date;
}
</script>

<style>

</style>