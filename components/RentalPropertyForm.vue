<template>
  <form @submit="onSubmit" class="space-y-6 border-2 border-black p-4 w-1/2">
    <FormField v-slot="{ componentField }" name="price">
      <FormItem>
        <FormLabel>Price</FormLabel>
        <FormControl>
          <Input type="number" placeholder="Enter the price" v-bind="componentField" v-model="price" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="description">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea placeholder="Enter the description" v-bind="componentField" v-model="description"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="is_public">
      <FormItem>
        <FormLabel>Is Public</FormLabel>
        <FormControl>
          <Button type="submit" class="ml-4" v-model="isPublic">確認是否已刊登?</Button>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="property_attributes">
      <FormItem>
        <FormLabel>Property Attributes(這邊應該是能否租屋補貼/限男女....)</FormLabel>
        <FormControl>
          <Select v-bind="componentField" v-model="propertyAttributes">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel class="text-red-500">房型</SelectLabel>
                <SelectItem value="透天">
                  透天
                </SelectItem>
                <SelectItem value="公寓">
                  公寓
                </SelectItem>
                <SelectItem value="大樓">
                  大樓
                </SelectItem>
                <SelectItem value="其他房型">
                  其他房型
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
    property_attributes: z.enum(['透天', '公寓', '大樓', '其他房型']),
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
const propertyAttributes = defineModel('property_attributes', { type: String, default: 'house' });

</script>

<style scoped>
/* Add any additional styling here */
</style>