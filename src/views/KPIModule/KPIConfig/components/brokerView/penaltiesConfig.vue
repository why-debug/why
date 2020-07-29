<!--扣分项-培训-->
<template>
  <div class="box">
    <div class="label">
      <div>培</div>
      <div>训</div>
    </div>
    <el-form :model="fromData" :rules="rules" :show-message="false" :hide-required-asterisk="false" ref="ruleForm">
      <div class="penalties-box">
        <div class="title">
          <div class="label">
            <!--<div>培</div>
            <div>训</div>-->
          </div>
        </div>
        <div class="right-box">单次扣分</div>
        <div class="right-box">封顶分</div>
      </div>
      <div class="penalties-box">
        <div class="title">
          1、缺席、迟到10分钟以上、早退，每次扣取（上不封顶）
        </div>
        <div class="right-box">
          <el-form-item prop="trainingAttendanceSingleScore">
            <el-input
              :disabled="configListItem.editOrSave==1"
              v-only-two-decimal
              :maxlength="5"
              @input="trainingAttendanceSingleScoreInputChange"
              v-model="fromData.trainingAttendanceSingleScore"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div class="right-box">
          <el-form-item>
            <el-input
              :disabled="configListItem.editOrSave==1"
              v-only-two-decimal
              :maxlength="5"
              v-model="fromData.trainingAttendanceHighestScore"
              @blur="trainingAttendanceHighestScoreInputBlur"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="penalties-box" style="margin-bottom: 0">
        <div class="title">
          2、未完成基础训练营/专项考试通过，每次扣取（上不封顶）
        </div>
        <div class="right-box">
          <el-form-item prop="trainingFailedSingleScore">
            <el-input
              :disabled="configListItem.editOrSave==1"
              v-only-two-decimal
              @input="trainingFailedSingleScoreInputChange"
              :maxlength="5"
              v-model="fromData.trainingFailedSingleScore"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
        <div class="right-box">
          <el-form-item>
            <el-input
              :disabled="configListItem.editOrSave==1"
              v-only-two-decimal
              :maxlength="5"
              @blur="trainingFailedInputBlur"
              v-model="fromData.trainingFailedHighestScore"
              :style="{'width': inputWidth}">
            </el-input>
          </el-form-item>
        </div>
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
          trainingAttendanceHighestScore: '', // 未培训出勤扣分封顶",
          trainingAttendanceSingleScore: '500', // 未培训出勤扣分每次",
          trainingFailedHighestScore: '', // 培训未通过封顶扣分",
          trainingFailedSingleScore: '200', // 培训未通过单项扣分",
        },
        rules: {
          trainingAttendanceHighestScore: [{required: true, message: '', trigger: 'blur'}],
          trainingAttendanceSingleScore: [{required: true, message: '', trigger: 'blur'}],
          trainingFailedHighestScore: [{required: true, message: '', trigger: 'blur'}],
          trainingFailedSingleScore: [{required: true, message: '', trigger: 'blur'}],
        },
      }
    },

    methods: {
      init() {
        this.fromData = JSON.parse(JSON.stringify(this.dataItem));

        // 如果没有configId,表示新增配置,重置表单
        if (!this.configListItem.configId){
          this.resetForm();
        }
      },
      getData(){
        return this.fromData;
      },
      validate() {
        return this.$refs['ruleForm'].validate();
      },
      // 重置表单
      resetForm() {
        this.$refs['ruleForm'].resetFields();
      },
      trainingAttendanceSingleScoreInputChange(){
        if (+this.fromData.trainingAttendanceSingleScore > +this.fromData.trainingAttendanceHighestScore && this.fromData.trainingAttendanceHighestScore != ''){
          this.fromData.trainingAttendanceHighestScore = this.fromData.trainingAttendanceSingleScore;
        }
      },
      trainingAttendanceHighestScoreInputBlur(){
        if (+this.fromData.trainingAttendanceHighestScore < +this.fromData.trainingAttendanceSingleScore && this.fromData.trainingAttendanceHighestScore != ''){
          this.fromData.trainingAttendanceHighestScore = this.fromData.trainingAttendanceSingleScore;
          new ErpCommon().toast('封顶分不能小于单次扣分');
        }
      },

      trainingFailedSingleScoreInputChange(){
        if (+this.fromData.trainingFailedSingleScore > +this.fromData.trainingFailedHighestScore && this.fromData.trainingFailedHighestScore != ''){
          this.fromData.trainingFailedHighestScore = this.fromData.trainingFailedSingleScore;
        }
      },
      trainingFailedInputBlur(){
        if (+this.fromData.trainingFailedHighestScore < +this.fromData.trainingFailedSingleScore && this.fromData.trainingFailedHighestScore != ''){
          this.fromData.trainingFailedHighestScore = this.fromData.trainingFailedSingleScore;
          new ErpCommon().toast('封顶分不能小于单次扣分');
        }
      },
    }
  }
</script>

<style scoped lang="less">
  /deep/ .el-input__inner{
    padding: 0 0.05rem;
    height: 0.34rem !important;
    font-size: 0.14rem !important;
  }

  .box{
    display: flex;
    .label{
      font-size: 0.16rem;
      color: #444444;
      width: 0.52rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      margin-left: 0.14rem;
      line-height: 0.75rem;
      margin-right: 0.38rem;
    }
    .penalties-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 0.14rem;
      color: #666666;
      margin-bottom: 0.07rem;

      .title {
        width: 5.2rem;
        box-sizing: border-box;
      }

      .right-box {
        width: 0.7rem;
        text-align: center;

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
    }
  }

</style>
