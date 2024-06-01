<template>
  <div class="bg-slate-200 h-16 flex items-center  ">
    <div class="flex items-center justify-between w-full px-4">
      <div class="flex items-center space-x-4">
        <NuxtLink to="/">
          <img src="~/assets/images/House.png" alt="Logo" class="h-8" />
        </NuxtLink>
        <h1 class="text-2xl font-bold text-white">Student Rental</h1>
      </div>
      <div class="flex items-center space-x-4">
        <NuxtLink to="/auth/login" class="text-white">
          Login
        </NuxtLink>
        <NuxtLink to="/auth/logout" class="text-white">
          Logout
        </NuxtLink>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <img src="~/assets/images/images.png" alt="User" class="rounded-full h-8 w-8" />
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User class="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard class="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings class="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard class="mr-2 h-4 w-4" />
                <span>Keyboard shortcuts</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users class="mr-2 h-4 w-4" />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus class="mr-2 h-4 w-4" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail class="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare class="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle class="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus class="mr-2 h-4 w-4" />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Github class="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy class="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <Cloud class="mr-2 h-4 w-4" />
              <span>API</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut class="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </div>
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
import type { DropdownMenuCheckboxItemProps } from 'radix-vue'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type Checked = DropdownMenuCheckboxItemProps['checked']

const showStatusBar = ref<Checked>(true)
const showActivityBar = ref<Checked>(false)
const showPanel = ref<Checked>(false)

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