<template>
  <div class="max-w-prose flex flex-col  justify-center ">
    <div
      v-for="id in rental_id"
      class="text-white m-5 p-5 rounded-lg bg-black dark:bg-white dark:text-black "
    >
      <div :class="{ 'text-red-500': id.is_currently_renting }">
        <span v-if="id.is_currently_renting">租賃中</span>
        <span v-else>未租賃</span>
      </div>
      <NuxtLink :to="'/rentals/' + id.Rental_property_id">
        {{ id.Rental_property_id }}
      </NuxtLink>
      <NuxtLink
        v-if="!id.is_currently_renting"
        :to="'/rentals/edit/' + id.Rental_property_id"
        class="text-blue-500 ml-4"
      >
        修改房屋資訊
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

onMounted(() => {
  initial_get_information();
});
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
type Rental_info = {
  Rental_property_id: string | null,
  is_currently_renting: boolean | null,
};

const rental_id = ref<Rental_info[]>([]);


const initial_get_information = async () => {
  const { data, error } = await supabase
    .from("map_rental_property_student")
    .select("rental_property_id,is_currently_renting")
    .eq("student_id", "77bfd169-c679-473c-9c93-fc26679d7216");
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
  }));
  // for (let i = 0; i < data.length; i++) {
  //   const { data: rental_property_id, error: error2 } = await supabase
  //     .from("rental_property")
  //     .select("*")
  //     .eq("id", data[i].rental_property_id)
  //   if (error2) {
  //     toast({
  //       title: "Error",
  //       description: error2.message,
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   // console.log(rental_property_id,"544");
  //   rental_property.value.push({
  //     Rental_property_id: data[i].rental_property_id,
  //     address: rental_property_id[0].address,
  //     score: Number(rental_property_id[0].score) || 0,
  //     comment: rental_property_id[0].comment,
  //     price: Number(rental_property_id[0].rental_property_info[0].price) || 0,
  //     description: rental_property_id[0].rental_property_info[0].description || "",
  //     // property_attributes: rental_property_id[0].rental_property_info[0].property_attributes ||"",
  //   });

  // }

};

for (let i = 0; i < rental_id.value.length; i++) {
  if (rental_id.value[i].is_currently_renting == true) {
    rental_id.value.splice(i, 1);
  }
}
</script>

<style></style>