<template>
  <div>
    <div class="p-4 flex flex-col gap-2 rounded-2xl shadow-[0_0px_8px_0px_rgba(0,0,0,0.1)] bg-background">
      <div class="flex items-center gap-5">
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
          <Button
            variant="ghost"
            size="sm"
            class="mr-2"
            @click="toggleDarkMode"
          >
            <Icon
              v-if="isDarkMode"
              size="10px"
              name="tabler:moon"
            />
            <Icon
              v-else
              size="10px"
              name="tabler:sun"
            />
          </Button>
          <MenuAvatarDropdown />
        </div>
      </div>
      <div class="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          class="mr-2"
          @click="back"
        >
          <Icon
            size="10px"
            name="tabler:arrow-left"
          />
        </Button>
        <div class="font-mono">
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
const colorMode = useColorMode();

const toggleDarkMode = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";

};
const isDarkMode = computed(() => colorMode.value === "dark");

</script>
<style></style>
