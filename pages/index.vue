<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <div class="container w-2/3 mb-10 ">
      <h1 class="text-2xl">
        房屋廣告公告
      </h1>
      <Carousel
        class="relative w-full "
        @init-api="(val) => emblaMainApi = val"
      >
        <CarouselContent class="w-full">
          <CarouselItem
            v-for="(_, index) in items"
            :key="index"
          >
            <div class="p-1">
              <Card>
                <CardContent class="flex  items-center justify-center p-6 ">
                  <span class="">{{ _.content }}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Carousel
        class="relative w-full max-w-xs"
        @init-api="(val) => emblaThumbnailApi = val"
      />
    </div>
    <div class="container w-2/3 p-6">
      <div class="w-full mx-auto space-y-6 bg-card p-6 rounded-lg">
        <div class="flex justify-end mb-4">
          <Select
            v-model="selectedFilter"
            class="w-48 border border-gray-300 rounded"
          >
            <SelectTrigger>
              <SelectValue placeholder="選擇篩選條件" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>排序條件</SelectLabel>
                <SelectItem value="all">
                  全部
                </SelectItem>
                <SelectItem value="price_low_to_high">
                  價格：低到高
                </SelectItem>
                <SelectItem value="price_high_to_low">
                  價格：高到低
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div
            v-for="property in filteredProperties"
            :key="property.id"
            class="mb-6"
          >
            <Card
              class="rounded-lg shadow-lg overflow-hidden border cursor-pointer"
            >
              <div class="flex">
                <div class="relative w-4/12 ">
                  <img
                    :src="property.image!"
                    alt="House Image"
                    class="w-full h-60 object-cover"
                    @click="navigateTo('/advertisement/info-' + property.id)"
                  >
                </div>
                <div class="w-5/12 gap-5 ml-3 mt-3">
                  <div>
                    <h3
                      class="text-2xl font-bold"
                      @click="navigateTo('/advertisement/info-' + property.id)"
                    >
                      {{ property.address }}
                    </h3>
                  </div>
                  <div class="mt-2">
                    <template v-for="_ in parseInt((getAvgScore(property.advertise_comment!)/2).toFixed(1)) ">
                      ⭐
                    </template>
                    <Icon
                      class="text-blue-400"
                      name="subway:location-3"
                      size="15"
                    />
                    <a
                      class="text-blue-400 mt-2 text-sm"
                      :href="'https://www.google.com/maps/search/?api=1&query='+property.address"
                      target="_blank" 
                    >查看地圖 </a>
                  </div>
                  <div class="mt-2">
                    <div class="flex justify-content ">
                      <div
                        v-if="parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).type"
                        class="flex items-center space-x-2 mb-4"
                      >
                        <Badge class="text-black px-2 py-1 rounded-sm bg-card border-gray-400 dark:text-gray-200">
                          {{ property.rental_property_info.length &&
                            property.rental_property_info[0]?.property_attributes ?
                              parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).type : '無資料' }}
                        </Badge>
                      </div>
                      <div
                        v-if="parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).genderRestriction && (parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).genderRestriction === '男' || parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).genderRestriction === '女')"
                        class="flex items-center space-x-2 mb-4 ml-2"
                      >
                        <Badge class="text-black px-2 py-1 rounded-sm bg-card border-gray-400 dark:text-gray-200">
                          {{ property.rental_property_info.length &&
                            property.rental_property_info[0]?.property_attributes ?
                              parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).genderRestriction
                            :
                              '無資料' }}
                        </Badge>
                      </div>
                      <div
                        v-if="parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).rentalSubsidy"
                        class="flex items-center space-x-2 mb-4 ml-2"
                      >
                        <Badge class="text-black px-2 py-1 rounded-sm bg-card border-gray-400 dark:text-gray-200">
                          {{ property.rental_property_info.length &&
                            property.rental_property_info[0]?.property_attributes ?
                              (parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).rentalSubsidy
                                ?
                                  '有補助' : '無補助') : '無資料' }}
                        </Badge>
                      </div>
                      <div
                        v-else
                        class="flex items-center space-x-2 mb-4"
                      >
                        <Badge class="invisible px-2 py-1 rounded">
                          123
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div
                    @click="navigateTo('/advertisement/info-' + property.id)"
                  >
                    <p class="text-gray-600  truncate mt-3 text-base font-sans ">
                      {{ property.rental_property_info.length ? property.rental_property_info[0].description : '尚無描述' }}
                    </p>
                  </div>
                </div>
                <div class="w-3/12 flex flex-col border h-60 justify-between ">
                  <div class="flex justify-end m-2">
                    <div class="">
                      <div class="text-gray-400 font-sans text-[12px] mr-2 mt-3">
                        {{ property.advertise_comment.length }} 則評論
                      </div>
                    </div>
                    <div
                      class="p-2 border-2 rounded-lg w-[40px] h-[40px] text-[15px] font-semibold flex justify-center items-center"
                      :class="{
                        'text-blue-500 border-blue-500': getAvgScore(property.advertise_comment!) >= 7,
                        'text-green-500 border-green-500': getAvgScore(property.advertise_comment!) >= 3 && getAvgScore(property.advertise_comment!) < 7,
                        'text-yellow-500 border-yellow-500': getAvgScore(property.advertise_comment!) < 3
                      }"
                    >
                      {{ getAvgScore(property.advertise_comment!) }}
                    </div>
                  </div>
                  <div class="flex flex-col items-end mr-2">
                    <div class="text-[18px]">
                      月租費
                    </div>
                    <div class="text-[22px] font-semibold text-red-600 ">
                      {{ property.rental_property_info.length ? `$ NT ${property.rental_property_info[0].price}` : '尚無價位'
                      }}
                    </div>
                    <div class="flex mb-2 gap-3">
                      <div v-if="user != null || user != undefined">
                        <ReservationInviteDrawer
                          v-if="user"
                          v-model:inviter="user.id"
                          v-model:invitee="property.landlord_id"
                          v-model:reservation_type="ReserveType"
                          v-model:propertyId="property.id"
                        />
                      </div>
                      <NuxtLink :to="'/advertisement/info-' + property.id">
                        <Button class="bg-green-500 text-white px-4 py-1 rounded">
                          詳細
                        </Button>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="property in filteredProperties" :key="property.id" class="mb-6">
            <Card class="rounded-lg shadow-lg overflow-hidden border border-gray-300">
              <div class="relative">
                <img :src="property.image!" alt="House Image" class="w-full h-64 object-cover">
                <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
                <div class="absolute bottom-0 left-0 p-4 text-white">
                  <h2 class="text-2xl font-bold">
                    {{ property.address }}
                  </h2>
                </div>
              </div>
              <div class="p-6">
                <div class="flex justify-content ">
                  <div v-if="parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).type"
                    class="flex items-center space-x-2 mb-4">
                    <Badge class="bg-blue-500 text-white px-2 py-1 rounded">
                      {{ property.rental_property_info.length && property.rental_property_info[0]?.property_attributes ?
                        parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).type : '無資料' }}
                    </Badge>
                  </div>
                  <div
                    v-if="parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).genderRestriction && (parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).genderRestriction === '男' || parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).genderRestriction === '女')"
                    class="flex items-center space-x-2 mb-4 ml-4">
                    <Badge class="bg-blue-500 text-white px-2 py-1 rounded">
                      {{ property.rental_property_info.length && property.rental_property_info[0]?.property_attributes ?
                        parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).genderRestriction :
                        '無資料' }}
                    </Badge>
                  </div>
                  <div
                    v-if="parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).rentalSubsidy"
                    class="flex items-center space-x-2 mb-4 ml-4">
                    <Badge class="bg-blue-500 text-white px-2 py-1 rounded">
                      {{ property.rental_property_info.length && property.rental_property_info[0]?.property_attributes ?
                        (parsePropertyAttributes(property.rental_property_info[0]?.property_attributes).rentalSubsidy ?
                          '有補助' : '無補助') : '無資料' }}
                    </Badge>
                  </div>
                  <div v-else class="flex items-center space-x-2 mb-4">
                    <Badge class="invisible px-2 py-1 rounded">
                      123
                    </Badge>
                  </div>
                </div>
                <p class="text-gray-700 mb-4 truncate">
                  {{ property.rental_property_info.length ? property.rental_property_info[0].description : '尚無描述' }}
                </p>
                <div class="flex justify-between items-center mb-4">
                  <div class="text-lg font-semibold text-green-600">
                    {{ property.rental_property_info.length ? `$${property.rental_property_info[0].price}` : '尚無價位' }}
                  </div>
                  <div v-if="user != null || user != undefined">
                    <ReservationInviteDrawer v-if="user" v-model:inviter="user.id"
                      v-model:invitee="property.landlord_id" v-model:reservation_type="ReserveType"
                      v-model:propertyId="property.id" />
                  </div>
                  <NuxtLink :to="'/advertisement/info-' + property.id">
                    <Button class="bg-green-500 text-white px-4 py-2 rounded">
                      詳細
                    </Button>
                  </NuxtLink>
                </div>
              </div>
            </Card>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import type { Database, Tables, Enums, Json } from "~/database.types";
import { watchOnce } from '@vueuse/core';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
const supabase = useSupabaseClient<Database>();
const ReserveType = ref('預約看房');
const user = useUser();
const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value)
    return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value)
    return;
  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi)
    return;

  onSelect();
  emblaMainApi.on('select', onSelect);
  emblaMainApi.on('reInit', onSelect);
});


definePageMeta({
  name: "房屋廣告頁面",
});

const { data: rental_property, pending: isLoading, refresh: refresh } = await useAsyncData('rental_property', async () => {
  const { data } = await supabase.from('rental_property').select(`*,rental_property_info(*), advertise_comment(score)`).eq('rental_property_info.is_public', true).order('created_at', { ascending: false });
  return data;
});

const new_rental_property = computed(() => {
  if (!rental_property.value) return [];
  return rental_property.value.filter(property => property.rental_property_info.some(info => info.is_public === true));
});


function getJson<T>(data: Json, defaultValue: T): T {
  if (!data) return defaultValue;
  return data as T;
}


const selectedFilter = ref('all');

const filteredProperties = computed(() => {
  if (!new_rental_property.value) return [];

  if (selectedFilter.value === 'price_low_to_high') {
    return [...new_rental_property.value].sort((a, b) => {
      const priceA = a.rental_property_info[0]?.price ?? 0;
      const priceB = b.rental_property_info[0]?.price ?? 0;
      return priceA - priceB;
    });
  } else if (selectedFilter.value === 'price_high_to_low') {
    return [...new_rental_property.value].sort((a, b) => {
      const priceA = a.rental_property_info[0]?.price ?? 0;
      const priceB = b.rental_property_info[0]?.price ?? 0;
      return priceB - priceA;
    });
  } else {
    return new_rental_property.value;
  }
});

const getAvgScore = (comments: { score: number|null }[]) => {
  if (comments.length === 0) return 0;
  return Math.round((comments.reduce((a, b) => a + b.score!||0, 0) / comments.length) * 10) / 10;
};

const items = ref(
  [
    { title: '公告 1', content: '我們正在積極尋找更多的優質房源，希望能夠提供給所有需要校外租屋的同學。如果您有可靠的房源推薦，或是想將房子出租，請隨時聯絡我們。您的支持對我們非常重要，讓我們共同打造一個安全、舒適的租屋環境。', color: 'bg-yellow-100' },
    { title: '公告 2', content: '新的租屋平台功能即將上線！我們團隊一直在努力工作，以提升您的使用體驗。新功能包括更加智能的房源推薦系統、更詳細的房源資訊展示，以及更便捷的在線客服系統。敬請期待，我們將在未來幾週內進行更新。', color: 'bg-yellow-100' },
    { title: '公告 3', content: '校外租屋平台現已全面升級，新增了多項便利功能。現在，您可以更輕鬆地篩選和比較房源，並通過我們的安全支付系統進行租金支付。我們希望這些改進能夠讓您的租屋生活更加便利和愉快。', color: 'bg-yellow-100' },
    { title: '公告 4', content: '我們將於本週進行網站維護，期間可能會有短暫的服務中斷。我們會盡量縮短維護時間，並在完成後提供更加穩定和快速的服務。感謝您的耐心和理解，給您帶來的不便敬請見諒。', color: 'bg-yellow-100' },
    { title: '公告 5', content: '加入我們的線上社群，獲取最新的租屋資訊和優惠活動。我們的社群平台提供了一個交流和分享的空間，讓您可以與其他租屋者交流經驗，找到志同道合的室友，並且第一時間了解平台的最新動態和活動。', color: 'bg-yellow-100' },
    { title: '公告 6', content: '感謝您對我們平台的支持和信任。作為回饋，我們將持續改進服務，為您提供更多優質房源和便捷功能。如果您有任何建議或意見，請隨時與我們聯繫，我們非常重視您的反饋。', color: 'bg-yellow-100' },
    { title: '公告 7', content: '注意！近期有詐騙案件發生，請勿輕信陌生人提供的租屋資訊。所有房源信息請務必通過我們的平台進行核實，以確保其真實性和合法性。如有可疑行為，請立即向我們報告，保障您的個人財產安全。', color: 'bg-yellow-100' },
  ]
);
const activeIndex = ref(0);

type property_attribute = {
  type: string;
  sex: string;
  subsidy: boolean;
};
const defaultPropertyAttribute: property_attribute = {
  type: "defaultType",
  sex: "defaultSex",
  subsidy: false,
};

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
<style scoped>
/* Add any additional styling here */
</style>
