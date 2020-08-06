<template>
  <div class="report-no">
    <div class="title">编号：{{projectDetail.offerNo}}</div>
    <div class="content">
      <!-- <div class="item" v-for="(item, index) in reportNoList" :key="index">
        <div>{{item.text}}</div>
        <div :class="item.value2 ? 'not-normal' : 'normal'">
          <span v-if="item.value2">{{item.value2}}<br></span>
          {{item.value1}}
        </div>
      </div> -->
      <div class="item" >
        <div>认购编号：</div>
        <div class="normal">
          {{projectDetail.offerNo || '--'}}
        </div>
      </div>
       <div class="item" >
        <div>认购定金：</div>
        <div class="normal">
          {{projectDetail.offerMoney || '--'}}元
        </div>
      </div> <div class="item" >
        <div>认购总价：</div>
        <div class="normal">
          <!-- {{projectDetail.offerAmount || '--'}}元 -->
          {{ projectDetail.offerAmount|price }}{{ projectDetail.offerAmount|unit }}
        </div>
      </div>
       <div class="item" >
        <div>成交日期：</div>
        <div class="normal">
          {{projectDetail.dealTime | formatTime }}
        </div>
      </div>
       <div class="item" >
        <div>认购日期：</div>
        <div class="normal">
          {{projectDetail.offerTime | formatTime }}
        </div>
      </div>
       <div class="item" >
        <div>预收佣日期：</div>
        <div class="normal">
          {{projectDetail.commissionPlanTime | formatTime }}
        </div>
      </div>
       <div class="item" >
        <div>预交首付日期：</div>
        <div class="normal">
          {{projectDetail.firstPaymentTime | formatTime }}
        </div>
      </div>
       <div class="item" >
        <div>上报业绩：</div>
        <div class="normal">
          {{projectDetail.reportCash || '--'}}元
        </div>
      </div>
       <div class="item" >
        <div>实收佣金占比：</div>
        <div class="normal">
          <!-- 缺少字段 -->
          --
        </div>
      </div>
       <div class="item" >
        <div>标准佣金：</div>
        <div class="normal">
          {{projectDetail.standardCommission || '--'}}元
        </div>
      </div>
      <div class="item" >
        <div>代理佣金：</div>
        <div class="normal">
          {{projectDetail.agencyCommission || '--'}}元
        </div>
      </div>
        <div class="item" >
        <div>分销佣金：</div>
        <div class="normal">
          {{projectDetail.distributionCommission || '--'}}元
        </div>
      </div>
        <div class="item" >
        <div>客户佣金：</div>
        <div class="normal">
          {{projectDetail.custCommission || '--'}}元
        </div>
      </div>
         <div class="item" >
        <div>成交人：</div>
        <div class="normal">
          {{projectDetail.dealUserId || '--'}}
        </div>
      </div>
         <div class="item" >
        <div>认购备注：</div>
        <div class="normal">
          {{projectDetail.note || '--'}}
        </div>
      </div>

    </div>
    <div class="bottom-btn">
      <div class="btn-1">电子合同</div>
      <div class="btn-2">编辑</div>
      <div class="btn-3">审核</div>
    </div>
  </div>
</template>

<script>
import {ReportInfoDetailItem} from '../../../../net/newHouseDealReport/display/reporInfoDetail'
export default {
  data () {
    return {
      projectDetail: new ReportInfoDetailItem(),//详情参数
      reportNoList: [
        // { text: '认购编号：', value1: 'GJHGJKGJHG', value2: '房屋求购委托书', key: '' },
        { text: '认购编号：', value1: 'GJHGJKGJHG',  key: '' },
        { text: '认购定金：', value1: '98000元', key: '' },
        { text: '认购总价：', value1: '148万   8000元/m', key: '' },
        { text: '成交日期：', value1: '2018-08-09', key: '' },
        { text: '认购日期：', value1: '2020-02-02', key: '' },
        { text: '预收佣日期：', value1: '2020-02-02', key: '' },
        { text: '预交首付日期：', value1: '2020-02-02', key: '' },
        { text: '上报业绩：', value1: '60000元', key: '' },
        { text: '实收佣金占比：', value1: '30%', key: '' },
        { text: '标准佣金：', value1: '1000元', key: '' },
        { text: '代理佣金：', value1: '1000元', key: '' },
        { text: '分销佣金：', value1: '1000元', key: '' },
        { text: '客户佣金：', value1: '1000元', key: '' },
        { text: '成交人：', value1: '站三丰-世纪城', key: '' },
        { text: '认购备注：', value1: '我是认购备注哈哈或或或', key: '' }
      ]
    }
  },
   props:{
    projectDetailInfo:{
      type: Object,
      default(){
        return new ReportInfoDetailItem();
      }
    }
  },
  watch: {
    projectDetailInfo:{
      handler:function(newVal,oldVal) {
        this.projectDetail = newVal;
      },
      deep:true
    }
  },
  created(){
    this.projectDetail = this.projectDetailInfo;
    console.log(this.projectDetailInfo,'认购信息');
  },
   filters:{
      formatTime(val){
          if(val != '' && val !=undefined){
              return val.split(' ')[0];
          }else{
              return '--';
          }
      },
    unit(price) {
      let p= Number(price)
      if (isNaN(p)) return '元';
      if (p<9999) return '元';
      return '万元'
    }, 
    price(price) {
      let p= Number(price);
      if (isNaN(p)) return '--';
      if (p<9999) return price;
      return p/10000
    }
    },
}
</script>

<style lang="less" scoped>
.report-no {
  width: 100%;
  height: auto;
  &>.title {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    text-indent: 0.1rem;
    color: #006797;
    font-size: 0.14rem;
  }
  &>.content {
    width: 100%;
    height: 4.1rem;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 0.1rem;
    box-sizing: border-box;
    &>.item {
      line-height: 0.3rem;
      display: flex;
      &>div {
        &:nth-child(1) {
          min-width: 0.4rem;
          color: #999999;
          font-size: 0.12rem;
        }
        &:nth-child(2) {
          width: auto;
          color: #444444;
          font-size: 0.12rem;
          word-break: break-all;
        }
      }
    }
  }
  &>.bottom-btn {
    width: 100%;
    height: auto;
    margin-top: 0.1rem;
    display: flex;
    justify-content: space-around;
    &>div {
      width: 0.6rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      border-radius: 0.02rem;
      opacity: 1;
      color: #ffffff;
      font-size: 0.13rem;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      &.btn-1 {
        background-image: linear-gradient(0deg, #eff1f4 0%, #ffffff 100%), linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        border: solid 0.01rem #bdc6cf;
        color: #666666;
      }
      &.btn-2 {
        background-image: linear-gradient(0deg, #64c12b 0%, #72cd3b 100%), linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.75), inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
        border: solid 0.01rem #45a802;
      }
      &.btn-3 {
        background-image: linear-gradient(0deg, #449aff 0%, #50a7ff 100%), linear-gradient(#5fc41b, #5fc41b);
        background-blend-mode: normal, normal;
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(0, 0, 0, 0.75), inset 0rem 0.01rem 0rem 0rem rgba(255, 255, 255, 0.2);
        border: solid 0.01rem #3d81ff;
      }
    }
  }
}
</style>
