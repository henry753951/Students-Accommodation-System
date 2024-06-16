<template>
  <div class="max-w-6xl mx-auto p-4">
    <h2 class="mb-10 text-center text-3xl font-bold text-gray-800 dark:text-white">
      Hi {{ user?.name }} !! 從選擇租屋點開始吧 !!
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="property in properties"
        :key="property.Rental_property_id!"
        class="p-5 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800"
      >
        <NuxtLink :to="'./social/' + property.Rental_property_id" class="block">
          <img
            :src="property.image!"
            alt="House Image"
            class="w-full h-64 object-cover rounded-lg mb-3"
          />
          <div :class="{ 'text-green-500': property.state, 'text-red-500': !property.state }" class="font-semibold">
            <span v-if="property.state">Active</span>
            <span v-else>Inactive</span>
          </div>
          <div class="text-lg">{{ property.address }}</div>
        </NuxtLink>
      </div>
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
  image:string |null
};

const properties = ref<Rental_info[]>([]);

const initial_get_information = async () => {
  if(user.value === null || user.value === undefined){
    window.alert('請先登入');
    return;
  }
  else if((user.value.roles.includes("admin")) == true){
    const { data, error } = await supabase
      .from("rental_property")
      .select("id,updated_at,address,image")
      .order('updated_at', { ascending: false });
    if (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return data;
    }
    properties.value = data.map(item => ({
      Rental_property_id: item.id,
      state: true,
      address: item.address,
      image: item.image
    }));
  }
  else if((user.value.roles.includes("student")) == true){
    const { data, error } = await supabase
      .from("map_rental_property_student")
      .select("rental_property_id,is_currently_renting,updated_at,rental_property(address,image)")
      .eq("student_id", user.value?.id!)
      .order('updated_at', { ascending: false });
    if (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return data;
    }
    properties.value = data.map(item => ({
      Rental_property_id: item.rental_property_id,
      state: item.is_currently_renting,
      address: item.rental_property?.address!,
      image: item.rental_property?.image!
    }));
  }
  else if((user.value.roles.includes("landlord")) == true){
    const { data, error } = await supabase
      .from("rental_property")
      .select("id,updated_at,address,image")
      .eq("landlord_id", user.value?.id!)
      .order('updated_at', { ascending: false });
    if (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return data;
    }
    properties.value = data.map(item => ({
      Rental_property_id: item.id,
      state: true,
      address: item.address,
      image: item.image
    }));
  }
  else{
    window.alert('身分不符');
    return;
  }
};
</script>
<style></style>