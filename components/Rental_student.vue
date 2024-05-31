<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuLink>Link</NavigationMenuLink>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
  <div>

    <form @submit.prevent="onSubmit" class="space-y-6 border-2 border-black p-4 w-1/2">
      <div class="flex flex-row">
        <div class="mr-10 w-1/2">
          <FormField v-slot="{ componentField }" name="StudentName">
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
                <Input type="text" disabled placeholder="莊印哲" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class=" w-1/2">
          <FormField v-slot="{ componentField }" name="StudentID">
            <FormItem>
              <FormLabel>Student ID</FormLabel>
              <FormControl>
                <Input type="text" disabled placeholder="A1105513" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>


      </div>

      <div class="flex flex-row">
        <div class="mr-10 w-1/2">
          <FormField v-slot="{ componentField }" name="LandlordName">
            <FormItem>
              <FormLabel>Landlord Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter name" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class=" w-1/2">
          <FormField v-slot="{ componentField }" name="LandlordPhone">
            <FormItem>
              <FormLabel>LandlordPhone</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter Phone" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>


      </div>

      <FormField v-slot="{ componentField }" name="rent">
        <FormItem>
          <FormLabel>租屋類型</FormLabel>
          <Select>
            <SelectTrigger class="w-[150px]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem v-for="message in House_type" :value="message.value">
                  {{ message.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      </FormField>

      <FormField v-for="(message, index) in Form_information" :key="index" v-slot="{ componentField }"
        :name="message.formlabel">
        <FormItem>
          <FormLabel>{{ message.formlabel }}</FormLabel>
          <FormControl>
            <Input type="text" :placeholder="message.placeholder" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>


      <!-- Submit Button -->
      <Button class="hover:bg-black  hover:text-white" type="submit" variant="outline" @click="() => {
        if (request_check) {
          toast({
            title: 'Request Sent',
            description: 'Your request has been sent successfully!',
          });
        } else {
          toast({
            title: 'Request Failed',
            description: 'Please fill in all the required fields and try again.',
          });
        }
      }">Submit</Button>
    </form>
  </div>

</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { ref } from 'vue';
import * as z from 'zod';
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast();

const username = ref('user name from supabase before login');

const House_type = [
  { value: '整層住家', label: '整層住家' },
  { value: '獨立套房', label: '獨立套房' },
  { value: '分租套房', label: '分租套房' },
  { value: '雅房', label: '雅房' },
  { value: '大樓', label: '大樓' },]

const Form_information = ref([
  { formlabel: "Address", placeholder: "Enter address" },
  { formlabel: "Price", placeholder: "Enter Price" },
  { formlabel: "Description", placeholder: "Other description" },
]);

const formSchema = toTypedSchema(
  z.object({
    address: z.string().min(5, 'Address must be at least 5 characters long'),
    landlordName: z.string().min(2, 'Landlord name must be at least 2 characters long'),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const request_check = ref(false);
const onSubmit = form.handleSubmit(values => {
  // console.log('Form submitted!', values);
});
</script>

<style scoped>
/* Add any additional styling here */
</style>