<template>
  <div class="page-book-box">
    <el-button @click="add">添加</el-button>
    <el-button>删除</el-button>
    <el-button>修改</el-button>
    <el-button>查询</el-button>
  </div>
</template>

<script setup lang="ts">
import userApi from '@/api'
const add = async () => {
  const params = {
    username: 'Gatsby',
    password: '123456',
    mobile: '15986655953',
    avatar: 'www.baidu.com',
    freezed: 1,
    slogan: '创造奇迹',
  }
  const result = await userApi.createUser(params)
}
</script>

<style lang="less" scoped>
.page-book-box {
  margin-top: 10px;
}
</style>
