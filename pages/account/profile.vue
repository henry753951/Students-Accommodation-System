<template>
  <div>
    <form @submit="updateUser">
      <FormField
        v-slot="{ componentField }"
        name="full_name"
      >
        <FormItem class="relative">
          <FormLabel>Full Name</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              class="w-full"
              placeholder=""
              type="text"
              autocomplete="off"
              @change="isChanged.full_name = true"
            />
          </FormControl>
          <FormMessage class="absolute top-0 right-1" />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="phone"
      >
        <FormItem class="relative">
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              class="w-full"
              placeholder=""
              type="text"
              autocomplete="off"
              @change="isChanged.phone = true"
            />
          </FormControl>
          <FormMessage class="absolute top-0 right-1" />
        </FormItem>
      </FormField>
      <Button
        class="w-full mt-6"
        type="submit"
      >
        Update
      </Button>
    </form>
    {{ isChanged }}
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
  console.log(payload);

  const { data, error } = await supabase.auth.updateUser({ data: payload });
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

<style></style>
