<template>
  <div>
    <h1 class="text-2xl font-bold mb-2">
      校外租屋平台
    </h1>
    <h2 class="text-4xl font-bold mb-4">
      Welcome Back
    </h2>
    <p class="text-gray-500 mb-8">
      歡迎回來，請登入您的帳號以繼續使用我們的服務。
    </p>
  </div>
  <div
    v-if="page == 'login_root'"
    class="space-y-4"
  >
    <Button
      class="w-full flex"
      variant="outline"
      @click="AuthMethods.loginWithGoogle"
    >
      <Icon name="devicon:google" />
      <span class="w-full">透過 Google 登入</span>
    </Button>
    <Button
      class="w-full flex"
      variant="outline"
      disabled
    >
      <Icon name="logos:facebook" />
      <span class="w-full">透過 Facebook 登入</span>
    </Button>
    <Divider
      class="my-4"
      text="或者"
    />
    <div
      v-trans="{
        page: page === 'login_root',
      }"
      class="space-y-4"
    >
      <Input
        v-model="email"
        class="w-full"
        placeholder="Email"
        name="email"
        type="email"
        autocomplete
      />
      <input
        v-model="password"
        class="hidden"
        name="password"
        placeholder="Password"
        type="password"
      >
      <Button
        class="w-full"
        variant="secondary"
        @click="AuthMethods.loginWithEmail"
      >
        使用 Email 登入
      </Button>
      <p class="text-right text-gray-500">
        還沒有帳號？ <a
          class="text-blue-500 cursor-pointer"
          @click="pageChange('signUp')"
        >
          點我註冊 </a>
      </p>
    </div>
  </div>
  <div
    v-else-if="page == 'loginWithPassword'"
    v-trans="{
      page: page == 'loginWithPassword',
    }"
    class="space-y-4"
  >
    <p>
      {{ email }}
    </p>
    <input
      v-model="email"
      class="hidden"
      placeholder="Email"
      type="email"
    >
    <Input
      v-model="password"
      class="w-full"
      placeholder="Password"
      type="password"
    />
    <Button
      class="w-full"
      @click="AuthMethods.loginWithPassword"
    >
      登入
    </Button>
    <p class="text-right text-gray-500">
      忘記密碼？ <a
        class="text-blue-500 cursor-pointer"
        @click="pageChange('forget-password')"
      > 點我重設 </a>
    </p>
  </div>
</template>
<script lang="ts" setup>
import { startViewTransition } from "vue-view-transitions";
import { useToast } from "../ui/toast/use-toast";
const supabase = useSupabaseClient();
const { toast } = useToast();

// [v-models]
const page = defineModel<string>("page");

// Input
const email = ref("");
const password = ref("");

// [Methods]
const AuthMethods = {
  async loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.protocol + "//" + window.location.host + "/auth/callback",
      },
    });
  },
  async loginWithEmail() {
    const re = /\S+@\S+\.\S+/;
    if (re.test(email.value)) {
      const viewTransition = startViewTransition();
      await viewTransition.captured;
      page.value = "loginWithPassword";
    }
  },

  async loginWithPassword() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    const Message = {
      "Email not confirmed": "請先確認您的電子郵件",
      "Invalid login credentials": "登入失敗，請檢查您的電子郵件和密碼或是登入方式",
    } as { [key: string]: string };
    if (error) {
      toast({
        title: "登入失敗",
        description: Message[error.message] || error.message,
        variant: "destructive",
      });
    }
    if (data.user) {
      navigateTo("/");
    }
  },
  async loginWithOTP() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });
  },
};

const pageChange = (newPage: string) => {
  const viewTransition = startViewTransition();
  viewTransition.captured.then(() => {
    page.value = newPage;
  });
};
</script>
<style></style>
