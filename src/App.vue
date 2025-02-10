<script setup lang="ts">
import { AmTable } from './../packages/table/index'

const columns = [
  {
    title: '角色',
    dataIndex: 'username',
  },
  {
    title: '姓名',
    dataIndex: 'username',
  },
  {
    title: '年龄',
    dataIndex: 'username',
  },
]
const pagination = {
  pageSize: 10,
  showSizeChanger: true,
}
async function request(params: any) {
  console.log(params)
}
</script>

<template>
  <div>
    <AmTable title="学生信息" :columns="columns" :request="request" :pagination="pagination" />
  </div>
</template>

<style scoped>
</style>
