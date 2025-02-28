import type { App } from "vue";
import { Message } from '@arco-design/web-vue';

export default function(app:App) {
    app.config.globalProperties.$message = Message
}