<template>
  <form @submit="onSubmit">
    <FormField
      v-slot="{ componentField }"
      name="price"
    >
      <FormItem>
        <FormLabel>Price</FormLabel>
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
        <FormLabel>Description</FormLabel>
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
      <FormItem>
        <FormLabel>Is Public</FormLabel>
        <FormControl>
          <Switch
            :checked="value"
            @update:checked="handleChange"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField
      v-slot="{ componentField }"
      name="property_attributes.type"
    >
      <FormItem>
        <FormLabel>Property Attributes(這邊應該是能否租屋補貼/限男女....)</FormLabel>
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
        <FormLabel>Property Attributes(這邊應該是能否租屋補貼/限男女....)</FormLabel>
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
        <FormLabel>Property Attributes(這邊應該是能否租屋補貼/限男女....)</FormLabel>
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
        Submit
      </Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

const formSchema = toTypedSchema(
  z.object({
    price: z.number().min(0, 'Price must be a positive number'),
    description: z.string().min(10, 'Description must be at least 10 characters long'),
    is_public: z.boolean(),
    property_attributes: z.object({
      type: z.enum(['透天', '公寓', '大樓', '套房', '雅房', '其他房型']),
      genderRestriction: z.enum(['男', '女', '多元', '無']),
      rentalSubsidy: z.boolean().optional(),
    }),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(values => {
  const formData = {
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

</script>