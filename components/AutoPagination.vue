<template>
  <div class="flex flex-col">
    <slot />
    <Pagination
      v-if="data"
      v-model:page="currentPage"
      class="flex justify-center"
      :total="data.length"
      :items-per-page="itemsPerPage"
      :sibling-count="1"
      show-edges
    >
      <PaginationList
        v-slot="{ items }"
        class="flex items-center gap-1"
      >
        <PaginationFirst />
        <PaginationPrev />
        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value === currentPage ? 'default' : 'outline'"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis
            v-else
            :key="item.type"
            :index="index"
          />
        </template>
        <PaginationNext />
        <PaginationLast />
      </PaginationList>
    </Pagination>
  </div>
</template>
<script lang="ts" setup>
const data = defineModel(
  "data",
  {
    type: Array,
    default: () => [],
  });

const page = defineModel("page", {
  type: Number,
  default: 1,
});

const currentPage = ref(1);
const itemsPerPage = 50;
</script>
<style></style>