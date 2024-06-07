<template>
  <form
    class="space-y-6 border-2 shadow-lg  p-4 w-1/2"
    @submit="onSubmit"
  >
    <FormField  
      v-slot="{ componentField }"
      name="address"
    >
      <FormItem>
        <FormLabel>Address</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            v-model="address"
            type="text"
            placeholder="Enter your address"
          />
          {{ address }}
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ componentField }"
      name="landlordName"
    >
      <FormItem>
        <FormLabel>LandlordID</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            v-model="landlordName"
            type="text"
            placeholder="Enter LandlordID"
          />
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