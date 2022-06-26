<template>
  <div id="app">
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
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
</style>
