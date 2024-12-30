<template>
  <div class="upload-list-box">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="" name="1">
        <div class="upload-list">
          <div v-for="(item, index) in list" :key="index">{{ index }}</div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
const activeNames = ref(['1'])
const list = ref(new Array(30))
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
    /deep/ .el-collapse-item__header {
      background-color: #fafafa;
      border-bottom: 0px;
    }
    /deep/ .el-collapse-item__wrap {
      border-bottom: 0px;
    }
  }
  .upload-list {
    max-height: 400px;
    overflow-y: scroll;
  }
}
</style>
