<template>
  <div class="upload-box">
    <div class="upload-enter-box">
      <el-button type="primary" size="large" @click="clickChangeDrawer"> 点击上传 </el-button>
    </div>
    <!-- 文件上传 -->
    <el-drawer v-model="isShowDrawer" size="900px">
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="描述">
          <el-input v-model="form.desc" type="textarea" show-word-limit maxlength="30" />
        </el-form-item>
        <el-form-item label="标签">
          <el-button class="button-new-tag" size="small" @click="showInput"> + 添加标签</el-button>
        </el-form-item>
        <el-form-item label="上传文件">
          <upload-book ref="uploadRef" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确认</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 文件上传列表 -->
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { fileUpload } from '@/services'
import { createFileChunks, getFileHashName } from '@/utils'
import { CHUNK_SIZE } from '@/constant'

const form = reactive({
  desc: '',
})

const isShowDrawer = ref(false)
const axiosCancelTokenList = ref<any>([])
const uploadRef = ref()

const clickChangeDrawer = () => {
  isShowDrawer.value = true
}

/**
 * 获取到file文件, 开始上传
 * 1. 计算文件HASH
 * 2. 请求接口是否已经存在
 * 3. 计算进度
 * 4. 分片上传完调用合并接口
 */
const confirmClick = async () => {
  const file = uploadRef.value.selectFile
  // 源文件名
  const originfileName = file.name
  // 分片
  const chunks = createFileChunks(file, CHUNK_SIZE)
  // 计算文件hash名称
  const fileHashName = await getFileHashName(file)
  // 获取文件的后缀
  const fileExtension = file.name.split('.').pop()
  console.log(fileHashName, file, 'fileHashName')

  /**
   * 1. hash文件名
   * 2. 原文件名
   * 3. 分片数
   * 4. 描述
   * 5. 标签
   */
  const uploadTaskList = chunks.map((item) => {
    const chunkName = fileHashName + '.' + fileExtension + '-' + item.chunkIndex
    const formData = new FormData()
    formData.append('originfileName', originfileName)
    formData.append('fileName', fileHashName)
    formData.append('fileDesc', form.desc)
    formData.append('chunkName', chunkName)
    formData.append('chunk', item.chunk)
    return formData
  })
  // 开启任务发送请求
  uploadChunkFileList(uploadTaskList)
}

const uploadChunkFileList = async (uploadTaskList: FormData[]) => {
  for (let uploadChunk of uploadTaskList) {
    // 创建axios的token用于上传的取消
    try {
      const axiosCancelToken = axios.CancelToken.source()
      axiosCancelTokenList.value.push(axiosCancelToken)
      const result = await fileUpload(uploadChunk, {
        cancelToken: axiosCancelToken,
      })
      console.log(result, 'result')
    } catch (error) {
      console.log(error, 'error')
    }
  }
}

const cancelClick = () => {
  isShowDrawer.value = false
}

const showInput = () => {}
</script>

<style lang="less" scoped>
.upload-box {
  height: 100vh;
  width: 100vw;

  .upload-enter-box {
    margin-top: 20px;
    margin-left: 30px;
    width: 200px;
    height: 150px;
  }
}
</style>
