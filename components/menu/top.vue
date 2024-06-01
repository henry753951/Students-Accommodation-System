<template>
  <div>
    <div class="bg-secondary rounded-2xl shadow-[0_0px_8px_0px_rgba(0,0,0,0.1)]">
      <div class="flex p-4">
        <div class="flex mr-auto items-center">
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
        <div class="flex items-center">
          <MenuAvatarDropdown />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const user = useSupabaseUser();

// [Methods]
const back = () => {
  const router = useRouter();
  if(router.getRoutes().length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};
</script>
<style></style>
