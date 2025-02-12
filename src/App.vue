<script setup lang="ts">
import type { ButtonType } from 'ant-design-vue/es/button'
import { ref } from 'vue'
import { AmTable } from './../packages/table/index'

const testTable = ref()
const columns: any[] = [
  {
    title: '基地编码',
    dataIndex: 'comp',
  },
  {
    title: '公司',
    dataIndex: 'dsca',
  },
  {
    title: '域',
    dataIndex: 'ctyp',
  },
]
const actions = [
  {
    title: '刷新',
    label: '刷新123',
    type: 'primary' as ButtonType,
    // onClick: () => {
    //   testTable.value.reload()
    // },
    popConfirm: {
      title: '确定要刷新吗？',
      confirmText: '确定',
      cancelText: '取消',
      onConfirm: () => {
        testTable.value.reload()
      },
      onCancel: () => {
        console.log('取消')
      },
    },
  },
  // {
  //   title: '编辑',
  //   onClick: () => {
  //     console.log('编辑')
  //   },
  // },
  // {
  //   title: '删除',
  //   type: 'danger',
  //   onClick: () => {
  //     console.log('删除')
  //   },
  // },
  // {
  //   title: '详情',
  //   type: 'primary',
  //   onClick: () => {
  //     console.log('详情')
  //   },
  // },
]
const pagination = {
  pageSize: 10,
  showSizeChanger: true,
  current: 1,
}
async function request(params: any) {
  const res = await fetch('https://sysapp.gree.com/GREESCMCloud/api/comp/list')
  const res1 = await res.json()
  return res1.compList
}
</script>

<template>
  <div>
    <AmTable ref="testTable" :actions="actions" title="学生信息" :columns="columns" :request="request" :pagination="pagination">
      <!--      <template #actions> -->
      <!--        <a-button type="primary" @click="() => testTable.reload()"> -->
      <!--          刷新1 -->
      <!--        </a-button> -->
      <!--        <a-button type="primary" @click="() => testTable.reload()"> -->
      <!--          刷新2 -->
      <!--        </a-button> -->
      <!--        <a-button type="primary" @click="() => testTable.reload()"> -->
      <!--          刷新3 -->
      <!--        </a-button> -->
      <!--      </template> -->
    </AmTable>
  </div>
</template>

<style scoped>
</style>
