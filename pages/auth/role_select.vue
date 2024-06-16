<template>
  <div class="flex flex-col items-center justify-center w-full">
    <p class="text-center text-xl mb-5">
      請問你是?
    </p>
    <div class="flex gap-6 mb-8 w-full p-5 max-w-[800px] flex-wrap">
      <template
        v-for="role in roles"
        :key="role"
      >
        <Card
          class="w-full"
          :class="{ 'opacity-70': role.selected, 'shadow-lg': !role.selected, 'cursor-not-allowed': ['student', 'admin', 'teacher'].includes(role.name), 'opacity-20': ['student', 'admin', 'teacher'].includes(role.name) }"
          @click="updateLandlordRole(role.name, !role.selected)"
        >
          <CardHeader>
            <CardTitle>{{ translate[role.name] }}</CardTitle>
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
const userStore = useUserStore();
definePageMeta({
  layout: "account-no-nav",
});
const supabase = useSupabaseClient<Database>();
const user = await useAsyncUser();

const roles = computed(() => {
  return [
    "student",
    "teacher",
    "admin",
    "landlord",
  ].map((role) => ({
    name: role as "student" | "teacher" | "admin" | "landlord",
    selected: user.value?.roles.includes(role) || false,
  }));
});

const hasRole = computed(() => roles.value.some((role) => role.selected));

const updateLandlordRole = async (key: string, value: boolean) => {
  if (key !== "landlord") return;

  if (value) {
    await supabase.from("landlord").insert({
      user_id: user.value!.id,
    });
  } else {
    console.log(key, value);
    await supabase.from("landlord").delete().eq("user_id", user.value!.id);
  }
  userStore.setUser(null);
  await useAsyncUser();
};

const translate = {
  "landlord": "房東",
  "teacher": "教師",
  "student": "學生",
  "admin": "管理員",
};

const nextStep = async () => {
  navigateTo("/");
};
</script>
<style></style>
