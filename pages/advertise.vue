<template>
  <div class="max-w-2xl mx-auto p-4">
    <div v-for="property in rental_property" :key="property.id" class="mb-4">
      <Card class="rounded-lg shadow-lg">
        <img src="https://via.placeholder.com/800x400" alt="House Image" class="w-full h-64 object-cover rounded-t-lg" />
        <div class="p-4">
          <h2 class="text-xl font-bold mb-2">{{ property.address }}</h2>
          <div class="flex items-center space-x-2 mb-4">
            <Badge v-if="property.rental_property_info.length">{{ property.rental_property_info[0].description }}</Badge>
          </div>
          <p class="text-gray-700 mb-4">{{ property.rental_property_info.length ? property.rental_property_info[0].description : 'No description available' }}</p>
          <div class="text-lg font-semibold text-green-600">{{ property.rental_property_info.length ? `$${property.rental_property_info[0].price}` : 'Price not available' }}</div>
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




const address = ref('地址');
const bonusPoints = ref('額外加分項');
const description = ref('描述');
const price = ref('$500000');
</script>

<style scoped>
/* Add any additional styling here */
</style>