<template>
  <div>
    <h1 class="text-2xl font-bold mb-2">
      校外租屋平台
    </h1>
    <h2 class="text-4xl font-bold mb-4">
      忘記密碼
    </h2>
    <p class="text-gray-500 mb-8">
      請輸入您的 Email 以重設密碼。
    </p>
  </div>
  <div class="space-y-4">
    <div
      v-show="!resetSent"
      v-trans="{
        isEmailLogin: page == 'forget-password',
      }"
      class="space-y-4"
    >
      <form @submit="resetPassword">
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
                placeholder="Email"
                type="email"
              />
            </FormControl>
            <FormMessage class="absolute top-0 right-1" />
          </FormItem>
        </FormField>

        <Button
          class="w-full my-4"
          type="submit"
          :disabled="form.isSubmitting.value"
        >
          重設密碼
        </Button>
      </form>
    </div>
    <div
      v-show="resetSent"
      class="space-y-4"
    >
      <p>重設密碼信件已寄出，請查看您的信箱。</p>
      <Button
        class="w-full"
        @click="goToMail"
      >
        前往信箱
      </Button>
      <Button
        class="w-full"
        variant="secondary"
        @click="resetSent = false"
      >
        重新發送
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { startViewTransition } from "vue-view-transitions";
import { useToast } from "../ui/toast/use-toast";
import * as yup from "yup";
const supabase = useSupabaseClient();
const { toast } = useToast();

// [v-models]
const page = defineModel<string>("page");

// [Refs]
const resetSent = ref(false);

// Form
const formSchema = yup.object().shape({
  email: yup.string().email("請輸入有效的 Email").required("請輸入 Email"),
});
const form = useForm({
  validationSchema: formSchema,
});

// [Methods]
const resetPassword = form.handleSubmit(async (values) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(values.email, {
    redirectTo: window.location.protocol + "//" + window.location.host + "/auth/changePassword",
  });
  if (error) {
    console.error(error);
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
  } else {
    resetSent.value = true;
    console.log(data);
  }
});
const goToMail = () => {
  window.open(GetMailUrl.value, "_blank");
};

// [Computed]
const GetMailUrl = computed(() => {
  const email = form.values.email as string;
  const emailDomain = email.split("@")[1];
  const mailUrl = `https://${emailDomain}`;
  return mailUrl;
});
</script>

<style></style>
