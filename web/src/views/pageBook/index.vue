<template>
  <div class="page-book-box">
    <el-button @click="addUser">添加</el-button>
    <el-button @click="deleteUser">删除</el-button>
    <el-button @click="updateUser">修改</el-button>
    <el-button @click="queryUser">查询</el-button>
    <div style="margin-top: 30px; padding: 16px 24px">
      <el-table :data="tableData" border>
        <el-table-column prop="username" label="用户给名" width="200" />
        <el-table-column prop="password" label="密码" width="200" />
        <el-table-column prop="mobile" label="手机号" width="200" />
        <el-table-column prop="avatar" label="头像" width="200" />
        <el-table-column prop="createdAt" label="创建时间" width="300" />
        <el-table-column prop="updatedAt" label="更新时间" width="300" />
        <el-table-column fixed="right" label="Operations" min-width="120">
          <template #default="scope">
            <el-button link type="primary" @click.prevent="deleteRow(scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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

const queryUser = async () => {
  const mockParams = {
    searchWord: '',
    pageSize: 1,
    pageNumber: 10,
  }
  const result = await userApi.getUserList(mockParams)
  console.log(result, 'result')
}

const deleteRow = (row) => {
  console.log(row)
}

const tableData = ref([])

onMounted(async () => {
  const mockParams = {
    searchWord: '',
    pageSize: 1,
    pageNumber: 10,
  }
  const result = await userApi.getUserList(mockParams)
  console.log(result, 'result')
  tableData.value = result
})
</script>

<style lang="less" scoped>
.page-book-box {
  margin-top: 10px;
}
</style>
