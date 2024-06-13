<template>
  <div class="max-w-prose flex flex-col  justify-center ">
    <div 
      v-for="rental in rental_property" 
      :key="rental.Rental_property_id" 
      class="text-white m-5 p-5 rounded-lg bg-black dark:bg-white dark:text-black "
    >
      <div>{{ rental.Rental_property_id }}</div>
      <div>{{ rental.address }}</div>
      <NuxtLink :to="'/rentals/' + rental.Rental_property_id">
        詳細資訊
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
const toast = useToast();
definePageMeta({
  name: '租屋清單',
});
type rental = {
  address: string | null,
};
const route = useRoute();
const id = ref(route.params.id);
const Rental = ref<rental>({
  address: null,
});

onMounted(() => {
  initial_get_information();
});
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
type Rental_interface = {
  Rental_property_id: string,
  address: string,
  price: number,
  description: string,
  // property_attributes: string,
  comment: string | null,
  score: number | null,
};

const all1 = ref({});
const rental_property = ref<Rental_interface[]>([]);

const generateLink = (id: string, params: Record<Rental_interface, any>) => {
  return {
    path: `/rentals/${id}`,
    query: params
  };
};


const initial_get_information = async () => {
  const { data, error } = await supabase
    .from("map_rental_property_student")
    .select("rental_property_id")
    .eq("student_id", "77bfd169-c679-473c-9c93-fc26679d7216");
  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  for (let i = 0; i < data.length; i++) {
    const { data: rental_property_id, error: error2 } = await supabase
      .from("rental_property")
      .select("*,rental_property_info(*)")
      .eq("id", data[i].rental_property_id);
    if (error2) {
      toast({
        title: "Error",
        description: error2.message,
        variant: "destructive",
      });
      return;
    }
    // console.log(rental_property_id,"544");
    rental_property.value.push({
      Rental_property_id: data[i].rental_property_id,
      address: rental_property_id[0].address,
      score: Number(rental_property_id[0].score) || 0,
      comment: rental_property_id[0].comment,
      price: Number(rental_property_id[0].rental_property_info[0].price) || 0,
      description: rental_property_id[0].rental_property_info[0].description || "",
      // property_attributes: rental_property_id[0].rental_property_info[0].property_attributes ||"",
    });

  }

};

</script>

<style></style>