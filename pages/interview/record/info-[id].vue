<template>
  <div
    v-if="records"
    class="flex justify-center"
  >
    <div
      v-if="done"
      class="w-2/3 grid grid-cols-1 gap-5"
    >
      <NuxtLink
        :to="'/interview/record/' + id"
        class="w-[50px]"
      >
        <Button>
          編輯
        </Button>
      </NuxtLink>
      <Tabs
        default-value="material"
        class="w-full"
      >
        <TabsList class="grid w-full grid-cols-3">
          <TabsTrigger value="material">
            師生/租屋點資料
          </TabsTrigger>
          <TabsTrigger value="safety">
            校外賃居安全資料 ( 學生填寫 )
          </TabsTrigger>
          <TabsTrigger value="routine">
            環境及作息評估 ( 導師填寫 )
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="material">
          <div class="p-3">
            <Label class="text-xl font-bold">師生資料</Label>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-1/12">
                  資料名稱
                </TableHead>
                <TableHead class="w-5/12">
                  填入資料
                </TableHead>
                <TableHead class="w-1/12">
                  資料名稱
                </TableHead>
                <TableHead class="w-5/12">
                  填入資料
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell class="font-bold">
                  學生姓名
                </TableCell>
                <TableCell>{{ records![0].student?.app_user?.name }}</TableCell>
                <TableCell class="font-bold">
                  老師姓名
                </TableCell>
                <TableCell>{{ records![0].teacher?.app_user?.name }}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell class="font-bold">
                  房東姓名
                </TableCell>
                <TableCell :class="!records![0].landlord_name && 'text-muted-foreground'">
                  {{ records![0].landlord_name ? records![0].landlord_name : '未填寫' }}
                </TableCell>
                <TableCell class="font-bold">
                  房東電話
                </TableCell>
                <TableCell :class="!records![0].landlord_name && 'text-muted-foreground'">
                  {{ records![0].landlord_number ? records![0].landlord_number : '未填寫' }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div class="p-3">
            <Label class="text-xl font-bold">租屋點資料</Label>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-1/12">
                  資料名稱
                </TableHead>
                <TableHead class="w-11/12">
                  填入資料
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell class="w-2/12 font-bold">
                  租屋點地址
                </TableCell>
                <TableCell :class="['w-10/12', !records![0].rental_property?.address && 'text-muted-foreground']">
                  {{ records![0].rental_property?.address ? records![0].rental_property?.address : '未填寫' }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableCaption>以上為您已填入的訪視資料 | 訪視日期 : {{ handleTime(records![0].record_time) }}</TableCaption>
            <TableHeader>
              <TableRow />
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="pair in response_pairs[0]"
                :key="pair[0][0]!"
              > 
                <TableCell class="w-2/12 font-bold">
                  {{ pair[0][0] }}
                </TableCell>
                <TableCell :class="['w-4/12', !pair[0][1] && 'text-muted-foreground']">
                  {{ pair[0][1] ? pair[0][1] : '未填寫' }}
                </TableCell>
                <TableCell class="w-1/12 font-bold">
                  {{ pair[1][0] }}
                </TableCell>
                <TableCell :class="['w-5/12', !pair[1][1] && 'text-muted-foreground']">
                  {{ pair[1][1] ? pair[1][1] : '未填寫' }}
                </TableCell>
                <!-- <TableCell>{{ row_key }}</TableCell>
            <TableCell>{{ (records![0].response as Record<string, any>)[row_key] }}</TableCell> -->
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="safety">
          <Table>
            <TableCaption>以上為您已填入的訪視資料 | 訪視日期 : {{ handleTime(records![0].record_time) }}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead class="w-2/6">
                  資料名稱
                </TableHead>
                <TableHead class="w-1/6">
                  填入資料
                </TableHead>
                <TableHead class="w-2/6">
                  資料名稱
                </TableHead>
                <TableHead class="w-1/6">
                  填入資料
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="pair in response_pairs[1]"
                :key="pair[0][0]!"
              > 
                <TableCell class="font-bold">
                  {{ pair[0][0] }}
                </TableCell>
                <TableCell :class="!pair[0][1] && 'text-muted-foreground'">
                  {{ pair[0][1] ? pair[0][1] : '未填寫' }}
                </TableCell>
                <TableCell class="font-bold">
                  {{ pair[1][0] }}
                </TableCell>
                <TableCell :class="!pair[1][1] && 'text-muted-foreground'">
                  {{ pair[1][1] ? pair[1][1] : '未填寫' }}
                </TableCell>
                <!-- <TableCell>{{ row_key }}</TableCell>
            <TableCell>{{ (records![0].response as Record<string, any>)[row_key] }}</TableCell> -->
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="routine">
          <Table>
            <TableCaption>以上為您已填入的訪視資料 | 訪視日期 : {{ handleTime(records![0].record_time) }}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead class="w-1/6">
                  資料名稱
                </TableHead>
                <TableHead class="w-2/6">
                  填入資料
                </TableHead>
                <TableHead class="w-1/6">
                  資料名稱
                </TableHead>
                <TableHead class="w-2/6">
                  填入資料
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="pair in response_pairs[2]"
                :key="pair[0][0]!"
              > 
                <TableCell class="font-bold">
                  {{ pair[0][0] }}
                </TableCell>
                <TableCell :class="!pair[0][1] && 'text-muted-foreground'">
                  {{ pair[0][1] ? pair[0][1] : '未填寫' }}
                </TableCell>
                <TableCell class="font-bold">
                  {{ pair[1][0] }}
                </TableCell>
                <TableCell :class="!pair[1][1] && 'text-muted-foreground'">
                  {{ pair[1][1] ? pair[1][1] : '未填寫' }}
                </TableCell>
                <!-- <TableCell>{{ row_key }}</TableCell>
            <TableCell>{{ (records![0].response as Record<string, any>)[row_key] }}</TableCell> -->
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Database } from "~/database.types";
const supabase = useSupabaseClient<Database>();
const route = useRoute();
const id = ref(route.params.id);

useHead({
  title: '校外租屋平台 | 訪視紀錄確認',
});

definePageMeta(
  {
    name: "確認訪視紀錄資料",
  }
);

let done = ref(true);
const { data: records } =  useAsyncData('record', async() =>{
  done = ref(false);
  const {data, error} = await supabase
  .from('interview_record')
  .select('*, student(app_user(*)), teacher(app_user(*)), rental_property(*, rental_property_info(*))')
  .eq('record_link', id.value);

  if(error){
    console.log(error);
  }
  done = ref(true);
  return data;
});


const response_pairs = computed(() => {
  const entries = Object.entries(records.value![0].response!);
  // eslint-disable-next-line prefer-const
  let pair = [];
  // eslint-disable-next-line prefer-const
  let pair0 = [];
  // eslint-disable-next-line prefer-const
  let pair1 = [];
  // eslint-disable-next-line prefer-const
  let pair2 = [];
  for (let i = 0; i < entries.length; i += 2) {
    if(i >= 6 && i <= 10){
      if(i === 10){
          pair0.push([entries[i]!, [' ',' ']]);
          i--;
      }
      else
        pair0.push([entries[i]!, entries[i + 1]!]);
    }
    else if(i >= 14 && i <= 27 && i != 21){
      if(i === 20){
        pair1.push([entries[i]!, entries[i + 2]]);
        i++;
      }
      else if(i === 27){
        pair1.push([entries[i]!, [' ', ' ']]);
      }
      else
        pair1.push([entries[i]!, entries[i + 1]!]);
    }
    else{
      if(i === 27){
        break;
      }
      else if(i === 13){
        pair2.push([entries[i]!, handleCareResponse(entries[21])]);
        i--;
      }
      else if(i === 21){
        continue;
      }
      else
        pair2.push([entries[i]!, entries[i + 1]!]);
    }
  }
  pair.push(pair0);
  pair.push(pair1);
  pair.push(pair2);
  return pair;
});

const handleTime = (time: string) => {
  return time;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleCareResponse(entry: any){
  const careRes = [entry[0], ''];
  for(const i in entry[1]){
    if(i === '0')
      careRes[1] = entry[1][i];
    else
      careRes[1] = careRes[1] + '、' +entry[1][i];
  }
  return careRes;
}

</script>

<style>

</style>