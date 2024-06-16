<template>
  <div class="p-4 container">
    <div class="flex items-end">
      <div class="flex flex-col gap-4 mr-auto">
        <h1 class="text-2xl font-bold">
          {{ Rental?.name || '無' }}
        </h1>
        <p class="text-xl">
          {{ Rental?.rental_property?.address || '無' }}
        </p>
      </div>
      <Dialog v-model:open="editRentalDialog">
        <DialogTrigger as-child>
          <Button @click="tempName=Rental!.name">
            編輯租屋點
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>編輯租屋點</DialogTitle>
          </DialogHeader>
          <div>
            <div class="space-y-2 pb-5 pt-1">
              <div class="space-y-2">
                <input
                  v-model="Rental!.rental_property!.address"
                  disabled
                  type="text"
                  placeholder="地址"
                  class="rounded-lg"
                >
              </div>

              <div class="space-y-2">
                <Label>租屋點名稱</Label>
                <input
                  v-model="tempName"
                  type="text"
                  placeholder="租屋點名稱"
                  class="rounded-lg"
                >
              </div>
            </div>
            <DialogFooter class="flex gap-2">
              <Button
                class="mr-auto"
                variant="destructive"
                @click="handleDeleteRental"
              >
                刪除租屋點
              </Button>
              <Button
                @click="handleUpdateRental"
              >
                保存
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    <Separator class="my-5" />
    <div
      v-if="Rental"
      class="space-y-3"
    >
      <div class="flex w-full">
        <Dialog>
          <DialogTrigger as-child>
            <Button class="ml-auto">
              + 刊登租屋資訊
            </Button>
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>刊登租屋資訊</DialogTitle>
              <DialogDescription> 請填寫以下資訊 </DialogDescription>
            </DialogHeader>
            <div>
              <RentalPropertyForm @submit="handelAddInfo" />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div class="mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>建立時間</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>是否公開</TableHead>
              <TableHead>價格</TableHead>
              <TableHead>屬性</TableHead>
              <TableHead>動作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="infos in Rental?.rental_property?.rental_property_info"
              :key="infos.id"
            >
              <TableCell>{{ formatDate(infos.created_at) }}</TableCell>
              <TableCell>{{ infos.description }}</TableCell>
              <TableCell>{{ infos.is_public ? '公開' : '不公開' }}</TableCell>
              <TableCell>{{ infos.price }}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <Button variant="ghost">
                      屬性
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div>
                      <p>房型: {{ getKeyVal(infos.property_attributes, 'type').value }} </p>
                      <p>性別限制:  {{ getKeyVal(infos.property_attributes, 'genderRestriction').value }} </p>
                      <p>是否能租屋補貼:  {{ getKeyVal(infos.property_attributes, 'rentalSubsidy').value? '是' : '否' }} </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell class="flex gap-3">
                <Dialog>
                  <DialogTrigger as-child>
                    <Button>
                      編輯
                    </Button>
                  </DialogTrigger>
                  <DialogContent class="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>編輯租屋資訊</DialogTitle>
                      <DialogDescription> {{ Rental.name }} </DialogDescription>
                    </DialogHeader>
                    <div>
                      <RentalPropertyForm
                        :rental="infos"
                        @submit="handleUpdateInfo"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  @click="handleDeleteInfo(infos.id)"
                >
                  刪除
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Database, Tables, Enums, Json } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
import { ref, onMounted } from 'vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
const route = useRoute();
definePageMeta({
  name: "修改租屋點",
});
const toast = useToast();
const supabase = useSupabaseClient<Database>();
const editRentalDialog = ref(false);
type formType = {
  id?: string;
  price: number;
  description: string;
  is_public: boolean;
  property_attributes: {
    type: "透天" | "公寓" | "大樓" | "套房" | "雅房" | "其他房型";
    genderRestriction: "男" | "女" | "多元" | "無";
    rentalSubsidy: boolean
  }
};


const { data: Rental, refresh } = await useAsyncData('rental_property' + route.params.prop_id, async () => {
  const { data, error } = await supabase
    .from('map_rental_property_landlord')
    .select(`
      *,
      rental_property(
      *,
        rental_property_info (
        *
        )
      )
    `)
    .eq('rental_property_id', route.params.prop_id)
    .single();
  return data;
});

const handelAddInfo = async (data: formType) => {
  const { error } = await supabase
    .from('rental_property_info')
    .insert({
      description: data.description,
      price: data.price,
      is_public: data.is_public,
      property_attributes: JSON.stringify(data.property_attributes),
      rental_property_id: Rental?.value?.rental_property_id,
    } as Tables<'rental_property_info'>);

  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  toast.toast({
    title: "新增成功",
    description: "新增租屋資訊成功",
    variant: "default",
  });
  refresh();
};



const handleUpdateInfo = async (data: formType) => {
  console.log("123123123", data.is_public);
  const { error } = await supabase
    .from('rental_property_info')
    .update({
      description: data.description,
      price: data.price,
      is_public: data.is_public,
      property_attributes: JSON.stringify(data.property_attributes),
    })
    .eq('id', data.id!);

  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  toast.toast({
    title: "更新成功",
    description: "更新租屋資訊成功",
    variant: "default",
  });
  refresh();
};

const handleDeleteInfo = async (id: string) => {
  const { error } = await supabase
    .from('rental_property_info')
    .delete()
    .eq('id', id);

  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  toast.toast({
    title: "刪除成功",
    description: "刪除租屋資訊成功",
    variant: "default",
  });
  refresh();
};

const getKeyVal = (json: Json, key: string) => {
  const obj = JSON.parse(json as string);
  return {
    key,
    value: obj[key],
  };
};


const handleDeleteRental = async () => {
  const { error } = await supabase
    .from('rental_property')
    .delete()
    .eq('id', route.params.prop_id);

  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  toast.toast({
    title: "刪除成功",
    description: "刪除租屋點成功",
    variant: "default",
  });
  navigateTo('/landlord');
};


const tempName = Rental.value!.name;
const handleUpdateRental = async () => {
  const { error } = await supabase
    .from('map_rental_property_landlord')
    .update({
      name: Rental.value!.name,
    })
    .eq('id', Rental.value!.id);

  if (error) {
    toast.toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  toast.toast({
    title: "更新成功",
    description: "更新租屋點成功",
    variant: "default",
  });
  refresh();
};

</script>
<style scoped>
.bg-gray-50 {
  background-color: #f9fafb;
}

.shadow-inner {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1);
}

.space-y-2> :not([hidden])~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}

.rounded-lg {
  border-radius: 0.5rem;
}

.p-4 {
  padding: 1rem;
}

input,
textarea {
  width: 100%;
  border: none;
  outline: none;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
}

input:focus,
textarea:focus {
  box-shadow: 0 0 0 2px rgba(134, 135, 148, 0.5);
}
</style>