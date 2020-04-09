// 引入vue
import Vue from 'vue'
// 引入app.vue
import App from './App'
//引入路由
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
