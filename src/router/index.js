import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/archivepage',
    name: 'Archivepage',
    component: () => import('../views/ArchivePage.vue')
  },
  {
    path: '/aboutpage',
    name: 'Aboutpage',
    component: () => import('../views/AboutPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
