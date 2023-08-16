//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';
//使用插件
Vue.use(VueRouter);

//先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace
//第一参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call|apply区别
        //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}
//配置路由
let router = new VueRouter({
    //配置路由,k:v一致省略v
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
});
//全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async(to,from,next)=>{
    //to:可以获取到你想要跳转到哪个路由信息
    //from:可以获取到你从哪个路由而来的信息
    //next:放行函数 next()放行所有， next(path)放行指定路径, next(false)返回到原来的地址。
    // next();
    //用户登录了，才会有token,未登录一定不会有token
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户已经登录了
    if(token) {
        //用户已经登录了还想去login[不能去，停留在首页]
        if(to.path=='/login' || to.path=='/register'){
            next('/');//重定向还是回到/home
        }else{
            //用户登录了，去（除了login）任意路由
           if(name){//已有用户信息
            next();
           }else{
             //没有用户信息，先获取用户信息再放行
             try {
                await store.dispatch('getUserInfo');
                next();
             } catch (error) {
                //token失效了，获取不到用户信息，重新登录
                //清除token
                await store.dispatch('userLogout');
                next('/login');
             }
           }
        }
    }else{
        //用户未登录，暂时没有处理完毕，现这个样子后期再处理
        next();
    }
    
});
export default router;