import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Layout from '@/layout/index.vue'
const routes:RouteRecordRaw[] = [
    {
        path: '/',
        component:Layout,
        redirect: '/uploadBook',
        children: [
            {
                path: 'uploadBook',
                name: 'uploadBook',
                component: () => import('@/views/upload/index.vue')
            }
        ]
    }
]

export default createRouter({
    routes,
    history: createWebHistory()
})