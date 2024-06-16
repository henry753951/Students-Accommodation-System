<template>
  <div>
    <Tabs v-model="currentTab" class="w-full mb-5">
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
    </Tabs>
    <div>
      <div v-if="currentTab === 'visit-records'">
        <NuxtLink :to="`../interview/record/info-${link}`" class="w-full" @click="refresh()">
          點我租屋平台
        </NuxtLink>
      </div>
      <div v-else-if="currentTab === 'rental-points'">
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline" class = "bg-black text-white">
              修改名字
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>編輯資料</DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="name" class="text-right">
                  原始資料
                </Label>
                <Input id="name"  class="col-span-3" :placeholder="Rental__[0].Name" readonly/>
              </div>
              <div class="grid grid-cols-4 items-center gap-4">
                <Label for="username" class="text-right">
                  修該資料
                </Label>
                <Input id="username" v-model = UPDATE class="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" @click = "submit">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Table>
          <TableCaption>您的租屋點資訊</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead class="w-1/5 ">
                你的小屋
              </TableHead>
              <TableHead class="w-2/5">地址</TableHead>
              <TableHead class="w-1/5">房東</TableHead>
              <TableHead class="w-1/5">
                房東電話
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="(data, index) in Rental__" :key="index">
              <TableCell >
                {{ data.Name }}</TableCell>
              <TableCell>{{ data.address }}</TableCell>
              <TableCell>{{ data.landlord }}</TableCell>
              <TableCell>
                {{ data.landlord_phone }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div v-else-if="currentTab === 'rental-communication'">
        <NuxtLink :to="`../social/${rental_property_id}`" class="w-full">
          點我租屋平台
        </NuxtLink>
        <social />
      </div>
      <div v-else-if="currentTab === 'rental-platform'">
        <NuxtLink :to="`../advertisement/info-${rental_property_id}`" class="w-full">
          點我租屋平台
        </NuxtLink>
        <advertise />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Database, Tables, Enums } from "~/database.types";
const supabase = useSupabaseClient<Database>();
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import advertise from "../advertisement/index.vue"
import social from "../social/index.vue"

const route = useRoute()
const id = ref(route.params.id)
let rental_property_id = ref("");
let link = ref("");
let UPDATE = ref("");

type rental_point = {
  Name: string | null;
  address: string;
  landlord: string;
  landlord_phone: string;
}
let Rental__ = ref<rental_point[]>([]);
let currentTab = ref('visit-records')

const user = await useAsyncUser();
const refresh = async () => {
  const { data, error } = await supabase
    .from('map_rental_property_student')
    .select('*,app_user(*)')
    .eq('id', id.value)
  if (error) {
    throw error
  }
  rental_property_id.value = data?.[0]?.rental_property_id ?? "";


  if (user.value) {
    const { data, error } = await supabase
      .from('interview_record')
      .select('*')
      .eq('student_id', user.value.id)
      .eq('property_id', rental_property_id.value)
    if (error) {
      throw error
    }
    link.value = data?.[0]?.record_link ?? "";
    // console.log(data, "5465");
  }

  const { data: invoicesData, error: invoicesError } = await supabase
    .from('rental_property')
    .select('address')
    .eq('id', rental_property_id.value)
  if (invoicesError) {
    throw invoicesError
  }

  console.log(data, "5465");
  Rental__.value = data.map((item: any) => {
    return {
      Name: item?.name,
      address: invoicesData?.[0]?.address ?? "",
      landlord: item.app_user?.name,
      landlord_phone: item.app_user?.phone,
    }
  })
}
const submit = async () => {
  const { data, error } = await supabase
    .from('map_rental_property_student')
    .update({
      name: UPDATE.value
    })
    .eq('id', id.value)
  if (error) {
    throw error
  }
  refresh();
}

onMounted(() => {
  refresh();
});
</script>

<style scoped>

</style>