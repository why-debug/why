<template>
  <div style="width: 100%;height: 100%;">
    <div class="tab-box">
      <div
        class="tab-item"
        v-for="(item, index) in tabList"
        :key="index"
        @click="changeTab(item.path)"
        :class="{'tab-item-active': item.path === activeTab}">
        {{item.name}}
      </div>
    </div>
    <transition name="breadcrumb" mode="out-in">
      <keep-alive>
        <router-view :key="key" v-if="$route.meta && $route.meta.keepAlive" class="route-translate"></router-view>
      </keep-alive>
    </transition>

    <transition name="breadcrumb" mode="out-in">
      <router-view :key="key" v-if="!$route.meta || !$route.meta.keepAlive" class="route-translate"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: 'dealReportsList',
      tabList: [
        { name: '交易报告列表', path: 'dealReportsList'},
        { name: '成交记录', path: 'closingRecords'},
        { name: '合同号管理', path: 'contractNoManagement'},
        { name: '策划费', path: 'planningFees'},
        { name: '交易资料', path: 'dealData'},
        { name: '资料类别', path: 'dataClass'}
      ]
    }
  },
  created () {
    this.activeTab = this.$route.name;
  },
  methods: {
    changeTab (path) {
      this.activeTab = path;
      this.$router.push({
        name: path
      })
    }
  },
  computed:{
    key () {
      return this.$route.fullPath;
    }
  }
}
</script>

<style lang="less" scoped>
  .tab-box {
    width: 100%;
    background: #259cf3;
    border-bottom: 0.01rem solid #126fb2;
    height: 0.32rem;
    display: flex;
    align-items: center;
    &>.tab-item {
      position: relative;
      width: 0.9rem;
      height: 0.3rem;
      line-height: 0.31rem;
      text-align: center;
      font-size: 0.12rem;
      color: #00223a;
      border-bottom: 0.01rem solid #126fb2;
      background: #259cf3;
      text-shadow: 0 0.01rem rgba(255, 255, 255, 0.3);
      cursor: pointer;
      &::after {
        content: "";
        background-image: linear-gradient(#2398ee, #015796, #2398ee);
        width: 0.01rem;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
      }
    }
    .tab-item-active {
      background-image: linear-gradient(0deg, #0ca4ff 0%, #a4deff 100%), linear-gradient(#6acff6, #6acff6);
      border-style: solid;
      border-width: 0.01rem;
      line-height: 0.3rem;
      border-image-source: linear-gradient(0deg, #005593 0%, #16a3ff 100%);
      border-image-slice: 1;
      box-sizing: border-box;
    }
  }
</style>
