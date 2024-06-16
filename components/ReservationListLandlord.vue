<template>
  <div class="p-6 flex items-center justify-center">
    <div class="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg border border-gray-300">
      <h2 class="text-2xl font-bold mb-6 text-center">
        預約列表(房東視角)
      </h2>
      <div class="space-y-4">
        <Card
          v-for="object in reserve_list_student"
        >
          <CardHeader>
            <CardTitle>{{ getUserContactInfo(object.student_id).name }}-與您預約看房</CardTitle>
            <CardDescription>電話:{{getUserContactInfo(object.student_id).phone }}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>預約時間: {{ object.reservation_time }}</p>
            <p>預約地點: {{ object.reservation_addr }}</p>
            <p>更多資訊:{{ object.message }}</p>
            <p>狀態: {{ object.status }}</p>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger>
                <Button
                  v-if="object.status === '邀請中'"
                  variant="outline"
                  size="sm"
                  class="border-2 border-blue-600"
                >
                  接受/拒絕預約
                </Button>
              </DialogTrigger>
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>選擇接受或拒絕，且留下訊息</DialogTitle>
                  <DialogDescription>
                    <Input v-model="message_to_student" placeholder="請輸入訊息" />
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" class="border-2 border-green-400" @click="acceptReservation(object.student_id)">接受</Button>
                  <Button variant="outline" class="border-2 border-red-400" @click="rejectReservation(object.student_id)">拒絕</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
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

const message_to_student = ref('');

//學生已經發起的預約列表
const { data: reserve_list_student, refresh } = useAsyncData(async () => {
  const { data, error } = await supabase.from("reservations")
    .select('*')
    .eq('user_id',  user.value?.id as string);
  if (error) {
    console.error(error);
    return [];
  }
  return data;
});


//預約的學生資訊
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
    userContactInfo.value[userId] = { name: data.name, phone: data.phone };
  }
  return userContactInfo.value[userId];
};

const getUserContactInfo = (userId: string) => {
  fetchUserContactInfo(userId);
  return userContactInfo.value[userId] || { name: "加載中名字...", phone: "加載中電話..." };
};
          

const acceptReservation = async (studentID: string) => {
  const { error } = await supabase
    .from('reservations')
    .update({ status: '已接受', message: message_to_student.value })
    .eq('user_id', user.value?.id as string)
    .eq('student_id', studentID as string);
  if (error) {
    console.error(error);
  } else {
    alert('接受成功');
    refresh();
  }
};

const rejectReservation = async (studentID: string) => {
  const { error } = await supabase
    .from('reservations')
    .update({ status: '已拒絕', message: message_to_student.value })
    .eq('user_id', user.value?.id as string)
    .eq('student_id', studentID as string);
  if (error) {
    console.error(error);
  } else {
    alert('拒絕成功');
    refresh();
  }
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