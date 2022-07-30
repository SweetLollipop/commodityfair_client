//当前的这个模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockRequests";

//三级联动的接口
// /api/product/getBaseCategoryList get 无参数
/* export const reqCategoryList = () => {
    //发请求：axios发请求返回的结果是Promise对象
    return requests({ url: '/product/getBaseCategoryList', method: 'get' })
} */

export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner');
