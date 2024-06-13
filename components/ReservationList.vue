<template>
    <div class="bg-gray-50 min-h-screen p-6 flex items-center justify-center">
      <div class="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg border border-gray-300">
        <h2 class="text-2xl font-bold mb-6 text-center">預約列表</h2>
        <div class="space-y-4">
          <Card v-for="appointment in appointments" :key="appointment.id">
            <CardHeader>
              <CardTitle>{{ appointment.name }}</CardTitle>
              <CardDescription>{{ appointment.date }}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>預約時間: {{ appointment.time }}</p>
              <p>預約地點: {{ appointment.location }}</p>
              <p>更多資訊: {{ appointment.moreInfo }}</p>
              <p>狀態: {{ appointment.completed ? '已完成' : '未完成' }}</p>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger>
                  <Button variant="outline" size="sm">查看詳情</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>預約詳情</DialogTitle>
                    <DialogDescription>
                      <p>姓名: {{ appointment.name }}</p>
                      <p>電話: {{ appointment.phone }}</p>
                      <p>日期: {{ appointment.date }}</p>
                      <p>時間: {{ appointment.time }}</p>
                      <p>地點: {{ appointment.location }}</p>
                      <p>更多資訊: {{ appointment.moreInfo }}</p>
                      <p>狀態: {{ appointment.completed ? '已完成' : '未完成' }}</p>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button @click="closeDialog">關閉</Button>
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
  
  const appointments = ref([
    { id: 1, name: '張三', phone: '123456789', date: '2024-06-10', time: '10:00 AM', location: '台北', moreInfo: '無', completed: false },
    { id: 2, name: '李四', phone: '987654321', date: '2024-06-11', time: '2:00 PM', location: '台中', moreInfo: '需要提前通知', completed: true },
    // 添加更多預約數據
  ]);
  
  const closeDialog = () => {
    // 關閉對話框的邏輯
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>