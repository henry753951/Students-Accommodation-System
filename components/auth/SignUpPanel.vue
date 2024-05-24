<template>
  <div>
    <h1 class="text-2xl font-bold mb-2">
      校外租屋平台
    </h1>
    <h2 class="text-4xl font-bold mb-4">
      Welcome
    </h2>
    <p class="text-gray-500 mb-8">
      請註冊您的帳號以繼續使用我們的服務。
    </p>
  </div>
  <div
    v-trans="{
      page: page === 'register',
    }"
  >
    <form @submit="register">
      <FormField
        v-slot="{ componentField }"
        name="email"
      >
        <FormItem class="relative">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              class="w-full"
              placeholder=""
              type="email"
            />
          </FormControl>
          <FormMessage class="absolute top-0 right-1" />
        </FormItem>
      </FormField>
      <div class="my-5">
        <FormField
          v-slot="{ componentField }"
          name="password"
        >
          <FormItem class="relative">
            <FormLabel>密碼</FormLabel>
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
            <FormLabel>確認密碼</FormLabel>
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
      </div>
      <Button
        class="w-full mb-6"
        type="submit"
      >
        註冊
      </Button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { startViewTransition } from "vue-view-transitions";
import { useToast } from "../ui/toast/use-toast";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as yup from "yup";
const supabase = useSupabaseClient();
const { toast } = useToast();

// [v-models]
const page = defineModel<string>("page");

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
  email: yup.string().email("請填入有效的 Email").required("必填"),
});
const form = useForm({
  validationSchema: formSchema,
});
// [Methods]
const register = form.handleSubmit(async (values) => {
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });

  if (error) {
    toast({
      title: "註冊失敗",
      description: error.message,
      variant: "destructive",
    });
  } else {
    toast({
      title: "註冊成功",
      description: "請至您的信箱收取驗證信",
    });
    page.value = "login_root";
  }
});
</script>

<style></style>
