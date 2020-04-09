import Vue from 'vue';
import router from '@/service/router';

// 引入插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css';
Vue.use(ElementUI);

import axios from 'axios';
Vue.prototype.$axios = axios;

// 引入样式
import '@/style.less';

// 引入js

// 引入页面
import App from '@/App.vue';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
