<template>
  <div>
      <h1>搜索组件</h1>
      <h1>params参数---{{$route.params.keyword}}======={{keyword}}</h1>
      <h1>query参数---{{$route.query.k}}======={{k}}</h1>
  </div>
</template>

<script>
export default {
    name: 'Search',
    //路由组件可以传递props
    props: ['keyword', 'a', 'b', 'k'],
}
</script>

<style>

</style>