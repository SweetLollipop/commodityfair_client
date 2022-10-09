import { reqGetGoodsInfo } from "@/api";
import { reqAddOrUpdateShopCart } from "@/api";
const state = {
    goodsInfo: {},
};
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo;
    }
};
const actions = {
    //获取产品信息的action
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGetGoodsInfo(skuId);
        if (result.code === 200) {
            commit('GETGOODSINFO', result.data);
        }
    },
    //将产品添加到购物车中
    async AddOrUpdateShopCart({ commit }, {skuId, skuNum}) {
        //加入购物车返回的结果
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        //服务器写入数据成功，并没有返回其他的数据，只是返回{code: 200, message: '成功', data: null, ok: true}代表这次操作成功
        //因为服务器没有返回其余数据，因此不需要写三连环存储数据
        /* if(result.code === 200) {
            commit('ADDORUPDATESHOPCART', result.data);
        } */
    }
};
//简化数据
const getters = {
    //面包屑数据
    categoryView(state) {
        //为了防止网速慢返回undefined报错，后面加个空对象{}
        return state.goodsInfo.categoryView || {};
    },
    //产品信息数据
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    },
    //产品售卖属性
    spuSaleAttrList() {
        return state.goodsInfo.spuSaleAttrList || [];
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
}