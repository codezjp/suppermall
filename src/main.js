import Vue from 'vue'
import App from './App.vue'
import router from "router"
import store from "store"
//导入图片懒加载模块
import VueLazyload from 'vue-lazyload'
//导入解决300ms延时问题
import FastClick from 'fastclick'

FastClick.attach(document.body);

Vue.config.productionTip = false

//添加事件总线 用于监听事件
Vue.prototype.$bus = new Vue();

//在vue中安装图片懒加载组件
Vue.use(VueLazyload,{
  preload:1.3,
  error:require("assets/img/common/error.webp"),
  loading:require("assets/img/common/load.gif"),
  attempt:1
})

new Vue({
  router,
  store,
  render: function (h) { return h(App) },
}).$mount('#app')
