import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import VideoForm from '@/views/VideoForm.vue'
import Video from '@/views/Video.vue'
import NotFound from '@/views/404.vue'
import Unauthorized from '@/views/401.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/register',
      name: 'register',
      component: VideoForm,
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: VideoForm,
    },
    {
      path: '/video/:id',
      name: 'video',
      component: Video,
    },
    {
      path: '/401',
      name: 'unauthorized',
      component: Unauthorized,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

export default router
