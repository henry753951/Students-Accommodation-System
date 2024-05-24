<template>
  <div class="flex justify-center min-h-[100dvh] bg-gray-100 dark:bg-gray-900">
    <div class="flex max-w-4xl w-full mx-auto my-auto bg-white dark:bg-black md:rounded-2xl shadow-lg md:min-h-fit min-h-[100dvh]">
      <div class="p-12 w-full">
        <h1 class="text-2xl font-bold mb-2">
          校外租屋平台
        </h1>
        <h2 class="text-4xl font-bold mb-4">
          重置密碼
        </h2>
        <div class="space-y-4">
          <div
            v-if="user !== null"
            class="space-y-4"
          />
          <form @submit="changePassword">
            <FormField
              v-slot="{ componentField }"
              name="password"
            >
              <FormItem class="relative">
                <FormLabel>新密碼</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    class="w-full"
                    placeholder=""
                    type="password"
                  />
                </FormControl>
                <FormMessage class="absolute top-0 right-1" />
              </FormItem>
            </FormField>
            <FormField
              v-slot="{ componentField }"
              name="confirmPassword"
            >
              <FormItem class="relative">
                <FormLabel>確認新密碼</FormLabel>
                <FormControl>
                  <Input
                    v-bind="componentField"
                    class="w-full"
                    placeholder=""
                    type="password"
                  />
                </FormControl>
                <FormMessage class="absolute top-0 right-1" />
              </FormItem>
            </FormField>
            <Button
              class="w-full dark:bg-gray-800 dark:text-white mt-4"
              :disabled="form.isSubmitting.value"
              type="submit"
            >
              重設密碼
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as yup from "yup";
import { useToast } from "~/components/ui/toast/use-toast";

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const { toast } = useToast();
// [Refs]

// Form
const formSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "密碼長度至少為8位")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/, "密碼必須包含大小寫字母和數字")
    .required("必填"),
  confirmPassword: yup
    .string()
    .required("必填")
    .oneOf([yup.ref("password")], "密碼不一致"),
});

const form = useForm({
  validationSchema: formSchema,
});
// [Methods]
const changePassword = form.handleSubmit(async (values) => {
  const { error } = await supabase.auth.updateUser({
    password: values.password,
  });
  if (error) {
    toast({
      title: "密碼更新失敗",
      description: error.message,
      variant: "destructive",
    });
  } else {
    toast({
      title: "密碼已更新",
    });
    navigateTo("/");
  }
});

// [onMounted]
onMounted(() => {});
</script>

<style></style>
