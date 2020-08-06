<template>
  <div class="project_info">
    <header><section_title title="项目信息" /></header>
    <main>
      <section>
        <div class="col">
          <div class="title"><div>合</div><div>作</div><div>方</div><div>式</div></div>
          <div class="content">{{initParams.cooperationTypeText || '--'}}</div>
        </div>
        <div class="col">
          <div class="title"><div>主</div><div>单</div><div>号</div></div>
          <div class="content">{{initParams.reportNo || '--'}}</div>
        </div>
        <div class="col">
          <div class="title"><div>用</div><div>途</div></div>
          <div class="content">{{initParams.buildUseageName || '--'}}</div>
        </div>
      </section>
      
      <section>
        <div class="col">
          <div class="title"><div>户</div><div>型</div></div>
          <div class="content">{{initParams.buildTypeText || '--'}}</div>
        </div>
        <div class="col">
          <div class="title"><div>建</div><div>筑</div><div>面</div><div>积</div></div>
          <div class="content">{{initParams.buildArea || '--'}}m<sup>2</sup></div>
        </div>
        <div class="col">
          <div class="title"><div>套</div><div>内</div><div>面</div><div>积</div></div>
          <div class="content">{{initParams.buildInnerarea || '--'}}m<sup>2</sup></div>
        </div>
      </section>
      <section>
        <div class="col">
          <div class="title"><div>租</div><div>约</div><div>到</div><div>期</div></div>
          <div class="content">{{initParams.leaseEndTime | formatTime}}</div>
        </div>
        <div class="col">
          <div class="title"><div>租</div><div>约</div><div>押</div><div>金</div></div>
          <div class="content">{{initParams.cashPledgeClass || '--'}}</div>
        </div>
        <div class="col"></div>

      </section>
      <section>
        <div class="col">
          <div class="title"><div>开</div><div>发</div><div>商</div></div>
          <div class="content">{{initParams.developerName || '--'}}</div>
        </div>
        <div class="col">
          <div class="title"><div>代</div><div>理</div><div>商</div></div>
          <div class="content">{{initParams.agentName || '--'}}</div>
        </div>
        <div class="col">
          <div class="title"><div>项</div><div>目</div><div>负</div><div>责</div><div>人</div></div>
          <div class="content">{{initParams.chargeName | filterChargeName}}</div>
        </div>
      </section>

      <section class="long">
        <div class="title"><div>项</div><div>目</div><div>地</div><div>址</div></div>
        <div class="content">{{initParams.buildAddr || '--'}}</div>
      </section>
      <section class="long">
        <div class="title"><div>佣</div><div>金</div><div>结</div><div>算</div><div>方</div><div>式</div></div>
        <div class="content">{{initParams.settlementMethod || '--'}}</div>
      </section>
      <section class="long">
        <div class="title"><div>现</div><div>金</div><div>奖</div></div>
        <div class="content">{{initParams.cashPrize || '--'}}元</div>
      </section>
      <section class="long">
        <div class="title"><div>结</div><div>佣</div><div>必</div><div>备</div><div>资</div><div>料</div></div>
        <!-- <div class="content">{{initParams.dataSheets || '--'}}</div> --> 
        <!-- <div class="content">缺少字段</div> --> 
        <div class="content">--</div>
      </section>

    </main>
  </div>
</template>

<script>
import section_title from '../components/section_title'
export default {
  components: {
    section_title, 
  },
  data() {
    return {
      params:{

      }
    }
  },
  props:{
    initParams:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  // watch:{
  //   initParams(){
  //     this.project_name_data = this.initParams;
  //   }
  // },
  filters:{
    filterChargeName(val){
      if(val && val.length>0){
        return val.join();
      }else{
        return '--'
      }
    },
    formatTime(val){
      if(val != '' && val !=undefined){
          return val.split(' ')[0];
      }else{
          return '--';
      }
    },
  }

}
</script>

<style lang="less" scoped>
.project_info {
  main {
    padding: 0.15rem;
    section {
      margin-top: 0.13rem; display: flex; justify-content: space-between; align-items: center; 
      &:nth-of-type(1) {
        margin-top: 0;
      }
      &.long {
        justify-content: flex-start; align-items: flex-start; 
        .title {
          min-width: 0.48rem; color: #999999; position: relative;
          display: flex; justify-content: space-between; align-items: center; 
          &::after {
            content: ':' ; position: absolute; bottom: 0; right: -0.05rem; 
          }
        }
        .content {
          margin-left: 0.07rem; max-width: 4.25rem;
        }
      }
      .col {
        display: flex; align-items: center; 
        &:nth-of-type(1) {
          width: 2rem;
        }
        &:nth-of-type(2) {
          width: 2.05rem;
        }
        &:nth-of-type(3) {
          width: 1.5rem;
        }
        .title {
          min-width: 0.48rem; color: #999999; position: relative;
          display: flex; justify-content: space-between; align-items: center; 
          &::after {
            content: ':' ; position: absolute; bottom: 0; right: -0.05rem; 
          }
        }
        .content {
          margin-left: 0.07rem;
        }
      }
    }
  }
}
</style>