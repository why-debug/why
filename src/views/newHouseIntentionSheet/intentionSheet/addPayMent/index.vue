<template>
  <div class="add">
    <div class="top_t">
      <div class="left">
        <div>新增付款单</div>
      </div>
      <div class="right">
        <div @click="save" >提交</div>
        <div @click="cancel" >取消</div>
      </div>
    </div>
    <div class="content">
      <div class="middle_content">
        <BasicMessage ></BasicMessage>
        <!-- <contractSignF></contractSignF> -->
      </div>
    </div>
  </div>
</template>
<script>
import BasicMessage from "./components/basicMessage";
// import contractSignF from "./components/contractSignF";
import {ErpCommon} from '../../../../utils/ErpCommon'
import { GetContractInfoDetailsList } from "../../../../net/projectAgentinfo/agencyContract/InitContractInfoDetails";
export default {
  components: {
    BasicMessage,
    // contractSignF,
  },
  data() {
    return {

    };
  },
  methods:{
    //保存提交数据
    save(){
      
    },
    //返回主界面
    cancel(){
      this.$router.go(-1);
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
/deep/   input::-webkit-outer-spin-button,
  /deep/   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
}
  /deep/   input[type="number"]{
      -moz-appearance: textfield;
  }
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
        background-image: url("../../../../assets/images/projectAgentInfo/common/blue_normal.png");
        margin-right: 0.05rem;
        &:hover {
          background-image: url("../../../../assets/images/projectAgentInfo/common/blue_focus.png");
        }
      }
      &:nth-child(2) {
        color: #666666;
        background-image: url("../../../../assets/images/projectAgentInfo/common/white_normal.png");
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