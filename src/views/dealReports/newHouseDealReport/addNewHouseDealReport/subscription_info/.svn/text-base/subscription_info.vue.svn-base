<template>
  <div class="subscription_info">
    <main>
      <form_header :title="title" />
      <el-form
        :inline="true"
        :model="subscription_info"
        class="demo-form-inline"
      >
        <section>
          <el-form-item>
            <div class="input_title">
              <span>认</span><span>购</span><span>定</span><span>金</span>
            </div>
            <!-- <el-input v-model="subscription_info.offerMoney"></el-input> -->
            <el-input
              v-model="subscription_info.offerMoney"
              @keydown.native="btKeyDown($event, 10)"
              @keyup.native="btKeyDown($event, 10)"
            >
            </el-input>
            <el-select v-model="deposit_unit" placeholder="金额类型" disabled>
              <el-option label="元" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="totalPrice">
            <div class="input_title required">
              <span>认</span><span>购</span><span>总</span><span>价</span>
            </div>
            <!-- <el-input v-model="subscription_info.offerAmount"></el-input> -->
            <el-input
              v-model="subscription_info.offerAmount"
              @keydown.native="btKeyDown($event, 7)"
              @keyup.native="btKeyDown($event, 7)"
            >
            </el-input>
            <el-select v-model="total_unit" placeholder="金额类型" disabled>
              <el-option label="万元" value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <div class="input_title">
              <span>认</span><span>购</span><span>编</span><span>号</span>
            </div>
            <el-input v-model="subscription_info.offerNo"></el-input>
          </el-form-item>
        </section>

        <section>
          <el-form-item>
            <div class="input_title">
              <span>成</span><span>交</span><span>日</span><span>期</span>
            </div>
            <el-date-picker
              v-model="subscription_info.dealTime"
              value-format="yyyy-MM-dd"
              type="date"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="mustDate">
            <div class="input_title required">
              <span>认</span><span>购</span><span>日</span><span>期</span>
            </div>
            <el-date-picker
              v-model="subscription_info.offerTime"
              :placeholder="subscription_info.offerTime"
              value-format="yyyy-MM-dd"
              type="date"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <div class="input_title required">
              <span>付</span><span>款</span><span>方</span><span>式</span>
            </div>
            <el-select v-model="subscription_info.payType">
              <el-option label="一次性付款" :value="1"></el-option>
              <el-option label="按揭付款" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </section>

        <section>
          <el-form-item prop="mustDate">
            <div class="input_title required">
              <div class="long_title">预收佣日期</div>
            </div>
            <el-date-picker
              v-model="subscription_info.commissionPlanTime"
              value-format="yyyy-MM-dd"
              type="date"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <div class="input_title">
              <div class="long_title">预首付日期</div>
            </div>
            <el-date-picker
              v-model="subscription_info.firstPaymentTime"
              value-format="yyyy-MM-dd"
              type="date"
            >
            </el-date-picker>
          </el-form-item>
        </section>

        <section>
          <el-form-item prop="desc">
            <div class="input_title">
              <span>折</span><span>扣</span><span>描</span><span>述</span>
            </div>
            <el-input
              resize="none"
              type="textarea"
              maxlength="500"
              rows="5"
              show-word-limit
              v-model="subscription_info.discountNote"
            ></el-input>
          </el-form-item>
        </section>

        <section>
          <el-form-item prop="desc">
            <div class="input_title"><span>备</span><span>注</span></div>
            <el-input
              resize="none"
              type="textarea"
              maxlength="500"
              rows="5"
              show-word-limit
              v-model="subscription_info.note"
            ></el-input>
          </el-form-item>
        </section>
      </el-form>
    </main>
  </div>
</template>

<script>
import form_header from "../../components/form_header";
import { CreateCommonRules } from "../utils/Rules";
import { ErpCommon } from "../../../../../utils/ErpCommon";
import FormatDate from "../../../../../utils/date";
import { ReportInfoDetailItem } from "../../../../../net/newHouseDealReport/display/reporInfoDetail";
const reg = /^[1-9]\d{0,8}$/;
export default {
  components: {
    form_header,
  },
  data() {
    return {
      title: "认购信息",
      deposit_unit: "1",
      total_unit: "1",
      // rules: this.setCommonRules(),
      subscription_info: {
        offerMoney: "",
        offerAmount: "",
        offerNo: "",
        dealTime: "",
        offerTime: FormatDate().nowDate,
        payType: "",
        commissionPlanTime: "",
        firstPaymentTime: "",
        discountNote: "",
        note: "",
      },
    };
  },
  props: {
    initData: {
      type: Object,
      default() {
        return new ReportInfoDetailItem();
      },
    },
  },
  watch: {
    initData: {
      handler: function() {
        this.initDetailInfo();
      },
      deep: true,
    },
    //监听认购总价变化 subscription_info.offerAmount
    getOfferAmount() {
      this.$store.commit(
        "add_new_hosue_report_store/setsProjectInfoOfferAmount",
        this.subscription_info.offerAmount
      );
    },
  },
  created() {
    //编辑初始化数据
    this.initDetailInfo();
    this.initSysPara();
  },
  methods: {
    //获取系统参数
    initSysPara() {
      let sysPara = new ErpCommon().getSysPara("SHARE_HOUSE_RANGE") || "";
      console.log("--系统参数--", JSON.parse(JSON.stringify(sysPara)));
    },
    //将详情数据对应赋值
    initDetailInfo() {
      let info = this.subscription_info;
      for (let item in info) {
        info[item] = this.initData[item];
      }
      //初始化认购日期
      if (this.subscription_info.offerTime == "") {
        this.subscription_info.offerTime = FormatDate().nowDate;
      }
      console.log(info, "这是认购信息初始化数据");
    },
    //验证规则
    // setCommonRules() {
    //   let params = {
    //     totalPrice: ["required"],
    //     mustDate: ["required"],
    //   };
    //   return new CreateCommonRules(params).getCommonRules();
    // },
    //subscriptionInfo提交参数
    saveSubscriptionInfo() {
      this.$emit("subscriptionInfo", this.subscription_info);
    },
    //认购信息验证
    subscriptionInfoCheck() {
      let request = this.subscription_info;
      if (request.offerAmount == "" || !request.offerAmount) {
        this.$erpCommon.toast("请输入认购总价");
        return false;
      }
      if (request.offerTime == "" || !request.offerTime) {
        this.$erpCommon.toast("请选择认购日期");
        return false;
      }
      if (request.payType == "" || !request.payType) {
        this.$erpCommon.toast("请选择付款方式");
        return false;
      }
      if (request.commissionPlanTime == "" || !request.commissionPlanTime) {
        this.$erpCommon.toast("请选择预收佣日期");
        return false;
      }
      return true;
    },
    //输入验证
    btKeyDown(e, maxlength) {
      let value = e.target.value;
      let intVal = value.toString().split(".");
      if (!!intVal[0] && intVal[0].length > maxlength) {
        value = intVal[0].substring(0, maxlength);
      }
      //先把非数字的都替换掉，除了数字和.
      value = value.replace(/[^\d.]/g, "");
      //保证只有出现一个.而没有多个.
      value = value.replace(/\.{2,}/g, ".");
      //必须保证第一个为数字而不是.
      value = value.replace(/^\./g, "");
      //保证.只出现一次，而不能出现两次以上
      value = value
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".");
      //只能输入两个小数
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
      //输入比例不能大于100
      if (maxlength == 3 && (value > 100 || value == "100.")) {
        console.log("大于100 了");
        value = 100;
      }
      e.target.value = value;
    },
  },
  computed: {
    getOfferAmount() {
      return this.subscription_info.offerAmount;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-input.is-disabled .el-input__inner {
  background-color: #fff;
}
/deep/.el-select .el-input.is-disabled .el-input__inner {
  cursor: pointer;
}
/deep/.el-select .el-input.is-disabled .el-input__inner {
  background-color: #fff;
}
.subscription_info {
  main {
    width: 10.24rem;
    margin: 0 auto;
    /deep/.el-date-editor .el-icon-circle-close {
      display: none !important;
    }
    /deep/ .el-form {
      & > section {
        &:nth-of-type(1) {
          & > .el-form-item {
            & > .el-form-item__content {
              & > .el-input {
                width: 1.36rem;
              }
              & > .el-select {
                width: 0.65rem;
                margin-left: 0.1rem;
              }
            }
            &:nth-of-type(3) {
              & > .el-form-item__content {
                width: 2.87rem;
                & > .el-input {
                  width: 2.1rem;
                }
              }
            }
          }
        }
        &:nth-of-type(2) {
          & > .el-form-item {
            /deep/ input {
              cursor: pointer;
            }
          }
        }
        &:nth-of-type(4),
        &:nth-of-type(5) {
          .el-form-item {
            height: 1.1rem;
          }
        }
      }
    }
  }
}
</style>
