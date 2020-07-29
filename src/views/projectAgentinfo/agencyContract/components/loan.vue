<template>
  <div class="g_biggest">
    <div class="guidang">
      <div class="u_topTitle">{{title}}</div>
      <div class="agent_input">
        <div>请输入申请编号/归档编号：</div>
        <el-input v-model="textarea"></el-input>
      </div>
      <div class="gui_time">
        <el-radio v-model="params.giveBackType" :label="1" @change="inputTime">预计归还</el-radio>
        <el-date-picker v-model="params.giveBackTime" type="date" placeholder="请选择归还日期"></el-date-picker>
        <el-radio v-model="params.giveBackType" :label="2">永不归还</el-radio>
        <el-radio v-model="params.giveBackType" :label="3">待质证后归还</el-radio>
      </div>
      <div class="shuoming">
        <div class="shuo_msg">
          <div class="shuo_icon"></div>
          <div
            class="shuo_wenzi"
          >如未及时归还所借文件，则借用人及部门主管将各被罚款500元； 如文件被遗失，毁损等，除罚款外，借用人及部门主管、区域总监还将被给予警告、降职、辞退处分； 如给公司造成经济损失，还将按照《前线风险防范管理规定》处理</div>
        </div>
        <div class="agree">
          <el-checkbox v-model="check">我同意</el-checkbox>
        </div>
      </div>
      <div class="u_btnSave" @click="saveData">确认</div>
      <!--右上角缩小关闭按钮-->
      <div class="g_box f_r_b">
        <div @click="closeView" class="u_close f_r_s"></div>
      </div>
      <!-- 列表 -->
      <div class="guidang_list">
        <div class="guidang_over_a">
          <div class="guidang_list_title">
            <div class="g_item_select"></div>
            <div class="g_item_number">申请编号</div>
            <div class="g_item_name">附件名称</div>
            <div class="g_item_agent">代理商</div>
            <div class="g_item_status">审批状态</div> 
            <div class="g_item_bianhao">归档编号</div>
            <div class="g_item_term">合同代理期</div>
          </div>
        </div>
        <div class="guidang_over_b">
          <div class="guidang_list_item" v-for="(item,index) in fuJianList" :key="index">
            <div class="g_item_select">
              <el-checkbox v-model="item.check"></el-checkbox>
            </div>
            <div class="g_item_number">{{item.applicationNo}}</div>
            <div class="g_item_name">{{item.enclosureName}}</div>
            <div class="g_item_agent">{{item.agentName}}</div>
            <div class="g_item_status">{{approvalStatusList[item.approvalStatus]}}</div>
            <div class="g_item_bianhao">{{item.archiveNumber}}</div>
            <div class="g_item_term">{{item.agencyTermStart}}至{{item.agencyTermEnd}}</div>
          </div>
        </div>
      </div>
      <div class="g_bottom">
        <div :class="params.giveBackType!=1?'must':'nomust'">外借原因：</div>
        <el-input v-model="params.lendoutReason"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
import {getClerkManageContractList} from "../../../../net/projectAgentinfo/distributionContract/getClerkManageContractList.js"
import {getLendoutContract} from "../../../../net/projectAgentinfo/distributionContract/addLendoutContract.js"
import {ErpCommon} from '../../../../utils/ErpCommon'
export default {
  data() {
    return {
      verified:true,//验证通过
      fuJianList:[],
      textarea: "",
      backTime: "",
      check: false,
      enclosureIdList:[],
      approvalStatusList: ["未审批", "审批中", "已驳回", "已审批", "已作废"],
      params: {
        dealId: "", // "(int32)合同id",
        enclosureIds: "", // "(string)多个附件id用英文逗号分隔，至少选一个附件",
        giveBackTime: "", // "(date-time)归还日期",
        giveBackType: 1, // "(int32)归还方式：1=预计归还（需传归还日期）、2=永不归还、3=待质证后归还",
        lendoutReason: "" // "(string)外借原因"
      }
    };
  },
  props: {
    dealId: {
      type: Number |String,
      default() {
        return "";
      }
    },
    title: {
      type: String || Number,
      default() {
        return "";
      }
    },
    reasonTilte: {
      type: String || Number,
      default() {
        return "";
      }
    }
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      let request={
        dealId:this.dealId
      }
      new getClerkManageContractList(request)
      .send()
      .then(res=>{
        console.log(res)
        this.fuJianList=[...res.list];
      })
      .catch(res=>{
         new ErpCommon().toast("服务器开小差了,请稍后再试");
      })
    },
     //保存
    saveData() {
      this.fuJianList.forEach(item => {
        if(item.check==true){
          this.enclosureIdList.push(item.enclosureId)
        }
      });
      this.params.enclosureIds=this.enclosureIdList.join(',')
      this.params.dealId=this.dealId
      this.checked()
      if(this.verified==false) return
      console.error(this.params,"提交的参数！")
      new getLendoutContract(this.params)
      .send()
      .then(res=>{
      })
      .catch(res=>{
            new ErpCommon().toast("服务器开小差了,请稍后再试");
      })
      this.$emit("closeView", true);
    },
    //必填验证
    checked(){
      this.verified=true
      if(this.params.giveBackType==1&&this.params.giveBackTime==""){
        this.verified=false
        new ErpCommon().toast("请输入归还日期")
        return
      }else if(!this.check){
        this.verified=false
        new ErpCommon().toast("请勾选我同意")
        return
      }
      else if(this.params.enclosureIds==""){
        this.verified=false
        new ErpCommon().toast("请选择附件")
        return
      }else if(this.params.giveBackType !=1 && this.params.lendoutReason == ''){
        this.verified=false
        new ErpCommon().toast("请填写外借原因")
        return
      }
    },
    //归还方式改变清空时间
    inputTime(){
      this.params.giveBackTime=""
    },
    //关闭弹窗
    closeView() {
      setTimeout(() => {
        this.$emit("closeView", true);
      }, 200);
    }
  }
};
</script>
<style lang="less" scoped>
/deep/ .el-radio {
  display: flex;
  align-items: center;
}
/deep/ .el-radio__input {
  display: flex;
  height: 0.14rem;
}
/deep/ .el-input__inner {
  line-height: normal;
}
/deep/ .el-textarea__inner {
  height: 100%;
}
/deep/ .el-radio {
  margin-right: 0.2rem;
}
.agent_input /deep/ .el-input__inner {
  width: 1.7rem;
  height: 0.26rem;
}
.agent_input /deep/ .el-input--small {
  width: 1.7rem;
  height: 0.26rem;
}
.agent_input /deep/ .el-input__icon {
  height: 0.26rem;
  line-height: 1;
}
.g_item_beizhu /deep/ .el-input--small {
  width: 1.51rem;
  height: 0.26rem;
}
.g_item_beizhu /deep/ .el-input__inner {
  width: 1.51rem;
  height: 0.26rem;
  line-height: 0.26rem;
}
.gui_time /deep/ .el-input__inner {
  width: 1.7rem;
  height: 0.26rem;
}
.gui_time /deep/ .el-input--small {
  width: 1.7rem;
  height: 0.26rem;
  margin-right: 0.2rem;
}
.gui_time /deep/ .el-radio-group {
  display: block;
}
.gui_time /deep/ .el-input__icon {
  height: 0.26rem;
  line-height: 0.27rem;
}
.gui_time {
  height: 0.26rem;
  margin-top: 0.16rem;
  display: flex;
  align-items: center;
  /deep/ .el-radio__label {
    font-size: 0.12rem;
  }
}
.g_bottom /deep/ .el-input__inner {
  width: 5.56rem;
  height: 0.26rem;
}
.g_bottom /deep/ .el-input--small {
  width: 5.56rem;
  height: 0.26rem;
  margin-right: 0.2rem;
}
.agree /deep/ .el-checkbox {
  display: block;
  margin-left: 0.12rem;
}
.agree {
  height: 0.17rem;
  /deep/ .el-checkbox__input {
    height: 0.21rem;
  }
}
.u_btnSave {
  max-width: max-content;
  max-height: max-content;
  position: absolute;
  right: 0.2rem;
  bottom: 0.1rem;
  cursor: pointer;
  border-radius: 0.03rem;
  padding: 0.07rem 0.18rem;
  font-family: SimSun;
  font-size: 0.12rem;
  letter-spacing: 0.01rem;
  white-space: nowrap;
  color: #ffffff;
  background-image: linear-gradient(0deg, #449aff 0%, #50a7ff 100%),
    linear-gradient(#259cf3, #259cf3);
  background-blend-mode: normal, normal;
  border: solid 0.01rem #3d81ff;
}
.u_close {
  width: 0.33rem;
  height: 0.27rem;
  cursor: pointer;
  background-image: url("../../../../assets/images/projectAgentInfo/common/close_200.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.12rem auto;
  box-sizing: border-box;
}
.u_close:hover {
  background-color: #f05656;
  background-image: url("../../../../assets/images/projectAgentInfo/common/close_200_hover.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.12rem auto;
}
.g_box {
  position: absolute;
  top: 0;
  right: 0;
  height: 0.27rem;
  align-items: center;
  cursor: pointer;
}
.g_biggest {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
.guidang {
  width: 8.66rem;
  height: 4.88rem;
  background-color: #eff4f9;
  box-shadow: 0rem 0.03rem 0.05rem 0rem rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.19rem 0.2rem;
  box-sizing: border-box;
  position: relative;
}
.u_topTitle {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.14rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #444444;
  font-weight: bold;
  margin-bottom: 0.08rem;
}
.g_photographerName {
  height: 0.3rem;
  font-size: 0.23rem;
  color: #666666;
  display: flex;
  align-items: center;
}
.u_title {
  width: 0.6rem;
  font-family: SimSun;
  font-size: 0.12rem;
  color: #444444;
  height: 0.3rem;
  line-height: 0.27rem;
}
.select {
  width: 2.3rem;
  height: 0.3rem;
  flex-shrink: 0;
  box-sizing: border-box;
}
.title {
  width: 0.55rem;
  font-family: SimSun;
  font-size: 0.12rem;
  color: #444444;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  white-space: nowrap;
  height: 100%;
}
.color {
  color: #ff5a1f;
  font-size: 0.12rem;
  width: 0.14rem;
  text-align: center;
}
.icons {
  display: flex;
  align-items: center;
}

.must,.nomust {
  margin-right: 0.15rem;
}
.must::after {
  content: "* ";
  width: 0.02rem;
  height: 0.06rem;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff5a1f;
}
.nomust::after{
  content: "* ";
  width: 0.02rem;
  height: 0.06rem;
  visibility: hidden;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff5a1f;
}
.loan {
  width: 100%;
  height: 0.38rem;
  display: flex;
  align-items: center;
}
.loan_item {
  width: 1.7rem;
  margin-right: 0.23rem;
  font-family: MicrosoftYaHei;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #666666;
  display: flex;
  align-items: center;
}
.loan_person {
  width: 0.49rem;
  display: flex;
  justify-content: space-between;
}
.loan_msg {
  margin-left: 0.05rem;
}
.loan_icon {
  margin-left: 0.02rem;
}
.agent_input {
  width: 100%;
  height: 0.26rem;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.26rem;
  letter-spacing: 0rem;
  color: #444444;
  display: flex;
  align-items: center;
}
.guidang_list {
  width: 100%;
  height: 2.18rem;
  margin-top: 0.09rem;
  border-radius: 0.05rem;
  overflow: auto;
  overflow-y: hidden;
  background-color: #ffffff;
}
.guidang_over_a {
  width: 100%;
  height: 0.35rem;
}
.guidang_over_b {
  width: 8.26rem;
  height: 1.83rem;
  overflow: auto;
  overflow-x: hidden;
}
.guidang_list_title {
  width: 8.26rem;
  height: 0.35rem;
  overflow: hidden;
  background-color: #ebeef0;
  border-top-left-radius: 0.05rem;
  border-top-right-radius: 0.05rem;
  display: flex;
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.35rem;
  letter-spacing: 0rem;
  color: #888888;
}
.guidang_list_item {
  width: 8.26rem;
  height: 0.37rem;
  background-color: #ffffff;
  margin-bottom: 0.03rem;
  font-size: 0.12rem;
  overflow: hidden;
  display: flex;
  font-family: MicrosoftYaHei;
  font-size: 0.14rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.37rem;
  letter-spacing: 0rem;
  color: #444444;
  border-bottom: 0.03rem solid #eff4f9;
}
.g_item_select {
  width: 0.39rem;
  padding-left: 0.12rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.g_item_number {
  width: 1.44rem;
}
.g_item_name {
  width: 1.21rem;
}
.g_item_agent {
  width: 1.03rem;
}
.g_item_status {
  width: 0.77rem;
}
.g_item_bianhao {
  width: 1.51rem;
}
.g_item_term {
  width: 1.89rem;
}
.g_item_beizhu {
  width: 1.6rem;
}
.g_item_beizhu_t {
  padding-left: 0.02rem;
  box-sizing: border-box;
}
.g_item_fujian {
  min-width: 1.82rem;
  font-family: MicrosoftYaHei;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #259cf3;
  display: flex;
  align-items: center;
}
.fujian_icon {
  width: 0.11rem;
  height: 0.11rem;
  background-image: url("../../../../assets/images/projectAgentInfo/agentContract/fjHover_200.png");
  background-repeat: no-repeat;
  background-size: contain;
}
.g_bottom {
  display: flex;
  height: 0.3rem;
  line-height: 0.5rem;
  font-family: MicrosoftYaHei;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.5rem;
  letter-spacing: 0rem;
  color: #444444;
}
.g_icon {
  margin-left: 0.03rem;
}
.shuoming {
  width: 8.24rem;
  height: 0.81rem;
  border: dashed 0.01rem #cfcfcf;
  margin-top: 0.13rem;
}
.shuo_msg {
  height: 0.54rem;
  display: flex;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #666666;
}
.shuo_icon {
  width: 0.14rem;
  height: 0.14rem;
  margin-left: 0.12rem;
  margin-top: 0.1rem;
  background-image: url("../../../../assets/images/projectAgentInfo/agentContract/tips.png");
  background-repeat: no-repeat;
  background-size: contain;
}
.shuo_wenzi {
  width: 7.79rem;
  height: 0.32rem;
  word-wrap: break-word;
  margin-left: 0.07rem;
  margin-top: 0.09rem;
}
</style>