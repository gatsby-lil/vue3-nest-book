<template>
  <div class="upload-box">
    <div class="upload-enter-box">
      <el-button type="primary" size="large" @click="clickChangeDrawer"> 点击上传 </el-button>
      <el-button @click="clickProgress"> 查看上传进度 </el-button>
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
    <div class="file-progress-box" v-if="currentFile">
      <el-progress :percentage="currentProgress" />
      <div class="file-progress-operate">
        <span @click="stopUploadFile">暂停</span>
        <span @click="resumeUploadFile">继续</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { uploadApi } from '@/api'
import { createFileChunks, getFileHashName } from '@/utils'
import { CHUNK_SIZE } from '@/constant'

const form = reactive({
  desc: '',
})

const isShowDrawer = ref(false)
const axiosCancelTokenList = []
const uploadRef = ref()
const currentFile = ref()
const currentProgress = ref(0)

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
  isShowDrawer.value = false
  const file = uploadRef.value.selectFile
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

  currentFile.value = {
    file,
    fileName,
    originfileName,
  }

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
    formData.append('fileName', fileName)
    formData.append('fileDesc', form.desc)
    formData.append('chunkName', chunkName)
    formData.append('chunk', item.chunk)
    return formData
  })
  // 开启任务发送f分片请求
  const uploadChunkResult = await uploadChunkFileList(uploadTaskList)
  // 调用分片合并接口
  if (uploadChunkResult === true) {
    await uploadApi.mergeFile(fileName)
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
  currentProgress.value = progressPrecent
}

const uploadChunkFileList = async (uploadTaskList: FormData[]) => {
  return new Promise(async (resolve, reject) => {
    // 上传分片
    for (let i = 0; i < uploadTaskList.length; i++) {
      let uploadChunk = uploadTaskList[i]
      // 创建axios的token用于上传的取消
      try {
        const axiosCancelToken = axios.CancelToken.source()
        axiosCancelTokenList.push(axiosCancelToken)
        const result = await uploadApi.fileUpload(uploadChunk, {
          cancelToken: axiosCancelToken.token,
          onUploadProgress: (progressEvent: ProgressEvent) => {
            calculateUploadFileProgress(i, progressEvent)
          },
        })
      } catch (error) {
        console.log(error, 'error')
        return reject(error)
      }
    }
    // 分片全部上传完成, Promise完成
    return resolve(true)
  })
}

const cancelClick = () => {
  isShowDrawer.value = false
}

const showInput = () => {}

const clickProgress = async () => {}

const stopUploadFile = () => {
  axiosCancelTokenList.forEach((axiosToken) => {
    axiosToken.cancel('用户取消了上传')
  })
}

const resumeUploadFile = () => {}
</script>

<style lang="less" scoped>
.upload-box {
  height: 100vh;
  width: 100vw;

  .upload-enter-box {
    margin-top: 20px;
    margin-left: 30px;
  }
  .file-progress-box {
    marging-top: 20px;
    padding: 24px 16px;
    width: 300px;
    .file-progress-operate {
      color: #a8abb2;
      font-size: 12px;
      span {
        cursor: pointer;
      }
      & span:nth-of-type(2) {
        margin-left: 8px;
      }
    }
  }
}
</style>
