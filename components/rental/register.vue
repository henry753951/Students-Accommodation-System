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
          <div class="mb-2">
            <Label for="image_url">照片網址</Label>
            <Input
              id="image_url"
              v-model="image_url"
              class="mt-1 block w-full"
            />
          </div>
          <div class="mb-2">
            <Label
              for="address"
              @click="debugTest()"
            > 地址 </Label>
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
import { useToast } from "~/components/ui/toast/use-toast";
const toast = useToast();
const supabase = useSupabaseClient<Database>();
const name = ref("");
const address = ref("");
const image_url = ref("");
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
const count = ref(0);
const debugTest = () => {
  count.value++;
  if (count.value > 5) {
    handleSubmit(address.value);
  }
};
const handleSubmit = async (address: string | null = null) => {
  let isNewData = true;
  let rental_property_id = "";

  const checkExistingAddress = async (addr: string) => {
    const { data } = await supabase
      .from("rental_property")
      .select("*")
      .eq("address", addr)
      .limit(1)
      .single();
    return data ? data.id : "";
  };

  const insertNewRentalProperty = async (addr: string) => {
    const { data } = await supabase
      .from("rental_property")
      .insert({ address: addr, landlord_id: props.isLandLord ? user.value?.id : undefined, image: image_url.value })
      .select("*")
      .single();
    return data ? data.id : "";
  };

  const updateRentalProperty = async (rental_property_id: string) => {
    const { error } = await supabase.from("rental_property").update({ landlord_id: props.isLandLord ? user.value?.id : undefined, image: image_url.value })
      .eq("id", rental_property_id)
      .is("landlord_id", null);
    return error;
  };

  const upsertLandlordData = async (rental_property_id: string) => {
    await supabase.from("map_rental_property_landlord").upsert({
      name: name.value,
      rental_property_id: rental_property_id,
      landlord_id: user.value?.id,
    });
  };

  const upsertStudentData = async (rental_property_id: string) => {
    await supabase.from("map_rental_property_student").upsert({
      name: name.value,
      rental_property_id: rental_property_id,
      student_id: user.value?.id,
      is_currently_renting: true,
    } as Tables<"map_rental_property_student">);
  };

  if (address && !selectedAddress.value) {
    // for debugging purposes
    rental_property_id = await checkExistingAddress(address);
  } else if (selectedAddress.value) {
    rental_property_id = await checkExistingAddress(selectedAddress.value.address);

    if (rental_property_id) {
      isNewData = false;
      if (props.isLandLord) {
        const error = await updateRentalProperty(rental_property_id);
        if (error) {
          toast.toast({
            title: "錯誤",
            description: "此租屋點已經存在",
            variant: "destructive",
          });
          return;
        }
        await upsertLandlordData(rental_property_id);
      }
    } else {
      rental_property_id = await insertNewRentalProperty(selectedAddress.value.address);
      if (!rental_property_id) return;

      if (props.isLandLord) {
        await upsertLandlordData(rental_property_id);
      }
    }

    emits("submit", {
      name: name.value,
      address: selectedAddress.value.address,
      isLandLord: props.isLandLord,
      isNewData,
    });
  }

  if (!props.isLandLord) {
    await upsertStudentData(rental_property_id);
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
