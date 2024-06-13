<script setup lang="ts">
import { useRoute } from 'vue-router';

definePageMeta({
  name: "未授權的頁面",
});
useHead({
  title: "校外租屋平台 | 未授權",
});

// get url get params : to 
const route = useRoute();
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const app_user = useUser();

const to = computed(() => {
  return route.query.to as string;
});
const switchAccount = () => {
  supabase.auth.signOut({
    scope: "local"
  }).then(() => {
    navigateTo("/auth/login");
  });

};
</script>
<template>
  <div class="flex flex-col justify-center items-center space-y-4 ">
    <div class="p-6 rounded-lg shadow-lg text-center flex flex-col gap-3 dark:bg-zinc-900 max-w-[500px] w-full">
      <h1 class="text-2xl font-bold text-red-600">
        未授權的頁面
      </h1>
      <div class=" bg-gray-200 px-2 py-1 rounded inline-block dark:bg-zinc-800">
        {{ to }}
      </div>
      <p
        v-if="user"
        class="mb-2"
      >
        您無權訪問此頁面。請聯繫管理員以獲取更多信息。
      </p>
      <p
        v-else
        class="mb-2"
      >
        請登入以訪問此頁面。
      </p>
      <template v-if="user">
        <div class="mb-4 text-left shadow-md p-3 rounded-lg dark:bg-zinc-800 flex items-center gap-4">
          <Avatar class="bg-slate-200">
            <AvatarImage
              :src="user?.user_metadata.avatar_url"
              alt="@radix-vue"
            />
          </Avatar>
          <div>
            <p>當前用戶：<span class="font-semibold">{{ app_user?.email }}</span></p>
            <p>
              身份組： <Badge
                v-for="role in app_user?.roles"
                :key="role"
                class="font-semibold mr-1"
              >
                {{ role }}
              </Badge>
            </p>
          </div>
        </div>
        <Button @click="switchAccount">
          切換帳號
        </Button>
      </template>
      <template v-else>
        <Button
          @click="navigateTo('/auth/login')"
        >
          登入
        </Button>
      </template>
      <Button
        variant="ghost"
        @click="navigateTo(to)"
      >
        重試
      </Button>
    </div>
  </div>
</template>
<style scoped></style>