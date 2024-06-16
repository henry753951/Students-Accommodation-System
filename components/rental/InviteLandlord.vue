<template>
  <Card class="w-full max-w-4xl p-6 rounded-lg shadow-md flex flex-wrap">
    <div class="w-full">
      <CardHeader>
        <CardTitle>邀請房東填寫資料</CardTitle>
        <CardDescription>請將以下邀請連結發送給房東，讓他們填寫相關資料</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col">
        <div class="w-full mb-4">
          <Label for="inviteLink">邀請連結</Label>
          <div class="flex items-center mt-1">
            <Input
              id="inviteLink"
              v-model="inviteLink"
              class="block w-full"
              readonly
            />
            <Button
              variant="ghost"
              class="ml-1 border"
              @click="copyInviteLink"
            >
              複製
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-end">
        <Button @click="handleNextStep">
          完成
        </Button>
      </CardFooter>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const inviteLink = ref("https://example.com/invite?token=123456");

const copyInviteLink = () => {
  navigator.clipboard.writeText(inviteLink.value).then(() => {
    alert("邀請連結已複製到剪貼簿");
  });
};

const handleNextStep = () => {
  // 處理完成邏輯
  console.log("邀請連結已發送");
};
</script>

<style scoped>
/* 這裡可以加入一些自定義的樣式 */
</style>