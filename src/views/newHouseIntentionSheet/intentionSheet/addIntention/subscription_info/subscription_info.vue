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
              <span>临</span><span>定</span><span>日</span><span>期</span>
            </div>
            <!-- <el-input v-model="subscription_info.offerMoney"></el-input> -->
            <el-date-picker
              v-model="subscription_info.provisionalDate"
              value-format="yyyy-MM-dd"
              type="date"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item prop="totalPrice">
            <div class="input_title required">
              <span>临</span><span>定</span><span>金</span>
            </div>
            <!-- <el-input v-model="subscription_info.offerAmount"></el-input> -->
            <el-input
              maxlength="11"
              v-model="subscription_info.provisionalMoney"
              v-number-two
            >
            </el-input>
          </el-form-item>

          <el-form-item>
            <div class="input_title required">
              <span>认</span><span>购</span><span>总</span><span>价</span>
            </div>
            <el-input
              maxlength="11"
              v-model="subscription_info.subscriptionPrice"
              v-number-two
            >
              <span slot="suffix">元</span>
            </el-input>
          </el-form-item>
        </section>

        <section>
          <el-form-item prop="desc">
            <div class="input_title">
              <span>折</span><span>扣</span><span>描</span><span>述</span>
            </div>
            <el-input
              style="width:5.4rem"
              v-model="subscription_info.discountDescription"
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
              v-model="subscription_info.subscriptionRemark"
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
        provisionalDate: "", //制单日期
        provisionalMoney: "", //临定金
        subscriptionPrice: "", //认购总价
        discountDescription: "", //折扣描述
        subscriptionRemark: "", //认购备注
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
  },
  created() {
    //编辑初始化数据
    this.initDetailInfo();
  },
  methods: {
    //将详情数据对应赋值
    initDetailInfo() {
      let info = this.subscription_info;
      for (let item in info) {
        info[item] = this.initData[item];
      }
      console.log(info, "这是认购信息初始化数据");
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
              // & > .el-input {
              //   width: 1.36rem;
              // }
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
        &:nth-of-type(3) {
          .el-form-item {
            height: 1.1rem;
          }
        }
      }
    }
  }
}
</style>
