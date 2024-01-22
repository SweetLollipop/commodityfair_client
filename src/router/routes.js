//引入路由组件
// import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import MyOrder from '@/pages/Center/myOrder';
import GroupOrder from '@/pages/Center/groupOrder';

/*当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。*/
/*
const foo = () => {
    return import("@/pages/Home");
} //可简写到路由配置信息中
*/

// 路由配置信息
export default  [
    {
        path: "/center",
        component: Center,
        meta: {show: true},
        //二级路由组件
        children: [
            {
              path: 'myorder',
              component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect: '/center/myorder',
            }
        ]
    },
    {
        path: "/paysuccess",
        component: PaySuccess,
        meta: {show: true}
    },
    {
        path: "/pay",
        component: Pay,
        meta: {show: true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去支付页面，必须是从交易而来
            if(from.path=="/trade"){
                next();
            }else{
                //其他的路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        path: "/trade",
        component: Trade,
        meta: {show: true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面，必须是从购物车而来
            if(from.path=="/shopcart"){
                next();
            }else{
                //其他的路由组件而来，停留在当前
                next(false);
            }
        }
    },
    {
        path: "/shopcart",
        component: ShopCart,
        meta: {show: true}
    },
    {
        path: "/addcartsuccess",
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: {show: true}
    },
    {
        path: "/detail/:skuId",
        component: Detail,
        //路由元信息key不能瞎写：只能叫做meta;此处作用：是否显示下面的Footer组件
        meta: {show: true}
    },
    {
        path: "/home",
        component:  () => import("@/pages/Home"),
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