<template>
<div class="flex flex-col h-screen">
  <!-- Header -->
  <header class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
    <h1 v-if="currentRentalProperty" class="text-2xl font-bold">{{ currentRentalProperty.address }}</h1>
  </header>

  <!-- Main Content -->
  <div class="flex-1 grid grid-cols-12 gap-6 p-6">
    <!-- Main Section -->
    <div class="col-span-9 space-y-6">
      <div class="bg-white rounded-lg shadow-sm p-4">

        <!-- Post Input -->
        <div class="relative w-full max-w-md mb-4">
          <input
            v-model="post"
            type="text"
            placeholder="Say something..."
            class="pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button @click="publishPost" class="absolute right-3 top-1/2 transform -translate-y-1/2">Post</button>
        </div>

        <!-- Announcements -->
        <h2 class="text-lg font-semibold mb-4">Announcements</h2>
        <div class="space-y-4">
          <div class="flex items-start space-x-4" v-for="comment in comments" :key="comment.id">
            <!-- User Avatar -->
            <Avatar class="bg-slate-200 mr-3">        
            <AvatarImage
              :src="comment.app_user && comment.app_user.avatar_url ? comment.app_user.avatar_url : 'null'"
              alt="@radix-vue"
            />
            <AvatarFallback>name</AvatarFallback>
            </Avatar>
            <!-- Post Content -->
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div class="font-semibold">{{ comment.app_user.name }}</div>
                <div class="text-gray-500 text-sm">{{ new Date(comment.created_at).toLocaleString() }}</div>
              </div>
            <p class="text-gray-700">{{ comment.context }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Sidebar -->
  <div class="col-span-3 space-y-6">
    <!-- Members Section -->
    <div class="bg-white rounded-lg shadow-sm p-4">
      <h2 class="text-lg font-semibold mb-4">Members</h2>
      <div class="space-y-4">
        <!-- Display Members -->
        <div class="flex items-center space-x-4" v-for="member in members" :key="member.student_id">
          <!-- Member Avatar -->
          <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            {{ member.app_user.name.charAt(0) }}
          </div>
          <!-- Member Name -->
          <div>
            <div class="font-semibold">{{ member.app_user.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Properties Section (for Landlords) -->
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
</template>


<script setup lang="ts">

import { ref } from 'vue';
import type { Database, Tables, Enums } from "~/database.types";
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

definePageMeta({
  name: "租屋點交流平台",
});

//判別身分
const isLandlord = ref(false);
const getUserIdentity = async (userId: string): Promise<{ isStudent: boolean; isLandlord: boolean }> => {
  const { data: studentData } = await supabase
    .from('student')
    .select('user_id')
    .eq('user_id', userId as string)
    .single();

  if (studentData) {
    return { isStudent: true, isLandlord: false };
  }

  const { data: landlordData } = await supabase
    .from('landlord')
    .select('user_id')
    .eq('user_id', userId as string)
    .single();

  if (landlordData) {
    return { isStudent: false, isLandlord: true };
  }

  return { isStudent: false, isLandlord: false };
};

// 取得當前租屋點
interface RentalProperty {
  address: string;
  created_at: string | null;
  id: string;
  landlord_id: string | null;
  updated_at: string | null;
}

const currentRentalProperty = ref<RentalProperty | null>(null);
useAsyncData(async () => {
  const identity = await getUserIdentity(user.value.id);
  let property: RentalProperty | null = null;

  if (identity.isStudent) {
    const { data } = await supabase
      .from('map_rental_property_student')
      .select('rental_property_id, rental_property(*)')
      .eq('student_id', user.value.id)
      .single();
    property = data.rental_property;
  } 
  else if (identity.isLandlord) {
    const { data } = await supabase
      .from('rental_property')
      .select('*')
      .eq('landlord_id', user.value.id)
      .order('updated_at', { ascending: false })
      .single();
    property = data;
  }

  currentRentalProperty.value = property;
  isLandlord.value = identity.isLandlord;

  return property;
});

//貼文顯示資料
const { data: comments, pending: isLoading, refresh: refreshPosts} = useAsyncData(async () => {
  if (!currentRentalProperty.value) return null;
  const { data } = await supabase.from('announcement')
    .select(`*, app_user(name, avatar_url)`)
    .eq('rental_property_id', currentRentalProperty.value.id);
  comments.value = data;
  return data;
});

//取得租屋點房東
const {data: the_landlord} = useAsyncData(async () => {
  if (!currentRentalProperty) return null; 
  const { data } = await supabase
    .from('rental_property')
    .select(`*, app_user(name, avatar_url)`)
    .eq('landlord_id',currentRentalProperty.value.landlord_id);
  the_landlord.value = data;
  return data;
});

//取得租屋點學生成員
const {data: members} = useAsyncData(async () => {
  if (!currentRentalProperty.value) return null;
  const { data } = await supabase.from('map_rental_property_student')
    .select(`student_id, app_user(name, avatar_url)`)
    .eq('rental_property_id', currentRentalProperty.value.id);
  members.value = data;
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
      rental_property_id: currentRentalProperty.value.id,
      created_by: user.value.id,
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
  refreshPosts();
  return;
};
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