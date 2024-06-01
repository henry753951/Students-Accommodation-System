<template>
  <div class="space-y-10">
    <section>
      <h2 class="text-xl font-bold mb-4">Property Form</h2>
      <RentalAddrForm v-model:address="address" v-model:landlordName="landlordName" />
    </section>

    <section>
      <h2 class="text-xl font-bold mb-4">Property Form</h2>
      <RentalPropertyForm 
      v-model:price="price" 
      v-model:description="description" 
      v-model:is_public="isPublic" 
      v-model:propertyAttributesType="propertyAttributesType" 
      v-model:propertyAttributesSex="propertyAttributesSex" 
      v-model:propertyAttributesSubsidy="propertyAttributesSubsidy" 
      />
    </section>

    <Button type="submit" @click="handleSubmit">Submit</Button>

    <section>
      <h2 class="text-xl font-bold mb-4">表單內容統整</h2>
      <p>addr: {{ address }}</p>
      <p>landlordname: {{ landlordName }}</p>
      <p>Price: {{ price }}</p>
      <p>Description: {{ description }}</p>
      <p>Is Public: {{ isPublic }}</p>
      <p>Property Attributes: [{{ propertyAttributesType }},{{ propertyAttributesSex }},{{ propertyAttributesSubsidy }}]</p>
    </section>
    <section>
      <h2 class="text-xl font-bold mb-4">Import Link</h2>
      <input v-model="idtntity" type="radio" value="teacher"> Teacher
      <input v-model="idtntity" type="radio" value="student"> Student
      <div v-if="idtntity === 'student'">
        <button @click="">Import Link</button>
        <p>Link: {{ link }}</p>
      </div>
    </section>
  </div>
</template>


<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { ref } from 'vue';
import * as z from 'zod';
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast();
import type { DropdownMenuCheckboxItemProps } from 'radix-vue'
import type { Database, Tables, Enums } from "~/database.types";
const supabase = useSupabaseClient<Database>();


import { Button } from '@/components/ui/button'

const address = ref('');
const landlordName = ref('');
const price = ref(0);
const description = ref('');
const isPublic = ref(false);
const propertyAttributesType = ref('');
const propertyAttributesSex = ref('無');
const propertyAttributesSubsidy = ref(false);

// 看有那些問題

const idtntity = ref("");
let link = ref("");
let all_interview = ref({});
onMounted(async () => {
  if (idtntity.value == "teacher") {

  } else if (idtntity.value == "student") {
    // 直接匯入
    link.value = await get_student_information(idtntity.value);
    all_interview.value = await get_all_interview(link.value) ?? {};
  }
});

const get_student_information = async (student_id: String) => {
  const { data, error } = await supabase
    .from('interview_record')
    .select("*")
    .eq('student_id', student_id)
  if (error) {
    console.error(error)
    return
  }
  return data[0]["get_interview_link"]
}

const get_all_interview = async (link: String) => {
  const { data, error } = await supabase
    .from('interview_problem')
    .select("*")
    .eq('get_interview_link', link)
  if (error) {
    console.error(error)
    return
  }
  return data
}


const SubmitToInterview = async (time: string) => {
  const { data, error } = await supabase
    .from("interview_problem")
    .insert([
      {
        // all problem
      }
    ])
  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return 'error';
  }
};

const formSchema = toTypedSchema(
  z.object({
    address: z.string().min(5, 'Address must be at least 5 characters long'),
    landlordName: z.string().min(2, 'Landlord name must be at least 2 characters long'),
  })
);

const form = useForm({
  validationSchema: formSchema,
});


const SubmitToRentalprop = async (time: string): Promise<string> => {
  const { data, error } = await supabase
    .from("rental_property")
    .insert([
      {
        "address": address.value,
        "landlord_id": 'cc7c9e40-af78-45d5-907f-66bcf550d2ad',
        "created_at": time,
        "updated_at": time,
      }
    ])
    .select("*")
  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return 'error';
  }
  return data[0]['id'];
};

const SubmitToRentalinfo = async (rental_id: string, time: string) => {
  console.log("BINHAN SO SMALL");
  const { data, error } = await supabase
    .from("rental_property_info")
    .insert([
      {
        "rental_property_id": rental_id,
        "price": price.value,
        "is_public": false,
        "description": description.value,
        "property_attributes": JSON.stringify({
          type: propertyAttributesType.value,
          sex: propertyAttributesSex.value,
          subsidy: propertyAttributesSubsidy.value
        }),
        "created_at": time,
        "updated_at": time,
      }
    ])
    .select("*");
  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  }
};

const handleSubmit = async () => {
  const confirmation = confirm(`
    Address: ${address.value}
    Landlord Name: ${landlordName.value}
    Price: ${price.value}
    Description: ${description.value}
    Is Public: ${isPublic.value}
    Property Attributes: ${propertyAttributesType.value}, ${propertyAttributesSex.value}, ${propertyAttributesSubsidy.value}
    
    確定要送出嗎?
  `);

  if (confirmation) {
    //提交表單的邏輯
    //送出到supabase
    let time = new Date().toISOString()
    let rental_id = await SubmitToRentalprop(time)
    SubmitToRentalinfo(rental_id, time)
    SubmitToInterview(time)
    console.log(rental_id, time);
  } else {
    console.log(confirmation);
  }
};

</script>

<style scoped>
/* Add any additional styling here */
</style>