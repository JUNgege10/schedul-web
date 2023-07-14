import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(ArcoVue)
app.mount('#app')

