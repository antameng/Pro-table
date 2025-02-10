<script setup lang="tsx">
import type { BasicTableProps } from './types'
import { Table as AntTable } from 'ant-design-vue'
import { isNil } from 'lodash-es'
import { ref } from 'vue'

defineOptions({
  name: 'BasicTable',
})
withDefaults(defineProps<BasicTableProps>(), {
  columns: () => [],
  request: () => Promise.resolve({}),
})
const loading = ref<boolean>(false)
const dataSource = ref<any[]>([])
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
        :loading="loading"
        :row-key="(record) => record.id"
      />
      <slot name="pagination" />
    </slot>
  </div>
</template>

<style scoped>

</style>
