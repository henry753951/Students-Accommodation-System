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
        <FormLabel>地址</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            v-model="address"
            type="text"
            placeholder="請輸入地址"
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
    address: z.string().min(5,"地址長度至少5個字").max(100,"地址長度最多100個字")
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

<script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=fd0331e753ea23f614360b12d394a6b01ef82ce6'></script>

<style scoped>
/* Add any additional styling here */
</script> <iframe width="520" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=%7BStreet%7D%20%7Bthis_city%7D+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://www.versicherungen.at/unfallversicherung-rechner/'>private Unfallversicherung</a>