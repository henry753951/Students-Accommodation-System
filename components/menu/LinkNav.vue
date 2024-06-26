<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
const user = await useAsyncUser();
type menuItem = {
  title: string;
  href: string;
  description: string;
  roles: string[] | null;
};
// 定義選單項目
const menu_ = ref({
  管理系統: [
    {
      title: '使用者管理',
      href: '/management/user',
      description: '管理和控制所有系統使用者的訪問和權限。',
      roles: ['admin']
    },
    {
      title: '系所管理',
      href: '/management/department',
      description: '管理大學各系所的設置和運營。',
      roles: ['admin']
    },
    {
      title: '訪視紀錄管理',
      href: '/interview/record',
      description: '管理所有訪視記錄或新增記錄。',
      roles: ['admin']
    },
    {
      title: '租屋點管理',
      href: '/social',
      description: '管理所有租屋點及相關平台。',
      roles: ['admin']
    },
  ],
  教師系統: [
    {
      title: '旗下學生管理',
      href: '/teacher/students',
      description: '管理教師和學生之間的互動和分配。',
      roles: ['teacher']
    },
  ],
  房東專區: [
    {
      title: '我的出租點',
      href: '/landlord',
      description: '查看和管理您的出租點信息。',
      roles: ['landlord']
    },
  ],
  // 訪視系統: [
  //   { 
  //     title: '訪視記錄清單', 
  //     href: '/interview/record',
  //     description: '管理所有訪視記錄或新增記錄。' 
  //   },
  //   { 
  //     title: '預約訪視行程', 
  //     href: '/reserve-interview',
  //     description: '進行校外訪視的預約。' 
  //   },
  // ],
  學生專區: [
    {
      title: '我的租屋點',
      href: '/rentals',
      description: '查看和管理您的租屋點信息。',
      roles: ['student']
    },
  ],
  // 租屋平台: {
  //   title: '租屋平台',
  //   href: '/advertisement',
  //   description: '瀏覽和查找租屋廣告信息。',
  //   roles: null
  // },
  // 租屋點交流區: { 
  //   title: '租屋點交流區', 
  //   href: '/social',
  //   description: '租屋點成員交流。' 
  // },
} as Record<string, menuItem[] | menuItem>);
const menu = computed(() => {
  return Object.fromEntries(
    Object.entries(menu_.value).map(([key, value]) => {
      if (Array.isArray(value)) {
        return [
          key,
          value.filter((item) => {
            if (item.roles === null) {
              return true;
            }
            if (user.value === null) {
              return false;
            }
            return item.roles.some((role) => user.value!.roles.includes(role));
          }),
        ];
      }
      return [key, value];
    })
  );
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
          v-if="Array.isArray(items)&&items.length>0"
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
                      {{ item.description }}
                    </p>
                  </div>
                </NavigationMenuLink>
              </NuxtLink>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <!-- 單一項目 -->
        <NavigationMenuItem
          v-if="!Array.isArray(items)"
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
