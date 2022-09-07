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
const getters = {};

export default {
    state,
    actions,
    mutations,
    getters,
}