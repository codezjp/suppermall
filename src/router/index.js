//1 导入资源模块
import Vue from "vue"
import VueRouter from "vue-router"

//2 注册路由
Vue.use(VueRouter)

//3 配置路由映射
const Cart       = ()=> import("views/cart/Cart.vue");
const Category  = ()=> import("views/category/Category.vue");
const Home       = ()=> import("views/home/Home");
const Profile    = ()=> import("views/profile/Profile");
const Detail    = ()=> import("views/detail/Detail");

const routes =[
    {
        path:"/",
        redirect:"/home"
    },
    {
        path:"/home",
        component:Home
    },
    {
        path:"/cart",
        component:Cart,
        
    },
    {
        path:"/category",
        component:Category
    },
    {
        path:"/profile",
        component:Profile
    },
    {
        path:"/detail",
        component:Detail
    }
];

//4 实例化路由对象并导出
const router =new VueRouter({
    routes,
    mode:"history"
})

export default router;