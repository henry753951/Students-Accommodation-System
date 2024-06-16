<template>
    <div>
      <input type="file" @change="onFileChange" />
      <button @click="uploadImage">上傳圖片</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { createClient } from '@supabase/supabase-js'
  import type { Database, Tables, Enums } from "~/database.types";
  import { useToast } from "~/components/ui/toast/use-toast";
  const toast = useToast();
  const supabase = useSupabaseClient<Database>();
  
  // 初始化 Supabase 客戶端
  
  const selectedFile = ref<File | null>(null)
  
  
  
  const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      selectedFile.value = target.files[0]
    }
  }
  
  const uploadImage = async () => {
    if (!selectedFile.value) {
      alert('請選擇一個文件')
      return
    }
  
    // const user = supabase.auth.user();
    // if (!user) {
    //   alert('請先登錄');
    //   return;
    // }
  
    // 獲取用戶的 uuid
    const { data: userData, error: userError } = await supabase
      .from('app_user')
      .select('id')
      .eq('id', "77bfd169-c679-473c-9c93-fc26679d7216")
      .single();
  
  
    const user = await useAsyncUser();
    console.log(user);
    // if (userError || !userData) {
    //   console.error('獲取用戶信息失敗:', userError?.message);
    //   return;
    // }
  
    const file = selectedFile.value
    const fileName = `${Date.now()}_${file.name}`
    let folderPath = ref("");
    // folderPath.value = `${user.id}/`
  
    // 檢查並創建用戶資料夾
    const { error: folderError } = await supabase
      .storage
      .from('images')
      .upload(`${folderPath}.keep`, new Blob(), {
        cacheControl: '3600',
        upsert: false,
      })
  
    if (folderError && folderError.message !== 'The resource already exists') {
      console.error('創建資料夾失敗:', folderError.message)
      return;
    }
  
    // 上傳文件到用戶資料夾
    const { data, error } = await supabase
      .storage
      .from('images')
      .upload(`${folderPath}${fileName}`, file, {
        cacheControl: '3600',
        upsert: false,
      })
  
    if (error) {
      console.error('上傳失敗:', error.message)
    } else {
      console.log('上傳成功:', data)
    }
  }
  </script>
  
  <style scoped>
  /* 你的 CSS 代碼 */
  </style>