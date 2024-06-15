<template>
  <Card class="w-full max-w-4xl p-6 rounded-lg shadow-md flex flex-wrap">
    <div class="w-full md:w-1/2">
      <CardHeader>
        <CardTitle>新增租屋點</CardTitle>
        <CardDescription>請填寫以下資訊以新增租屋點</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col">
        <div class="w-full mb-4 md:mb-0 md:mr-4">
          <div class="mb-4">
            <Label for="name">租屋點名稱</Label>
            <Input
              id="name"
              v-model="name"
              class="mt-1 block w-full"
            />
          </div>
          <div class="mb-4">
            <Label for="address">地址</Label>
            <div class="flex items-center mt-1">
              <Input
                id="address"
                v-model="address"
                class="block w-full"
              />
              <Button
                variant="ghost"
                class="ml-1 border"
                @click="searchAddress"
              >
                <Icon
                  name="flat-color-icons:search"
                  class="w-6 h-6"
                />
              </Button>
            </div>
            <div class="bg-white shadow rounded-lg dark:bg-zinc-900 mt-2 p-2">
              <div
                v-if="selectedAddress"
                class="p-2"
              >
                <p class="text-sm font-semibold">
                  {{ selectedAddress.attributes.Match_addr }}
                </p>
                <p class="text-xs">
                  {{ selectedAddress.attributes.StAddr }}, {{ selectedAddress.attributes.City }}
                </p>
              </div>
              <div
                v-else
                class="p-2"
              >
                <p class="text-sm font-semibold">
                  請輸入地址以搜尋
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter class="flex justify-end">
        <Button
          :disabled="!selectedAddress || !name"
          @click="handleSubmit"
        >
          下一步
        </Button>
      </CardFooter>
    </div>
    <div class="w-full md:w-1/2 min-h-[380px]">
      <div
        id="map"
        class="h-full bg-gray-200 rounded-lg overflow-hidden"
      >
        <iframe
          v-if="selectedAddress"
          :src="`https://maps.google.com/maps?width=520&height=400&hl=en&q=${encodeURIComponent(selectedAddress.attributes.StAddr + ', ' + selectedAddress.attributes.City)}&t=&z=15&ie=UTF8&iwloc=B&output=embed`"
          frameborder="0"
          height="100%"
          width="100%"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
        />
        <div
          v-else
          class="flex items-center justify-center h-full"
        >
          <p class="text-gray-500">
            地圖預覽將顯示在這裡
          </p>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
const supabase = useSupabaseClient<Database>();
const name = ref("");
const address = ref("");
const searchResults = ref([] as Candidate[]);
const user = await useAsyncUser();
const props = defineProps({
  isLandLord: {
    type: Boolean,
    required: true,
  },
});

type Candidate = {
  address: string;
  location: {
    x: number;
    y: number;
  };
  attributes: {
    Addr_type: string;
    Match_addr: string;
    StAddr: string;
    City: string;
  };
};

const searchAddress = async () => {
  if (address.value) {
    const encodedAddress = encodeURIComponent(address.value);
    const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${encodedAddress}&f=json&outSR=%7B%22wkid%22:4326%7D&outFields=Addr_type,Match_addr,StAddr,City&maxLocations=1`;

    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
      });

      const data = await response.json();
      searchResults.value = data.candidates.map((candidate: Candidate) => ({
        address: candidate.address,
        location: candidate.location,
        attributes: candidate.attributes,
      }));

      if (searchResults.value.length === 0) {
        console.log("No address candidates found");
      }
    } catch (err) {
      console.error("Error fetching address candidates:", err);
    }
  }
};

const selectedAddress = computed(() => {
  if (searchResults.value.length > 0) {
    return searchResults.value[0];
  }
  return null;
});

const handleSubmit = async () => {
  let isNewData = true;

  if (selectedAddress.value) {
      // 檢查是否已經有相同的地址存在
    if (await supabase.from("rental_property").select("*").eq("address", selectedAddress.value.address).single()) {
      isNewData = false;
    } else {
      // 沒有相同的地址存在，新增租屋點
      await supabase
        .from("rental_property")
        .insert({
          address: selectedAddress.value.address,
        })
        .select("*")
        .single()
        .then(({ data }) => {
          // 如果是房東，新增該房東對租屋點的資料
          if (props.isLandLord) {
            supabase.from("map_rental_property_landlord").upsert({
              name: name.value,
              rental_property_id: data?.id,
              landlord_id: user.value?.id,
            });
          }
        });
    }
    emits("submit", {
      name: name.value,
      address: selectedAddress.value.address,
      isLandLord: props.isLandLord,
      isNewData,
    });
  }
};

const emits = defineEmits<{
  (
    e: "submit",
    payload: {
      name: string;
      address: string;
      isLandLord: boolean;
      isNewData: boolean;
    },
  ): void;
}>();
</script>

<style></style>
