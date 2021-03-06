/* eslint-disable */
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/assets/css/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import components from '@/components/index' //global components
import global from '@/utils/global'
import 'babel-polyfill'
import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(VCharts)
Vue.use(components)
Vue.use(global)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
