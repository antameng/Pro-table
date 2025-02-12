<script setup lang="tsx">
import type { PaginationProps } from 'ant-design-vue'
import type { ColumnType } from 'ant-design-vue/es/table'
import type { BasicTableProps } from './types'
import { MenuOutlined } from '@ant-design/icons-vue'
import { Button as AntButton, Dropdown as AntDropDown, Menu as AntMenu, MenuItem as AntMenuItem, Popconfirm as AntPopConfirm, Table as AntTable } from 'ant-design-vue'
import { isArray, isNil, omit } from 'lodash-es'
import { computed, onMounted, onUnmounted, ref } from 'vue'

defineOptions({
  name: 'BasicTable',
})
const props = withDefaults(defineProps<BasicTableProps>(), {
  columns: () => [],
  request: () => Promise.resolve({}),
})
const columnsArr = computed(() => {
  return props.columns.map((item) => {
    return omit(item, ['isShow', 'value', 'helpMsg', 'type']) as ColumnType
  })
})
const loading = ref<boolean>(false)
const isLoading = computed(() => props.loading ?? loading.value)
const dataSource = ref<any[]>([])
async function request(pagination: PaginationProps = { pageSize: 10, current: 1 }, filters?: Record<string, any>) {
  try {
    loading.value = true
    dataSource.value = await props.request(pagination, filters) as any
  }
  finally {
    loading.value = false
  }
}
// let timer: NodeJS.Timeout | number
let timer: ReturnType<typeof setInterval> | null | undefined = null
onMounted(() => {
  request(props.pagination)
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
  request(props.pagination)
}

function handleChange(pagination: PaginationProps) {
  request(pagination)
}
defineExpose({
  reload,
})
</script>

<template>
  <div class="basic-table m-[15px]">
    <slot name="filters" />
    <slot name="toolbar">
      <div>
        <slot name="表格标题" class="font-200">
          {{ title }}
        </slot>
        <slot name="actions">
          <!-- <slot name="toolbar-right" /> -->
          <!-- TODO:actions -->
          <template v-for="(action, index) in actions" :key="index">
            <template v-if="isArray(action)">
              <AntDropDown>
                <MenuOutlined />
                <template #overlay>
                  <AntMenu>
                    <AntMenuItem v-for="(item, i) in action" :key="i" @click="item.onClick">
                      {{ item.label }}
                    </AntMenuItem>
                  </AntMenu>
                </template>
              </AntDropDown>
            </template>
            <template v-else>
              <!--    如果配置了popConfirm     -->
              <AntPopConfirm
                v-if="!isNil(action?.popConfirm)"
                :title="action.popConfirm?.title"
                :on-confirm="action.popConfirm?.onConfirm"
                :ok-text="action.popConfirm?.confirmText"
                :cancel-text="action.popConfirm?.cancelText"
                @confirm="action.popConfirm?.onConfirm"
                @cancel="action.popConfirm?.onCancel"
              >
                <AntButton :disabled="action.disabled" :type="action.type ?? 'default'" @click="action.onClick">
                  {{ action.label }}
                </AntButton>
              </AntPopConfirm>
              <AntButton v-else :disabled="action.disabled" :type="action.type ?? 'default'" @click="action.onClick">
                {{ action.label }}
              </AntButton>
            </template>
          </template>
        </slot>
      </div>
    </slot>
    <slot name="table-area">
      <AntTable
        :columns="columnsArr"
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
