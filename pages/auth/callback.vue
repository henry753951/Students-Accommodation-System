<template>
  <div class="flex flex-col items-center justify-center">
    <p class="text-center text-xl mb-5">
      請問你是?
    </p>
    <div class="flex gap-6 mb-8 w-full p-5 max-w-[800px] flex-wrap">
      <Card
        v-for="role in roles"
        :key="role.name"
        class="w-full"
        :class="{ 'opacity-50': role.selected, 'shadow-lg': !role.selected }"
        @click="toggleSelection(role)"
      >
        <CardHeader>
          <CardTitle>{{ role.name }}</CardTitle>
        </CardHeader>
        <CardContent>
          <Checkbox v-model:checked="role.selected" />
        </CardContent>
      </Card>
    </div>
    <div class="flex">
      <Button @click="nextStep">
        下一步
      </Button>
      <Button @click="navigateTo('auth/logout')">
        Logout
      </Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
definePageMeta({ layout: "account-no-nav" });
const user = useSupabaseUser();
type Role = { selected: boolean; name: string };

const roles = ref<Role[]>([
  { name: "學生", selected: false },
  { name: "房東", selected: false },
  { name: "教師", selected: false },
  { name: "一般使用者", selected: false },
]);
const toggleSelection = (role: Role) => {
  role.selected = !role.selected;
};

const nextStep = async () => {
  const selectedRoles = roles.value.filter((role) => role.selected);
  console.log("Selected Roles:", selectedRoles);
  const data = await useAPI("/api/auth/user_init", { default: () => { }, method: "POST", body: { roles: selectedRoles } });
  console.log("Data:", data);
};
onMounted(() => {
  if (!user.value) {
    throw createError({ statusCode: 404, statusMessage: "Page Not Found", fatal: true });
  }
});
</script>
<style></style>
