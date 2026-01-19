import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Sadece router'ı kullanıyoruz, vue-meta kaldırıldı
app.use(router)

app.mount('#app')
