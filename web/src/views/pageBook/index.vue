<template>
  <div class="page-book-box">
    <el-button @click="addUser">添加</el-button>
    <el-button @click="deleteUser">删除</el-button>
    <el-button @click="updateUser">修改</el-button>
    <el-button @click="queryUser">查询</el-button>
  </div>
</template>

<script setup lang="ts">
import { userApi } from '@/api'
import { generateRandomString } from '@/utils'
const addUser = async () => {
  const params = {
    username: generateRandomString(),
    password: '123456',
    mobile: 15986655953,
    avatar: null,
    freezed: 0,
    slogan: '创造奇迹',
  }
  await userApi.createUser(params)
}

const deleteUser = async () => {
  await userApi.deleteUser(19)
}

const updateUser = async () => {
  await userApi.updateUser({
    id: 25,
    username: '嘿嘿嘿',
    password: '888888',
    mobile: 13510742756,
    avatar: null,
    freezed: 0,
    slogan: '我们是祖国未来的花朵',
  })
}

const queryUser = async () => {}
</script>

<style lang="less" scoped>
.page-book-box {
  margin-top: 10px;
}
</style>
