import Vue from 'vue'

// api接口封装
import api from "@/service/api/index.js";
Vue.prototype.$api = api;
// 消息提示封装
import pop from "@/service/pop/pop.js";
Vue.prototype.$pop = pop;
// vuex封装
import store from '@/service/store/store.js';
Vue.prototype.$store = store;