import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './plugins/store'
import notification from './plugins/notification'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(notification)

app.mount('#app')
