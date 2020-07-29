<template>
  <div class="top-title">
    <img class="icon" :src="iconUrl">
    <div class="title">{{titleName}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    iconUrl: {
      type: String,
      default: require('../../../../assets/images/dealReports/cooperation_rules_icon.png')
    },
    titleName: {
      type: String,
      default: '成交报告信息'
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.top-title {
  width: 100%;
  height: 0.4rem;
  display: flex;
  align-items: center;
  &>.icon {
    width: auto;
    height: auto;
    max-height: 0.25rem;
    display: block;
  }
  &>.title {
    width: auto;
    height: 0.4rem;
    line-height: 0.4rem;
    padding: 0 0.1rem;
    box-sizing: border-box;
    color: #999999;
    font-size: 0.16rem;
  }
  &>.line {
    flex: 1 1 auto;
    height: 0.01rem;
    background-color: #d6dfe6;
  }
}
</style>
