import Vue from 'vue';

// 引入组件
import appRippleButton from './ripple-button/ripple-button.vue';


// 这里是重点

const grobalComponent = {
    install: function (Vue) {
        Vue.component('appRippleButton', appRippleButton)
    }

}

export default grobalComponent