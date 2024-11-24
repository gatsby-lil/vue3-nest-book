<template>
    <div class="upload-box">
        <div class="upload-enter-box">
            <el-button type="primary" size="large" @click="clickChangeDrawer">
                点击上传
            </el-button>
        </div>
        <!-- 文件上传列表 -->
        <el-drawer v-model="isShowDrawer" size="900px">
            <el-form :model="form" label-width="auto" style="max-width: 600px">
                <el-form-item label="文件名称">
                    <el-input v-model="form.fileName" />
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.desc" type="textarea" />
                </el-form-item>
                <el-form-item label="标签">
                    <el-button class="button-new-tag" size="small" @click="showInput">
                        + 添加标签</el-button>
                </el-form-item>
                <el-form-item label="上传文件">
                    <!-- <el-upload style="width: 700px;" ref="uploadRef" action="" drag multiple :file-list="fileList"
                        :auto-upload="true" :http-request="uploadFileRequest" :before-upload="beforeUpload">
                        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        <div class="el-upload__text">
                            拖拽文件到此或者<em>点击上传</em>
                        </div>
                        <template #tip>
                            <div class="el-upload__tip" v-for="file in fileList">
                                <span><i class="el-icon--document">
                                    </i></span>
                                <span>{{ file.name }}</span>
                            </div>
                        </template>
                    </el-upload> -->
                    <upload-book ref="uploadRef"/>
                </el-form-item>
            </el-form>
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
const form = reactive({
    fileName: '',
    desc: '',
})
const isShowDrawer = ref(false);
const fileList = ref<File[]>([]);
const uploadRef = ref();
const clickChangeDrawer = () => {
    isShowDrawer.value = true;
}

const confirmClick = () => {
    console.log(form, 'fff');
    // 校验表单
    // 接受文件


}

const cancelClick = () => {
    isShowDrawer.value = false;
}



const showInput = () => {

}




</script>

<style lang="less" scoped>
.upload-box {
    height: 100vh;
    width: 100vw;

    .upload-enter-box {
        margin-top: 20px;
        margin-left: 30px;
        width: 200px;
        height: 150px;
    }
}
</style>