<template>
  <div>
    <div class="flex items-center justify-center h-[100vh]">
      <div class="flex flex-col items-center space-y-4">
        <div>登出中...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from "@/components/ui/toast/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { set } from "@vueuse/core";

const { toast } = useToast();
const supabase = useSupabaseClient();

// onMounted
onMounted(async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    setTimeout(() => {
      navigateTo("/");
    }, 1000);
  } else {
    console.error(error);
    toast({
      title: "Uh oh! 登出時發生問題",
      description: error?.message,
      variant: "destructive",
      action: h(
        ToastAction,
        {
          altText: "再試一次",
          onClick() {
            window.location.reload();
          },
        },
        {
          default: () => "再試一次",
        },
      ),
    });
    setTimeout(() => {
      navigateTo("/");
    }, 3000);
  }
});
</script>

<style></style>
