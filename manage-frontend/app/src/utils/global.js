
import router from '@/router/index'
import rules from '@/rules'

export default {
  install(Vue, options) {

    Vue.prototype.$routerLink = function(path, type, queryParams) {
      var params = {
        type: type
      }
      params = Object.assign(params, queryParams)
      // 路由
      router.push({ path: path, query: params })
    }

    Vue.prototype.$rules = rules // 验证规则

    Vue.prototype.$successMessage = function(mes) {
      // 成功提示
      this.$message({
        message: mes,
        type: 'success',
        duration: 1000
      })
    }

    Vue.prototype.$warnMessage = function(mes) {
      this.$message({
        message: mes,
        type: 'warning',
        duration: 1000
      })
    }
    
    Vue.prototype.$getUrl = function() {
      let url = location.href
      const http = url.substring(0, url.indexOf('//') + 2)
      url = url.substring(url.indexOf('//') + 2, url.length)
      if (url.indexOf('/') >= 0) {
        url = url.substring(0, url.indexOf('/'))
      }
      return http + url
    }




  }
}
