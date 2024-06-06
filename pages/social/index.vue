<template>
  <div class="bg-gray-50 min-h-screen p-6">
    <Card class="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300">
      <div>
        <input v-model="newPostTitle" class="w-full p-2 border rounded-md mb-4" placeholder="輸入標題">
        <textarea v-model="newPostContent" class="w-full p-2 border rounded-md mb-4" placeholder="輸入你的貼文內容"></textarea>
        <Select v-model="newRating" class="w-48 border border-gray-300 rounded">
          <SelectTrigger>
            <SelectValue placeholder="選擇星數" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>星數</SelectLabel>
              <SelectItem v-for="n in 5" :key="n" :value="String(n)">{{ n }} 星</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <br>
        <div class="flex justify-end">
          <Button @click="publishPost" class="bg-green-500 text-white px-4 py-2 rounded-md">
            發布貼文
          </Button>
        </div>
      </div>
      <h1>其他人的貼文</h1>
      <Card v-for="post in posts" :key="post.id" class="post p-4 mb-4 border rounded-md">
        <Button @click="reportPost(post.id)" class="report-button absolute bg-red-500 text-white px-2 py-2 rounded">
          檢舉貼文
        </Button>
        <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        <p class="text-sm text-gray-500 mb-2">發布者: {{ post.app_user?.name }}</p>
        <p class="text-sm text-gray-500 mb-2">發布時間: {{ post.created }}</p>
        <p class="mb-2">{{ post.content }}</p>
        <p class="text-sm text-gray-500">租屋地點: {{ post.rental_property?.address }}</p>
        <div class="comments mt-4">
          <div class="comments mt-4" v-if="post.comments && post.comments.length > 0">
            <div v-for="comment in post.comments" :key="comment.id" class="comment p-2 border-t">
              <p class="text-gray-500">留言者: {{ comment.user_id }}</p>
              <p class="text-gray-500">留言時間: {{ new Date(comment.created).toLocaleString() }}</p>
              <p>{{ comment.comment }}</p>
              <Button @click="reportComment(comment.id)" class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                檢舉留言
              </Button>
            </div>
          </div>
        </div>
        <form @submit.prevent="addComment(post.id)" class="mt-4 flex gap-2">
          <input v-model="newComment" class="flex-grow p-2 border rounded-md" placeholder="添加評論"/>
          <Button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">發布</Button>
        </form>
      </Card>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Database } from "~/database.types";
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

definePageMeta({
  name: "租屋資訊交流平台",
});

const newPostTitle = ref('')
const showPostForm = ref(false);
const newPostContent = ref('');
const newRating = ref('');

const publishPost = async () => {
  if (!user.value) {
    console.error('User is not logged in.');
    return;
  }

  if (!newPostTitle.value.trim() || !newPostContent.value.trim() || !newRating.value) {
    alert('請輸入標題、內容和評分');
    return;
  }

  const { data, error } = await supabase.from('posts').insert({
    user_id: user.value.id,
    title: newPostTitle.value,
    content: newPostContent.value,
    location_id: '租屋地點',
    created: new Date().toISOString(),
    score: Number(newRating.value),
  });

  if (error) {
    console.error(error);
    return;
  }

  newPostTitle.value = '';
  newPostContent.value = '';
  newRating.value = '';
  showPostForm.value = false;

  window.alert('貼文發布成功！');
  refreshPosts();
};

const newComment = ref('');

const addComment = async (postId: string) => {
  if (!user.value || !posts.value) return;

  if (!newComment.value.trim()) return;

  const { data, error } = await supabase.from('comments').insert({
    post_id: postId,
    comment: newComment.value,
    user_id: user.value.id,
    created: new Date().toISOString(),
  });

  const post = posts.value.find(p => p.id === postId);
  if (post && data) {
    post.comments.push(data[0]);
  }

  newComment.value = '';

  window.alert('發布成功！');
  refreshPosts();
};

const reportComment = async (commentId: string) => {
  if (!user.value) return;
  const { error } = await supabase.from('report').insert({
    user_id: user.value.id,
    post_id: null,
    comment_id: commentId,
    created: new Date().toISOString(),
  });
  if (error) {
    console.error(error);
    window.alert('檢舉失敗');
  } else {
    window.alert('檢舉成功');
  }
}

const reportPost = async (postId: string) => {
  if (!user.value) return;
  const { error } = await supabase.from('report').insert({
    user_id: user.value.id,
    post_id: postId,
    comment_id: null,
    created: new Date().toISOString(),
  });
  if (error) {
    console.error(error);
    window.alert('檢舉失敗');
  } else {
    window.alert('檢舉成功');
  }
};

const { data: posts, pending: isLoading, refresh: refreshPosts } = useAsyncData('posts', async () => {
  const { data: postData, error } = await supabase
    .from('posts')
    .select(`
      *,
      app_user (name),
      rental_property (address),
      comments (*)
    `)
    .order('created', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  const postsWithComments = postData.map(post => ({
    ...post,
    comments: post.comments || [],
  }));

  return postsWithComments;
});



</script>

<style scoped>
.post {
  border: 1px solid #ccc;
  position: relative;
}
.comment {
  border-top: 1px solid #eee;
  position: relative;
}
.report-button {
  top: 0.5rem;
  right: 0.5rem;
}
</style>
