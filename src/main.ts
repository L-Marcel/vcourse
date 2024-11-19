import './assets/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  IoLockClosedSharp,
  IoPersonSharp,
  IoCloseSharp,
  IoArrowForwardSharp,
  IoArrowBackSharp,
  IoAddSharp,
  IoPencil,
  IoTrashSharp,
} from 'oh-vue-icons/icons'

addIcons(
  IoLockClosedSharp,
  IoPersonSharp,
  IoCloseSharp,
  IoArrowForwardSharp,
  IoArrowBackSharp,
  IoAddSharp,
  IoPencil,
  IoTrashSharp,
)

const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.use(router)
app.mount('#app')
