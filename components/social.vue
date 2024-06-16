<template>
  <div class="flex flex-col mx-auto h-screen p-4">
    <!-- Main Content -->
    <div class="flex-1 grid grid-cols-12 gap-4">
      <!-- Main Section -->
      <div class="col-span-12 lg:col-span-9 space-y-6">
        <div class="rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800 p-4">
          <!-- Post Input -->
          <div class="relative w-full mb-4 mx-auto flex gap-3">
            <Textarea
              v-model="newPost"
              type="text"
              placeholder="Say something..."
              class="w-full text-area"
            />
            <Button
              class="rounded-full overflow-hidden mt-auto p-5"
              @click="publishPost"
            >
              貼文
            </Button>
          </div>
          <!-- Posts -->
          <h2 class="text-lg font-semibold mb-4">
            留言
          </h2>
          <hr class="my-4 border-gray-300">
          <div class="space-y-4">
            <div
              v-for="(post, postIndex) in post_data"
              :key="postIndex"
            >
              <div class="flex items-start space-x-4 px-2">
                <!-- User Avatar -->
                <Avatar class="bg-slate-200 mr-3">
                  <AvatarImage
                    :src="post.app_user?.avatar_url || 'default-avatar.png'"
                    alt="User Avatar"
                  />
                  <AvatarFallback>
                    {{ post.app_user ? post.app_user.name?.charAt(0) : 'U' }}
                  </AvatarFallback>
                </Avatar>
                <!-- Post Content -->
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <div class="font-semibold">
                      {{ post.app_user?.name }}
                      <Badge
                        v-if="post.app_user?.student"
                        variant="secondary"
                        class="ml-2"
                      >
                        學生
                      </Badge>
                      <Badge
                        v-if="post.app_user?.teacher"
                        variant="secondary"
                        class="ml-2 bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 dark:bg-opacity-30"
                      >
                        教師
                      </Badge>
                      <Badge
                        v-if="post.app_user?.landlord"
                        variant="secondary"
                        class="ml-2 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 dark:bg-opacity-30"
                      >
                        房東
                      </Badge>
                      <Badge
                        v-if="post.app_user?.admin"
                        variant="secondary"
                        class="ml-2 bg-rose-300 text-rose-900 dark:bg-rose-400 dark:text-rose-100 dark:bg-opacity-30"
                      >
                        管理員
                      </Badge>
                    </div>
                    <div class="text-gray-500 text-sm">
                      {{ formatDate(post.created_at) }}
                    </div>
                  </div>
                  <p class="mt-2">
                    {{ post.context }}
                  </p>
                </div>
              </div>
              <div class="flex justify-end mt-2 space-x-2">
                <Button
                  v-if="user && user.id == post.created_by || user?.roles?.includes('admin')"
                  variant="ghost"
                  class="text-red-400"
                  @click="deletePost(post.id, post.created_by ? post.created_by : 'null')"
                >
                  <Icon name="mdi:trash" />
                </Button>
                <Button
                  variant="ghost"
                  class="text-red-400"
                  @click="reportPost()"
                >
                  <Icon name="mdi:alert" />
                </Button>
              </div>
              <hr class="my-4 border-gray-300">
            </div>
            <h2 class="mb-10 text-center text-2xl font-bold text-gray-800 dark:text-white">
              到底了 沒有其他留言 QQ
            </h2>
          </div>
        </div>
      </div>
      <!-- Sidebar -->
      <div class="col-span-12 lg:col-span-3 space-y-6">
        <!-- Members Section -->
        <div class="rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800 p-4">
          <h2 class="text-lg font-semibold mb-4">
            租屋點成員
          </h2>
          <hr class="mb-4 border-gray-300">
          <div class="space-y-4">
            <h2>房東： {{ landlord?.[0]?.app_user?.name }}</h2>
            <!-- Display Members -->
            <div
              v-for="(student, index) in students"
              :key="index"
              class="flex items-center space-x-4"
            >
              <Avatar class="bg-slate-200 mr-3">
                <AvatarImage
                  :src="student.app_user?.avatar_url || 'default-avatar.png'"
                  alt="User Avatar"
                />
                <AvatarFallback>
                  {{ student.app_user ? student.app_user?.name?.charAt(0) : 'U' }}
                </AvatarFallback>
              </Avatar>
              <div>
                <div class="font-semibold">
                  {{ student.app_user?.name }}
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
import type { Database, Tables, Enums, Json } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
const supabase = useSupabaseClient<Database>();
const user = await useAsyncUser();
const toast = useToast();

const props = defineProps({
    propertyId: {
        type: String,
        default: "",
    },
});
const current_property_id = ref<string>(props.propertyId);

//租屋點資料
const { data: property_data, pending: isLoading } = useAsyncData(async () => {
    const { data } = await supabase.from('rental_property')
        .select(`*`)
        .eq('id', current_property_id.value)
        .single();
    return data;
});

//貼文資料
const { data: post_data, pending: isLoading2, refresh: refreshPosts } = useAsyncData(async () => {
    const { data } = await supabase.from('posts')
        .select(`*, app_user(name, avatar_url, student(*), teacher(*), landlord(*), admin(*) )`)
        .eq('rental_property_id', current_property_id.value)
        .order('created_at', { ascending: false });
    return data;
});

//租屋點房東資料
const { data: landlord, pending: isLoading3 } = useAsyncData(async () => {
    const { data } = await supabase.from('rental_property')
        .select(`
        landlord_id,
        app_user(name, avatar_url)
       `)
        .eq('id', current_property_id.value);
    return data;
});

//租屋點學生資料
const { data: students, pending: isLoading4 } = useAsyncData(async () => {
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
        toast.toast({
            title: 'try to say something ~'
        });
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
        toast.toast({
            title: '發送失敗'
        });
        return;
    }
    newPost.value = '';
    toast.toast({
        title: '發送成功'
    });
    refreshPosts();
    return;
};

//刪除貼文
const deletePost = async (postId: string, created_by: string) => {
    if (user.value === null || user.value === undefined) {
        toast.toast({
            title: '請先登入'
        });
        return;
    }

    const confirmDelete = window.confirm('確定刪除?');
    if (!confirmDelete) {
        return;
    }
    const { error } = await supabase.from('posts')
        .delete()
        .eq('id', postId);

    if (error) {
        toast.toast({
            title: '刪除失敗'
        });
        return;
    }

    toast.toast({
        title: '刪除成功'
    });
    refreshPosts();

};

//檢舉貼文
const reportPost = async () => {
    toast.toast({
        title: '檢舉成功'
    });
    return;
};

</script>
<style scoped>
.text-area:focus-visible {
    box-shadow: none;
}
</style>