import type {
  PaginationProps,
} from 'ant-design-vue/es/pagination'
import type { ColumnType } from 'ant-design-vue/es/table'
import type { VNode } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

export interface BasicTableProps<T = unknown> {
  title: string
  pagination: PaginationProps
  columns: ColumnType[]
  request: (params: unknown, sort: unknown, filter: unknown) => Promise<unknown>
  toolbarRender?: () => VNode | JSX.Element | false // 工具插槽
  filtersRender?: () => VNode | JSX.Element | false // 过滤插槽
  tableAreaRender?: () => VNode | JSX.Element | false // 表格区域插槽
  paginationRender?: () => VNode | JSX.Element | false // 分页插槽
}
