<template>
    <div class="upload-enter-box">
     <el-button 
        type="primary" 
        size="large" 
        @click="clickChangeDrawer"
     >
     点击上传
    </el-button>
     <el-drawer v-model="isShowDrawer" size="900px">
        <upload-book-form/>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancelClick">取消</el-button>
                <el-button type="primary" @click="confirmClick">确认</el-button>
            </div>
        </template>
     </el-drawer>
    </div>
</template>
  

<script setup lang="ts">
const isShowDrawer = ref(false);
const clickChangeDrawer = () => {
    isShowDrawer.value = true;
}

const confirmClick = () => {
    isShowDrawer.value = false;
}

const cancelClick = () => {
    isShowDrawer.value = false;
}

</script>
  
<style lang="less" scoped>
.upload-enter-box {
    width: 200px;
    height: 150px;
    margin: 250px auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>