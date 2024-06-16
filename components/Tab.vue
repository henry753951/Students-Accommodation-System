<template>
  <div class="p-2 container">
    <Tabs default-value="visit-records" v-model="internalCurrentTab" @change="emitChange" >
      <TabsList class="w-full">
        <TabsTrigger value="visit-records" class="w-full">
          訪視紀錄
        </TabsTrigger>
        <TabsTrigger value="rental-points" class="w-full">
          租屋點
        </TabsTrigger>
        <TabsTrigger value="rental-communication" class="w-full">
          租屋交流區
        </TabsTrigger>
        <TabsTrigger value="rental-platform" class="w-full">
          租屋平台
        </TabsTrigger>
      </TabsList>
      <!-- <TabsContent value="visit-records">
        
        <p>這裡是訪視紀錄的內容。</p>
      </TabsContent>
      <TabsContent value="rental-points">
        
        <p>這裡是租屋點的內容。</p>
      </TabsContent>
      <TabsContent value="rental-communication">
        
        <p>這裡是租屋交流區的內容。</p>
      </TabsContent>
      <TabsContent value="rental-platform">
        
        <p>這裡是租屋平台的內容。</p>
      </TabsContent> -->

    </Tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

const emits = defineEmits(['update:modelValue', 'change']);

const internalCurrentTab = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  internalCurrentTab.value = newValue;
});

watch(internalCurrentTab, (newValue) => {
  emits('update:modelValue', newValue);
  emits('change', newValue);
});

const emitChange = (newValue: string) => {
  internalCurrentTab.value = newValue;
};
</script>

<style>
/* 你可以在這裡添加自定義樣式 */
</style>