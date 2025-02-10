<script setup lang="tsx">
import type { PaginationProps } from 'ant-design-vue'
import type { BasicTableProps, IPagination } from './types'
import { Table as AntTable } from 'ant-design-vue'
import { isNil } from 'lodash-es'
import { computed, onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  name: 'BasicTable',
})
const props = withDefaults(defineProps<BasicTableProps>(), {
  columns: () => [],
  request: () => Promise.resolve({}),
})
const loading = ref<boolean>(false)
const isLoading = computed(() => props.loading ?? loading.value)
const dataSource = ref<any[]>([])
async function request(pagination: IPagination) {
  try {
    loading.value = true
    dataSource.value = await props.request(pagination) as any
  }
  finally {
    loading.value = false
  }
}
// let timer: NodeJS.Timeout | number
let timer: ReturnType<typeof setInterval> | null | undefined = null
onMounted(() => {
  const { current, pageSize } = props.pagination || {}
  request({
    pageSize: pageSize || 10,
    currentPage: current || 1,
  })
  if (props.polling) {
    timer = setInterval(() => {
      reload()
    }, props.pollingInterval || 10000)
  }
})
onUnmounted(() => {
  if (timer)
    clearInterval(timer)
})
// 刷新 用于轮询
function reload() {
  const { current, pageSize } = props.pagination || {}
  request({
    pageSize: pageSize || 10,
    currentPage: current || 1,
  })
}
function handleChange(pagination: PaginationProps) {
  const { current, pageSize } = pagination
  request({ pageSize: pageSize || 10, currentPage: current || 1 })
}
defineExpose({
  reload,
})
</script>

<template>
  <div class="basic-table">
    <slot name="filters" />
    <slot name="toolbar">
      <div class="flex justify-between">
        <slot name="表格标题">
          {{ title }}
        </slot>
        <slot name="actions">
          <!-- <slot name="toolbar-right" /> -->
          <!-- TODO:actions -->
        </slot>
      </div>
    </slot>
    <slot name="table-area">
      <AntTable
        :columns="columns"
        :data-source="dataSource"
        :pagination="!isNil($slots.pagination) ? false : pagination"
        :loading="isLoading"
        :row-key="(record) => record.id"
        :request="request"
        @change="handleChange"
      />
      <slot name="pagination" />
    </slot>
  </div>
</template>

<style scoped>

</style>
