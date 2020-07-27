<template>
  <div class="addNewHouseDealReport">
    <header>
      <div class="title">新建新房成交报告</div>
      <div class="button_list">
        <div class="save" @click.stop="save">保存</div>
        <div class="cancel">取消</div>
      </div>
    </header>
    <main>
      <div class="holder"></div>
      <section><project_info  ref="getProjectInfo" @projectInfo="projectInfoData" :initData="newHouseDetailInfo"/></section>
      <section><subscription_info  ref="getSubscriptionInfo" @subscriptionInfo="subscriptionData" :initData="newHouseDetailInfo"/></section>
      <section><cus_info  ref="getCusInfo" @cusInfo="cusData" :initData="newHouseDetailInfo"/></section>
      <section> <performance_info ref="getPerformanceInfo" @performanceInfo="performanceData" :initData="newHouseDetailInfo"/> </section>
    </main>
  </div>
</template>

<script>
import project_info from './project_info/project_info'
import subscription_info from './subscription_info/subscription_info'
import cus_info from './cus_info/cus_info'
import performance_info from './performance_info/performance_info'
import {ReportInfoDetail,ReportInfoDetailRequest,ReportInfoDetailItem} from '../../../../net/newHouseDealReport/display/reporInfoDetail'
import {AddReporInfo} from '../../../../net/newHouseDealReport/add/selection/AddReporInfo'
import { ErpCommon } from "../../../../utils/ErpCommon";
export default {
  components: {
    project_info, subscription_info, cus_info, performance_info
  }, 
  data() {
    return {
    params:{
      reportId :1, //成交报告ID
    },//请求成交报告详情参数
    newHouseDetailInfo:new ReportInfoDetailItem(),//新房成交报告详情数据
     saveParams:{},//提交参数
    }
  }, 
  created() {
    //
    this.initData();
  }, 
  methods: {
      //若为编辑则初始化详情数据
    initData(){
      new ReportInfoDetail(new ReportInfoDetailRequest(this.params)).send()
      .then((res)=>{
        this.newHouseDetailInfo = res;
        console.log(this.newHouseDetailInfo,'成交报告详情初始化数据'); 
      })
      .catch((res)=>{
        console.log(res,'err');
        new ErpCommon().toast(res.errMsg || '服务器开小差了,请稍后再试!', "error");
      })
    },
    //保存成交报告
    save() {
      this.saveParams = {};
      this.$refs.getProjectInfo.saveProjectInfo();
      this.$refs.getSubscriptionInfo.saveSubscriptionInfo();
      this.$refs.getCusInfo.saveCusData();
      this.$refs.getPerformanceInfo.savePerformanceInfo();
      console.log('提交');
      this.submit();
    },
    projectInfoData(data){
       Object.assign(this.saveParams,data);
      console.log(data,'这是项目信息提交数据');
    },
    subscriptionData(data){
      Object.assign(this.saveParams,data);
      console.log(data,'这是认购信息提交数据');
    },
    cusData(data){
      Object.assign(this.saveParams,data);
      console.log(data,'这是客户信息提交数据');
    },
    performanceData(data){
      Object.assign(this.saveParams,data);
      console.log(data,'这是业绩信息提交数据');
    },
    submit() {
      //检查元素
    console.log(this.saveParams, "提交的参数");
    // new AddReporInfo(this.saveParams)
    //   .send()
    //   .then(res => {
    //     this.$erpCommon.toast('提交成功');
    //   })
    //   .catch(res => {
    //     console.log(res);
    //     this.$erpCommon.toast(
    //       res.errMsg || "服务器开小差了,请稍后再试",
    //     );
    //   });
  },

  }
}
</script>

<style lang="less" scoped>
@import './common_style/form_style.less'; 
</style>

<style lang="less" scoped>
.addNewHouseDealReport {
  background-color: #fcfcfc;
  min-width: 10.24rem;
  header {
    height: 0.4rem; background-color: #fff; width: 100%;
    box-sizing: border-box; border-bottom: 0.01rem solid #eaeaea; 
    position: fixed; top:0; left:0; z-index: 3; 
    padding: 0 0.2rem 0 0.3rem;
    display: flex; justify-content: space-between; 
    &>div {
      height: 100%;
      &.title {
        text-align: center; line-height: 0.4rem; position: relative; width: 1.21rem;
        color: #666;  cursor: pointer;
        &::after {
          content:''; width: 100%; height: 0.02rem; position: absolute; 
          bottom: 0; left: 0; background-color: #FF5A1F; 
        }
      }
      &.button_list {
        display: flex; height: 100%; justify-content: flex-start; align-items: center; 
        div {
           margin-left: 0.06rem; 
           width: 0.75rem;
           height: 0.3rem;
           line-height: 0.3rem;
           text-align: center;
           font-size: 0.12rem;
           background-repeat: no-repeat;
           background-size: 100% 100%;
           cursor: pointer;
          &.save {
            background-color: #fff;
            background-image: url("../../../../assets/images/projectAgentInfo/common/blue_normal.png");
            color: #fff;
          }
          &.cancel {
            color: 666px;
            background-image: url("../../../../assets/images/projectAgentInfo/common/white_normal.png");
            margin-right: 0.2rem;
          }
        }
      }
    }
  }
  main {
    .holder {
      height: 1rem;
    }
    section {
      margin-bottom: 0.43rem;
    } 
  }
}
</style>