<template>
  <div class="bg-card min-h-screen p-6">
    <div class="max-w-4xl mx-auto space-y-6 bg-card p-6 rounded-lg shadow-lg border border-gray-300">
      <div class="flex justify-end mb-4">
        <Select
          v-model="selectedFilter"
          class="w-48 border border-gray-300 rounded"
        >
          <SelectTrigger>
            <SelectValue placeholder="選擇篩選條件" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>排序條件</SelectLabel>
              <SelectItem value="all">
                全部
              </SelectItem>
              <SelectItem value="price_low_to_high">
                價格：低到高
              </SelectItem>
              <SelectItem value="price_high_to_low">
                價格：高到低
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="property in filteredProperties"
          :key="property.id"
          class="mb-6"
        >
          <Card class="rounded-lg shadow-lg overflow-hidden border border-gray-300">
            <div class="relative">
              <img
                :src="property.image!"
                alt="House Image"
                class="w-full h-64 object-cover"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
              <div class="absolute bottom-0 left-0 p-4 text-white">
                <h2 class="text-2xl font-bold">
                  {{ property.address }}
                </h2>
              </div>
            </div>
            <div class="p-6">
              <div class="flex justify-content ">
                <div class="flex items-center space-x-2 mb-4">
                  <Badge class="bg-blue-500 text-white px-2 py-1 rounded">
                    {{ property.rental_property_info.length && property.rental_property_info[0]?.property_attributes ? parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).type : '無資料' }}
                  </Badge>
                </div>
                <div class="flex items-center space-x-2 mb-4 ml-4">
                  <Badge class="bg-blue-500 text-white px-2 py-1 rounded">
                    {{ property.rental_property_info.length && property.rental_property_info[0]?.property_attributes ? parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).sex : '無資料' }}
                  </Badge>
                </div>
                <div class="flex items-center space-x-2 mb-4 ml-4">
                  <Badge class="bg-blue-500 text-white px-2 py-1 rounded">
                    {{ property.rental_property_info.length && property.rental_property_info[0]?.property_attributes ? parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).subsidy : '無資料' }}
                  </Badge>
                </div>
              </div>
              <p class="text-gray-700 mb-4 truncate">
                {{ property.rental_property_info.length ? property.rental_property_info[0].description : '尚無描述' }}
              </p>
              <div class="flex justify-between items-center mb-4">
                <div class="text-lg font-semibold text-green-600">
                  {{ property.rental_property_info.length ? `$${property.rental_property_info[0].price}` : '尚無價位' }}
                </div>
                <Button class="bg-green-500 text-white px-4 py-2 rounded">
                  <NuxtLink
                    to="./reserve-property"
                    class="text-white"
                  >
                    預約看屋
                  </NuxtLink>
                </Button>
                <Button class="bg-green-500 text-white px-4 py-2 rounded">
                  <NuxtLink :to="'/advertisement/info-' + property.id">
                    詳細
                  </NuxtLink>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { Database, Tables, Enums, Json } from "~/database.types";
const supabase = useSupabaseClient<Database>();

definePageMeta({
  name: "房屋廣告頁面",
});

const { data: rental_property, pending: isLoading, refresh: refresh } = await useAsyncData('rental_property', async () => {
  const { data } = await supabase.from('rental_property').select(`*,rental_property_info(*)`);
  return data;
});
function getJson<T>(data: Json, defaultValue: T): T {
  if (!data) return defaultValue;
  return data as T;
}

const selectedFilter = ref('all');

const filteredProperties = computed(() => {
  if (!rental_property.value) return [];

  if (selectedFilter.value === 'price_low_to_high') {
    return [...rental_property.value].sort((a, b) => {
      const priceA = a.rental_property_info[0]?.price ?? 0;
      const priceB = b.rental_property_info[0]?.price ?? 0;
      return priceA - priceB;
    });
  } else if (selectedFilter.value === 'price_high_to_low') {
    return [...rental_property.value].sort((a, b) => {
      const priceA = a.rental_property_info[0]?.price ?? 0;
      const priceB = b.rental_property_info[0]?.price ?? 0;
      return priceB - priceA;
    });
  } else {
    return rental_property.value;
  }
});

type property_attribute = {
  type: string;
  sex: string;
  subsidy: boolean;
};
const defaultPropertyAttribute: property_attribute = {
  type: "defaultType",
  sex: "defaultSex",
  subsidy: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePropertyAttributes(attr: string | any ) {
  try {
    return JSON.parse(attr);
  } catch (e) {
    console.error('Error parsing property attributes:', e);
    return {};
  }
}
</script>
<style scoped>
/* Add any additional styling here */
</style>