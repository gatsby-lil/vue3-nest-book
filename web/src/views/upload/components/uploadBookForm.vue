<template>
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
            <upload-book/>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const form = reactive({
    fileName: '',
    desc: '',
})

const showInput = () => {
    
}

</script>
