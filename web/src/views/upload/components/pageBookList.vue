<template>
  <div class="book-list-box">
    <div class="item-book-card" v-for="book in bookList" :key="book.id">
      <div class="card-content">
        <!-- 展示文件标签 -->
        <div class="card-tips"><span style="background: rgb(48, 106, 232)">点云融合</span></div>
        <div class="empty-content"></div>
        <div class="name-content">
          <el-tooltip content="1111sdfasdfasdf展示文件描述展示文件描述展示文件描述展示文件描述展示文件描述展示文件描述展示文件描述展示文件描述" placement="top" effect="light">
            <div class="name">{{ book.description }}</div>
          </el-tooltip>

          <!-- 展示文件描述 -->
        </div>
        <div class="text-content">
          <!-- 展示创建人、上传状态、审核状态、文件大小 -->
          <div class="field"></div>
          <div class="field"></div>
          <div class="field"></div>
          <div class="field"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  bookList: {
    type: Array,
    required: true,
  },
})
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
    .card-content {
      border-radius: 8px;
      display: flex;
      position: relative;
      flex-direction: column;
      overflow: hidden;
      height: 100%;
      background: #ffffff;
      transition: all 0.3s;
      &:hover {
        transform: scale(1.05);
      }
      .card-tips {
        position: absolute;
        top: 16px;
        left: 16px;
        z-index: 1;
        span {
          display: block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
          color: #fff;
        }
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
        }
      }
    }
  }
}
</style>
