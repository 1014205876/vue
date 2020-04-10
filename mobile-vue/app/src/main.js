import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/style/common.less'
import { Lazyload } from 'vant'

Vue.config.productionTip = false

// options 为可选参数，无则不传
Vue.use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
