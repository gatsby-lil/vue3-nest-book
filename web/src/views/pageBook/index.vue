<template>
  <div class="page-book-box">
    <div>
      <a-button @click="addUser">添加用户</a-button>
      <a-button @click="deleteUser">删除用户</a-button>
      <a-button @click="updateUser">修改用户</a-button>
      <a-button @click="queryUser">查询用户</a-button>
    </div>
    <div style="margin-top: 10px">
      <a-button @click="addUser">添加角色</a-button>
      <a-button @click="deleteUser">删除角色</a-button>
      <a-button @click="updateUser">修改角色</a-button>
      <a-button @click="queryUser">查询角色</a-button>
    </div>

    <div style="margin-top: 10px">
      <a-button @click="addUser">添加资源</a-button>
      <a-button @click="deleteUser">删除资源</a-button>
      <a-button @click="updateUser">修改资源</a-button>
      <a-button @click="getTreeList">查询资源</a-button>
    </div>
    <div style="margin: 10px; border: 1px solid #ccc; padding: 16px">
      <a-tree
        style="max-width: 600px"
        :data="treeData"
        :props="{
          children: 'children',
          label: 'label',
        }" />
    </div>
    <div style="margin-top: 30px; padding: 16px 24px"></div>
  </div>
</template>

<script setup lang="ts">
import { userApi } from '@/api'
import { roleApi } from '@/api'
import { accessApi } from '@/api'
import { mapLabelValue, isNotEmptyArray } from '@/utils'

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
