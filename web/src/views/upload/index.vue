<template>
  <div class="upload-box">
    <div class="upload-enter-box">
      <el-button type="primary" size="large" @click="clickChangeDrawer"> 点击上传 </el-button>
    </div>
    <!-- 文件上传 -->
    <upload-book :confirm="confirm" ref="uploadRef" />
    <!-- 文件列表 -->
    <page-book-list :bookList="bookList" />
    <!-- 上传进度列表 -->
    <upload-list :fileList="fileList" v-if="fileList.length > 0" />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { uploadApi, bookApi } from '@/api'
import { createFileChunks, getFileHashName, QueueTask, isNotEmptyArray, formatBytes } from '@/utils'
import { CHUNK_SIZE } from '@/constant'
import { UploadStatus } from '@/types'

const queueTask = new QueueTask()
const { proxy } = getCurrentInstance()!

const uploadRef = ref()
const currentFile = ref()
const fileList = ref<File[]>([])
const bookList = ref<any[]>([])

const clickChangeDrawer = () => {
  uploadRef?.value?.changeShowDrawer(true)
}

/**
 * 先调用接口同步表单提交信息
 * 获取到file文件, 开始上传
 * 1. 计算文件HASH
 * 2. 请求接口是否已经存在
 * 3. 计算进度
 * 4. 分片上传完调用合并接口
 */
const confirm = async () => {
  uploadRef.value.changeShowDrawer(false)

  const file = uploadRef.value.selectFile
  // 准备上传任务的参数
  let { originfileName, fileName, uploadTaskList } = await handleUploadParams(file)
  // 校验文件是否已经上传
  const result = await uploadApi.vertifyExistFile(fileName)
  if (result && result?.needUploaded === false) {
    // 提示文件已经在服务器端存在, 无需再上传
    proxy?.$message('文件已经上传, 无需再进行上传')
    return
  }

  const createBookResult = await bookApi.createBook({
    ...uploadRef.value.uploadBookForm,
    size: formatBytes(file.size),
  })

  if (!createBookResult?.id) {
    return
  }

  fileList.value.push({
    fileName: file.name,
    fileSize: file.size,
    percentage: 0,
    status: UploadStatus.WAITING,
  })

  currentFile.value = {
    file,
    fileName,
    originfileName,
  }
  const { uploadedChunkList } = result

  // 根据已经上传的分片进行过滤
  uploadTaskList = uploadTaskList.filter((formData: FormData) => !uploadedChunkList.some((item) => item.chunkFileName === formData.get('chunkName')))

  // 开启上传任务
  uploadChunkFileList(uploadTaskList, createBookResult?.id)
}

const handleUploadParams = async (file: File, id) => {
  // 源文件名
  const originfileName = file.name
  // 分片
  const chunks = createFileChunks(file, CHUNK_SIZE)
  // 计算文件hash名称
  const fileHashName = await getFileHashName(file)
  // 获取文件的后缀
  const fileExtension = file.name.split('.').pop()
  // 用后缀拼接文件名
  const fileName = fileHashName + '.' + fileExtension
  // 组装分片参数
  const uploadTaskList = chunks.map((item) => {
    const chunkName = fileHashName + '.' + fileExtension + '-' + item.chunkIndex
    const formData = new FormData()
    formData.append('originfileName', originfileName)
    formData.append('fileName', fileName)
    formData.append('chunkName', chunkName)
    formData.append('chunk', item.chunk)
    formData.append('id', id)
    return formData
  })
  return {
    originfileName,
    fileName,
    uploadTaskList,
  }
}

const calculateUploadFileProgress = (curIndex, progressEvent) => {
  // 计算已经上传的字节数
  const uploadedByte = curIndex * CHUNK_SIZE
  // 正在上传片的字节数
  const uploadProgressByte = progressEvent.loaded
  // 已经上传的总字节数
  const completedByte = uploadedByte + uploadProgressByte
  // 获取文件的总字节数
  const fileTotalByte = currentFile.value.file.size

  // 计算百分比
  const progressPrecent = Math.round((completedByte * 100) / fileTotalByte)
  const curFile = fileList.value[0]
  fileList.value[0] = {
    ...curFile,
    percentage: progressPrecent,
    status: UploadStatus.UPLOADING,
  }
}

const uploadChunkFileList = async (uploadTaskList: FormData[], id) => {
  const taskList = uploadTaskList.map((uploadChunk: FormData, index) => {
    return () => {
      return uploadApi.fileUpload(uploadChunk, {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const curIndex = uploadChunk.get('chunkName')?.split('-')?.pop()
          calculateUploadFileProgress(curIndex, progressEvent)
        },
      })
    }
  })
  queueTask.pushTask(taskList)
  const result = await queueTask.startTask()
  // 请求合并接口
  if (isNotEmptyArray(result) && result.every((item) => item.success)) {
    // 调用分片合并接口
    const mergeResult = await uploadApi.mergeFile(currentFile.value.fileName, id)
    if (mergeResult) {
      const curFile = fileList.value[0]
      fileList.value[0] = {
        ...curFile,
        percentage: 100,
        status: UploadStatus.SUCCESS,
      }
      getBookList()
    }
  }
}

const stopUploadFile = () => {
  queueTask.stopTask()
}

const resumeUploadFile = async () => {
  const result = await queueTask.startTask()
  // 请求合并接口
  if (isNotEmptyArray(result) && result.every((item) => item.success)) {
    // 调用分片合并接口
    uploadApi.mergeFile(currentFile.value.fileName)
  }
}

const getBookList = async () => {
  const result = await bookApi.getBookList()
  console.log(result, 'result')
  bookList.value = result
}

onMounted(() => {
  getBookList()
})
</script>

<style lang="less" scoped>
.upload-box {
  border-radius: 4px;
  padding: 16px;
  height: calc(100% - 25px);
}
</style>
