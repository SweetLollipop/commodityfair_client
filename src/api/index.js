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

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor');

//获取搜索块数据 地址：/api/list 请求方式：post 参数：需要带参数
//当前这个接口，给服务器传递参数params,至少是一个空对象
/* {
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  } */
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

//获取产品详情信息的接口
export const reqGetGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

//将产品添加到购物车中（获取跟新某一个产品的个数）/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

//获取购物车列表数据接口
export const reqCartList = () => requests({ url:'/cart/cartList', method:'get'});

//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({ url:`/cart/deleteCart/${skuId}`, method:'delete' });

//切换购物车产品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url:`/cart/checkCart/${skuId}/${isChecked}`, method:'get' });

//获取验证码
export const reqGetCode = (phone) => requests({ url:`/user/passport/sendCode/${phone}`, method:'get' });

//注册的接口
export const reqUserRegister = (data) => requests({ url:'/user/passport/register', data:data, method:'post' });

//登录接口
export const reqUserLogin = (data) => requests({url:'/user/passport/login', data, method:'post'});

//获取用户信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo', method:'get'});

//退出登录
export const reqLogout = () => requests({url:'/user/passport/logout', method:'get'});