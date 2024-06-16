<template>
  <div class="flex justify-center">
    <div class="w-full flex flex-col justify-center">
      <div class="flex">
        <div class="grid grid-cols-6 w-[500px]">
          <Button
            class="bg-green-600 text-white px-4 py-2 rounded mr-auto dark:bg-green-900"
            @click="navigateTo('/interview/record/new')"
          >
            新增
          </Button>
          <Button
            v-if="props.studentUserId"
            class="px-4 py-2 rounded mr-auto "
            @click="navigateTo('/reserve-interview')"
          >
            預約
          </Button>
        </div>
        <Label class="flex-none w-[40px] place-content-center text-sm">搜尋</Label>
        <div class="flex-strech w-1/2">
          <Input
            v-model="searchText"
            class=""
            placeholder="老師/學生/居住地址"
          />
        </div>
        <div class="w-48 pl-4">
          <Select
            v-model="selectedFilter"
            class="border border-gray-300 rounded"
          >
            <SelectTrigger>
              <SelectValue placeholder="選擇篩選條件" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>篩選條件</SelectLabel>
                <SelectItem value="all">
                  全部
                </SelectItem>
                <SelectItem value="record_time_ascending">
                  訪視日期：低到高
                </SelectItem>
                <SelectItem value="record_time_descending">
                  訪視日期：高到低
                </SelectItem>
                <SelectItem value="updated_time_ascending">
                  最後編輯時間：低到高
                </SelectItem>
                <SelectItem value="updated_time_descending">
                  最後編輯時間：高到低
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div class="mt-3">
        <Skeleton
          v-if="pending"
          class="h-[50px] rounded-lg border"
        />
        <div
          v-if="records?.length !== 0"
          class="rounded-lg border"
        >
          <Table>
            <TableCaption v-if="props.studentUserId">
              以上為與該學生相關的訪視記錄
            </TableCaption>
            <TableCaption v-else>
              以上為所有訪視記錄
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead class="w-1/12">
                  老師名稱
                </TableHead>
                <TableHead class="w-1/12">
                  學生名稱
                </TableHead>
                <TableHead class="w-1/12">
                  訪視日期
                </TableHead>
                <TableHead class="w-2/12">
                  最後編輯時間
                </TableHead>
                <TableHead class="w-4/12">
                  居住地址
                </TableHead>
                <TableHead class="w-1/12 text-right">
                  填答狀態
                </TableHead>
                <TableHead class="w-1/12 text-right">
                  操作
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template
                v-for="(row, index) in paginatedRows"
                :key="index"
              >
                <TableRow>
                  <InterviewTableRow 
                    :teacher-name="row.teacher?.app_user?.name!"
                    :student-name="row.student?.app_user?.name!"
                    :record-time="handleTime(row.record_time)"
                    :updated-time="handleTime(row.updated_at!)"
                    :location="row.rental_property?.address!"
                    :property-link="row.property_id!"
                    :record-link="row.record_link"
                    :status="row.status!"
                  />
                  <TableCell class="text-right">
                    <Dialog>
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
                          <DialogTrigger class="w-full">
                            <DropdownMenuItem class="cursor-pointer">
                              分享
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem
                            class="cursor-pointer focus:bg-red-500 focus:text-white"
                            @click="deleteRecord(row.record_link);"
                          >
                            刪除
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <InterviewFormShare :link="row.record_link" />
                    </Dialog>
                  </TableCell>
                </TableRow>
              </template>
            </TableBody>
          </Table>
        </div>

        <div
          v-else
          class="flex justify-center p-5 rounded-lg border"
        >
          <p>目前沒有任何訪視記錄</p>
        </div>
        <div class="mt-4 flex justify-center">
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
              <PaginationPrev @click="currentPage -= 1" />

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
              <PaginationNext @click="currentPage += 1" />
              <PaginationLast @click="currentPage = Math.ceil(usersSearched.length / rowsPerPage)" />
            </PaginationList>
          </Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Database, Tables, Enums } from "~/database.types";
import Table from "../ui/table/Table.vue";
import { toast } from "@/components/ui/toast";

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  studentUserId: {
    type: String,
    required: false,
    // default: "97fdcdda-8a08-4d07-abd0-2b3e5b7dace4"
  },
  propertyId: {
    type: String,
    default: "",
  },
});

const supabase = useSupabaseClient<Database>();
const app_user = useUser();

const {
  data: records,
  error,
  pending,
  refresh,
} = useAsyncData("get_record", async () => {
  if(props.studentUserId === undefined){
    const { data } = await supabase.from("interview_record").select("*, student!inner(user_id, app_user(*)), teacher(app_user(*)), rental_property(*)").order("record_time", { ascending: true });
    return data;
  }
  else{
    const { data } = await supabase.from("interview_record").select("*, student!inner(user_id, app_user(*)), teacher(app_user(*)), rental_property(*)").eq("student.user_id", props.studentUserId).order("record_time", { ascending: true });
    return data?.filter((record) => record.property_id === props.propertyId || props.propertyId === "");
  }
});

const handleTime = (time: string) => {
  if(time.length > 10){
    const locale = new Date(time).toLocaleString();
    const split_date = locale.split(' ')[0].split('/');
    if(split_date[0].length === 1) split_date[0] = '0' + split_date[0];
    if(split_date[1].length === 1) split_date[1] = '0' + split_date[1];
    
    const stamp = ref('');
    const split_time = locale.split(' ')[1].split(':');
    if(split_time[0].slice(0, 2) === '上午')
      stamp.value = 'AM';
    else
      stamp.value = 'PM';

    split_time[0] = split_time[0].slice(2);
    if(split_time[0].length === 1) split_time[0] = '0' + split_time[0];
    return split_date.join('-') + ' ' + stamp.value + split_time[0] + ':' + split_time[1];
  }
  return time;
};

const currentPage = ref(1);
const rowsPerPage = 8;
const searchText = ref("");

const selectedFilter = ref("");
const sortedRecords = computed(() => {
  if (!records.value) return [];

  if(selectedFilter.value === 'record_time_ascending'){
    return [...records.value].sort((a, b) => {
      const timeA = new Date(a.record_time).valueOf() ?? 0;
      const timeB = new Date(b.record_time).valueOf() ?? 0;
      return timeA - timeB;
    });
  }
  else if(selectedFilter.value === 'record_time_descending'){
    return [...records.value].sort((a, b) => {
      const timeA = new Date(a.record_time).valueOf() ?? 0;
      const timeB = new Date(b.record_time).valueOf() ?? 0;
      return timeB - timeA;
    });
  }
  else if(selectedFilter.value === 'updated_time_ascending'){
    return [...records.value].sort((a, b) => {
      const timeA = new Date(a.updated_at!).valueOf() ?? 0;
      const timeB = new Date(b.updated_at!).valueOf() ?? 0;
      return timeA - timeB;
    });
  }
  else if(selectedFilter.value === 'updated_time_descending'){
    return [...records.value].sort((a, b) => {
      const timeA = new Date(a.updated_at!).valueOf() ?? 0;
      const timeB = new Date(b.updated_at!).valueOf() ?? 0;
      return timeB - timeA;
    });
  }
  else{
    return records.value;
  }
});
// 搜尋後的使用者列表
const usersSearched = computed(() => {
  if (!sortedRecords.value) return [];
  console.log(sortedRecords.value);
  const userSearched = sortedRecords.value.filter((record) => {
    if (searchText.value === "") return true;
    if (!record.student?.app_user?.name || !record.teacher?.app_user?.name || !record.rental_property?.address) return false;
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

watch(searchText, async () => {
  const button = document.getElementById("button1");
  button?.click();
});

const deleteRecord = async (recordLink: string) => {
  const { data, error } = await supabase.from("interview_record").delete().eq("record_link", recordLink);

  if (error) {
    toast({
      title: "Error",
      description: error.message,
      variant: "destructive",
    });
    return;
  } else {
    toast({
      title: "Success",
      description: "刪除成功",
    });
  }
  await refresh();
};
</script>

<style></style>
