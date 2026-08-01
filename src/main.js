import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Use only the router; vue-meta was removed
app.use(router)

app.mount('#app')
