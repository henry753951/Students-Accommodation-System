<template>
  <form class="p-5 w-11/12 mx-auto bg-slate-100 mt-6 table-container rounded-lg shadow-lg" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem v-auto-animate>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormMessage />
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormMessage />
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">
      Submit
    </Button>
  </form>
  {{ all }}
  <!-- {{ rental_property_id }} -->
</template>
<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vAutoAnimate } from '@formkit/auto-animate/vue'
import type { Database, Tables, Enums } from "~/database.types";
import { useToast } from "~/components/ui/toast/use-toast";
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'

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

onMounted(() => {
  initial_get_information();
});
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
type property_id = {
  address: string,
  landlord_id: string,
  comments: string | null,
  school_id: string | null,
}
let all = ref({});
let rental_property_id = ref<property_id[]>([]);;

const initial_get_information = async () => {
  const { data, error } = await supabase
    .from("map_rental_property_student")
    .select("rental_property_id,name")
    .eq("student_id", "77bfd169-c679-473c-9c93-fc26679d7216")
  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
  const { data: rental_property_id, error: error2 } = await supabase
    .from("rental_property")
    .select("*,rental_property_info(*)")
    .eq("id", data[0].rental_property_id)
  if (error2) {
    toast({
      title: "Error",
      description: error2.message,
      variant: "destructive",
    });
    return;
  }
  all.value = rental_property_id;
  
};

</script>
 