<template>
  <form @submit="onSubmit" class="space-y-6 border-2 border-black p-4 w-1/2">
    <FormField v-slot="{ componentField }" name="address">
      <FormItem>
        <FormLabel>Address</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter your address" v-bind="componentField" v-model="address"/>
          {{address}}
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="landlordName">
      <FormItem>
        <FormLabel>LandlordID</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Enter LandlordID" v-bind="componentField" v-model="landlordName"/>
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
    address: z.string().min(5, 'Address must be at least 5 characters long'),
    landlordName: z.string().min(2, 'Landlord name must be at least 2 characters long'),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(values => {
  console.log('Form submitted!', values);
});


const address = defineModel('address', { type: String, default: '' });
const landlordName = defineModel('landlordName', { type: String, default: '' });

</script>

<style scoped>
/* Add any additional styling here */
</style>