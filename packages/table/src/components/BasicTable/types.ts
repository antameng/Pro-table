import type {
  PaginationProps,
} from 'ant-design-vue/es/pagination'
import type { ColumnType } from 'ant-design-vue/es/table'
import type { VNode } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

// export interface IPagination {
//   pageSize: number // 页大小
//   currentPage: number // 当前页码
// }
export interface BasicTableProps {
  title: string
  pagination: PaginationProps
  columns: ColumnType[]
  request: (
    pagination: PaginationProps,
  ) => Promise<unknown>
  loading?: boolean
  polling?: boolean
  pollingInterval?: number // 轮询的间隔
  toolbarRender?: () => VNode | JSX.Element | false // 工具插槽
  filtersRender?: () => VNode | JSX.Element | false // 过滤插槽
  tableAreaRender?: () => VNode | JSX.Element | false // 表格区域插槽
  paginationRender?: () => VNode | JSX.Element | false // 分页插槽
}
