<template>
  <div
    v-if="rentalData"
    class="flex gap-5 flex-wrap md:flex-nowrap"
  >
    <!-- Rental Information Card -->
    <Card class="w-full md:w-2/3">
      <CardHeader class="flex justify-between">
        <div class="flex items-center">
          <CardTitle class="mr-2">
            {{ rentalData.name || '無名稱' }}
          </CardTitle>
          <Dialog>
            <DialogTrigger as-child>
              <Button
                class="edit-button"
                variant="ghost"
                @click="tempName = rentalData.name"
              >
                ✎
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>編輯資料</DialogTitle>
              </DialogHeader>
              <div class="grid gap-4 py-4">
                <div class="grid grid-cols-4 items-center gap-4">
                  <Label
                    for="name"
                    class="text-right"
                  > 名稱 </Label>
                  <Input
                    v-model="tempName"
                    class="col-span-3"
                  />
                </div>
              </div>
              <DialogClose>
                <Button
                  type="submit"
                  @click="updateRentalName({ name: tempName })"
                >
                  儲存
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
        <CardDescription>{{ rentalData.rental_property?.address || '無地址' }}</CardDescription>
      </CardHeader>
      <CardContent>
        <p><strong>建立時間：</strong> {{ formatDate(rentalData.created_at) || '無' }}</p>
        <p><strong>更新時間：</strong> {{ formatDate(rentalData.updated_at) || '無' }}</p>
      </CardContent>
      <CardFooter class="flex justify-end items-center">
        <div class="rental-status">
          <Button 
            class="status-text bg-green-200"
            :class="{ 'text-red-500 bg-red-200': !rentalData.is_currently_renting , 'text-green-500': rentalData.is_currently_renting }"
            variant="ghost"
            @click="switchRentalStatus"
          >
            {{ rentalData.is_currently_renting ? '租賃中' : '未租賃' }}
          </Button>
        </div>
      </CardFooter>
    </Card>
    <!-- Landlord Information Card -->
    <div class="w-full md:w-1/3 space-y-3 flex flex-col">
      <p class="text-2xl font-bold">
        房東資料
      </p>
      <Card
        v-if="rentalData.rental_property?.app_user"
        class="h-full"
      >
        <CardHeader>
          <CardTitle>
            <div class="flex w-full items-center gap-3">
              <Avatar>
                <AvatarImage :src="rentalData.rental_property.app_user.avatar_url || 'default-avatar.png'" />
              </Avatar>
              <p>{{ rentalData.rental_property.app_user.name || '無' }}</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="flex flex-col">
            <p>
              <Icon
                name="line-md:phone-call-loop"
                class="mr-2"
              />
              {{ rentalData.rental_property.app_user.phone || '無' }}
            </p>
            <p>
              <Icon
                name="octicon:mail-16"
                class="mr-2"
              />
              {{ rentalData.rental_property.app_user.email || '無' }}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card v-else>
        <CardHeader>
          <CardTitle>
            <div class="flex w-full items-center gap-3">
              <Avatar>
                <AvatarImage :src="''" />
                <AvatarFallback>
                  <Icon
                    name="mingcute:user-add-fill"
                    size="20"
                  />
                </AvatarFallback>
              </Avatar>
              <p>無房東資料</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p class="mb-3">
            邀請房東加入平台，讓房東可以更方便地管理租屋資訊。
          </p>
          <div class="flex justify-center">
            <Button class="w-full">
              邀請房東使用此平台
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { QueryData } from "@supabase/supabase-js";
import type { Database, Tables, Enums } from "~/database.types";

const supabase = useSupabaseClient<Database>();
const tempQuery = supabase.from("map_rental_property_student").select("*, rental_property(*, app_user(*))").limit(1).single();
type RentalData = QueryData<typeof tempQuery>;

const props = defineProps({
  rentalData: {
    type: Object as PropType<RentalData | null>,
    required: true,
  },
});

const emits = defineEmits<{
  (event: "update"): void;
}>();

const updateRentalName = async (data: { name: string}) => {
  await supabase.from("map_rental_property_student").update({...data, updated_at: new Date().toISOString()}).eq("id", props.rentalData!.id);
  emits("update");
};

const switchRentalStatus = async () => {
  await supabase.from("map_rental_property_student").update({ is_currently_renting: !props.rentalData!.is_currently_renting,updated_at: new Date().toISOString() }).eq("id", props.rentalData!.id);
  emits("update");
};
const tempName = ref("");

</script>
<style scoped>
.rental-status {
  text-align: right;
}

.status-text {
  font-weight: bold;
}
</style>
