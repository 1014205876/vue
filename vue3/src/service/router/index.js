import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

import admin from '@/layout/admin.vue';

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            redirect: 'home'
        },
        {
            path: '',
            component: admin,
            children: [
                {
                    path: 'home',
                    component: () => import('@/views/home.vue'),
                },
                {
                    path: 'about',
                    component: () => import('@/views/about.vue'),
                },
                {
                    path: 'lianxi',
                    children: [
                        {
                            path: 'calendar',
                            component: () => import('@/views/lianxi/calendar.vue'),
                        },
                    ],
                }
            ]
        },
        {
            path: '/drag',
            component: () => import('@/views/drag.vue'),
            meta: {
                index: 14,
                auth: true,
                title: '拖拽页面'
            },
        },
        { path: '*', redirect: '/404' }
    ]
})
