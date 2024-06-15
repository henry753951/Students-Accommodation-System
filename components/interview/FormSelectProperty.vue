<template>
  <FormField
    v-slot="{ componentField }"
    name="PropertyAddress"
  >
    <FormItem>
      <FormControl>
        <div class="pb-1">
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="outline">
                選擇租屋點
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[800px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
              <DialogHeader class="p-6 pb-0">
                <DialogTitle>選擇您的租屋點</DialogTitle>
                <DialogDescription>
                  下列是您已在此平台綁定的租屋點
                </DialogDescription>
              </DialogHeader>
              <div class="grid gap-4 py-4 overflow-y-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div
                    v-for="property in rentalProperty"
                    :key="property.id"
                    class="mb-6"
                  >
                    <Card class="rounded-lg shadow-lg overflow-hidden border border-gray-300">
                      <div class="relative">
                        <img
                          src="https://via.placeholder.com/800x400"
                          alt="House Image"
                          class="w-full h-64 object-cover"
                        >
                        <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
                        <div class="absolute bottom-0 left-0 p-4 text-white">
                          <h2 class="text-2xl font-bold">
                            {{ property.rental_property.address }}
                          </h2>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 p-3 gap-5">
                        <DialogClose as-child>
                          <NuxtLink :to="'/advertisement/info-'+property.id">
                            <Button
                              class="w-full"
                              variant="outline"
                            >
                              到該租屋點頁面
                            </Button>
                          </NuxtLink>
                        </DialogClose>
                        <DialogClose as-child>
                          <Button
                            type="submit"
                            class="bg-green-500 text-whitepx-4 py-2 rounded"
                            @click="componentField.onChange(property.rental_property.address);"
                          >
                            選擇
                          </Button>
                        </DialogClose>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
              <DialogFooter class="grid grid-cols-1 place-self-center pb-4">
                <div class="flex gap-3">
                  <p class="text-gray-400">
                    沒有找到您的租屋點?
                  </p>
                  <Icon
                    class="place-self-center"
                    size="10px"
                    name="tabler:arrow-right"
                  />
                  <NuxtLink
                    to="/addRental"
                    class="text-sky-600 hover:underline underline-offset-1"
                  >
                    新增租屋點
                  </NuxtLink>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <FormMessage />
      </FormControl>
      
      <div
        v-if="componentField.modelValue"
        class="pt-3"
      >
        <FormLabel class="font-bold text-lg">
          以下為您選擇的租屋點
        </FormLabel>
      
        <Card
          class="rounded-lg shadow-lg overflow-hidden border"
        >
          <div class="relative">
            <img
              src="https://via.placeholder.com/800x400"
              alt="House Image"
              class="w-full h-64 object-cover"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50" />
            <div class="absolute bottom-0 left-0 p-4 text-white">
              <h2 class="text-2xl font-bold">
                {{ componentField.modelValue }}
              </h2>
            </div>
          </div>
        </Card>
      </div>
    </FormItem>
  </FormField>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Database, Tables, Enums } from "~/database.types";

type rental = Database["public"]['Tables']["rental_property"]["Row"];

defineProps({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rentalProperty: {type: Object as any, required: true},
});
</script>

<style>

</style>