<script setup lang="ts">
import { ref } from 'vue'
import { AmTable } from './../packages/table/index'

const testTable = ref()
const columns = [
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
    <AmTable ref="testTable" title="学生信息" :columns="columns" :request="request" :pagination="pagination">
      <template #actions>
        <a-button type="primary" @click="() => testTable.reload()">
          刷新1
        </a-button>
        <a-button type="primary" @click="() => testTable.reload()">
          刷新2
        </a-button>
        <a-button type="primary" @click="() => testTable.reload()">
          刷新3
        </a-button>
      </template>
    </AmTable>
  </div>
</template>

<style scoped>
</style>
