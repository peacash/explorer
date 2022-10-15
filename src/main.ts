import 'focus-visible'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
import './styles/particles.css'
const app = createApp(App)
app.use(router)
app.mount('#app')