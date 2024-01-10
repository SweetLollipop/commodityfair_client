<template>
  <div id="app">
    <h1 v-upper="msg"></h1>
    <Header></Header>
    <!-- 路由组件出口的位置 -->
    <router-view></router-view>
    <!-- 在Home、Search路径下显示、在Login、Register路径下隐藏的 -->
    <Footer v-show="$route.meta.show === true"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  data() {
    return {
      msg: "abc"
    }
  },
  components: {
    Header,
    Footer,
  },
  mounted(){
    //派发一个action||获取商品分类的三级列表的数据（从TypeNav.vue中复制粘贴过来，因为app.vue只执行一次）
    //注意不能下面的语句不能放到main.js中，因为main.js中的this为undefined;
    //通知vuex发请求，获取数，存储于仓库当中
    this.$store.dispatch("categoryList");
  }
};
</script>

<style>
</style>
