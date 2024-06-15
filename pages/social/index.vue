<template>
  <div class="max-w-prose flex flex-col  justify-center ">
    <div
      v-for="id in rental_id"
      class="text-white m-5 p-5 rounded-lg bg-black dark:bg-white dark:text-black "
    >
      <NuxtLink :to="'./social/' + id.Rental_property_id">
        <div :class="{ 'text-red-500': id.state }">
          <span v-if="id.state">Active</span>
          <span v-else>Inactive</span>
        </div>
        <div>{{ id.address }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
const supabase = useSupabaseClient<Database>();
const user = useUser();
const toast = useToast();

definePageMeta({
  name: '租屋點交流區',
});

onMounted(() => {
  initial_get_information();
});

type Rental_info = {
  Rental_property_id: string | null,
  state: boolean | null,
  address: string | null,
};

const rental_id = ref<Rental_info[]>([]);

const initial_get_information = async () => {
  if(user.value === null || user.value === undefined){
    window.alert('請先登入');
    return;
  }
  else if((user.value.roles.includes("student")) == true){
    const { data, error } = await supabase
      .from("map_rental_property_student")
      .select("rental_property_id,is_currently_renting,updated_at,rental_property(address)")
      .eq("student_id", user.value?.id!)
      .order('updated_at', { ascending: false });
    if (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    rental_id.value = data.map(item => ({
      Rental_property_id: item.rental_property_id,
      state: item.is_currently_renting,
      address: item.rental_property?.address!,
    }));
  }
  else if((user.value.roles.includes("landlord")) == true){
    const { data, error } = await supabase
      .from("rental_property")
      .select("id,updated_at,address")
      .eq("landlord_id", user.value?.id!)
      .order('updated_at', { ascending: false });
    if (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    rental_id.value = data.map(item => ({
      Rental_property_id: item.id,
      state: true,
      address: item.address,
    }));
  }
  else{
    window.alert('身分不符');
    return;
  }
};

</script>

<style></style>