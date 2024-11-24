import type { App } from "vue";
import { ElMessage, ElNotification, ElMessageBox } from "element-plus"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default function(app:App) {
    app.config.globalProperties.$message = ElMessage
    app.config.globalProperties.$notify = ElNotification
    app.config.globalProperties.$confirm = ElMessageBox.confirm
    app.config.globalProperties.$alert = ElMessageBox.alert
    app.config.globalProperties.$prompt = ElMessageBox.prompt
    Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
        app.component(key, component);
    })
}