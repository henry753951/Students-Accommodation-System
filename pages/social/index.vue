<template>
  <div class="flex flex-col h-screen">
    <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">{{ currentRentalProperty?.address }}</h1>
    </header>
    <div class="flex-1 grid grid-cols-12 gap-6 p-6">
      <div class="col-span-9 space-y-6">
        <div class="bg-white rounded-lg shadow-sm p-4">
          <div class="relative w-full max-w-md mb-4">
            <input
              v-model="post"
              type="text"
              placeholder="Say something..."
              class="pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button @click="publishPost" class="absolute right-3 top-1/2 transform -translate-y-1/2">Post</button>
          </div>
          <h2 class="text-lg font-semibold mb-4">Announcements</h2>
          <div class="space-y-4">
            <div class="flex items-start space-x-4" v-for="post in post_data">
              <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {{ post.app_user.name.charAt(0) }}
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div class="font-semibold">{{ post.app_user.name }}</div>
                  <div class="text-gray-500 text-sm">{{ new Date(post.created_at).toLocaleString() }}</div>
                </div>
                <p class="text-gray-700">{{ post.context }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 space-y-6">
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h2 class="text-lg font-semibold mb-4">Members</h2>
          <div class="space-y-4">{{ currentRentalProperty?.landlord_id }}</div>
          <div class="space-y-4" v-for="member in member_data" :key="member.student_id">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {{ member.app_user?.name.charAt(0) }}
              </div>
              <div>
                <div class="font-semibold">{{ member.app_user.name }}</div>
          </div>
        </div>
        <div v-if="isLandlord" class="bg-white rounded-lg shadow-sm p-4">
          <h2 class="text-lg font-semibold mb-4">Your Properties</h2>
          <div class="space-y-4" v-for="property in rental_property" :key="property.id" @click="selectProperty(property)">
            <div class="flex items-center space-x-4 cursor-pointer">
              <div class="flex-1">
                <div class="font-semibold">{{ property.address }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>


<script setup lang="ts">

import { ref } from 'vue';
import type { Database, Tables, Enums } from "~/database.types";
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

definePageMeta({
  name: "租屋點交流平台",
});

const currentRentalProperty = ref<RentalProperty | null>(null);
  onMounted(async () => {
  currentRentalProperty.value = await getCurrentRentalProperty(user.value.id);
});

//判別身分
const isLandlord = ref(false); // 預設為 false
const getUserIdentity = async (userId: string): Promise<{ isStudent: boolean; isLandlord: boolean }> => {
  const { data: studentData } = await supabase
    .from('student')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (studentData) {
    return { isStudent: true, isLandlord: false };
  }

  const { data: landlordData } = await supabase
    .from('landlord')
    .select('id')
    .eq('user_id', userId)
    .single();

  if (landlordData) {
    return { isStudent: false, isLandlord: true };
  }

  return { isStudent: false, isLandlord: false };
};

// 取得當前租屋點
interface RentalProperty {
  id: string;
  address: string;
  created_at: string | null;
  updated_at: string | null;
  landlord_id: string | null;
}
const getCurrentRentalProperty = async (userId: string): Promise<RentalProperty | null> => {
  try {
    const identity = await getUserIdentity(userId);

    if (identity.isStudent) {
      const { data: studentRentalProperty } = await supabase
        .from('map_rental_property_student')
        .select('rental_property_id, rental_property(*)')
        .eq('student_id', userId)
        .single();

      return studentRentalProperty ? studentRentalProperty.rental_property : null;
    } else if (identity.isLandlord) {
      const { data: landlordRentalProperties } = await supabase
        .from('rental_property')
        .select('*')
        .eq('landlord_id', userId)
        .order('updated_at', { ascending: false })
        .limit(1);

      return landlordRentalProperties && landlordRentalProperties.length > 0 ? landlordRentalProperties[0] : null;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching current rental property');
    throw error;
  }
};

//房東選租屋點
const selectProperty = (property: RentalProperty) => {
  currentRentalProperty.value = property;
};

//租屋點資料
const route = useRoute();

const { data: rental_property, error ,refresh: refreshSite } = useAsyncData( async () => {
  const { data } = await supabase.from('rental_property')
  .select(`
    *,
    rental_property_info ("*")
  `)
  .eq('id', currentRentalProperty.value.id);
  return data;
});

//貼文資料
const { data: post_data, error: error2 ,refresh: refreshSite2 } = useAsyncData( async () => {
  const { data } = await supabase.from('announcement')
  .select(`
    *,
    app_user(name, avatar_url)

  `).eq('rental_property_id', currentRentalProperty)
  return data;
});

//取得租屋點房東
const { data: landlord_data, error: error3, refresh: refreshSite3 } = useAsyncData(async () => {
  const { data } = await supabase
    .from('landlord')
    .select(`
      *,
      app_user(name, avatar_url)
    `)
    .eq('user_id', currentRentalProperty.value?.landlord_id);

  return data;
});

//取得租屋點學生成員
const { data: member_data, error: error4 ,refresh: refreshSite4 } = useAsyncData( async () => {
  const { data } = await supabase.from('map_rental_property_student')
  .select(`
    student_id,
    app_user(name, avatar_url)

  `).eq('rental_property_id', currentRentalProperty.value.id)
  return data;
});

//發文
const post = ref('');
const publishPost = async () => {
  if(!post.value) {
    window.alert('try to say something ~');
    return;
  }

  const { data, error } = await supabase.from('announcement').insert(
    {
      rental_property_id: currentRentalProperty.value?.id,
      created_by: user.value,
      context: post.value,
      created_at: new Date().toISOString(),
      }
  );
  if (error) {
    window.alert('發送失敗');
    return;
  }
  post.value = '';
  window.alert('發送成功！');
  refreshSite();
  refreshSite2();
  return;
};

onMounted(async () => {
  currentRentalProperty.value = await getCurrentRentalProperty(user.value.id);
  const identity = await getUserIdentity(user.value.id);
  isLandlord.value = identity.isLandlord;
});


</script>

<style scoped>
input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
}
button {
  border: none;
  background: gainsboro;
  color: black;
  padding: 0.3rem 0.8rem;
  border-radius: 0.1rem;
}
</style>