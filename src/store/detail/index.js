import { reqGetGoodsInfo } from "@/api";
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
    }
};
//简化数据
const getters = {
    categoryView(state) {
        //为了防止网速慢返回undefined报错，后面加个空对象{}
        return state.goodsInfo.categoryView || {};
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {};
    }
};

export default {
    state,
    actions,
    mutations,
    getters,
}