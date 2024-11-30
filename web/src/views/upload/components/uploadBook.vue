<template>
  <div class="upload-book-container" ref="uploadRef">
    <div>拖拽到此处上传</div>
  </div>
</template>


<script setup lang="ts">
import useDragAndClick from '../hooks/useDragAndClick';
const uploadRef = ref<HTMLDivElement | null>(null)
const {
  selectFile
} = useDragAndClick(uploadRef);

defineExpose({
  selectFile
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
  border: 1px dashed #D9D9D9;
  background-color: #FAFAFA;

  .upload-book-input {
    display: none;
  }
}

.upload-book-container:hover {
  border-color: #40A9FF;
}
</style>