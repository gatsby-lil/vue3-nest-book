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
  {
    path: '/upload',
    component: () => import('@/views/upload/index.vue'),
  },
  {
    path: '/test',
    component: () => import('@/views/test.vue')
  },
   {
    path: '/test2',
    component: () => import('@/views/test2.vue')
  },
  {
    path: '/access',
    component: () => import('@/views/actor/index.vue')
  },
]

export default createRouter({
  routes,
  history: createWebHistory(),
})
