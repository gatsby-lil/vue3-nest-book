<template>
  <div class="page-book-box">
    <el-button @click="addUser">添加</el-button>
    <el-button @click="deleteUser">删除</el-button>
    <el-button>修改</el-button>
    <el-button>查询</el-button>
  </div>
</template>

<script setup lang="ts">
import { userApi } from '@/api'
const addUser = async () => {
  const params = {
    username: 'zydsksk',
    password: '123456',
    mobile: 15986655953,
    avatar: null,
    freezed: 0,
    slogan: '创造奇迹',
  }
  const result = await userApi.createUser(params)
}

const deleteUser = async () => {
  const result = await userApi.deleteUser(19)
}
</script>

<style lang="less" scoped>
.page-book-box {
  margin-top: 10px;
}
</style>
