<template>
  <div class="container">
    <div
      class="mb-3 flex justify-between items-end p-5 text-white min-h-[300px] relative"
      :style="{
        backgroundImage: `url(${rentalData?.rental_property?.image || 'default-image.jpg'})`,
        backgroundSize: 'cover',
      }"
    >
      <div class="z-10">
        <h1 class="text-2xl font-bold">
          {{ rentalData?.name || '租屋點' }}
        </h1>
        <p class="text-lg">
          {{ rentalData?.rental_property?.address || '租屋點描述' }}
        </p>
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />


      <Button
        v-if="rentalData"
        class="z-10"
        @click="navigateTo('/advertisement/info-' + rentalData.rental_property?.id)"
      >
        租屋廣告平台
      </Button>
    </div>
    <Tabs
      v-model="currentTab"
      class="w-full mb-5"
    >
      <TabsList class="w-full">
        <TabsTrigger
          value="rental-points"
          class="w-full"
        >
          租屋點
        </TabsTrigger>
        <TabsTrigger
          value="rental-communication"
          class="w-full"
        >
          租屋交流區
        </TabsTrigger>
      </TabsList>
    </Tabs>
    <div>
      <div
        v-if="currentTab === 'rental-points'"
        class="space-y-5"
      >
        <RentalInfoPanel
          :rental-data="rentalData"
          @update="refresh"
        />
        <p class="text-2xl font-bold">
          訪視記錄
        </p>
        <InterviewList
          :student-user-id="user?.id"
          :property-id="rentalData?.rental_property_id"
        />
      </div>
      <div v-else-if="currentTab === 'rental-communication'">
        <Social :property-id="rentalData?.rental_property_id" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import type { Database, Tables, Enums } from "~/database.types";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import social from "../social/index.vue";
const supabase = useSupabaseClient<Database>();
const user = await useAsyncUser();
const route = useRoute();
const map_id = ref(route.params.id);


// get params ?student_id
const student_id = route.query.student_id as string;
const { data: rentalData, refresh } = await useAsyncData("rental_property_data_info", async () => {
  if (!user.value) {
    throw new Error("User not found");
  }
  const { data, error } = await supabase.from("map_rental_property_student").select("*, rental_property(*, app_user(*))")
  .eq("student_id", student_id||user.value.id )
  .eq("id", map_id.value).limit(1).single();
  if (error) {
    throw error;
  }
  return data;
});

definePageMeta({
  name: "租屋點空間"
});

const updateRentalData = ref({

});

const currentTab = ref('rental-points');



</script>
<style scoped></style>