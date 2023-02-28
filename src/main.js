import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

window.axios = axios
axios.defaults.withCredentials = true

window.apihost = 'http://localhost:8000/api'



import './assets/main.css'

const app = createApp(App)
app.use(router)

app.mount('#app')
