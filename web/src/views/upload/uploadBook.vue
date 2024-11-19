<template>
    <div class="upload-book-container" ref="uploadRef">
      <input type="file" class="upload-book-input" @change="handleChange"/>
      <ElButton type="primary" @click="handleClick">Button</ElButton>
    </div>
</template>
  

<script setup lang="ts">
import useDrag from './hooks/useDrag';
  const { proxy } = getCurrentInstance()!;
  const uploadRef = ref<HTMLDivElement | null>(null)
  const { 
    filePrview,
    selectFile
  } = useDrag(uploadRef);
  const handleClick = () => {
    proxy?.$message('Hello World');
    console.log(filePrview.value);
    console.log(selectFile.value);
  }

  const handleChange = (...args) => {
    console.log(args, 'sss')
  }

</script>
  
<style lang="less" scoped>
.upload-book-container{
  width:300px;
  height:150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border:1px dashed #D9D9D9;
  background-color: #FAFAFA;
  .upload-book-input {
    display: none;
  }
}
.upload-book-container:hover{
  border-color: #40A9FF;
}

</style>