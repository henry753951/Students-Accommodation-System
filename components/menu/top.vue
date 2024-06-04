<template>
  <div>
    <div class=" rounded-2xl shadow-[0_0px_8px_0px_rgba(0,0,0,0.1)] bg-background">
      <div class="flex p-4 items-center gap-5">
        <div class="font-mono text-xl">
          <NuxtLink
            to="/"
            class="font-mono text-2xl"
          >
            校外租屋平台
          </NuxtLink>
        </div>
        <MenuLinkNav class="mr-auto" />
        <div class="flex items-center">
          <MenuAvatarDropdown />
        </div>
      </div>
      <div class="flex items-center">
        <Button
          variant="ghost"
          @click="back"
        >
          <Icon
            size="20px"
            name="tabler:arrow-left"
          />
        </Button>
        <div class="font-mono text-xl">
          {{ $route.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const user = useSupabaseUser();

const router = useRouter();
// [Methods]
const back = () => {
  if (router.getRoutes().length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};
</script>
<style></style>
