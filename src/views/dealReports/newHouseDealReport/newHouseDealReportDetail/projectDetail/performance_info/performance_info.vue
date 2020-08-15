<template>
  <div class="performance_info">
    <section_title title="业绩信息" />
    <main>
      <section>
        <subtitle title="外部合作费" has_icon="" />
        <div class="total_tips">合作费: <span class="fc_f57107">{{initParams.outCooperations | cooperationCost}}元</span></div>
        <div class="table">
          <div class="head row">
            <div class="col">合作人</div>
            <div class="col">身份证</div>
            <div class="col">联系方式</div>
            <div class="col">类型</div>
            <div class="col">合作费</div>
          </div>
          <div class="row" v-for="(item,index) in initParams.outCooperations" :key="index">
            <div class="col">{{item.userName || '--'}}</div>
            <div class="col">{{item.userIccode  || '--'}}</div>
            <div class="col">{{item.userMobile  || '--'}}</div>
            <div class="col">{{item.cooperationClass |getCooperationClassText}}</div>
            <div class="col fc_f57107">{{item.cooperationCost  || '0'}}</div>
          </div>
        </div>
      </section>
      <section>
        <subtitle title="渠道部业绩" has_icon="1" />
        <data_table  :initData="secondMarketdList" :leaderFlag='leaderFlag' title="二级市场渠道部业绩："/>
        <data_table  :initData="thirdMarketdList" :leaderFlag='leaderFlag' title="三级市场渠道部业绩："/>
      </section>
      <section>
        <subtitle title="驻场部提成" has_icon="1" />
        <data_table :initData="commissionFieldList" />
      </section>
      <section>
        <subtitle title="策划部提成" has_icon="1" />
        <data_table :initData="planFieldList" />
      </section>
      <section>
        <subtitle title="拓展部提成" has_icon="1" />
        <data_table  :initData="expandFieldList" />
      </section>
      <section>
        <subtitle title="领导提成分配" has_icon="1" />
        <data_table  :initData="leadFieldList"/>
      </section>
    </main>
  </div>
</template>

<script>
import section_title   from '../components/section_title'
import subtitle from './components/subtitle'
import data_table from './components/data_table'
export default {
  components: {
    section_title, subtitle, data_table
  },
  data() {
    return {
      leaderFlag:true,//领导人分配业绩flag
      secondMarketdList:[],//二级市场渠道部业绩
      thirdMarketdList:[],//三级市场渠道部业绩     
      commissionFieldList:[],//驻场部提成
      planFieldList:[],//策划部提成
      expandFieldList:[],//拓展部提成
      leadFieldList:[],//领导提成分配
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
  watch:{
    initParams(){
      this.initData();
    }
  },
  created(){
    this.initData();
  },
  methods:{
    //将业绩类型分类
    initData(){
      //类型数据
      let info  = this.initParams.reportProfitVOs;
      for(let item of info){
        switch(item.profitType){
          case 1:
            this.secondMarketdList.push(item);
            break;
          case 2:
            this.thirdMarketdList.push(item);
            break;
          case 3:
            this.commissionFieldList.push(item);
            break;
          case 4:
            this.planFieldList.push(item);
            break; 
          case 5:
            this.expandFieldList.push(item);
            break; 
          case 6:
            this.leadFieldList.push(item);
            break; 
        }
      }
      this.MarketdList
    },
  },
  filters:{
    getCooperationClassText(val){
      //类型   1：第三方  2：买房   3：公司内部
      let arr = ['第三方','买房','公司内部',];
      if(val == '') return val;
      let num = Number(val);
      return arr[num -1];
    },
    //总计合作费
    cooperationCost(data){
      let arr = data || [];
      let toal = 0;
      for(let item of arr){
        toal += (parseInt(item.cooperationCost) ||0);
      }
      return toal;
    }
  }
}
</script>
<style>
.fc_f57107 {
  color: #f57107; 
}
</style>

<style lang="less" scoped>
.performance_info {
  main {
    padding: 0.15rem; padding-top: 0;
    section {
      &:nth-of-type(1) {
        .total_tips {
          text-indent: 0.15rem;  margin-top: 0.2rem; 
        }
        .table {
          margin-top: 0.15rem; width: 5.4rem; 
          .row {
            height: 0.49rem; line-height: 0.49rem; 
            display: flex; border-bottom: solid 0.01rem #eaeaea;
            &.head {
              background-color: #efefef; color: #999999; 
              height: 0.3rem; border-bottom: none; 
              &>.col {
                line-height: 0.3rem;
              }
            }
            .col {
              height: 100%; line-height: 0.49rem; 
              &:nth-of-type(1) {
                width: 0.81rem; text-indent: 0.16rem; 
              }
              &:nth-of-type(2) {
                width: 1.74rem;
              }
              &:nth-of-type(3) {
                width: 1.27rem;
              }
              &:nth-of-type(4) {
                width: 1.11rem;
              }
              &:nth-of-type(5) {
                width: 0.54rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>