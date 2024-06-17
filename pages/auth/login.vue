<template>
  <div class="flex justify-center min-h-[100dvh] min-h-screen bg-gray-100 dark:bg-gray-900">
    <div
      class="flex max-w-4xl w-full mx-auto my-auto bg-white dark:bg-black md:rounded-2xl shadow-lg md:min-h-fit min-h-[100dvh]"
    >
      <div class="p-12 w-full md:w-1/2">
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
        <AuthLoginPanel
          v-if="['login_root', 'loginWithPassword'].includes(page)"
          v-model:page="page"
        />
        <AuthSignUpPanel
          v-if="['signUp'].includes(page)"
          v-model:page="page"
        />
        <AuthForgetPasswordPanel
          v-if="['forget-password'].includes(page)"
          v-model:page="page"
        />
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
definePageMeta({
  layout: "nothing",
});
// [Refs]
const page = ref("login_root");

const back = async () => {
  const router = useRouter();
  if (page.value !== "login_root") {
    const viewTransition = startViewTransition();
    await viewTransition.captured;
    page.value = "login_root";
  } else {
    if (router.getRoutes().length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }
};

// [onMounted]
onMounted(() => { });

</script>
<style></style>
