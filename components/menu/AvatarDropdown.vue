<template>
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger class="h-[40px]">
      <Avatar class="bg-slate-200">
        <AvatarImage
          :src="user?.user_metadata.avatar_url"
          alt="@radix-vue"
        />
        <AvatarFallback>{{ miniName }}</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>
        <Icon
          name="tabler:user"
          class="mr-1"
        />
        <span>{{ user?.user_metadata.full_name }}</span>
      </DropdownMenuLabel>
      <DropdownMenuItem @click="navigateTo('/account/profile')">
        <Icon
          name="tabler:settings"
          class="mr-1"
        />
        <span>個人資料編輯</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="navigateTo('/auth/role_select')">
        <Icon
          name="tabler:settings"
          class="mr-1"
        />
        <span>身分組編輯</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="navigateTo('/auth/logout')">
        <Icon
          name="tabler:logout"
          class="mr-1"
        />
        <span>登出</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <div v-else>
    <Button
      class="bg-foreground"
      @click="navigateTo('/auth/login')"
    >
      登入
    </Button>
  </div>
</template>

<script lang="ts" setup>
const user = useSupabaseUser();

// [computed]
const miniName = computed(() => {
  if (!user.value) {
    return "訪客";
  } else if (user.value.user_metadata.full_name) {
    return user.value.user_metadata.full_name
      .split(" ")
      .map((n: string) => n[0])
      .join("");
  }
  return "";
});
</script>

<style></style>
