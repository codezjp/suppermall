//1 导入资源包
import Vue from "vue"
import Vuex from "vuex"

//2 注册vuex
Vue.use(Vuex)

//3 创建vuex对象
const state = { 
    cartList:[]
};
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

//4 导出
export default store;