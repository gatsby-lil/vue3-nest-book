import { createApp } from 'vue'
import router from '@/router'
import "normalize.css/normalize.css"
import plugins from './plugins'
import App from './App.vue'
const app = createApp(App)
// 添加插件
plugins(app);
app.use(router)
app.mount('#app')
