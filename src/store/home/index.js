import { reqCategoryList } from "@/api";
//home模块的小仓库
const state = {
    //state中的数据的数据类型是根据接口返回值初始化的
    categoryList: [],
};
const mutations = {
    CATEGORYLSIT(state, categoryList) {
        state.categoryList = categoryList;
    }
};
const actions = {
    //通过API里面的接口函数，向服务器发请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code === 200) {
            commit('CATEGORYLSIT', result.data);
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
}