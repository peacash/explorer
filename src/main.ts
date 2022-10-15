import 'focus-visible'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
const app = createApp(App)
app.config.globalProperties.$hostname = 'http://localhost:8080'
app.use(router)
app.mount('#app')