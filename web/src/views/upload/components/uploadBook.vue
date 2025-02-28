<template>
  <!-- 文件上传 -->
  <a-drawer
    :visible="isShowDrawer"
    :width="900"
    @ok="confirm"
    @cancel="() => changeShowDrawer(false)"
    unmountOnClose>
    <a-form
      :model="uploadBookForm"
      :rules="uploadBookFormRules"
      label-align="left"
      label-width="auto"
      style="max-width: 600px"
      ref="uploadBookFormRef">
      <a-form-item label="标签" field="tags">
        <a-select v-model="uploadBookForm.tags" placeholder="请选择标签" filter-option>
          <a-option
            v-for="item in tagsList"
            :key="item.value"
            :label="item.label"
            :value="item.value" />
        </a-select>
      </a-form-item>
      <a-form-item label="描述" field="description">
        <a-textarea placeholder="输入描述" allow-clear />
      </a-form-item>
      <a-form-item label="上传文件" field="selectFile">
        <div class="custom-upload">
          <a-upload
            v-model:file-list="selectFileList"
            :show-retry-button="false"
            :auto-upload="false"
            :show-cancel-button="false"
            :show-preview-button="false"
            :limit="10"
            @before-upload="beforeUpload"
            @before-remove="deleteFile"
            multiple />
        </div>
      </a-form-item>
    </a-form>
    <!-- <div class="select-list-container">
      <div class="select-list" v-if="selectFileList?.length > 0">
        <div v-for="fileObject in selectFileList" :key="fileObject.fileId" class="file-item">
          <div class="file-icon">
            <el-icon><Reading /></el-icon>
          </div>
          <div class="file-name">
            <div :title="fileObject.file.name">{{ fileObject.file.name }}</div>
          </div>
          <div class="file-delete" @click="deleteFile(fileObject.fileId)">
            <Delete style="width: 1em; height: 1em; margin-right: 8px" />
          </div>
        </div>
      </div>
    </div> -->
  </a-drawer>
</template>

<script setup lang="ts">
import { tagsApi } from '@/api'
import { mapLabelValue, isNotEmptyArray, generateUniqueId } from '@/utils'
import { IFileWithFileId } from '@/types'
import { MAX_FILE_SIZE, ACCEPT_FILE, MAX_FILE_NUM } from '@/constant'

const { proxy } = getCurrentInstance()!
defineProps({
  confirm: {
    type: Function,
    required: true,
  },
})

const tagsList = ref([])
const selectFileList = ref([])
const isShowDrawer = ref(false)
const uploadRef = ref<HTMLDivElement | null>(null)
const uploadBookFormRef = ref(null)

const uploadBookForm = reactive({
  description: '',
  tags: [],
})

const uploadBookFormRules = ref({
  tags: [{ required: true, message: '必填项', trigger: 'blur' }],
})

const changeShowDrawer = (isShow: boolean) => {
  isShowDrawer.value = isShow
}

const initData = async () => {
  const result = await tagsApi.getTags()
  tagsList.value = mapLabelValue(result, 'tagName', 'id')
}

const deleteFile = (curFileObj) => {
  const fileId = curFileObj.file.fileId
  selectFileList.value = selectFileList.value.filter((fileObject) => {
    console.log(fileObject, 'ooo')
    return fileObject.fileId != fileId
  })
}

const checkFile = (file: File) => {
  if (!file) {
    proxy?.$message.error('未选择任何文件')
    return
  }
  let totalSize = selectFileList.value.reduce(
    (file: File, nextFile: File) => file.size + nextFile.size,
    0,
  )
  totalSize = totalSize += file.size

  if (totalSize > MAX_FILE_SIZE) {
    proxy?.$message.error('文件上传不能大于1GB')
    return
  }

  // 校验上传的文件数量, 每次上传最多不能超过10个
  const originLength = selectFileList.value.length
  if (originLength + 1 > MAX_FILE_NUM) {
    proxy?.$message.error('每次上传的文件个数不能超过10个')
    return
  }

  return true
}

const beforeUpload = (file) => {
  let flag = checkFile(file)

  if (flag) {
    file.fileId = generateUniqueId()
    selectFileList.value.push(file)
  }

  return flag
}

watch(isShowDrawer, () => {
  initData()
})

defineExpose({
  selectFileList,
  changeShowDrawer,
  uploadBookForm,
  formValidate: async () => {
    return await uploadBookFormRef.value.validate()
  },
})
</script>

<style lang="less" scoped>
.select-list-container {
  padding-left: 80px;
  .select-list {
    line-height: 36px;
  }
  .file-item {
    display: flex;
    align-items: center;
    .file-icon {
      padding-top: 3px;
    }
    .file-name {
      padding-left: 8px;
      flex: 1;
      overflow: hidden;
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .file-delete {
      cursor: pointer;
    }
  }
}
.upload-book-container {
  padding: 16px;
  position: relative;
  margin-top: 20px;
  width: 760px;
  height: 280px;
  display: flex;
  flex-direction: column;
  border: 2px dashed #d4dce6;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #f2f7fe;
  }
  .file-info {
    margin: 0px;
    padding-left: 10px;
  }
  .file-upload-icon {
    position: absolute;
    left: 50%;
    top: 135px;
    transform: translate(-50%);
    img {
      width: 96px;
      height: 96px;
    }
  }
}
.custom-upload {
  ::v-deep .arco-progress-type-circle {
    display: none;
  }
  ::v-deep .arco-upload-icon-start {
    display: none;
  }
}
</style>
