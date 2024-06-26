<template>
  <div class="p-6 flex items-center justify-center">
    <div class="max-w-4xl w-full bg-card p-6 rounded-lg shadow-lg border ">
      <h2 class="text-2xl font-bold mb-6 text-center">
        您送出的預約列表
      </h2>
      <div class="space-y-4">
        <Card
          v-for="(object, index) in reserve_list_student"
          :key="index"
        >
          <CardHeader>
            <CardTitle>{{ getUserContactInfo(object.user_id!).name }} - {{ object.reservation_type }}</CardTitle>
            <CardDescription>聯絡電話：{{ getUserContactInfo(object.user_id!).phone ? getUserContactInfo(object.user_id!).phone : '無' }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>預約時間：{{ object.reservation_time.split('T')[0] }}</p>
            <p>預約地點：{{ object.reservation_addr ? object.reservation_addr : '無' }}</p>
            <p v-if="object.status === '邀請中'">
              預約備註：{{ object.message ? object.message : '無' }}
            </p>
            <p>預約狀態：{{ object.status }}</p>
            <p v-if="object.status !== '邀請中'">
              預約回應：{{ object.message ? object.message : '無' }}
            </p>
          </CardContent>
          <!-- <CardFooter>
            <Dialog>
              <DialogTrigger>
                <Button
                  variant="outline"
                  size="sm"
                >
                  查看詳情
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>預約詳情</DialogTitle>
                  <DialogDescription />
                </DialogHeader>
                <DialogFooter />
              </DialogContent>
            </Dialog>
          </CardFooter> -->
          <CardFooter>
            <Badge
              v-if="object.status === '邀請中'"
              variant="outline"
              size="sm"
              class="border-2 border-sky-600"
            >
              {{ object.status }}
            </Badge>
            <Badge
              v-if="object.status === '已拒絕'"
              variant="outline"
              size="sm"
              class="border-2 border-red-600"
            >
              {{ object.status }}
            </Badge>
            <Badge
              v-if="object.status === '已接受'"
              variant="outline"
              size="sm"
              class="border-2 border-green-600"
            >
              {{ object.status }}
            </Badge>
          </CardFooter>
        </Card>
        <div
          v-if="!reserve_list_student?.length"
          class="text-center text-gray-500"
        >
          沒有送出的預約
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import type { Database } from '~/database.types';

const router = useRouter();
const supabase = useSupabaseClient<Database>();
const user = useUser();

//學生已經發起的預約列表
const { data: reserve_list_student, refresh } = useAsyncData(async () => {
  const { data, error } = await supabase.from("reservations")
    .select('*')
    .eq('student_id',  user.value?.id as string)
    .order('created_time', { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return data;
});


//房東資訊
const userContactInfo = ref<Record<string, { name: string, phone: string }>>({});

const fetchUserContactInfo = async (userId: string) => {
  if (!userContactInfo.value[userId]) {
    const { data, error } = await supabase
      .from('app_user')
      .select('name, phone')
      .eq('id', userId)
      .single();
    if (error) {
      console.error(error);
      return { name: "未知姓名", phone: "未知電話" };
    }
    userContactInfo.value[userId] = { name: data.name!, phone: data.phone! };
  }
  return userContactInfo.value[userId];
};

const getUserContactInfo = (userId: string) => {
  fetchUserContactInfo(userId);
  return userContactInfo.value[userId] || { name: "加載中名字...", phone: "加載中電話..." };
};
          

const closeDialog = () => {
  // 關閉對話框的邏輯
};
</script>

<style scoped>
/* 確保文本可以被選擇 */
* {
  user-select: text;
}
</style>