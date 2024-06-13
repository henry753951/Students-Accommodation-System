<template>
  <div class="flex justify-center">
    <div class="grid grid-cols-1 gap-5 w-2/3">
      <div class="flex">
        <NuxtLink
          to="/interview/record/new"
          class="flex-none w-1/2"
        >
          <Button 
            class="bg-green-600 text-white px-4 py-2 rounded"
          >
            新增
          </Button>
        </NuxtLink>
        <Label class="flex-none w-[40px] place-content-center text-sm">搜尋</Label>
        <div class="flex-strech w-1/2">
          <Input
            v-model="searchText"
            class=""
            placeholder="老師/學生/居住地址"
          />
        </div>
      </div>
      <div class="place-self-strech">
        <Skeleton
          v-if="records?.length === 0"
          class="h-[50px]"
        />
        <Table v-if="records?.length !== 0">
          <TableCaption>以上為與你相關的訪視記錄</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead class="w-1/12">
                老師名稱
              </TableHead>
              <TableHead class="w-1/12">
                學生名稱
              </TableHead>
              <TableHead class="w-2/12">
                最後編輯時間
              </TableHead>
              <TableHead class="w-7/12">
                居住地址
              </TableHead>
              <TableHead class="w-1/12 text-right">
                操作
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template
              v-for="row in paginatedRows"
              :key="row"
            >
              <TableRow>
                <InterviewTableRow 
                  :teacher-name="row.teacher?.app_user?.name!"
                  :student-name="row.student?.app_user?.name!"
                  :created-time="handleTime(row.record_time)"
                  :location="row.rental_property?.address!"
                  :property-link="row.property_id!"
                  :record-link="row.record_link"
                />
                <TableCell class="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button
                        size="xs"
                        variant="ghost"
                      >
                        <Icon name="ri:more-fill" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <NuxtLink :to="'/interview/record/info-' + row.record_link">
                        <DropdownMenuItem class="cursor-pointer">
                          確認資料
                        </DropdownMenuItem>
                      </NuxtLink>
                      <NuxtLink :to="'/interview/record/' + row.record_link">
                        <DropdownMenuItem class="cursor-pointer">
                          編輯
                        </DropdownMenuItem>
                      </NuxtLink>
                      <DropdownMenuItem
                        class="cursor-pointer focus:bg-red-500 focus:text-white"
                        @click="deleteRecord(row.record_link);"
                      >
                        刪除
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </div>
      <div class="place-self-center">
        <Pagination
          v-slot="{ page }"
          :items-per-page="rowsPerPage"
          :total="usersSearched.length"
          :sibling-count="1"
          show-edges
        >
          <PaginationList
            v-slot="{ items }"
            class="flex items-center gap-1"
          >
            <PaginationFirst @click="currentPage = 1" />
            <PaginationPrev @click="currentPage -=1" />

            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                v-model="currentPage"
                :value="item.value"
                as-child
              >
                <Button
                  :id="'button' + item.value"
                  class="w-10 h-10 p-0"
                  :variant="item.value === page ? 'default' : 'outline'"
                  @click="currentPage = item.value"
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

            <PaginationNext @click="currentPage +=1" />
            <PaginationLast @click="currentPage = Math.ceil(usersSearched.length / rowsPerPage)" />
          </PaginationList>
        </Pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import Table from "../ui/table/Table.vue";
import { toast } from '@/components/ui/toast';

const supabase = useSupabaseClient<Database>();

const { data: records, error , refresh } =  useAsyncData('get_record' , async() => {
  const { data } = await supabase
  .from('interview_record')
  .select('*, student(app_user(*)), teacher(app_user(*)), rental_property(*)');
  console.log(data);
  return data;
});

const handleTime = (time: string) => {
  const hour: number = +time.slice(11, 13);
  if(hour < 12){
    return time.slice(0, 10) + " / AM" + time.slice(11, 16);
  }
  else{
    return time.slice(0, 10) + " / PM" + time.slice(11, 16);
  }
};

const currentPage= ref(1);
const rowsPerPage = 8;
const searchText = ref("");

// 搜尋後的使用者列表
const usersSearched = computed(() => {
  if (!records.value) return [];
  const userSearched = records.value.filter((record) => {
    if (searchText.value === "") 
      return true;
    if (!record.student?.app_user?.name || !record.teacher?.app_user?.name || !record.rental_property?.address) 
      return false;
    return record.student?.app_user?.name.includes(searchText.value) || record.teacher?.app_user.name.includes(searchText.value) || record.rental_property?.address.includes(searchText.value);
  });
  return userSearched;
});

const paginatedRows = computed(() => {
    if (!usersSearched.value) return [];
    const start = (currentPage.value - 1) * rowsPerPage;
    const end = start + rowsPerPage;
  return usersSearched.value.slice(start, end);
});

watch(searchText, async() =>{
  const button = document.getElementById('button1');
  button?.click();
});

const deleteRecord = async (recordLink: string) => {
  console.log(recordLink);
  const {data , error} = await supabase
    .from('interview_record')
    .delete()
    .eq("record_link", recordLink);

    if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
    return;
    }
    else{
      toast({
        title: "Success",
        description: "刪除成功",
      });
    }
  await refresh();
};
</script>

<style>

</style>