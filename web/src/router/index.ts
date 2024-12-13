import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'uploadBook',
        name: 'uploadBook',
        component: () => import('@/views/upload/index.vue'),
      },
    ],
  },
  {
    path: '/',
    component: Layout,
    redirect: '/pagebook',
    children: [
      {
        path: 'pagebook',
        name: 'pagebook',
        component: () => import('@/views/pageBook/index.vue'),
      },
    ],
  },
]

export default createRouter({
  routes,
  history: createWebHistory(),
})
