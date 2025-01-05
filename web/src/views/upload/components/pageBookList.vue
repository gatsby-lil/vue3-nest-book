<template>
  <div class="book-list-box">
    <div class="item-book-card" v-for="book in bookList" :key="book.id">
      <div class="card-content">
        <!-- 展示审核状态 -->
        <div class="card-tips">
          <el-tag :type="getAuditStatusTagType(book.auditStatus)">{{ getAuditStatusText(book.auditStatus) }}</el-tag>
        </div>
        <div class="empty-content"></div>
        <div class="name-content">
          <!-- 展示文件描述 -->
          <el-tooltip :content="book.description" placement="top-start" effect="light">
            <div class="name">{{ book.description }}</div>
          </el-tooltip>
          <div>
            <el-dropdown trigger="hover">
              <el-icon><MoreFilled /></el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>下载</el-dropdown-item>
                  <el-dropdown-item>通知审核</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
        <div class="text-content">
          <!-- 展示创建人、标签、文件名称、文件大小 -->
          <div class="field">
            <el-icon><Reading /></el-icon>
            <el-tooltip :content="book.bookName" placement="top-start" effect="light">
              <span class="text bookname">书名: {{ book.bookName }}</span>
            </el-tooltip>
          </div>
          <div class="field">
            <el-icon><Memo /></el-icon>
            <span class="text">{{ book?.size }}</span>
          </div>
          <!-- todo: 展示创建人-->
          <div class="field">
            <el-icon><User /></el-icon>
            <span class="text">创建人: --</span>
          </div>
          <!-- 标签-->
          <div class="field">
            <el-icon><CollectionTag /></el-icon>
            <span class="text">标签: {{ book.tags }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AuditStatus } from '@/types'
defineProps({
  bookList: {
    type: Array,
    required: true,
  },
})

const getAuditStatusTagType = (auditStatus: AuditStatus) => {
  switch (auditStatus) {
    case AuditStatus.PENDING:
      return 'primary'
    case AuditStatus.PUBLISHED:
      return 'success'

    case AuditStatus.REJECTED:
      return 'danger'

    case AuditStatus.WITHDRAWN:
      return 'info'
  }
}

const getAuditStatusText = (auditStatus: AuditStatus) => {
  switch (auditStatus) {
    case AuditStatus.PENDING:
      return '待审核'
    case AuditStatus.PUBLISHED:
      return '审核通过'
    case AuditStatus.REJECTED:
      return '审核不通过'
    case AuditStatus.WITHDRAWN:
      return '审核后撤回'
  }
}
</script>

<style lang="less" scoped>
.book-list-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 16px;
  .item-book-card {
    height: 350px;
    cursor: pointer;
    background: #fefefe;
    box-shadow: 0 2px 14px -2px #00000014;
    width: 18%;
    padding-bottom: 8px;
    border-radius: 8px;
    .card-content {
      border-radius: 8px;
      display: flex;
      position: relative;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
      background: #ffffff;
      transition: all 0.3s;
      .card-tips {
        position: absolute;
        top: 16px;
        left: 16px;
        z-index: 1;
      }
      .empty-content {
        margin: 0;
        padding-top: 18px;
        padding-bottom: calc(67% - 18px);
        border-radius: 8px 8px 0 0;
        width: 100%;
        height: 0;
        background-color: #f4f4f4;
        background-position: 50% 60% !important;
        background-repeat: no-repeat !important;
        background-size: 50% !important;
        background: url('@/assets/book.svg');
      }
      .name-content {
        display: flex;
        margin-top: 16px;
        padding: 0 16px;
        justify-content: space-between;
        align-items: center;
        height: 24px;
        .name {
          overflow: hidden;
          width: 100%;
          font-size: 18px;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
          font-weight: 500;
          line-height: 23px;
          max-width: 200px;
        }
      }
      .text-content {
        display: grid;
        grid-template-columns: 50% 50%;
        gap: 2px;
        padding: 16px;
        .field {
          display: flex;
          padding: 0 8px;
          border-radius: 4px;
          align-items: center;
          height: 32px;
          background: #f4f4f4;
          gap: 4px;
          font-size: 12px;
          span.bookname {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
