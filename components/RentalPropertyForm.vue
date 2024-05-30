<template>
    <form @submit="onSubmit" class="space-y-6 border-2 border-black p-4 w-1/2">
      <FormField v-slot="{ componentField }" name="price">
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Enter the price" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
  
      <FormField v-slot="{ componentField }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea placeholder="Enter the description" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
  
      <FormField v-slot="{ componentField }" name="is_public">
        <FormItem>
          <FormLabel>Is Public</FormLabel>
          <FormControl>
            <Button type="submit" class="ml-4">確認是否已刊登?</Button>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
  
      <FormField v-slot="{ componentField }" name="property_attributes">
        <FormItem>
          <FormLabel>Property Attributes(這邊應該是能否租屋補貼/限男女....)</FormLabel>
          <FormControl>
            <Select v-bind="componentField">
              <option value="house">透天</option>
              <option value="apartment">公寓</option>
              <option value="building">大樓</option>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
  
      <Button type="submit">Submit</Button>
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
      property_attributes: z.enum(['house', 'apartment', 'condo', 'land']),
    })
  );
  
  const form = useForm({
    validationSchema: formSchema,
  });
  
  const onSubmit = form.handleSubmit(values => {
    console.log('Form submitted!', values);
  });
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>