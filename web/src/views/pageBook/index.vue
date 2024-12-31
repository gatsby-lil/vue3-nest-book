<template>
  <div class="page-book-box">
    <div>
      <el-button @click="addUser">添加用户</el-button>
      <el-button @click="deleteUser">删除用户</el-button>
      <el-button @click="updateUser">修改用户</el-button>
      <el-button @click="queryUser">查询用户</el-button>
    </div>
    <div style="margin-top: 10px">
      <el-button @click="addUser">添加角色</el-button>
      <el-button @click="deleteUser">删除角色</el-button>
      <el-button @click="updateUser">修改角色</el-button>
      <el-button @click="queryUser">查询角色</el-button>
    </div>

    <div style="margin-top: 10px">
      <el-button @click="addUser">添加资源</el-button>
      <el-button @click="deleteUser">删除资源</el-button>
      <el-button @click="updateUser">修改资源</el-button>
      <el-button @click="getTreeList">查询资源</el-button>
    </div>
    <div style="margin: 10px; border: 1px solid #ccc; padding: 16px">
      <el-tree
        style="max-width: 600px"
        :data="treeData"
        :props="{
          children: 'children',
          label: 'label',
        }" />
    </div>
    <div style="margin: 10px"><el-input v-model="searchWord" style="width: 240px" placeholder="请输入" clearable /></div>
    <div style="margin-top: 30px; padding: 16px 24px">
      <el-table :data="tableData" border max-height="500">
        <el-table-column label="序号" min-width="120">
          <template #default="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="200" />
        <el-table-column prop="mobile" label="手机号" width="200" />
        <el-table-column prop="avatar" label="头像" width="200" />
        <el-table-column prop="slogan" label="个性签名" show-overflow-tooltip />
        <el-table-column prop="createdAt" label="创建时间" width="200" />
        <el-table-column prop="updatedAt" label="更新时间" width="200" />
        <el-table-column fixed="right" label="操作" min-width="120">
          <template #default="scope">
            <el-button link type="primary"> 删除 </el-button>
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
    <el-drawer v-model="createUserDrawer" title="创建用户" :with-header="false">
      <span>创建用户</span>
      <!-- 表单内容 -->
      <el-form :model="userFormData" ref="form" label-width="100px">
        <!-- 用户名字段 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userFormData.username" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <!-- 密码字段 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="userFormData.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <!-- 手机号字段 -->
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userFormData.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>

        <!-- 头像字段 -->
        <el-form-item label="头像" prop="avatar">
          <i class="el-icon-plus"></i>
        </el-form-item>

        <!-- 角色字段 -->
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="userFormData.roleIds" multiple filterable allow-create default-first-option :reserve-keyword="false" placeholder="请选择" style="width: 240px">
            <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="个性签名" prop="slogan">
          <el-input v-model="userFormData.slogan" type="textarea" />
        </el-form-item>

        <!-- 提交和取消按钮 -->
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="() => (createUserDrawer = false)">取消</el-button>
          <el-button type="primary" @click="confirmCreateUser">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { userApi } from '@/api'
import { roleApi } from '@/api'
import { accessApi } from '@/api'
import { generateRandomString, generateChineseName, generateSignature, mapLabelValue, isNotEmptyArray } from '@/utils'

const tableData = ref([])
const searchWord = ref('')
const totalSize = ref(0)
const pageNumber = ref(1)
const pageSize = ref(10)

const treeData = ref([])

const createUserDrawer = ref(false)
const userFormData = ref({
  username: '',
  password: '',
  mobile: '',
  avatar: '',
  slogan: '',
  roleIds: [],
})

const roleList = ref([])

const addUser = () => {
  createUserDrawer.value = true
}

const confirmCreateUser = async () => {
  console.log(userFormData.value, 333)
  const params = {
    ...userFormData.value,
  }
  await userApi.createUser(params)
}

const deleteUser = async () => {
  await userApi.deleteUser(19)
}

const updateUser = async () => {
  await userApi.updateUser({
    id: 25,
    username: '嘿嘿嘿xxxx',
    password: '888888',
    mobile: 13678245305,
    avatar: null,
    // freezed: 0,
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

const getUserList = async () => {
  const mockParams = {
    searchWord: searchWord.value,
    pageSize: pageSize.value,
    pageNumber: pageNumber.value,
  }
  const result = await userApi.getUserList(mockParams)
  const { userList, total } = result
  tableData.value = userList
  totalSize.value = total
}

const getTreeList = async () => {
  const result = await accessApi.getAccessTreeList()
  if (isNotEmptyArray(result)) {
    const next = (list) => {
      return list.map((item) => {
        return {
          label: item.accessName,
          value: item.id,
          children: isNotEmptyArray(item.children) ? next(item.children) : [],
        }
      })
    }
    treeData.value = next(result)
  } else {
    treeData.value = []
  }
}

onMounted(() => {
  getUserList()
  getTreeList()
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

watch(createUserDrawer, async () => {
  if (createUserDrawer.value === true) {
    const roles = await roleApi.getRoles()
    roleList.value = mapLabelValue(roles, 'roleName', 'id')
  }
})
</script>

<style lang="less" scoped>
.page-book-box {
  margin-top: 10px;
}
</style>
