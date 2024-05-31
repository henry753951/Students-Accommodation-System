<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xl font-bold mb-4">Property Form</h2>
      <RentalAddrForm v-model:address="address" v-model:landlordName="landlordName" />
    </section>

    <section>
      <h2 class="text-xl font-bold mb-4">Property Form</h2>
      <RentalPropertyForm v-model:price="price" v-model:description="description" v-model:is_public="isPublic" v-model:property_attributes="propertyAttributes" />
    </section>

    <Button type="submit" @click="handleSubmit">Submit</Button>

    <section>
      <h2 class="text-xl font-bold mb-4">表單內容統整</h2>
      <p>addr: {{ address }}</p>
      <p>landlordname: {{ landlordName }}</p>
      <p>Price: {{ price }}</p>
      <p>Description: {{ description }}</p>
      <p>Is Public: {{ isPublic }}</p>
      <p>Property Attributes: {{ propertyAttributes }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
import { useModel } from 'vue';

const toast = useToast();
const supabase = useSupabaseClient<Database>();

const address = ref('');
const landlordName = ref('');
const price = ref(0);
const description = ref('');
const isPublic = ref(false);
const propertyAttributes = ref('');

const data_for_view = ref<Tables<"rental_property">[]>([]);

const SubmitToRentalprop = async (time:string): Promise<string> => {
  console.log("BINHAN SO BIG");
  const { data, error } = await supabase
    .from("rental_property")
    .insert([
      {"address":address.value,
      "landlord_id":'cc7c9e40-af78-45d5-907f-66bcf550d2ad',
      "created_at":time,
      "updated_at":time,
      }
    ])
    .select("*")
  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return 'error';
  }
  return data[0]['id'];
};
const SubmitToRentalinfo = async (rental_id:string,time:string) => {
  console.log("BINHAN SO SMALL");
  const { data, error } = await supabase
    .from("rental_property_info")
    .insert([
      {"rental_property_id":rental_id,
      "price":price.value,
      "is_public":false,
      "description":description.value,
      "created_at":time,
      "updated_at":time,
      }
    ])
    .select("*");
  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
};

const handleSubmit = async() => {
  const confirmation = confirm(`
    Address: ${address.value}
    Landlord Name: ${landlordName.value}
    Price: ${price.value}
    Description: ${description.value}
    Is Public: ${isPublic.value}
    Property Attributes: ${propertyAttributes.value}
    
    確定要送出嗎?
  `);

  if (confirmation) {
    //提交表單的邏輯
    //送出到supabase
    let time=new Date().toISOString()
    let rental_id=await SubmitToRentalprop(time)
    SubmitToRentalinfo(rental_id,time)
    
    console.log(rental_id,time);
  } else {
    console.log(confirmation);
  }
};


</script>

<style scoped>
/* Add any additional styling here */
</style>