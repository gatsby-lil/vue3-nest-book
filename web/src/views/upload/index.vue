<template>
  <div class="upload-box">
    <div class="upload-enter-box">
      <a-button type="primary" @click="clickChangeDrawer">点击上传</a-button>
    </div>
    <!-- 文件上传 -->
    <upload-book :confirm="confirm" ref="uploadRef" />
    <!-- 文件列表 -->
    <page-book-list :bookList="bookList" />
    <!-- 上传进度列表 -->
    <upload-list :uploadingFileList="uploadingFileList" v-if="uploadingFileList.length > 0" />
  </div>
</template>

<script setup lang="ts">
import { ElLoading } from 'element-plus'
import { uploadApi, bookApi } from '@/api'
import { createFileChunks, getFileHashName, QueueTask, isNotEmptyArray, formatBytes } from '@/utils'
import { CHUNK_SIZE, MAX_UPLOADING } from '@/constant'
import { IFileWithFileId, UploadStatus } from '@/types'

const { proxy } = getCurrentInstance()!

const uploadRef = ref()
const uploadingFileList = ref<any[]>([])
const bookList = ref<any[]>([])
const uploadTaskList = ref<any[]>([])

const clickChangeDrawer = () => {
  uploadRef?.value?.changeShowDrawer(true)
}

const confirm = async () => {
  // 校验必填项
  await uploadRef.value.formValidate()
  // 开启loading
  const loading = ElLoading.service({
    lock: true,
    text: '文件计算中',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  try {
    uploadRef.value.changeShowDrawer(false)
    const fileHashNameList = await Promise.all(
      uploadRef.value.selectFileList.map(async (fileObject: IFileWithFileId) => {
        const { file, fileId } = fileObject
        const hashFileName = await getFileHashNameByFile(file)
        return {
          hashFileName,
          fileId,
        }
      }),
    )
    // 调用后端接口, 判断文件是否需要进行分片上传
    const uploadListByHashName = await Promise.all(
      fileHashNameList.map((fileItem) => uploadApi.vertifyExistFile(fileItem.hashFileName)),
    )
    // 判断还需要上传的文件
    const needUploadedList = batchVertifyExistFile(
      uploadRef.value.selectFileList,
      uploadListByHashName,
    )
    if (!isNotEmptyArray(needUploadedList)) {
      return
    }
    // 同步上传信息, 获取上传成功后的id
    const createBookResult = await bookApi.createBook({
      fileList: needUploadedList.map((fileObject) => {
        return {
          ...uploadRef.value.uploadBookForm,
          bookName: fileObject.file.name,
          size: formatBytes(fileObject.file.size),
        }
      }),
    })

    // 展示上传中的信息
    uploadingFileList.value = needUploadedList.map((fileObject) => {
      return {
        fileName: fileObject.file.name,
        fileSize: fileObject.file.size,
        percentage: 0,
        status: UploadStatus.WAITING,
        fileId: fileObject.fileId,
      }
    })

    // 开启文件上传准备分片数据
    const uploadTaskChunkList = needUploadedList.map((fileObject, index) => {
      const fileItem = fileHashNameList.find((item) => item.fileId === fileObject.fileId)
      const uploadChunkList = getUploadChunkList(
        fileObject.file,
        fileItem.hashFileName,
        fileObject.uploadedChunkList,
      )
      // id: 是需要在合并的时候回传合并接口, 合并后更新列表的状态
      return {
        uploadChunkList,
        id: createBookResult[index]?.id,
        fileId: fileObject.fileId,
        hashFileName: fileItem.hashFileName,
      }
    })

    console.log(uploadTaskChunkList)

    // 开启上传任务
    startUploadList(uploadTaskChunkList)
  } catch (error) {
    console.log(error, 'error')
  } finally {
    loading.close()
  }
}

const batchVertifyExistFile = (selectFileList, uploadListByHashName) => {
  let message = [],
    needUploadedList = []
  // 处理当前选择的文件, 查看是否需要再上传
  uploadListByHashName.forEach((vertifyResult, index) => {
    const fileItem = selectFileList[index]
    if (vertifyResult?.needUploaded === false) {
      message.push(fileItem.file.name)
    } else if (vertifyResult?.needUploaded === true) {
      needUploadedList.push({
        file: fileItem.file,
        fileId: fileItem.fileId,
        uploadedChunkList: vertifyResult.uploadedChunkList,
      })
    }
  })
  // 无需上传的进行提示
  if (isNotEmptyArray(message)) {
    message.forEach((m) => {
      proxy?.$message(`文件${m}已经上传, 无需再进行上传`)
    })
  }

  // 返回需要上传的文件
  return needUploadedList
}

const getUploadChunkList = (file: File, fileName: string, uploadedList: string[]) => {
  // 分片
  const chunks = createFileChunks(file, CHUNK_SIZE)
  // 组装分片参数
  const uploadChunkList = []
  chunks.forEach((item) => {
    // 组装分片名称
    const chunkName = fileName + '-' + item.chunkIndex
    if (uploadedList.includes(chunkName)) {
      return
    }
    const formData = new FormData()
    formData.append('fileName', fileName)
    formData.append('chunkName', chunkName)
    formData.append('chunk', item.chunk)
    uploadChunkList.push(formData)
  })
  return uploadChunkList
}

const getFileHashNameByFile = async (file: File) => {
  // 计算文件hash名称
  const fileHashName = await getFileHashName(file)
  // 获取文件的后缀
  const fileExtension = file.name.split('.').pop()
  // 用后缀拼接文件名
  const fileName = fileHashName + '.' + fileExtension
  return fileName
}

const calculateUploadFileProgress = (curIndex, progressEvent, fileId) => {
  const currentFile = uploadingFileList.value.find((uploadFile) => uploadFile.fileId === fileId)
  // 计算已经上传的字节数
  const uploadedByte = curIndex * CHUNK_SIZE
  // 正在上传片的字节数
  const uploadProgressByte = progressEvent.loaded
  // 已经上传的总字节数
  const completedByte = uploadedByte + uploadProgressByte
  // 获取文件的总字节数
  const fileTotalByte = currentFile.fileSize
  // 计算百分比
  const progressPrecent = Math.round((completedByte * 100) / fileTotalByte)
  // 修改正在上传的文件的百分比和上传状态
  uploadingFileList.value = uploadingFileList.value.map((uploadFile) =>
    uploadFile.fileId === fileId
      ? {
          ...uploadFile,
          percentage: progressPrecent,
          status: UploadStatus.UPLOADING,
        }
      : uploadFile,
  )
}

const uploadChunkFileList = async ({ uploadChunkList, id, fileId, hashFileName }) => {
  const taskList = uploadChunkList.map((uploadChunk: FormData) => {
    return () => {
      return uploadApi.fileUpload(uploadChunk, {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const curIndex = (uploadChunk.get('chunkName') as string)?.split('-')?.pop()
          calculateUploadFileProgress(curIndex, progressEvent, fileId)
        },
      })
    }
  })
  const queueTask = new QueueTask(id)
  queueTask.pushTask(taskList)
  // todo: 后续操作暂停和继续在此任务队列中查找
  uploadTaskList.value.push(queueTask)
  const result: any = await queueTask.startTask()
  // 请求合并接口
  if (isNotEmptyArray(result) && result.every((item) => item?.success)) {
    // 调用分片合并接口
    const mergeResult = await uploadApi.mergeFile(hashFileName, id)
    if (mergeResult) {
      uploadingFileList.value = uploadingFileList.value.map((uploadFile) =>
        uploadFile.fileId === fileId
          ? {
              ...uploadFile,
              percentage: 100,
              status: UploadStatus.SUCCESS,
            }
          : uploadFile,
      )
      getBookList()
    }
  }
}

// const stopUploadFile = () => {
//   queueTask.stopTask()
// }

// const resumeUploadFile = async () => {
//   const result = await queueTask.startTask()
//   // 请求合并接口
//   if (isNotEmptyArray(result) && result.every((item) => item.success)) {
//     // 调用分片合并接口
//     uploadApi.mergeFile(currentFile.value.fileName)
//   }
// }

const startUploadList = (uploadTaskChunkList: any[]) => {
  let taskIndex = 0
  // 并发控制, 开启三个工作区
  let works = new Array(MAX_UPLOADING).fill(null)
  works.forEach(async () => {
    const start = async () => {
      if (taskIndex >= uploadTaskChunkList.length) {
        return
      }
      // 取出一个任务执行
      try {
        await uploadChunkFileList(uploadTaskChunkList[taskIndex++])
      } catch (error) {
        console.log(error, 'error')
      }
      start()
    }
    start()
  })
}

const getBookList = async () => {
  const result = await bookApi.getBookList()
  bookList.value = result
}

onMounted(() => {
  getBookList()
})
</script>

<style lang="less" scoped>
.upload-box {
  border-radius: 4px;
  height: calc(100% - 25px);
}
</style>
