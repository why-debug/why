<template>
  <div class="g_biggest">
    <div class="guidang">
      <div class="u_topTitle">{{title}}</div>
      <div class="g_photographerName">
        <div class="u_title must">我的意见:</div>
          <el-radio  v-model="params.isAgree" :label="1"  @change="deleteSuggest">同意</el-radio>
          <el-radio  v-model="params.isAgree" :label="0"  @change="deleteSuggest">不同意</el-radio>
      </div>
      <el-input placeholder="请输入内容" v-model="params.contractRemark" resize="none" show-word-limit></el-input>
      <div class="loan">
        <div class="loan_item">
          <div class="loan_person">
            <span>外</span>
            <span>借</span>
            <span>人</span>
          </div>
          <div>:</div>
          <div class="loan_msg">发货方</div>
        </div>
        <div class="loan_item">
          <div>外借组织</div>
          <div class="loan_icon">:</div>
          <div class="loan_msg">死UGF好死u管</div>
        </div>
        <div class="loan_item">
          <div>外借时间</div>
          <div class="loan_icon">:</div>
          <div class="loan_msg">2019-20-20</div>
        </div>
      </div>
      <div class="agent_input">
        <div>实际归还日期：</div>
        <el-date-picker v-model="params.actualDate" type="date" placeholder="选择日期"></el-date-picker>
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
            <div class="g_item_beizhu_t g_item_beizhu">归档备注</div>
            <div class="g_item_fujian"></div>
          </div>
        </div>
        <div class="guidang_over_b">
          <div class="guidang_list_item">
            <div class="g_item_select">
              <el-checkbox v-model="check"></el-checkbox>
            </div>
            <div class="g_item_number">申请编号</div>
            <div class="g_item_name">合同名称</div>
            <div class="g_item_agent">代理商</div>
            <div class="g_item_status">审批状态</div>
            <div class="g_item_bianhao">归档编号</div>
            <div class="g_item_term">合同代理期</div>
            <div class="g_item_beizhu">
              <el-input placeholder v-model="textarea" show-word-limit></el-input>
            </div>
            <div class="g_item_fujian">
              <div class="fujian_icon"></div>
              <div>上传附件</div>
            </div>
          </div>
          <div class="guidang_list_item">
            <div class="g_item_select">
              <el-checkbox v-model="check"></el-checkbox>
            </div>
            <div class="g_item_number">申请编号</div>
            <div class="g_item_name">合同名称</div>
            <div class="g_item_agent">代理商</div>
            <div class="g_item_status">审批状态</div>
            <div class="g_item_bianhao">归档编号</div>
            <div class="g_item_term">合同代理期</div>
            <div class="g_item_beizhu">
              <el-input placeholder v-model="textarea" show-word-limit></el-input>
            </div>
            <div class="g_item_fujian">
              <div class="fujian_icon"></div>
              <div>上传附件</div>
            </div>
          </div>
          <div class="guidang_list_item">
            <div class="g_item_select">
              <el-checkbox v-model="check"></el-checkbox>
            </div>
            <div class="g_item_number">申请编号</div>
            <div class="g_item_name">合同名称</div>
            <div class="g_item_agent">代理商</div>
            <div class="g_item_status">审批状态</div>
            <div class="g_item_bianhao">归档编号</div>
            <div class="g_item_term">合同代理期</div>
            <div class="g_item_beizhu">
              <el-input placeholder v-model="textarea" show-word-limit></el-input>
            </div>
            <div class="g_item_fujian">
              <div class="fujian_icon"></div>
              <div>上传附件</div>
            </div>
          </div>
        </div>
      </div>
      <div class="g_bottom">
        <div>外借原因：</div>
        <div>补业主签字</div>
      </div>
    </div>
  </div>
</template>
<script>
import {getFileReturnScope} from "../../../../net/projectAgentinfo/distributionContract/fileReturn.js"
import {getFileEnclosure} from "../../../../net/projectAgentinfo/distributionContract/getFileEnclosures.js"
import {ErpCommon} from '../../../../utils/ErpCommon'
export default {
  data() {
    return {
      verified:true,//验证通过
      textarea: "",
      backTime: "",
      check: false,
      params: {
        actualDate: "",//"(date-time)选择的实际归还日期",
        contractId:"" ,//"(int32)要归档的合同ID",
        contractRemark: "",//"(string)归档备注  若选择了  不同意  的话则必填",
        enclosureParams: [
          {
            enclosureId:"",// "(int32)要归档的附件ID",
            fileRemark:"",// "(string)该附件的归档备注"
          }
        ],
        isAgree:1//"(byte)我的意见： 0：不同意  1：同意"
      }
    };
  },
  props: {
    dealId: {
      type: Number,
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
    //数据初始化
    init(){
      let request={
        contractId:this.dealId
      }
      new getFileEnclosure(request)
      .send()
      .then(res=>{
        console.log(res)
      })
      .catch(res=>{
         alert("服务器开小差了,请稍后再试");
      })
    },
    //保存
    saveData() {
      this.params.contractId=this.dealId
      this.checked()
      if(this.verified==false) return
      console.error(this.params,"提交的参数！")
      new getFileReturnScope(this.params)
      .send()
      .then(res=>{
      })
      .catch(res=>{
            alert("服务器开小差了,请稍后再试");
      })
      this.$emit("closeView", true);
    },
    //必填验证
    checked(){
      this.verified=true
      if(this.params.isAgree==0&&this.params.contractRemark==""){
        this.verified=false
        new ErpCommon().toast("请输入我的意见")
        return
      }else if(this.params.actualDate === ''){
        this.verified=false
        new ErpCommon().toast("请选择归档日期")
        return
      }
      
    },
    //选择同意置空意见
    // deleteSuggest(){
    //   console.log(this.params.isAgree)
    //   if(this.params.isAgree==1){
    //     this.params.contractRemark==""
    //   }
    // },
    //关闭弹窗
    closeView() {
      setTimeout(() => {
        this.$emit("closeView", true);
      }, 200);
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
<style lang="less" scoped>
/deep/ .el-textarea__inner {
  height: 100%;
}
/deep/ .el-radio {
  margin-right: 0.2rem;
}
.agent_input /deep/ .el-input__inner {
  width: 1.7rem;
  height: 0.26rem;
  line-height: 0.26rem;
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
  padding: 0.19rem 0.3rem;
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
  width: 0.7rem;
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

.must {
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
  height: 2.49rem;
  margin-top: 0.15rem;
  border-radius: 0.05rem;
  overflow: auto;
  overflow-y: hidden;
}
.guidang_over_a {
  width: 100%;
  height: 0.35rem;
}
.guidang_over_b {
  width: 12.13rem;
  height: 2.14rem;
  overflow: auto;
  overflow-x: hidden;
  background-color: #ffffff;
}
.guidang_list_title {
  width: 12.13rem;
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
  width: 12.13rem;
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
  width: 0.4rem;
  padding-left: 0.12rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.g_item_number {
  width: 1.42rem;
}
.g_item_name {
  width: 1.07rem;
}
.g_item_agent {
  width: 1.35rem;
}
.g_item_status {
  width: 0.71rem;
}
.g_item_bianhao {
  width: 1.39rem;
}
.g_item_term {
  width: 2.33rem;
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
  width: 0.1rem;
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
</style>