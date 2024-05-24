<template>
  <div class="flex justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div class="flex max-w-4xl w-full mx-auto my-auto bg-white dark:bg-black md:rounded-2xl shadow-lg md:min-h-fit min-h-screen">
      <div class="p-12 w-full md:w-1/2 mb-[70px]">
        <Button
          variant="ghost"
          class="p-1 h-fit"
          @click="back"
        >
          <Icon
            size="15px"
            name="tabler:arrow-left"
          />
        </Button>
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
          v-if="!isEmailLogin"
          v-trans="{
            isEmailLogin: !isEmailLogin,
          }"
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
          <div class="space-y-4">
            <Input
              v-model="email"
              class="w-full"
              placeholder="Email"
              type="email"
            />
            <Button
              class="w-full dark:bg-gray-800 dark:text-white"
              @click="AuthMethods.loginWithEmail"
            >
              使用 Email 登入
            </Button>
            <p class="text-right text-gray-500">
              還沒有帳號？
              <NuxtLink
                href="/auth/register"
                class="text-blue-500"
              >
                點我註冊
              </NuxtLink>
            </p>
          </div>
        </div>
        <div
          v-else
          v-trans="{
            isEmailLogin: isEmailLogin,
          }"
          class="space-y-4"
        >
          <p>
            {{ email }}
          </p>
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
            忘記密碼？
            <NuxtLink
              href="/auth/forgot-password"
              class="text-blue-500"
            >
              點我重設
            </NuxtLink>
          </p>
        </div>
      </div>
      <div class="hidden md:block md:w-1/2 rounded-r-2xl bg-current overflow-hidden">
        <NuxtImg
          alt="illustration"
          class="object-cover h-full w-full rounded-r-2xl"
          :style="{ objectFit: 'cover' }"
          src="House.png"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { startViewTransition } from "vue-view-transitions";
const supabase = useSupabaseClient();

// [Refs]
const isEmailLogin = ref(false);

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
      isEmailLogin.value = true;
    }
  },

  async loginWithPassword() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
  },
  async loginWithOTP() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });
  },
};

const back = async () => {
  const router = useRouter();
  if (isEmailLogin.value) {
    const viewTransition = startViewTransition();
    await viewTransition.captured;
    isEmailLogin.value = false;
  } else {
    router.back();
  }
};

// [onMounted]
onMounted(() => {});
</script>

<style></style>
