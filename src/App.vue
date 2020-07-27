<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta && $route.meta.keepAlive" class="route-translate" ></router-view>
    </keep-alive>

    <router-view v-if="!$route.meta || !$route.meta.keepAlive" class="route-translate"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed:{
      key(){
        return this.$route.fullPath;
      }
    },
  }
</script>
<style lang="less">
  @import "./common/css/scroll.less";
</style>
<style>
  #app {
    font-family: "MicrosoftYaHei",微软雅黑,'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
  }
</style>
