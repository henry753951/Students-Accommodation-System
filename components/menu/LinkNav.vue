<script setup lang="ts">
import { ref } from 'vue';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

// 定義選單項目
const menu = ref({
  管理系統: [
    { title: '使用者管理', href: '/management/user' },
    { title: '系所管理', href: '/management/department' },
  ],
  教師系統: [
    { title: '旗下學生管理', href: '/map_teacher_student' },
  ],
  我的租屋點: { title: '我的租屋點', href: '/rentals' },
  租屋平台: { title: '租屋平台', href: '/advertisement' },
});
</script>
<template>
  <NavigationMenu>
    <NavigationMenuList>
      <template
        v-for="(items, key) in menu"
        :key="key"
      >
        <!-- 檢查是否為陣列 -->
        <NavigationMenuItem
          v-if="Array.isArray(items)"
          :key="`${key}-array`"
        >
          <NavigationMenuTrigger>
            {{ key }}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-1">
              <NuxtLink
                v-for="item in items"
                :key="item.title"
                :to="item.href"
              >
                <NavigationMenuLink :class="navigationMenuTriggerStyle()">
                  <div class="flex flex-col gap-2 justify-start">
                    <div>
                      {{ item.title }}
                    </div>
                    <p class="text-center text-muted-foreground">
                      12312313213
                    </p>
                  </div>
                </NavigationMenuLink>
              </NuxtLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <!-- 單一項目 -->
        <NavigationMenuItem
          v-else
          :key="`${key}-single`"
        >
          <NuxtLink :to="items.href">
            <NavigationMenuLink :class="navigationMenuTriggerStyle()">
              {{ items.title }}
            </NavigationMenuLink>
          </NuxtLink>
        </NavigationMenuItem>
      </template>
    </NavigationMenuList>
  </NavigationMenu>
</template>
