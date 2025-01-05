<template>
  <div class="upload-list-box">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="" name="1">
        <div class="upload-list-wrapper">
          <div v-for="(file, index) in uploadingFileList" :key="index" class="upload-list-item-box">
            <div class="upload-list-item">
              <div class="item-type">
                <img src="@/assets/text.svg" alt="icon" />
              </div>
              <div class="item-info">
                <div class="item-info-name">{{ file?.fileName || '' }}</div>
                <div class="item-info-size">{{ formatBytes(file?.fileSize) }}</div>
              </div>
              <div class="item-progress-status">
                <el-icon>
                  <component :is="getFileUploadStatusIcon(file?.status)" :style="getFileUploadStatusIconStyle(file.status)" />
                </el-icon>
                <span>{{ getFileUploadStatusText(file?.status) }}</span>
              </div>
            </div>
            <div class="item-progress-rate">
              <el-progress :percentage="file.percentage" :color="getFileUploadStatusColor(file.status)" :format="format" />
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { formatBytes } from '@/utils'
import { UploadStatus } from '@/types'

defineProps({
  uploadingFileList: {
    type: Array,
    required: true,
  },
})

const activeNames = ref(['1'])

const getFileUploadStatusColor = (status: UploadStatus) => {
  switch (status) {
    case UploadStatus.WAITING:
    case UploadStatus.UPLOADING:
      return '#409eff'
    case UploadStatus.FAIL:
      return '#f56c6c'
    case UploadStatus.SUCCESS:
      return '#67c23a'
  }
}

const getFileUploadStatusText = (status: UploadStatus) => {
  switch (status) {
    case UploadStatus.WAITING:
      return '等待上传'
    case UploadStatus.UPLOADING:
      return '上传中'
    case UploadStatus.FAIL:
      return '上传失败'
    case UploadStatus.SUCCESS:
      return '上传成功'
  }
}

const getFileUploadStatusIcon = (status: UploadStatus) => {
  switch (status) {
    case UploadStatus.WAITING:
      return 'UploadFilled'
    case UploadStatus.UPLOADING:
      return 'UploadFilled'
    case UploadStatus.FAIL:
      return 'CircleCloseFilled'
    case UploadStatus.SUCCESS:
      return 'SuccessFilled'
  }
}

const getFileUploadStatusIconStyle = (status: UploadStatus) => {
  switch (status) {
    case UploadStatus.WAITING:
    case UploadStatus.UPLOADING:
      return {
        color: '#576ff3',
      }
    case UploadStatus.FAIL:
      return {
        color: '#F8827B',
      }
    case UploadStatus.SUCCESS:
      return {
        color: '#67C23A',
      }
  }
}

const format = (percentage: number) => (percentage === 100 ? '' : `${percentage}%`)

const handleChange = (val: string[]) => {
  console.log(val)
}
</script>

<style lang="less" scoped>
.upload-list-box {
  position: fixed;
  right: 16px;
  bottom: 3px;
  border: 2px solid #eaecf0;
  border-radius: 12px;
  z-index: 99;
  overflow: hidden;
  width: 360px;
  background: #ffffff;
  box-shadow: 0 6px 15px #00000026;
  .el-collapse-item {
    cursor: pointer;
    :deep(.el-collapse-item__header) {
      background-color: #fafafa;
      border-bottom: 0px;
    }
    :deep(.el-collapse-item__wrap) {
      border-bottom: 0px;
    }
  }
  .upload-list-wrapper {
    max-height: 400px;
    overflow-y: scroll;
    padding: 0px 16px;
    .upload-list-item-box {
      padding-bottom: 16px;
      &:not(:last-child) {
        border-bottom: 1px solid #eaecf0;
      }
      .upload-list-item {
        display: flex;
        padding-top: 16px;
        align-items: center;
        height: 68px;
        gap: 12px;
        .item-type {
          width: 26px;
          height: 26px;
          font-size: 26px;
          color: #576ff3;
          img {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
        }
        .item-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          width: 120px;
          .item-info-name {
            overflow: hidden;
            font-size: 14px;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333;
            font-weight: 500;
            line-height: 20px;
          }
          .item-info-size {
            font-size: 12px;
            color: #666;
            line-height: 14px;
          }
        }
        .item-progress-status {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          width: calc(100% - 170px);
        }
      }
      .item-progress-rate {
        :deep(.el-progress__text) {
          span,
          i {
            float: right;
          }
        }
      }
    }
  }
}
</style>
