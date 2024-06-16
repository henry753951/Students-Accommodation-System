<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="p-10 rounded-lg shadow-lg space-y-10 w-full max-w-3xl">
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

      <div class="flex">
        <Button
          type="submit"
          class="ml-auto"
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
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';

const route = useRoute();
definePageMeta({
  name: "修改租屋點",
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

const test=ref(null);

const fetchRentalData = async () => {
  const { data, error } = await supabase
    .from('rental_property')
    .select(`
      *,
      rental_property_info (
        *
      )
    `)
    .eq('id', route.params.prop_id)
    .single();

  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  console.log(data);
  address.value = data.address;
  landlordName.value = data.landlord_id;
  const rentalInfo = data.rental_property_info[0];
  price.value = rentalInfo.price;
  description.value = rentalInfo.description;
  isPublic.value = rentalInfo.is_public;
  const propertyAttributes = JSON.parse(rentalInfo.property_attributes);
  propertyAttributesType.value = propertyAttributes.type;
  propertyAttributesSex.value = propertyAttributes.sex;
  propertyAttributesSubsidy.value = propertyAttributes.subsidy;
};

onMounted(() => {
  fetchRentalData();
});

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
    const time = new Date().toISOString();
    const { data, error } = await supabase
      .from('rental_property')
      .update({
        address: address.value,
        landlord_name: landlordName.value,
        price: price.value,
        description: description.value,
        is_public: isPublic.value,
        property_attributes: JSON.stringify({
          type: propertyAttributesType.value,
          sex: propertyAttributesSex.value,
          subsidy: propertyAttributesSubsidy.value
        }),
        updated_at: time,
      })
      .eq('id', route.params.prop_id);

    if (error) {
      toast.toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    toast.toast({
      title: "Success",
      description: "資料已成功更新",
      variant: "success",
    });
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