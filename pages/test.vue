<script setup lang="ts">
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
const toast = useToast();
const supabase = useSupabaseClient<Database>();
const input = ref({
  department_name: "",
  department_code: "",
});

const fun = async () => {
  console.log("fun");
  const { data, error } = await supabase
    .from("school_department")
    .insert(input.value)
    .select("*");
  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  await get_data();
  console.log(data);
};

const data_for_view = ref<Tables<"school_department">[]>([]);
const get_data = async () => {
  const { data, error } = await supabase.from("school_department").select("*");
  if (error) {

    return;
  }
  data_for_view.value = data;
  console.log(data);
};

onMounted(() => {
  get_data();
});

const n = ref(0);
</script>
<template>
  <div>
    <h1>學院管理</h1>
    <Input v-model="input.department_name" />
    <Input v-model="input.department_code" />
    {{ input }}
    <Button @click="n++">
      新增
    </Button>
    <Hi v-model:count="n" />
    <div>
      <h1>學院</h1>
      <div
        v-for="item in data_for_view"
        :key="item.id"
      >
        {{ item.department_name }}
        {{ item.department_code }}
      </div>
    </div>
  </div>
</template>
