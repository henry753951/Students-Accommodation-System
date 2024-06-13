<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-10 rounded-lg shadow-lg space-y-10 w-full max-w-3xl">
      <section>
        <h2 class="text-3xl font-bold mb-4 text-center text-indigo-600">
          新增租屋點
        </h2>
        <RentalAddrForm
          v-model:address="address"
          v-model:landlordName="landlordName"
          class="w-full"
        />
      </section>

      <section>
        <RentalPropertyForm
          v-model:price="price"
          v-model:description="description"
          v-model:is_public="isPublic"
          v-model:propertyAttributesType="propertyAttributesType"
          v-model:propertyAttributesSex="propertyAttributesSex"
          v-model:propertyAttributesSubsidy="propertyAttributesSubsidy"
          class="w-full"
        />
      </section>

      <div>
        <Button
          type="submit"
          class="bg-white text-black border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100 transition duration-300 ml-auto block"
          @click="handleSubmit"
        >
          Submit
        </Button>
      </div>

      <section>
        <h2>
          表單內容統整
        </h2>
        <div class="bg-gray-50 p-4 rounded-lg shadow-inner space-y-2">
          <p><strong>地址:</strong> {{ address }}</p>
          <p><strong>房東名稱:</strong> {{ landlordName }}</p>
          <p><strong>租金:</strong> {{ price }}</p>
          <p><strong>描述:</strong> {{ description }}</p>
          <p><strong>是否公開:</strong> {{ isPublic }}</p>
          <p>
            <strong>房產屬性:</strong> [{{ propertyAttributesType }},{{ propertyAttributesSex }},{{
              propertyAttributesSubsidy }}]
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";

definePageMeta({
  name: "新增租屋點",
});
const toast = useToast();
const supabase = useSupabaseClient<Database>();

const address = ref('');
const landlordName = ref('');
const price = ref(0);
const description = ref('');
const isPublic = ref(false);
const propertyAttributesType = ref('');
const propertyAttributesSex = ref('無');
const propertyAttributesSubsidy = ref(false);

const data_for_view = ref<Tables<"rental_property">[]>([]);
const SubmitToRentalprop = async (time: string) => {
  console.log("BINHAN SO BIG");
  const { data, error } = await supabase
    .from("rental_property")
    .insert([
      {
        "address": address.value,
        "landlord_id": 'cc7c9e40-af78-45d5-907f-66bcf550d2ad',
        "created_at": time,
        "updated_at": time,
      }
    ])
    .select("*");
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



const SubmitToRentalinfo = async (rental_id: string, time: string) => {
  console.log("BINHAN SO SMALL");
  const { data, error } = await supabase
    .from("rental_property_info")
    .insert([
      {
        "rental_property_id": rental_id,
        "price": price.value,
        "is_public": false,
        "description": description.value,
        "property_attributes": JSON.stringify({
          type: propertyAttributesType.value,
          sex: propertyAttributesSex.value,
          subsidy: propertyAttributesSubsidy.value
        }),
        "created_at": time,
        "updated_at": time,
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

const handleSubmit = async () => {
  const confirmation = confirm(`
    Address: ${address.value}
    Landlord Name: ${landlordName.value}
    Price: ${price.value}
    Description: ${description.value}
    Is Public: ${isPublic.value}
    Property Attributes: ${propertyAttributesType.value}, ${propertyAttributesSex.value}, ${propertyAttributesSubsidy.value}
    
    確定要送出嗎?
  `);

  if (confirmation) {
    //提交表單的邏輯
    //送出到supabase
    const time = new Date().toISOString();
    const rental_id = await SubmitToRentalprop(time);
    SubmitToRentalinfo(rental_id, time);

    console.log(rental_id, time);
  } else {
    console.log(confirmation);
  }
};


</script>

<style scoped>
.bg-gray-50 {
  background-color: #f9fafb;
}

.shadow-inner {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
}

.space-y-2> :not([hidden])~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}

.rounded-lg {
  border-radius: 0.5rem;
}

.p-4 {
  padding: 1rem;
}

input,
textarea {
  width: 100%;
  border: none;
  outline: none;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

input:focus,
textarea:focus {
  box-shadow: 0 0 0 2px rgba(134, 135, 148, 0.5);
}
</style>
