<template>
  <div>
    <p>Rental Property ID: {{ id }}</p>
  </div>
  <!-- grid justify-items-center  -->
  <div class="container w-2/3 shadow-lg pt-3" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <div class="flex flex-row">
        <FormItem class="basis-1/2 mr-5">
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="A1105513" v-bind="componentField" />
          </FormControl>
        </FormItem>
        <FormItem class="basis-1/2 ml-5">
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input type="text" placeholder="A1105513" v-bind="componentField" />
          </FormControl>
        </FormItem>
      </div>
      <section>
        <h2>
          表單內容統整
        </h2>
        <div class="bg-gray-50 p-4 rounded-lg shadow-inner space-y-2">
          <p><strong>地址:</strong> {{ rental_info["address"] }}</p>
          <p><strong>描述:</strong> {{ rental_info["description"] }}</p>
          <p><strong>房東:</strong> {{ rental_info["landlord_id"] }}</p>
          <p><strong>價錢:</strong> {{ rental_info["price"] }}</p>
          <p><strong>屬性:</strong> {{ rental_info["property_attributes"] }}</p>
          <p><strong>是否公開:</strong> {{ rental_info["is_public"] }}</p>
        </div>
      </section>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </div>
</template>

<script lang="ts" setup>
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
definePageMeta({
  name: '租屋資訊',
});
import type { Database, Tables, Enums, Json } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
const route = useRoute();
const id = ref(route.params.id);
const supabase = useSupabaseClient<Database>();
type rental = {
  address: string | null,
  landlord_id: string | null,
  price: number | null,
  property_attributes: Json | null,
  description: string | null,
  is_public: boolean | null,
}
let rental_info = ref<rental>() ;

onMounted(() => {
  console.log(id.value, "id");
  initial_get_information();
});


const initial_get_information = async () => {
  const { data, error } = await supabase
    .from("rental_property")
    .select("*,rental_property_info(*)")
    .eq("id", id.value)
  if (error) {
    toast({
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
  console.log(rental_info, "datsaa");
}

const formSchema = toTypedSchema(z.object({
  username: z.string().min(2).max(50),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit((values) => {
  toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
})

</script>

<style>
.container {
  background-color: rgb(245, 245, 245);
  border-radius: 10px;
  display: grid;
  gap: 1rem;
}
</style>