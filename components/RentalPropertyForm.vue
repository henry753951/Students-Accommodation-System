<template>
  <form @submit="onSubmit">
    <FormField
      v-slot="{ componentField }"
      name="price"
    >
      <FormItem>
        <FormLabel>價格</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            type="number"
            placeholder="Enter the price"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="description"
    >
      <FormItem>
        <FormLabel>描述</FormLabel>
        <FormControl>
          <Textarea
            v-bind="componentField"
            placeholder="Enter the description"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, handleChange }"
      name="is_public"
    >
      <FormItem class="my-4">
        <div class="flex h-full justify-between">
          <FormLabel class="my-auto">
            是否公開
          </FormLabel>
          <FormControl>
            <Switch
              :checked="value"
              @update:checked="handleChange"
            />
          </FormControl>
        </div>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="property_attributes.type"
    >
      <FormItem>
        <FormLabel>屋種</FormLabel>
        <FormControl>
          <div class="flex flex-wrap gap-4">
            <!-- 第一個 Select -->
            <Select v-bind="componentField">
              <SelectTrigger class="w-[180px]">
                <SelectValue placeholder="選擇屋種" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel class="text-red-500">
                    房型
                  </SelectLabel>
                  <SelectItem value="透天">
                    透天
                  </SelectItem>
                  <SelectItem value="公寓">
                    公寓
                  </SelectItem>
                  <SelectItem value="大樓">
                    大樓
                  </SelectItem>
                  <SelectItem value="雅房">
                    雅房
                  </SelectItem>
                  <SelectItem value="套房">
                    套房
                  </SelectItem>
                  <SelectItem value="其他房型">
                    其他房型
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="property_attributes.genderRestriction"
    >
      <FormItem>
        <FormLabel>性別限制</FormLabel>
        <FormControl>
          <!-- 第二個 Select -->
          <Select v-bind="componentField">
            <SelectTrigger class="w-[180px]">
              <SelectValue placeholder="是否有限制性別" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel class="text-red-500">
                  性別
                </SelectLabel>
                <SelectItem value="男">
                  男
                </SelectItem>
                <SelectItem value="女">
                  女
                </SelectItem>
                <SelectItem value="多元">
                  多元
                </SelectItem>
                <SelectItem value="無">
                  無
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ value, handleChange }"
      name="property_attributes.rentalSubsidy"
    >
      <FormItem>
        <FormLabel>租屋補貼</FormLabel>
        <FormControl>
          <!-- Checkbox -->
          <div class="flex items-center space-x-2">
            <Checkbox
              :checked="value"
              @update:checked="handleChange"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <label
                    for="terms"
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    是否能租屋補貼? </label>
                </TooltipTrigger>
                <TooltipContent>
                  <p>更多資訊：可以租屋補貼會讓刊登廣告推廣更好。</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <!-- Checkbox -->
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="my-2 flex">
      <Button
        type="submit"
        class="ml-auto"
      >
        送出
      </Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import type { QueryData } from '@supabase/supabase-js';
import type { Database, Tables, Enums, Json } from "~/database.types";
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
const supabase = useSupabaseClient<Database>();
type inputType = {
  created_at: string | null;
  description: string | null;
  id: string;
  is_public: boolean;
  price: number;
  property_attributes: Json | null;
  rental_property_id: string;
  updated_at: string | null;
};

type formType = {
  id: string;
  price: number;
  description: string;
  is_public: boolean;
  property_attributes: {
    type: "透天" | "公寓" | "大樓" | "套房" | "雅房" | "其他房型";
    genderRestriction: "男" | "女" | "多元" | "無";
    rentalSubsidy: boolean
  }
};
const props = defineProps({
  rental: {
    type: Object as PropType<inputType | null>,
    default: null
  },
});


const temp = props.rental ? JSON.parse(props.rental!.property_attributes! as string) as formType['property_attributes'] : {
  type: '透天',
  genderRestriction: '無',
  rentalSubsidy: false
};

const rental = ref({
  ...props.rental!,
  property_attributes: {
    ...temp
  }
} as formType);

const formSchema = toTypedSchema(
  z.object({
    price: z.number().min(0, 'Price must be a positive number').default(rental.value?.price || 0),
    description: z.string().min(10, 'Description must be at least 10 characters long').default(rental.value?.description || ''),
    is_public: z.boolean().default(rental.value?.is_public || false),
    property_attributes: z.object({
      type: z.enum(['透天', '公寓', '大樓', '套房', '雅房', '其他房型']).default(rental.value?.property_attributes.type || '透天'),
      genderRestriction: z.enum(['男', '女', '多元', '無']).default(rental.value?.property_attributes.genderRestriction || '無'),
      rentalSubsidy: z.boolean().optional().default(rental.value?.property_attributes.rentalSubsidy || false),
    }),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(values => {
  console.log(values);
  const formData = {
    id: rental.value?.id || undefined,
    ...values,
    property_attributes: {
      ...values.property_attributes,
    },
  } as unknown as formType;
  emits("submit", formData);
  console.log(formData);
});


const emits = defineEmits<{
  (
    e: "submit",
    payload: formType
  ): void;
}>();



</script>