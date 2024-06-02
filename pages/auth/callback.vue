<template>
  <div
    v-if="display"
    class="flex flex-col items-center justify-center w-full"
  >
    <p class="text-center text-xl mb-5">
      請問你是?
    </p>
    <div class="flex gap-6 mb-8 w-full p-5 max-w-[800px] flex-wrap">
      <template
        v-for="role in roles"
        :key="role.name"
      >
        <Card
          v-if="(role.selected && ['學生', '教師'].includes(role.name)) || !['學生', '教師'].includes(role.name)"
          class="w-full"
          :class="{ 'opacity-70': role.selected, 'shadow-lg': !role.selected, 'cursor-not-allowed': ['學生', '教師'].includes(role.name), 'opacity-20': ['學生', '教師'].includes(role.name) }"
          @click="toggleSelection(role)"
        >
          <CardHeader>
            <CardTitle>{{ role.name }}</CardTitle>
          </CardHeader>
          <CardContent>
            <Checkbox v-model:checked="role.selected" />
          </CardContent>
        </Card>
      </template>
    </div>
    <div class="flex gap-5">
      <Button @click="nextStep">
        {{ hasRole ? "下一步" : "我誰也不是" }}
      </Button>
      <Button @click="navigateTo('/auth/logout')">
        登出
      </Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
definePageMeta({
  layout: "account-no-nav",
});
const display = ref(false);
const user = useSupabaseUser();
const supabase = useSupabaseClient<Database>();
type Role = { selected: boolean; name: string };

const roles = ref<Role[]>([
  { name: "學生", selected: false },
  { name: "教師", selected: false },
  { name: "房東", selected: false },
]);

const { data: app_user, pending: isLoading, refresh: refresh } = await useAsyncData('app_user', async () => {
  if (!user.value) return null;
  const { data } = await supabase.from('app_user').select('*, student(*), teacher(*), landlord(*)').eq('id', user.value.id).single();
  if (!data) return null;
  if (data.student) {
      for (const [index, role] of roles.value.entries()) {
        if (role.name === '學生')
          roles.value[index].selected = true;
      }
    }
    if (data.teacher) {
      for (const [index, role] of roles.value.entries()) {
        if (role.name === '教師')
          roles.value[index].selected = true;
      }
    }
    if (data.landlord) {
      for (const [index, role] of roles.value.entries()) {
        if (role.name === '房東')
          roles.value[index].selected = true;
      }
    }
  return data;
});


const toggleSelection = (role: Role) => {
  if (['學生', '教師'].includes(role.name)) return;
  role.selected = !role.selected;
};

const nextStep = async () => {
  if (!user.value) return;
  const selectedRoles = roles.value.filter((role) => role.selected);
  console.log("Selected Roles:", selectedRoles);
  const { error } = await useAPI("/api/auth/user_init", { default: () => { }, method: "POST", body: { roles: selectedRoles } });
  if (error.value) {
    console.log("Error:", error);
    return;
  }
  await supabase.from('app_user').update({ first_time: false }).eq('id', user.value.id);
  navigateTo("/");

};

const hasRole = computed(() => {
  return roles.value.some((role) => role.selected);
});

onMounted(() => {
  if (app_user.value) {
    if (!app_user.value.first_time) navigateTo("/");
    else display.value = true;

  }

});
</script>
<style></style>
