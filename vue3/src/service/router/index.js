import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    // 切换路由时触发（location）为路由路径
    return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

import admin from '@/layout/admin/admin.vue';
import lianxi from '@/views/lianxi/lianxi.vue';

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
            // component: () => import('@/layout/admin/admin.vue'),
            children: [
                {
                    path: 'home',
                    component: () => import('@/views/home/home.vue'),
                },
                {
                    path: 'about',
                    component: () => import('@/views/about/about.vue'),
                },
                {
                    path: 'demo',
                    component: () => import('@/views/demo/demo.vue'),
                },
                {
                    path: '/lianxi',
                    component: lianxi,
                    children: [
                        {
                            path: 'calendar',
                            component: () => import('@/views/lianxi/calendar/calendar.vue'),
                        },
                        // {
                        //     path: '/lianxi/form',
                        //     component: () => import('@/views/lianxi/form/form.vue'),
                        // },
                        {
                            path: 'heike',
                            component: () => import('@/views/lianxi/heike/heike.vue'),
                        },
                        {
                            path: 'jisuanqi',
                            component: () => import('@/views/lianxi/jisuanqi/jisuanqi.vue'),
                        },
                        {
                            path: 'saolei',
                            component: () => import('@/views/lianxi/saolei/saolei.vue'),
                        },
                        // {
                        //     path: '/lianxi/upload',
                        //     component: () => import('@/views/lianxi/upload/upload.vue'),
                        // },
                        {
                            path: 'xingkong',
                            component: () => import('@/views/lianxi/xingkong/xingkong.vue'),
                        },
                    ],
                }
            ]
        },
        {
            path: '/drag',
            component: () => import('@/views/drag/drag.vue'),
            meta: {
                index: 14,
                auth: true,
                title: '拖拽页面'
            },
        },
        { path: '*', redirect: '/404' }
    ]
})
