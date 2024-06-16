<template>
  <div class="p-4 container">
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold">
        {{ Rental?.name || '無' }}
      </h1>
      <p class="text-xl">
        {{ Rental?.rental_property?.address || '無' }}
      </p>
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
              <TableHead>ID</TableHead>
              <TableHead>是否公開</TableHead>
              <TableHead>價格</TableHead>
              <TableHead>屬性</TableHead>
              <TableHead>租賃物業ID</TableHead>
              <TableHead>更新時間</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="infos in Rental?.rental_property?.rental_property_info"
              :key="infos.id"
            >
              <TableCell>{{ infos.created_at }}</TableCell>
              <TableCell>{{ infos.description }}</TableCell>
              <TableCell>{{ infos.id }}</TableCell>
              <TableCell>{{ infos.is_public }}</TableCell>
              <TableCell>{{ infos.price }}</TableCell>
              <TableCell>{{ infos.property_attributes }}</TableCell>
              <TableCell>{{ infos.rental_property_id }}</TableCell>
              <TableCell>{{ infos.updated_at }}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Database, Tables, Enums } from "~/database.types";
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

type formType = {
  price: number;
  description: string;
  isPublic: boolean;
  property_attributes: {
    type: "透天" | "公寓" | "大樓" | "套房" | "雅房" | "其他房型";
    genderRestriction: "男" | "女" | "多元" | "無";
    rentalSubsidy: boolean
  }
};


const { data: Rental,refresh } = await useAsyncData('rental_property' + route.params.prop_id, async () => {
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
      is_public: data.isPublic,
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

// const fetchRentalData = async () => {
//   const { data, error } = await supabase
//     .from('rental_property')
//     .select(`
//       *,
//       rental_property_info (
//         *
//       )
//     `)
//     .eq('id', route.params.prop_id)
//     .single();

//   if (error) {
//     toast.toast({
//       title: "Error",
//       description: error.message,
//       variant: "destructive",
//     });
//     return;
//   }
//   console.log(data);
//   address.value = data.address;
//   landlordName.value = data.landlord_id;
//   const rentalInfo = data.rental_property_info[0];
//   price.value = rentalInfo.price;
//   description.value = rentalInfo.description;
//   isPublic.value = rentalInfo.is_public;
//   const propertyAttributes = JSON.parse(rentalInfo.property_attributes);
//   propertyAttributesType.value = propertyAttributes.type;
//   propertyAttributesSex.value = propertyAttributes.sex;
//   propertyAttributesSubsidy.value = propertyAttributes.subsidy;
// };

// onMounted(() => {
//   fetchRentalData();
// });

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