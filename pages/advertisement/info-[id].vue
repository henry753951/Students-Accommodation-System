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
              留言
            </h3>
            <p className="text-gray-500">
              <Input
                v-model="comment"
                placeholder="Comment"
              />
            </p>
            <h3 className="text-lg font-bold mb-2">
              評分
            </h3>
            <p className="text-gray-500 mb-2">
              <Input
                v-model="score"
                placeholder="0 ~ 10"
              />
            </p>
            <Button
              class="bg-green-500 text-white px-4 py-2 rounded mb-2"
              @click="sendComment"
            >
              發送
            </Button>
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
                {{ rental_property[0].rental_property_info && rental_property[0].rental_property_info.length > 0 && rental_property[0].rental_property_info[0].price ? (parsePropertyAttributes(rental_property[0].rental_property_info[0].property_attributes).subsidy ? '有' : '無') : 'Nothing' }}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                上傳日期
              </h3>
              <p className="text-gray-500">
                {{ rental_property[0].created_at ? rental_property[0].created_at.substring(0, 10) : 'Nothing' }}
              </p>
            </div>
            <div class="mb-5">
              <h3 className="text-lg font-bold mb-2">
                平均評分
              </h3>
              <p className="text-gray-500">
                {{ averageScore }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="comment_data?.length !== 0 && showUserCommentsOnly === false"
      class="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300 mt-5"
    >
      <h3 className="text-lg font-bold mb-2">
        評論區 <div v-if="user != null || user != undefined">
          <Button @click="switchStatus">
            {{ showUserCommentsOnly ? '顯示所有評論' : '只顯示我的評論' }}
          </Button>
        </div>
      </h3>
      <div
        v-for="items in comment_data"
        :key="items.id"
        class="mb-4"
      >
        <Card>
          <CardHeader class="border-b border-gray-200 dark:border-gray-700 pb-4">
            <div class="flex items-center ">
              <Avatar class="bg-slate-200 mr-3">
                <AvatarImage
                  :src="items.app_user && items.app_user.avatar_url ? items.app_user.avatar_url : 'null'"
                  alt="@radix-vue"
                />
                <AvatarFallback>name</AvatarFallback>
              </Avatar>
              <span class="font-semibold mr-5">{{ items.app_user ? items.app_user.name : '訪客' }}</span>
              <div class="flex items-center ">
                {{ items.score }}/10
              </div>
              <div class="ml-auto">
                <Button
                  class="bg-red-400 text-white px-4 py-2 rounded ml-auto"
                  @click="deleteComment(items.id, items.user_id ? items.user_id : 'null')"
                >
                  刪除評論
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent class="py-4">
            <div class="mt-2 text-left">
              <h3 class="font-semibold">
                - 評論
              </h3>
              <p>
                {{ items.comment }}
              </p>
            </div>
            <div class="mt-4 text-left">
              <!-- Add more agenda items here -->
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    <div
      v-else-if="userComments.length !== 0 && showUserCommentsOnly === true"
      class="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300 mt-5"
    >
      <h3 className="text-lg font-bold mb-2">
        評論區 <div v-if="user != null || user != undefined">
          <Button @click="switchStatus">
            {{ showUserCommentsOnly ? '顯示所有評論' : '只顯示我的評論' }}
          </Button>
        </div>
      </h3>
      <div
        v-for="items in userComments"
        :key="items.id"
        class="mb-4"
      >
        <Card>
          <CardHeader class="border-b border-gray-200 dark:border-gray-700 pb-4">
            <div class="flex items-center ">
              <Avatar class="bg-slate-200 mr-3">
                <AvatarImage
                  :src="items.app_user && items.app_user.avatar_url ? items.app_user.avatar_url : 'null'"
                  alt="@radix-vue"
                />
                <AvatarFallback>name</AvatarFallback>
              </Avatar>
              <span class="font-semibold mr-5">{{ items.app_user ? items.app_user.name : '訪客' }}</span>
              <div class="flex items-center ">
                {{ items.score }}/10
              </div>
              <div class="ml-auto">
                <Button
                  class="bg-red-400 text-white px-4 py-2 rounded ml-auto"
                  @click="deleteComment(items.id, items.user_id ? items.user_id : 'null')"
                >
                  刪除評論
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent class="py-4">
            <div class="mt-2 text-left">
              <h3 class="font-semibold">
                - 評論
              </h3>
              <p>
                {{ items.comment }}
              </p>
            </div>
            <div class="mt-4 text-left">
              <!-- Add more agenda items here -->
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    <div
      v-else-if="userComments.length == 0 && showUserCommentsOnly === true && comment_data?.length !== 0"
      class="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300 mt-5"
    >
      <h3 className="text-lg font-bold mb-2">
        評論區 <div v-if="user != null || user != undefined">
          <Button @click="switchStatus">
            {{ showUserCommentsOnly ? '顯示所有評論' : '只顯示我的評論' }}
          </Button>
        </div>
        <div class="text-center">
          <p>你目前沒有評論</p>
        </div>
      </h3>
    </div>
    <div
      v-else
      class="max-w-4xl mx-auto space-y-6 bg-white p-6 rounded-lg shadow-lg border border-gray-300 mt-5"
    >
      <h3 className="text-lg font-bold mb-2">
        評論區
      </h3>
      <div class="text-center">
        <p>目前沒有評論</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import { ref } from 'vue';
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from '~/components/ui/toast';
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const toast = useToast();
definePageMeta({
  name: '詳細資訊',
});

const route = useRoute();
const department_id = ref(route.params.id);
const showUserCommentsOnly = ref(false);

const { data: rental_property, error, refresh: refreshSite } = useAsyncData(async () => {
  const { data } = await supabase.from('rental_property').select(`
    *,
    rental_property_info (
      *
    )
  `).eq('id', department_id.value);
  return data;
});

const { data: comment_data, error: error2, refresh: refreshSite2 } = useAsyncData(async () => {
  const { data } = await supabase.from('advertise_comment').select(`
    id,
    user_id,
    comment,
    score,
    app_user (
      name,
      avatar_url
    )
  `).eq('rental_property_id', department_id.value);
  return data;
});


const userComments = computed(() => {
  if (user.value == null) return [];
  if (!comment_data.value || !user.value) return [];
  return comment_data.value.filter(comment => comment.user_id === user.value!.id);
});
const averageScore = computed(() => {
  if (!comment_data.value) return 0;
  return comment_data.value.reduce((acc, cur) => acc + cur.score!, 0) / comment_data.value.length;
});
const comment = ref('');
const score = ref();

const sendComment = async () => {
  if (user.value === null || user.value === undefined) {
    toast.toast({
      title: '請先登入',
      variant: 'destructive',
    });
    return;
  }

  if (!comment.value || !score.value) {
    toast.toast({
      title: '請填寫評論與評分',
      variant: 'destructive',
    });
    return;
  }
  if (score.value < 0 || score.value > 10) {
    toast.toast({
      title: '評分範圍為 0 ~ 10',
      variant: 'destructive',
    });
    return;
  }
  const { data, error } = await supabase.from('advertise_comment').insert(
    {
      rental_property_id: (department_id.value).toString(),
      user_id: user.value.id,
      comment: comment.value,
      score: score.value,
    }
  );
  if (error) {
    toast.toast({
      title: '發送失敗',
      variant: 'destructive',
    });
    return;
  }
  comment.value = '';
  score.value = '';
  toast.toast({
    title: '發送成功',
  });
  refreshSite();
  refreshSite2();
  return;
};


const deleteComment = async (commentId: string, userId: string) => {
  if (user.value === null || user.value === undefined) {
    toast.toast({
      title: '請先登入',
      variant: 'destructive',
    });
    return;
  }
  if (userId == user.value.id) {
    if (!user.value) return;
    const { error } = await supabase.from('advertise_comment').delete().eq('id', commentId);
    if (error) {
      console.error(error);
      toast.toast({
        title: '刪除失敗',
        variant: 'destructive',
      });
    } else {  
      toast.toast({
        title: '刪除成功',
      });
    }
    refreshSite2();
    return;
  }
  else {
    toast.toast({
      title: '你沒有權限刪除此評論',
      variant: 'destructive',
    });
  }
};

function switchStatus() {
  showUserCommentsOnly.value = !showUserCommentsOnly.value;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePropertyAttributes(attr: string | any) {
  try {
    return JSON.parse(attr);
  } catch (e) {
    console.error('Error parsing property attributes:', e);
    return {};
  }
}
</script>
<style></style>