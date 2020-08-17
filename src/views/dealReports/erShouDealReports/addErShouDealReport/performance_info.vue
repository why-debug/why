<template>
  <div class="performance-box">
    <div class="performance-list">
      <div class="performance-list-item">
        <span class="p-l-left">上报业绩：</span>
        <span class="p-l-right">{{reportingPerformance}}元</span>
      </div>
      <div class="performance-list-item">
        <span class="p-l-left">标准佣金：</span>
        <span
          class="p-l-right"
        >{{standardCommission}}{{priceUnitList.filter(item => ruleForm.erpMlDeal.priceUnit === item.value)[0].label}}</span>
      </div>
      <div class="performance-list-item">
        <span class="p-l-left">折扣：</span>
        <span class="p-l-right">{{discount}}%</span>
      </div>
      <div class="performance-list-item">
        <span class="p-l-left">合作费：</span>
        <span class="p-l-right">{{cooperationFees}}元</span>
      </div>
    </div>

    <!-- table - 1 -->
    <div class="performance-add-box">
      <div class="p-a-b-left">
        <check-box-only
          :label="'外部合作费'"
          :value="'1'"
          @sendData="waibuhezuofeiChange"
          :selecteValue="waibuhezuofei"
        ></check-box-only>
        <div class="add-box" @click="addErpMlDealOuterCooperations()" v-if="waibuhezuofei === '1'">
          <img src="../../../../assets/images/public/add_200.png" alt />
          <div>新增</div>
        </div>
      </div>
    </div>
    <div class="table-box" v-if="waibuhezuofei === '1'">
      <div class="table-buju-1 table-head">
        <div v-for="(item, index) in tableTop1" :key="index">{{item}}</div>
      </div>
      <div
        class="table-buju table-buju-1"
        v-for="(item, index) in ruleForm.erpMlDealOuterCooperations"
        :key="index"
      >
        <div>{{index + 1}}</div>
        <div>
          <el-input v-model="item.userName" :style="{'width': '100%'}"></el-input>
        </div>
        <div>
          <el-input v-model="item.idNo" :style="{'width': '100%'}"></el-input>
        </div>
        <div>
          <el-input v-model="item.contractPhone" :style="{'width': '100%'}"></el-input>
        </div>
        <div>
          <el-select v-model="item.type" :style="{'width': '100%'}" placeholder>
            <el-option
              v-for="item in erpMlDealOuterCooperationsTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="active">
          <el-input
            v-model="item.cooperationCost"
            @input="cooperationCostChange(index)"
            :style="{'width': '100%'}"
          ></el-input>
        </div>
        <div class="del-icon" @click="delErpMlDealOuterCooperations(index)"></div>
      </div>
    </div>

    <!-- table - 2 -->
    <div class="performance-add-box">
      <div class="p-a-b-left">
        <div>业绩分配</div>
        <div class="add-box" @click="addErpMlDealProfits()">
          <img src="../../../../assets/images/public/add_200.png" alt />
          <div>新增</div>
        </div>
      </div>
      <div class="p-a-b-right">
        <radio-group-other @sendData="jinebiliChange"></radio-group-other>
      </div>
    </div>
    <div class="table-box">
      <div class="table-buju-2 table-head">
        <div v-for="(item, index) in tableTop2" :key="index">{{item}}</div>
      </div>
      <div
        class="table-buju table-buju-2"
        v-for="(item, index) in ruleForm.erpMlDealProfits"
        :key="index"
      >
        <div>{{index + 1}}</div>
        <div>
          <el-select
            @click.native="why(index)"
            v-model="item.profitType"
            :style="{'width': '100%'}"
            placeholder
          >
            <el-option
              v-for="item in erpMlDealProfitsProfitTypeList"
              :key="item.performanceCode"
              :label="item.performanceName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div>
          <el-input
            @click.native="selsecArea(item)"
            v-model="item.compOrgName"
            :style="{'width': '100%'}"
            :readonly="true"
          ></el-input>
        </div>
        <div>
          <el-input
            @click.native="selsecPerson(item)"
            v-model="item.userName"
            :style="{'width': '100%'}"
            :readonly="true"
          ></el-input>
        </div>
        <div>
          <el-date-picker
            v-model="item.profitMonth"
            type="month"
            :style="{'width': '100%'}"
            value-format="yyyy-MM"
            placeholder
          ></el-date-picker>
        </div>
        <div class="active">
          <el-input
            v-model="item.profitProportion"
            @input="profitProportionChange(index)"
            :disabled="jinebili === '2'"
            maxlength="2"
            :style="{'width': '100%'}"
          >
            <span slot="suffix">%</span>
          </el-input>
        </div>
        <div class="active">
          <el-input
            v-model="item.profitMoney"
            @input="profitMoneyChange(index)"
            :disabled="jinebili === '1'"
            :style="{'width': '100%'}"
          ></el-input>
        </div>
        <div class="active">
          <el-input
            v-model="item.orderProportion"
            @change="orderProportionChange(index)"
            v-number-one
            :style="{'width': '100%'}"
          ></el-input>
        </div>
        <div>{{item.profitLeadersName}}</div>
        <div class="del-icon" @click="delErpMlDealProfits(index)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import checkBoxOnly from "@/views/dealReports/erShouDealReports/components/checkBoxOnly.vue";
import radioGroupOther from "@/views/dealReports/erShouDealReports/components/radioGroupOther.vue";
import {
  erpMlDeal,
  erpMlDealBuyUsersItem,
  erpMlDealSellersItem,
  erpMlDealOuterCooperationsItem,
  erpMlDealProfitsitem,
  createMlDealReport,
  getBankDicList,
  getFunPerformanceTypeList
} from "@/net/dealReports/erShouDealReports.js";
export default {
  props: {
    ruleForm: {
      type: Object,
      default: {}
    }
  },
  components: {
    checkBoxOnly,
    radioGroupOther
  },
  data() {
    return {
      // table - 1
      tableTop1: ["序号", "合作人", "身份证", "联系方式", "类型", "合作费"],
      // table- 1 - 类型列表
      erpMlDealOuterCooperationsTypeList: [],
      // table - 2
      tableTop2: [
        "序号",
        "分配类型",
        "分配部门",
        "分配人",
        "分配月份",
        "分配比列",
        "分配业绩",
        "单量",
        "领导人分配业绩"
      ],
      priceUnitList: [
        { label: "元", value: 1 },
        { label: "万元", value: 2 }
      ],
      // table- 2 - 类型列表
      erpMlDealProfitsProfitTypeList: [],
      // 标准佣金比例
      standardCommissionProportion: 0.5, // todo
      // 外部合作费
      waibuhezuofei: "1",
      // 金额比例
      jinebili: "1"
    };
  },
  methods: {
    // 外部合作费
    waibuhezuofeiChange(value) {
      this.waibuhezuofei = +value ? "1" : "0";
    },
    // 增加table-1
    addErpMlDealOuterCooperations() {
      this.ruleForm.erpMlDealOuterCooperations.push(
        new erpMlDealOuterCooperationsItem()
      );
    },
    // 删除table-1
    delErpMlDealOuterCooperations(index) {
      this.ruleForm.erpMlDealOuterCooperations.splice(index, 1);
    },
    // 增加table-2
    addErpMlDealProfits() {
      this.ruleForm.erpMlDealProfits.push(new erpMlDealProfitsitem());
    },
    // 删除table-2
    delErpMlDealProfits(index) {
      this.ruleForm.erpMlDealProfits.splice(index, 1);
    },
    // 选择金额比例
    jinebiliChange(value) {
      this.jinebili = value;
    },
    // 修改比例
    profitProportionChange(index) {
      if (this.reportingPerformance <= 0) {
        this.ruleForm.erpMlDealProfits[index].profitProportion = 0;
        return;
      }
      setTimeout(() => {
        this.ruleForm.erpMlDealProfits[
          index
        ].profitProportion = this.onlyNumber(
          this.ruleForm.erpMlDealProfits[index].profitProportion
        );
        let obj = this.isExceedProfitProportion(
          this.ruleForm.erpMlDealProfits[index].profitProportion,
          index
        );
        if (obj.isExceed) {
          this.ruleForm.erpMlDealProfits[index].profitProportion =
            obj.profitProportion;
        }
        this.ruleForm.erpMlDealProfits[index].profitMoney =
          (this.reportingPerformance *
            this.ruleForm.erpMlDealProfits[index].profitProportion) /
          100;
      }, 100);
    },
    // 修改金额
    profitMoneyChange(index) {
      if (this.reportingPerformance <= 0) {
        this.ruleForm.erpMlDealProfits[index].profitMoney = 0;
        return;
      }
      setTimeout(() => {
        this.ruleForm.erpMlDealProfits[index].profitMoney = this.onlyNumber(
          this.ruleForm.erpMlDealProfits[index].profitMoney
        );

        this.ruleForm.erpMlDealProfits[index].profitProportion =
          (this.ruleForm.erpMlDealProfits[index].profitMoney /
            this.reportingPerformance) *
          100;
        let obj = this.isExceedProfitProportion(
          this.ruleForm.erpMlDealProfits[index].profitProportion,
          index
        );
        if (obj.isExceed) {
          this.ruleForm.erpMlDealProfits[index].profitProportion =
            obj.profitProportion;
          this.ruleForm.erpMlDealProfits[index].profitMoney =
            (this.reportingPerformance *
              this.ruleForm.erpMlDealProfits[index].profitProportion) /
            100;
        }
      }, 100);
    },
    // 是否超出比例
    isExceedProfitProportion(num, index) {
      let obj = {
        profitProportion: 0,
        isExceed: false
      };
      let nowNum = 0;
      this.ruleForm.erpMlDealProfits.forEach((m, n) => {
        if (n !== index) {
          nowNum += +m.profitProportion;
        }
      });
      obj.isExceed = nowNum + +num > 100;
      obj.profitProportion = obj.isExceed ? 100 - nowNum : num;
      return obj;
    },
    // 单量修改
    orderProportionChange(index) {
      let num = 0;
      let allNum = 1;
      this.ruleForm.erpMlDealProfits.forEach((m, n) => {
        if (n !== index) {
          num += +m.orderProportion;
        }
      });
      if (
        this.ruleForm.erpMlDealProfits[index].orderProportion >
        allNum - num
      ) {
        this.ruleForm.erpMlDealProfits[index].orderProportion = allNum - num;
      }
    },
    // 只能是数字
    onlyNumber(val) {
      let value = val;
      value = value.replace(/\D/g, "");
      return value;
    }
  },
  computed: {
    // 上报业绩
    reportingPerformance() {
      let num = 0;
      num =
        +this.ruleForm.erpMlDeal.sellOwnerCommsion +
        +this.ruleForm.erpMlDeal.buyCustomerCommsion;
      if (
        this.ruleForm.erpMlDeal.dealType === 1 &&
        this.ruleForm.erpMlDeal.payType === 2
      ) {
        num += +this.ruleForm.erpMlDeal.mortgageFee;
      }
      if (this.waibuhezuofei === "1") {
        let num_ = 0;
        for (let item of this.ruleForm.erpMlDealOuterCooperations) {
          num_ += +item.cooperationCost;
        }
        num -= num_;
      }
      return num;
    },
    // 标准佣金
    standardCommission() {
      return (
        this.ruleForm.erpMlDeal.dealPrice * this.standardCommissionProportion
      );
    },
    // 折扣
    discount() {
      if (this.standardCommission <= 0) return 0;
      return (
        (this.reportingPerformance /
          (this.ruleForm.erpMlDeal.priceUnit === "1"
            ? this.standardCommission
            : this.standardCommission * 10000)) *
        100
      );
    },
    // 合作费
    cooperationFees() {
      let num = 0;
      if (this.waibuhezuofei === "1") {
        for (let item of this.ruleForm.erpMlDealOuterCooperations) {
          num += +item.cooperationCost;
        }
      }
      return num;
    }
  }
};
</script>

<style lang="less" scoped>
@commonInputHeight: 0.3rem;
@commonTableHeight: 0.5rem;
.performance-box {
  width: 100%;
  height: auto;
  padding-left: 0.4rem;
  box-sizing: border-box;
  .add-box {
    width: auto;
    height: @commonInputHeight;
    display: flex;
    align-items: center;
    cursor: pointer;
    & > img {
      width: 0.15rem;
      height: 0.15rem;
      display: block;
    }
    & > div {
      line-height: 1;
      color: #259cf3;
      font-size: 0.12rem;
      margin-left: 0.1rem;
    }
  }
  .performance-list {
    width: 100%;
    height: auto;
    margin-top: 0.3rem;
    display: flex;
    align-items: center;
    & > .performance-list-item {
      width: 15%;
      height: auto;
      line-height: 1;
      & > span {
        &.p-l-left {
          font-size: 0.12rem;
          color: #444444;
        }
        &.p-l-right {
          font-size: 0.14rem;
          color: #f57107;
        }
      }
    }
  }
  .check-box-content-other {
    width: 100%;
    height: auto;
    margin: 0.3rem 0 0.15rem;
  }
  .table-box {
    // width: 100%;
    height: auto;
    background-color: #ffffff;
    border: 0.01rem solid #eaeaea;
    & > .table-buju-1 {
      width: 100%;
      height: @commonTableHeight;
      display: flex;
      border-bottom: 0.01rem solid #eaeaea;
      &:last-child {
        border-bottom: none;
      }
      & > div {
        height: @commonTableHeight;
        line-height: @commonTableHeight;
        color: #444444;
        font-size: 0.12rem;
        padding-right: 0.2rem;
        box-sizing: border-box;
        /deep/ .el-input__inner {
          height: @commonInputHeight;
          line-height: @commonInputHeight;
          background-color: #fdfdfd;
          box-shadow: inset 0 0.01rem 0.05rem 0 rgba(202, 213, 223, 0.5);
          border-radius: 0.03rem;
          border: solid 0.01rem #bdc6cf;
          color: #444444;
        }
        &:nth-child(1) {
          flex: 0 0 10%;
          padding-left: 0.2rem;
        }
        &:nth-child(2) {
          flex: 0 0 15%;
        }
        &:nth-child(3) {
          flex: 0 0 20%;
        }
        &:nth-child(4) {
          flex: 0 0 20%;
        }
        &:nth-child(5) {
          flex: 0 0 20%;
        }
        &:nth-child(6) {
          flex: 1 1 auto;
          padding-right: 0.4rem;
        }
        &.del-icon {
          padding-right: 0;
        }
        &.active {
          /deep/ .el-input__inner {
            color: #f57107;
          }
        }
      }
    }
    & > .table-buju-2 {
      width: 100%;
      height: @commonTableHeight;
      display: flex;
      border-bottom: 0.01rem solid #eaeaea;
      &:last-child {
        border-bottom: none;
      }
      & > div {
        height: @commonTableHeight;
        line-height: @commonTableHeight;
        color: #444444;
        font-size: 0.12rem;
        padding-right: 0.2rem;
        box-sizing: border-box;
        /deep/ .el-input__inner {
          height: @commonInputHeight;
          line-height: @commonInputHeight;
          background-color: #fdfdfd;
          box-shadow: inset 0 0.01rem 0.05rem 0 rgba(202, 213, 223, 0.5);
          border-radius: 0.03rem;
          border: solid 0.01rem #bdc6cf;
          color: #444444;
        }
        &:nth-child(1) {
          flex: 0 0 8%;
          padding-left: 0.2rem;
        }
        &:nth-child(2) {
          flex: 0 0 12%;
        }
        &:nth-child(3) {
          flex: 0 0 12%;
        }
        &:nth-child(4) {
          flex: 0 0 10%;
        }
        &:nth-child(5) {
          flex: 0 0 14%;
        }
        &:nth-child(6) {
          flex: 0 0 10%;
        }
        &:nth-child(7) {
          flex: 0 0 12%;
        }
        &:nth-child(8) {
          flex: 0 0 8%;
        }
        &:nth-child(9) {
          flex: 1 1 auto;
          padding-right: 0.4rem;
        }
        &.del-icon {
          padding-right: 0;
        }
        &.active {
          /deep/ .el-input__inner {
            color: #f57107;
          }
        }
      }
    }
    & > .table-buju {
      position: relative;
      .del-icon {
        position: absolute;
        top: 0.1rem;
        right: 0.1rem;
        width: 0.15rem;
        height: 0.3rem;
        background-image: url("../../../../assets/images/public/delete_200.png");
        background-repeat: no-repeat;
        background-size: 100% 50%;
        background-position: center;
        cursor: pointer;
        z-index: 9;
        display: none;
      }
      &:hover {
        background-color: #eaeaea;
        .del-icon {
          display: block;
        }
      }
    }
    & > .table-head {
      & > div {
        color: #999999;
        font-size: 0.12rem;
      }
    }
  }
  .performance-add-box {
    width: 100%;
    height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > .p-a-b-left {
      width: auto;
      display: flex;
      align-items: center;
      & > .add-box {
        margin-left: 0.1rem;
      }
    }
    & > .p-a-b-right {
      width: auto;
    }
  }
}
</style>