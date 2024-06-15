<template>
  <!-- <div>
    <p>Rental Property ID: {{ id }}</p>
  </div> -->
  <!-- grid justify-items-center  -->
  <div class="container w-2/3 shadow-lg pt-3">
    <FormField
      v-slot="{ componentField }"
      name="username"
    >
      <div class="flex flex-row">
        <!-- 到時候抓登入 -->
        <FormItem class="basis-1/2 mr-5">
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="莊印哲"
              v-bind="componentField"
            />
          </FormControl>
        </FormItem>
        <FormItem class="basis-1/2 ml-5">
          <FormLabel>User ID</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="A1105513"
              v-bind="componentField"
            />
          </FormControl>
        </FormItem>
      </div>
      <div class="flex flex-row">
        <!-- 到時候抓登入 -->
        <FormItem class="basis-1/2 mr-5">
          <FormLabel>地址</FormLabel>
          <FormControl>
            <Input
              v-model="__address__"
              type="text"
            />
          </FormControl>
        </FormItem>
        <FormItem class="basis-1/2 ml-5">
          <FormLabel>月租費</FormLabel>
          <FormControl>
            <Input
              v-model="__price__"
              type="text"
            />
          </FormControl>
        </FormItem>
      </div>
      <div class="flex flex-row">
        <!-- 到時候抓登入 -->
        <FormItem class="basis-3/4 mr-5">
          <FormLabel>租屋描述</FormLabel>
          <FormControl>
            <Input
              v-model="__description__"
              type="text"
            />
          </FormControl>
        </FormItem>
        <FormItem class="basis-1/4">
          <FormLabel>房型</FormLabel>
          <FormControl>
            <Select v-model="__property_attributes__">
              <SelectTrigger class="w-[280px]">
                <SelectValue :placeholder="__property_attributes__" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup
                  v-for="(value, index) in house_type"
                  :key="index"
                >
                  <SelectItem :value="value">
                    {{ value }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <!-- <Input type="text"v-model="__description__" :placeholder="rental_info?.description"  /> -->
          </FormControl>
        </FormItem>
      </div>
      <div class="flex flex-row">
        <!-- 到時候抓登入 -->
        <FormItem class="basis-3/4 mr-5">
          <FormLabel>房東</FormLabel>
          <FormControl>
            <Input
              v-model="__landlord_id__"
              type="text"
            />
          </FormControl>
        </FormItem>
        <FormItem class="basis-1/4">
          <FormLabel>是否公開</FormLabel>
          <FormControl>
            <Select v-model="__is_public__">
              <SelectTrigger class="w-[280px]">
                <SelectValue :placeholder="__is_public__" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup
                  v-for="(value, index) in Public"
                  :key="index"
                >
                  <SelectItem :value="value">
                    {{ value }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      </div>
      <section>
        <h2>
          表單內容統整
        </h2>
        <div class="bg-gray-50 p-4 rounded-lg shadow-inner space-y-2">
          <p><strong>地址:</strong> {{ __address__ }}</p>
          <p><strong>描述:</strong> {{ __description__ }}</p>
          <p><strong>房東:</strong> {{ __landlord_id__ }}</p>
          <p><strong>價錢:</strong> {{ __price__ }}</p>
          <p><strong>屬性:</strong> {{ __property_attributes__ }}</p>
          <p><strong>是否公開:</strong> {{ __is_public__ }}</p>
        </div>
      </section>
    </FormField>
    <Button
      type="submit"
      class="mb-5"
      @click="handleSubmit"
    >
      Submit
    </Button>
  </div>
</template>

<script lang="ts" setup>
import * as z from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import type { Database, Tables, Enums, Json } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
definePageMeta({
  name: '租屋資訊',
});
const toast = useToast();
const route = useRoute();
const id = ref(route.params.id);
const supabase = useSupabaseClient<Database>();

const __address__ = ref("");
const __landlord_id__ = ref("");
const __price__ = ref(0);
const __property_attributes__ = ref("");
const __description__ = ref("");
const __is_public__ = ref("");
const subsidy = ref("");
const sex = ref("");  
type rental = {
  address: string,
  landlord_id: string,
  price: number,
  property_attributes: string,
  description: string,
  is_public: boolean,
};
const rental_info = ref<rental>();
const submit_rental_info = ref<rental>();
const house_type = ref(["公寓", "透天", "別墅", "套房", "雅房", "其他"]);
const Public = ref(["公開", "不公開"]);
const __Landlord_name__ = ref([]);

onMounted(() => {
  initial_get_information();
});


const initial_get_information = async () => {
  const { data, error } = await supabase
    .from("rental_property")
    .select("*,rental_property_info(*)")
    .eq("id", id.value);
  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  rental_info.value = data.map(item => ({
    address: item.address,
    landlord_id: item.landlord_id,
    price: item.rental_property_info[0].price,
    property_attributes: item.rental_property_info[0].property_attributes,
    description: item.rental_property_info[0].description,
    is_public: item.rental_property_info[0].is_public,
  }) as rental)[0];
  // console.log(typeof rental_info.value.property_attributes, "rental_info");
  const DATA = JSON.parse(rental_info.value.property_attributes);
  __property_attributes__.value = DATA.type;
  subsidy.value = DATA.subsidy;
  sex.value = DATA.sex;

  __description__.value = rental_info.value.description;
  __price__.value = rental_info.value.price;
  __address__.value = rental_info.value.address;
  __landlord_id__.value = rental_info.value.landlord_id;
  if (rental_info.value.is_public) {
    __is_public__.value = "公開";
  }
  else {
    __is_public__.value = "不公開";
  }
  get_landlord_name(__landlord_id__.value);
  // __is_public__.value = rental_info.value.is_public;
};

const get_landlord_name = async (landlord_id: string) => {
  const { data, error } = await supabase
    .from("app_user")
    .select("name")
    .eq("id", landlord_id);
  console.log(data, "landlord_id");
  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  __landlord_id__.value = data[0].name || "";
};

const handleSubmit = async () => {
  submit_rental_info.value = {
    address: __address__.value,
    landlord_id: __landlord_id__.value,
    price: __price__.value,
    property_attributes: JSON.stringify({ type: __property_attributes__.value, sex:sex.value,subsidy: subsidy.value,}),
    description: __description__.value,
    is_public: __is_public__.value === "公開" ? true : false,
  };
  const { data, error } = await supabase
    .from("rental_property_info")
    .update({
      price: submit_rental_info.value.price,
      property_attributes: submit_rental_info.value.property_attributes,
      description: submit_rental_info.value.description,
      is_public: submit_rental_info.value.is_public,
    })
    .eq("rental_property_id", id.value);
  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  const {data : data2 , error: error2} = await supabase
    .from("app_user")
    .select("id")
    .eq("name", submit_rental_info.value.landlord_id);
  if (error2) {
    toast.toast({
      title: "Error",
      description: error2.message,
      variant: "destructive",
    });
    return;
  }
  const { data: data3, error: error3 } = await supabase
    .from("rental_property")
    .update({
      address: submit_rental_info.value.address,
      landlord_id: data2[0].id,
    })
    .eq("id", id.value);
  if (error3) {
    toast.toast({
      title: "Error",
      description: error3.message,
      variant: "destructive",
    });
    return;
  }
  toast.toast({
    title: "Success",
    description: "更新成功",
  });
};

</script>

<style>
.container {
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
  display: grid;
  gap: 1rem;
}
</style>