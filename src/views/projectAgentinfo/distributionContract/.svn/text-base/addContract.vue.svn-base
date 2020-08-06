<template>
  <div class="add">
    <div class="top_t">
      <div class="left">
        <div>分销合同</div>
      </div>
      <div class="right">
        <div @click="save" v-if="pageIndex !==3">提交</div>
        <div @click="cancel" v-if="pageIndex !==3">取消</div>
        <div @click="cancel" v-else>返回</div>
      </div>
    </div>
    <div class="content">
      <div class="middle_content">
        <BasicMessage ref="getBasic" @basicData="basicMessage" :pageIndex="pageIndex" :initParams="editParams"></BasicMessage>
        <contractSigningB ref="getSigning" @contractSigning="getSigning" :pageIndex="pageIndex"  :initParams="editParams"></contractSigningB>
        <developerInformation ref="getDevelop" @developerInfomation="getDevelop" :pageIndex="pageIndex" :initParams="editParams"></developerInformation>
        <electronicFile ref="getElectronic" @electronicFile="getElectronic" :pageIndex="pageIndex" :initParams="editParams"></electronicFile>
      </div>
    </div>
  </div>
</template>
<script>
import BasicMessage from "./addContract/basicMessage";
import contractSigningB from "./addContract/contractSigningB";
import developerInformation from "./addContract/developerInformation";
import electronicFile from "./addContract/electronicFile";
import {ErpCommon} from '../../../utils/ErpCommon'
import { getAddDistribution } from "../../../net/projectAgentinfo/distributionContract/addDistributionContract.js";
import { GetContractInfoDetailsList } from "../../../net/projectAgentinfo/distributionContract/InitContractInfoDetails";
export default {
  components: {
    BasicMessage,
    contractSigningB,
    developerInformation,
    electronicFile
  },
  data() {
    return {
      //获取当前页面索引 (1.新增 2.编辑 3.详情)
      pageIndex: this.$route.query.index || 1,
      //若是编辑、详情界面则获取合同id
      dealId: this.$route.query.dealId || '',
      params: {}, //参数
      editParams:{},//编辑参数
      basicMessageData:{},//初始化BasicMessage数据
      contractSigningBData:{},//初始化contractSigningBData数据
      developerInformationData:{},//初始化developerInformationData数据
      electronicFileData:{},//初始化electronicFileData数据
    };
  },
  created(){
    console.log(this.pageIndex,this.dealId,'hhhhhhhh');
    //判断当前所处页面,若是编辑、详情界面则获取详情数据
    if( this.pageIndex == 2 || this.pageIndex == 3){
            // this.title = "编辑-公司资料"
            this.initData();
        }
  },
  methods: {
    //若是编辑或详情页面即初始化数据
    initData() {
      console.log(this.dealId,'合同id');
      let params={
                dealId:this.dealId
            };
      new GetContractInfoDetailsList(params)
        .send()
        .then(res => {  
          // if(res.code!=200){
          //   this.isLoad=false
          //   return
          // }
          this.editParams = res;
          console.log(res,'初始化总数据');

          this.isLoad = false;
        })
        .catch(res => {
          this.isLoad = false;
          console.log(res);
          this.$erpCommon.toast(
            res.errMsg || "服务器开小差了,请稍后再试",
          );
        });
    },
    //提交表单
    save() {
      this.params = {};
      this.params.dealType=2//1 代理合同 2分销合同",
      this.params.agencyBusiness="";
      this.params.agencyScope="";
      this.params.agentName="";
      this.params.commissionStandard=""; 
      this.params.dealId=this.dealId;
      this.params.dealStatus="";
      this.params.dealType="";
      this.params.developerName="";
      this.params.distributionCompanyName="";
      this.params.eCommerceAmount="";
      this.params.instructionManual="";
      this.params.dealEnclosureList = [];
      this.params.dataSheetList = [];
      this.$refs.getBasic.basicChange();
      this.$refs.getSigning.sendSigning();
      this.$refs.getDevelop.sendDevelopment();
      this.$refs.getElectronic.sendElectronicFile();

      this.submit();
    },
    basicMessage(val) {
      delete val.data.stamped;
      delete val.data.necessaryInformation;
      //处理推广数据
      for(let item of val.data.promotionScopeList){
        delete item.check;
        delete item.contractAgencyPeriodBegin;
        delete item.contractAgencyPeriodEnd;
        delete item.developerName;
        delete item.orgId;
        delete item.orgName;
        delete item.settlementMethod;
        delete item.userId;
        delete item.userMobile;
        delete item.userName;
      }
      this.params.dataSheetList = [...val.data.dataSheetList];
      Object.assign(this.params, val.data);
      console.log(val.data,'one处理之后基本信息');
    },
    getSigning(val) {
      delete val.data.brokerageSchedule;
      delete val.data.forbid;
      delete val.data.meilianPrincipal;
      delete val.data.meilianPrincipalId;
      delete val.data.meilianPrincipalMobile;
      delete val.data.meilianPrincipalOri;
      delete val.data.meilianPrincipalOriId;
      delete val.data.specialInvoice;
      delete val.data.permit;
      if(val.data.sheetList && val.data.sheetList.length>0) this.params.dataSheetList.push(...val.data.sheetList);
      if(val.data.ohter &&val.data.ohter.length>0) this.params.dataSheetList.push(...val.data.ohter);
      delete val.data.sheetList;
      delete val.data.other;
      Object.assign(this.params, val.data);
      console.log(val.data,'two处理之后基本信息');
    },
    getDevelop(val) {
      if(val.data.enclosureList &&val.data.enclosureList.length>0) this.params.dealEnclosureList.push(...val.data.enclosureList);
       if(val.data.sheetList &&val.data.sheetList.length>0) this.params.dataSheetList.push(...val.data.sheetList);
      this.params.missingReason = val.data.missingReason || '';
      // Object.assign(this.params, val.data.missingReason);
      console.log(val.data,'three处理之后基本信息');
    },
    getElectronic(val) {
      // this.params.dealEnclosureList=[...val.data.enclosureList];
      if(val.data.enclosureList &&val.data.enclosureList.length>0) this.params.dealEnclosureList.push(...val.data.enclosureList);
      this.params.instructionManual = val.data.instructionManual || '';
      this.params.electronicAccessories = val.data.electronicAccessories ;
      // Object.assign(this.params, val.data.instructionManual);
      console.log(this.params,'eeeeeeeeeeeee');
      console.log(val.data,'four处理之后基本信息');
    },
    submit() {
       //检查元素
      if(!this.f_getInspectParameterValue(this.params)) return ;

      console.log(this.params, "提交的参数");
      new getAddDistribution(this.params)
        .send()
        .then(res => {
          // this.$erpCommon.toast('提交成功');
          this.$router.go(-1)
        })
        .catch(res => {
          this.isLoad = false;
          console.log(res);
          this.$erpCommon.toast(
            res.errMsg || "服务器开小差了,请稍后再试",
          );
        });
    },
     //检查元素
    f_getInspectParameterValue(el){
        // const el = this.parameter;
        console.log(el,'eeeeeeeeeee');
        if(!el.dealName){
            this.$erpCommon.toast("合同名称不能为空",'error');
            return false;
        }
        if(el.whetherStamped === ''){
            this.$erpCommon.toast("请选择是否盖章",'error'); 
            return false;
        }
        //检索选择了法人章，判断备注是否填写
       if(el.stampType.indexOf('3') != -1){
         if(el.corporateChapterRemarks ==''){
           this.$erpCommon.toast("法人章备注不能为空",'error');
           return;
         }
       }
        if(el.legalFollowersMobile !=''){
          if(!this.judgeTel(el.legalFollowersMobile,'法务跟进人')) return false;
        }
         //判断美联负责人是否为空
        if(el.personInChargeList.length<=0){
          this.$erpCommon.toast("美联负责人不能为空",'error');
          return false;
        }
        for(let info of el.personInChargeList){
          if(info.principalName ==''){
          this.$erpCommon.toast("美联负责人不能为空",'error');
           return false;
            }else if(!this.judgeTel(info.principalMobile,'美联负责人')){
              return false
            }
        }
         if(el.partyADockingPersonMobile !=''){
           if(!this.judgeTel(el.partyADockingPersonMobile,'对接人')) return false;
        }
         if(el.financialOfficerMobile !=''){
           if(!this.judgeTel(el.financialOfficerMobile,'财务人员')) return false;
        }

         if(!el.agencyTermType){
            this.$erpCommon.toast("请选择分销期限类型",'error');
            return false;
        }else if(el.agencyTermType ==1){
          if(el.agencyTermStartStr == '' || el.agencyTermEndStr == ''){
            this.$erpCommon.toast("请选择分期期限时间",'error');
               return false
          }
        }

        return true
    },
    judgeTel(val,tip){
      if(val.length != 11){
          this.$erpCommon.toast(tip+"电话号码不正确",'error');
          return false
      }
      if(!(/^[0-9]+$/.test(val)) ){
          this.$erpCommon.toast(tip+"电话号码不正确",'error');
          return false
      }
      if( !(/^1[3456789]\d{9}$/.test(val)) ){
          this.$erpCommon.toast(tip+"电话号码不正确",'error');
          return false
      }else{
        return true;
      }
    },
    //返回列表
    cancel(){
    this.$router.go(-1)
    }
  }
};
</script>
<style scoped>
  /*修改滚动条样式*/
  div::-webkit-scrollbar {
    width: 0.08rem;
    height: 0.08rem; 
  }
</style>
<style lang="less"  scoped>
.top_t {
  width: 100%;
  height: 0.41rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.01rem solid #dddddd;
  .left {
    display: flex;
    align-items: center;
    height: 0.41rem;
    & > div {
      height: 0.41rem;
      line-height: 0.41rem;
      text-align: center;
      color: #666666;
      font-size: 0.14rem;
      margin-left: 0.35rem;
      cursor: pointer;
    }
  }
  & > .right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > div {
      width: 0.75rem;
      height: 0.3rem;
      line-height: 0.3rem;
      text-align: center;
      font-size: 0.12rem;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
      &:nth-child(1) {
        color: #ffffff;
        background-image: url("../../../assets/images/projectAgentInfo/common/blue_normal.png");
        margin-right: 0.05rem;
        &:hover {
          background-image: url("../../../assets/images/projectAgentInfo/common/blue_focus.png");
        }
      }
      &:nth-child(2) {
        color: #666666;
        background-image: url("../../../assets/images/projectAgentInfo/common/white_normal.png");
        margin-right: 0.2rem;
      }
    }
  }
}
.middle_content {
  padding-top: 0.2rem;
  width: 10.2rem;
  margin: auto;
}
.content {
  width: 100%;
  padding-top: 0.2rem;
}
</style>