<script setup lang="ts">
import { AmTable } from './../packages/table/index'

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
    <AmTable title="学生信息" :columns="columns" :request="request" :pagination="pagination" />
  </div>
</template>

<style scoped>
</style>
