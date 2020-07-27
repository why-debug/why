<template>
  <div style="width: 100%;height: 100%;overflow:hidden;position: absolute;top: 0;left: 0">
   <!-- <div class="tab-box">
      <div
        class="tab-item"
        v-for="(item, index) in tabList"
        :key="index"
        @click="changeTab(item.path)"
        :class="{'tab-item-active': item.path === activeTab}">
        {{item.name}}
      </div>
    </div> -->
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
  import {ErpCommon} from "../../utils/ErpCommon";
  import {GetUserOpers, GetUserOpersRequest} from "../../net/common/GetUserOpers";
  import {SetBaseInfoModel} from "../../model/BaseInfoModel";

  export default {
    data() {
      return {
        activeTab: 'KPIConfig',
        tabList: [
          {name: 'KPI配置', path: 'KPIConfig'},
          {name: 'KPI统计', path: 'KPICount'},
        ]
      }
    },
    created() {
      this.activeTab = this.$route.name;
      this.initUserOpers();
    },
    methods: {
      changeTab(path) {
        this.activeTab = path;
        this.$router.push({
          name: path
        })
      },
      async initUserOpers(){
        console.log('--KPI权限初始化开始Index--');
        let userId = new ErpCommon().getOperator('userID') || '20341347'; //写死测试userId:20341347

        if (!userId) return;

        let userOpers = await new GetUserOpers(new GetUserOpersRequest({userId:userId})).send();
        SetBaseInfoModel.setUserOpers(userOpers);
        console.log('--KPI权限初始化完成--');
      },
    },
    computed: {
      key() {
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

    & > .tab-item {
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
      -moz-user-select: none;
      -khtml-user-select: none;
      user-select: none;

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
