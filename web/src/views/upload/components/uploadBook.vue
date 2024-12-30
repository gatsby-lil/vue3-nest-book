<template>
  <!-- 文件上传 -->
  <el-drawer v-model="isShowDrawer" size="900px">
    <el-form :model="uploadBookForm" label-width="auto" style="max-width: 600px">
      <el-form-item label="文件名">
        <el-input v-model="uploadBookForm.originBookName" show-word-limit maxlength="20" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="uploadBookForm.description" type="textarea" show-word-limit maxlength="200" />
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="uploadBookForm.tags" multiple filterable allow-create default-first-option :reserve-keyword="false" placeholder="请选择" style="width: 240px">
          <el-option v-for="item in tagsList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="上传文件">
        <div class="upload-book-container" ref="uploadRef">
          <div>拖拽到此处上传</div>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="() => changeShowDrawer(false)" size="large">取消</el-button>
        <el-button type="primary" @click="confirm" size="large">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import useDragAndClick from '../hooks/useDragAndClick'
const props = defineProps({
  confirm: {
    type: Function,
    required: true
  },
})
const uploadRef = ref<HTMLDivElement | null>(null)
const { selectFile } = useDragAndClick(uploadRef)

const uploadBookForm = reactive({
  bookName: '',
  description: '',
  tags: []
})

const tagsList = ref([])

const isShowDrawer = ref(false)

const changeShowDrawer = (isShow) => {
  isShowDrawer.value = isShow
}



defineExpose({
  selectFile,
  changeShowDrawer
})
</script>

<style lang="less" scoped>
.upload-book-container {
  width: 800px;
  height: 150px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #d9d9d9;
  background-color: #fafafa;

  .upload-book-input {
    display: none;
  }
}

.upload-book-container:hover {
  border-color: #40a9ff;
}
</style>
