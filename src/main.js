import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. Import Pinia
import './style.css'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia() // 2. Khởi tạo

app.use(pinia) // 3. Sử dụng
app.use(Antd)
app.mount('#app')