<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <div class="flex justify-end mb-4">
      <Select v-model="selectedFilter" class="w-48">
        <SelectTrigger>
          <SelectValue placeholder="選擇篩選條件" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>篩選條件</SelectLabel>
            <SelectItem value="all">全部</SelectItem>
            <SelectItem value="price_low_to_high">價格：低到高</SelectItem>
            <SelectItem value="price_high_to_low">價格：高到低</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div v-for="property in filteredProperties" :key="property.id" class="mb-6">
      <Card class="rounded-lg shadow-lg overflow-hidden">
        <img src="https://via.placeholder.com/800x400" alt="House Image" class="w-full h-64 object-cover" />
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-2">{{ property.address }}</h2>
          <div class="flex items-center space-x-2 mb-4">
            <Badge v-if="property.rental_property_info.length" class="bg-blue-500 text-white px-2 py-1 rounded">{{ property.rental_property_info[0]?.property_attributes }}</Badge>
          </div>
          <p class="text-gray-700 mb-4">{{ property.rental_property_info.length ? property.rental_property_info[0].description : 'No description available' }}</p>
          <div class="text-lg font-semibold text-green-600 mb-4">{{ property.rental_property_info.length ? `$${property.rental_property_info[0].price}` : 'Price not available' }}</div>
          <Button class="bg-green-500 text-white px-4 py-2 rounded">預約</Button>
        </div>
      </Card>
    </div>
    <p class="text-green-500">{{ rental_property }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Database, Tables, Enums } from "~/database.types";
const supabase = useSupabaseClient<Database>();

definePageMeta({
  name: "房屋廣告頁面",
});

const { data: rental_property, pending: isLoading, refresh: refresh } = useAsyncData('rental_property', async () => {
  const { data } = await supabase.from('rental_property').select(`
    *,
    rental_property_info (
      *
    )
  `);
  return data;
});


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



</script>

<style scoped>
/* Add any additional styling here */
</style>