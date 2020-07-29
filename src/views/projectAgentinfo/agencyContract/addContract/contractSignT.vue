<template>
  <div class="basic">
    <dividingLine :title="`合同签署双方(乙方)`"></dividingLine>
    <div class="basic_item_i">
      <div class="basic_item_i_title">法务跟进人</div>
      <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-select
        v-model="params.legalFollowersId"
        @change="getLegalMessage(params.legalFollowersId)"
        :style="{'width':'1.69rem'}"
        :disabled="pageIndex ===3"
      >
        <el-option
          v-for="item in legalFollowersList"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="right_title_a">联系电话</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'1.69rem'}" maxlength="20" v-model="params.legalFollowersMobile" :disabled="pageIndex ===3"></el-input>
    </div>

    <div class="basic_item_i" v-if="params.personInChargeList && params.personInChargeList.length>0" v-for="(item,index) in params.personInChargeList" :key="index" >
      <div class="basic_item_i_title">美联负责人</div>
       <div class="i-icon">:</div>
      <div class="must"></div>
      <el-select
        v-model="item.orgName"
        @change="getMeilianMessage(item)"
        :style="{'width':'1.69rem'}"
        :disabled="pageIndex ===3"
      >
        <el-option
          v-for="item in meilianPrincipalList"
          :key="item.label"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <div class="right_title_a">联系电话</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'1.69rem'}" v-model="params.meilianPrincipalMobile" maxlength="20" :disabled="pageIndex ===3"></el-input>

      <div class="right_title_b">所属组织</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'1.69rem'}" v-model="params.meilianPrincipalOri" maxlength="20" :disabled="pageIndex ===3"></el-input>
    </div>

    <div class="basic_item_i">
      <div class="basic_item_i_title">分销公司名称</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'1.69rem'}" maxlength="20" v-model="params.distributionCompanyName" :disabled="pageIndex ===3"></el-input>

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
        maxlength="20"
        v-model="params.partyADockingPersonMobile"
        :disabled="pageIndex ===3"
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
      <el-input :style="{'width':'1.69rem'}" maxlength="20" v-model="params.financialOfficerMobile" :disabled="pageIndex ===3"></el-input>

      <div class="right_title_c">邮箱或微信</div>
       <div class="i-icon">:</div>
      <div class="nomust"></div>
      <el-input :style="{'width':'1.69rem'}" maxlength="20" v-model="params.financialOfficerEmail" :disabled="pageIndex ===3"></el-input>
    </div>

    
  </div>
</template>
<script>
import dividingLine from "./dividingLine";
export default {
  components: {
    dividingLine
  },
  data() {
    return {
      agencyTermTime: [],//分销期限
      checked: "",
      legalFollowersList: [
        { label: "fe", value: 4, mobile: "18227135618" },
        { label: "fafa", value: 25, mobile: "18227855618" },
        { label: "ff", value: 20, mobile: "18226335618" }
      ],
      meilianPrincipalList: [
        {
          label: "fe",
          value: 4,
          mobile: "18227225618",
          organization: 1212121,
          oriId: 2
        },
        {
          label: "af",
          value: 200,
          mobile: "18221135618",
          organization: 122421,
          oriId: 5
        }
      ],
      params: {
        personInChargeList: [], //美联负责人列表
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
  methods: {
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
    //获取法务跟进人信息
    getLegalMessage(val) {
      this.legalFollowersList.forEach(item => {
        if (item.value == val) {
          this.params.legalFollowersMobile = item.mobile;
          this.params.legalFollowers = item.label;
        }
      });
    },
    //判断值是否存在
    judgeValue(val){
      if(val !=undefined){
        return val
      }else{
        return ''
      }
    },
    //获取美联负责人信息
    getMeilianMessage(val) {
      for(let info of personInChargeList){
         if(info.orgId == val.orgId){
           info.orgId = val.orgId;
           info.orgName = val.orgName;
           info.principalId = val.principalId;
           info.principalMobile = val.principalMobile;
           info.principalName = val.principalName;
         }
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
          item.select =true;
          this.params.ohter.push(item)
        }else if(item.dataType == 11){
          this.params.specialInvoice.select = true;
          this.params.specialInvoice.dataStatus = item.dataStatus;
        }else if(item.dataType == 12){
          this.params.brokerageSchedule.select = true;
          this.params.brokerageSchedule.dataStatus = item.dataStatus;
        }
        }
      }
    },
    //传递合同双方签署信息
    sendSigning() {
      if (this.params.permit == true) {
        this.params.otherConventions.push(1);
      }
      if (this.params.forbid == true) {
        this.params.otherConventions.push(2);
      }
      this.params.otherConventions = this.params.otherConventions.join();
      //处理分销期限时间
      this.params.agencyTermStartStr = this.agencyTermTime[0] || '';
      this.params.agencyTermEndStr = this.agencyTermTime[1] || '';
      if (this.params.specialInvoice.select == 1) {
        delete this.params.specialInvoice.select;
        this.params.specialInvoice.dataStatus = parseInt(
          this.params.specialInvoice.dataStatus
        );
        this.params.sheetList.push(this.params.specialInvoice);
      }
      if (this.params.brokerageSchedule.select == 1) {
        delete this.params.brokerageSchedule.select;
        this.params.brokerageSchedule.dataStatus = parseInt(
          this.params.brokerageSchedule.dataStatus
        );
        this.params.sheetList.push(this.params.brokerageSchedule);
      }
      if (this.params.agencyTermType) {
        this.params.agencyTermType = parseInt(this.params.agencyTermType);
      }
      if (this.params.customerProtectionPeriod) {
        this.params.customerProtectionPeriod = parseInt(
          this.params.customerProtectionPeriod
        );
      }
      this.params.other.forEach(item => {
        if (item.select != 0) {
          item.dataStatus = parseInt(item.dataStatus);
          delete item.select;
          this.params.sheetList.push(item);
        }
      });

      this.$emit("contractSigning", {
        data: this.params
      });
    }
  }
};
</script>
<style lang="less" scoped>
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