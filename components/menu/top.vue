<template>
  <div>
    <div class="p-4 flex flex-col gap-2 rounded-2xl shadow-[0_0px_8px_0px_rgba(0,0,0,0.1)] bg-background">
      <div class="flex items-center gap-5">
        <div class="flex flex-wrap mr-auto">
          <div class="font-mono text-xl">
            <NuxtLink
              to="/"
              class="font-mono text-2xl mx-2"
            >
              校外租屋平台
            </NuxtLink>
          </div>
          <MenuLinkNav class="sm:block hidden" />
        </div>
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
        <ReservationDrawer />
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
  const modes = ["light", "dark", "system"];
  colorMode.value = modes[(modes.indexOf(colorMode.value) + 1) % modes.length];
  if (colorMode.value === "system")
    colorMode.forced = false;
  else
    colorMode.forced = true;
};
const isDarkMode = computed(() => colorMode.value === "dark");

</script>
<style></style>
