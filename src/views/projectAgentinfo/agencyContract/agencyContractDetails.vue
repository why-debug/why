<template>
  <div>
    <!-- <div class="top_t">
      <div class="left">
        <div>项目代理合同</div>
      </div>
      <div class="right">
        <div>保存</div>
        <div>取消</div>
      </div>
    </div> -->
    <div class="middle_content">
        <BasicMessage></BasicMessage>
        <contractSigningA></contractSigningA>
        <contractSigningB></contractSigningB>
        <developerInformation></developerInformation>
        <electronicFile></electronicFile>
    </div>
  </div>
</template>
<script>
import BasicMessage from "./agencyContractDetails/basicMessage";
import contractSigningA from "./agencyContractDetails/contractSigningA";
import contractSigningB from "./agencyContractDetails/contractSigningB";
import developerInformation from "./agencyContractDetails/developerInformation";
import electronicFile from "./agencyContractDetails/electronicFile";
export default {
    components:{
        BasicMessage,
        contractSigningA,
        contractSigningB,
        developerInformation,
        electronicFile
    },
    data(){
        return {

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
  width: 10.2rem;
  position: absolute;
  left:0;
  right: 0;
  margin: auto;
}
</style>