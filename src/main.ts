import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VSnacks from 'vue-snacks'
import { initializeToast } from './plugins/toast'
import VueLazyload from 'vue-lazyload'

const app = createApp(App)

app.use(router)
app.use(VSnacks)
app.use(VueLazyload)

initializeToast(app)

app.mount('#app')
