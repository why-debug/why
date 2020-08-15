<template>
  <div class="ershou-detail" v-if="isShow">
    <div class="content">
      <div class="close-icon" @click="coloseView"></div>
      <div class="c-left">
        <div
          v-for="(item, index) in leftList"
          :key="index"
          :class="{'active': item.value === leftActive}"
          @click="changeLeft(item.value)">
          <img :src="item.value === leftActive ? item.icon : item.activeIcon" alt="">
        </div>
      </div>
      <div class="c-middle" :class="isRight ? '' : 'middle-active'">
        <projectDetail v-if="leftActive === 'basicInformation'" :projectDetailInfo="newHouseDetailInfo"></projectDetail>
        <!-- <basic-information v-if="leftActive === 'basicInformation'"></basic-information> -->
        <!-- <attachment-information v-if="leftActive === 'attachmentInformation'"></attachment-information> -->
        <!-- <financial-receipt v-if="leftActive === 'financialReceipt'"></financial-receipt> -->
        <!-- <customer-relationship v-if="leftActive === 'customerRelationship'"></customer-relationship> -->
        <action-log v-if="leftActive === 'actionLog'"  :reportId="dealId"  :offerNo="newHouseDetailInfo.offerNo"></action-log>
      </div>
      <div class="c-right" v-if="isRight">
        <report-no v-if="leftActive === 'basicInformation'" :projectDetailInfo="newHouseDetailInfo" :reportId="dealId"></report-no>
      </div>
    </div>
  </div>
</template>

<script>
import basicInformation from '@/views/dealReports/newHouseDealReport/detailComponets/basicInformation.vue'
import attachmentInformation from '@/views/dealReports/newHouseDealReport/detailComponets/attachmentInformation.vue'
import financialReceipt from '@/views/dealReports/newHouseDealReport/detailComponets/financialReceipt.vue'
import customerRelationship from '@/views/dealReports/newHouseDealReport/detailComponets/customerRelationship.vue'
import actionLog from '@/views/dealReports/newHouseDealReport/detailComponets/actionLog.vue'
import reportNo from '@/views/dealReports/newHouseDealReport/detailComponets/reportNo.vue'
import projectDetail from '../newHouseDealReportDetail/projectDetail/project_detail'
import {ReportInfoDetail,ReportInfoDetailRequest,ReportInfoDetailItem} from '../../../../net/newHouseDealReport/display/reporInfoDetail'
import { ErpCommon } from "../../../../utils/ErpCommon";

export default {
  components: {
    basicInformation,
    attachmentInformation,
    financialReceipt,
    customerRelationship,
    actionLog,
    reportNo,
    projectDetail
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    dealId: {
      type: Number|String,
      default: ''
    },
    //新房核心查看权
    hasNewBuildSeeAuth: {
      type: Boolean,
      data() {
        return false;
      },
    },
  },
  data () {
    return {
      leftActive: 'basicInformation',
      newHouseDetailInfo:new ReportInfoDetailItem(),//新房成交报告详情数据
      params:{
        reportId:"",//成交报告ID
      },
      leftList: [
        { text: '基本信息', value: 'basicInformation', icon: require('../../../../assets/images/dealReports/Icon1.png'), activeIcon: require('../../../../assets/images/dealReports/Icon1Select_200.png') },
        // { text: '附件信息', value: 'attachmentInformation', icon: require('../../../../assets/images/dealReports//Icon2.png'), activeIcon: require('../../../../assets/images/dealReports/Icon2Select_200.png') },
        // { text: '财务收付', value: 'financialReceipt', icon: require('../../../../assets/images/dealReports/Icon3.png'), activeIcon: require('../../../../assets/images/dealReports/Icon3Select_200.png') },
        // { text: '客户关系', value: 'customerRelationship', icon: require('../../../../assets/images/dealReports/Icon4.png'), activeIcon: require('../../../../assets/images/dealReports/Icon4Select_200.png') },
        { text: '操作日志', value: 'actionLog', icon: require('../../../../assets/images/dealReports/Icon5.png'), activeIcon: require('../../../../assets/images/dealReports/Icon5Select_200.png') }
      ]
    }
  },
  watch:{
    dealId:{
      handler:function(newVal,oldVal){
        this.params.reportId = newVal;
        this.initData();
      },
      deep:true
    }
  },
  created() {
    this.params.reportId = this.dealId;
    this.initData();
  },
  methods: { 
    //初始化详情数据
    initData(){
      if(!this.dealId) return;
      new ReportInfoDetail(new ReportInfoDetailRequest(this.params)).send()
      .then((res)=>{
        this.newHouseDetailInfo = res;
         this.handleDetailInfo();
        console.log(this.newHouseDetailInfo,'成交报告详情初始化数据'); 
      })
      .catch((res)=>{
        console.log(res,'err');
        new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
      })
    },
    //判断是否有核心查看权,处理数据
    handleDetailInfo(){
      console.log(this.hasNewBuildSeeAuth,'新房核心查看权');
       if(!this.hasNewBuildSeeAuth){
         this.newHouseDetailInfo.agencyCommission = "****";
         this.newHouseDetailInfo.custCommission = "****";
         this.newHouseDetailInfo.distributionCommission = "****";
         this.newHouseDetailInfo.offerAmount = "****";
         this.newHouseDetailInfo.offerMoney = "****";
         this.newHouseDetailInfo.reportCash = "****";
         this.newHouseDetailInfo.standardCommission = "****";
         this.newHouseDetailInfo.reportProfitVOs.forEach(key=>{
           key.allotMoney = "****";
           key.allotRatio = "****";
           key.allotUserName = key.allotUserNameName;
         })
       }
       console.log(JSON.parse(JSON.stringify(this.newHouseDetailInfo)),'新房详情------------');
    },
    // hideIt () {
    //   this.$emit('update:isShow', false)
    // },
    //关闭详情弹窗
     coloseView () {
      // this.$emit('coloseView', false)
       this.$emit('update:isShow', false)
    },
    changeLeft (value) {
      this.leftActive = value
    }
  },
  computed: {
    isRight () {
      return this.leftActive === 'basicInformation'
    }
  }
}
</script>

<style lang="less" scoped>
.ershou-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  &>.content {
    position: relative;
    width: 8.66rem;
    height: 5.1rem;
    display: flex;
    background-color: #eff4f9;
    &>.close-icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 0.18rem;
      height: 0.18rem;
      background-image: url('../../../../assets/images/public/close_200.png');
      background-size: 0.12rem 0.12rem;
      background-repeat: no-repeat;
      background-position: center center;
      z-index: 100;
      cursor: pointer;
      &:hover {
        background-image: url('../../../../assets/images/public/close_200_hover.png');
        background-color: red;
      }
    }
    &>.c-left {
      width: 0.5rem;
      height: 100%;
      background-image: linear-gradient(0deg, #467eb0 0%, #3aa1b0 61%, #50a7cf 100%), linear-gradient(#1f96ff, #1f96ff);
      background-blend-mode: normal, normal;
      box-shadow: inset -0.01rem 0 0.1rem 0 rgba(0, 0, 0, 0.4);
      overflow: hidden;
      &>div {
        width: 100%;
        height: 0.45rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:nth-child(1) {
          margin-top: 0.25rem;
        }
        &.active {
          background-color: #eff4f9;
        }
        &>img {
          width: auto;
          height: 0.2rem;
          display: block;
        }
      }
    }
    &>.c-middle {
      width: calc(~"100% - 0.5rem - 2.3rem");
      height: 100%;
      overflow: auto;
      &.middle-active {
        width: calc(~"100% - 0.5rem");
      }
    }
    &>.c-right {
      width: 2.3rem;
      height: 100%;
      overflow: auto;
      background-color: #d9f1fe;
    }
  }
}
</style>
