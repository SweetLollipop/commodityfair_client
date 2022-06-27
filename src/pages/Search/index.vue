<template>
  <div>
      <h1>我是搜索组件</h1>
      <h1>params参数---{{$route.params.keyword}}</h1>
      <h1>query参数---{{$route.query.k}}</h1>
  </div>
</template>

<script>
export default {
    name: 'Search'
}
</script>

<style>

</style>