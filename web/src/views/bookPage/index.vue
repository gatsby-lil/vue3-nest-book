<template>
    <div class="upload-book-container">
      <ElButton type="primary" @click="handleClick">Button</ElButton>
    </div>
</template>
  

<script setup lang="ts">
  const { proxy } = getCurrentInstance()!;

  const handleClick = () => {
    proxy?.$message('Hello World');
  }

</script>
  
<style lang="less" scoped>
.upload-book-container {
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px dashed #D9D9D9;
    background-color: #FAFAFA;
}

</style>