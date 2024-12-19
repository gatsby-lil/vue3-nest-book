<template>
  <div class="page-book-box">
    <el-button @click="addUser">添加</el-button>
    <el-button @click="deleteUser">删除</el-button>
    <el-button @click="updateUser">修改</el-button>
    <el-button @click="queryUser">查询</el-button>
    <div style="margin: 10px"><el-input v-model="searchWord" style="width: 240px" placeholder="请输入" clearable /></div>
    <div style="margin-top: 30px; padding: 16px 24px">
      <el-table :data="tableData" border max-height="500">
        <el-table-column label="序号" min-width="120">
          <template #default="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户给名" width="200" />
        <el-table-column prop="password" label="密码" width="200" />
        <el-table-column prop="mobile" label="手机号" width="200" />
        <el-table-column prop="avatar" label="头像" width="200" />
        <el-table-column prop="createdAt" label="创建时间" width="300" />
        <el-table-column prop="updatedAt" label="更新时间" width="300" />
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #default="scope">
            <el-button link type="primary" @click.prevent="deleteRow(scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      layout="sizes, prev, pager, next"
      v-model:current-page="pageNumber"
      v-model:page-size="pageSize"
      :total="totalSize"
      :page-sizes="[10, 20, 30, 40, 50]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<script setup lang="ts">
import { userApi } from '@/api'
import { generateRandomString, generateChineseName, generateSignature } from '@/utils'

const tableData = ref([])
const searchWord = ref('')
const totalSize = ref(0)
const pageNumber = ref(1)
const pageSize = ref(10)

const addUser = async () => {
  const params = {
    username: generateChineseName(),
    password: '123456',
    mobile: 15986655953,
    avatar: null,
    freezed: 0,
    slogan: generateSignature(),
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
  const result = await userApi.getUserById(130)
  console.log(result, 'result')
}

const deleteRow = (row) => {
  console.log(row)
}
const getUserList = async () => {
  const mockParams = {
    searchWord: searchWord.value,
    pageSize: pageSize.value,
    pageNumber: pageNumber.value,
  }
  const result = await userApi.getUserList(mockParams)
  const { userList, total } = result
  console.log(total, 'total')
  tableData.value = userList
  totalSize.value = total
}

onMounted(() => {
  getUserList()
})

const initData = async () => {
  new Array(50).fill(1).forEach(() => {
    addUser()
  })
}

const handleSizeChange = (val: number) => {
  pageSize.value = val
}
const handleCurrentChange = (val: number) => {
  // console.log(`current page: ${val}`)
  pageNumber.value = val
}

watch([pageNumber, pageSize, searchWord], () => {
  getUserList()
})
</script>

<style lang="less" scoped>
.page-book-box {
  margin-top: 10px;
}
</style>
