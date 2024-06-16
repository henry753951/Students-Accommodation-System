<template>
  <div class="head">
    修改個人資料
  </div>
  <div class="container w-1/4 shadow-lg rounded-lg mt-6 bg-white">
    <form @submit.prevent="updateUser" >
      <FormField v-slot="{ componentField }" name="full_name" >
        <FormItem class="relative pt-5">
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input v-bind="componentField" class="w-full" placeholder="Enter your full name" type="text"
              autocomplete="off" @change="isChanged.full_name = true" />
          </FormControl>
          <FormMessage class="absolute top-0 right-1" />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="phone">
        <FormItem class="relative mt-5">
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input v-bind="componentField" class="w-full" placeholder="Enter your phone number" type="text"
              autocomplete="off" @change="isChanged.phone = true" />
          </FormControl>
          <FormMessage class="absolute top-0 right-1" />
        </FormItem>
      </FormField>
      <div class="mt-6">
        <Button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg mb-6" @click="updateUser()">
          Save Changes
        </Button>
      </div>
    </form>
  </div>
</template>


<script lang="ts" setup>
import { useToast } from "@/components/ui/toast/use-toast";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as yup from "yup";
import { toTypedSchema } from "@vee-validate/yup";

definePageMeta({
  layout: "account-default",
});
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const checks = ["name", "phone"];

for (const check of checks) {
  if (!user.value || !user.value.user_metadata[check]) {
    setPageLayout("account-no-nav");
    break;
  }
}
const toast = useToast();

const isChanged = ref({
  full_name: false,
  phone: false,
});

const form = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      full_name: yup.string().required("Full name is required").default(user.value?.user_metadata.full_name),
      phone: yup.string().required("Phone is required").default(user.value?.user_metadata.phone),
    }),
  ),
});

const updateUser = form.handleSubmit(async (values) => {
  const payload = {
    full_name: isChanged.value.full_name ? values.full_name : undefined,
    phone: isChanged.value.phone ? values.phone : undefined,
  };
  console.log(user.value?.id);
  const { data, error } = await supabase.auth.updateUser({ data: payload });
  if(payload.phone?.length !== 10){
    toast.toast({
      title: "Error",
      description: "Phone number 需要10位數字",
      variant: "destructive",
    })
    return;}
  if (user.value) {
    const { data: __user, error: usererror } = await supabase
      .from('app_user')
      .update({
        name: payload.full_name,
        phone: payload.phone,
      } as never) // Cast the object to 'never' type to resolve the error
      .eq("id", user.value.id);
  }

  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  } else {
    toast.toast({
      title: "Success",
      description: "User updated",
    });
  }
});
</script>

<style>
.head{
  font-size: 40px;
  font-weight: 600;
  text-align: center;
}
</style>
