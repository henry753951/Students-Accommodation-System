<template>
  <div class="bg-gray min-h-screen p-10">
    <div class="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
      <div
        v-if="rental_property && rental_property.length > 0"
        class="flex flex-col md:flex-row h-full"
      >
        <div className="md:w-1/2 h-[50vh] md:h-full">
          <img
            src="https://via.placeholder.com/800x400"
            alt="House Image"
            className="w-full h-full object-cover"
          >
          <div class="text-center bg-opacity-80 p-10 ">
            <h3 className="text-lg font-bold mb-2">
              留言區
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-500">
                <Input placeholder="Comment" />
              </p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-2">
                地址
              </h3>
              <p className="text-gray-500">
                {{ rental_property[0].address ? rental_property[0].address : 'Nothing' }}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                價錢
              </h3>
              <p className="text-gray-500">
                {{ rental_property[0].rental_property_info && rental_property[0].rental_property_info.length > 0 && rental_property[0].rental_property_info[0].price ? rental_property[0].rental_property_info[0].price : 'Nothing' }}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                房型
              </h3>
              <p className="text-gray-500">
                {{ rental_property[0].rental_property_info && rental_property[0].rental_property_info.length > 0 && rental_property[0].rental_property_info[0].price ? parsePropertyAttributes(rental_property[0].rental_property_info[0].property_attributes).type : 'Nothing' }}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                限租性別
              </h3>
              <p className="text-gray-500">
                {{ rental_property[0].rental_property_info && rental_property[0].rental_property_info.length > 0 && rental_property[0].rental_property_info[0].price ? parsePropertyAttributes(rental_property[0].rental_property_info[0].property_attributes).sex : 'Nothing' }}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                補助
              </h3>
              <p className="text-gray-500">
                {{ rental_property[0].rental_property_info && rental_property[0].rental_property_info.length > 0 && rental_property[0].rental_property_info[0].price ? parsePropertyAttributes(rental_property[0].rental_property_info[0].property_attributes).subsidy : 'Nothing' }}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                上傳日期
              </h3>
              <p className="text-gray-500">
                {{ rental_property[0].created_at ? rental_property[0].created_at : 'Nothing' }}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold mb-4">
              評分
            </h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-500">
                star
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import type { Database, Tables, Enums } from "~/database.types";
const supabase = useSupabaseClient<Database>();

definePageMeta({
  name: '詳細資訊',
});


const route = useRoute();
const department_id = ref(route.params.id);


const { data: rental_property, error } = useAsyncData( async () => {
  const { data } = await supabase.from('rental_property').select(`
    *,
    rental_property_info (
      *
    )
  `).eq('id', department_id.value);
  return data;
});

function parsePropertyAttributes(attr) {
  try {
    return JSON.parse(attr);
  } catch (e) {
    console.error('Error parsing property attributes:', e);
    return {};
  }
}
</script>

<style>

</style>