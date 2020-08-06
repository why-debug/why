<template>
  <div class="basic">
    <dividingLine :title="`合同签署双方`"></dividingLine>
    <div class="basic_item_i">
      <div class="basic_item_i_title">法务跟进人</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        disabled
        :style="{'width':'1.7rem'}"
        suffix-icon="el-icon-arrow-down"
        v-model="params.legalFollowers"
        placeholder="请选择"
        @click.native="pageIndex ===3?'':selsecPerson(null,1)"
      ></el-input>
      <div class="right_title_a">联系电话</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input 
      :style="{'width':'1.69rem'}" 
      maxlength="11" 
      v-model="params.legalFollowersMobile"
       :disabled="pageIndex ===3"
        @keydown.native="btKeyDown"
          @keyup.native="btKeyDown"
       ></el-input>
    </div>

    <div class="basic_item_i" v-for="(item,index) in params.personInChargeList" :key="index" >
      <div class="basic_item_i_title">美联负责人</div>
       <div class="i-icon">:</div>
      <div class="must"></div>
       <el-input
        disabled
        :style="{'width':'1.7rem'}"
        suffix-icon="el-icon-arrow-down"
        v-model="item.principalName"
        placeholder="请选择"
        @click.native="pageIndex ===3?'':selsecPerson(item,2)"
      ></el-input>

      <div class="right_title_a">联系电话</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input 
      :style="{'width':'1.69rem'}"
       v-model="item.principalMobile" 
       maxlength="11"
      :disabled="pageIndex ===3"
       @keydown.native="btKeyDown"
       @keyup.native="btKeyDown"
        ></el-input>

      <div class="right_title_b">所属组织</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'1.69rem'}" v-model="item.orgName" maxlength="20" :disabled="pageIndex ===3"></el-input>
      
       <div class="opera" v-if="pageIndex !=3">
            <div class="icon" :class="{'icon1':index!==0}" @click="addContract(index)"></div>
          </div>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">分销公司名称</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <!-- <el-input :style="{'width':'1.69rem'}" maxlength="20" v-model="params.distributionCompanyName" :disabled="pageIndex ===3"></el-input> -->
        <el-select v-model="params.distributionCompanyName" :style="{'width': '1.69rem'}">
              <el-option
                v-for="item in distributionList"
                :key="item.companyId"
                :label="item.companyName"
                :value="item.companyName"
                @click.native="hanlderDistributionCompany(item)"
              ></el-option>
            </el-select>

      <div class="right_title">
        <div>地</div>
        <div>址</div>
      </div>
        <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'1.69rem'}" maxlength="20" v-model="params.addr" :disabled="pageIndex ===3"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">对接人姓名</div>
        <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'1.69rem'}" maxlength="20" v-model="params.partyADockingPerson" :disabled="pageIndex ===3"></el-input>

      <div class="right_title_c">对接人电话</div>
        <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{'width':'1.69rem'}"
        maxlength="11"
        v-model="params.partyADockingPersonMobile"
        :disabled="pageIndex ===3"
         @keydown.native="btKeyDown"
          @keyup.native="btKeyDown"
      ></el-input>

      <div class="right_title_c">邮箱或微信</div>
        <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        :style="{'width':'1.69rem'}"
        maxlength="20"
        v-model="params.partyADockingPersonEmail"
        :disabled="pageIndex ===3"
      ></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">财务人员</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'1.69rem'}" maxlength="20" v-model="params.financialOfficer" :disabled="pageIndex ===3"></el-input>

      <div class="right_title_a">财务电话</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'1.69rem'}"
       maxlength="11"
        v-model="params.financialOfficerMobile" 
        :disabled="pageIndex ===3"
         @keydown.native="btKeyDown"
          @keyup.native="btKeyDown"
        ></el-input>

      <div class="right_title_c">邮箱或微信</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'1.69rem'}" maxlength="20" v-model="params.financialOfficerEmail" :disabled="pageIndex ===3"></el-input>
    </div>

    <div class="basic_line"></div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">其他约定</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
       <div class="necessary">
        <el-checkbox v-model="params.permit" :disabled="pageIndex ===3">允许我司转委托</el-checkbox>
        <el-checkbox v-model="params.forbid" :disabled="pageIndex ===3">禁止对外拆用</el-checkbox>
      </div>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">分销期限类型</div>
       <div class="i-icon">:</div>
      <div class="must"></div>
      <div class="time">
        <el-radio v-model="params.agencyTermType" label="1" :disabled="pageIndex ===3">固定期限</el-radio>
        <el-date-picker
         :disabled="pageIndex ===3"
          v-model="agencyTermTime"
          :unlink-panels="true"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
        <el-radio v-model="params.agencyTermType" label="2" :disabled="pageIndex ===3">暂定期限</el-radio>
        <el-radio v-model="params.agencyTermType" label="3" :disabled="pageIndex ===3">无固定期限</el-radio>
      </div>
    </div>

    <div class="basic_item_j">
      <div class="basic_item_i_title">佣金结算方式</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        v-model="params.settlementMethod"
        :style="{'width':'7.3rem','height':'1.1rem'}"
        type="textarea"
        resize="none"
        :disabled="pageIndex ===3"
      ></el-input>
    </div>
    <div class="basic_item_j">
      <div class="basic_item_i_title">现金奖描述</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        v-model="params.cashPrize"
        :style="{'width':'7.3rem','height':'1.1rem'}"
        type="textarea"
        resize="none"
        :disabled="pageIndex ===3"
      ></el-input>
    </div>
    <div class="basic_item_j">
      <div class="basic_item_i_title">挞定成分</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        v-model="params.tart"
        :style="{'width':'7.3rem','height':'1.1rem'}"
        type="textarea"
        resize="none"
        :disabled="pageIndex ===3"
      ></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">客户保护期</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input
        v-model="params.customerProtectionPeriod"
        :style="{'width':'1.7rem'}"
        maxlength="11"
        :disabled="pageIndex ===3"
         @keydown.native="btKeyDown"
          @keyup.native="btKeyDown"
      >
        <span slot="suffix">天</span>
      </el-input>
    </div>

    <div class="basic_item_i_j">
      <div class="basic_item_i_title">结佣必备资料</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <div class="jieyong">
        <div class="jieyong_item first">
          <div class="select">
            <el-checkbox v-model="params.specialInvoice.select" :disabled="pageIndex ===3">专用发票</el-checkbox>
          </div>
          <el-radio v-model="params.specialInvoice.dataStatus" :label=1 :disabled="pageIndex ===3">原件</el-radio>
          <el-radio v-model="params.specialInvoice.dataStatus" :label=2 :disabled="pageIndex ===3">复印件</el-radio>
        </div>
        <div class="jieyong_item">
          <div class="select">
            <el-checkbox v-model="params.brokerageSchedule.select" :disabled="pageIndex ===3">结佣明细表</el-checkbox>
          </div>
          <el-radio v-model="params.brokerageSchedule.dataStatus" :label=1 :disabled="pageIndex ===3">原件</el-radio>
          <el-radio v-model="params.brokerageSchedule.dataStatus" :label=2 :disabled="pageIndex ===3">复印件</el-radio>
        </div>

        <div class="jieyong_item" v-for="(dataList,dataIndex) in params.other" :key="dataIndex">
          <div class="select">
            <el-checkbox v-model="dataList.select" :disabled="pageIndex ===3">其他</el-checkbox>
          </div>
          <el-radio v-model="dataList.dataStatus" :label=1 :disabled="pageIndex ===3">原件</el-radio>
          <el-radio v-model="dataList.dataStatus" :label=2 :disabled="pageIndex ===3">复印件</el-radio>
          <el-input v-model="dataList.dataName" :style="{'width':'1.7rem'}" maxlength="20" :disabled="pageIndex ===3" v-if="dataList.select"></el-input>
          <div class="add" @click="addData()" v-if="dataIndex+1==params.other.length &&pageIndex!==3">
            <div class="icon"></div>
            <div>添加</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dividingLine from "./dividingLine";
import { ErpCommon } from "../../../../utils/ErpCommon";
import {GetCompangList,PortRequestParameter} from "../../../../net/projectAgentinfo/companyRequest/GetCompangInfoList.js"
const reg = /^[1-9]\d{0,11}$/;
export default {
  components: {
    dividingLine
  },
  data() {
    return {
      agencyTermTime: [],//分销期限
      distributionList:[],//分销公司列表
      checked: "",
      //选择美联负责人给erp传值参数
      selectPersonParms:{
        userId:'',
        userName:"",
        organizationId:"",
        organizationName:"",
        selectType:1,//1选人，2选组织
       },
      params: {
        personInChargeList: [
            {
            "orgId": "", //(int32)所属组织id
            "orgName": "", //(string)所属组织名称
            "principalId": "", //(int32)负责人id
            "principalMobile": "",//(string)负责人电话 
            "principalName": ""//(string)负责人名称
          }
        ], //美联负责人列表
        legalFollowers: "", //法务跟进人
        legalFollowersId: "", //法务跟进人ID
        legalFollowersMobile: "", //法务跟进人电话
        meilianPrincipalOri: "", //美联负责组织
        meilianPrincipalOriId: "", //美联负责组织id
        meilianPrincipal: "", //美联负责人
        meilianPrincipalId: "", //美联负责人id
        meilianPrincipalMobile: "", //美联负责人电话
        distributionCompanyName: "", //分销公司名称
        addr: "", //分销公司地址
        partyADockingPerson: "", //对接人姓名
        partyADockingPersonMobile: "", //对接人电话
        partyADockingPersonEmail: "", //对接人邮箱或微信
        financialOfficer: "", //财务人员：
        financialOfficerMobile: "", //财务电话：
        financialOfficerEmail: "", //财务人邮箱或微信：
        otherConventions: [],
        permit: 0, //允许我司转委
        forbid: 0, //禁止对外拆用
        agencyTermStartStr: "", //分销期限开始
        agencyTermEndStr: "", //分销期限借宿
        agencyTermType: "", //1固定期限2暂定期限3无固定期限
        settlementMethod: "", //佣金结算方式
        tart: "", //挞定成分
        cashPrize: "", //现金奖描述
        customerProtectionPeriod: "", //客户保护期：
        specialInvoice: {
          select: 0, //
          dataName: "", //..
          dataType: 11, //
          type: 2,
          dataStatus: "" //1原件2复印件
        }, //专用发票
        brokerageSchedule: {
          select: 0, //
          dataName: "", //..
          dataType: 12, //
          type: 2,
          dataStatus: "" //1原件2复印件
        }, //结佣明细表
        other: [
          {
            select: 0, //
            dataName: "", //..
            dataType: 0, //
            type: 2,
            dataStatus: "" //1原件2复印件
          } //其他
        ],
        sheetList: []
      }
    };
  },
  props:{
    //当前操作界面索引(1.新增 2.编辑 3.详情)
    pageIndex:{
      type:Number,
      default(){
        return 1;
      }
    },
    initParams:{
      type:Object,
      default(){
        return {}
      }
    }
  },
   watch:{
    //编辑或详情初始化数据
   initParams:{
     handler: function(to, from){
        if(this.pageIndex == 2 || this.pageIndex ==3) this.initData();
     },
    deep: true
   }
   },
  created() {
    this.initCompanyList();
  },
  methods: {
    //获取分销公司列表
    initCompanyList(){
      let companyParams = {export:1};
      new GetCompangList(new PortRequestParameter(companyParams)).send()
      .then((res)=>{
        this.distributionList = res.companyList || [];
        console.log(this.distributionList,'分销公司列表');
      })
      .catch((err)=>{
          console.log('分销公司请求失败');
      })
    },
    //初始化编辑数据
    initData(){
        this.params.addr = this.initParams.addr;
        this.params.agencyTermType = String(this.initParams.agencyTermType);
        this.params.customerProtectionPeriod = this.initParams.customerProtectionPeriod;
        this.params.distributionCompanyName = this.initParams.distributionCompanyName;
        this.params.financialOfficer = this.initParams.financialOfficer;
        this.params.financialOfficerEmail = this.initParams.financialOfficerEmail;
        this.params.financialOfficerMobile = this.initParams.financialOfficerMobile;
        this.params.legalFollowers = this.initParams.legalFollowers;
        this.params.legalFollowersId = this.initParams.legalFollowersId;
        this.params.legalFollowersMobile = this.initParams.legalFollowersMobile;
        this.params.partyADockingPerson = this.initParams.partyADockingPerson;
        this.params.cashPrize = this.initParams.cashPrize;
        this.params.partyADockingPersonEmail = this.initParams.partyADockingPersonEmail;
        this.params.partyADockingPersonMobile = this.initParams.partyADockingPersonMobile;
        this.params.settlementMethod = this.initParams.settlementMethod;
        this.params.tart = this.initParams.tart;
        if(this.initParams.personInChargeList.length>0){
          this.params.personInChargeList = this.initParams.personInChargeList;
        }
        //其他约定类型处理
        this.judgeCheckType(this.initParams.otherConventions);
        //处理分销期限时间
        this.agencyTermTime.push(this.initParams.agencyTermStartStr);
        this.agencyTermTime.push(this.initParams.agencyTermEndStr) ;
        //结佣必备资料处理
        this.judgeOtherType(this.initParams.dataSheetList);
    },
  
    //判断值是否存在
    judgeValue(val){
      if(val !=undefined){
        return val
      }else{
        return ''
      }
    },
      //输入验证
    btKeyDown(e) {
      let flag = reg.test(e.target.value);
      //允许输入0
      if (!flag && "0" !== e.target.value + "") {
        e.target.value = "";
      }
    },
    //添加美联负责人
    addContract(index) {
      if (index === 0) {
        this.params.personInChargeList.push({
            "orgId": "", //(int32)所属组织id
            "orgName": "", //(string)所属组织名称
            "principalId": "", //(int32)负责人id
            "principalMobile": "",//(string)负责人电话 
            "principalName": ""//(string)负责人名称
          });
      } else {
        this.params.personInChargeList.splice(index, 1);
      }
    },
    //选择分销公司 带出分销公司地址，对接人姓名，对接人电话
    hanlderDistributionCompany(data){ 
       this.params.addr = data.compAddr || '';
       this.params.partyADockingPerson = data.OurCharge || '';
       this.params.partyADockingPersonMobile = data.ourDockingPersonMobile || '';
    },
    //选择相关人员
    selsecPerson(data,index){
      // 清空传值给erp参数
      this.selectPersonParms.organizationId = "";
      this.selectPersonParms.organizationName = "";
      if(index ==1 ){
      this.selectPersonParms.userId =  this.params.legalFollowersId;
      this.selectPersonParms.userName = this.params.legalFollowers;
      let info = new ErpCommon().openPerformanceAssignee(this.selectPersonParms);
      if(info == '') return;
      let val = JSON.parse(info);
      this.params.legalFollowersId = val.userId || "";
      this.params.legalFollowers = val.userName || "";
      this.params.legalFollowersMobile = val.userMobile || "";
      console.log(data,'这是筛选法务跟进人信息');
      }
      if(index ==2){
      this.selectPersonParms.userId = data.principalId;
      this.selectPersonParms.userName = data.principalName;
      this.selectPersonParms.organizationId = data.orgId;
      this.selectPersonParms.organizationName = data.orgName;
      let info = new ErpCommon().openPerformanceAssignee(this.selectPersonParms);
      if(info == '') return;
      let val = JSON.parse(info);
      data.orgId = val.organizationId || "";
      data.orgName = val.organizationName || "";
      data.principalName = val.userName || "";
      data.principalId = val.userId || "";
      data.principalMobile = val.userMobile || "";
      console.log(data,'这是筛选美联负责人信息');
      }
    },
    //添加结佣必备资料
    addData() {
      this.params.other.push({
        select: 0, //
        dataName: "", //..
        dataType: 0, //
        type: "2",
        dataStatus: "" //1原件2复印件
      });
    },
    //判断多选框类型
    judgeCheckType(obj){
      if(obj != "" && obj.length >1 ){
         let stampArr= obj.split(',');
         for(let item of stampArr){
          if(item ==1)  this.params.permit = true;
          if(item ==2)  this.params.forbid = true;
         }
         }else if(obj.length == 1){
          let item = Number(obj);
          if(item ==1)  this.params.permit = true;
          if(item ==2)  this.params.forbid = true;
         }
    },
    //判断结佣必备资料
    judgeOtherType(arr){
      this.params.other = [];
    for(let item of arr){
      if(item.type == 2){
        if(item.dataType ==0){
          let obj = {
            select: true, //
            dataName: item.dataName, //..
            dataType: 0, //
            type: 2,
            dataStatus: item.dataStatus //1原件2复印件
          }
          this.params.other.push(obj)
        }else if(item.dataType == 11){
          this.params.specialInvoice.select = true;
          this.params.specialInvoice.dataStatus = item.dataStatus;
        }else if(item.dataType == 12){
          this.params.brokerageSchedule.select = true;
          this.params.brokerageSchedule.dataStatus = item.dataStatus;
        }
        }
      };
        //若其他类型为0 编辑时新增一个
      if(this.params.other.length <1) this.params.other.push({
            select: 0, //
            dataName: "", //..
            dataType: 0, //
            type: 2,
            dataStatus: "" //1原件2复印件
      });
    },
    //传递合同双方签署信息
    sendSigning() {
      //让params参数指向不同指针防止父组件修改数据
      let submitParams = JSON.parse(JSON.stringify(this.params));
       // 美联负责人处理,若没有相关负责人信息，则删除空对象
      submitParams.personInChargeList.forEach((item,index)=>{
        if(item.principalId ==='' || item.orgId ===''){
          submitParams.personInChargeList.splice(index,1);
        }
      })
      if (submitParams.permit == true) {
        submitParams.otherConventions.push(1);
      }
      if (submitParams.forbid == true) {
        submitParams.otherConventions.push(2);
      }
      submitParams.otherConventions = submitParams.otherConventions.join();
      //处理分销期限时间
      submitParams.agencyTermStartStr = this.agencyTermTime[0] || '';
      submitParams.agencyTermEndStr = this.agencyTermTime[1] || '';
      if (submitParams.specialInvoice.select == 1) {
        delete submitParams.specialInvoice.select;
        submitParams.specialInvoice.dataStatus = parseInt(
          submitParams.specialInvoice.dataStatus
        );
        submitParams.sheetList.push(submitParams.specialInvoice);
      }
      if (submitParams.brokerageSchedule.select == 1) {
        delete submitParams.brokerageSchedule.select;
        submitParams.brokerageSchedule.dataStatus = parseInt(
          submitParams.brokerageSchedule.dataStatus
        );
        submitParams.sheetList.push(submitParams.brokerageSchedule);
      }
      if (submitParams.agencyTermType) {
        submitParams.agencyTermType = parseInt(submitParams.agencyTermType);
      }
      if (submitParams.customerProtectionPeriod) {
        submitParams.customerProtectionPeriod = parseInt(
          submitParams.customerProtectionPeriod
        );
      }
      submitParams.other.forEach(item => {
        if (item.select != 0) {
          item.dataStatus = parseInt(item.dataStatus);
          delete item.select;
          submitParams.sheetList.push(item);
        }
      });

      this.$emit("contractSigning", {
        data: submitParams
      });
    }
  }
};
</script>
<style lang="less" scoped>
 /deep/.el-input.is-disabled .el-input__inner {
      background-color: #fff;
      cursor: pointer;
    }
/deep/ .el-input__inner {
  line-height: 1;
}
/deep/ .el-checkbox {
  display: flex;
  align-items: center;
}
/deep/ .el-checkbox__input {
  display: flex;
    height: 0.14rem;
}
/deep/ .el-radio {
  display: flex;
  align-items: center;
}
/deep/ .el-radio__input {
  display: flex;
   height: 0.14rem;
}
.i-icon {
  font-size: 0.14rem;
  margin-right: 0.05rem;
  height: 0.3rem;
  color: #444444;
  line-height: 0.28rem;
}
.basic {
  margin-top: 0.45rem;
  .basic_line {
    width: 10.1rem;
    border: solid 0.01rem #d6dfe6;
    opacity: 0.41;
    margin-top: 0.3rem;
  }
  .basic_item_i {
    width: 9.9rem;
    height: 0.3rem;
    display: flex;
    align-items: center;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    /deep/ .el-input__suffix {
      display: flex;
      align-items: center;
    }
    .time {
      display: flex;
      align-items: center;
      /deep/ .el-date-editor{
        width: 2.5rem;
        margin-right: 0.3rem;
      }
      /deep/ .el-icon-date{
        display: none;
      }
      /deep/.el-range-input{
        line-height: 0.25rem;
      }
    }
    .jieyong {
      .el-input--small {
        margin-left: 0.1rem;
        margin-right: 0.3rem;
      }
    }
    .basic_item_i_title {
      width: 0.88rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
    }
    .right_title {
      font-size: 0.14rem;
      width: 0.57rem;
      display: flex;
      justify-content: space-between;
      margin-left: 0.31rem;
      color: #444444;
    }
    .right_title_a {
      font-size: 0.14rem;
      margin-left: 0.31rem;
      color: #444444;
    }
    .right_title_b {
      font-size: 0.14rem;
      margin-left: 0.3rem;
      color: #444444;
    }
    .right_title_c {
      font-size: 0.14rem;
      margin-left: 0.16rem;
      color: #444444;
    }
    /deep/ .el-checkbox {
      margin-right: 0.22rem;
    }
    .qianyue {
      display: flex;
      align-items: center;
      .yewu {
        margin-left: 0.53rem;
      }
    }
    .select_fanwei {
      display: flex;
      align-items: center;
    }
    .opera {
      width: 0.69rem;
      height: 0.3rem;
      position: relative;
      .icon {
        width: 0.15rem;
        height: 0.15rem;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background-image: url("../../../../assets/images/projectAgentInfo/common/addPeopleHover.png");
        background-size: contain;
      }
    .icon1 {
       background-image: url("../../../../assets/images/projectAgentInfo/common/del_200.png");
        } 
    }
  }
  .basic_item_j {
    width: 10.1rem;
    height: 1.1rem;
    display: flex;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    /deep/ .el-textarea__inner {
      height: 1.1rem;
    }
    .basic_item_i_title {
      width: 0.88rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
    }
  }
  .basic_item_i_j {
    width: 9.9rem;
    height: auto;
    display: flex;
    margin-left: 0.2rem;
    margin-top: 0.16rem;
    .basic_item_i_title {
      width: 0.88rem;
      height: 0.3rem;
      text-align: right;
      line-height: 0.3rem;
      font-family: MicrosoftYaHei;
      font-size: 0.14rem;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: #444444;
    }
    .jieyong {
      .jieyong_item {
        height: 0.32rem;
        display: flex;
        align-items: center;
        .select {
          width: 1.5rem;
        }
        .add {
          width: 0.5rem;
          margin-left: 0.1rem;
          display: flex;
          align-items: center;
          font-family: MicrosoftYaHei;
          font-size: 0.12rem;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          color: #259cf3;
          .icon {
            width: 0.15rem;
            height: 0.15rem;
            margin-right: 0.05rem;
            background-image: url("../../../../assets/images/projectAgentInfo/common/addPeopleHover.png");
            background-size: contain;
          }
        }
      }
    }
  }
}

.nomust,
.must {
  display: flex;
  height: 0.3rem;
  line-height: 0.3rem;
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
  margin-right: 0.08rem;
  line-height: 0.3rem;
}
.nomust::after {
  content: "*";
  visibility: hidden;
  width: 0.02rem;
  height: 0.06rem;
  font-family: SimSun;
  font-size: 0.12rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #ff5a1f;
  margin-right: 0.08rem;
}
  .necessary {
      display: flex;
      align-items: center;
    }
</style>