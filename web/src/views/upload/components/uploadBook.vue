<template>
  <!-- 文件上传 -->
  <el-drawer v-model="isShowDrawer" size="900px">
    <el-form :model="uploadBookForm" :rules="uploadBookFormRules" label-width="auto" style="max-width: 600px" ref="uploadBookFormRef">
      <el-form-item label="文件名" prop="bookName">
        <el-input v-model="uploadBookForm.bookName" show-word-limit maxlength="20" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="uploadBookForm.description" type="textarea" show-word-limit maxlength="200" />
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select v-model="uploadBookForm.tags" filterable allow-create default-first-option :reserve-keyword="false" placeholder="请选择" style="width: 600px">
          <el-option v-for="item in tagsList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="上传文件" prop="selectFile">
        <div class="upload-book-container" ref="uploadRef">
          <div class="upload-description">
            <div>说明:</div>
            <div>① 支持格式: pdf、epub</div>
            <div>② 每次文件上传大小总数不超过1GB</div>
          </div>
          <div class="file-upload-icon">
            <img src="@/assets/uploading.svg" />
            <p class="file-info">点击选择文件</p>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div class="select-list-container">
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
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="() => changeShowDrawer(false)" size="large">取消</el-button>
        <el-button type="primary" @click="confirm" size="large">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { tagsApi } from '@/api'
import { mapLabelValue, isNotEmptyArray } from '@/utils'
import { MAX_FILE_NUM } from '@/constant'
import { IFileWithFileId } from '@/types'
import useDragAndClick from '../hooks/useDragAndClick'

defineProps({
  confirm: {
    type: Function,
    required: true,
  },
})

const tagsList = ref([])
const isShowDrawer = ref(false)
const uploadRef = ref<HTMLDivElement | null>(null)
const uploadBookFormRef = ref(null)
const { selectFileList } = useDragAndClick(uploadRef, isShowDrawer)

const uploadBookForm = reactive({
  bookName: '',
  description: '',
  tags: [],
})

const uploadBookFormRules = ref({
  bookName: [
    { required: true, message: '必填项', trigger: 'blur' },
    // { min: 5, max: 10, message: '名称长度应在 2 到 20 个字符之间', trigger: 'blur' },
  ],
  tags: [{ required: true, message: '必填项', trigger: 'blur' }],
  selectFile: [
    {
      validator: (_, value, callback) => {
        if (!isNotEmptyArray(selectFileList.value)) {
          return callback(new Error('至少上传一个文件'))
        }
        if (selectFileList.value.length > MAX_FILE_NUM) {
          return callback(new Error('每次上传不得超过10个文件'))
        }
        return callback()
      },
    },
  ],
})

const changeShowDrawer = (isShow) => {
  isShowDrawer.value = isShow
}

const initData = async () => {
  const result = await tagsApi.getTags()
  tagsList.value = mapLabelValue(result, 'tagName', 'id')
}

const deleteFile = (fileId) => {
  selectFileList.value = selectFileList.value.filter((fileObject: IFileWithFileId) => fileObject.fileId != fileId)
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
    align-items: center; /* 水平居中对齐 */
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
</style>
