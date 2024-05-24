<template>
  <div>
    <div class="bg-secondary rounded-2xl">
      <div class="flex p-4">
        <div class="flex mr-auto items-center">
          <Button variant="ghost">
            <Icon
              size="20px"
              name="tabler:arrow-left"
            />
          </Button>
          <div class="font-mono text-xl">
            Dashboard
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
</script>

<style></style>
