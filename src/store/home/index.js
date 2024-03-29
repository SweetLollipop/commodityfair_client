import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
//home模块的小仓库
const state = {
    //state中的数据的数据类型是根据接口返回值初始化的
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor组件的数据
    floorList: [],
};
const mutations = {
    CATEGORYLSIT(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    },
};
const actions = {
    //通过API里面的接口函数，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            commit('CATEGORYLSIT', result.data);
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }){
        let result = await reqGetBannerList();
        if(result.code === 200) {
            commit('GETBANNERLIST', result.data);
        }
    },
    //获取floor数据
    async getFloorList({commit}) {
        let result = await reqFloorList();
        if(result.code === 200) {
            commit('GETFLOORLIST', result.data)
        }
    }
};
//计算属性
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
}