import './assets/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { IoCloseSharp, IoArrowForwardSharp, IoArrowBackSharp } from 'oh-vue-icons/icons'

addIcons(IoCloseSharp, IoArrowForwardSharp, IoArrowBackSharp)

const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.use(router)
app.mount('#app')
