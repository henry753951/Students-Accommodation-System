<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header v-if = 'main_data' class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">{{ main_data[0].address }}</h1>
    </header>

    <!-- Main Content -->
    <div class="flex-1 grid grid-cols-12 gap-6 p-6">
      <!-- Main Section -->
      <div class="col-span-9 space-y-6">
        <div class="bg-white rounded-lg shadow-sm p-4">

          <!-- Post Input -->
          <div class="relative w-full max-w-md mb-4">
            <input
              v-model="newPost"
              type="text"
              placeholder="Say something..."
              class="pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button @click="publishPost" class="absolute right-3 top-1/2 transform -translate-y-1/2">Post</button>
          </div>

          <!-- Announcements -->
          <h2 class="text-lg font-semibold mb-4">貼文</h2>
          <div class="space-y-4">
            <div class="flex items-start space-x-4" v-for="(post, index) in main_data" :key="index">
              <!-- User Avatar -->
              <Avatar class="bg-slate-200 mr-3">
                <AvatarImage
                  :src="post.app_user?.avatar_url || 'default-avatar.png'"
                  alt="User Avatar"
                />
                <AvatarFallback>{{ post.app_user ? post.app_user.name?.charAt(0) : 'U' }}</AvatarFallback>
              </Avatar>
              <!-- Post Content -->
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div class="text-gray-500 text-sm">{{ post.created_at }}</div>
                </div>
                <p class="text-gray-700">{{ post.context }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    
<script setup lang="ts">
import type { Database, Tables, Enums, Json } from "~/database.types";
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const route = useRoute();
const current_property_id = ref(route.params.id);
// const user = useUser();

definePageMeta({
  name: "留言板",
});

//顯示資料
const { data: main_data, pending: isLoading, refresh: refreshPosts } = useAsyncData(async () => {
  const { data } = await supabase.from('rental_property')
    .select(`*, posts(*), app_user(name, avatar_url)`)
    .eq('id', current_property_id.value)
    .order('created_at', { ascending: false });
  return data;
});

//發文
const newPost = ref('');
const publishPost = async () => {

  if(!newPost.value) {
    window.alert('try to say something ~');
      return;
  }
      
  const {data, error } = await supabase.from('posts').insert(
    {
      rental_property_id: (current_property_id.value).toString(),
      created_by: user.value?.id,
      context: newPost.value,
      created_at: new Date().toISOString(),
    }
  );
      
  if (error) {
    window.alert('發送失敗');
    return;
  }
  newPost.value = '';
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