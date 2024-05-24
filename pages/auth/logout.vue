<template>
  <div />
</template>

<script lang="ts" setup>
import { useToast } from "@/components/ui/toast/use-toast";
import { ToastAction } from "@/components/ui/toast";

const { toast } = useToast();
const supabase = useSupabaseClient();

// onMounted
onMounted(async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    window.location.href = "/";
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
  }
});
</script>

<style></style>
