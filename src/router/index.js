//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';

//使用插件
Vue.use(VueRouter);

//引入路由组件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
//先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace
//第一参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function(location, resolve, reject) {
    if(resolve && reject){
        //call|apply区别
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, ()=>{}, ()=>{});
    }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
    if(resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, ()=>{}, ()=>{});
    }
}
//配置路由
export default new VueRouter({
    //配置路由
    routes: [
        {
            path: "/home",
            component: Home,
            meta: {show: true}
        },
        {
            path: "/login",
            component: Login,
            meta: {show: false}
        },
        {
            path: "/register",
            component: Register,
            meta: {show: false}
        },
        {
            path: "/search/:keyword?",
            component: Search,
            meta: {show: true},
            name: "search",
            //面试题4:路由组件能不能传递props数据?可以
            //布尔值写法:params
            // props:true,
            //对象写法：{}
            // props: {a:1, b:2}
            //函数写法：可以把params参数、query参数，通过props传递给路由组件
            props: ($route) => {
                return {
                    keyword: $route.params.keyword, k: $route.query.k
                };
            }
        },
        //重定向
        {
            path: "*",
            redirect: "/home",
        },
    ]
})