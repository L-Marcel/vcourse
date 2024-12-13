import './assets/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  IoLockClosedSharp,
  IoPersonSharp,
  IoCloseSharp,
  IoAddSharp,
  IoPencil,
  IoTrashSharp,
  IoKeySharp,
  IoTimeSharp,
  IoClipboardSharp,
  HiArrowSmRight,
  HiArrowSmLeft,
} from 'oh-vue-icons/icons'

addIcons(
  IoLockClosedSharp,
  IoPersonSharp,
  IoCloseSharp,
  HiArrowSmRight,
  HiArrowSmLeft,
  IoAddSharp,
  IoPencil,
  IoTrashSharp,
  IoKeySharp,
  IoTimeSharp,
  IoClipboardSharp,
)

const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.use(VueCookies)
app.use(router)
app.mount('#app')
