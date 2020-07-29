<template>
  <div class="g_biggest">
    <div class="guidang">
      <div class="top_search">
        <div class="u_topTitle">选择推广名</div>
        <el-select v-model="params.nameType">
          <el-option
            v-for="item in propertyTypeList"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <searchInput :placeholder="`请输入名称`" @Kwd="inputName"></searchInput>
        <div class="inquire" @click="inquire">查询</div>
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
            <div class="select"></div>
            <div class="g_item_number">推广名</div>
            <div class="g_item_name">注册名</div>
            <div class="g_item_agent">开发商</div>
            <div class="g_item_status">代理商</div>
            <div class="g_item_bianhao">项目负责人</div>
            <div class="g_item_term">合同代理期</div>
            <div class="g_item_yongjin">佣金结算方式</div>
            <div class="g_item_guidang">合同归档编号</div>
          </div>
        </div>
        <div class="guidang_over_b" v-if="list && list.length>0">
          <div class="guidang_list_item" v-for="(item,index) in list" :key="index" >
            <div class="select">
              <el-checkbox v-model="item.check" @change="selectProject(item,index)"></el-checkbox>
            </div>
            <div class="g_item_number yincang">{{item.buildName}}</div>
            <div class="g_item_name yincang">{{item.mlLoginName}}</div>
            <div class="g_item_agent yincang">{{item.developerName}}</div>
            <div class="g_item_status yincang">{{item.agentName}}</div>
            <div class="g_item_bianhao yincang">{{item.userName}}</div>
            <div class="g_item_term yincang">{{item.contractAgencyPeriodBegin}}至{{item.contractAgencyPeriodEnd}}</div>
            <div class="g_item_yongjin yincang">{{item.settlementMethod}}</div>
            <div class="g_item_guidang yincang">{{item.archiveNumber}}</div>
          </div>
        </div>
        <div  v-if="noData">
          <div class="g_noData" v-if="noData">
                <img src="../../../assets/images/projectAgentInfo/contract/nodate.png" alt="">
                <div class="g_text">没有相关数据哦!</div>
            </div>
         </div>
   
       <div  v-if="isLoad">
            <div class="g_isLoading" v-if="isLoad">
                <img src="../../../assets/images/projectAgentInfo/contract/loading.gif" alt="">
            </div>
         </div>
   </div>
    </div>
  </div>
</template>
<script>
import searchInput from "./searchInput";
import { getPromotionScope } from "../../../net/projectAgentinfo/distributionContract/projectPromotionScopeList.js";
export default {
  components: {
    searchInput
  },
  created() {
    this.init();
  },
  data() {
    return {
      isLoad:false,//加载动画
      noData:false,//是否有数据
      // 1推广 2注册 3开发商 4代理商"
      propertyTypeList: [
        { label: "推广名", value: 1 },
        { label: "注册名", value: 2 },
        { label: "开发商", value: 3 },
        { label: "代理商", value: 4 }
      ],
      name: "",
      textarea: "",
      backTime: "",
      check: false,
      list: [],
      promotionScopeList: [],
      params: {
        name: "", //(string)名称,
        nameType: "" //(int32)名称类型 1推广 2注册 3开发商 4代理商
      }
    };
  },
  props: {
    operateId: {
      type: Array,
      default() {
        return [];
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
  methods: {
    init() {
      this.isLoad = true;
      new getPromotionScope(this.params)
        .send()
        .then(res => {
          this.isLoad = false;
          console.log(res);
          this.list = [...res.list];
          if (this.list.length == 0) {
            this.noData = true;
          }
          this.noData = false;
        })
        .catch(res => {
          this.isLoad = false;
          console.log(res);
          alert(res.errMsg || "服务器开小差了,请稍后再试");
        });
    },
    //模糊检索
    inquire() {
      this.init();
    },
    //保存
    saveData() {
         this.promotionScopeList=[]
        this.list.forEach(item=>{
            if(item.check==true){
                this.promotionScopeList.push(item)
            }
        })
      let val = {
        status: false,
        list: this.promotionScopeList
      };
      this.$emit("saveView", val);
    },
     //选中合同
    selectProject(item, index) {
      //判断选择项目是否归档
      if(item.archiveNumber) {
        this.$erpCommon.toast( "此合同已归档，不允许再次申请合同");
        item.check = false;
        return;
      }
      let selectList = [];
      this.list.forEach((key, i) => {
        if ( key.check === true) {
         selectList.push(key);
        }
      });
      //若选中的长度超过12则返回
      if(selectList.length >12){
        this.$erpCommon.toast( "选择项目最多不能超过12个");
        item.check = false;
        return;
      } 
      //判断多选是否满足条件（不同项目同一代理商才可多选）
      if(selectList.length<=1){
        return;
      }else{
        if(selectList[0].agentName != item.agentName){
          this.$erpCommon.toast( "不同项目同一代理商才可多选");
          item.check = false;
          return
        }
      } 
      // for(let key of selectList){
      //   if(key.agentName != item.agentName){
      //     this.$erpCommon.toast( "不同项目同一代理商才可多选");
      //     item.check = false;
      //     return
      //   }
      // }
    },
    //关闭弹窗
    closeView() {
      setTimeout(() => {
        this.$emit("closeView", false);
      }, 200);
    },
    //输入的名字
    inputName(val) {
      console.log(val);
      this.params.name = val;
    },
  }
};
</script>
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
.top_search {
  width: 100%;
  height: 0.26rem;
  display: flex;
  align-items: center;
  /deep/ .el-select {
    margin-right: 0.21rem;
  }
  /deep/ .el-input__inner {
    width: 1.3rem;
    height: 0.26rem;
    line-height: 0.26rem;
  }
  /deep/.el-input--small .el-input__icon {
    line-height: 0.26rem;
  }
  /deep/ .base-input-box {
    height: 0.26rem;
  }
  .inquire {
    width: 0.57rem;
    height: 0.26rem;
    background-color: #f4f4f4;
    border: solid 0.01rem #cdcdcd;
    box-sizing: border-box;
    text-align: center;
    line-height: 0.26rem;
    cursor: pointer;
    margin-left: 0.2rem;
  }
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
  height: 7.55rem;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center!important;
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
  margin-top: -1.2rem;
}

.u_close {
  width: 0.33rem;
  height: 0.27rem;
  cursor: pointer;
  background-image: url("../../../assets/images/projectAgentInfo/common/close_200.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.12rem auto;
  box-sizing: border-box;
}
.u_close:hover {
  background-color: #f05656;
  background-image: url("../../../assets/images/projectAgentInfo/common/close_200_hover.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 0.12rem auto;
}
.u_topTitle {
  font-family: MicrosoftYaHei-Bold;
  font-size: 0.14rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0rem;
  color: #444444;
  font-weight: bold;
  line-height: 0.26rem;
  margin-right: 0.21rem;
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
  height: 3.83rem;
  margin-top: 0.15rem;
  border-radius: 0.05rem;
  overflow: auto;
  overflow-y: hidden;
}
.guidang_over_a {
  width: 100%;
  height: 0.35rem;
  .select {
    width: 0.43rem;
  }
}
.guidang_over_b {
  width: 8.26rem;
  height: 3.46rem;
  overflow: auto;
  overflow-x: hidden;
  background-color: #ffffff;
  .select {
    width: 0.43rem;
    display: flex;
    justify-content: center;
  }
}
.g_noData{
    width: 100%;
    height: 100%;
    min-width: 8.26rem;
    min-height: 3.46rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .g_text{
    font-size: 0.18rem;
    color: #999999;
    margin-top: 0.1rem;
  }
}
.g_isLoading{
    width: 100%;
    height:100%;
    min-width: 8.26rem;
    min-height: 3.46rem;
    display: flex;
    z-index: 100;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
.yincang {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.g_item_number {
  width: 0.9rem;
}
.g_item_name {
  margin-left: 0.05rem;
  width: 0.9rem;
}
.g_item_agent {
  width: 0.9rem;
  margin-left: 0.05rem;
}
.g_item_status {
  margin-left: 0.05rem;
  width: 0.9rem;
}
.g_item_bianhao {
  margin-left: 0.05rem;
  width: 0.7rem;
}
.g_item_term {
  margin-left: 0.05rem;
  width: 1.5rem;
}
.g_item_yongjin {
  margin-left: 0.05rem;
  width: 0.8rem;
}
.g_item_guidang {
  margin-left: 0.05rem;
  width: 1rem;
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