<!--全国经纪人丶继续教育配置-->
<template>
  <div>
    <el-form :model="fromData" :rules="rules" :show-message="false" :hide-required-asterisk="false" ref="ruleForm">
    <div class="row-box">
      <span class="label">
        拥有全国经纪人证
        <!--<div>全</div>
        <div>国</div>
        <div>经</div>
        <div>纪</div>
        <div>人</div>
        <div>证：</div>-->
      </span>
      <div>拥有全国经纪人证，可以获得</div>
      <div>
        <el-form-item prop="brokerCertificate">
          <el-input
            :disabled="configListItem.editOrSave==1"
            v-only-two-decimal
            :maxlength="5"
            v-model="fromData.brokerCertificate"
            :style="{'width': inputWidth}">
          </el-input>
        </el-form-item>
      </div>
      <div>分</div>
    </div>
    <div class="row-box">
        <span class="label">
          继续教育
            <!--<div>继</div>
            <div>续</div>
            <div>教</div>
            <div>育：</div>-->
        </span>
      <div>拥有房地产经纪岗位相关的证书，每次可获得</div>
      <div>
        <el-form-item prop="educationUpSingleScore">
          <el-input
            :disabled="configListItem.editOrSave==1"
            v-only-two-decimal
            :maxlength="5"
            v-model="fromData.educationUpSingleScore"
            :style="{'width': inputWidth}">
          </el-input>
        </el-form-item>
      </div>
      <div>分，每年不超过</div>
      <div>
        <el-form-item prop="educationUpHighestScore">
          <el-input
            :disabled="configListItem.editOrSave==1"
            v-only-two-decimal
            :maxlength="5"
            @blur="educationUpHighestScoreInputBlur"
            v-model="fromData.educationUpHighestScore"
            :style="{'width': inputWidth}">
          </el-input>
        </el-form-item>
      </div>
      <div>分</div>
    </div>
    </el-form>
  </div>
</template>

<script>
  import {ErpCommon} from "../../../../../utils/ErpCommon";

  export default {
    props: {
      dataItem: {
        type: [Object],
        default() {
          return {}
        },
      },
      configListItem: {
        type: [Array, Object],
        default() {
          return {};
        }
      },
    },

    watch: {
      dataItem: {
        handler: function () {
          this.init();
        },
        deep: true
      }
    },

    mounted(){
      this.init();
    },

    data() {
      return {
        inputWidth: '0.6rem',

        fromData: {
          brokerCertificate:'1000', // 全国经纪人证书
          educationUpSingleScore:'300', // 继续教育单次分
          educationUpHighestScore:'600', // 继续教育封顶分
        },
        rules: {
          brokerCertificate: [{required: true, message: '', trigger: 'blur'}],
          educationUpSingleScore: [{required: true, message: '', trigger: 'blur'}],
          educationUpHighestScore: [{required: true, message: '', trigger: 'blur'}],
        },
      }
    },

    methods: {
      init() {
        this.fromData = JSON.parse(JSON.stringify(this.dataItem));
      },
      getData(){
        return this.fromData;
      },
      educationUpHighestScoreInputBlur(){
        if (+this.fromData.educationUpSingleScore > +this.fromData.educationUpHighestScore){
          this.fromData.educationUpHighestScore = this.fromData.educationUpSingleScore;
          new ErpCommon().toast('继续教育每年封顶分不能小于单次分');
        }
      },
      validate() {
        return this.$refs['ruleForm'].validate();
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      }
    }
  }
</script>

<style scoped lang="less">
  /deep/ .el-input__inner{
    padding: 0 0.05rem;
    height: 0.34rem !important;
    font-size: 0.14rem !important;
  }

  .row-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 0.14rem;
    color: #666666;
    margin-bottom: 0.07rem;
    margin-left: -0.405rem;

    .label {
      width: 1.06rem;
      font-size: 0.16rem;
      color: #444444;
      text-align: right;
      margin-right: 0.39rem;
      white-space: nowrap;
      display: flex;
      justify-content: flex-end;
    }

    & > div {
      margin-right: 0.1rem;
    }

    :last-child {
      margin-right: 0;
    }

    /deep/ .el-input--small .el-input__inner {
      line-height: normal;
      text-align: center;
    }

    /deep/ .el-input {
      /deep/ .el-input__inner {
        font-size: 0.14rem;
        height: 0.34rem;
        padding: 0 0.05rem;
        text-align: center;
      }
    }

    /deep/ .el-form-item--small.el-form-item{
      margin-bottom: 0;
    }
  }
</style>
