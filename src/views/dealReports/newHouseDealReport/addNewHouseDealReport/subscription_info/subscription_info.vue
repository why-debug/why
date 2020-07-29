<template>
  <div class="subscription_info">
    <main>
      <form_header :title="title" />
      <el-form
        :rules="rules"
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
            <el-input  maxlength="11" v-model="subscription_info.offerMoney" v-number-two>
            </el-input>
            <el-select  v-model="deposit_unit" placeholder="金额类型">
              <el-option label="万元" value="1"></el-option>
              <el-option label="亿元" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="totalPrice">
            <div class="input_title required">
              <span>认</span><span>购</span><span>总</span><span>价</span>
            </div>
            <!-- <el-input v-model="subscription_info.offerAmount"></el-input> -->
             <el-input  maxlength="11" v-model="subscription_info.offerMoney" v-number-two>
            </el-input>
            <el-select
              v-model="total_unit"
              placeholder="金额类型"
            >
              <el-option label="万元" value="1"></el-option>
              <el-option label="亿元" value="2"></el-option>
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
              value-format="yyyy-MM-dd"
              type="date"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <div class="input_title">
              <span>付</span><span>款</span><span>方</span><span>式</span>
            </div>
            <el-select v-model="subscription_info.payType">
              <el-option label="一次性付款" value="1"></el-option>
              <el-option label="按揭付款" value="2"></el-option>
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
                maxlength="1000"
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
                maxlength="1000"
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
      rules: this.setCommonRules(),
      subscription_info: {
        offerMoney: "",
        offerAmount: "",
        offerNo: "",
        dealTime: "",
        offerTime: "",
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
    initData:{
      handler:function(){
        this.initDetailInfo();
      },
      deep:true
    },
  }, 
  created() {
     //编辑初始化数据
    this.initDetailInfo();
  },
  methods: {
    //将详情数据对应赋值
    initDetailInfo(){
      let info = this.subscription_info;
      for(let item in info){
        info[item] = this.initData[item];
      }
      console.log(info,'这是认购信息初始化数据');
    },
    setCommonRules() {
      let params = {
        totalPrice: ["required"],
        mustDate: ["required"],
      };
      return new CreateCommonRules(params).getCommonRules();
    },
    //subscriptionInfo提交参数
    saveSubscriptionInfo() {
      this.$emit("subscriptionInfo", this.subscription_info);
    },
    //提交表单验证
    // submitForm (formName) {
    //   console.log(this.registData)
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },

    // resetForm (formName) {
    //   this.$refs[formName].resetFields()
    // },
      //输入验证
    btKeyDown(e) {
      let flag = reg.test(e.target.value);
      //允许输入0
      if (!flag && "0" !== e.target.value + "") {
        e.target.value = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
