import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
    {
        path: '/',
        component: Layout,
        redirect: '/pms/product',
    },
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    // {
    //     path: '',
    //     component: Layout,
    //     redirect: '/home',
    //     children: [{
    //         path: 'home',
    //         name: 'home',
    //         component: () => import('@/views/home/index'),
    //         meta: { title: '首页', icon: 'home' },
    //     }]
    // },
    {
        path: '/pms',
        component: Layout,
        redirect: '/pms/product',
        name: 'pms',
        meta: { title: '商品管理', icon: 'dianpu' },
        children: [
            {
                path: 'product',
                name: 'product',
                component: () => import('@/views/pms/product/index'),
                meta: { title: '商品列表' }
            },
            {
                path: 'addProduct',
                name: 'addProduct',
                component: () => import('@/views/pms/product/add'),
                meta: { title: '添加商品' }
            },
            {
                path: 'updateProduct',
                name: 'updateProduct',
                component: () => import('@/views/pms/product/update'),
                meta: { title: '修改商品', icon: 'product-add' },
                hidden: true
            },
            {
                path: 'productRecycle',
                name: 'productRecycle',
                component: () => import('@/views/pms/product/index'),
                meta: { title: '商品回收站', icon: 'product-recycle' },
                hidden: true
            },
            {
                path: 'productComment',
                name: 'productComment',
                component: () => import('@/views/pms/product/index'),
                meta: { title: '商品评价', icon: 'product-comment' },
                hidden: true
            },
            {
                path: 'productCate',
                name: 'productCate',
                component: () => import('@/views/pms/productCate/index'),
                meta: { title: '商品分类' }
            },
            {
                path: 'addProductCate',
                name: 'addProductCate',
                component: () => import('@/views/pms/productCate/add'),
                meta: { title: '添加商品分类' },
                hidden: true
            },
            {
                path: 'updateProductCate',
                name: 'updateProductCate',
                component: () => import('@/views/pms/productCate/update'),
                meta: { title: '修改商品分类' },
                hidden: true
            },
            {
                path: 'productAttr',
                name: 'productAttr',
                component: () => import('@/views/pms/productAttr/index'),
                meta: { title: '商品类型' }
            },
            {
                path: 'productAttrList',
                name: 'productAttrList',
                component: () => import('@/views/pms/productAttr/productAttrList'),
                meta: { title: '商品属性列表' },
                hidden: true
            },
            {
                path: 'addProductAttr',
                name: 'addProductAttr',
                component: () => import('@/views/pms/productAttr/addProductAttr'),
                meta: { title: '添加商品属性' },
                hidden: true
            },
            {
                path: 'updateProductAttr',
                name: 'updateProductAttr',
                component: () => import('@/views/pms/productAttr/updateProductAttr'),
                meta: { title: '修改商品属性' },
                hidden: true
            },
            // {
            //     path: 'brand',
            //     name: 'brand',
            //     component: () => import('@/views/pms/brand/index'),
            //     meta: { title: '品牌管理', icon: 'product-brand' }
            // },
            // {
            //     path: 'addBrand',
            //     name: 'addBrand',
            //     component: () => import('@/views/pms/brand/add'),
            //     meta: { title: '添加品牌' },
            //     hidden: true
            // },
            // {
            //     path: 'updateBrand',
            //     name: 'updateBrand',
            //     component: () => import('@/views/pms/brand/update'),
            //     meta: { title: '编辑品牌' },
            //     hidden: true
            // }
        ]
    },
    {
        path: '/oms',
        component: Layout,
        redirect: '/oms/order',
        name: 'oms',
        meta: { title: '订单管理', icon: 'order' },
        children: [
            {
                path: 'order',
                name: 'order',
                component: () => import('@/views/oms/order/index'),
                meta: { title: '订单列表' }
            },
            {
                path: 'orderDetail',
                name: 'orderDetail',
                component: () => import('@/views/oms/order/orderDetail'),
                meta: { title: '订单详情' },
                hidden: true
            },
            {
                path: 'deliverOrderList',
                name: 'deliverOrderList',
                component: () => import('@/views/oms/order/deliverOrderList'),
                meta: { title: '发货列表' },
                hidden: true
            },
            {
                path: 'orderSetting',
                name: 'orderSetting',
                component: () => import('@/views/oms/order/setting'),
                meta: { title: '订单设置' }
            },
            // {
            //     path: 'returnApply',
            //     name: 'returnApply',
            //     component: () => import('@/views/oms/apply/index'),
            //     meta: { title: '退货申请处理', icon: 'order-return' }
            // },
            // {
            //     path: 'returnReason',
            //     name: 'returnReason',
            //     component: () => import('@/views/oms/apply/reason'),
            //     meta: { title: '退货原因设置', icon: 'order-return-reason' }
            // },
            // {
            //     path: 'returnApplyDetail',
            //     name: 'returnApplyDetail',
            //     component: () => import('@/views/oms/apply/applyDetail'),
            //     meta: { title: '退货原因详情' },
            //     hidden: true
            // }
        ]
    },
    // {
    //     path: '/sms',
    //     component: Layout,
    //     redirect: '/sms/coupon',
    //     name: 'sms',
    //     meta: { title: '营销', icon: 'sms' },
    //     children: [
    //         {
    //             path: 'flash',
    //             name: 'flash',
    //             component: () => import('@/views/sms/flash/index'),
    //             meta: { title: '秒杀活动列表', icon: 'sms-flash' }
    //         },
    //         {
    //             path: 'flashSession',
    //             name: 'flashSession',
    //             component: () => import('@/views/sms/flash/sessionList'),
    //             meta: { title: '秒杀时间段列表' },
    //             hidden: true
    //         },
    //         {
    //             path: 'selectSession',
    //             name: 'selectSession',
    //             component: () => import('@/views/sms/flash/selectSessionList'),
    //             meta: { title: '秒杀时间段选择' },
    //             hidden: true
    //         },
    //         {
    //             path: 'flashProductRelation',
    //             name: 'flashProductRelation',
    //             component: () => import('@/views/sms/flash/productRelationList'),
    //             meta: { title: '秒杀商品列表' },
    //             hidden: true
    //         },
    //         {
    //             path: 'coupon',
    //             name: 'coupon',
    //             component: () => import('@/views/sms/coupon/index'),
    //             meta: { title: '优惠券列表', icon: 'sms-coupon' }
    //         },
    //         {
    //             path: 'addCoupon',
    //             name: 'addCoupon',
    //             component: () => import('@/views/sms/coupon/add'),
    //             meta: { title: '添加优惠券' },
    //             hidden: true
    //         },
    //         {
    //             path: 'updateCoupon',
    //             name: 'updateCoupon',
    //             component: () => import('@/views/sms/coupon/update'),
    //             meta: { title: '修改优惠券' },
    //             hidden: true
    //         },
    //         {
    //             path: 'couponHistory',
    //             name: 'couponHistory',
    //             component: () => import('@/views/sms/coupon/history'),
    //             meta: { title: '优惠券领取详情' },
    //             hidden: true
    //         },
    //         {
    //             path: 'brand',
    //             name: 'homeBrand',
    //             component: () => import('@/views/sms/brand/index'),
    //             meta: { title: '品牌推荐', icon: 'product-brand' }
    //         },
    //         {
    //             path: 'new',
    //             name: 'homeNew',
    //             component: () => import('@/views/sms/new/index'),
    //             meta: { title: '新品推荐', icon: 'sms-new' }
    //         },
    //         {
    //             path: 'hot',
    //             name: 'homeHot',
    //             component: () => import('@/views/sms/hot/index'),
    //             meta: { title: '人气推荐', icon: 'sms-hot' }
    //         },
    //         {
    //             path: 'subject',
    //             name: 'homeSubject',
    //             component: () => import('@/views/sms/subject/index'),
    //             meta: { title: '专题推荐', icon: 'sms-subject' }
    //         },
    //         {
    //             path: 'advertise',
    //             name: 'homeAdvertise',
    //             component: () => import('@/views/sms/advertise/index'),
    //             meta: { title: '广告列表', icon: 'sms-ad' }
    //         },
    //         {
    //             path: 'addAdvertise',
    //             name: 'addHomeAdvertise',
    //             component: () => import('@/views/sms/advertise/add'),
    //             meta: { title: '添加广告' },
    //             hidden: true
    //         },
    //         {
    //             path: 'updateAdvertise',
    //             name: 'updateHomeAdvertise',
    //             component: () => import('@/views/sms/advertise/update'),
    //             meta: { title: '编辑广告' },
    //             hidden: true
    //         }
    //     ]
    // },
    {
        path: '/pre',
        component: Layout,
        redirect: '/pre/activities',
        name: 'pre',
        meta: { title: '营销管理', icon: 'yingxiao' },
        alwaysShow: true,
        children: [
            {
                path: 'activities',
                name: 'activities',
                component: () => import('@/views/pre-activities/activities-list/index'),
                meta: { title: '预约活动' },
            },
            {
                path: 'banner',
                name: 'banner',
                component: () => import('@/views/sms/advertise/index'),
                meta: { title: '广告列表' }
            },
            {
                path: 'add',
                name: 'add',
                component: () => import('@/views/pre-activities/activities-list/add'),
                meta: { title: '新增活动' },
                hidden: true
            },
            {
                path: 'update',
                name: 'update',
                component: () => import('@/views/pre-activities/activities-list/add'),
                meta: { title: '编辑活动' },
                hidden: true
            },
            {
                path: 'addAdvertise',
                name: 'addHomeAdvertise',
                component: () => import('@/views/sms/advertise/add'),
                meta: { title: '添加广告' },
                hidden: true
            },
            {
                path: 'updateAdvertise',
                name: 'updateHomeAdvertise',
                component: () => import('@/views/sms/advertise/update'),
                meta: { title: '编辑广告' },
                hidden: true
            }
        ]
    },
    {
        path: '/preOrder',
        component: Layout,
        redirect: '/preOrder/orderList',
        name: 'preOrder',
        meta: { title: '预约管理', icon: 'yuyue' },
        alwaysShow: true,
        children: [
            {
                path: 'orderList',
                name: 'orderList',
                component: () => import('@/views/pre-order/order-list/index'),
                meta: { title: '预约订单列表' },
            },
            {
                path: 'preOrderDetail',
                name: 'preOrderDetail',
                component: () => import('@/views/pre-order/order-list/detail'),
                meta: { title: '订单详情' },
                hidden: true
            }
        ]
    },
    {
        path: '/infomation',
        component: Layout,
        redirect: '/infomation/infoList',
        name: 'info',
        meta: { title: '资讯信息', icon: 'zixun1' },
        alwaysShow: true,
        children: [
            {
                path: 'infoList',
                name: 'infoList',
                component: () => import('@/views/infomation/infomation-list/index'),
                meta: { title: '资讯列表' },
            },
            {
                path: 'infoAdd',
                name: 'infoAdd',
                component: () => import('@/views/infomation/infomation-list/add'),
                meta: { title: '创建资讯' },
                hidden: true
            },
            {
                path: 'infoLook',
                name: 'infoLook',
                component: () => import('@/views/infomation/infomation-list/add'),
                meta: { title: '查看资讯' },
                hidden: true
            },
            {
                path: 'infoEdit',
                name: 'infoEdit',
                component: () => import('@/views/infomation/infomation-list/add'),
                meta: { title: '修改资讯' },
                hidden: true
            }
        ]
    },
    {
        path: '/author',
        component: Layout,
        redirect: '/author/authorList',
        name: 'author',
        meta: { title: '瓷人管理', icon: 'taoci' },
        alwaysShow: true,
        children: [
            {
                path: 'authorList',
                name: 'authorList',
                component: () => import('@/views/author/author-list/index'),
                meta: { title: '瓷人列表' },
            },
            {
                path: 'authorAdd',
                name: 'authorAdd',
                component: () => import('@/views/author/author-list/add'),
                meta: { title: '创建' },
                hidden: true
            },
            {
                path: 'authorDetail',
                name: 'authorDetail',
                component: () => import('@/views/author/author-list/add'),
                meta: { title: '详情' },
                hidden: true
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/userList',
        name: 'user',
        meta: { title: '用户管理', icon: 'yonghu' },
        alwaysShow: true,
        children: [
            {
                path: 'userList',
                name: 'userList',
                component: () => import('@/views/user/index'),
                meta: { title: '用户列表' },
            }
        ]
    },
    {
        path: '/system',
        component: Layout,
        redirect: '/system/systemSet',
        name: 'system',
        meta: { title: '系统设置', icon: 'xitong' },
        alwaysShow: true,
        children: [
            {
                path: 'systemSet',
                name: 'systemSet',
                component: () => import('@/views/system/index'),
                meta: { title: '系统设置' },
            },
            {
                path: 'systemHelp',
                name: 'systemHelp',
                component: () => import('@/views/system/help'),
                meta: { title: '帮助管理' },
            }
        ]
    },
    // {
    //     path: '/statistics',
    //     component: Layout,
    //     redirect: '/statistics/orderNo',
    //     name: 'statistics',
    //     meta: { title: '统计管理', icon: 'sms' },
    //     alwaysShow: true,
    //     children: [
    //         {
    //             path: 'orderNum',
    //             name:'orderNum',
    //             component: () => import('@/views/statistics/sale/orderNum'),
    //             meta: { title: '订单数量', icon: 'sms' },
    //         },
    //         {
    //             path: 'orderMoney',
    //             name:'orderMoney',
    //             component: () => import('@/views/statistics/sale/orderMoney'),
    //             meta: { title: '订单金额', icon: 'sms' },
    //         },
    //         {
    //             path: 'buyAnalyse',
    //             name:'buyAnalyse',
    //             component: () => import('@/views/statistics/sale/buyAnalyse'),
    //             meta: { title: '购买分析', icon: 'sms' },
    //         },
    //         {
    //             path: 'areaAnalyse',
    //             name:'areaAnalyse',
    //             component: () => import('@/views/statistics/sale/areaAnalyse'),
    //             meta: { title: '区域分析', icon: 'sms' },
    //         },
    //         {
    //             path: 'priceSales',
    //             name:'priceSales',
    //             component: () => import('@/views/statistics/sale/priceSales'),
    //             meta: { title: '价格销量', icon: 'sms' },
    //         }
    //     ]
    // },
    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})

