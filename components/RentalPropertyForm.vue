<template>
  <form
    class="space-y-6 border-2 border-black p-4 w-1/2"
    @submit="onSubmit"
  >
    <FormField
      v-slot="{ componentField }"
      name="price"
    >
      <FormItem>
        <FormLabel>Price</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            v-model="price"
            type="number"
            placeholder="Enter the price"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="description"
    >
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            v-bind="componentField"
            v-model="description"
            placeholder="Enter the description"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="is_public"
    >
      <FormItem>
        <FormLabel>Is Public</FormLabel>
        <FormControl>
          <Button
            v-model="isPublic"
            type="submit"
            class="ml-4"
          >
            確認是否已刊登?
          </Button>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="property_attributes.type"
    >
      <FormItem>
        <FormLabel>Property Attributes(這邊應該是能否租屋補貼/限男女....)</FormLabel>
        <FormControl>
          <div class="flex flex-wrap gap-4">
            <!-- 第一個 Select -->
            <Select
              v-bind="componentField"
              v-model="propertyAttributesType"
            >
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="選擇屋種" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel class="text-red-500">
                    房型
                  </SelectLabel>
                  <SelectItem value="透天">
                    透天
                  </SelectItem>
                  <SelectItem value="公寓">
                    公寓
                  </SelectItem>
                  <SelectItem value="大樓">
                    大樓
                  </SelectItem>
                  <SelectItem value="雅房">
                    雅房
                  </SelectItem>
                  <SelectItem value="套房">
                    套房
                  </SelectItem>
                  <SelectItem value="其他房型">
                    其他房型
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <!-- 第二個 Select -->
            <Select v-model="propertyAttributesSex">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="是否有限制性別" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel class="text-red-500">
                    性別
                  </SelectLabel>
                  <SelectItem value="男">
                    男
                  </SelectItem>
                  <SelectItem value="女">
                    女
                  </SelectItem>
                  <SelectItem value="多元">
                    多元
                  </SelectItem>
                  <SelectItem value="無">
                    無
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <!-- Checkbox -->
            <div class="flex items-center space-x-2">
              <Checkbox
                id="checkbox"
                v-model:checked="propertyAttributesSubsidy"
              />
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <label
                      for="terms"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      是否能租屋補貼?
                    </label>
                    <p>{{ propertyAttributesSubsidy }}</p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>更多資訊：可以租屋補貼會讓刊登廣告推廣更好。</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <!-- Checkbox -->
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </form>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

const formSchema = toTypedSchema(
  z.object({
    price: z.number().min(0, 'Price must be a positive number'),
    description: z.string().min(10, 'Description must be at least 10 characters long'),
    is_public: z.boolean(),
    property_attributes: z.object({
      type: z.enum(['透天', '公寓', '大樓','套房','雅房', '其他房型']),
      genderRestriction: z.enum(['男', '女', '多元', '無']),
      rentalSubsidy: z.boolean(),
    }),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(values => {
  console.log('Form submitted!', values);
});


const price = defineModel('price', { type: Number, default: 0 });
const description = defineModel('description', { type: String, default: '' });
const isPublic = defineModel('is_public', { type: Boolean, default: false });
const propertyAttributesType = defineModel('propertyAttributesType', { type: String, default: '套房' });
const propertyAttributesSex = defineModel('propertyAttributesSex', { type: String, default: 'None' });
const propertyAttributesSubsidy = defineModel('propertyAttributesSubsidy', { type: Boolean, default: false });
</script>

<style scoped>
/* Add any additional styling here */
</style>