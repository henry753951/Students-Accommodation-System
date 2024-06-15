<template>
  <DialogContent class="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>分享連結</DialogTitle>
      <DialogDescription>
        此連結可以交由學生填寫此表
      </DialogDescription>
    </DialogHeader>
    <div class="flex items-center space-x-2">
      <div class="grid flex-1 gap-2">
        <Label
          for="link"
          class="sr-only"
        >
          Link
        </Label>
        <Input
          id="link"
          :default-value="url.href + '/' + link"
          read-only
        />
      </div>
      <Button
        type="submit"
        size="sm"
        class="px-3"
        @click="copyURL()"
      >
        複製
      </Button>
    </div>
    <DialogFooter class="sm:justify-start">
      <DialogClose as-child>
        <Button
          type="button"
          variant="secondary"
        >
          關閉
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</template>

<script lang="ts" setup>
import { toast } from '@/components/ui/toast';
const url = useRequestURL();

const props = defineProps<{
  link: string,
}>();

function copyURL(){
  navigator.clipboard.writeText(url.href + '/' + props.link);
  toast({
      title: '已複製',
      description: '您可以將此連結分享給學生填寫',
      });
};
</script>

<style>

</style>