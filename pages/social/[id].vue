<template>
  <div class="flex flex-col h-screen mx-auto" style="max-width: 1100px;">
    <!-- Header -->
    <header v-if='property_data' class="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">{{ property_data[0].address }}</h1>
    </header>

    <!-- Main Content -->
    <div class="flex-1 grid grid-cols-12 gap-4 p-4">
      <!-- Main Section -->
      <div class="col-span-12 lg:col-span-9 space-y-6">
        <div class="bg-white rounded-lg shadow-sm p-4">

          <!-- Post Input -->
          <div class="relative w-full max-w-md mb-4 mx-auto">
            <input
              v-model="newPost"
              type="text"
              placeholder="Say something..."
              class="pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button @click="publishPost" class="absolute right-1 top-1/2 transform -translate-y-1/2">Post</Button>
          </div>

          <!-- Posts -->
          <h2 class="text-lg font-semibold mb-4">留言</h2>
          <hr class="my-4 border-gray-300">
          <div class="space-y-4">
            <div v-for="(post, postIndex) in post_data" :key="postIndex">
              <div class="flex items-start space-x-4">
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
                    <div class="font-semibold">{{ post.app_user?.name }}</div>
                    <div class="text-gray-500 text-sm">{{ post.created_at }}</div>
                  </div>
                  <p class="text-gray-700 mt-2">{{ post.context }}</p>
                </div>
              </div>
              <div class="flex justify-end mt-2">
                <Button
                  class="bg-red-400 text-white px-4 py-2 rounded"
                  @click="deletePost(post.id, post.created_by ? post.created_by : 'null')"
                >
                  刪除
                </Button>
              </div>
              <hr class="my-4 border-gray-300" v-if="post_data && postIndex < post_data.length - 1">
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="col-span-12 lg:col-span-3 space-y-6">
        <!-- Members Section -->
        <div class="bg-white rounded-lg shadow-sm p-4">
          <h2 class="text-lg font-semibold mb-4">租屋點成員</h2>
          <hr class="mb-4 border-gray-300">
          <div class="space-y-4">
            <h2>房東： {{ landlord?.[0]?.app_user?.name }}</h2>
            <!-- Display Members -->
            <div class="flex items-center space-x-4" v-for="(student, index) in students" :key="index">
              <Avatar class="bg-slate-200 mr-3">
                <AvatarImage
                  :src="student.app_user?.avatar_url || 'default-avatar.png'"
                  alt="User Avatar"
                />
                <AvatarFallback>{{ student.app_user ? student.app_user?.name?.charAt(0) : 'U' }}</AvatarFallback>
              </Avatar>
              <div>
                <div class="font-semibold">{{ student.app_user?.name }}</div>
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

definePageMeta({
  name: "留言板",
});

//租屋點資料
const { data: property_data, pending: isLoading } = useAsyncData(async () => {
  const { data } = await supabase.from('rental_property')
    .select(`*`)
    .eq('id', current_property_id.value);
  return data;
});

//貼文資料
const { data: post_data, pending: isLoading2, refresh: refreshPosts } = useAsyncData(async () => {
  const { data } = await supabase.from('posts')
    .select(`*, app_user(name, avatar_url)`)
    .eq('rental_property_id', current_property_id.value)
    .order('created_at', { ascending: false });
  return data;
});

//租屋點房東資料
const { data: landlord, pending: isLoading3} = useAsyncData(async () => {
  const { data } = await supabase.from('rental_property')
    .select(`
      landlord_id,
      app_user(name, avatar_url)
    `)
    .eq('id', current_property_id.value);
  return data;
});

//租屋點學生資料
const { data: students, pending: isLoading4} = useAsyncData(async () => {
  const { data } = await supabase.from('map_rental_property_student')
    .select(`
      student_id,
      app_user(name, avatar_url)
    `)
    .eq('rental_property_id', current_property_id.value);
  return data;
});

//發文
const newPost = ref('');
const publishPost = async () => {
  if (!newPost.value) {
    window.alert('try to say something ~');
    return;
  }

  const { data, error } = await supabase.from('posts').insert(
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

//刪除貼文
const deletePost = async (postId: string, created_by:string) => {
  if(user.value === null || user.value === undefined){
    window.alert('請先登入');
    return;
  } 
  if(user.value.id == created_by ){
      const confirmDelete = window.confirm('確定刪除?');
    if (!confirmDelete) {
      return;
    }
    const { error } = await supabase.from('posts')
    .delete()
    .eq('id', postId);

    if (error) {
      window.alert('删除失败');
      return;
    }

    window.alert('删除成功！'); 
    refreshPosts();
  }
  else{
    window.alert('不能刪除別人的留言');
  }
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
    padding: 0.1rem 0.8rem;
    border-radius: 0.1rem;
  }
</style>
