<template>
  <div class="max-w-prose flex flex-col  justify-center ">
    <div
      v-for="id in rental_id"
      class="text-white m-5 p-5 rounded-lg bg-black dark:bg-white dark:text-black "
    >
      <NuxtLink :to="'./social/' + id.Rental_property_id">
        <div :class="{ 'text-red-500': id.is_currently_renting }">
          <span v-if="id.is_currently_renting">租賃中</span>
          <span v-else>未租賃</span>
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
const user = useSupabaseUser();
const toast = useToast();

definePageMeta({
  name: '租屋點交流平台',
});

onMounted(() => {
  initial_get_information();
});

type Rental_info = {
  Rental_property_id: string | null,
  is_currently_renting: boolean | null,
  address: string | null,
};

const rental_id = ref<Rental_info[]>([]);

const initial_get_information = async () => {
  const { data, error } = await supabase
    .from("map_rental_property_student")
    .select("rental_property_id,is_currently_renting,updated_at,rental_property(address)")
    .eq("student_id", user.value?.id!)
    .order('updated_at', { ascending: false });
  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  // console.log(data, "data");
  rental_id.value = data.map(item => ({
    Rental_property_id: item.rental_property_id,
    is_currently_renting: item.is_currently_renting,
    address: item.rental_property?.address!,
  }));
};

</script>

<style></style>