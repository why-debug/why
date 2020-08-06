<template>
  <div>
    <div class="top_t">
      <div class="left">
        <div>合同审批</div>
      </div>
      <div class="right">
        <div>提交</div>
        <div>取消</div>
      </div>
    </div>
    <div class="middle_content">
        <approvalList></approvalList>
        <toApproval></toApproval>
        <!-- <BasicMessage></BasicMessage>
        <contractSigningA></contractSigningA>
        <contractSigningB></contractSigningB>
        <developerInformation></developerInformation>
        <electronicFile></electronicFile> -->
        <newBasicMessage ref="getBasic" @basicData="basicMessage" :pageIndex="pageIndex"></newBasicMessage>
        <newContractSigningB ref="getSigning" @contractSigning="getSigning" :pageIndex="pageIndex"></newContractSigningB>
        <newDeveloperInformation ref="getDevelop" @developerInfomation="getDevelop" :pageIndex="pageIndex"></newDeveloperInformation>
        <newElectronicFile ref="getElectronic" @electronicFile="getElectronic" :pageIndex="pageIndex"></newElectronicFile>
        </div>
  </div>
</template>
<script>
import approvalList from "./approvalContract/approvalList";
import toApproval from "./approvalContract/toApproval";
import newBasicMessage from "./approvalContract/newBasicMessage";
import newContractSigningB from "./approvalContract/newContractSigningB";
import newDeveloperInformation from "./approvalContract/newDeveloperInformation";
import newElectronicFile from "./approvalContract/newElectronicFile";
export default {
    components:{
        approvalList,
        toApproval,
        newBasicMessage,
        newContractSigningB,
        newDeveloperInformation,
        newElectronicFile,
    },
    data(){
        return {
        //获取当前页面索引 (1.新增 2.编辑 3.详情)
        pageIndex: this.$route.query.index || 1,
        }
    },
     methods: {
    init() {
      new getPromotionScope(this.params)
        .send()
        .then(res => {
          // if(res.code!=200){
          //   this.isLoad=false
          //   return
          // }
          console.log(res);

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
    save() {
      this.params = {};
      this.params.dealType=2//1 代理合同 2分销合同",
      this.params.agencyBusiness="";
      this.params.agencyScope="";
      this.params.agentName="";
      this.params.commissionStandard=""; 
      this.params.dealId="";
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
      console.log(val.data);
      this.params.dataSheetList = [...val.data.dataSheetList];
      Object.assign(this.params, val.data);
    },
    getSigning(val) {
      this.params.dataSheetList = [...val.data.sheetList];
      Object.assign(this.params, val.data);
      console.log(val);
    },
    getDevelop(val) {
      this.params.dealEnclosureList=[...val.data.enclosureList];
      Object.assign(this.params, val.data);
      console.log(val);
    },
    getElectronic(val) {
            this.params.dealEnclosureList=[...val.data.enclosureList];
      Object.assign(this.params, val.data);
      console.log(val);
    },
    submit() {
      console.log(this.params, "提交的参数");
      new getAddDistribution(this.params)
        .send()
        .then(res => {
          alert("保存成功！")
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
    //返回列表
    cancel(){
    this.$router.go(-1)
    }
  }
};
</script>
<style lang="less"  scoped>
.top_t {
  width: 100%;
  height: 0.41rem;
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

.middle_content{
  // width: 10.2rem;
  width: 13rem;
  position: absolute;
  left:0;
  right: 0;
  margin: auto;
}
</style>