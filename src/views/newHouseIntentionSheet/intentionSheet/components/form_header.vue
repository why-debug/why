<template>
  <div class="from_header">
    <div class="img" :style="get_icon_image"></div>
    <div class="title">{{title}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props:[
    'title'
  ], 
  data() {
    return {
      icon_map:new Map()
        .set('项目信息', require('../../../../assets/images/dealReports/Fyxx_200.png'))
        .set('认购信息', require('../../../../assets/images/dealReports/offerpng.png'))
        .set('客户信息', require('../../../../assets/images/dealReports/customer.png'))
        .set('业绩信息', require('../../../../assets/images/dealReports/performance.png'))
    }
  },
  methods: {
  }, 
  computed: {
    get_icon_image() {
      return{
        backgroundImage:`url(${this.icon_map.get(this.title)})`
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .from_header {
    display: flex; align-items: center; color: #999999; font-family: SimSun; font-size: 0.16rem;
    div {
      &.img {
        width: 0.23rem; height: 0.23rem; 
        background-size: contain; background-position: center; background-repeat: no-repeat; 
      }
      &.title {
        margin-left: 0.1rem;
      }
      &.line {
        margin-left: 0.1rem; height: 0.01rem; background-color: #d6dfe6; width: 9.12rem;   
      }
    }
  }
</style>