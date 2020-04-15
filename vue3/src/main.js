import Vue from 'vue';

// 引入插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css';
Vue.use(ElementUI);

// 引入静态资源
// 引入样式
import '@/style.less';
// 引入js
Vue.config.productionTip = false

// 引入全局（组件/管道/服务）
// 引入组件
import grobalComponent from '@/grobal-component/index.js';
Vue.use(grobalComponent);
// 引入路由
import router from '@/service/router';
// 引入全局变量
import globalVariable from "@/service/global/variable.js";

// 引入页面
import App from '@/App.vue';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
