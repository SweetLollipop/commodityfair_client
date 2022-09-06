//引入路由组件
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Detail from '@/pages/Detail';
export default  [
    {
        path: "/detail/:skuId",
        component: Detail,
        //路由元信息key不能瞎写：只能叫做meta
        meta: {show: true}
    },
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