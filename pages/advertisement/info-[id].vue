<template>
  <div class="bg-card min-h-screen p-10">
    <div class="max-w-4xl mx-auto space-y-6 bg-card p-6 rounded-lg shadow-lg border border-gray-300">
      <div
        v-if="rental_property && rental_property.length > 0"
        class="flex flex-col md:flex-row h-full"
      >
        <div className="md:w-1/2 h-[50vh] md:h-full">
          <img
            :src="rental_property[0].image!"
            alt="House Image"
            className="w-full h-64 object-cover"
          >
        </div>
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <div>
              <p className=" text-5xl font-bold italic">
                $NT {{ rental_property[0].rental_property_info && rental_property[0].rental_property_info.length > 0 && rental_property[0].rental_property_info[0].price ? rental_property[0].rental_property_info[0].price : 'Nothing' }}
              </p>
            </div>
            <div class="mb-5">
              <Badge class="bg-black text-white rounded mb-3">
                <h3 className="text-lg font-bold ">
                  平均評分
                </h3>
              </Badge>
              <p className="text-xl font-bold mb-3">
                {{ averageScore }} / 10
              </p>
              <div v-if="averageScore >= 5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <mask id="lineMdEmojiGrinTwotone0">
                    <path
                      fill="none"
                      stroke="#fff"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M8 14C8.5 15.5 9.79086 17 12 17C14.2091 17 15.5 15.5 16 14M8 14C9 14.5 10 15 12 15C14 15 15 14.5 16 14"
                    />
                  </mask>
                  <g fill="currentColor">
                    <path
                      fill-opacity="0"
                      stroke="currentColor"
                      stroke-dasharray="60"
                      stroke-dashoffset="60"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="2.5s"
                        values="60;0"
                      />
                      <animate
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="6s"
                        dur="0.75s"
                        values="0;0.3"
                      />
                    </path>
                    <rect
                      width="0"
                      height="7"
                      x="6"
                      y="12"
                      mask="url(#lineMdEmojiGrinTwotone0)"
                    >
                      <animate
                        fill="freeze"
                        attributeName="width"
                        begin="5s"
                        dur="1s"
                        values="0;12"
                      />
                    </rect>
                    <ellipse
                      cx="9"
                      cy="9.5"
                      fill-opacity="0"
                      rx="1"
                      ry="1.5"
                    >
                      <animate
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="3s"
                        dur="1s"
                        values="0;1"
                      />
                    </ellipse>
                    <ellipse
                      cx="15"
                      cy="9.5"
                      fill-opacity="0"
                      rx="1"
                      ry="1.5"
                    >
                      <animate
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="4s"
                        dur="1s"
                        values="0;1"
                      />
                    </ellipse>
                  </g>
                </svg>
              </div>
              <div v-else>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                >
                  <g
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                  >
                    <path
                      fill="currentColor"
                      fill-opacity="0"
                      stroke-dasharray="60"
                      stroke-dashoffset="60"
                      d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="2.5s"
                        values="60;0"
                      />
                      <animate
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="6s"
                        dur="0.75s"
                        values="0;0.3"
                      />
                    </path>
                    <path
                      fill="none"
                      stroke-dasharray="14"
                      stroke-dashoffset="14"
                      d="M8 16C8.5 15 9.79086 14 12 14C14.2091 14 15.5 15 16 16"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="5s"
                        dur="1s"
                        values="14;0"
                      />
                    </path>
                  </g>
                  <g
                    fill="currentColor"
                    fill-opacity="0"
                  >
                    <ellipse
                      cx="9"
                      cy="9.5"
                      rx="1"
                      ry="1.5"
                    >
                      <animate
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="3s"
                        dur="1s"
                        values="0;1"
                      />
                    </ellipse>
                    <ellipse
                      cx="15"
                      cy="9.5"
                      rx="1"
                      ry="1.5"
                    >
                      <animate
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="4s"
                        dur="1s"
                        values="0;1"
                      />
                    </ellipse>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="rental_property && rental_property.length > 0"
      >
        <div>
          <p class="text-3xl font-bold">
            {{ rental_property[0].address ? rental_property[0].address : 'Nothing' }}
          </p>
        </div>
        <h3 className="text-lg font-bold mb-2 mt-6">
          房屋描述
        </h3>
        <p class="text-gray-500 mb-3 break-words max-w-full">
          {{ rental_property[0].rental_property_info && rental_property[0].rental_property_info.length > 0 && rental_property[0].rental_property_info[0].description ? rental_property[0].rental_property_info[0].description : 'Nothing' }}
        </p>
        <div>
          <h3 className="text-lg font-bold ">
            上傳日期
          </h3>
          <p className="text-gray-500">
            {{ rental_property[0].created_at ? rental_property[0].created_at.substring(0, 10) : 'Nothing' }}
          </p>
        </div>
      </div>
    </div>

    
    <div class="max-w-4xl mx-auto space-y-6 bg-card p-6 rounded-lg shadow-lg border border-gray-300 mt-5">
      <div
        v-if="rental_property && rental_property.length > 0"
      >
        <div class="flex justify-center ">
          <Badge class="bg-black text-white rounded mb-3 mr-3">
            <h3 className="text-lg font-bold ">
              房型
            </h3>
          </Badge>
          <p className="text-gray-500 mr-20 text-xl font-bold">
            {{ rental_property[0].rental_property_info && rental_property[0].rental_property_info.length > 0 && rental_property[0].rental_property_info[0].price ? parsePropertyAttributes(rental_property[0].rental_property_info[0].property_attributes).type : 'Nothing' }}
          </p>
          
          <Badge class="bg-black text-white rounded mb-3 mr-3">
            <h3 className="text-lg font-bold ">
              限租性別
            </h3>
          </Badge>
          <p className="text-gray-500  mr-20 text-xl font-bold">
            {{ rental_property[0].rental_property_info && rental_property[0].rental_property_info.length > 0 && rental_property[0].rental_property_info[0].price ? parsePropertyAttributes(rental_property[0].rental_property_info[0].property_attributes).sex : 'Nothing' }}
          </p>
        
          <Badge class="bg-black text-white rounded mb-3 mr-3">
            <h3 className="text-lg font-bold ">
              補助
            </h3>
          </Badge>        
          <div
            v-if="rental_property[0].rental_property_info && rental_property[0].rental_property_info.length > 0 && rental_property[0].rental_property_info[0].price && parsePropertyAttributes(rental_property[0].rental_property_info[0].property_attributes).subsidy"
            class="mr-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 24 24"
            >
              <defs>
                <mask id="lineMdCheckAll0">
                  <g
                    fill="none"
                    stroke="#fff"
                    stroke-dasharray="22"
                    stroke-dashoffset="22"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M2 13.5l4 4l10.75 -10.75">
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="2s"
                        values="22;0"
                      />
                    </path>
                    <path
                      stroke="#000"
                      stroke-width="4"
                      d="M7.5 13.5l4 4l10.75 -10.75"
                      opacity="0"
                    >
                      <set
                        attributeName="opacity"
                        begin="2s"
                        to="1"
                      />
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="2s"
                        dur="2s"
                        values="22;0"
                      />
                    </path>
                    <path
                      d="M7.5 13.5l4 4l10.75 -10.75"
                      opacity="0"
                    >
                      <set
                        attributeName="opacity"
                        begin="2s"
                        to="1"
                      />
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="2s"
                        dur="2s"
                        values="22;0"
                      />
                    </path>
                  </g>
                </mask>
              </defs>
              <rect
                width="24"
                height="24"
                fill="currentColor"
                mask="url(#lineMdCheckAll0)"
              />
            </svg>
          </div>
          <div v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-dasharray="12"
                stroke-dashoffset="12"
                stroke-linecap="round"
                stroke-width="2"
                d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="2s"
                  values="12;0"
                />
              </path>
            </svg>
          </div>
        </div>
      </div>
    </div>


    <div
      v-if="comment_data?.length !== 0 && showUserCommentsOnly === false"
      class="max-w-4xl mx-auto space-y-6 bg-card p-6 rounded-lg shadow-lg border border-gray-300 mt-5"
    >
      <h3 className="flex justify-content text-4xl font-bold mb-4">
        評論區 <div
          v-if="user != null || user != undefined"
          class="flex ml-7"
        >
          <Button @click="switchStatus">
            {{ showUserCommentsOnly ? '顯示所有評論' : '只顯示我的評論' }}
          </Button>
        </div>
      </h3>
      <div class="bg-card">
        <h3 className="text-lg font-bold mb-1">
          留言
        </h3>
        <p className="text-gray-500 mb-3">
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
          class="bg-green-500 text-white px-4 py-2 rounded mb-2 mt-3"
          @click="sendComment"
        >
          發送
        </Button>
      </div>
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
                評論:
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
      class="max-w-4xl mx-auto space-y-6 bg-card p-6 rounded-lg shadow-lg border border-gray-300 mt-5"
    >
      <h3 className="flex justify-content text-lg font-bold mb-2">
        評論區 <div
          v-if="user != null || user != undefined"
          class="flex ml-4"
        >
          <Button
            
            @click="switchStatus"
          >
            {{ showUserCommentsOnly ? '顯示所有評論' : '只顯示我的評論' }}
          </Button>
        </div>
      </h3>
      <div class="bg-card">
        <h3 className="text-lg font-bold mb-1">
          留言
        </h3>
        <p className="text-gray-500 mb-3">
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
          class="bg-green-500 text-white px-4 py-2 rounded mb-2 mt-3"
          @click="sendComment"
        >
          發送
        </Button>
      </div>
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
                評論:
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
      class="max-w-4xl mx-auto space-y-6 bg-card p-6 rounded-lg shadow-lg border border-gray-300 mt-5"
    >
      <h3 className="flex justify-content text-lg font-bold mb-2">
        評論區 <div
          v-if="user != null || user != undefined"
          class="flex ml-4"
        >
          <Button @click="switchStatus">
            {{ showUserCommentsOnly ? '顯示所有評論' : '只顯示我的評論' }}
          </Button>
        </div>
      </h3>
      <div class="bg-card">
        <h3 className="text-lg font-bold mb-1">
          留言
        </h3>
        <p className="text-gray-500 mb-3">
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
          class="bg-green-500 text-white px-4 py-2 rounded mb-2 mt-3"
          @click="sendComment"
        >
          發送
        </Button>
      </div>
      <div class="text-center">
        <p>你目前沒有評論</p>
      </div>
    </div>
    <div
      v-else
      class="max-w-4xl mx-auto space-y-6 bg-card p-6 rounded-lg shadow-lg border border-gray-300 mt-5"
    >
      <h3 className="text-lg font-bold mb-2">
        評論區
      </h3>
      <div class="bg-card">
        <h3 className="text-lg font-bold mb-1">
          留言
        </h3>
        <p className="text-gray-500 mb-3">
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
          class="bg-green-500 text-white px-4 py-2 rounded mb-2 mt-3"
          @click="sendComment"
        >
          發送
        </Button>
      </div>
      <div class="text-center">
        <p>目前沒有評論</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import { ref, defineComponent } from 'vue';
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from '~/components/ui/toast';
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const toast = useToast();
definePageMeta({
  name: '詳細資訊',
});
defineComponent({
  name: 'LineMdClose',
});
defineComponent({
  name: 'LineMdCheckAll',
});
defineComponent({
  name: 'LineMdEmojiFrownTwotone',
});
defineComponent({
  name: 'LineMdEmojiGrinTwotone',
});
defineComponent({
  name: 'LineMdHomeMdTwotone',
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