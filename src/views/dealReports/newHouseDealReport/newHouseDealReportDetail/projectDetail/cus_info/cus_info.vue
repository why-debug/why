<template>
  <div class="cus_info" >
    <div v-for="(item,index) in initParams.reporCustListVOs" :key="index">
    <header><section_title title="客户信息" /></header>
    <main>
      <section>
        <div class="col">
          <div class="title"><div>客</div><div>户</div><div>来</div><div>源</div></div>
          <div class="content">{{item.custSource || '--'}}</div>
        </div>
        <div class="col">
          <div class="title long"><div>合作/转介单号</div></div>
          <div class="content">{{item.proportion || '--'}}</div>
        </div>
      </section>

      <section>
        <div class="col">
          <div class="title"><div>客</div><div>户</div><div>姓</div><div>名</div></div>
          <div class="content">{{item.custName || '--'}}</div>
        </div>
        <div class="col">
          <div class="title"><div>地</div><div>域</div></div>
          <div class="content">{{item.territory === 0 ? "大陆" : "海外"}}</div>
        </div>
      </section>

      <section>
        <div class="col">
          <div class="title"><div>电</div><div>话</div></div>
          <div class="content">{{item.proportion || '--'}}</div>
        </div>
        <div class="col">
          <div class="title long"><div>证</div><div>件</div><div>号</div></div>
          <div class="content">{{item.custIccode || '--'}}</div>
        </div>
      </section>

      <section>
        <div class="col">
          <div class="title"><div>户</div><div>籍</div></div>
          <div class="content">{{item.belonged || '--'}},{{item.belongedProvince || '--'}}</div>
        </div>
        <div class="col">
          <div class="title long"><div>产</div><div>权</div><div>比</div><div>例</div></div>
          <div class="content">{{item.proportion || '--'}}</div>
        </div>
      </section>

      <section class="long">
        <div class="title"><div>联</div><div>系</div><div>地</div><div>址</div></div>
        <div class="content">{{item.linkAddr || '--'}}</div>
      </section>
      <section class="long">
        <div class="title"><div>备</div><div>注</div></div>
        <div class="content">{{item.custNote || '--'}}</div>
      </section>

    </main>
  </div>

  </div>
</template>

<script>
import section_title from '../components/section_title'
export default {
  components: {
    section_title, 
  },
  data(){
    return{

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

}
</script>

<style lang="less" scoped>
.cus_info {
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
          width: 2.67rem;
        }
        &:nth-of-type(2) {
          width: 2.87rem;
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